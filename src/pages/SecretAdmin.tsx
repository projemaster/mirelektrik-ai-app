import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, PenTool, BarChart3, Loader2, CheckCircle2, AlertCircle, Globe, Database, Zap, Play, RefreshCw, BookOpen } from "lucide-react";
import { generateAIWriterContent, generateCompetitorAnalysis, generateTechnicalContent } from "../services/geminiService";
import { MAIN_SERVICES, SERVICE_SUBTITLES } from "../constants/data";

export default function SecretAdmin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"writer" | "analysis" | "pregen" | "regulations">("writer");
  const [keywords, setKeywords] = useState("");
  const [sector, setSector] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  
  // Pre-generator state
  const [selectedService, setSelectedService] = useState(MAIN_SERVICES[0].id);
  const [pregenStatus, setPregenStatus] = useState<{current: number, total: number, active: boolean}>({current: 0, total: 0, active: false});
  const [logs, setLogs] = useState<string[]>([]);

  // Regulations state
  const [regulations, setRegulations] = useState<any[]>([]);
  const [newRegName, setNewRegName] = useState("");
  const [newRegUrl, setNewRegUrl] = useState("");

  const fetchRegulations = async () => {
    try {
      const res = await fetch("/api/regulations");
      const data = await res.json();
      setRegulations(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRegulations();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "XXMirXX" && password === "12021") {
      setIsLoggedIn(true);
    } else {
      alert("Hatalı kullanıcı adı veya şifre!");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md w-full"
        >
          <div className="text-center mb-10">
            <div className="bg-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
              <Zap size={32} fill="currentColor" />
            </div>
            <h1 className="text-3xl font-black text-slate-900">Admin Girişi</h1>
            <p className="text-slate-500 mt-2">Mir Elektrik Proje Ofisi</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Kullanıcı Adı</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold"
                placeholder="XXMirXX"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Şifre</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold"
                placeholder="•••••"
              />
            </div>
            <button className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl">
              Giriş Yap
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const handleAddRegulation = async () => {
    if (!newRegName) return;
    try {
      await fetch("/api/regulations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newRegName, source_url: newRegUrl })
      });
      setNewRegName("");
      setNewRegUrl("");
      fetchRegulations();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteRegulation = async (id: number) => {
    try {
      await fetch(`/api/regulations/${id}`, { method: "DELETE" });
      fetchRegulations();
    } catch (err) {
      console.error(err);
    }
  };

  const addLog = (msg: string) => setLogs(prev => [msg, ...prev].slice(0, 10));

  const handleAIWriter = async () => {
    setLoading(true);
    setResult(null);
    try {
      const content = await generateAIWriterContent(keywords.split(",").map(k => k.trim()));
      setResult(content);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalysis = async () => {
    setLoading(true);
    setResult(null);
    try {
      const analysis = await generateCompetitorAnalysis(sector);
      setResult(analysis);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startBulkPregen = async () => {
    if (pregenStatus.active) return;
    
    const service = MAIN_SERVICES.find(s => s.id === selectedService);
    if (!service) return;

    const subPages = SERVICE_SUBTITLES[selectedService] || [];
    setPregenStatus({ current: 0, total: subPages.length, active: true });
    setLogs(["Toplu üretim başlatıldı..."]);

    for (let i = 0; i < subPages.length; i++) {
      if (!pregenStatus.active) break;
      
      const subPage = subPages[i];
      const slug = subPage.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
      
      addLog(`[${i+1}/${subPages.length}] ${subPage} üretiliyor...`);
      
      try {
        const generated = await generateTechnicalContent(slug, regulations);
        await fetch(`/api/content/${slug}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(generated)
        });
        addLog(`✅ ${subPage} başarıyla kaydedildi.`);
      } catch (err) {
        addLog(`❌ ${subPage} hatası: ${err instanceof Error ? err.message : "Bilinmeyen hata"}`);
      }
      
      setPregenStatus(prev => ({...prev, current: i + 1}));
      await new Promise(r => setTimeout(r, 1000));
    }

    setPregenStatus(prev => ({...prev, active: false}));
    addLog("Toplu üretim tamamlandı!");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
          <div className="bg-slate-900 p-12 text-white">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-black flex items-center gap-3">
                <Globe className="text-emerald-500" /> Mir Elektrik Strateji & İçerik Paneli
              </h1>
              <div className="flex items-center gap-4 bg-white/10 px-4 py-2 rounded-full border border-white/10">
                <Database size={16} className="text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-widest">Sistem Aktif</span>
              </div>
            </div>
            <p className="text-slate-400">Google üzerinden anlık veri çekerek makale yazın, rakip analizi yapın ve sayfaları önceden oluşturun.</p>
          </div>

          <div className="flex border-b border-slate-100 overflow-x-auto">
            <button
              onClick={() => { setActiveTab("writer"); setResult(null); }}
              className={`flex-1 min-w-[150px] py-6 font-bold text-sm uppercase tracking-widest transition-all ${
                activeTab === "writer" ? "text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/30" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <PenTool size={18} /> AI Makale Yazarı
              </div>
            </button>
            <button
              onClick={() => { setActiveTab("analysis"); setResult(null); }}
              className={`flex-1 min-w-[150px] py-6 font-bold text-sm uppercase tracking-widest transition-all ${
                activeTab === "analysis" ? "text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/30" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <BarChart3 size={18} /> Rakip Analiz Aracı
              </div>
            </button>
            <button
              onClick={() => { setActiveTab("pregen"); setResult(null); }}
              className={`flex-1 min-w-[150px] py-6 font-bold text-sm uppercase tracking-widest transition-all ${
                activeTab === "pregen" ? "text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/30" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Zap size={18} /> Toplu Sayfa Üretici
              </div>
            </button>
            <button
              onClick={() => { setActiveTab("regulations"); setResult(null); }}
              className={`flex-1 min-w-[150px] py-6 font-bold text-sm uppercase tracking-widest transition-all ${
                activeTab === "regulations" ? "text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/30" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <BookOpen size={18} /> Yönetmelik Kütüphanesi
              </div>
            </button>
          </div>

          <div className="p-12">
            {activeTab === "writer" && (
              <div className="space-y-8">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Anahtar Kelimeler (10 Adet, Virgülle Ayırın)</label>
                  <textarea
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="Örn: Bursa elektrik projesi, UEDAŞ onay süreci, fabrika trafo hesabı..."
                    className="w-full h-32 bg-slate-50 border border-slate-100 rounded-2xl p-6 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-700"
                  />
                </div>
                <button
                  onClick={handleAIWriter}
                  disabled={loading}
                  className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <PenTool size={20} />}
                  Google Verileriyle Makale Hazırla
                </button>
              </div>
            )}

            {activeTab === "analysis" && (
              <div className="space-y-8">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Sektör veya Anahtar Kelime</label>
                  <input
                    type="text"
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    placeholder="Örn: Bursa Elektrik Proje Ofisleri"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-700"
                  />
                </div>
                <button
                  onClick={handleAnalysis}
                  disabled={loading}
                  className="w-full bg-emerald-600 text-white font-bold py-5 rounded-2xl hover:bg-emerald-700 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <BarChart3 size={20} />}
                  Anlık Rakip Analizi Yap (Top 20 Firma)
                </button>
              </div>
            )}

            {activeTab === "pregen" && (
              <div className="space-y-8">
                <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-100">
                  <h3 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
                    <Zap size={20} /> Toplu İçerik Üretim İstasyonu
                  </h3>
                  <p className="text-sm text-emerald-700 mb-6 leading-relaxed">
                    Bu araç, seçtiğiniz hizmete ait 250 adet alt sayfayı otomatik olarak tarar ve eksik olanları Gemini AI ile üretip veritabanına kaydeder. Bu sayede kullanıcılar tıkladığında sayfa anında açılır.
                  </p>
                  
                  <div className="space-y-4">
                    <label className="block text-xs font-black text-emerald-600 uppercase tracking-widest">Hizmet Seçin</label>
                    <select 
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full bg-white border border-emerald-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {MAIN_SERVICES.map(s => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-8 flex items-center gap-4">
                    <button
                      onClick={startBulkPregen}
                      disabled={pregenStatus.active}
                      className="flex-1 bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {pregenStatus.active ? <RefreshCw className="animate-spin" /> : <Play size={18} />}
                      Üretimi Başlat
                    </button>
                    <button
                      onClick={() => setPregenStatus(prev => ({ ...prev, active: false }))}
                      disabled={!pregenStatus.active}
                      className="px-6 py-4 border border-emerald-200 text-emerald-600 font-bold rounded-xl hover:bg-emerald-100 transition-all disabled:opacity-50"
                    >
                      Durdur
                    </button>
                  </div>

                  {pregenStatus.active && (
                    <div className="mt-8 space-y-2">
                      <div className="flex justify-between text-xs font-bold text-emerald-800 uppercase tracking-widest">
                        <span>İlerleme</span>
                        <span>{pregenStatus.current} / {pregenStatus.total}</span>
                      </div>
                      <div className="w-full h-3 bg-emerald-200 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-emerald-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${(pregenStatus.current / pregenStatus.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-slate-900 rounded-2xl p-6 font-mono text-[10px] text-emerald-400 h-48 overflow-y-auto space-y-1">
                  {logs.length === 0 && <span className="opacity-30">Sistem hazır, log bekleniyor...</span>}
                  {logs.map((log, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="opacity-30">[{new Date().toLocaleTimeString()}]</span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "regulations" && (
              <div className="space-y-8">
                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <BookOpen size={20} className="text-emerald-500" /> Yönetmelik & Kaynak Yönetimi
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Yönetmelik Adı</label>
                      <input 
                        type="text" 
                        value={newRegName}
                        onChange={(e) => setNewRegName(e.target.value)}
                        placeholder="Örn: Elektrik İç Tesisleri Yönetmeliği"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Dış Bağlantı (URL)</label>
                      <input 
                        type="text" 
                        value={newRegUrl}
                        onChange={(e) => setNewRegUrl(e.target.value)}
                        placeholder="https://www.resmigazete.gov.tr/..."
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={handleAddRegulation}
                    className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={18} /> Kütüphaneye Ekle
                  </button>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Aktif Yönetmelikler ({regulations.length})</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {regulations.map((reg) => (
                      <div key={reg.id} className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                        <div>
                          <p className="font-bold text-slate-900">{reg.name}</p>
                          <a href={reg.source_url} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-600 hover:underline">
                            {reg.source_url || "Bağlantı yok"}
                          </a>
                        </div>
                        <button 
                          onClick={() => handleDeleteRegulation(reg.id)}
                          className="text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-widest"
                        >
                          Sil
                        </button>
                      </div>
                    ))}
                    {regulations.length === 0 && (
                      <div className="text-center py-12 text-slate-400 italic bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        Henüz yönetmelik eklenmedi.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-100"
              >
                <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-500" /> İşlem Tamamlandı
                  </h3>
                  <button 
                    onClick={() => navigator.clipboard.writeText(result)}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    Kopyala
                  </button>
                </div>
                <div className="prose prose-slate max-w-none text-sm leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, "<br/>") }} />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="mt-12 p-8 bg-emerald-50 rounded-3xl border border-emerald-100 flex items-start gap-4">
          <AlertCircle className="text-emerald-600 shrink-0" size={24} />
          <p className="text-sm text-emerald-800 leading-relaxed">
            <strong>Güvenlik Notu:</strong> Bu panel sadece Mir Elektrik yöneticileri içindir. Google Search Grounding teknolojisi sayesinde veriler anlık olarak internetten çekilir ve yapay zeka tarafından analiz edilir.
          </p>
        </div>
      </div>
    </div>
  );
}

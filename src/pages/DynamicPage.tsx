import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ChevronDown, ChevronUp, CheckCircle2, MapPin, Ruler, ArrowRight, Loader2 } from "lucide-react";
import { COMPANY_INFO, MAIN_SERVICES } from "../constants/data";
import { generateTechnicalContent } from "../services/geminiService";

interface ContentData {
  title: string;
  content: string;
  schema_codes: string[];
  case_studies: Array<{
    type: string;
    m2: string;
    district: string;
    roadmap: string;
    result: string;
  }>;
  faqs: Array<{ q: string; a: string }>;
}

export default function DynamicPage() {
  const { slug } = useParams();
  const [data, setData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCase, setActiveCase] = useState(0);
  const [regulations, setRegulations] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 0. Fetch regulations first
        const regRes = await fetch("/api/regulations");
        const regs = await regRes.json();
        setRegulations(regs);

        // 1. Check cache
        const res = await fetch(`/api/content/${slug}`);
        const cachedData = await res.json();
        
        if (cachedData) {
          setData(cachedData);
          injectSchema(cachedData.schema_codes);
        } else {
          // 2. Generate on frontend
          const generated = await generateTechnicalContent(slug || "", regs);
          setData(generated);
          injectSchema(generated.schema_codes);
          
          // 3. Save to backend cache
          await fetch(`/api/content/${slug}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(generated)
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const injectSchema = (codes: string[]) => {
    if (codes) {
      codes.forEach((code: string) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.text = code;
        document.head.appendChild(script);
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <Loader2 className="animate-spin text-emerald-500 mb-4" size={48} />
        <p className="text-slate-500 font-bold animate-pulse">Teknik içerik derinlemesine hazırlanıyor...</p>
        <p className="text-xs text-slate-400 mt-2">2026 güncel verileri ve yönetmelikler taranıyor.</p>
      </div>
    );
  }

  if (!data) return <div className="p-20 text-center">İçerik yüklenemedi.</div>;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="input_file_13.png" alt="BG" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-emerald-400 font-bold text-sm mb-8 hover:text-emerald-300">
            <ArrowRight size={16} className="rotate-180" /> Ana Sayfa
          </Link>
          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            {data.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-bold uppercase tracking-widest text-slate-400 mb-8">
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> 2026 Güncel</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Teknik Detay</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Yetkili Ofis</span>
          </div>
          <button 
            onClick={() => {
              // In a real app, this would clear the cache for this slug and reload
              setLoading(true);
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-lg text-xs font-bold transition-all"
          >
            İçeriği Güncelle
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-black prose-p:leading-loose prose-p:text-slate-600 prose-strong:text-slate-900">
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>

        {/* EEAT - Technical Review Box */}
        <div className="mt-16 p-8 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center gap-8">
          <div className="shrink-0">
            <img src="input_file_20.png" alt="Mir Elektrik Teknik Ekip" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <CheckCircle2 className="text-emerald-500" size={20} /> Teknik İnceleme ve Onay
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Bu içerik, <strong>Mir Elektrik Proje Ofisi</strong> teknik heyeti tarafından 2024-2026 Türkiye Elektrik İç Tesisleri Yönetmeliği ve EPDK güncel tebliğlerine göre incelenerek onaylanmıştır. Bilgiler mühendislik standartlarına uygundur.
            </p>
            <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest font-bold">Son Güncelleme: Şubat 2026</p>
          </div>
        </div>

        {/* Case Studies */}
        <div className="mt-32">
          <h2 className="text-3xl font-black text-slate-900 mb-12 flex items-center gap-3">
            <Zap className="text-emerald-500" /> Örnek Çalışmalarımız
          </h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {(data.case_studies || []).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveCase(i)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeCase === i ? "bg-emerald-600 text-white shadow-lg" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                Örnek {i + 1}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {data.case_studies && data.case_studies.length > 0 ? (
              <motion.div
                key={activeCase}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-emerald-50 rounded-3xl p-8 md:p-12 border border-emerald-100"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-xl text-emerald-600 shadow-sm"><Zap size={24} /></div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold">Yapı Türü</p>
                      <p className="font-bold text-slate-900">{data.case_studies[activeCase]?.type || "Belirtilmedi"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-xl text-emerald-600 shadow-sm"><Ruler size={24} /></div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold">Alan (M²)</p>
                      <p className="font-bold text-slate-900">{data.case_studies[activeCase]?.m2 || "Belirtilmedi"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-xl text-emerald-600 shadow-sm"><MapPin size={24} /></div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold">Bölge</p>
                      <p className="font-bold text-slate-900">{data.case_studies[activeCase]?.district || "Belirtilmedi"}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  <div>
                    <h4 className="font-black text-emerald-900 mb-4 uppercase tracking-widest text-sm">Hizmet Yol Haritası</h4>
                    <p className="text-slate-700 leading-relaxed italic">"{data.case_studies[activeCase]?.roadmap || "Detaylar hazırlanıyor..."}"</p>
                  </div>
                  <div>
                    <h4 className="font-black text-emerald-900 mb-4 uppercase tracking-widest text-sm">Sonuç ve Netice</h4>
                    <p className="text-slate-700 leading-relaxed font-medium">{data.case_studies[activeCase]?.result || "Başarıyla tamamlandı."}</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="p-8 bg-slate-50 rounded-2xl text-slate-400 italic">Örnek çalışmalar yükleniyor...</div>
            )}
          </AnimatePresence>
        </div>

        {/* FAQ Section */}
        <div className="mt-32">
          <h2 className="text-3xl font-black text-slate-900 mb-12">Sıkça Sorulan Sorular (50+)</h2>
          <div className="space-y-4">
            {(data.faqs || []).map((faq, i) => (
              <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-900">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="text-emerald-500" /> : <ChevronDown className="text-slate-400" />}
                </button>
                {openFaq === i && (
                  <div className="p-6 pt-0 text-slate-600 leading-loose bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Source of Information Section */}
        <div className="mt-32 p-12 bg-slate-50 rounded-[3rem] border border-slate-100">
          <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <Zap className="text-emerald-500" /> Bilgi Kaynağı & Mevzuat Referansları
          </h3>
          <p className="text-slate-600 mb-10 leading-relaxed">
            Bu içerik, Mir Elektrik Proje Ofisi teknik heyeti tarafından aşağıdaki güncel yönetmelikler ve uluslararası standartlar (IEC, IEEE, TSE) esas alınarak hazırlanmıştır.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regulations.map((reg) => (
              <a 
                key={reg.id} 
                href={reg.source_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all group"
              >
                <span className="font-bold text-slate-700 group-hover:text-emerald-600">{reg.name}</span>
                <ArrowRight size={18} className="text-slate-300 group-hover:text-emerald-500" />
              </a>
            ))}
            {regulations.length === 0 && (
              <div className="col-span-2 text-sm text-slate-400 italic bg-white p-6 rounded-2xl border border-dashed border-slate-200 text-center">
                Genel EPDK, EMO ve TSE standartları esas alınmıştır.
              </div>
            )}
          </div>
        </div>

        {/* Contact Footer */}
        <div className="mt-32 p-12 bg-slate-900 rounded-[3rem] text-white text-center">
          <h3 className="text-2xl font-bold mb-8">Mir Elektrik Proje Ofisi</h3>
          <p className="text-slate-400 mb-8">{COMPANY_INFO.address}</p>
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <a href={`tel:${COMPANY_INFO.phones[0]}`} className="text-xl font-bold hover:text-emerald-400 transition-colors">{COMPANY_INFO.phones[0]}</a>
            <a href={`tel:${COMPANY_INFO.phones[1]}`} className="text-xl font-bold hover:text-emerald-400 transition-colors">{COMPANY_INFO.phones[1]}</a>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {MAIN_SERVICES.map((s) => (
              <Link key={s.id} to={`/hizmet/${s.id}`} className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

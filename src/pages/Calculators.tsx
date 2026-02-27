import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Download, Zap, Info, CheckCircle2 } from "lucide-react";

const TOOLS = [
  { id: "gerilim-dusumu", title: "Gerilim Düşümü Hesabı", desc: "Kablo kesiti ve uzunluğuna göre gerilim düşümü kontrolü." },
  { id: "akim-tasima", title: "Akım Taşıma Kapasitesi", desc: "Kablo tipine ve döşeme şekline göre akım taşıma hesabı." },
  { id: "trafo-gucu", title: "Trafo Gücü Hesabı", desc: "Kurulu güç ve eş zamanlılık faktörüne göre trafo seçimi." },
  { id: "aydinlatma", title: "Aydınlatma Hesabı", desc: "Alan büyüklüğü ve lümen ihtiyacına göre armatür sayısı." },
  { id: "topraklama", title: "Topraklama Direnci", desc: "Elektrot sayısı ve toprak özgül direncine göre hesaplama." },
  { id: "kompanzasyon", title: "Kompanzasyon Hesabı", desc: "Hedef cosφ değerine göre kondansatör gücü belirleme." },
  { id: "kisa-devre", title: "Kısa Devre Akımı", desc: "Trafo gücü ve empedansına göre kısa devre hesabı." },
  { id: "paratoner", title: "Paratoner Koruma Çapı", desc: "Yükseklik ve koruma seviyesine göre etki alanı hesabı." },
  { id: "jenerator", title: "Jeneratör Gücü Seçimi", desc: "Kritik yükler ve demeraj akımlarına göre jeneratör hesabı." },
  { id: "ups-secimi", title: "UPS Kapasite Hesabı", desc: "Zayıf akım ve IT yüklerine göre UPS gücü belirleme." },
  { id: "kablo-kanali", title: "Kablo Kanalı Doluluk", desc: "Kablo çaplarına göre kanal genişliği seçimi." },
  { id: "motor-akimi", title: "Motor Nominal Akımı", desc: "Güç ve verime göre motor akımı hesaplama." },
  { id: "isi-kaybi", title: "Pano Isı Kaybı", desc: "Pano içi ekipmanlara göre havalandırma ihtiyacı." },
  { id: "busbar", title: "Busbar Gerilim Düşümü", desc: "Busbar sistemleri için özel gerilim düşümü hesabı." },
  { id: "gunes-paneli", title: "Güneş Paneli Sayısı", desc: "Tüketim ve ışınım verilerine göre panel hesabı." },
  { id: "yangin-dedektor", title: "Yangın Dedektör Sayısı", desc: "Alan ve tavan yüksekliğine göre dedektör yerleşimi." },
  { id: "kamera-depolama", title: "CCTV Depolama Hesabı", desc: "Kamera sayısı ve çözünürlüğe göre HDD ihtiyacı." },
  { id: "ses-sistemi", title: "Anons Hoparlör Gücü", desc: "Ortam gürültüsüne göre hoparlör gücü seçimi." },
  { id: "kablo-agirligi", title: "Kablo Ağırlık Hesabı", desc: "Metraj ve kablo tipine göre toplam ağırlık hesabı." },
  { id: "maliyet-analizi", title: "Yaklaşık Maliyet Analizi", desc: "Birim fiyatlara göre ön keşif maliyet hesabı." }
];

export default function Calculators() {
  const [activeTool, setActiveTool] = useState(TOOLS[0].id);
  const [inputs, setInputs] = useState<any>({ power: 10, length: 50, section: 2.5 });
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    if (activeTool === "gerilim-dusumu") {
      const { power, length, section } = inputs;
      // Formula: %e = (0.0124 * L * P) / S (for 3-phase copper)
      const e = (0.0124 * length * power) / section;
      setResult({ value: e.toFixed(2), unit: "%", status: e <= 3 ? "Uygun" : "Uygun Değil" });
    } else {
      setResult({ value: "Örnek Veri", unit: "-", status: "Hesaplandı" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Mühendislik Hesaplama Araçları</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          2026 yönetmeliklerine ve standart formüllere dayalı, profesyonel hesaplama modülleri.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Tool List */}
        <div className="lg:col-span-1 space-y-2">
          {TOOLS.map((tool) => (
            <button
              key={tool.id}
              onClick={() => { setActiveTool(tool.id); setResult(null); }}
              className={`w-full text-left p-4 rounded-xl text-sm font-bold transition-all border ${
                activeTool === tool.id 
                ? "bg-emerald-600 text-white border-emerald-600 shadow-lg" 
                : "bg-white text-slate-600 border-slate-100 hover:bg-slate-50"
              }`}
            >
              {tool.title}
            </button>
          ))}
        </div>

        {/* Calculator Interface */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
            <div className="bg-slate-900 p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-emerald-500 p-3 rounded-xl"><Calculator size={24} /></div>
                <div>
                  <h2 className="text-2xl font-bold">{TOOLS.find(t => t.id === activeTool)?.title}</h2>
                  <p className="text-slate-400 text-sm">{TOOLS.find(t => t.id === activeTool)?.desc}</p>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Güç (kW)</label>
                    <input 
                      type="number" 
                      value={inputs.power} 
                      onChange={(e) => setInputs({...inputs, power: parseFloat(e.target.value)})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Mesafe (m)</label>
                    <input 
                      type="number" 
                      value={inputs.length} 
                      onChange={(e) => setInputs({...inputs, length: parseFloat(e.target.value)})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Kablo Kesiti (mm²)</label>
                    <select 
                      value={inputs.section} 
                      onChange={(e) => setInputs({...inputs, section: parseFloat(e.target.value)})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    >
                      {[1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240].map(s => (
                        <option key={s} value={s}>{s} mm²</option>
                      ))}
                    </select>
                  </div>
                  <button 
                    onClick={calculate}
                    className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/20"
                  >
                    Hesapla
                  </button>
                </div>

                <div className="bg-slate-50 rounded-2xl p-8 flex flex-col items-center justify-center text-center border border-slate-100">
                  {result ? (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Hesaplama Sonucu</p>
                      <p className="text-6xl font-black text-slate-900 mb-2">{result.value}<span className="text-2xl ml-1">{result.unit}</span></p>
                      <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-bold ${
                        result.status === "Uygun" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                      }`}>
                        {result.status === "Uygun" ? <CheckCircle2 size={16} /> : <Info size={16} />}
                        {result.status}
                      </div>
                      <button className="mt-8 flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors mx-auto">
                        <Download size={18} /> PDF Olarak İndir
                      </button>
                    </motion.div>
                  ) : (
                    <div className="text-slate-300">
                      <Zap size={64} className="mx-auto mb-4 opacity-20" />
                      <p className="font-bold">Verileri girip hesapla butonuna basın.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-8">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Info size={18} className="text-emerald-500" /> Hesaplama Metodolojisi
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Bu hesaplama, EMO (Elektrik Mühendisleri Odası) ve EPDK tarafından yayınlanan güncel teknik uygulama esaslarına dayanmaktadır. 3 fazlı sistemler için bakır iletken katsayısı (0.0124) kullanılmıştır. Sonuçlar yaklaşık değerler olup, resmi projelerde mühendis onayı gereklidir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, CheckCircle2, ArrowRight, FileText, Calculator, Info } from "lucide-react";
import { MAIN_SERVICES, STRUCTURE_TYPES, CITIES, OSB_REGIONS, COMPANY_INFO } from "../constants/data";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = MAIN_SERVICES.find((s) => s.id === slug);

  if (!service) return <div className="p-20 text-center">Hizmet bulunamadı.</div>;

  // Generate 250+ sub-page links dynamically for maximum SEO coverage
  const subPages = [];
  const districts = CITIES["Bursa"];
  
  for (let i = 0; i < 250; i++) {
    const struct = STRUCTURE_TYPES[i % STRUCTURE_TYPES.length];
    const district = districts[i % districts.length];
    const osb = OSB_REGIONS[i % OSB_REGIONS.length];
    
    let title = "";
    const intents = [
      "Proje Hazırlama Esasları",
      "2026 Güncel Yönetmelik Uyumu",
      "Teknik Şartname ve Detaylar",
      "Maliyet Analizi ve Birim Fiyatlar",
      "Uygulama Hataları ve Çözümleri",
      "Enerji Verimliliği Stratejileri"
    ];
    const intent = intents[i % intents.length];

    if (i % 4 === 0) title = `${district} ${struct} ${intent}`;
    else if (i % 4 === 1) title = `${osb} Fabrika ${intent}`;
    else if (i % 4 === 2) title = `${district} Bölgesi ${intent}`;
    else title = `${district} OSB ${intent}`;

    const subSlug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    subPages.push({ title, slug: subSlug });
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-slate-50 py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <Link to="/" className="text-emerald-600 font-bold text-sm flex items-center gap-2 mb-6">
                <ArrowRight size={16} className="rotate-180" /> Ana Sayfa
              </Link>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                {service.title}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {service.description} Mir Elektrik Proje Ofisi olarak, Bursa'nın tüm ilçelerinde ve sanayi bölgelerinde en yüksek teknik standartlarda hizmet veriyoruz.
              </p>
              <div className="flex gap-4">
                <a href={`tel:${COMPANY_INFO.phones[0]}`} className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all">
                  Hemen Teklif Alın
                </a>
                <Link to="/hesaplama-araclari" className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
                  <Calculator size={18} /> Hesaplama Araçları
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full">
              <img
                src={(service as any).image || `https://picsum.photos/seed/${service.id}/800/600`}
                alt={service.title}
                className="rounded-3xl shadow-2xl w-full object-cover h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Deep Content Section (Simulated Long Form) */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div className="prose prose-slate max-w-none">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Kapsamlı Teknik Detaylar ve Uygulama Esasları</h2>
              <p className="text-slate-600 leading-loose mb-6">
                Elektrik projeleri, bir yapının can damarıdır. Mir Elektrik Proje Ofisi olarak hazırladığımız projeler, sadece birer çizim değil, aynı zamanda güvenliğin ve verimliliğin teminatıdır. 2026 yılına kadar olan en güncel yönetmelikler ışığında, EPDK ve EMO standartlarını eksiksiz uyguluyoruz.
              </p>
              
              <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100 mb-12">
                <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                  <Info size={20} /> Önemli Teknik Notlar
                </h3>
                <ul className="space-y-3">
                  {[
                    "Gerilim düşümü hesapları %3 sınır değerine göre hassasiyetle yapılır.",
                    "Kablo kesitleri, akım taşıma kapasitesi ve ısınma kriterlerine göre belirlenir.",
                    "Topraklama projeleri, TN-S veya TT sistemlerine uygun olarak tasarlanır.",
                    "Yangın algılama sistemleri, binaların yangından korunması hakkındaki yönetmeliğe tam uyumludur."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-emerald-800 text-sm">
                      <CheckCircle2 size={16} className="mt-1 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-6">Proje Hazırlama Sürecimiz</h3>
              <div className="space-y-8">
                {[
                  { step: "01", title: "Keşif ve İhtiyaç Analizi", desc: "Yapının türüne ve kullanım amacına göre enerji ihtiyacı belirlenir." },
                  { step: "02", title: "Ön Proje ve Konsept Tasarım", desc: "Temel hatlar ve ana dağıtım panoları planlanır." },
                  { step: "03", title: "Teknik Hesaplamalar", desc: "Yükleme cetvelleri, gerilim düşümü ve kısa devre hesapları yapılır." },
                  { step: "04", title: "Uygulama ve Detay Çizimleri", desc: "Priz, aydınlatma, zayıf akım ve kuvvetli akım planları hazırlanır." },
                  { step: "05", title: "Resmi Onay Süreçleri", desc: "UEDAŞ, Belediye ve ilgili kurum onayları takip edilir." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="text-4xl font-black text-slate-200">{item.step}</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Internal Links to Sub-pages */}
            <div className="mt-20">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 border-l-4 border-emerald-500 pl-4">
                Detaylı Hizmet Başlıklarımız (160+ Alt Başlık)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subPages.map((page, i) => (
                  <Link
                    key={i}
                    to={`/detay/${page.slug}`}
                    className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-all border border-slate-100 group"
                  >
                    <FileText size={18} className="text-slate-400 group-hover:text-emerald-500" />
                    <span className="text-sm font-medium">{page.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-slate-900 text-white p-8 rounded-3xl sticky top-24">
              <h3 className="text-xl font-bold mb-6">Diğer Ana Hizmetlerimiz</h3>
              <div className="space-y-4">
                {MAIN_SERVICES.filter(s => s.id !== slug).map((s) => (
                  <Link
                    key={s.id}
                    to={`/hizmet/${s.id}`}
                    className="block p-4 bg-white/5 rounded-xl hover:bg-emerald-500 transition-all group"
                  >
                    <p className="font-bold group-hover:text-white">{s.title}</p>
                    <p className="text-xs text-slate-400 mt-1 group-hover:text-emerald-100">İncelemek için tıklayın</p>
                  </Link>
                ))}
              </div>
              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-sm text-slate-400 mb-4">Sorularınız için:</p>
                <a href={`tel:${COMPANY_INFO.phones[0]}`} className="text-2xl font-bold text-emerald-400 block mb-2">
                  {COMPANY_INFO.phones[0]}
                </a>
                <p className="text-xs text-slate-500 uppercase tracking-widest">Bursa Yetkili Proje Ofisi</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

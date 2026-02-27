import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, Shield, Clock, Award, ArrowRight, CheckCircle2 } from "lucide-react";
import { MAIN_SERVICES, COMPANY_INFO } from "../constants/data";

export default function Home() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 pt-20 pb-32">
        <div className="absolute inset-0 opacity-40">
          <img
            src="input_file_22.png"
            alt="Mir Elektrik Banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block bg-emerald-500/20 text-emerald-400 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-emerald-500/30">
              2026 Güncel Mevzuat Uyumlu
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-8">
              Bursa'nın Güvenilir <span className="text-emerald-500">Elektrik Proje</span> Çözüm Ortağı
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Mir Elektrik Proje Ofisi olarak, Bursa ve çevre illerde sanayi tesislerinden konutlara kadar her yapı türü için profesyonel proje ve danışmanlık hizmeti sunuyoruz.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/hizmet/elektrik-uygulama-projeleri"
                className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl hover:shadow-emerald-500/20 flex items-center gap-2"
              >
                Hizmetlerimizi İnceleyin <ArrowRight size={20} />
              </Link>
              <a
                href={`tel:${COMPANY_INFO.phones[0]}`}
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                Hemen Arayın
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats/Features */}
      <section className="max-w-7xl mx-auto px-4 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Shield, title: "Yetkili Firma", desc: "UEDAŞ ve Belediye Onaylı" },
            { icon: Clock, title: "Hızlı Teslimat", desc: "Zamanında Proje Onayı" },
            { icon: Award, title: "Uzman Kadro", desc: "Derinlemesine Teknik Bilgi" },
            { icon: Zap, title: "Güncel Mevzuat", desc: "2026 Standartlarına Uygun" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:border-emerald-500 transition-colors"
            >
              <div className="bg-emerald-50 p-4 rounded-xl text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <item.icon size={32} />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Services */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Ana Hizmet Alanlarımız</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Elektrik projelerinden danışmanlığa, her aşamada en ince ayrıntısına kadar titizlikle çalışıyoruz.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MAIN_SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all group"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={service.image || `https://picsum.photos/seed/${service.id}/600/400`}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <h3 className="text-white font-bold text-xl">{service.title}</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-600 mb-6 line-clamp-2 text-sm leading-relaxed">
                  {service.description}
                </p>
                <Link
                  to={`/hizmet/${service.id}`}
                  className="text-emerald-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Detayları İncele <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-emerald-50 py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-8">Neden Mir Elektrik Proje Ofisi?</h2>
            <div className="space-y-6">
              {[
                "Bursa'nın tüm ilçelerinde (Osmangazi, Nilüfer, İnegöl vb.) yetkili hizmet.",
                "UEDAŞ ve Belediye süreçlerinde tam hakimiyet ve hızlı sonuç.",
                "Sanayi bölgeleri (OSB) için özel teknik çözümler ve revizyonlar.",
                "2026 yılına kadar geçerli en güncel yönetmeliklere tam uyum.",
                "Mühendislik hesaplamalarında %100 doğruluk ve güvenilirlik."
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="bg-emerald-500 text-white p-1 rounded-full shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <p className="text-slate-700 font-medium">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 p-6 bg-white rounded-2xl border border-emerald-100 shadow-sm">
              <p className="text-slate-500 text-sm italic mb-4">
                "Bursa dışındaki firmalar için Bursa'daki projelerinde yerel çözüm ortağıyız."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                <div>
                  <p className="font-bold text-slate-900">Ebru Hanım</p>
                  <p className="text-xs text-slate-500">Proje Koordinatörü</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="input_file_24.png"
              alt="Mir Elektrik Uzman Ekip"
              className="rounded-3xl shadow-2xl"
            />
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
              <img src="input_file_21.png" alt="Yetkili Firma" className="w-24 mb-4" />
              <p className="text-4xl font-black text-emerald-600 mb-1">15+</p>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Yıllık Deneyim</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full -ml-32 -mb-32"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 relative z-10">
            Projeniz İçin Profesyonel Destek Alın
          </h2>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto relative z-10">
            Hemen bizi arayın veya WhatsApp üzerinden iletişime geçin. Uzman ekibimiz size en kısa sürede dönüş yapacaktır.
          </p>
          <div className="flex flex-wrap justify-center gap-6 relative z-10">
            <a
              href={`tel:${COMPANY_INFO.phones[0]}`}
              className="bg-emerald-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-emerald-700 transition-all shadow-xl"
            >
              {COMPANY_INFO.phones[0]}
            </a>
            <Link
              to="/hesaplama-araclari"
              className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-slate-100 transition-all"
            >
              Hesaplama Araçları
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

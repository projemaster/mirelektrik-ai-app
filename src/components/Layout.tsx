import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Zap, Menu, X } from "lucide-react";
import { COMPANY_INFO, MAIN_SERVICES } from "../constants/data";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-900 font-sans">
      {/* Top Bar */}
      <div className="bg-slate-900 text-white py-2 px-4 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <a href={`tel:${COMPANY_INFO.phones[0]}`} className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
              <Phone size={14} /> {COMPANY_INFO.phones[0]}
            </a>
            <a href={`mailto:${COMPANY_INFO.email}`} className="hidden sm:flex items-center gap-1 hover:text-emerald-400 transition-colors">
              <Mail size={14} /> {COMPANY_INFO.email}
            </a>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} className="text-emerald-400" />
            <span>{COMPANY_INFO.address}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-emerald-500 p-2 rounded-lg text-white group-hover:bg-emerald-600 transition-colors">
              <Zap size={24} fill="currentColor" />
            </div>
            <div>
              <h1 className="font-bold text-xl leading-tight text-slate-900">MİR ELEKTRİK</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">{COMPANY_INFO.tagline}</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="font-medium hover:text-emerald-600 transition-colors">Ana Sayfa</Link>
            <div className="relative group">
              <button className="font-medium hover:text-emerald-600 transition-colors flex items-center gap-1">
                Hizmetlerimiz
              </button>
              <div className="absolute top-full left-0 w-64 bg-white shadow-xl border border-slate-100 rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                {MAIN_SERVICES.map((service) => (
                  <Link
                    key={service.id}
                    to={`/hizmet/${service.id}`}
                    className="block px-4 py-2 text-sm hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/blog/elektrik-ruhsat-projeleri" className="font-medium hover:text-emerald-600 transition-colors">Blog</Link>
            <Link to="/icerik-haritasi" className="font-medium hover:text-emerald-600 transition-colors">İçerik Haritası</Link>
            <Link to="/iletisim" className="font-medium hover:text-emerald-600 transition-colors">İletişim</Link>
            <Link to="/admin-panel-mir" className="bg-slate-900 text-white px-5 py-2 rounded-full font-semibold hover:bg-slate-800 transition-all shadow-md">
              Admin Paneli
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 py-4 px-4 space-y-4 shadow-inner">
            <Link to="/" className="block font-medium py-2 border-b border-slate-50" onClick={() => setIsMenuOpen(false)}>Ana Sayfa</Link>
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hizmetlerimiz</p>
              {MAIN_SERVICES.map((service) => (
                <Link
                  key={service.id}
                  to={`/hizmet/${service.id}`}
                  className="block py-2 pl-4 text-slate-700 hover:text-emerald-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {service.title}
                </Link>
              ))}
            </div>
            <Link to="/blog/elektrik-ruhsat-projeleri" className="block font-medium py-2 border-b border-slate-50" onClick={() => setIsMenuOpen(false)}>Blog</Link>
            <Link to="/icerik-haritasi" className="block font-medium py-2 border-b border-slate-50" onClick={() => setIsMenuOpen(false)}>İçerik Haritası</Link>
            <Link to="/iletisim" className="block font-medium py-2 border-b border-slate-50" onClick={() => setIsMenuOpen(false)}>İletişim</Link>
            <Link to="/admin-panel-mir" className="block font-bold py-3 px-4 bg-slate-900 text-white rounded-xl text-center" onClick={() => setIsMenuOpen(false)}>Admin Paneli</Link>
          </div>
        )}
      </header>

      <main className="pb-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Zap className="text-emerald-400" size={32} fill="currentColor" />
              <h2 className="font-bold text-2xl tracking-tight">MİR ELEKTRİK</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Bursa merkezli, yetkili elektrik proje ofisi olarak; uygulama, ruhsat, abone ve güç arttırımı projelerinde uzman mühendislik çözümleri sunuyoruz.
            </p>
            <div className="flex gap-4">
              {/* Social links placeholder */}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 border-b border-slate-800 pb-2">Hizmetlerimiz</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              {MAIN_SERVICES.map((service) => (
                <li key={service.id}>
                  <Link to={`/hizmet/${service.id}`} className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 border-b border-slate-800 pb-2">Hızlı Erişim</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">Ana Sayfa</Link></li>
              <li><Link to="/hesaplama-araclari" className="hover:text-emerald-400 transition-colors">Hesaplama Araçları</Link></li>
              <li><a href={COMPANY_INFO.website} className="hover:text-emerald-400 transition-colors">Kurumsal Sitemiz</a></li>
              <li><Link to="/detay/bursa-elektrik-proje-danismanlik" className="hover:text-emerald-400 transition-colors">Bursa Proje Danışmanlığı</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 border-b border-slate-800 pb-2">İletişim</h3>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-emerald-400 shrink-0" size={18} />
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-emerald-400 shrink-0" size={18} />
                <div>
                  <p>{COMPANY_INFO.phones[0]}</p>
                  <p>{COMPANY_INFO.phones[1]}</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-emerald-400 shrink-0" size={18} />
                <span>{COMPANY_INFO.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
          <p>© 2026 {COMPANY_INFO.name}. Tüm Hakları Saklıdır. Bursa Yetkili Elektrik Firması.</p>
          <p className="mt-2 italic">Bu uygulama Mir Elektrik Proje Ofisi için özel olarak tasarlanmıştır.</p>
        </div>
      </footer>
    </div>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { MAIN_SERVICES, SERVICE_SUBTITLES, CITIES, OSB_REGIONS } from "../constants/data";
import { Link } from "react-router-dom";
import { Zap, MapPin, Factory, ChevronRight } from "lucide-react";

export default function ContentMap() {
  const [activeTab, setActiveTab] = useState(MAIN_SERVICES[0].id);

  const getSubPages = (serviceId: string) => {
    const technical = SERVICE_SUBTITLES[serviceId] || [];
    
    // Add City/District pages
    const cityPages: string[] = [];
    Object.entries(CITIES).forEach(([city, districts]) => {
      districts.forEach(district => {
        cityPages.push(`${city} ${district} ${MAIN_SERVICES.find(s => s.id === serviceId)?.title}`);
      });
    });

    // Add OSB pages
    const osbPages = OSB_REGIONS.map(osb => `${osb} ${MAIN_SERVICES.find(s => s.id === serviceId)?.title}`);

    return [...technical, ...cityPages, ...osbPages];
  };

  return (
    <div className="bg-white min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">Genel İçerik Haritası</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Mir Elektrik Proje Ofisi'nin tüm teknik uzmanlık alanları, bölgesel hizmetleri ve OSB projeleri için hazırlanan kapsamlı içerik dizini.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-slate-100 pb-8">
          {MAIN_SERVICES.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveTab(service.id)}
              className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeTab === service.id 
                  ? "bg-emerald-600 text-white shadow-xl scale-105" 
                  : "bg-slate-50 text-slate-500 hover:bg-slate-100"
              }`}
            >
              {service.title}
            </button>
          ))}
        </div>

        {/* Content List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getSubPages(activeTab).map((page, index) => (
            <Link
              key={index}
              to={`/detay/${page.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")}`}
              className="group p-4 bg-white border border-slate-100 rounded-2xl hover:border-emerald-500 hover:shadow-xl transition-all flex items-center justify-between"
            >
              <span className="text-sm font-bold text-slate-700 group-hover:text-emerald-600 transition-colors">
                {page}
              </span>
              <ChevronRight size={16} className="text-slate-300 group-hover:text-emerald-500 transition-all transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>

        {/* SEO Summary */}
        <div className="mt-24 p-12 bg-slate-900 rounded-[3rem] text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-4xl font-black text-emerald-400 mb-2">2500+</div>
              <p className="text-slate-400 text-sm uppercase tracking-widest font-bold">Teknik İçerik</p>
            </div>
            <div>
              <div className="text-4xl font-black text-emerald-400 mb-2">55+</div>
              <p className="text-slate-400 text-sm uppercase tracking-widest font-bold">Hizmet Bölgesi</p>
            </div>
            <div>
              <div className="text-4xl font-black text-emerald-400 mb-2">14+</div>
              <p className="text-slate-400 text-sm uppercase tracking-widest font-bold">OSB Bölgesi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

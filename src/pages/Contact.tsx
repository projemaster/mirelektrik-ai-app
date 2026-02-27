import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Globe, CheckCircle2 } from "lucide-react";
import { COMPANY_INFO } from "../constants/data";

export default function Contact() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-slate-900 py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="input_file_94.png" alt="Mir Elektrik Hero" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6">İletişim</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Mir Elektrik Proje Ofisi - Bursa Yetkili Elektrik Firması. Projeleriniz için uzman mühendis kadromuzla yanınızdayız.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-8">Bize Ulaşın</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-widest text-xs">Merkez Ofis</h4>
                    <p className="text-slate-600 leading-relaxed">
                      Doğanbey Mh. Doğanbey Cd. Burçin 3 İş Hanı Kat 9 No 906 Osmangazi - Bursa
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-widest text-xs">Telefon</h4>
                    <div className="space-y-1">
                      <p className="text-slate-600 font-bold">0546 252 25 15</p>
                      <p className="text-slate-600 font-bold">0546 252 25 16</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-widest text-xs">Çalışma Saatleri</h4>
                    <p className="text-slate-600">Hafta İçi: 09:00 - 18:00</p>
                    <p className="text-slate-600">Cumartesi: 09:00 - 13:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 bg-emerald-600 rounded-[3rem] text-white shadow-2xl shadow-emerald-200">
              <h3 className="text-2xl font-black mb-6">Hızlı Teklif</h3>
              <p className="text-emerald-100 mb-8">Projeniz hakkında detaylı bilgi almak ve fiyat teklifi oluşturmak için bizi arayabilir veya ofisimize gelebilirsiniz.</p>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="text-emerald-300" />
                <span className="font-bold">Bursa Yetkili Elektrik Firması</span>
              </div>
            </div>
          </div>

          {/* Map & Image */}
          <div className="space-y-8">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11159.589192421274!2d29.05039011682492!3d40.19007001525322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca3f79ab2046d9%3A0xa923b225163cdef7!2sMir%20Elektrik%20Proje!5e1!3m2!1str!2str!4v1772097465263!5m2!1str!2str" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="rounded-[3rem] overflow-hidden shadow-2xl">
              <img src="input_file_94.png" alt="Mir Elektrik İletişim" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

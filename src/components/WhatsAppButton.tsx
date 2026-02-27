import { MessageCircle } from "lucide-react";
import { COMPANY_INFO } from "../constants/data";

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp.replace(/\s/g, "")}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-600 transition-all transform hover:scale-110 flex items-center justify-center group"
      aria-label="WhatsApp İletişim"
    >
      <MessageCircle size={32} fill="currentColor" />
      <span className="absolute right-full mr-3 bg-white text-slate-900 px-3 py-1 rounded-lg text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-100">
        Hızlı İletişim
      </span>
    </a>
  );
}

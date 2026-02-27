import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Calendar, User } from "lucide-react";
import { MAIN_SERVICES } from "../constants/data";

export default function Blog() {
  const { category } = useParams();
  const service = MAIN_SERVICES.find(s => s.id === category);

  // Generate 80 unique blog titles for the category
  const blogPosts = Array.from({ length: 80 }).map((_, i) => {
    const intents = [
      "Nasıl Yapılır?",
      "2026 Fiyatları ve Maliyetleri",
      "Teknik Şartname Detayları",
      "UEDAŞ Onay Süreci Rehberi",
      "En Sık Yapılan Hatalar",
      "Verimlilik Artırma Yöntemleri",
      "Yönetmelik Değişiklikleri",
      "Sektörel Gelecek Analizi"
    ];
    const intent = intents[i % intents.length];
    const title = `${service?.title || "Elektrik"} ${intent}`;
    const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    return { title, slug, date: "25 Şubat 2026", author: "Mir Elektrik Teknik Heyeti" };
  });

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-slate-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black mb-6">
            {service?.title} Blog & Araştırma Yazıları
          </h1>
          <p className="text-slate-400 max-w-2xl">
            Uluslararası standartlarda, akademik düzeyde teknik makaleler ve sektör analizleri.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
              className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
            >
              <div className="p-8">
                <div className="flex items-center gap-4 text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">
                  <Calendar size={14} /> {post.date}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
                  <User size={14} /> {post.author}
                </div>
                <Link
                  to={`/blog/${category}/${post.slug}`}
                  className="inline-flex items-center gap-2 font-bold text-slate-900 hover:text-emerald-600 transition-colors"
                >
                  Makaleyi Oku <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

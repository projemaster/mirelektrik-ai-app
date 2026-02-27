import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Loader2, Share2, Printer, ArrowRight } from "lucide-react";
import { generateBlogPost } from "../services/geminiService";

export default function BlogPost() {
  const { category, slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [regulations, setRegulations] = useState<any[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        // 0. Fetch regulations
        const regRes = await fetch("/api/regulations");
        const regs = await regRes.json();
        setRegulations(regs);

        // 1. Check cache
        const res = await fetch(`/api/blog/${category}/${slug}`);
        const cached = await res.json();
        
        if (cached) {
          setPost(cached);
        } else {
          // 2. Generate on frontend
          const generated = await generateBlogPost(category || "", slug || "", regs);
          setPost(generated);
          
          // 3. Save to cache
          await fetch(`/api/blog/${category}/${slug}`, {
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
    fetchPost();
  }, [category, slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="animate-spin text-emerald-500 mb-4" size={48} />
        <p className="text-slate-500 font-bold">Akademik makale yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Link to={`/blog/${category}`} className="inline-flex items-center gap-2 text-emerald-600 font-bold mb-12 hover:gap-3 transition-all">
          <ArrowLeft size={20} /> Kategoriye Dön
        </Link>

        <article className="space-y-12">
          <header className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                {category?.replace(/-/g, " ")}
              </span>
              <span className="text-slate-400 text-sm">25 Şubat 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-between py-6 border-y border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                <div>
                  <p className="font-bold text-slate-900">Mir Elektrik Teknik Heyeti</p>
                  <p className="text-xs text-slate-500">Mühendislik & Araştırma Birimi</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors"><Share2 size={20} /></button>
                <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors"><Printer size={20} /></button>
              </div>
            </div>
          </header>

          <div 
            className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-black prose-p:leading-loose prose-p:text-slate-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Source of Information Section */}
          <div className="mt-20 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100">
            <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <BookOpen size={24} className="text-emerald-500" /> Bilgi Kaynağı & Mevzuat Referansları
            </h3>
            <p className="text-slate-600 text-sm mb-8 leading-relaxed">
              Bu makale, aşağıdaki güncel yönetmelikler ve teknik standartlar ışığında Mir Elektrik tarafından kaleme alınmıştır.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {regulations.map((reg) => (
                <a 
                  key={reg.id} 
                  href={reg.source_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group"
                >
                  <span className="font-bold text-slate-700 group-hover:text-emerald-600">{reg.name}</span>
                  <ArrowRight size={16} className="text-slate-300 group-hover:text-emerald-500" />
                </a>
              ))}
              {regulations.length === 0 && (
                <div className="col-span-2 text-sm text-slate-400 italic">
                  Genel mühendislik standartları esas alınmıştır.
                </div>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

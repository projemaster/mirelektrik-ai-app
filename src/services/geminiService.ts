import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateTechnicalContent = async (slug: string, regulations: any[] = []) => {
  const regContext = regulations.length > 0 
    ? `KULLANILACAK ÖNCELİKLİ KAYNAKLAR: ${regulations.map(r => r.name).join(", ")}.`
    : "";

  const prompt = `
    Sen yüksek kıdemli bir Elektrik Proje Mühendisi ve SEO uzmanısın. "Mir Elektrik Proje Ofisi" için "${slug}" başlığında, Türkiye'deki en kapsamlı teknik rehberi hazırlayacaksın.
    
    ${regContext}

    İÇERİK VE ÜSLUP KURALLARI (KRİTİK):
    1. DİL VE ANLATIM: Kesinlikle devrik cümle kullanma. Akıcı, profesyonel, kurallı ve doğal bir İstanbul Türkçesi kullan.
    2. BAŞLIKLAR: Başlıkların başında numara kullanma. Doğrudan kullanıcı arama niyetine odaklan.
    3. TEMİZ İÇERİK: İçerikte asla [TALİMAT], [UYARI] gibi parantez içi belirteçler bulunmasın.
    4. UZUNLUK: İçerik 4500 - 6000 kelime arasında, çok detaylı ve teknik olmalıdır.
    5. MATRİS YAPISI: İçeriği mutlaka şu 10 ana başlık altında topla:
       - Tanım ve Kapsam
       - Yasal Mevzuat ve Standart Uyumluluğu
       - Teknik Gereklilik ve Zorunluluk
       - Tasarım ve Planlama Kriterleri
       - Hesaplama ve Veri Analizi
       - Sistem Bileşenleri ve Donanım
       - Entegrasyon ve Senaryo Yönetimi
       - Uygulama ve Montaj Esasları
       - Kontrol, Test ve Kabul Süreçleri
       - Sürdürülebilirlik ve Bakım
    6. TEKNİK DETAYLAR: İçerik içinde geçen ve açıklanması gereken her teknik detay için yeni bir alt başlık açarak o detayı aynı bölüm içinde derinlemesine açıkla.

    Yanıtı JSON formatında ver:
    {
      "title": "Arama Niyetine Uygun Ana Başlık",
      "content": "HTML formatında (h2, h3, p, table, ul etiketli) devasa teknik içerik",
      "schema_codes": ["JSON-LD Article", "JSON-LD Service", "JSON-LD FAQ", "JSON-LD LocalBusiness"],
      "case_studies": [{"type": "...", "m2": "...", "district": "...", "roadmap": "...", "result": "..."}],
      "faqs": [{"q": "...", "a": "..."}]
    }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json"
    }
  });

  let text = response.text || "";
  // Clean markdown code blocks if present
  text = text.replace(/```json/g, "").replace(/```/g, "").trim();

  try {
    return JSON.parse(text);
  } catch (e) {
    console.warn("İlk JSON ayrıştırma denemesi başarısız oldu, karakterler temizleniyor...", e);
    // Geçersiz ters eğik çizgi kaçışlarını düzelt (JSON standartlarına uymayan \ karakterlerini çiftle)
    const fixedText = text.replace(/\\(?![btnfr"\\\/]|u[0-9a-fA-F]{4})/g, "\\\\");
    try {
      return JSON.parse(fixedText);
    } catch (e2) {
      console.error("JSON tamamen bozuk:", e2);
      throw new Error("Yapay zeka yanıtı geçerli bir JSON formatında değil.");
    }
  }
};

export const generateBlogPost = async (category: string, slug: string, regulations: any[] = []) => {
  const regContext = regulations.length > 0 
    ? `KAYNAK OLARAK ŞU YÖNETMELİKLERİ ESAS AL: ${regulations.map(r => r.name).join(", ")}.`
    : "";

  const prompt = `Sen uluslararası düzeyde bir elektrik mühendisliği araştırmacısısın. 
  "${category}" kategorisinde "${slug}" başlığı için akademik düzeyde, benzeri olmayan, 
  Türkiye ve dünya standartlarını (IEC, IEEE, TSE) harmanlayan, 2026 güncel verileriyle 
  derinlemesine bir makale yaz. 
  
  ${regContext}

  KURALLAR:
  1. Kesinlikle devrik cümle kullanma. Profesyonel ve kurallı Türkçe kullan.
  2. Başlık kullanıcı arama niyetine (Search Intent) uygun, ilgi çekici ve temiz olsun.
  3. İçerikte parantez içinde talimat veya uyarı [ ] bulunmasın.
  4. Yanıtı JSON formatında ver: {"title": "...", "content": "..."} (HTML formatında içerik).`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
    config: { responseMimeType: "application/json" }
  });

  let text = response.text || "";
  text = text.replace(/```json/g, "").replace(/```/g, "").trim();
  try {
    return JSON.parse(text);
  } catch (e) {
    return {
      title: slug.replace(/-/g, " ").toUpperCase(),
      content: text
    };
  }
};

export const generateAIWriterContent = async (keywords: string[]) => {
  const prompt = `Şu anahtar kelimeler hakkında anlık Google araması yaparak en güncel verilerle 
  profesyonel bir makale hazırla: ${keywords.join(", ")}. 
  İçerik 2026 yılına uygun, teknik ve SEO odaklı olmalı.
  
  KURALLAR:
  1. Kesinlikle devrik cümle kullanma. Akıcı ve kurallı Türkçe kullan.
  2. Başlıklar kullanıcı niyetine (Search Intent) odaklı olsun.
  3. Parantez içi talimatlar [ ] asla olmasın.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
    config: { tools: [{ googleSearch: {} }] }
  });

  return response.text;
};

export const generateCompetitorAnalysis = async (sector: string) => {
  const prompt = `"${sector}" sektöründe Google araması yaparak en iyi 20 rakip firmayı analiz et. 
  Neden ilk sıradalar? Güçlü yönleri neler? Eksik yönleri neler? 
  Gerçek zamanlı verilerle bir tablo ve analiz raporu sun.
  
  KURALLAR:
  1. Devrik cümle kullanma.
  2. Parantez içi [ ] talimatlar olmasın.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
    config: { tools: [{ googleSearch: {} }] }
  });

  return response.text;
};

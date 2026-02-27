import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database("mir_elektrik.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS content_cache (
    id TEXT PRIMARY KEY,
    title TEXT,
    content TEXT,
    schema_codes TEXT,
    case_studies TEXT,
    faqs TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS blog_posts (
    slug TEXT PRIMARY KEY,
    category TEXT,
    title TEXT,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS regulations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    source_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/content/:slug", async (req, res) => {
    const { slug } = req.params;
    
    // Try to get from cache
    const cached = db.prepare("SELECT * FROM content_cache WHERE id = ?").get(slug) as any;
    if (cached) {
      return res.json({
        ...cached,
        schema_codes: JSON.parse(cached.schema_codes || "[]"),
        case_studies: JSON.parse(cached.case_studies || "[]"),
        faqs: JSON.parse(cached.faqs || "[]")
      });
    }
    res.json(null); // Return null if not in cache, client will handle generation
  });

  app.post("/api/content/:slug", (req, res) => {
    const { slug } = req.params;
    const data = req.body;
    
    try {
      db.prepare(`
        INSERT OR REPLACE INTO content_cache (id, title, content, schema_codes, case_studies, faqs)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        slug,
        data.title,
        data.content,
        JSON.stringify(data.schema_codes || []),
        JSON.stringify(data.case_studies || []),
        JSON.stringify(data.faqs || [])
      );
      res.json({ status: "ok" });
    } catch (error) {
      res.status(500).json({ error: "Cache save failed" });
    }
  });

  // Blog Endpoints
  app.get("/api/blog/:category/:slug", async (req, res) => {
    const { slug } = req.params;
    const cached = db.prepare("SELECT * FROM blog_posts WHERE slug = ?").get(slug) as any;
    if (cached) return res.json(cached);
    res.json(null);
  });

  app.post("/api/blog/:category/:slug", (req, res) => {
    const { slug, category } = req.params;
    const { title, content } = req.body;
    try {
      db.prepare("INSERT OR REPLACE INTO blog_posts (slug, category, title, content) VALUES (?, ?, ?, ?)").run(
        slug, category, title, content
      );
      res.json({ status: "ok" });
    } catch (error) {
      res.status(500).json({ error: "Blog cache save failed" });
    }
  });

  // Regulation Endpoints
  app.get("/api/regulations", (req, res) => {
    const regs = db.prepare("SELECT * FROM regulations ORDER BY created_at DESC").all();
    res.json(regs);
  });

  app.get("/api/regulations", (req, res) => {
  try {
    const regs = db.prepare("SELECT * FROM regulations ORDER BY created_at DESC").all();
    res.json(regs);
  } catch (err) {
    console.error("Regulations DB error:", err);
    res.json([]); // Boş dizi dön, frontend çökmesin
  }
});

  app.delete("/api/regulations/:id", (req, res) => {
    const { id } = req.params;
    try {
      db.prepare("DELETE FROM regulations WHERE id = ?").run(id);
      res.json({ status: "ok" });
    } catch (error) {
      res.status(500).json({ error: "Regulation delete failed" });
    }
  });

  // Calculation Tools API (Simplified for now, will be implemented in frontend mostly)
  app.post("/api/calculate/:tool", (req, res) => {
    const { tool } = req.params;
    const params = req.body;
    // Logic for 20 tools can go here or be handled client-side
    res.json({ result: "Calculated", params });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { generateSitemap } from "./src/lib/sitemap";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  app.use(express.json()); // Important for parsing POST body
  const PORT = 3000;

  // API routes
  app.post("/api/gemini/suggest-reply", async (req, res) => {
    try {
      const { keyword } = req.body;
      if (!keyword) return res.status(400).json({ error: "Keyword is required" });

      const prompt = `Suggest a professional and helpful auto-reply message for a WhatsApp bot for a "Sedot WC" (septic tank service) business based on the user-provided keyword: "${keyword}".
      
      The reply should be polite, concise, and helpful.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
      });

      res.json({ suggestion: response.text });
    } catch (error) {
      console.error('Error suggesting reply:', error);
      res.status(500).json({ error: 'Failed to suggest reply' });
    }
  });

  app.post("/api/optimize-content", async (req, res) => {
    try {
      const { content } = req.body;
      if (!content) return res.status(400).json({ error: "Content is required" });

      const prompt = `Analyze the following website content and suggest 3 relevant internal link opportunities and 5 LSI keywords to improve SEO. 
      Format the output as a JSON object: { internalLinks: string[], lsiKeywords: string[] }.
      
      Content:
      ${content}
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      res.json(JSON.parse(response.text!));
    } catch (error) {
      console.error('Error optimizing content:', error);
      res.status(500).json({ error: 'Failed to optimize content' });
    }
  });

  app.get("/api/reviews", async (req, res) => {
    try {
      const { GOOGLE_BUSINESS_ACCOUNT_ID, GOOGLE_BUSINESS_LOCATION_ID, GOOGLE_BUSINESS_API_KEY } = process.env;
      if (!GOOGLE_BUSINESS_ACCOUNT_ID || !GOOGLE_BUSINESS_LOCATION_ID || !GOOGLE_BUSINESS_API_KEY) {
        return res.status(500).json({ error: "Missing configuration for Google Business Profile API" });
      }

      const url = `https://mybusiness.googleapis.com/v4/accounts/${GOOGLE_BUSINESS_ACCOUNT_ID}/locations/${GOOGLE_BUSINESS_LOCATION_ID}/reviews?key=${GOOGLE_BUSINESS_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  });

  app.get("/sitemap.xml", (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    res.header('Content-Type', 'application/xml');
    res.send(generateSitemap(baseUrl));
  });

  // Serve static assets from public folder
  app.use(express.static(path.join(process.cwd(), 'public')));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

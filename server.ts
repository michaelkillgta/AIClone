import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";

const getDirname = () => {
  try {
    return __dirname;
  } catch {
    return path.dirname(fileURLToPath(import.meta.url));
  }
};
const activeDirname = getDirname();

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "") {
  console.log("Initializing Google Gen AI client with provided API key.");
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.log("WARNING: GEMINI_API_KEY not set or invalid. Running in DEMO mode with mock fallback.");
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(express.static(path.resolve(activeDirname, "public")));

  // Expose /api/chat endpoint for Gemini calls
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "No message supplied." });
      }

      if (ai) {
        console.log(`Sending prompt to Gemini: "${message.substring(0, 60)}..."`);
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: message,
        });
        return res.json({ text: response.text });
      } else {
        // Fallback mock response for demo mode when API Key is not set
        console.log("Mocking response for Gemini API (Demo mode)...");
        const mockPrompt = message.toLowerCase();
        let responseText = "This is a demo mode response. Please set a valid GEMINI_API_KEY to interact with the real Gemini model.";
        
        if (mockPrompt.includes("hook") || mockPrompt.includes("script")) {
          responseText = `[DEMO SCRIPT]\n\nHook: "I stopped recording videos 6 months ago, but I made $15k last week. Here is why the old creator economy is dead..."\nTransition: [Cinematic zoom, deep red glow]\nCTA: "Secure your clone now at MakeItViral.ai."`;
        } else if (mockPrompt.includes("telemetry") || mockPrompt.includes("status")) {
          responseText = "System Telemetry: All systems operational. Hyderabad HQ is running at 100% efficiency. Latency: 1.4ms.";
        }
        
        // Wait a small moment to simulate network latency
        await new Promise((resolve) => setTimeout(resolve, 800));
        return res.json({ text: responseText });
      }
    } catch (error: any) {
      console.error("Gemini API server-side error:", error);
      return res.status(500).json({ error: error.message || "Internal server error during Gemini invocation." });
    }
  });

  const isProd = process.env.NODE_ENV === "production";

  if (!isProd) {
    // Development mode: Use Vite dev server in middleware mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: Serve built assets from the dist folder
    const distPath = path.resolve(activeDirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});

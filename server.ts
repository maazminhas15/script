import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { handleGenerateContent } from "./server/apiHandler";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "Henzo Content Studio" });
});

app.post("/api/generate-content", async (req, res) => {
  try {
    const { prompt: userPrompt, category } = req.body;
    const result = await handleGenerateContent(userPrompt, category);
    res.json(result);
  } catch (error: any) {
    console.error("Error generating content via Gemini:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to generate content with Gemini API",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Henzo Content Studio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

const { generateText } = require("../lib/ai");

module.exports = function (app) {
  app.get("/api/ai-status", (req, res) => {
    res.json({
      ollama: Boolean(process.env.OLLAMA_BASE_URL),
      model: process.env.OLLAMA_MODEL || "llama3.2",
    });
  });

  app.post("/api/ai", (req, res) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", async () => {
      try {
        const body = JSON.parse(Buffer.concat(chunks).toString());
        const text = await generateText(body.prompt, body.max_tokens || 1024);
        res.status(200).json({ text });
      } catch (err) {
        res.status(500).json({ error: err.message || "AI request failed" });
      }
    });
  });
};

// Dev-only proxy so `npm start` matches Vercel's /api/anthropic route.
module.exports = function (app) {
  app.post("/api/anthropic", (req, res) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", async () => {
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) {
        res.status(500).json({
          error:
            "ANTHROPIC_API_KEY is not configured. Add it to .env.local for local dev.",
        });
        return;
      }

      try {
        const upstream = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
          },
          body: Buffer.concat(chunks).toString(),
        });
        const data = await upstream.json();
        res.status(upstream.status).json(data);
      } catch {
        res.status(500).json({ error: "Failed to reach Anthropic API" });
      }
    });
  });
};

module.exports = function handler(req, res) {
  res.status(200).json({
    ollama: Boolean(process.env.OLLAMA_BASE_URL),
    model: process.env.OLLAMA_MODEL || "llama3.2",
  });
};

const { generateText: ollamaGenerate } = require("./ollama");

async function generateText(prompt, maxTokens = 1024) {
  if (!process.env.OLLAMA_BASE_URL) {
    throw new Error(
      "Ollama is not configured. Set OLLAMA_BASE_URL (e.g. http://127.0.0.1:11434) or use built-in Practice Examiner."
    );
  }
  return ollamaGenerate(prompt, maxTokens);
}

module.exports = { generateText };

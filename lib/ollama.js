async function generateText(prompt, maxTokens = 1024) {
  const base = (process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434").replace(
    /\/$/,
    ""
  );
  const model = process.env.OLLAMA_MODEL || "llama3.2";

  const res = await fetch(`${base}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      prompt,
      stream: false,
      options: { num_predict: maxTokens },
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Ollama request failed. Is Ollama running?");
  }

  const text = (data.response || "").trim();
  if (!text) {
    throw new Error("Empty response from Ollama");
  }

  return text;
}

module.exports = { generateText };

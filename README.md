# mahekan-learning

Cambridge CS 9618 study app — all chapters, practice questions, diagram questions, and Practice Examiner.

## Practice Examiner (default — unlimited)

Works on **Vercel with no API key**. Questions and mark schemes come from the built-in chapter bank (hundreds of CAIE-style items). Marking compares your answer to the official mark scheme points.

No rate limits. No billing.

## Optional: Ollama (local PC only)

[Ollama](https://ollama.com) runs AI on your computer for free with no cloud quotas. It **cannot** run on Vercel.

1. Install Ollama → `ollama pull llama3.2`
2. Copy `.env.example` to `.env.local` and set:
   - `OLLAMA_BASE_URL=http://127.0.0.1:11434`
   - `OLLAMA_MODEL=llama3.2`
3. `npm start` → enable **Use Ollama** in Practice Examiner

## Local development

```bash
npm install
npm start
```

## Deploy on Vercel

1. Import [umeramindurrani69/mahekan-learning](https://github.com/umeramindurrani69/mahekan-learning)
2. Deploy — **no environment variables required**
3. Practice Examiner works immediately on the live site

## Scripts

| Command         | Description        |
|-----------------|--------------------|
| `npm start`     | Development server |
| `npm run build` | Production build   |

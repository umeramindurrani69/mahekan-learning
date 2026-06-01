# mahekan-learning

Cambridge CS 9618 study app — all chapters, practice questions, diagram questions, and AI Examiner.

## Local development

```bash
npm install
cp .env.example .env.local
# Edit .env.local and set ANTHROPIC_API_KEY (needed for AI Examiner)
npm start
```

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Vercel will detect **Create React App** (`npm run build`, output `build/`).
4. Add an environment variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your [Anthropic API key](https://console.anthropic.com/)
5. Deploy.

The AI Examiner calls `/api/anthropic` on your domain so the API key stays on the server and is never exposed in the browser.

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm start`    | Development server       |
| `npm run build`| Production build         |
| `npm test`     | Run tests                |

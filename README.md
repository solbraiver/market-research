# Market Research Analyst AI

AI-powered market research analyst and concept designer application. Guides users through a structured research process using Google Gemini API with web search capabilities.

## Features

- 3-step workflow: Theme Setting → Research Plan → Full Report
- Google Gemini API integration (2.5-flash for planning, 2.5-pro for reports)
- Web search capabilities for real-time market data
- Japanese language UI
- Markdown-formatted reports

## Deploy to Vercel

### 1. One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/market-research)

### 2. Manual Deploy

1. Push your code to GitHub
2. Import your repository in [Vercel Dashboard](https://vercel.com/dashboard)
3. Add environment variable:
   - `GEMINI_API_KEY`: Your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
4. Deploy

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Your Google Gemini API key (free tier available) |

## Run Locally

**Prerequisites:** Node.js 18+

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env.local` file:
   ```bash
   cp .env.example .env.local
   ```

3. Set your `GEMINI_API_KEY` in `.env.local`:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                         # Next.js App Router
│   ├── api/                     # API Routes
│   │   ├── generate-plan/       # Research plan generation endpoint
│   │   └── generate-report/     # Full report generation endpoint
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main page
│   └── globals.css              # Global styles
├── components/                  # React UI components
├── services/                    # Frontend services
│   └── geminiService.ts         # API client
├── types.ts                     # TypeScript type definitions
└── vercel.json                  # Vercel configuration
```

## API Security

The Gemini API key is securely stored on the server-side (Vercel Serverless Functions) and never exposed to the client. All API calls are proxied through the serverless endpoints.

## Get Your Free Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API key"
4. Copy the key and add it to your Vercel environment variables

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Frontend:** React 18, TypeScript
- **Styling:** Tailwind CSS
- **AI:** Google Gemini API (@google/genai)
- **Deployment:** Vercel

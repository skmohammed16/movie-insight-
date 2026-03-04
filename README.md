# 🎬 AI Movie Insight Builder

A modern full-stack web application that combines movie data from OMDb with AI-powered audience sentiment analysis. Enter any IMDb ID to discover comprehensive movie insights including cast, ratings, plot summaries, and intelligent sentiment classification.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwindcss)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5-412991?logo=openai)

---

## 📋 Overview

AI Movie Insight Builder allows users to:
- Search movies by IMDb ID (e.g., `tt0133093`)
- View movie details: poster, title, year, rating, cast, genre, and plot
- Get AI-generated audience sentiment analysis
- See sentiment classification: **Positive**, **Mixed**, or **Negative**

## 🏗️ Architecture

The application follows a **clean architecture** pattern with clear separation of concerns:

```
src/
├── app/                    # Next.js App Router
│   ├── api/                # Server-side API route handlers
│   │   ├── movie/route.ts  # GET /api/movie - OMDb proxy + caching
│   │   └── sentiment/route.ts # POST /api/sentiment - AI analysis
│   ├── globals.css         # Global styles + design tokens
│   ├── layout.tsx          # Root layout + SEO metadata
│   └── page.tsx            # Main page (client component)
├── components/             # Reusable UI components
│   ├── ErrorDisplay.tsx    # Error state with retry
│   ├── MovieCard.tsx       # Movie details card
│   ├── MovieSearch.tsx     # IMDb ID input with validation
│   ├── SentimentCard.tsx   # AI sentiment results
│   ├── SkeletonLoader.tsx  # Loading skeleton components
│   ├── ThemeProvider.tsx   # Dark/light mode context
│   └── ThemeToggle.tsx     # Theme switch button
├── hooks/                  # Custom React hooks
│   ├── useDebounce.ts      # Generic debounce hook
│   └── useMovieData.ts     # Movie data fetching + state
├── lib/                    # Service layer + utilities
│   ├── cache.ts            # In-memory TTL cache
│   ├── omdb.ts             # OMDb API client
│   ├── rate-limiter.ts     # Sliding window rate limiter
│   ├── reviews.ts          # Mock review dataset
│   ├── sentiment.ts        # OpenAI sentiment analysis
│   └── validation.ts       # Input validation
└── types/                  # TypeScript interfaces
    └── index.ts            # All type definitions
```

### Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Next.js App Router** | Server-side API routes, RSC support, built-in optimizations |
| **Route Handlers** | Keep API keys server-side, clean REST endpoints |
| **In-memory cache** | Zero dependencies, sufficient for single-instance deployment |
| **Mock reviews** | No reliable free review API exists; clean abstraction allows easy swap |
| **Fallback sentiment** | Graceful degradation when OpenAI is unavailable |

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 16 (App Router) | React framework with SSR/RSC |
| Language | TypeScript 5 | Type safety throughout |
| Styling | TailwindCSS 4 | Utility-first CSS |
| Animations | Framer Motion | Smooth UI transitions |
| AI | OpenAI GPT-3.5 Turbo | Sentiment analysis |
| Movie Data | OMDb API | Movie information |
| Testing | Vitest | Fast unit testing |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- OMDb API key ([get free key](https://www.omdbapi.com/apikey.aspx))
- OpenAI API key ([get key](https://platform.openai.com/api-keys)) *(optional — fallback works without it)*

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd aiproject

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OMDB_API_KEY` | ✅ Yes | OMDb API key for movie data |
| `OPENAI_API_KEY` | ⚠️ Optional | OpenAI key for AI sentiment (fallback available) |

### Running Locally

```bash
# Development server (with Turbopack)
npm run dev

# Run tests
npm test

# Production build
npm run build
npm start
```

## 🤖 AI Sentiment Analysis

### How It Works

1. **Review Collection**: Mock reviews are deterministically selected based on IMDb ID hash
2. **Prompt Engineering**: Reviews are formatted into a structured prompt for GPT-3.5 Turbo
3. **JSON Response**: OpenAI returns a JSON object with `summary` and `classification`
4. **Validation**: Response is validated — classification must be Positive/Mixed/Negative
5. **Fallback**: If OpenAI fails, rating-based statistical analysis provides default sentiment

### Prompt Structure
```
Analyze audience reviews for "[Movie Title]"
→ Provide 2-3 sentence summary
→ Classify as Positive | Mixed | Negative
→ Respond in JSON format only
```

### Fallback Logic
- Average rating ≥ 7.0 → **Positive**
- Average rating ≥ 4.5 → **Mixed**
- Average rating < 4.5 → **Negative**

## 🌐 Deployment (Vercel)

### One-Click Deploy

1. Push code to GitHub
2. Import repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `OMDB_API_KEY`
   - `OPENAI_API_KEY`
4. Deploy

### Manual Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add OMDB_API_KEY
vercel env add OPENAI_API_KEY
```

## ⚡ Performance Optimization

### Lighthouse Optimization Notes

- **Server Components**: Layout uses RSC; only the main page is a client component
- **Image Optimization**: Next.js `<Image>` with remote patterns configured
- **Font Loading**: Google Inter font with `display: swap` and CSS variable
- **Response Caching**: In-memory 10-minute TTL cache reduces API calls
- **Debounced Input**: 400ms debounce prevents excessive API requests
- **Rate Limiting**: 10 requests/minute per IP prevents abuse
- **Minimal Dependencies**: Only framer-motion and openai beyond Next.js core
- **Turbopack**: Fast dev server compilation

## 🔒 Security

- API keys stored in environment variables only (never client-side)
- Server-side input validation on all API routes
- Rate limiting prevents abuse
- No hardcoded secrets
- `.env.local` excluded from git via `.gitignore`

## 📝 Assumptions

- The application is designed for single-instance deployment (in-memory cache/rate-limiter)
- Mock reviews provide realistic but not movie-specific content
- OpenAI API is optional — the app works fully without it via fallback analysis
- OMDb free tier (1,000 requests/day) is sufficient for the use case

## 🔮 Future Improvements

- [ ] Real review API integration (e.g., TMDb, Rotten Tomatoes)
- [ ] Persist cache with Redis for multi-instance deployment
- [ ] Add movie comparison feature
- [ ] Search by movie title (not just IMDb ID)
- [ ] User authentication and saved movie history
- [ ] Streaming AI responses with SSE
- [ ] E2E tests with Playwright
- [ ] PWA support with offline capabilities

---

Built with ❤️ using Next.js, TailwindCSS, and OpenAI

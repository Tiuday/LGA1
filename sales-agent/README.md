# AI Sales & Outreach Agent

A production-grade AI agent that generates a complete 5-asset outreach sequence for any prospect — cold email, LinkedIn DM, follow-up email, call script, and break-up email — in under 30 seconds.

**Live demo:** _add your Vercel URL here_

---

## Features

- Cold Email — subject, personalized opener, value pitch, soft CTA, PS line
- LinkedIn DM — insight-led, 5 sentences max, no clichés
- Follow-Up Email — new angle, under 80 words, one-question CTA
- Cold Call Script — 6 labeled sections from opener to close
- Break-Up Email — reverse psychology, under 60 words, plants a future seed

Live animated pipeline UI — 5 nodes light up in real-time as each asset generates.

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 16 (App Router) + TypeScript strict |
| AI | Anthropic claude-sonnet-4-6 via REST API |
| Database | Supabase PostgreSQL + Row Level Security |
| Auth | Supabase Auth (email/password + magic link) |
| Hosting | Vercel |
| UI | Tailwind CSS v4 + Framer Motion |

---

## Local Setup

```bash
git clone <your-repo>
cd sales-agent
npm install
cp .env.example .env.local
# Fill in .env.local with your credentials (see below)
npm run dev
```

Open `http://localhost:3000`.

---

## Environment Variables

Add these to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=     # From Supabase: Project Settings > API
NEXT_PUBLIC_SUPABASE_ANON_KEY= # From Supabase: Project Settings > API
ANTHROPIC_API_KEY=            # From console.anthropic.com
```

`ANTHROPIC_API_KEY` is server-only — never expose it client-side.

---

## Supabase Setup

1. Create a new project at supabase.com
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql`
3. Go to **Authentication > URL Configuration** and add your Vercel domain: `https://your-app.vercel.app/**`
4. Copy your Project URL and anon key into `.env.local`

---

## Vercel Deployment

1. Push this repo to GitHub
2. Import the repo at vercel.com/new
3. Add all 3 environment variables under **Settings > Environment Variables**
4. Deploy — build completes with zero errors
5. Add your Vercel URL to Supabase Auth redirect URLs

---

## License

MIT

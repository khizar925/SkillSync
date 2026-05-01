# SkillSync

AI-powered recruitment platform for small agencies — NLP resume scoring, automated candidate status updates, and bulk resume processing.

> **Status:** Pre-launch. Waitlist open. MVP in active development.

---

## What It Does

Small recruiting agencies (2–5 people) run hiring on spreadsheets and manual email. SkillSync replaces that workflow with:

- **AI Resume Scoring** — transformer embeddings + cosine similarity rank candidates by fit, not keywords
- **Bulk Resume Upload** — upload 50+ PDFs at once, get a ranked shortlist automatically
- **Automated Status Engine** — candidates receive email updates at every pipeline stage (applied → shortlisted → decided). No more ghosting.
- **Candidate Score Tool** — paste any job description, get your resume scored against it instantly
- **CSV Pipeline Import** — migrate your existing spreadsheet in one upload

**Free tier:** 50 scored applications/month, all features included. No credit card.

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Auth | Clerk |
| Database | Supabase (Postgres) |
| File Storage | Supabase Storage |
| AI/NLP | Custom transformer embeddings + cosine similarity (Python, Render) |
| Email | Resend |
| Queue | Inngest (async bulk processing) |
| Rate Limiting | Upstash Redis |
| Deploy | Vercel |

---

## Local Development

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- A [Clerk](https://clerk.com) application

### Setup

```bash
git clone https://github.com/khizar925/SkillSync.git
cd SkillSync
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NLP_BACKEND_URL=

RESEND_API_KEY=

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
app/
  api/waitlist/         ← waitlist signup endpoint
  privacy/              ← privacy policy page
  robots.ts             ← SEO robots.txt
  sitemap.ts            ← SEO sitemap.xml
components/sections/    ← landing page sections
docs/
  ROADMAP.md            ← 16-month product roadmap
  TODO.md               ← pre-launch checklist
  TechStackDecision.md  ← architecture decisions
lib/
  supabase.ts           ← Supabase client
scripts/
  commit.ps1            ← one-command commit + push helper
```

---

## Roadmap

See [`docs/ROADMAP.md`](docs/ROADMAP.md) for the full 3-phase, 16-month plan.

| Phase | Timeline | Theme |
|-------|----------|-------|
| 1 | M0–4 | Earn trust — status engine, NLP scoring, free tier |
| 2 | M5–9 | Build moat — bot detection, explainability, paid tier |
| 3 | M10–16 | Scale — network effects, integrations, compliance |

---

## License

Private. All rights reserved.

# SkillSync — Tech Stack Decisions
> Last updated: April 2026

---

## Frontend

| Tool | Purpose | Notes |
|------|---------|-------|
| **Next.js 16** (App Router) | React framework | SSR + API routes in one repo |
| **Tailwind v4** | Styling | Custom emerald theme, animations |
| **TypeScript** | Type safety | Strict mode |
| **Clerk** (`@clerk/nextjs`) | Auth | Sign up/in for recruiters + candidates. Role stored in `publicMetadata.role`. Tier stored in `publicMetadata.tier` for gating. |

---

## Backend / API

| Tool | Purpose | Notes |
|------|---------|-------|
| **Next.js API Routes** | REST endpoints | `/api/jobs`, `/api/applications`, `/api/score`, `/api/waitlist` |
| **Supabase** (Postgres) | Primary database | Tables: `users`, `jobs`, `applications`, `waitlist`. FK to Clerk user ID. |
| **Supabase Storage** | Resume file storage | PDF/DOCX uploads. Bucket per user. |
| **Upstash** (Redis) | Rate limiting | Applied to `POST /api/waitlist` and all public mutation routes. Free tier. |
| **pdf-parse** + **mammoth** | Resume text extraction | Server-side. PDF → `pdf-parse`, DOCX → `mammoth`. |

---

## AI / NLP

| Tool | Purpose | Notes |
|------|---------|-------|
| **Custom NLP backend** | Resume scoring + similarity | Transformer embeddings + cosine similarity. Already built. Exposes REST API. |
| **Render** | NLP backend hosting | Python service (FastAPI or equivalent). Always-on. |
| **`lib/scoring-client.ts`** | HTTP client | Next.js → Render NLP service. Configured via `NLP_BACKEND_URL` env var. |
| **`lib/bot-detect.ts`** | Bot/mass-apply detection | Uses cosine similarity from NLP backend to flag near-duplicate applications. |

---

## Communication & Notifications

| Tool | Purpose | Notes |
|------|---------|-------|
| **Resend** | Transactional email | Candidate status update emails on every pipeline stage transition. |

---

## Payments

> Not decided yet. Will be selected before Phase 2.

Options to evaluate: Stripe, Paddle, LemonSqueezy.

---

## DevOps & Tooling

| Tool | Purpose | Notes |
|------|---------|-------|
| **Vercel** | Frontend deploy | Zero-config Next.js. Auto-deploy on push to `main`. |
| **Render** | NLP backend deploy | Python service. Separate repo/service from Next.js. |
| **Claude Code** | Development | AI-assisted coding tool used throughout build. |
| **GitHub** | Version control | `main` = production. Feature work on `dev` branch. Merge to `main` to ship. |

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# NLP Backend
NLP_BACKEND_URL=                  # Render service URL

# Email
RESEND_API_KEY=

# Rate Limiting
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Payments (TBD — not decided yet)
# PAYMENT_SECRET_KEY=

# Site
NEXT_PUBLIC_SITE_URL=             # e.g. https://skillsync.com
```

---

## Architecture Overview

```
Browser
  └─ Vercel (Next.js 16)
       ├─ Clerk (auth middleware)
       ├─ Supabase (DB + file storage)
       ├─ Resend (email)
       ├─ Upstash (rate limiting)
       ├─ Payments gateway (TBD, Phase 2)
       └─ Render (NLP backend)
              └─ Transformer embeddings + cosine similarity
```

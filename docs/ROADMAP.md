# SkillSync — MVP Feature Backlog & Product Roadmap
> 3 phases · 16 months · Grounded in recruitment pain point research (April 2026)

---

## Tech Stack (locked)
- **Auth**: Clerk (`@clerk/nextjs`) — recruiter + candidate roles via metadata
- **DB**: Supabase (Postgres) — already integrated
- **AI/NLP**: ✅ READY — transformer embeddings + cosine similarity backend. Wrap in `lib/scoring-client.ts`. Plug via `NLP_BACKEND_URL` env var.
- **Bot detection**: Cosine similarity from NLP backend — cover letter + resume dedup is free
- **File parsing**: `pdf-parse` + `mammoth` — PDF/DOCX server-side extraction
- **Email**: Resend — transactional candidate status updates
- **Payments**: Stripe — tiers enforced via Clerk `publicMetadata.tier` + Supabase RLS
- **Frontend**: Next.js 16 App Router + Tailwind v4 (landing page already deployed)

---

## Files to Create (Phase 1+)
```
app/dashboard/recruiter/page.tsx
app/dashboard/candidate/page.tsx
app/jobs/page.tsx
app/jobs/[id]/page.tsx
app/api/jobs/route.ts
app/api/applications/route.ts
app/api/score/route.ts
lib/scoring-client.ts        ← HTTP client to NLP/embedding backend
lib/parse-resume.ts          ← PDF/DOCX extraction
lib/bot-detect.ts            ← mass-apply detection (uses scoring-client similarity)
middleware.ts                ← Clerk auth + route guard
```

**Scoring client interface:**
```ts
export async function scoreResume(resumeText: string, jobText: string): Promise<ScoreResult>

type ScoreResult = {
  total: number
  breakdown: { skills_match: number; experience_depth: number; role_fit: number }
  embedding_similarity: number
  summary: string
}
```

---

## Phase 0 — Ship Landing Page (NOW, ~1 day)
| # | Task | Why |
|---|------|-----|
| 0.1 | Upstash rate limiting on `POST /api/waitlist` | Hard blocker |
| 0.2 | Security headers in `next.config.ts` (CSP, X-Frame-Options) | Security |
| 0.3 | Deploy to Vercel, set `NEXT_PUBLIC_SITE_URL` | Go live |

---

## North Star
**Break the mutual deception loop.**

Ghost jobs → candidates spray applications → AI bots flood recruiters → recruiters ghost candidates → candidates game ATS keywords → repeat.

SkillSync wins by making both sides trust the platform simultaneously.

---

## Phase 1 — Foundation: Earn Trust on Both Sides (M0–4)

### Features
| # | Feature | Pain addressed | Notes |
|---|---------|---------------|-------|
| 1.1 | Clerk auth (sign up / sign in) | Foundation | Role set on signup: recruiter / candidate |
| 1.2 | Supabase schema: `users`, `jobs`, `applications` | Foundation | FK to Clerk user ID |
| 1.3 | Recruiter dashboard + candidate portal shells | Foundation | Protected routes |
| 1.4 | NLP Resume Scoring v1 | Resume overload, bad matching | `scoring-client.ts` → NLP backend; free tier: 50 applications/month |
| 1.4b | **Bulk resume upload** | Resume overload (validated by 4 recruiters) | Recruiter uploads 50+ PDFs at once → all scored in batch → ranked shortlist |
| 1.5 | Automated Status Engine | Comm. gaps (92%) | applied→reviewed→shortlisted→interviewed→decided; email via Resend on each transition |
| 1.6 | 14-Day Re-Engagement Ping | Comm. gaps | Auto-nudge if no action in 14 days — no recruiter effort needed |
| 1.7 | Posting Health Warnings | Ghost jobs (48%) | Flag jobs live 21+ days with no activity; prompt close/pause/reactivate |
| 1.8 | Free tier onboarding | Tool friction (SMBs) | First scored shortlist in < 8 min; no credit card |
| 1.9 | Candidate resume score tool | Chicken-and-egg fix | Score resume against ANY job description — no SkillSync jobs required |
| 1.10 | CSV pipeline import | Switching cost | Upload existing spreadsheet → import candidate pipeline instantly |

**Schema:**
```sql
users(id, clerk_id, role, email, created_at)
jobs(id, recruiter_id, title, description, status, created_at)
applications(id, job_id, candidate_id, resume_url, score, score_breakdown_json, status, applied_at)
```

### Milestones
| Week | Milestone | Success Signal |
|------|-----------|----------------|
| W4 | Status engine live with 3 pilot agencies | 0 "did you get my app?" support tickets |
| W8 | NLP scoring v1 + free tier public | Shortlist acceptance rate > 60% |
| W12 | 100 free-tier recruiters; dual portal live | Candidate portal DAU / recruiter DAU > 1.5x |
| W16 | Posting health deployed | 40%+ flagged postings closed/updated within 48h |

### Phase Gate
> **Do not enter Phase 2 until:** ghosting rate < 15% AND 3 organic free→paid upgrades.

---

## Phase 2 — Differentiation: Signal Quality No One Else Provides (M5–9)

### Features
| # | Feature | Pain addressed | Notes |
|---|---------|---------------|-------|
| 2.1 | AI-Bot / Mass-Apply Detector | Resume overload (88%) | Flag: 50+ apps/24h, similar cover letters (cosine), <60s submit, keyword anomaly |
| 2.2 | Score Explainability Layer | ATS gaming (82%), bias (64%) | Recruiter sees factor breakdown; candidate gets plain-language "why" |
| 2.3 | Bias Audit Log | Bias/fairness, regulatory | Every decision logged; exportable PDF; Ontario Working for Workers Act compliant |
| 2.4 | Signal Quality Score | Overload + matching | NLP score + bot score → single ranked number; humans surface above bots |
| 2.5 | Candidate Feedback Messages | Comm. gaps, fairness | Auto rejection with 1-sentence personalised reason from score factors |
| 2.6 | Paid Tier Launch ($49/mo) | Tool friction (SMBs) | Unlimited jobs + bias log + API access; self-serve, no sales call |

### Milestones
| Month | Milestone | Success Signal |
|-------|-----------|----------------|
| M5 | Bot detection deployed | Recruiter "noise" apps down > 30% |
| M6 | Explainability + feedback messages live | Candidate NPS +15 pts vs Phase 1 |
| M7 | Bias audit log beta | 5+ agencies cite compliance as upgrade reason |
| M9 | Paid tier live; 25 paying customers | MRR > $1,500; time-to-hire down 25% |

### Phase Gate
> **Do not enter Phase 3 until:** 25 paying customers, churn < 5%, AND 1 customer cites audit log as purchase reason.

---

## Phase 3 — Scale: Network Effects and Market Expansion (M10–16)

### Features
| # | Feature | Pain addressed | Notes |
|---|---------|---------------|-------|
| 3.1 | Predictive Match v2 | Bad matching, bias | Train on hire outcomes from P1–2; scores retention probability, not just fit |
| 3.2 | Talent Pool & Pipeline CRM | Overload, tool friction | Save silver-medal candidates; auto-surface on future matching roles |
| 3.3 | Agency Collaboration Layer | Tool friction | Multi-seat, role-based permissions, shared pools, per-seat audit trail |
| 3.4 | Job Board Integrations | Overload, tool friction | One-click publish to LinkedIn + Indeed; inbound auto-scored on arrival |
| 3.5 | Verified Vacancy Badge | Ghost jobs, trust | Recruiters who close filled roles + respond within SLA earn visible badge |
| 3.6 | Compliance Reporting Suite | Bias, regulatory | One-click Ontario / CA AB 1251 report; AI disclosure cert; opens healthcare/finance/public sector |

### Milestones
| Month | Milestone | Success Signal |
|-------|-----------|----------------|
| M10 | Job board integrations live | 50%+ new posts via integration |
| M12 | Predictive match v2 + verified badge | Badge agencies see 20%+ higher apply rates |
| M14 | Compliance suite live; first regulated-vertical customers | 3+ healthcare/finance customers; 0 compliance churn |
| M16 | 150+ paying customers | MRR > $10,000; avg account size growing (teams) |

---

## Summary

| | Phase 1 (M0–4) | Phase 2 (M5–9) | Phase 3 (M10–16) |
|---|---|---|---|
| Theme | Earn trust | Build moat | Network effects |
| Top feature | Status engine | Bot detector | Predictive match v2 |
| Revenue target | 3 upgrades | MRR $1,500 | MRR $10,000 |
| Customers | 100 free | 25 paying | 150+ paying |
| Ghosting rate | < 15% | < 10% | < 5% |

## Pain Point Coverage

| Pain Point | Phase 1 | Phase 2 | Phase 3 |
|------------|---------|---------|---------|
| Comm. gaps (92%) | Status engine, ping | Feedback messages | Verified badge |
| Resume overload (88%) | NLP scoring v1 | Bot detector | Talent pool, integrations |
| Bad matching (82%) | NLP scoring v1 | Explainability | Predictive match v2 |
| Tool friction (71%) | Free tier, portals | Paid tier | Integrations, collab |
| Bias/fairness (55%) | — | Audit log, feedback | Compliance suite |
| Ghost jobs (48%) | Posting health | — | Verified badge |

## Key Risks

| Risk | Mitigation |
|------|-----------|
| Free users never upgrade | Phase 1 gate: 3 organic upgrades required before Phase 2 |
| Bot detection false positives | Advisory only — recruiter decides. Tune thresholds on Phase 1 data |
| NLP scoring perpetuates bias | Bias audit log ships Phase 2, not Phase 3. Fairness tested before match v2 |
| SMB churn from complex onboarding | 8-min target to first shortlist. Any step > 2 min gets simplified before launch |
| Regulatory landscape shifts | Compliance module is jurisdiction-pluggable — add new regions without full rebuild |

---

**Total to revenue-ready MVP: ~6 weeks (Phase 0 + Phase 1)**
*Roadmap v1.1 — updated with NLP backend confirmed ready, Clerk auth, April 2026*

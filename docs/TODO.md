# Pre-Launch Checklist


## Optional
- [ ] Name change (Maybe)

## Feature Gating (hide WIP from users)
- [ ] Use `dev` branch for new features — merge to `main` only when ready to ship
- [ ] OR add `middleware.ts` route guard (allowlist live routes, redirect others to `/`)

## Blockers (fix before going live)
- [ ] Rate limiting on `POST /api/waitlist` — use Upstash Ratelimit (free tier)
- [x] Privacy Policy page or external link (legal requirement for email collection)
- [x] OG metadata — og:image, og:url, twitter:card in `app/layout.tsx`

## Important (fix soon)
- [x] `robots.txt` + `sitemap.xml` — SEO
- [ ] Security headers in `next.config.ts` — CSP, X-Frame-Options
- [ ] Set `NEXT_PUBLIC_SITE_URL` on Vercel after deploy

## Done
- [x] Supabase waitlist integration (`app/api/waitlist/route.ts`)
- [x] OG metadata + dynamic OG image (`app/opengraph-image.tsx`)
- [x] Mixed avatars in waitlist section
- [x] `.env.example` file for reference

## Nice to Have
- [ ] Bundle size analysis (`npm run build` + check `.next`)
- [ ] README.md — project-specific setup docs

# Thai Air Quality Web Platform

- Frontend: `web` (Next.js, App Router, TypeScript)
- Hosting: Cloudflare Workers via OpenNext
- Integration: LINE LIFF
- PRD: `d:\1.SaaS\PM25 Alert\PRD`

## Setup

- Requirements: Node 18+, npm
- In `web` create `.env.local` with:
  - `WAQI_TOKEN=...`
  - `NEXT_PUBLIC_LIFF_ID=...`

## Develop

- `cd web`
- `npm run dev`

## Preview (Workers runtime)

- `cd web`
- `npm run preview`

## Deploy (Cloudflare)

- `cd web`
- `npm run deploy`

## Features (Week 1)

- Geolocation fetch PM2.5 via `/api/air?lat&lon`
- Thai AQI categorization and advice
- Basic LIFF greeting when opened in LINE

## Roadmap (from PRD)

- Week 2: SEO pages per province
- Week 3: LINE OA, Rich Menu, alerts
- Week 4: Analytics and retargeting

## Environment

- Cloudflare `wrangler.toml` configured with `nodejs_compat`
- OpenNext config `open-next.config.ts` in `web`

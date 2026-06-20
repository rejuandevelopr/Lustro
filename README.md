# Lustro

**Booking & retention platform for auto detailers.** Next.js App Router demo, built to mirror the real stack (Convex · Clerk · Stripe · Resend · PostHog).

## Design dependency: ui-ux-pro-max
The site's structure, typography, effects, and UX rules are derived from the
`ui-ux-pro-max` skill, installed at `.claude/skills/ui-ux-pro-max/`. The generated
source of truth lives in `design-system/lustro/MASTER.md` (+ `pages/booking.md`).

- **Pattern:** Trust & Authority + Conversion (Hero → Proof/stats → before-after → features → testimonials → low-friction CTA)
- **Type roles:** Calistoga (display) · Inter (body) · JetBrains Mono (data)
- **UX rules applied:** visible focus rings, real label/id associations, inline on-blur
  validation with errors below fields, semantic input types, loading spinner, focus moved
  to the step heading on navigation, tabular numerals, `prefers-reduced-motion`.
- **Brand override:** the skill's suggested palette is replaced by the Lustro cream/olive
  brand (`#fefae0` / `#283618` / `#606c38`), which the skill's own `consistency` rule allows.

Re-run it anytime:
```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system -p "Lustro"
```

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000  ·  booking flow at /book/lustro-demo
```
First build fetches fonts from Google Fonts (works on your machine and on Vercel).

## Deploy
```bash
vercel --prod
```

## Routes
- `/` — landing (Trust & Authority structure)
- `/book/[shop]` — multi-step booking flow with deposit + validation
- `/dashboard` — detailer dashboard (KPIs, revenue/area + service-mix donut, today's bays, win-back, sortable customers)

## Stack mapping
| Concern   | Demo layer                     | Production SDK   |
|-----------|--------------------------------|------------------|
| Database  | lib/data typed store           | Convex           |
| Auth      | route boundary in /dashboard   | Clerk            |
| Payments  | deposit step in booking flow   | Stripe Checkout  |
| Email     | confirmation/reminder triggers | Resend           |
| Analytics | track() event calls            | PostHog          |

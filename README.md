# msphub-website

Source for the new [msphub.com](https://msphub.com) — the marketing site for **MSP Hub** and its four branches: HubX (the Microsoft portal, "HubX, powered by MSP Hub"), professional services, managed services, and development as a service.

**Status:** Phase 2 build. All core pages are live on the preview URL with placeholder markers ("Needs Luke") wherever content is still to be supplied. Work lands through pull requests into `main`; `main` deploys to production on Vercel.

- Preview / production URL: https://msphub-website.vercel.app (Vercel team **MSP Hub**, project `msphub-website`)
- Plan and content decisions: the project's `website-plan.md` and `project-context.md` (kept in the project workspace, not in this repo)

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, TypeScript, Turbopack, Cache Components)
- [Tailwind CSS](https://tailwindcss.com) v4 (CSS-first config in `src/app/globals.css`)
- `zod` (form validation, shared client/server), `lucide-react` (icons)
- ESLint 9 (`eslint-config-next`)
- Hosted on [Vercel](https://vercel.com); forms email via [Resend](https://resend.com) (HTTP API, no SDK)

## Run locally

Requires Node.js 20.9 or newer (`.nvmrc` pins 22).

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build (also type-checks)
npm run start    # serve the production build
npm run lint     # eslint
```

## Project layout

```
src/app/                  Routes (App Router), root layout, global CSS, metadata files
  api/lead/route.ts       The one form endpoint (all four conversion flows)
  gone/route.ts           410 Gone for old theme-demo URLs (wired via rewrites)
  opengraph-image.tsx     Site-wide OG image (MSP Hub wordmark)
  sitemap.ts, robots.ts   SEO files; robots disallows everything until indexing is enabled
src/components/
  brand/                  MspHubLogo (single logo asset), HubXLogo / HubXPoweredBy
  layout/                 Header (sticky glass, mobile menu), Footer, social icons
  ui/                     Button, Section/Container/Glow, typography, cards, Needs tag
  marketing/              Page hero, portal mock-up, stats, logos, testimonials, FAQ, CTA band
  forms/                  LeadForm (client) + field primitives
src/content/              Typed content: site config, nav, branches, HubX, services, proof, needs registry
src/lib/                  site.ts (URL/indexing), lead.ts (zod schemas + mailto builder), cn.ts
src/assets/fonts/         TTF used only to render the OG image
public/brand/             Brand assets served as-is (/brand/...)
public/proof/             Vendor logos and award image carried over from msphub.com
docs/brand/               HubX-Logo-Guidelines.pdf (the brand kit rules)
```

## Sitemap

`/` · `/hubx` · `/services` · `/services/professional` · `/services/managed` · `/services/development` · `/partners` · `/about` · `/contact` · `/demo` · `/microsoft-365-quote` · `/thank-you` · `/privacy` · `/terms` · `/cookies` · 404.

Legacy WordPress URLs 301 to their new homes and the old theme-demo URLs (`/team/*`, `/case-studies/*`, `/projects/*`, `/careers/*`, …) return **410 Gone**; both maps live in `next.config.ts` and take effect once msphub.com points at this deployment.

## Forms and lead delivery

Four conversion flows share one Route Handler, `POST /api/lead`: **demo** (`/demo`), **service inquiry** (`/services#inquiry`), **Microsoft 365 quote** (`/microsoft-365-quote`), and **general contact** (`/contact`, with `?topic=partnership` preselecting the partner topic). The handler validates with zod (schemas in `src/lib/lead.ts`, shared with the client), drops honeypot submissions, rate-limits per IP (10 per 10 minutes, in memory), then emails sales via Resend.

- With `RESEND_API_KEY` set, the lead is emailed to `sales@msphub.com` (override with `LEAD_TO_EMAIL`) with the submitter as reply-to; non-production deployments prefix the subject with `[PREVIEW]`.
- Without it (or if Resend fails), the API answers `503 not_configured` / `502 delivery_failed` and the form **fails gracefully**: the user's input stays on screen with a visible notice and a prefilled `mailto:sales@msphub.com` button carrying the same fields.
- Successful submissions redirect to `/thank-you?flow=<flow>` (noindex), the conversion endpoint for analytics.

### Environment variables

| Variable | Where | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Preview + Production | Enables email delivery of form submissions. Create at resend.com → API Keys. Without it, forms fall back to mailto. |
| `LEAD_TO_EMAIL` | Optional | Recipient override. Default `sales@msphub.com`. |
| `LEAD_FROM_EMAIL` | Optional | Verified sender, e.g. `MSP Hub Website <web@send.msphub.com>`. Default is Resend's `onboarding@resend.dev`, which only delivers to the Resend account owner's address, so set this (and verify the domain in Resend) before real traffic. |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical origin for metadata, sitemap, and structured data (e.g. `https://msphub.com`). Falls back to the Vercel production URL. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | Production (msphub.com) only | Set to `true` at launch. Until then every response carries `X-Robots-Tag: noindex, nofollow`, pages carry `<meta name="robots">`, and `robots.txt` disallows everything. |

Set them in Vercel → Project → Settings → Environment Variables (scoped to Preview / Production), then redeploy.

## Brand assets

**Brand rule (Luke, Nov 2 2026): the site is branded MSP Hub, not HubX.** The `<title>`, site name in metadata, header logo, hero headline, favicon/app icon, footer, and Open Graph image all use MSP Hub. HubX appears only where the Microsoft side is introduced (the HubX spotlight on the home page, `/hubx`, `/demo`, and the Microsoft 365 quote flow), is always written "HubX, powered by MSP Hub", and carries the HubX logo there. Present HubX as the new flagship product under MSP Hub, never as the company.

- `public/brand/msphub/msphub-name-logo.png` — the MSP Hub wordmark supplied by Luke (white on transparent; dark backgrounds only). It is referenced from exactly one place, `src/components/brand/msp-hub-logo.tsx`, so the new logo concepts in progress can be swapped in by replacing that file and its intrinsic size — nothing else changes (the OG image reads the same constant).
- `public/brand/msphub/msp-hub-icon.svg` — the MSP Hub hex mark from the current msphub.com, used for the favicon and app icon until master files arrive.
- `public/brand/svg`, `public/brand/png` — the unmodified HubX brand kit, used under the kit's rules below.

Pick the HubX version by background, per the guidelines:

| File | Use on |
| --- | --- |
| `hubx-logo-full-color` | White and light backgrounds (default) |
| `hubx-logo-reversed` | Charcoal, black, dark mode — **the site's default** |
| `hubx-logo-white` | Orange, photos, other colored fields |
| `hubx-logo-charcoal` | One-color / grayscale uses |
| `hubx-mark-*` | Favicon, avatars, tight UI (never the full logo below 24 px) |
| `hubx-app-icon` | App stores, home screens, integrations |

Rules that apply to every page: keep clear space of half the logo height on all sides, never add glows/shadows/gradients to the logo, never recolor or retype it, and write the name as `HubX`. Full text in `docs/brand/HubX-Logo-Guidelines.pdf`.

Favicon (`src/app/icon.svg`, `favicon.ico`) and Apple touch icon (`src/app/apple-icon.png`) are the MSP Hub hex mark (site brand rule above). The HubX X mark stays reserved for HubX-specific surfaces.

## Design tokens

Defined in `src/app/globals.css` with Tailwind v4 `@theme`, so they are available as utilities (`bg-brand-orange`, `text-brand-charcoal`, `bg-ink`, `font-display`, ...). Custom utilities: `glass` / `glass-soft` / `glass-lg` (frosted panels), `bg-hex` (hex-grid pattern), `needs-tag`.

| Token | Value | Source |
| --- | --- | --- |
| `brand-orange` | `#F97316` | Brand kit — the X, accents, primary buttons (ink text on orange). Too low-contrast for small text on light backgrounds. |
| `brand-charcoal` | `#424242` | Brand kit — "Hub" wordmark, one-color uses |
| `brand-white` | `#FFFFFF` | Brand kit |
| `brand-canvas` | `#EEEEEE` | Brand kit — the portal's light canvas |
| `orange-hover` / `orange-deep` | `#FB8A3C` / `#EA6A0F` | Plan — UI hover/pressed only, never on logo artwork |
| `ink` / `ink-2` | `#0A0D14` / `#0D121C` | Plan — page and footer background |
| `navy-900` / `navy-700` | `#0F1A33` / `#132142` | Plan — section glows |
| `success` / `error` | `#22C55E` / `#F87171` | Plan — form states |

**Fonts.** The brand kit contains no typefaces; Luke approved the plan's proposal on Nov 2 2026: **Inter** for body copy (`font-sans`) and **Source Serif 4** for headlines (`font-display`). Both are self-hosted from `public/brand/fonts` (Google Fonts latin subsets, SIL Open Font License, license files alongside). To change either family, edit `src/app/fonts.ts` only — Tailwind reads the faces through the `--font-body` / `--font-heading` variables it sets.

## Content still needed ("Needs Luke")

Every unsupplied item renders with the same dashed amber **Needs Luke** tag (`src/components/ui/needs.tsx`, registry in `src/content/needs.ts`), so reviewers can spot gaps on the preview. Current list:

| Item | Where it shows |
| --- | --- |
| Sales phone number | Footer, Contact |
| Office locations / HQ address | Footer, Contact, About |
| Demo booking link (Microsoft Bookings or Calendly) | `/demo` calendar placeholder |
| HubX login URL (currently `hubx.msphub.com`) | `/hubx` hero, Contact |
| HubX pricing model | `/hubx` FAQ |
| HubX dark-mode screenshots (portal visuals are mock-ups with sample data) | Home hero, `/hubx` |
| MSP vs direct positioning, white-label option | Home spotlight, `/hubx` |
| Hub AI scope, integrations list, onboarding steps, data hosting, marketplace relationship | `/hubx` |
| Quote response-time promise | `/hubx`, `/microsoft-365-quote` |
| Leadership names/titles/photos/bios; team photography | `/about` |
| Permission for vendor logos and MNJ Technologies testimonials carried over from msphub.com | Home, `/hubx`, `/about`, `/demo`, `/partners` |
| Alliance logos (Ingram Micro, Trust X Alliance, Frontier Technologies, P2 Telecom) | `/partners` |
| Partner program mechanics (tiers, deal registration) | `/partners` |
| Products we built (SIX.One, Wave, AppLauncher) — OK to show publicly? | `/services/development` |
| Delivery regions (North America, UK, India) | Home, `/services`, `/about` |
| "Formerly READY Networks / Six.One" prominence; HubX launch date | Footer, `/about` timeline |
| Social profiles are all still active | Footer |
| Legal text (Termly owner; port Privacy, Terms, Cookie policies) | `/privacy`, `/terms`, `/cookies` |

Only the three approved statistics are published (478+ companies, 600K+ licenses, 100+ staff); every other number from the decks or the old site is left out.

## Deploy

The project is deployed on Vercel from this repository (team **MSP Hub**, project `msphub-website`, Next.js preset, root `./`).

- `main` → production deployment at https://msphub-website.vercel.app (the shareable team-review URL until msphub.com cutover).
- Every pull request gets its own preview deployment; the Vercel bot comments the URL on the PR.
- No build settings beyond the preset. Set the environment variables above as needed.
- The CLI is linked with `vercel link` (writes the gitignored `.vercel/` folder and a `.env.local`; never commit either).

### Go-live on msphub.com (later, dev team)

Add `msphub.com` and `www.msphub.com` to the Vercel project's Domains, point DNS at Vercel, set `NEXT_PUBLIC_SITE_URL=https://msphub.com`, `NEXT_PUBLIC_ALLOW_INDEXING=true`, `RESEND_API_KEY` and `LEAD_FROM_EMAIL` on Production, and redeploy. The redirect and 410 maps in `next.config.ts` then handle the old URLs. A full cutover runbook ships with the handoff package.

## Contributing

Branch from `main`, open a pull request, review on the preview URL, merge. Direct pushes to `main` were used only for the initial scaffold and the placeholder rebrand.

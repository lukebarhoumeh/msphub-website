# msphub-website

Source for the new [msphub.com](https://msphub.com) — the marketing site for **MSP Hub** and its four branches: HubX (the Microsoft portal, "HubX, powered by MSP Hub"), professional services, managed services, and development as a service.

**Status:** Phase 1 scaffold. The site currently serves a single "coming soon" placeholder while the design plan is approved. Real pages land through pull requests into `main`.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, TypeScript, Turbopack)
- [Tailwind CSS](https://tailwindcss.com) v4 (CSS-first config in `src/app/globals.css`)
- ESLint 9 (`eslint-config-next`)
- Hosted on [Vercel](https://vercel.com)

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
src/app/            App Router routes, root layout, global CSS
src/app/fonts.ts    Font faces (next/font/local) — the one place to swap typography
src/lib/            Shared helpers (site config)
public/brand/       HubX brand assets served as-is (/brand/...)
  svg/, png/        Logo lockups, X marks, app icon (from the HubX brand kit)
  fonts/            Self-hosted web fonts + licenses
docs/brand/         HubX-Logo-Guidelines.pdf (the brand kit rules)
```

## Brand assets

**Brand rule (Luke, Nov 2 2026): the site is branded MSP Hub, not HubX.** The `<title>`, site name in metadata, header logo, hero headline, favicon/app icon, footer, and Open Graph image all use MSP Hub. HubX appears only where the Microsoft side is introduced (the HubX spotlight on the home page, `/hubx`, and the Microsoft 365 quote flow), is always written "HubX, powered by MSP Hub", and carries the HubX logo there. Present HubX as the new flagship product under MSP Hub, never as the company.

- `public/brand/msphub/` — MSP Hub wordmark (`msp-hub-logo-white.svg`) and hex mark (`msp-hub-icon.svg`), taken from the current msphub.com until Luke supplies master files. The wordmark is for dark backgrounds only.
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

Defined in `src/app/globals.css` with Tailwind v4 `@theme`, so they are available as utilities (`bg-brand-orange`, `text-brand-charcoal`, `bg-ink`, `font-display`, ...).

| Token | Value | Source |
| --- | --- | --- |
| `brand-orange` | `#F97316` | Brand kit — the X, accents. Too low-contrast for small text on light backgrounds. |
| `brand-charcoal` | `#424242` | Brand kit — "Hub" wordmark, one-color uses |
| `brand-white` | `#FFFFFF` | Brand kit |
| `brand-canvas` | `#EEEEEE` | Brand kit — the portal's light canvas |
| `ink` | `#0A0D14` | Website plan — page background (pending design approval) |
| `navy-900` / `navy-700` | `#0F1A33` / `#132142` | Website plan — section glows (pending design approval) |

**Fonts.** The brand kit contains no typefaces, so the current faces are the website plan's proposal, not an approved brand decision: **Inter** for body copy (`font-sans`) and **Source Serif 4** for headlines (`font-display`). Both are self-hosted from `public/brand/fonts` (Google Fonts latin subsets, SIL Open Font License, license files alongside). To change either family, edit `src/app/fonts.ts` only — Tailwind reads the faces through the `--font-body` / `--font-heading` variables it sets.

## Deploy

The project is deployed on Vercel from this repository.

- `main` → production deployment (the shareable team-review URL until msphub.com cutover).
- Every pull request gets its own preview deployment; the Vercel bot comments the URL on the PR.
- Framework preset: Next.js (auto-detected). Build command `next build`, output handled by Vercel. No special settings.

### First-time setup (already done or to be done once)

1. In Vercel, **Add New → Project**, import `lukebarhoumeh/msphub-website`, keep the Next.js preset, deploy.
2. No environment variables are required for the placeholder.

### Environment variables

| Variable | Where | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_ALLOW_INDEXING` | Production (msphub.com) only | Set to `true` at launch. Until then every response carries `X-Robots-Tag: noindex, nofollow` and `<meta name="robots">` so preview URLs stay out of search engines. |

Variables for lead forms, analytics, etc. will be added with the features that need them (see the website plan).

### Go-live on msphub.com (later, dev team)

Add `msphub.com` and `www.msphub.com` to the Vercel project's Domains, point DNS at Vercel, set `NEXT_PUBLIC_ALLOW_INDEXING=true` on production, and redeploy. A full cutover runbook ships with the handoff package.

## Contributing

Branch from `main`, open a pull request, review on the preview URL, merge. Direct pushes to `main` are reserved for the initial scaffold.

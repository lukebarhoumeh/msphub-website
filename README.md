# msphub-website

Source for the new [msphub.com](https://msphub.com) — the marketing site for **MSP Hub** and its four branches: HubX (the Microsoft portal, "HubX, powered by MSP Hub"), professional services, managed services, and development as a service.

**Status:** building from Luke's handoff in phases (see `docs/architecture.md`, Phase 1 corrections applied). Work lands through pull requests into `main`; `main` deploys to production on Vercel.

- Preview / production URL: https://msphub-website.vercel.app (Vercel team **MSP Hub**, project `msphub-website`)
- Source of truth: `HANDOFF.md`, kept outside this public repository (see `.cursor/rules/msphub-website.mdc` for where the private copy lives). `docs/architecture.md` carries the publishable summary, content model, routes, and env vars.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, TypeScript, Turbopack, Cache Components)
- [Tailwind CSS](https://tailwindcss.com) v4 (CSS-first config in `src/app/globals.css`)
- `zod` + `react-hook-form` (form validation, one schema shared by client and server), `lucide-react` (icons)
- `@next/mdx` with `remark-frontmatter` + `remark-mdx-frontmatter` + `remark-gfm` for long-form content (`/insights`, `/legal`)
- ESLint 9 (`eslint-config-next`)
- Hosted on [Vercel](https://vercel.com). Integrations, each optional and env-gated: Pipedrive (CRM leads, REST), [Resend](https://resend.com) (email, HTTP API), Cloudflare Turnstile, Microsoft Bookings, GA4 + Microsoft Clarity, Vercel Blob or Azure Blob Storage (invoice uploads)

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
  api/lead/route.ts       The one form endpoint (six lead kinds): honeypot → rate limit → zod → Turnstile → Pipedrive + Resend
  api/upload/route.ts     Secure invoice upload (PDF/XLSX/XLS/CSV ≤ 10 MB) into private blob storage
  api/geo/route.ts        Visitor country (Vercel edge header) for the analytics consent decision
  licensing/              Licensing hub, switch (invoice upload), ea-to-csp, beyond-microsoft, quote
  partners/               Partner hub, reseller / agents / platform program pages, apply form
  support/, insights/     Support paths & hours; MDX blog (index + [slug])
  legal/[document]/       Terms, Privacy, Cookies from src/content/legal/*.mdx
  thank-you/[form]/       Per-form confirmation pages (demo, service, quote, contact, switch, partner)
  gone/route.ts           410 Gone for old theme-demo URLs (wired via rewrites)
  opengraph-image.png     Site-wide OG image (from the MSP Hub logo kit); routes add opengraph-image.tsx (generated)
  sitemap.ts, robots.ts   SEO files; robots allows indexing only on production msphub.com
src/mdx-components.tsx    Element styles for MDX bodies (charcoal prose on the light canvas)
src/components/
  analytics/              Analytics (GA4 + Clarity loader with consent notice), ConsentSettingsButton
  brand/                  MspHubLogo (single asset path), HubXLogo / HubXLockup / HubXPoweredBy (text lockup only)
  layout/                 Header (sticky glass, mobile menu), Footer (four columns per the handoff), social icons, review-build integration status strip
  seo/                    JsonLd (schema.org script tag)
  ui/                     Button, Section/Container/Glow, typography (dark/light tone), cards, NeedsConfirm
  marketing/              Page hero, BrowserFrame (real HubX captures), stats, credentials, logo cloud, FAQ (+ FaqSection with schema), CTA band, BookingsEmbed
  hubx/                   HubX section: ScreenshotCarousel (tabbed, keyboard + swipe, no autoplay), ModuleExplorer (WAI-ARIA tabs),
                          FeatureGrid (the 12 capabilities), HubAiConversation (read-only demo), HubxSubnav, FaqSection (+ FAQPage
                          schema), Breadcrumbs (+ BreadcrumbList), ModuleCard, home sections, track() (re-export of lib/analytics)
  forms/                  LeadForm (react-hook-form + zod + Turnstile + honeypot), FieldRenderer, Turnstile, field primitives
  licensing/              InvoiceUpload (secure upload client for the switch and quote forms)
  partners/               Program page layout
  insights/               PostCard
src/content/              Typed content: site facts + timeline + leadership, stats, credentials, confirmations registry,
                          HubX (hubx.ts page copy, hubx-modules.ts, hubx-features.ts, hubai-demo.ts, hubx-faq.ts,
                          hubx-security.ts, hubx-whats-new.ts), services, licensing, partners, support, thank-you,
                          lead-kinds (switch/partner field definitions), ecosystem (text chips), screens manifest, nav,
                          forms (labels, options, messages), consent copy, OG image copy
  insights/*.mdx          Blog posts with YAML frontmatter; registered in insights/index.ts
  legal/*.mdx             Terms, Privacy, Cookies; registered in legal/index.ts
src/lib/                  site.ts (URL/indexing rule), lead.ts (kinds registry: schemas + fields), env.ts, pipedrive.ts, email.ts,
                          turnstile.ts, rate-limit.ts, storage/ (Vercel Blob + Azure adapters, signed refs), analytics.ts,
                          consent.ts, metadata.ts, schema.ts (JSON-LD builders), og.tsx (OG renderer), cn.ts
public/brand/             Brand assets served as-is (/brand/...): msphub/ (logo kit SVGs + badge), svg/ + png/ (HubX kit)
public/favicon/           PWA icons (192/512) referenced by public/site.webmanifest
public/hubx/              Real HubX screenshots (anonymized, demo data) + manifest README
public/proof/             Award image carried over from msphub.com
docs/brand/               HubX-Logo-Guidelines.pdf (the brand kit rules)
```

## Sitemap

`/` · `/hubx` · `/hubx/features` · `/hubx/features/[module]` (home, customers, catalog, quotations, billing, dashboards-reports, service-desk, hubai) · `/hubx/security` · `/hubx/whats-new` · `/services` · `/services/professional` · `/services/managed` · `/services/development` · `/licensing` · `/licensing/switch` · `/licensing/ea-to-csp` · `/licensing/beyond-microsoft` · `/licensing/quote` · `/partners` · `/partners/reseller` · `/partners/agents` · `/partners/platform` · `/partners/apply` · `/support` · `/insights` · `/insights/[slug]` · `/about` · `/contact` · `/demo` · `/legal/terms` · `/legal/privacy` · `/legal/cookies` · `/thank-you/[form]` (noindex) · 404.

### HubX pages

Everything on `/hubx` and below is traceable to the verified module inventory in the private handoff (§6, product walk-through of Nov 2, 2026): nine modules (`src/content/hubx-modules.ts`), the twelve spotlighted capabilities (`src/content/hubx-features.ts`, each linking to its module page), the read-only HubAI demo conversation with fictional data (`src/content/hubai-demo.ts`), the FAQ with FAQPage schema (`src/content/hubx-faq.ts`), the security page (`src/content/hubx-security.ts`), and the early-access release notes (`src/content/hubx-whats-new.ts`). Screenshots come from `public/hubx/` through `src/content/screens.ts`; `ScreenshotCarousel` only accepts captures of one theme (type-checked), and the single dark capture appears on dark bands only. Administration is documented on `/hubx/security` rather than a feature page. The `track()` shim in `src/components/hubx/track.ts` emits `screenshot_view` and `hubx_login_click` as a `msphub:track` DOM event and to `gtag` when present; the analytics loader (Phase 5) subscribes to it, and nothing breaks without one.

Route moves inside this site redirect permanently (308): `/microsoft-365-quote` → `/licensing/quote`; `/privacy`, `/terms`, `/cookies` → `/legal/*`; `/thank-you?flow=<kind>` → `/thank-you/<kind>` (bare `/thank-you` → `/thank-you/contact`). Legacy WordPress URLs redirect permanently (308) to their new homes — company, services, Marketplace → HubX, partners, `/news`, `/news/page/N`, `/blog` → `/insights`, and the legal pages — and the old theme-demo URLs (`/team/*`, `/case-studies/*`, `/projects/*`, `/careers/*`, …) return **410 Gone**; both maps live in `next.config.ts` and take effect once msphub.com points at this deployment. `sitemap.xml` lists the indexable routes from `src/app/sitemap.ts`; `robots.txt` disallows everything except on the production msphub.com deployment (see `NEXT_PUBLIC_SITE_URL` below).

## Forms and lead delivery

Every form is `<LeadForm kind="…" />` (`src/components/forms/lead-form.tsx`: react-hook-form + zod + Cloudflare Turnstile + honeypot). A **kind** is one entry in the registry in `src/lib/lead.ts` — label, zod schema, field definitions (copy in `src/content/forms.ts`) — so the client and `POST /api/lead` validate identically. Kinds today: **demo** (`/demo`), **service** (`/services#inquiry`), **quote** (`/licensing/quote`, with qualification, current provider, renewal date, licenses, and an optional uploaded invoice), **contact** (`/contact`, `?topic=partnership` preselects the partner topic), **switch** (`/licensing/switch`, the invoice-comparison request; field definitions in `src/content/lead-kinds.ts`), and **partner** (`/partners/apply`, `?program=` preselects the program). Adding a form = one registry entry + its content module + a `PIPEDRIVE_LEAD_LABEL_<KIND>` variable. `LeadForm` renders `children` inside the form (and inside react-hook-form's `FormProvider`) for kind-specific controls such as an invoice upload; `useLeadForm()` exposes the kind and status.

`POST /api/lead` runs: JSON body → honeypot (`website` filled → pretend success) → per-IP rate limit (10 per 10 minutes, in memory, 429) → zod validation for the posted kind (400 `invalid` + `fieldErrors`) → Turnstile `siteverify` (400 `captcha_failed`; fails closed when `TURNSTILE_SECRET_KEY` is set, passes through when it is not) → optional invoice reference → signed deal-desk link → **Pipedrive** (Organization + Person deduplicated, Lead labelled per kind, Note with the field table and invoice link) → **email to sales@msphub.com via Resend** (`[PREVIEW]`-prefixed off production, with the Pipedrive lead URL). Pipedrive and email degrade independently: one failing still delivers; neither configured → 503 `not_configured`; both failing → 502 `delivery_failed`. On every failure the form keeps the visitor's input on screen with a visible notice and a prefilled `mailto:sales@msphub.com`. Success → `/thank-you/<kind>` (noindex; per-kind "what happens next" copy from `src/content/thank-you.ts`, with a Bookings button when `NEXT_PUBLIC_BOOKINGS_URL` is set) and the kind's analytics event.

**Invoice upload** (`POST /api/upload`; the client is `InvoiceUpload` in `src/components/licensing/invoice-upload.tsx`, rendered as a child of the switch and quote forms): `multipart/form-data` with `file` (PDF, XLSX, XLS, or CSV, ≤ 10 MB, checked by extension *and* magic bytes) and `kind`. Success: `200 { ok: true, file: { id, name, size, type } }`; `id` is an opaque HMAC-signed reference, never a URL. Failures: 400 `invalid_file`, 415 `unsupported_type`, 413 `too_large`, 429 `rate_limited`, 503 `not_configured` (no storage variables — the state the POC ships in; the UI shows "secure upload not available" and the form still submits), 500 `upload_failed`. Files land in **private** storage under a random key (`src/lib/storage/`: Vercel Blob with `access: "private"` or Azure Blob Storage, chosen by env); the lead handler turns `invoiceId` into a signed link that expires after `UPLOAD_LINK_TTL_HOURS` (default 72). Nothing is ever public and no virus scanning is performed (open attachments with the usual care). Vercel Functions cap request bodies at 4.5 MB, so on Vercel the platform answers 413 before this handler for larger files.

**Bookings** (`/demo`): `BookingsEmbed` renders the Microsoft Bookings page in a lazy, sandboxed iframe with an "Open in Microsoft Bookings" link when `NEXT_PUBLIC_BOOKINGS_URL` is set; without it the request form is the path (review builds show the asset marker).

**Analytics and consent**: `<Analytics />` (root layout) loads GA4 and Microsoft Clarity only after the first interaction or browser idle, and only when their ids are set. Visitors in the US get analytics without a notice; everyone else (and anyone whose country cannot be read, e.g. local dev) sees a minimal notice: GA4 starts with Consent Mode `analytics_storage: denied` (no cookies) and Clarity waits until "Accept analytics". The decision lives in localStorage; `ConsentSettingsButton` reopens the notice. Events (`src/lib/analytics.ts` → `track()`): `demo_request`, `quote_request`, `service_inquiry`, `contact_message`, `invoice_upload`, `partner_apply`, `hubx_login_click` (any link to the HubX login host), `screenshot_view` (call `track` from the carousel). Without ids: no scripts, no cookies, no notice.

**SEO**: `pageMetadata()` (`src/lib/metadata.ts`) builds title, description, canonical, Open Graph, and Twitter fields per route; each route can add a generated `opengraph-image.tsx` (copy in `src/content/og.ts`, renderer in `src/lib/og.tsx`, static at build). JSON-LD via `<JsonLd />` with builders in `src/lib/schema.ts`: `Organization` + `WebSite` (layout), `Service` (service pages), `SoftwareApplication` (HubX), `FAQPage`, `BreadcrumbList`, `ContactPage`.

**Review builds**: with `NEXT_PUBLIC_SHOW_TODOS=true` a strip above the footer lists which integrations the deployment has configured (presence only, never values).

## Insights and legal content (MDX)

Posts live in `src/content/insights/*.mdx` with YAML frontmatter (`title`, `date` as `YYYY-MM-DD` or `YYYY-MM`, `summary`, `tags`, optional `canonical`, `author`, `note`); add a post by importing it in `src/content/insights/index.ts`, which validates the frontmatter with zod at build time. The three posts named in the handoff are rebuilt from facts in the handoff and replace the originals when the WordPress export arrives (`NeedsConfirm id="insightsSource"`). Legal documents live in `src/content/legal/*.mdx` (`title`, `summary`, `currentUrl`, `updated`, `migrated`); paste the verbatim policy text into the body and set `migrated: true` to drop the "current policy on msphub.com" link.

### Environment variables

None are set for the POC: every integration ships with its honest fallback. This is the complete go-live list. Set them in Vercel → Project → Settings → Environment Variables (scoped to Preview / Production), then redeploy — values are read at build time.

| Variable | Where | Purpose and fallback |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production (`https://msphub.com`) | Canonical origin for metadata, sitemap, and structured data. Falls back to the Vercel production URL. **Indexing is allowed only when the Vercel environment is `production` and this is msphub.com**; otherwise every response carries `X-Robots-Tag: noindex, nofollow`, pages carry `<meta name="robots">`, and `robots.txt` disallows everything (`src/lib/site.ts`). |
| `NEXT_PUBLIC_SHOW_TODOS` | Preview only (`true`) | Shows the review chips rendered by `NeedsConfirm` and the integration status strip. Unset in production. |
| `PIPEDRIVE_API_TOKEN` | Preview (sandbox or a "Website test" label) + Production | Creates Organization + Person + Lead + Note per submission. Pipedrive → Personal preferences → API. Without it, leads are email-only (and the email says so). |
| `PIPEDRIVE_COMPANY_DOMAIN` | With the token | The `<domain>` in `https://<domain>.pipedrive.com`; enables lead links in the email. Falls back to `api.pipedrive.com`. |
| `PIPEDRIVE_LEAD_LABEL_DEMO`, `…_SERVICE`, `…_QUOTE`, `…_CONTACT`, `…_SWITCH`, `…_PARTNER` | With the token | Lead label UUIDs so each kind lands labelled (create the labels in Pipedrive → Leads Inbox → Labels; the id is in the API response or the label URL). Missing label → the lead is created unlabelled and a warning is logged. |
| `PIPEDRIVE_OWNER_ID` | Optional | Numeric user id that owns new leads. Default: the token's user. |
| `RESEND_API_KEY` | Preview + Production | Email copy of every lead to sales. resend.com → API Keys. Without it (and without Pipedrive), forms fall back to mailto. |
| `LEAD_FROM_EMAIL` | With the key | Verified sender, e.g. `MSP Hub Website <web@send.msphub.com>` (verify the domain in Resend: DNS records). Default is Resend's `onboarding@resend.dev`, which only delivers to the Resend account owner. |
| `LEAD_TO_EMAIL` | Optional | Recipient override. Default `sales@msphub.com`. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Preview + Production | Cloudflare Turnstile widget on every form (Cloudflare dashboard → Turnstile → add widget for `msphub.com` and `*.vercel.app`, managed mode). Without it the form shows "Spam protection isn't configured on this deployment" and still submits. |
| `TURNSTILE_SECRET_KEY` | Preview + Production | Server-side verification. Set together with the site key; when set, submissions without a valid token are rejected (fail closed). Unset → pass-through. |
| `NEXT_PUBLIC_BOOKINGS_URL` | Preview + Production | Microsoft Bookings page URL for the `/demo` embed ("HubX demo — 30 min"; Bookings → booking page → embed/share URL). Unset → request form only. `BOOKINGS_URL` is accepted as an alias. |
| `NEXT_PUBLIC_GA4_ID` | Production (+ Preview if wanted) | GA4 measurement id (`G-…`). Unset → GA4 never loads. |
| `NEXT_PUBLIC_CLARITY_ID` | Production | Microsoft Clarity project id. Unset → Clarity never loads. With neither analytics id set, no consent notice is shown. |
| `BLOB_READ_WRITE_TOKEN` | Preview + Production (one storage provider) | Vercel Blob store token (Vercel → Storage → Blob → connect to the project; private blobs). Enables `/api/upload`. |
| `AZURE_STORAGE_CONNECTION_STRING` + `AZURE_STORAGE_CONTAINER` | Alternative storage provider | Azure Blob Storage connection string with an account key (the SDK signs SAS links locally) and the private container name (default `msphub-invoices`, created on first upload). Used only when `BLOB_READ_WRITE_TOKEN` is absent. |
| `UPLOAD_LINK_TTL_HOURS` | Optional | Lifetime of the signed invoice link in the deal-desk email and CRM note. Default 72, max 720. |
| `VERCEL_ENV`, `VERCEL_PROJECT_PRODUCTION_URL` | Automatic (Vercel) | Environment detection (`[PREVIEW]` subject and lead-title prefix off production, indexing rule) and the fallback canonical origin. |

## Brand assets

**Brand rule: MSP Hub is the company, the services, and the legal entity; HubX is the platform (one word).** The `<title>`, site name in metadata, header logo, hero headline, favicon/app icon, footer, and Open Graph image all use MSP Hub. HubX appears only where the Microsoft side is introduced (the HubX spotlight on the home page, `/hubx`, `/demo`, and the licensing quote flow) with the HubX logo and the **text lockup only**: "HubX, powered by MSP Hub". No combined logo is composed and the kit's "Powered by MSP Hub" badge is not used on the site.

### MSP Hub logo (concept "Core", kit v1.0, Nov 2 2026)

An orange core held by two brackets beside the `MSP Hub` wordmark; all SVGs are outlined artwork. The lockup is referenced from exactly one place, `src/components/brand/msp-hub-logo.tsx` (`MSP_HUB_LOGO` and `MSP_HUB_POWERED_BY_BADGE`), so a future change is a one-file swap.

| Asset | Where it is used |
| --- | --- |
| `public/brand/msphub/svg/msphub-logo-horizontal-reversed.svg` | Header (28 px tall on mobile, 32 px on desktop) and footer. `msphub-logo-stacked-reversed.svg` is available for narrow columns. |
| `public/brand/msphub/badge/*.svg` | "Powered by MSP Hub" badge from the kit — **not used on the site** (text lockup only); kept for HubX materials. |
| `src/app/icon.svg`, `src/app/favicon.ico`, `src/app/apple-icon.png` | Favicon set from the kit, wired through the Next.js metadata file conventions. `icon.svg` switches the brackets from charcoal to white with the browser colour scheme; `favicon.ico` is the one-colour orange mark for browsers without SVG favicons. |
| `public/favicon/icon-192.png`, `icon-512.png`, `public/site.webmanifest` | PWA icons with `"purpose": "any maskable"`; the manifest is linked from the root metadata. `icon-512.png` is also the Organization logo in JSON-LD. |
| `src/app/opengraph-image.png` (+ `.alt.txt`) | The kit's 1200 × 630 `og/og-image.png`, served as the site-wide `og:image`. |
| `public/brand/msphub/svg/` (all colour versions, `with-tm/`), `badge/msphub-powered-by-positive.svg` | The rest of the kit for the dev team: positive versions for light grounds, white knockout, charcoal and orange one-colour, lockups with ™ for legal and print. |

Rules from the MSP Hub guidelines that bind the site:

- Pick the version by background: reversed on dark (the whole site), positive on white/light, all-white on orange or photos with a dark overlay.
- Clear space: half the mark's height on every side of a lockup, measured from the mark (a 32 px header logo needs 16 px); the mark alone gets a quarter of its height.
- Minimum sizes on screen: horizontal lockup 24 px tall (about 140 px wide), header 28–32 px; stacked lockup 48 px; mark alone 16 px — below the lockup minimums switch to the mark. Badge 24 px minimum.
- Beside a HubX logo the site uses the text lockup "HubX, powered by MSP Hub" (`HubXLockup`), never a composed logo. The open diamond inside the HubX X is the MSP Hub core; never nest one mark in the other or recolour either.
- Never stretch, rotate, crop, add shadows/glows/gradients/glass effects to the artwork (glass panels sit behind the logo, not on it), recolour, put the core on an orange field, or retype "MSP Hub" as a logo. Write `MSP Hub` in text, never `MSPHub` or `MSP HUB`.
- Colours are shared with the HubX kit: Brand Orange `#F97316`, Charcoal `#424242`, White.

### HubX brand kit

- `public/brand/svg`, `public/brand/png` — the unmodified HubX brand kit, used under the kit's rules below.

Pick the HubX version by background, per the guidelines:

| File | Use on |
| --- | --- |
| `hubx-logo-full-color` | White and light backgrounds (default) |
| `hubx-logo-reversed` | Charcoal, black, dark mode — **the site's default** |
| `hubx-logo-white` | Orange, photos, other colored fields |
| `hubx-logo-charcoal` | One-color / grayscale uses |
| `hubx-mark-*` | Avatars and tight UI for HubX itself (never the full logo below 24 px) |
| `hubx-app-icon` | App stores, home screens, integrations |

Rules that apply to every page: keep clear space of half the logo height on all sides, never add glows/shadows/gradients to the logo, never recolor or retype it, and write the name as `HubX`. Full text in `docs/brand/HubX-Logo-Guidelines.pdf`. The site's favicon is the MSP Hub mark (brand rule above); the HubX X mark stays reserved for HubX-specific surfaces.

## Design system

Tokens live in `src/app/globals.css` (Tailwind v4 `@theme`) and follow the handoff §7: one orange, charcoal type on the HubX light canvas, the dark ground for hero/footer/dark bands, MSP Hub navy for company contexts, 12 px cards and 999 px pills, entrance fades ≤ 300 ms with ≤ 60 ms stagger, no parallax, no loader.

| Token | Value | Use |
| --- | --- | --- |
| `brand-orange` | `#F97316` | The single accent site-wide: buttons (ink text), eyebrow rules, active states, the X. Never small orange text on white. |
| `charcoal` / `brand-charcoal` | `#424242` | Type on light sections; the HubX bracket colour |
| `canvas` / `brand-canvas` | `#EEEEEE` | Light section background (matches the HubX portal canvas) |
| `ink` / `ink-2` | `#0A0D14` / `#0D121C` | Dark ground: hero, dark bands, footer |
| `navy` | `#1A2949` | MSP Hub brand navy for company/legal contexts |
| `navy-900` / `navy-700` | `#0F1A33` / `#132142` | Glows on dark sections |
| `orange-hover` / `orange-deep` | `#FB8A3C` / `#EA6A0F` | UI hover/pressed only, never on logo artwork |
| `success` / `error` | `#22C55E` / `#F87171` | Deltas and form states |
| `--radius-card` / `--radius-panel` | 12 px / 16 px | Cards (`glass`, `card-light`) and large panels (`glass-lg`) |

Rhythm: dark hero → light `canvas` sections for product proof (real light-theme screenshots sit naturally) → dark bands for "Why MSP Hub" and the final CTA. `Section tone="light"`, `SectionHeading tone="light"`, `GlassCard tone="light"` and `Chip tone="light"` switch a block to the light palette; `KpiTile` mirrors the HubX tile for the track-record stats; `Timeline`, `AudienceTabs` (WAI-ARIA tabs), `BrowserFrame`, `CredentialBadges`, `LogoCloud`, `Faq`, and `CtaBand` are the shared marketing blocks. Eyebrows are mono, tracked, uppercase; headings serif; body sans. Motion utilities: `motion-safe:animate-fade-up` with `stagger-1…5`; `prefers-reduced-motion` disables every animation and transition, `prefers-reduced-transparency` flattens the glass.

**Fonts.** **Source Serif 4** for headlines (`font-display`), **Inter** for body copy (`font-sans`), **JetBrains Mono** for SKUs, ids, and eyebrows (`font-mono`). All three are self-hosted from `public/brand/fonts` (Google Fonts latin subsets, SIL Open Font License, license files alongside) and loaded in `src/app/fonts.ts` — the one place to swap a family.

**Accessibility.** WCAG 2.2 AA targets: 4.5:1 for text (muted text is white/60 or charcoal/80 or stronger), visible 2 px orange focus ring, 44 px touch targets (buttons `h-11`+), skip link, semantic landmarks, labelled form fields with `aria-describedby` errors. axe-core runs clean on every page the design system owns.

## Review markers (`NeedsConfirm`)

Every unconfirmed fact, pending decision, or missing asset from the handoff renders through `<NeedsConfirm id="…" fallback={…}>` (`src/components/ui/needs-confirm.tsx`; registry with labels and details in `src/content/confirmations.ts`). The `fallback` prop is required, so TypeScript fails the build if one is missing. With `NEXT_PUBLIC_SHOW_TODOS=true` (Preview) the amber Confirm / Decision / Asset chip appears next to the item; production renders only the fallback. Facts that are hidden in production until confirmed: services headcount, leadership, the products-we-built block, the booking calendar placeholder, and the testimonial block (empty until current partners and customers supply quotes).

Credentials render only from `src/content/credentials.ts` entries with `active: true`. The Microsoft Solutions Partner program renders its **enrolled solution areas** as text chips (Data & AI, Digital & App Innovation, Infrastructure, Modern Work, Security — no scores or points, ever); designation badge artwork is added only once a designation is attained and the Logo Builder file is supplied. Leadership (`leadership` in `src/content/site.ts`) and the company story and timeline come from Luke's deck slides where they agree with the handoff; portraits in `public/team/` are cropped from the leadership slide until hi-res originals arrive. Statistics come from `src/content/stats.ts`, one number per stat. Vendor and alliance names render as text chips (`src/content/ecosystem.ts`) until logo files and written permission exist.

## Deploy

The project is deployed on Vercel from this repository (team **MSP Hub**, project `msphub-website`, Next.js preset, root `./`).

- `main` → production deployment at https://msphub-website.vercel.app (the shareable team-review URL until msphub.com cutover).
- Every pull request gets its own preview deployment; the Vercel bot comments the URL on the PR.
- No build settings beyond the preset. Set the environment variables above as needed.
- The CLI is linked with `vercel link` (writes the gitignored `.vercel/` folder and a `.env.local`; never commit either).

### Go-live on msphub.com (later, dev team)

The full launch list — variables, assets, decisions, and remaining code work — is in `docs/launch-checklist.md`.

Add `msphub.com` and `www.msphub.com` to the Vercel project's Domains, point DNS at Vercel, set `NEXT_PUBLIC_SITE_URL=https://msphub.com` on Production (this is what switches indexing on), add the integration variables from the table above (at minimum `RESEND_API_KEY` + `LEAD_FROM_EMAIL` or `PIPEDRIVE_API_TOKEN` + labels, and the Turnstile pair), and redeploy. The redirect and 410 maps in `next.config.ts` then handle the old URLs. A full cutover runbook ships with the handoff package.

## Contributing

Branch from `main`, open a pull request, review on the preview URL, merge. Direct pushes to `main` were used only for the initial scaffold and the placeholder rebrand.

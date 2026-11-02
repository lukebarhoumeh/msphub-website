# msphub-website — architecture note (Phase 0)

Status: plan only, no application code changed · Nov 2, 2026 · Source of truth: Luke's handoff (`HANDOFF.md` v1) and the work order delivered with it.

This note is the Phase 0 deliverable: the content model, the component inventory, the final route list, the redirect map, the environment variables, and everything in the handoff that cannot be implemented exactly as written. Phases 1–6 each ship as one pull request and stop for review.

---

## 0. Where the source documents live

- **`HANDOFF.md` is intentionally not committed.** The repository is public and hard rule 2 bans customer, partner, and prospect names from code, content, fixtures, tests, and commits. The handoff names a former customer (testimonial source), distribution and billing partners with commercial detail, alliance partners, and internal status notes (certification renewal timing, internal source references). The canonical copy stays in the project workspace (`internal/handoff/HANDOFF.md`) and with Luke; this note carries everything the build needs from it in publishable form. `.cursor/rules/msphub-website.mdc` is committed verbatim; its reference to `docs/HANDOFF.md` therefore points outside the repo — see §9 item 1.
- `public/hubx/` holds the 13 anonymized HubX captures plus their manifest README (committed in this PR; identifiers already replaced with Customer A/B…, `user@partner.com`, `tenant.onmicrosoft.com`; figures scrambled).
- The forbidden-terms list for the pre-commit grep lives outside the repo (`~/.msphub/forbidden-terms.txt`, Luke's machine) and is never committed.

---

## 1. Content model (`src/content/*`)

Copy lives in typed data, never in JSX. `src/content` already exists (imported as `@/content/*`); the handoff's `content/*` maps onto it. Every string a page renders comes from one of these modules; components receive data as props.

| Module | Shape (TypeScript) | Feeds | Phase |
| --- | --- | --- | --- |
| `site.ts` | `{ name, legalName, founded: 1999, formerly: "READY Networks", hq: { city, region, address }, salesEmail, salesPhone, hours, hubxUrl, social{…}, copyrightYear }` | Header, footer, contact, JSON-LD | 1 |
| `stats.ts` | `Stat[] = { id, value, suffix, label, source, confirm?: ConfirmId }` — one locked number per stat (companies, licenses, services headcount, "since 1999", catalog SKUs) | Trust strip, KpiTile band, About | 1 |
| `credentials.ts` | `Credential[] = { id, name, badgeName, issuer: "microsoft" \| "iso" \| "award", active: boolean, logo?: string, href?: string, confirm?: ConfirmId }` | `CredentialBadges` renders `active: true` only | 1 |
| `confirmations.ts` (replaces `needs.ts`) | `Record<ConfirmId, { label, detail, decision?: boolean }>` — registry of every CONFIRM / DECISION / ASSET item | `NeedsConfirm` | 1 |
| `audiences.ts` | `Audience[] = { id: "msp" \| "business" \| "direct-bill-csp" \| "agent", label, title, body, points[], cta }` | `AudienceTabs` (home, /hubx, /partners) | 2 |
| `branches.ts` | existing four branches + a fifth "Licensing" card for /services | Home bento, /services | 1/3 |
| `hubx-modules.ts` | `Module[] = { slug, name, summary, bullets[], screens: ScreenId[], hubxRoute }` for Home & performance, Customers, Catalog, Quotations, Billing & invoices, Dashboards & reports, Service Desk, HubAI, Administration | /hubx modules, `/hubx/features/[slug]` | 2 |
| `hubx-features.ts` | the 12 "cool things": `{ rank, id, title, body, icon, module: slug, screen?: ScreenId }` | `FeatureGrid` (home + /hubx) | 2 |
| `screens.ts` | `Screen[] = { id, file, alt, caption, theme: "light" \| "dark", shows, uses[] }` — the §6.4 manifest; images imported statically so `next/image` gets intrinsic size + blur placeholder at build | `BrowserFrame`, `ScreenshotCarousel` | 2 |
| `hubai-demo.ts` | read-only Q&A transcript (two exchanges, tabular answers) + footer line | /hubx HubAI section | 2 |
| `faq.ts` | `FaqSet = Record<"hubx" \| "switch" \| "licensing" \| "support", FaqItem[]>`, `FaqItem = { q, a, confirm?: ConfirmId, fallback?: string }` | `FAQ` + FAQPage schema | 2/3 |
| `services/{professional,managed,development,licensing}.ts` | per-page: `{ headline, lead, columns/offerings/tracks, deliveryModel, pairsWithHubx, cta }` | Service pages | 1/3 |
| `licensing.ts` | hub catalog breadth, qualification types, terms, switch steps (5), EA→CSP sections, beyond-Microsoft categories, provider list for the quote form | `/licensing/*`, quote form | 3 |
| `partners.ts` | three programs `{ id: "reseller" \| "agent" \| "platform", who, gets[], cta }`, how-it-works steps, enablement list, economics line (no numbers), alliance + vendor **text chips** `{ name, kind: "distribution" \| "alliance" \| "vendor", logo?: null }` | /partners, /partners/* | 3 |
| `support.ts` | support paths, hours, what is 24/7 (managed monitoring only), escalation | /support, contact | 3 |
| `forms.ts` | per-form field definitions + zod schemas (demo, quote, service, contact, partner-apply, switch) incl. topic lists ("Billing question", "Partner-to-partner transfer"), qualification and current-provider selects | `Form`, `/api/lead` | 5 |
| `nav.ts` | header nav, footer columns per §4 (Company · Services · HubX · Licensing), legal links, social | Header, Footer | 3 |
| `timeline.ts` | 1999 → Nov 2024 (confirm) → Jul 2025 → Oct 2026 | `Timeline` on /about | 1 |
| `leadership.ts` | `{ name, title, photo?: string, bio?: string }[]`, gated by a confirm id until approved | /about | 1 (hidden) |
| `testimonials.ts` | `[]` until replacements exist; component hidden when empty | Home, /hubx, /about, /demo | 1 |
| `insights/*.mdx` | frontmatter `{ title, date, summary, tags[], canonical?, author? }` | `/insights`, `/insights/[slug]` | 3 |
| `legal/*.mdx` | terms, privacy, cookies (migrated verbatim, entity names updated) | `/legal/*` | 3 |

Conventions: ids are stable kebab-case strings; every optional claim carries a `confirm` id so the page can wrap it in `NeedsConfirm`; no module exports JSX; long-form text is MDX under `content/insights` and `content/legal`.

---

## 2. Component inventory

New or rebuilt components (all server components unless marked client; Tailwind v4 utilities; tokens from §7 of the handoff):

| Component | Responsibility | Props (abridged) | Notes |
| --- | --- | --- | --- |
| `BrowserFrame` | Chrome around a product screenshot: traffic lights, URL chip `hubx.msphub.com`, light or dark bezel | `{ screen: Screen, priority?, sizes?, theme }` | Wraps `next/image` with static import → intrinsic size, `placeholder="blur"`. `priority` only on the first hero image. |
| `ScreenshotCarousel` (client) | Carousel of `BrowserFrame`s with thumbnails, keyboard (←/→, Home/End), swipe, no autoplay | `{ screens: Screen[], caption? }` | Refuses mixed themes at build (type-level: `screens` must share `theme`). Emits `screenshot_view` analytics event. `aria-roledescription="carousel"`, live region for slide changes. |
| `KpiTile` | HubX-style tile: label / big number / delta badge / "total" line / sparkline | `{ label, value, delta?, total?, sparkline?: number[] }` | Used for the Track-record stats so site and product rhyme; sparkline is decorative SVG (`aria-hidden`). |
| `FeatureGrid` | The 12 "cool things" as tiles with Lucide icons, each linking to `/hubx/features/[module]` | `{ features: Feature[], columns?: 3 \| 4 }` | Ranked order from content; tile text ≤ 2 lines + body. |
| `AudienceTabs` (client) | 3 + 1 audience tabs (MSPs & VARs · Businesses · Direct-bill CSPs · Advisors/agents) | `{ audiences: Audience[], defaultId? }` | WAI-ARIA tabs pattern; URL hash sync; all panels server-rendered for SEO, hidden via `hidden`. |
| `Timeline` | Dated milestones | `{ items: { when, title, body, confirm? }[] }` | Ordered list; horizontal on ≥ lg. |
| `CredentialBadges` | Badges from `credentials.ts` where `active: true` | `{ credentials: Credential[], variant: "chips" \| "logos" }` | Text chip when `logo` is absent; links to the partner-directory listing when `href` exists. |
| `LogoCloud` | Vendor / alliance wall | `{ items: Partner[] }` | Renders a logo only when `logo` is set (permission obtained); otherwise a text chip — the default for launch. |
| `Form` (client) | Shared form engine: react-hook-form + zod, field renderer from `forms.ts`, Turnstile widget, honeypot, submit to `/api/lead`, fallback `mailto:` when delivery fails | `{ formId, defaultValues?, successPath }` | Labels always visible, errors tied with `aria-describedby`, `aria-live` status, 44 px targets. Replaces the current `LeadForm`. |
| `FileField` (client) | Invoice upload for `/licensing/switch` (PDF/XLSX/CSV ≤ 10 MB) | `{ accept, maxBytes }` | Uploads to `/api/upload` and submits the returned private file reference with the lead. |
| `FAQ` | Accordion (`details`/`summary`) + `FAQPage` JSON-LD from the same items | `{ items: FaqItem[], schema?: boolean }` | Items with a `confirm` id render their `fallback` answer in production. |
| `Testimonial` | Quote card | `{ quotes: Quote[] }` | Renders nothing when the list is empty (the launch state). |
| `CTASection` | Final/inline CTA band (glass on dark, flat on light) | `{ eyebrow?, title, lead?, primary, secondary?[] }` | Replaces `CtaBand`. |
| `NeedsConfirm` | Review-only marker | `{ id: ConfirmId, fallback: ReactNode \| null, children? }` | Shows the amber chip (plus `children`) only when `NEXT_PUBLIC_SHOW_TODOS === "true"`; otherwise renders `fallback`. `fallback` is a **required** prop, so TypeScript fails the build if it is missing — the handoff's "ESLint rule / build check". |
| `TrackedLink` (client) | `<a>`/`Link` that fires an analytics event (`hubx_login_click`, etc.) | `{ event, href, … }` | Used for "Log in to HubX" (`rel="noopener"`, same tab). |
| `Analytics` (client) | GA4 + Clarity loaders, idle/after-interaction, no-op without ids | — | See §9 item 6 (consent). |
| `BookingsEmbed` (client) | Microsoft Bookings iframe with form fallback | `{ url }` | Renders the fallback `Form` when `NEXT_PUBLIC_BOOKINGS_URL` is unset. |
| `MDXContent` | Renders `content/insights` and `content/legal` | `{ source }` | `@next/mdx` with `mdx-components.tsx`; prose styles per token set. |

Kept from the current build: `Header` (nav from `nav.ts`), `Footer` (rebuilt to the four §4 columns), `Section`/`Container`/`Glow`, `PageHero`, `GlassCard`/`FeatureCard`/`Chip`, `Button`, `Steps`, `MspHubLogo`, `HubXLogo`. Retired: `PortalFrame` (sidebar-nav mock — does not match the product), `HubXWithBadge` and `MspHubPoweredByBadge` usage (the lockup is text-only: "HubX, powered by MSP Hub"), `Needs`/`NeedsBlock` (superseded by `NeedsConfirm`), `VendorLogoWall` with the carried-over logo images (text chips until permission), the generated `PairsWithHubX` badge row (text lockup instead).

---

## 3. Route list (final, from handoff §4)

| Route | Status | Content | Phase |
| --- | --- | --- | --- |
| `/` | keep, rework per §5.1 | `site`, `stats`, `audiences`, `branches`, `hubx-features`, `screens` (01, 04, 07, 08, 10), `testimonials`, insights (3) | 1–3 |
| `/hubx` | keep, rebuild per §5.2 and §6 | `hubx-modules`, `hubx-features`, `screens`, `hubai-demo`, `faq.hubx` | 2 |
| `/hubx/features/[module]` | add (customers, catalog, quotations, billing, dashboards-reports, service-desk, hubai) | `hubx-modules` | 2 |
| `/hubx/security` | add | SSO (Entra ID, Google, Okta — OIDC), roles, audit logs, CSP-program data handling, ISO/IEC 27001:2022 (confirm entity) | 2 |
| `/hubx/whats-new` | add | early-access changelog + feedback link; entries in `content/whats-new.ts` | 2 |
| `/services` | keep; add Licensing card | `branches`, `services/*` | 3 |
| `/services/professional` | keep; delivery model Align → Plan → Deliver → Validate & Transition; added M365/Security lines; licensing-alignment line | `services/professional` | 1 |
| `/services/managed` | keep; 24/7 scoped to monitoring; Service Desk, Azure cost optimization, Premier escalation | `services/managed` | 1 |
| `/services/development` | keep; products block gated by a confirm id | `services/development` | 1 |
| `/licensing` | add (hub) | `licensing` | 3 |
| `/licensing/switch` | add — flagship conversion path with invoice upload, 5 steps, FAQ | `licensing`, `faq.switch`, `forms.switch` | 3 (+5 upload) |
| `/licensing/ea-to-csp` | add | from the EA→CSP guide (asset pending; interim copy from §1.4) | 3 |
| `/licensing/beyond-microsoft` | add | `licensing` | 3 |
| `/licensing/quote` | add; replaces `/microsoft-365-quote` (301) | `forms.quote` with qualification, current provider, renewal date, optional invoice upload | 3 |
| `/partners` | keep; three programs per §5.7 | `partners` | 3 |
| `/partners/apply`, `/partners/agents`, `/partners/platform` | add | `partners`, `forms.partnerApply` | 3 |
| `/about` | keep; "Since 1999", timeline, config-driven credentials, leadership (gated), locations | `timeline`, `credentials`, `leadership`, `stats` | 1 |
| `/contact` | keep; phone, HQ city, hours (confirm), Service Desk link; topics + "Billing question", "Partner-to-partner transfer" | `site`, `forms.contact` | 1/5 |
| `/demo` | keep; Bookings embed + fallback; "I am: a direct-bill CSP evaluating HubX" | `forms.demo` | 5 |
| `/support` | add | `support` | 3 |
| `/insights`, `/insights/[slug]` | add; MDX migration of the old posts | `insights/*.mdx` | 3 |
| `/legal/terms`, `/legal/privacy`, `/legal/cookies` | add; replace `/terms`, `/privacy`, `/cookies` (301) | `legal/*.mdx` | 3 |
| `/thank-you/[form]` | add; replaces `/thank-you?flow=` | per-form next steps + Bookings link | 3/5 |
| `/api/lead` | keep; Pipedrive + email + Turnstile | — | 5 |
| `/api/upload` | add; private invoice upload | — | 5 |
| `sitemap.xml`, `robots.txt`, `opengraph-image` (+ per-route OG) | keep/extend | — | 5 |

Static generation for every marketing route; `cacheComponents` stays on. Route handlers are the only dynamic code.

---

## 4. Redirect map

Permanent (308 via `next.config.ts redirects()`; Vercel also honours these at the edge):

| From (old msphub.com) | To |
| --- | --- |
| `/professional-and-managed-services/` | `/services` |
| `/about-us-managed-service-provider/` | `/about` |
| `/contact-us/`, `/contact-us-2/` | `/contact` |
| `/news/`, `/blog/`, `/news/page/:n` | `/insights` |
| `/:post-slug` (each migrated post, kept slug) | `/insights/:post-slug` |
| `/terms-and-conditions/` | `/legal/terms` |
| `/privacy-policy/` | `/legal/privacy` |
| `/cookie-policy/` | `/legal/cookies` |
| `/partner/` | `/partners` |
| `/marketplace/`, `/help-center/`, `/ready-is-now-msp-hub/` | `/hubx` |
| `/brand-resource-center/` | `/about` |
| `/ai-copilot/` | `/services/development` |
| `/data-and-analytics/` | `/services/professional` |
| `/managed-services/:path*` | `/services/managed` |
| `/solutions/:path*` | `/services` |

Internal moves (this site → this site): `/microsoft-365-quote` → `/licensing/quote`; `/terms`, `/privacy`, `/cookies` → `/legal/*`; `/thank-you?flow=x` → `/thank-you/x`. **Remove** the current `/support → /contact` redirect when `/support` ships (Phase 3), or the new page is unreachable.

Gone (410, already in place via `app/gone/route.ts` + rewrites): the old theme-demo URLs `/team/*`, `/case-studies/*`, `/projects/*`, `/careers/*`, `/services/quality-control-and-assurance`, `/always-ready-professional-managed-services`, `/opportunity-submission-form`. Not in the handoff map; kept unless Luke wants them redirected instead (decision, §9 item 10).

DNS-level: `portal.msphub.com/*` → `https://hubx.msphub.com` (decision pending; handled at the portal host, not in this repo).

---

## 5. Environment variables and credentials

| Variable | Scope | Purpose | Supplied by | Phase |
| --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_SHOW_TODOS` | Preview only (`true`) | Shows `NeedsConfirm` chips; unset/false in production | us | 1 |
| `NEXT_PUBLIC_SITE_URL` | Production (`https://msphub.com`) | Canonical origin for metadata, sitemap, schema | us | existing |
| *(retired)* `NEXT_PUBLIC_ALLOW_INDEXING` | — | Replaced in Phase 5 by the rule in §9 item 5: indexing is allowed only when `VERCEL_ENV === "production"` **and** `NEXT_PUBLIC_SITE_URL` is msphub.com | — | 5 |
| `PIPEDRIVE_API_TOKEN` | Preview (sandbox) + Production | Create Lead + Person + Organization per form | Luke (Pipedrive → Personal preferences → API; sandbox company for preview) | 5 |
| `PIPEDRIVE_COMPANY_DOMAIN` | both | API base `https://<domain>.pipedrive.com/api/v1` | Luke | 5 |
| `PIPEDRIVE_LEAD_LABEL_DEMO`, `…_QUOTE`, `…_SERVICE`, `…_CONTACT`, `…_PARTNER`, `…_SWITCH` | both | Lead label ids (UUIDs) so each form lands labelled | Luke (create the six labels in Pipedrive, send ids) | 5 |
| `PIPEDRIVE_OWNER_ID` | both, optional | Default lead owner (user id) | Luke | 5 |
| `RESEND_API_KEY` | both | Email copy of every lead to sales | Luke (resend.com) | 5 (plumbing exists) |
| `LEAD_FROM_EMAIL` | both | Verified sender, e.g. `MSP Hub Website <web@send.msphub.com>` — needs the domain verified in Resend (DNS records) | Luke / DNS admin | 5 |
| `LEAD_TO_EMAIL` | optional | Recipient override (default `sales@msphub.com`) | us | existing |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | both | Cloudflare Turnstile on every form (site key is public; secret verifies server-side) | Luke (Cloudflare dashboard → Turnstile → add widget for `msphub.com` + `*.vercel.app`) | 5 |
| `NEXT_PUBLIC_BOOKINGS_URL` | both | Microsoft Bookings page URL for the `/demo` iframe ("HubX demo — 30 min") | Luke (Bookings → publish → embed URL) | 5 |
| `NEXT_PUBLIC_GA4_ID` | Production (+ preview if wanted) | GA4 measurement id (`G-…`) | Luke (GA4 property → data stream) | 5 |
| `NEXT_PUBLIC_CLARITY_ID` | Production | Microsoft Clarity project id | Luke (clarity.microsoft.com) | 5 |
| `BLOB_READ_WRITE_TOKEN` **or** `AZURE_STORAGE_CONNECTION_STRING` + `AZURE_STORAGE_CONTAINER` | both | Private storage for uploaded invoices; signed, expiring links in the deal-desk notification | Luke / Vercel (Blob store) or Azure admin — decision in §9 item 4 | 5 |
| `UPLOAD_LINK_TTL_HOURS` | both, optional | Lifetime of the signed download link (default 72) | us | 5 |
| `VERCEL_ENV`, `VERCEL_PROJECT_PRODUCTION_URL` | automatic | Environment detection, `[PREVIEW]` subject prefix | Vercel | — |

Also needed from Luke, not env vars: the forbidden-terms list for the local pre-commit grep (kept on his machine), Microsoft partner badge files from Logo Builder, the EA→CSP guide and the Modern Work delivery white paper, the WordPress export (`.xml`) for `/insights`, vendor/alliance logo permissions, 2–4 testimonials, leadership photos and bios.

---

## 6. Plumbing design (Phase 5, summarized here so the content and routes line up)

- **Forms:** `Form` posts JSON to `/api/lead`. Server order: honeypot → Turnstile `siteverify` (fail closed when the secret is set; pass-through when unset so previews work) → zod validation from `forms.ts` → Pipedrive (`POST /organizations`, `POST /persons`, `POST /leads` with `label_ids`, `owner_id`, note with the field table; de-duplicated by email search) → Resend email to sales (subject `[PREVIEW]`-prefixed off production) → `303` redirect target `/thank-you/[form]`. Pipedrive or email failure degrades independently; both failing returns the visible `mailto:` fallback that exists today. Per-IP rate limit stays in memory (sufficient for a marketing site; Vercel KV not required).
- **Invoice upload:** `FileField` → `POST /api/upload` (type/size validated, virus-scan not available — documented) → private blob → the lead note carries a signed link with `UPLOAD_LINK_TTL_HOURS` expiry; nothing public. Privacy note on the form.
- **Bookings:** `BookingsEmbed` iframe (`sandbox` attributes, `loading="lazy"`) above the fallback `Form`.
- **Analytics:** GA4 (`gtag`) and Clarity loaded after first interaction or `requestIdleCallback`, never before; events `demo_request`, `quote_request`, `invoice_upload`, `partner_apply`, `hubx_login_click`, `screenshot_view`. Consent: see §9 item 6.
- **SEO:** per-route `metadata` + `opengraph-image.tsx` per route group (generated from the MSP Hub kit, text-only HubX lockup); JSON-LD `Organization` (layout), `Service` (each service and licensing page), `SoftwareApplication` (/hubx), `FAQPage` (every `FAQ` with `schema`), `BreadcrumbList` (nested routes); `sitemap.ts` from the route table; `robots.ts` keyed as in §9 item 5.

---

## 7. Design-system plan (Phase 4)

Tokens added to `globals.css`: `--color-navy: #1A2949`, `--color-canvas: #EEEEEE` (exists as `brand-canvas`), `--color-charcoal` (exists), `--font-mono` (JetBrains Mono, self-hosted, OFL) for SKUs/ids; keep one orange `#F97316` (recommend retiring the print orange `#E88B2C` on the web — decision). Light sections (`bg-canvas text-charcoal`) alternate with dark bands (hero, "Why MSP Hub", final CTA); light-theme screenshots sit on light sections, the single dark capture only on dark bands. Section rhythm: mono eyebrow → serif H2 → one-paragraph lede → content; 12 px card radius, 999 px pills; 8-pt spacing; max width 1200. Motion: entrance fades ≤ 300 ms, stagger ≤ 60 ms, no parallax, no loader; `prefers-reduced-motion` disables all. Contrast: no small orange text on white; words on orange only in bold ≥ 16 px buttons with ink text.

---

## 8. Phase plan (one PR each; stop for review after every phase)

| Phase | Scope | Done when |
| --- | --- | --- |
| 1 Corrections | Risk register §3 items 1–15; placeholders §2 answered exactly; carried-over testimonials removed and `Testimonial` hidden; About timeline + "since 1999"; `credentials.ts` config-driven; `NeedsConfirm` replaces `Needs`; badge lockup → text; `NEXT_PUBLIC_SHOW_TODOS` wired | No unresolved §2 answer still shows as a placeholder; no forbidden claim on any page; build/lint/tsc green; 1440/390 renders |
| 2 HubX | `/hubx` rebuilt from §5.2 + §6: modules, 12 cool things, `BrowserFrame` carousel of real screenshots, read-only HubAI demo, corrected FAQ; `/hubx/features/*`, `/hubx/security`, `/hubx/whats-new`; home product section | Every claim traceable to §6; no sidebar mock remains; light/dark never mixed |
| 3 Sitemap | `/licensing/*` (hub, switch with upload UI, ea-to-csp, beyond-microsoft, quote + redirect), partners split + apply form, `/support`, `/insights` MDX migration, `/legal/*`, `/thank-you/*`, footer per §4, redirect map updated | All §4 routes exist; old URLs redirect; sitemap lists everything |
| 4 Design system | Tokens, light/dark rhythm, type incl. mono, motion rules, WCAG 2.2 AA pass | axe clean; contrast verified; reduced-motion verified |
| 5 Plumbing | Pipedrive + Resend + Turnstile, upload storage, Bookings embed, GA4 + Clarity, metadata/OG/schema, sitemap/robots, 301s | Sandbox leads created from every form; events fire; schema validates |
| 6 QA | §9 acceptance checklist; Lighthouse ≥ 90 mobile on `/`, `/hubx`, `/licensing/switch`; forbidden-terms grep; `NeedsConfirm` fallback audit; open §10 items that block launch | Report of results and remaining blockers |

---

## 9. Items that cannot be implemented exactly as specified (and the proposed resolution)

1. **`docs/HANDOFF.md` in the repo** conflicts with hard rule 2 (customer/partner names). Resolution: keep it outside the repo (§0); this note carries the publishable facts; the `.mdc` sentence "Read `docs/HANDOFF.md`" should be amended by Luke to point at the private copy (one-line change to his file — not done unilaterally).
2. **Pre-commit grep against a list outside the repo.** A git hook only runs on machines that have the hook installed and the list present; Vercel builds and other contributors are not covered. Resolution: ship `scripts/check-forbidden-terms.mjs` that reads `~/.msphub/forbidden-terms.txt` when present (exits 0 with a notice when absent), wire it to a documented local `pre-commit` hook, and run the same script in CI against a terms file injected as a secret (`FORBIDDEN_TERMS` env, newline-separated) so the check also runs on pull requests without committing the list.
3. **"ESLint rule / build check that fails production if any `NeedsConfirm` has no fallback."** A custom ESLint rule is possible but weaker than types. Resolution: `fallback` is a required prop (TypeScript), so `next build` fails on any omission; an additional grep in the QA script double-checks MDX.
4. **Private invoice storage.** The team is on Vercel Hobby; Vercel Blob is available there but private (non-public) blobs with signed URLs need confirmation of plan support at build time. Resolution: implement a `storage` adapter with two providers — Vercel Blob (`access: "private"` + signed download) and Azure Blob Storage (container-private + SAS link) — chosen by which env var is present. Decision needed on which account to use.
5. **`robots.ts` keyed on `VERCEL_ENV === 'production'`.** The Vercel production deployment is the team-review URL (`msphub-website.vercel.app`) until cutover; keying on `VERCEL_ENV` alone would open that hostname to indexing today. Resolution (implemented in Phase 5, `src/lib/site.ts`): allow indexing only when `VERCEL_ENV === "production"` **and** `NEXT_PUBLIC_SITE_URL` resolves to msphub.com (set at cutover); `robots.txt`, the `robots` meta, and the `X-Robots-Tag` header follow that one switch. `NEXT_PUBLIC_ALLOW_INDEXING` is retired.
6. **GA4 + Clarity without a cookie banner.** Both set non-essential cookies, and MSP Hub has a UK entity and UK traffic (UK GDPR/PECR require consent for analytics cookies). Resolution: ship a minimal consent notice for non-US visitors (geo from Vercel's `x-vercel-ip-country` header) with GA4 Consent Mode defaulting to denied and Clarity started only after consent; US visitors get analytics without a banner. Decision needed (alternatively: no analytics until a consent approach is chosen).
7. **`/insights` migration "verbatim" needs the WordPress export.** Until the `.xml` arrives, the pages cannot be reproduced faithfully; scraping the live site is possible but needs Luke's go-ahead. Resolution: Phase 3 builds the MDX pipeline with the three named posts migrated from the live pages if approved; the rest follow when the export lands.
8. **`/licensing/ea-to-csp` from the existing guide and §5.4 from the delivery white paper.** Neither document is in the handoff. Resolution: write interim copy from §1.4/§5.4 lines with Microsoft Learn citations, marked with a confirm id; replace when the documents arrive.
9. **Lighthouse ≥ 90 mobile with GA4 + Clarity loaded.** Third-party scripts cost performance points. Resolution: load both only after interaction/idle (never on first paint), which keeps Lighthouse's lab run script-free; verify in Phase 6.
10. **Legacy theme-demo URLs.** The handoff's redirect map does not mention them; the current build answers 410 Gone (correct for fake content that was indexed). Keep unless Luke prefers 301s to `/`.
11. **Testimonials.** "Hide until replacements exist" means the home, /hubx, /about, and /demo lose a proof block; the layout will close the gap without a placeholder (no fake quotes), per the hard rules.
12. **Pipedrive "sandbox" acceptance.** Pipedrive sandbox accounts are a paid-plan feature; if none exists, acceptance runs against a dedicated "Website test" label in the live company and leads are deleted after the test — decision.
13. **Microsoft Bookings in an iframe.** Bookings pages allow embedding, but tenant admins can disable it; if the embed is blocked, the component falls back to a "Book on Microsoft Bookings" button plus the form.
14. **Government (GCC)** page: not built until authorization is confirmed (handoff §3 item 13); nonprofit and education qualification types are mentioned.

### Planned deletions that need an explicit go-ahead before Phase 1 (per the work order)

- Remove the two carried-over testimonials (from a former customer named only in the private handoff; the name also still sits in `src/content/proof.ts` today and goes with them) and hide the `Testimonial` component (handoff §2 item 8 orders this; listed here because it is a content deletion).
- Replace the 12 carried-over vendor logo images with text chips and delete `public/proof/vendors/*.webp` (handoff §2 item 9).
- Retire the `PortalFrame` sidebar mock (work order item 3) in favour of real screenshots.
- Remove the composed "Powered by MSP Hub" badge beside the HubX logo (`HubXWithBadge`), keeping the text lockup (hard rule 3).
- Later phases: `/microsoft-365-quote` → `/licensing/quote` and `/privacy|/terms|/cookies` → `/legal/*` (route moves with 301s, Phase 3); `/thank-you?flow=` → `/thank-you/[form]`.

---

## 10. Open decisions and confirmations carried from the handoff (§10) — unchanged list, tracked in `confirmations.ts`

Decisions: one number per stat (licenses 500K+ vs 600K+, companies, headcount) · `portal.msphub.com` 301 · quote response promise ("within one business day") · onboarding time-to-live wording ("Live in one billing cycle") · partner program tiers vs one program; agent program public · HubX pricing FAQ wording · show SIX.One / Wave / AppLauncher · office presentation · website orange standardization · which vendor logos · Government page.

Confirm: Solutions Partner badges held + ISO/IEC 27001:2022 certificate holder · phone routes to sales + support hours · delivery regions (Australia/NZ) · visual white-label of HubX · integrations beyond Partner Center/SSO · seat-assignment visibility · data hosting region · Six.One → MSP Hub date · legacy login continuity · leadership titles and order · ChannelPro award title/category · market-position number source.

Assets: 2–4 testimonials · vendor + alliance logo files and permissions · Microsoft badge files · leadership photos/bios · Bookings link · EA→CSP guide + delivery white paper · WordPress export · more HubX captures on request.

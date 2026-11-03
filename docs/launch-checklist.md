# Launch checklist — msphub.com on Vercel

Status after Phase 6 (Nov 2, 2026): the full site is on `main` and live at https://msphub-website.vercel.app (noindex until cutover). Build, lint, and typecheck are green; all 38 sitemap routes return 200 with title, description, canonical, Open Graph image, and JSON-LD; every legacy URL redirects (308) or answers 410; axe-core reports zero violations on every route at 1440 and 390; Lighthouse mobile on production: `/` 95 · `/hubx` 100 · `/licensing/switch` 99 performance, 100 accessibility, 100 best practices (SEO 69 only because of the intentional pre-launch noindex; 100 on a launch-state build). Production shows zero review chips; every `NeedsConfirm` has a production-safe fallback (enforced by TypeScript).

Update (Nov 3, 2026, PR #13): partners, licensing, HubX capability grids, and About now share the Ink & Glass interior system (`src/components/ink/interior.tsx`: chapters, rule lists, fact rows, stat rail, text-chip rows, rule accordion, next-step band). Real HubX screens on those pages are the declared crops from `content/evidence.ts`; the browser-frame carousel captures are no longer used there. Lighthouse mobile, local production build (`next build` + `next start`, Lighthouse 13.6): `/`, `/hubx`, `/licensing`, `/licensing/switch`, `/partners`, `/about`, `/hubx/features/customers` all 100 performance, 100 accessibility, 100 best practices, SEO 69 (pre-launch noindex; 100 on a launch-state build); LCP 0.9 s, CLS 0 on every route. Re-measure on the Vercel deployment after merge; local numbers run faster than production.

## A. Luke must supply

### Environment variables (set in Vercel → Project → Settings → Environment Variables; none are set today, every integration runs in its honest fallback)

| Variable | Scope | What it unlocks |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL=https://msphub.com` | Production, at cutover | Canonical URLs **and the indexing switch** (indexing is on only when the Vercel environment is `production` and this is msphub.com) |
| `PIPEDRIVE_API_TOKEN`, `PIPEDRIVE_COMPANY_DOMAIN`, `PIPEDRIVE_LEAD_LABEL_DEMO/QUOTE/SERVICE/CONTACT/PARTNER/SWITCH`, optional `PIPEDRIVE_OWNER_ID` | Preview (sandbox) + Production | Every form creates a Pipedrive lead + person + organization with the right label. Decision: sandbox company, or a "Website test" label on the live company for acceptance |
| `RESEND_API_KEY`, `LEAD_FROM_EMAIL` (verified sending domain), optional `LEAD_TO_EMAIL` | both | Email copy of every lead to sales@msphub.com |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | both | Cloudflare Turnstile on every form (passes through until set) |
| `NEXT_PUBLIC_BOOKINGS_URL` | both | Microsoft Bookings "HubX demo — 30 min" embed on `/demo` (form fallback until then) |
| `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_CLARITY_ID` | Production | Analytics with the approved consent approach (UK banner, Consent Mode default denied; US none) |
| `BLOB_READ_WRITE_TOKEN` **or** `AZURE_STORAGE_CONNECTION_STRING` (+ `AZURE_STORAGE_CONTAINER`), optional `UPLOAD_LINK_TTL_HOURS` | both | Private invoice uploads on `/licensing/switch` and `/licensing/quote` (ships as "secure upload not available yet"). Decision: which storage account |
| `NEXT_PUBLIC_SHOW_TODOS=true` | Preview only (already set) | Review chips; never on Production |

### Assets

- Hi-res leadership portraits (current ones are cropped from the slide at ~240 px) and any additions to the five leaders.
- 2–4 testimonials from current partners/customers with permission (the block is hidden until then).
- Vendor and alliance logo files with written permission (text chips until then; prune the vendor list).
- Microsoft Solutions Partner designation badge files from Partner Center → Logo Builder, only for designations attained (areas show as "Enrolled" chips today).
- More HubX captures: billing statement, Service Desk, Administration (capture 03 stands in), plus any dark-mode pages the design needs.
- Verbatim Privacy, Terms, and Cookie policy text (interim summaries ship with a link to the current policies; Termly account owner to approve).
- WordPress export (`.xml`) of the old News & Insights for the remaining posts (three migrated so far).
- The EA → CSP customer guide and the Modern Work delivery white paper (interim copy is in place).
- The forbidden-terms list (kept outside the repo) so the pre-commit and CI greps can run against the real list.

### Decisions and confirmations (each renders a production-safe fallback today)

- One number per stat: licenses managed 500K+ vs 600K+; companies 478+; services headcount (hidden until confirmed).
- Which entity holds the ISO/IEC 27001:2022 certificate; exact ChannelPro award title/category; source for the market-position figure (not published).
- Phone +1-847-859-0500 routes to sales; support hours to publish (fallback: business hours, US Central/Eastern).
- Delivery regions (add Australia/NZ?); office presentation (HQ city only vs full address — full address is in the footer today).
- Visual white-label of HubX; integrations beyond Partner Center/SSO; seat-assignment visibility; data-hosting region; legacy login continuity; Six.One → MSP Hub date (Nov 2024?).
- `portal.msphub.com` 301 to hubx.msphub.com (DNS-level, outside this repo).
- Partner program: one program vs tiers; agent program public.
- Show SIX.One / Wave / AppLauncher (hidden until approved).
- Quote response promise ("within one business day"), onboarding wording ("Live in one billing cycle"), HubX pricing FAQ wording.
- Website orange standardization on `#F97316` (implemented; confirm).
- Government (GCC): hold until authorization is confirmed.

## B. Code work remaining

- Cutover runbook: add `msphub.com` + `www.msphub.com` to the Vercel project, point DNS at Vercel (keep `hubx.msphub.com` and `portal.msphub.com` untouched), set the Production variables above, redeploy, submit `sitemap.xml` in Search Console, keep WP Engine read-only for rollback.
- Hook up the forbidden-terms grep (script + local pre-commit + CI secret) once the list exists.
- Drop in supplied content as it arrives: testimonials component (already wired), vendor/alliance `logo` fields, leadership portraits, legal MDX (`migrated: true`), remaining Insights posts, EA → CSP guide text, additional HubX captures in `content/screens.ts`.
- Invoice upload: the 4.5 MB Vercel request-body cap applies before the documented 10 MB limit; raise via a direct-to-storage upload if larger files are needed.
- Optional hardening: Vercel KV for the rate limiter if traffic warrants; virus scanning for uploads; Deployment Protection off for Preview if non-Vercel reviewers need links.
- Home hero LCP (2.9 s on mobile) can improve with a pre-sized hero crop of the dark dashboard capture.

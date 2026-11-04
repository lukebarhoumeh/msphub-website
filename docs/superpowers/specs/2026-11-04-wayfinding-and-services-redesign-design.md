<!--
Status: APPROVED FOR BUILD 2026-11-04 (Luke, verbal, team review 2026-11-04). Produced by a judged design panel
(three independent proposals, three judges) seeded by five audience walkthrough audits of the live site; the build
in PR #20 follows this document. Deviations from the spec during the build are recorded at the end under "Build notes".
-->

# Wayfinding and services redesign — design spec

Date 2026-11-04 · Repo `C:\Users\lukeb\msphub-website` (main @ 50820fa) · Base: Proposal C ("Doors, not tours"), grafted with A's docked real-screen hero object, per-section header CTA, chapter anchors and footer hours; B's hero-fact chips, "Moving a whole book?" chapter and station keyboard model; and every must-have the three judges listed. Nothing here is a rebrand: palette, fonts, logos, routes, metadata, JSON-LD structure, forms, redirects and the Ink & Glass system stay.

## 1. Goal and non-goals

| Luke's ask | Deliverable |
|---|---|
| Services heroes: image too big, no meaning, content below the fold | Delete the standalone `<Section><IllustrativeAsset/></Section>` on `/services/professional` and `/services/development`; rebuild both as `PageHero tone="dark"` with the render as `art` (masked `DeferredArt` background, ≥1024 px, after load, opacity .6) and a meaning-bearing `aside`; first H2 top ≤ 820 px at 1440×900 and ≤ 940 px at 375×812 |
| Meaningful imagery on those pages | Professional: the approved `captures.customerProductsHome` crop in a browser `DeviceFrame` with the Align→Plan→Deliver→Validate rail docked under it. Development: the real `HubAiConversation` (turn 1, dark). Managed: `captures.homeWidgets` as "Service Desk in HubX" |
| Easier to navigate for MSPs, VARs, businesses, direct-bill CSPs, advisors | Described disclosure header with a five-door "Who we serve" panel (VARs named), Licensing panel, one-hop section CTA, five-door router under the home proof strip, "Who we serve" footer column, services sub-nav, "On this page" anchors, audience-to-action routing on `/contact`, program pages that show HubX and link the services |
| More dynamic and interactive | Scroll-pinned delivery rail and sprint loop, hero rail draw, station hover/focus, spotlight/tilt/parallax on frames, door lifts, Quick Find palette; no new always-on loops |
| Full updated version, deployed | All four services pages ported onto the interior system; one PR, merged to main after gates, Vercel production redeploy, Luke pinged |

Non-goals: no new typeface, colour, dependency, route, form field or schema change; no pricing/margin/rate; no customer or partner names; `/partners` stays in the sitemap; `#who-we-serve` keeps resolving; `#talk-to-msphub` (RouteD) stays the page end and the only Statement per page.

## 2. Wayfinding architecture

### 2.1 Header (lg+)
Logo · **What we do** · **Licensing** · **Who we serve** · **Company** · Search (Quick Find) · Log in to HubX (from `lg`, not `xl`) · section CTA pill. "Partners" leaves the top level (`/partners` stays reachable from the Who we serve panel footer, Company footer link and the site footer).

Parents are `<button type="button" aria-expanded aria-controls="menu-<slug>">`, never links. Open: click, Enter/Space, ArrowDown (focuses first row), pointer hover intent 120 ms; touch pointers ignore hover. Close: Escape (focus returns to the button), outside pointerdown, focus leaving the group (`focusout` with `relatedTarget` outside), route change (existing `menuPathname` pattern), 200 ms pointer-leave delay. One panel open at a time. `isActive`: a parent lights when `pathname` starts with any entry in its `matches` array; child links strip `#` and `?` before comparing; `aria-current="page"` goes on the matching row. Panel: existing `rounded-[18px] border-white/13 bg-[#12192b]` list widened to `w-[400px]`; row = 15 px semibold label with mono meta right-aligned, 13.5 px `#b8c0d4` description beneath, `hover:bg-white/8`; optional footer row `border-t border-white/10`. Fade 150 ms opacity (global reduced-motion rule zeroes it).

| Parent (`matches`) | Rows: label — meta — description → route | Footer row |
|---|---|---|
| What we do (`/hubx`, `/services`) | HubX — Flagship platform — Every license, cost, renewal, and invoice in one portal → `/hubx` · Professional Services — Plan and deliver — Microsoft 365, Azure, security and identity, data platform, under a fixed-fee statement of work → `/services/professional` · Managed Services — Operate — Monitoring and incident management, run to agreed SLAs → `/services/managed` · Development & AI — Build — Applications, DevOps, and AI development → `/services/development` | All services → `/services` |
| Licensing (`/licensing`) | the five `licensingLinks` with their existing descriptions | Reselling Microsoft? Partner pricing lives in the reseller program → `/partners/reseller` |
| Who we serve (`/partners`, `/for`) | MSPs — Resell — Tier-1 direct pricing; every customer tenant in one console → `/partners/reseller` · VARs — Resell — Licensing margin on hardware and projects without a licensing desk → `/partners/reseller#vars` · Businesses — Buy direct — Licensing, migration, and managed services from one team → `/for/businesses` · Direct-bill CSPs — Run HubX — HubX on your own Partner Center tenant → `/partners/platform` · Advisors & agents — Refer — Bring the opportunity; MSP Hub sells and delivers → `/partners/agents` | Partner programs: resell, refer, or run the platform → `/partners` · Apply to partner → `/partners/apply` |
| Company (`/about`, `/insights`, `/support`, `/contact`) | About — Since 1999. Built by an MSP, for the people who run Microsoft. · Insights — Licensing rules, transfers, and company news · Support — Service Desk, the licensing and billing desk, Microsoft escalation · Contact — Sales, billing, transfers, partnership | none |

Section CTA (`headerCta`, first prefix match on `pathname`): `/licensing` → "Get a quote" → `/licensing/quote#quote-form` · `/partners/reseller|agents|platform` → "Apply to partner" → `/partners/apply?program=<reseller|agent|platform>` · `/partners` → "Apply to partner" → `/partners/apply` · `/services` → "Start an inquiry" → `#inquiry` · `/hubx` → "Schedule a demo" → `/demo` · `/for/businesses` → "Get a quote" → `/licensing/quote#quote-form` · default → "Talk to MSP Hub" → `/contact#contact-form`. Never `#talk-to-msphub`.

### 2.2 Mobile (<lg)
Bar at every width: logo · section CTA pill `size="sm"` (always visible; the `hidden sm:block` wrapper goes) · hamburger. Sheet (`#mobile-menu`, same ink surface): "Find a page" row (opens Quick Find) → **Who we serve** (five rows, meta + description) → What we do → Licensing → Company; group headings are mono labels, not links; action row (section CTA, Log in to HubX, Call sales) sticks to the sheet bottom. No accordions.

### 2.3 Quick Find palette
`components/layout/quick-find.tsx`, loaded with `next/dynamic` on first open; `content/find-index.ts` exports `FindEntry = { label: string; href: string; group: "Audiences" | "What we do" | "HubX" | "Licensing" | "Partners" | "Company" | "Actions" | "Insights"; description?: string; keywords?: string[] }` (about 45 routes-only entries, §9). Trigger: ⌘K / Ctrl+K (ignored when focus is in `input`, `textarea`, `select` or `[contenteditable]`; no "/" shortcut), the desktop header button "Search ⌘K" (glass, no orange), the sheet row. Markup: native `<dialog>` opened with `showModal()` (focus trap, Escape, backdrop); `<input role="combobox" aria-expanded="true" aria-controls="qf-list" aria-autocomplete="list" aria-activedescendant>`; `<ul id="qf-list" role="listbox">` with `role="group" aria-label` per group and `<li role="option" id aria-selected>` rows. Keys: ArrowUp/Down wrap, Home/End, Enter → `router.push(href)` and close, Escape closes, Tab leaves the input to the list. Scoring: label prefix 3 · label word-prefix 2 · label substring 1 · keyword or description substring 0.5; ties keep group order. Empty query shows the five audience rows and Actions. Budget ≤ 6 KB gzipped JS plus ≤ 8 KB index, nothing on first paint; opening is a 150 ms opacity fade, none under reduced motion. Scope decision: built last (WP9); if the day runs out it ships in the next PR and nothing else depends on it.

### 2.4 In-page wayfinding
- `SectionSubnav` (`components/layout/section-subnav.tsx`) generalised from `HubxSubnav`: props `{ lockup, items, action?, ariaLabel, mobileLabel, trailing? }`; `HubxSubnav` becomes a wrapper passing `hubxNav`, the lockup and the login link. Active marker becomes a `bg-white/70` dot (orange budget). Mounted for services by `app/services/layout.tsx` returning `<><SectionSubnav …/>{children}</>` so sections stay direct children of `main` and `HeaderThemeObserver` keeps ignoring the `div`. Items: Overview `/services` (exact) · Professional · Managed · Development · Licensing `/licensing`; action "Start a service inquiry" → `#inquiry`. All four services heroes are ink, so the `main > :not(pearl) + pearl` bleed rule never fires under the sub-nav; no CSS change needed.
- `PageHero` gains `facts?: readonly string[]` (mono `ChipRow` under the CTAs, `hero-line --i 4`) and `anchors?: readonly { label; href }[]` (`<nav aria-label="On this page">` chip-link row, `hero-line --i 5`, horizontally scrollable below md). Chapters already carry `scroll-mt-24`; every chapter on the four services pages, `/licensing`, `/licensing/switch` and the three program pages gets an `id`.

### 2.5 Home router band
`components/ink/audience-band.tsx` replaces `AudienceRow` and sits directly under `ProofStrip`, keeping `id="who-we-serve"`. Band anatomy: mono label "Who we serve · start here", then one glass panel (`inkTone.ink.panel`) with five whole-segment links (`lg:grid-cols-5`, `border-r border-white/10` between): display-18 label, mono meta, one-line description, arrow; hover `bg-white/5` and the arrow nudges 2 px. Below lg: five rule-separated rows (~300 px). Source `audienceLinks`. The old section-7 cards are removed (one router per page); `SpineMark`s renumber 01–05 (Why direct, Outcomes, Engines, Switch, Proof). Variant `rows` is reused on `/services` under "Which of these are you?".

### 2.6 Footer
Columns Company · Services · HubX · Licensing · **Who we serve** (five `audienceLinks` + Apply to partner), grid `xl:grid-cols-[1.4fr_repeat(5,1fr)]`; Licensing's "For businesses" row becomes "Licensing overview"; contact block gains an Hours line: `<NeedsConfirm id="supportHours" fallback={site.supportHours}>{site.supportHoursProposed}</NeedsConfirm>`.

### 2.7 Eyebrow rule
Interior eyebrows stay mono text with no orange rule (`Chapter`'s eyebrow); the hero eyebrow reads "Section · Page" (e.g. "Services · Professional services"). No breadcrumb component on services routes (keeps `BreadcrumbList` JSON-LD unchanged).

## 3. /services/professional

Order (anatomy · ground): sub-nav → **Hero** (split 7/5 · ink, `art="lifecycle-glass-corridor"`) → **01 Capabilities** (rule columns · ink, `pad="flush-top"`, `id="capabilities"`) → **02 Practices** (rule columns · pearl, `id="practices"`) → **03 How we deliver** (pinned · pearl, `pad="tight"`, `id="delivery"`) → **HubX band** (`Chapter tone="ink" pad="tight" id="hubx"` wrapping the existing `PairsWithHubX`) → **Inquiry** (`ServiceInquiry branch="professional"`, `id="inquiry"`) → RouteD. Two pearl chapters (one slab, entered and exited through bleeds), `SpineMark` 01–03 on the chapters, RouteD the only Statement. Deleted here: the render section, `CheckList`, `CtaBand`, `SectionHeading`, orange eyebrow rules.

**Hero copy column:** eyebrow "Services · Professional services", H1 `professional.headline`, lead `professional.lead`, primary "Request a scoping call" → `#inquiry`, glass "How we deliver" → `#delivery`, `facts` = `professional.heroFacts`, `anchors` = `professional.anchors`.

**Hero object** (`components/services/professional-hero-object.tsx`): a `Panel tone="ink"` containing (1) `WideOnly` → `DeviceFrame variant="browser" capture={captures.customerProductsHome} path="/customers/products" priority` inside a reserved `aspect-[800/524]` box so nothing shifts when it mounts, wrapped in `Parallax range={24}` + `Spotlight` + `tilt tilt-hero` (no `BorderBeam`); (2) `EngagementRail variant="hero"` docked beneath; (3) a mono caption `truthLabel` as text (no mark). What it depicts: step 01 of MSP Hub's named delivery model happens in this screen, the lead's own sentence "Every project starts with a licensing review in HubX" set as the rail caption. Below `lg` the frame never renders (zero image bytes; LCP is the H1) and the rail is a 56 px scrollable row of four numbered pill links.

**EngagementRail** (`components/services/engagement-rail.tsx`, client): props `{ stages: readonly { title; body }[]; variant: "hero" | "stage"; active?: number; tone?: InkTone; caption?: string }`, data `professional.engagement`. Hero variant from `md`: an `<ol class="grid grid-cols-4">` of station links (`<a href="#delivery-0N">` mono "0N" + title, 14 px) over an `aria-hidden` inline `<svg viewBox="0 0 400 24" preserveAspectRatio="none">` with one `<line pathLength="1" stroke="rgba(255,255,255,.18)">` and four `<circle r="5">`; the lit station's circle fills `#f97316` (the only orange node), others stroke `rgba(255,255,255,.4)`. Lit = hovered/focused station, default 01; arrow keys move focus between stations; hover changes only fill and the mono label colour. Draw once: the wrapper carries `data-reveal`; CSS `.rail-line { stroke-dasharray: 1 }`, `@media (prefers-reduced-motion: no-preference) { .js [data-reveal]:not(.is-in) .rail-line { stroke-dashoffset: 1 } .rail-line { transition: stroke-dashoffset 900ms cubic-bezier(.22,1,.36,1) } }`, so the line is pre-drawn without JS and under reduced motion. Stage variant (vertical, inside the pinned figure): `<svg viewBox="0 0 24 400">` with a `motion.line` whose `pathLength` animates to `(active+1)/4` over 300 ms, nodes above the active one `rgba(255,255,255,.6)`, the active node orange, the rest hollow; `useReducedMotion` → `pathLength` 1, no transition. Budget ≈ 2.5 KB gzipped, no image.

**Chapter 01 Capabilities** (ink): H2 "Four capability areas, one engagement model."; `RuleList tone="ink" columns={4}` from `professional.columns` with `DotList size="sm" marker="neutral"` children (23 orange check badges become neutral dots); beneath, `FactRows tone="ink"` "How we engage" lifted from `professional.commitments`: Commercial model · Accountability · Starting point (§9).

**Chapter 02 Practices** (pearl): H2 "Cloud, Microsoft 365, and database practices." lead unchanged; `RuleList tone="pearl" columns={3}` (Cloud · Microsoft 365 · Database), each item's `children` a compact `<dl>` of its tiles (15 px semibold `dt`, 14 px muted `dd`), `link` "Request a scoping call" → `#inquiry`. All 20 tiles stay.

**Chapter 03 How we deliver** (pearl, `pad="tight"`): H2 "Align → Plan → Deliver → Validate & Transition." lead unchanged; `Pinned` generalised: `steps = professional.engagement` (n, title, body; `href="#inquiry"`), `idPrefix="delivery"` (ids `delivery-01`…), `stepMinH="56vh"`, `figure={(i) => <DeliveryStage active={i} />}`. `DeliveryStage` = a white `Panel tone="pearl"` holding `EngagementRail variant="stage" active={i}` at left and, at right, four stacked cards in one grid cell (`[grid-area:1/1]`) crossfading 300 ms opacity with inactive cards `aria-hidden` and `pointer-events-none`: mono "Stage 0N of 04", stage title, body, `DotList marker="neutral"` of `professional.deliverables[i]`. Below lg and under reduced motion `Pinned` renders every step with `figure(i)` inline, static.

First viewport, 1440×900: header 72 + sub-nav 48 + hero (80 + object ≈ 480 + 64) ≈ 744; chapter 01 is ink and flush-top, so its H2 top ≈ 780 px. 375×812: header 64 + sub-nav row 44 + copy ≈ 590 + rail strip 56 + paddings ≈ 150 → H2 ≈ 920 px (1.13 viewports). Orange in the hero viewport: header pill, primary button, one rail node.

## 4. /services/development

Order: sub-nav → **Hero** (split 7/5 · ink, `art="ai-inference-lattice"`) → **01 Three tracks** (rule columns · ink, flush-top, `id="tracks"`) → **02 How a project runs** (pinned · pearl, `id="method"`) → **03 HubAI, already in HubX** (split · pearl, tight, `id="hubai"`) → products chapter only when `showTodos` (`showTodos ? <Chapter tone="ink"><NeedsConfirmBlock id="devProducts" fallback={null}>…</NeedsConfirmBlock></Chapter> : null`; production renders no empty section) → HubX band (ink, `id="hubx"`) → **Inquiry** (`branch="development"`) → RouteD. Two pearl chapters.

**Hero copy:** eyebrow "Services · Development & AI", H1 `development.headline`, lead, primary "Start a project" → `#inquiry`, glass "How a project runs" → `#method`, `facts` = `development.heroFacts`, `anchors` = `development.anchors`.

**Hero object:** from `lg`, `HubAiConversation tone="dark" turns={1} compact` (new props: `turns` slices `hubAiDemo` to the first N user/AI pairs; `compact` tightens padding to `p-4` and keeps prompts, scope line, feedback controls and footer) wrapped in `Spotlight` + `tilt tilt-hero` + `Parallax range={24}`, with the panel on `hero-line --i 2` so it rises with the headline; `InkLink` "See the full HubAI demo" → `/hubx/features/hubai` beneath. Zero image bytes; nothing types or autoplays; reduced motion static. Below `lg` the aside is a 60 px "Ask HubAI →" strip: the three `hubAiSuggestedPrompts` as chip links to `#hubai`. The hero teaser (turn 1) and chapter 03 (both turns) are different content, so no element is duplicated verbatim.

**Chapter 01** (ink): H2 "Applications, DevOps, and AI."; `RuleList tone="ink" columns={3}` from `development.tracks` with neutral `DotList` children.

**Chapter 02** (pearl): H2 "Discover, build, ship, improve."; `Pinned steps={development.method} idPrefix="method" stepMinH="56vh" figure={(i) => <SprintLoop active={i} />}`. **SprintLoop** (`components/services/sprint-loop.tsx`, client, SVG + CSS, data `development.loop`): three glass lane bars DEV → UAT → PROD with promotion arrows, a dashed return arrow labelled "rollback", a node "Demo closes the sprint" on the Ship lane, and an arc "next milestone" back to Discover; every element traces to a sentence in `development.method`. Discover lights the milestone node, Build lights DEV and the "three-week sprints" label, Ship lights promotion, rollback and the demo node, Improve lights the arc and "Copilot adoption, agents, automation"; lit = opacity 1, others .35, 300 ms opacity; reduced motion and below lg: everything lit. One orange element: the active lane cap.

**Chapter 03** (pearl, tight): eyebrow "HubAI", H2 "HubAI: the AI already in HubX.", lead `hubxPage.hubai.lead`; left `HubAiConversation tone="light"` (full transcript), right `EvidenceFigure capture={captures.hubaiHome} tone="pearl"` + `InkLink` "More about HubAI" → `/hubx/features/hubai`. No claim beyond what `site.description` already says (the same team built HubX).

First viewport: 1440 object ≈ 440 px → H2 ≈ 780 px; 375 strip 60 px → H2 ≈ 920 px. Orange: pill, primary, the user bubble tint.

## 5. /services index and /services/managed

**Index:** hero becomes ink with `art="four-engine-refraction"` (sidesteps any pearl-first-child bleed), copy unchanged, CTAs "Start a service inquiry" → `#inquiry` and "Licensing", `anchors` Services · Who we serve · Support · Start. Then **01 Engines** (pearl, flush-top, `id="engines"`): `EngineTile` bento from `homeEngines` (HubX `wide`, three services) plus a Licensing rule row (title, the existing description, `InkLink` "Explore licensing"); **02 Who we serve** (ink, `id="audiences"`): H2 "Which of these are you?" + `AudienceBand variant="rows"`; **03 Support** (pearl, `id="support"`): H2 unchanged + `SupportModel tone="light" variant="rule"`; **Inquiry** (ink): `ServiceInquiry` whose form reads `?branch=` through a Suspense-wrapped `ServicesInquiryForm({ searchParams })` (the `/contact` `?topic=` pattern) into `defaultValues.branches`. The lockup band and the 800 px form grid go.

**Managed:** hero gains `aside` = `WideOnly` → `DeviceFrame variant="browser" capture={captures.homeWidgets} path="/" priority className="max-w-[420px]"` with mono caption "Service Desk in HubX · Actual HubX UI · demo data", `facts` = `managed.heroFacts`, `anchors`; primary "Start a service inquiry" → `#inquiry`. **01 What we run** (ink, flush-top, `id="what-we-run"`): `RuleList tone="ink" columns={3}` from `managed.offerings` with a 16 px neutral-stroke lucide icon inside the mono label (zero orange tiles). **02 How it runs** (pearl, `id="how-it-runs"`): `RuleList numbered columns={4}` from `managed.howItWorks`; beside it `FactRows` Monitoring · Reporting · Escalation (§9) and, only when `showTodos`, a "Commercial model" row via `NeedsConfirm id="managedPricingModel" fallback={null}` (new `confirmations.ts` entry, kind `decision`); nothing is invented. **03 Support** (pearl, tight, `id="support"`): `SupportModel tone="light" variant="rule"`. HubX band (ink) → Inquiry (`branch="managed"`) → RouteD. The SLA glass Statement and `CtaBand` are retired.

## 6. Homepage and other pages

- Home: `homeHero.eyebrow` → "Microsoft CSP direct-bill partner · Tier-1 Direct · Services · Development"; `homeHero.primary.href` → `/contact#contact-form`; `AudienceBand` under `ProofStrip`; `AudienceRow` removed; `directBillBar.eyebrow` → "Why direct · what Microsoft requires of MSP Hub, every year". Nothing else moves.
- `/contact`: the audience list maps `audienceLinks` to their `action` (§9) instead of back to program pages.
- Program pages (`program-page.tsx`): chapter ids `for-whom`, `includes`, `in-hubx`, `steps`, `faq`; `forWhom` items get ids (`msps`, `vars`, `leaving-a-distributor`; agent `advisors`, `consultants`, `referrals`; platform `direct-bill-csps`, `billing-books`, `spreadsheets`) and `RuleItem.link`; per-program `voice` (§9) drives chapter titles, secondary CTA and the `NextStep` lead; reseller and platform heroes get `aside` = `WideOnly` → `DeviceFrame capture={captures.customersList} path="/customers" priority` with the mono truth label; a new **In HubX** chapter (pearl, before Steps) on reseller and platform: `EvidenceFigure` × 2 (`customersList`, `customerProductsHubx`) + `InkLink` "Explore Customers in HubX" → `/hubx/features/customers`; the agent page gets a "What you can bring" `RuleList` (§9) in place of In HubX; reseller `includes[5]` gains `link: { label: "See the services bench", href: "/services" }`; `anchors` on all three heroes. `/partners`: `partnerEconomics` renders inside the reseller item's `children` only.
- `/licensing`: `licensingMotions[5]` "Resell through MSP Hub"; `anchors`. `/licensing/switch`: `movingFrom[3]` (EA via an LSP, linking the EA page) and the chapter retitled "Where people buy Microsoft today, and how each one moves."; new ink chapter **Moving a whole book?** (`id="moving-a-book"`) after the comparison chapter: copy §9, `CaseCard item={cases[1]} tone="ink"`, primary "Apply as a reseller partner" → `/partners/apply?program=reseller`, secondary "Reseller program"; `anchors`. `licensingFaq[1]` qualified for EA estates (also feeds `/for/businesses` and the FAQPage answer text). `/licensing/ea-to-csp`: a `Panel` with `LeadForm kind="switch" defaultValues={{ currentProvider: "ea-lsp" }}` + `InvoiceUpload kind="switch"` replaces the bounce to `/licensing/switch#send-invoice` (no schema change).
- `/hubx/features/[module]`: delete both "Illustrative — not product UI" captions (lines 90 and 109); alt text keeps the disclosure. `evidence.ts`: add `export const offHubxApproved: CaptureId[] = ["customerProductsHome", "catalogHome", "hubaiHome", "customerProductsHubx", "homeWidgets", "customersList"]` and update the header comment (decision §12 #1).
- Retire `components/marketing/audience-tabs.tsx` and `homeAudiences`.

## 7. Interactivity & motion inventory

| Where | Trigger | Effect | Fallback | Perf |
|---|---|---|---|---|
| Header panels | click, Enter/Space, ArrowDown, 120 ms hover intent | panel opacity 150 ms | touch: click only; RM: instant | CSS only |
| Section CTA pill | pathname | label/destination swap | none | no listener |
| Quick Find | ⌘K/Ctrl+K, button | dialog fade 150 ms | RM: instant | lazy chunk |
| Anchor chips | click | smooth scroll | RM: `scroll-behavior:auto` (exists) | none |
| Home band segments | hover, in-view once | bg tint, arrow nudge, `data-reveal` | static | CSS |
| Hero frames (pro, managed, reseller, platform) | scroll, pointer | `Parallax 24`, `Spotlight`, `tilt-hero` | RM/touch: static | transform only, no beam |
| EngagementRail hero | in-view once; hover/focus/arrow keys | line draws 900 ms; node lights | pre-drawn, default node 01 | one SVG line |
| Pinned (pro 03, dev 02) | `useScroll` step index | sticky figure, 300 ms crossfades | <lg and RM: stacked static | existing hook |
| Rail stage `pathLength` | step change | 300 ms draw | RM: full | one `motion.line` |
| SprintLoop | step change | opacity 300 ms | RM/<lg: all lit | opacity only |
| HubAI teaser | load, pointer | `hero-line` rise, spotlight | RM: static | no image |
| RuleList / FactRows / doors | in-view once | existing reveals, `rule-item` hover | RM: none | existing |

No new infinite loops; the three ambient loops stay idle-paused; no `BorderBeam` added anywhere.

## 8. Components and files

| Path | New/changed | Purpose | Props / source |
|---|---|---|---|
| `src/content/nav.ts` | changed | `PrimaryNavItem = { label; matches: string[]; children: NavLink[]; footer?: NavLink[] }`, descriptions, five `audienceLinks` (+ `action`), `headerCta`, `servicesNav`, footer column | §2, §9 |
| `src/content/find-index.ts` | new | Quick Find entries | `FindEntry` |
| `src/components/layout/header.tsx` | changed | button triggers, panels, `isActive` by prefix, login from lg, pill at all widths, Search trigger | `primaryNav`, `headerCta` |
| `src/components/layout/mobile-sheet.tsx` | new (split out) | grouped sheet with descriptions, sticky actions | same |
| `src/components/layout/quick-find.tsx` | new | `<dialog>` palette | `findIndex` |
| `src/components/layout/section-subnav.tsx` | new | generalised sub-nav; `hubx-subnav.tsx` becomes a wrapper | `{ lockup, items, action?, ariaLabel, mobileLabel, trailing? }` |
| `src/app/services/layout.tsx` | new | mounts the services sub-nav | `servicesNav` |
| `src/components/layout/footer.tsx` | changed | fifth column, hours line | `footerColumns`, `site` |
| `src/components/ink/wide-only.tsx` | new | renders children only when `(min-width: 1024px)` matches after mount; `className` reserves the box | `{ minWidth = 1024, className, children }` |
| `src/components/ink/audience-band.tsx` | new | home/services router | `audienceLinks`, `variant: "band" | "rows"` |
| `src/components/ink/pinned.tsx` | changed | `capture`/`path` optional; `figure?: (i) => ReactNode`, `tone?`, `stepMinH?`, `idPrefix?`, `caption?` | home unchanged |
| `src/components/ink/interior.tsx` | changed | `DotList marker?: "orange" \| "neutral"` | — |
| `src/components/marketing/page-hero.tsx` | changed | `facts?`, `anchors?` | — |
| `src/components/hubx/hubai-conversation.tsx` | changed | `turns?`, `compact?` | `hubAiDemo` |
| `src/components/services/engagement-rail.tsx` | new | hero strip and stage rail | `professional.engagement` |
| `src/components/services/professional-hero-object.tsx` | new | frame + rail panel | `captures.customerProductsHome` |
| `src/components/services/delivery-stage.tsx` | new | pinned figure | `professional.deliverables` |
| `src/components/services/sprint-loop.tsx` | new | DEV→UAT→PROD figure | `development.loop` |
| `src/components/services/service-inquiry.tsx` | new | `#inquiry` panel with preselected practice | `LeadForm kind="service"`, `*.inquiry` copy |
| `src/app/services/{page,professional,managed,development}/page.tsx` | changed | ports per §3–5; metadata and `serviceSchema` untouched | `services.ts` |
| `src/components/ink/home-sections.tsx`, `src/app/page.tsx` | changed | band in, `AudienceRow` out, spine renumbered | `home.ts` |
| `src/components/partners/program-page.tsx` | changed | voice, aside, In HubX, bring row, ids, anchors | `partners.ts` |
| `src/app/{partners,licensing,licensing/switch,licensing/ea-to-csp,contact}/page.tsx` | changed | §6 | `licensing.ts`, `cases.ts` |
| `src/app/hubx/features/[module]/page.tsx` | changed | captions deleted | — |
| `src/content/{services,partners,licensing,home,direct-bill,confirmations,evidence}.ts` | changed | §9 | — |
| `src/app/globals.css` | changed | `.rail-line` draw rules, panel fade, sheet action bar | — |
| `src/components/marketing/audience-tabs.tsx` | deleted | dead code | — |

## 9. Content additions (all in `src/content/*`, existing facts only)

- `nav.ts`: descriptions and metas exactly as the §2 table; `audienceLinks[i].action`: MSPs → "Apply as a reseller partner" `/partners/apply?program=reseller` · VARs → same with `#vars` origin · Businesses → "Get a licensing quote" `/licensing/quote#quote-form` · Direct-bill CSPs → "Schedule a platform demo" `/demo` · Advisors & agents → "Talk to the partner team" `/contact?topic=partnership#contact-form`.
- `services.ts`: `professional.heroFacts` = ["Fixed-fee statement of work", "Named project manager", "Licensing review in HubX first"]; `professional.scoping` FactRows: Commercial model — "Fixed-fee statement of work for projects; block-time for ongoing advisory" · Accountability — "A named project manager, accountable end to end" · Starting point — "Every project starts with a licensing review in HubX"; `professional.deliverables`: Align — "Scope, risks, and success criteria" / "Licensing review in HubX" / "Fixed-fee statement of work"; Plan — "Architecture and target state" / "Migration plan and cutover runbook" / "Milestone visibility for your team"; Deliver — "Pilot, then waves" / "Validation at each wave" / "A named project manager, end to end"; Validate & Transition — "Evidence-based acceptance review" / "Documentation your team can operate from" / "Optional handoff to MSP Hub managed services"; `professional.anchors` = Capabilities `#capabilities` · Practices `#practices` · How we deliver `#delivery` · HubX `#hubx` · Start `#inquiry`; `professional.inquiry` = { title: "Request a scoping call.", lead: "Tell us about the estate and the deadline. We come back with questions, a proposed approach, and a fixed-scope assessment where it fits." }. `development.heroFacts` = ["Three-week sprints", "DEV, UAT, and production", "A demo closes every sprint"]; `development.loop` = { lanes: ["DEV", "UAT", "PROD"], labels: { promote: "Automated promotion", rollback: "Rollback", demo: "A demo closes every sprint", next: "Next milestone", sprint: "Three-week sprints", improve: "Copilot adoption, agents, automation" } }; `development.anchors` = Tracks `#tracks` · How a project runs `#method` · HubAI `#hubai` · Start `#inquiry`; `development.inquiry` = { title: "Start a project.", lead: "Share the problem, the systems involved, and the deadline. We reply with a proposed first milestone." }; `development.hubai` = { eyebrow: "HubAI", title: "HubAI: the AI already in HubX.", link: "More about HubAI" }. `managed.heroFacts` = ["24/7 monitoring for managed environments", "Agreed SLAs, reported monthly", "Direct Microsoft escalation"]; `managed.facts` FactRows: Monitoring — "Around the clock for environments under MSP Hub managed services" · Reporting — "Response and resolution reported monthly against the SLAs agreed up front" · Escalation — "Direct to Microsoft Premier support, as a CSP direct-bill partner"; `managed.anchors`; `managed.inquiry` = { title: "Hand over the day-to-day.", lead: "Tell us what you run today and what keeps paging your team. We propose scope, SLAs, and a transition plan." }. `servicesNav` as §2.4.
- `home.ts`: eyebrow and primary per §6; delete `homeAudiences`. `direct-bill.ts`: eyebrow per §6.
- `licensing.ts`: `licensingMotions[5]` = { title: "Resell through MSP Hub", body: "For MSPs and VARs: Tier-1 direct pricing on the full catalog, partner-branded customer invoices, and every customer tenant in HubX, with MSP Hub's services bench behind you.", href: "/partners/reseller", linkLabel: "Reseller program" }; `switchPage.movingFrom[3]` = { title: "An Enterprise Agreement via an LSP", body: "Enterprise Agreements are transacted by a Licensing Solution Provider, so the path is different: we map your estate to CSP subscriptions and plan the move around your agreement dates.", link: { label: "Read the EA to CSP guide", href: "/licensing/ea-to-csp" } }; `switchPage.book` = { eyebrow: "MSPs and VARs", title: "Moving a whole book of customers?", lead: "Customer subscriptions move to MSP Hub's direct tenant customer by customer, in batches under Microsoft's per-request limit, with your current partner approving each one. Nothing is re-bought and terms carry over." }; `licensingFaq[1].a` = "For subscriptions bought through another CSP partner or from Microsoft directly, yes: they move by partner-to-partner transfer, terms and renewal dates carry over, and nothing is re-bought. You accept the reseller relationship from a link, then the transfer completes inside the open transfer window. Enterprise Agreement estates are different: we map them to CSP and provision around your agreement dates (see the EA to CSP guide)."
- `partners.ts`: `partnerPrograms[0].who` and `programOptions` description → "MSPs and VARs, with or without Microsoft revenue today"; `ProgramDetail.voice` = { forWhomTitle, stepsTitle, secondary: { label; href }, nextLead }: reseller keeps today's strings with secondary "Schedule a HubX demo"; agent → "Built for the way you already advise." / "From application to your first registered opportunity." / "Talk to the partner team" `/contact?topic=partnership#contact-form` / "Tell us about your practice and the clients you advise."; platform → "Built for the tenant you already run." / "From Partner Center connection to the first billing run." / "Schedule a platform demo" `/demo` / "Tell us about your tenant and your billing books."; agent `includes[0]` = { title: "Deal registration with the partner team", body: "Register an opportunity through the contact form (topic: Partnership); it goes straight into MSP Hub's CRM against your partner record." }; `includes[4]` = { title: "Collateral from the partner team", body: "Company deck, services deck, and the “Why MSP Hub” brief, sent by the partner team after onboarding." }; `steps[1].body` = "Send each opportunity to the partner team through the contact form (topic: Partnership); MSP Hub scopes it with the client."; `faq[0].a` = "Through the contact form with the topic “Partnership” once you are onboarded. Each registration goes into MSP Hub's CRM against your partner record."; `agent.bring` = Switches from another CSP partner → `/licensing/switch` · Enterprise Agreement transitions → `/licensing/ea-to-csp` · Migrations, security, and Azure → `/services/professional` · Managed operations → `/services/managed` · Applications and AI → `/services/development` (bodies from the existing FAQ "What can I bring?").
- `confirmations.ts`: `managedPricingModel` = { kind: "decision", label: "Managed services commercial model", detail: "One line on how managed services are priced (model only, never a rate); hidden in production until supplied." }.
- `find-index.ts` groups and entries: Audiences (the five rows, keywords "MSP, VAR, reseller, margin, business, CSP, Partner Center, advisor, agent, TSD"); What we do (HubX, three services, Services overview); HubX (`/hubx/features/{home,customers,catalog,quotations,billing,dashboards-reports,service-desk,hubai}`, `/hubx/security`, `/hubx/whats-new`; keywords "GDAP, P2P, transfer, invoice, margin, SSO, reports"); Licensing (the five `licensingLinks`; keywords "NCE, EA, LSP, quote, invoice, Copilot, Azure, nonprofit, education"); Partners (`/partners`, reseller, agents, platform, apply); Company (About, Insights, Support, Contact, Demo); Actions (Get a quote, Send your invoice `/licensing/switch#send-invoice`, Book a demo, Apply to partner, Log in to HubX); Insights (the five post slugs with titles).

## 10. Work packages

| WP | Scope (files) | Depends on | Acceptance |
|---|---|---|---|
| WP1 Nav model | `nav.ts`, `header.tsx`, `mobile-sheet.tsx`, `footer.tsx`, `globals.css` panel rules, `contact/page.tsx` | — | Parents never navigate; `aria-expanded` toggles; Escape returns focus; `/partners/reseller` lights Who we serve; login visible at 1100 px; pill visible at 375; five rows with descriptions in panel, sheet and footer; hours line renders fallback in production |
| WP2 Primitives | `wide-only.tsx`, `pinned.tsx`, `interior.tsx` DotList, `page-hero.tsx`, `hubai-conversation.tsx`, `section-subnav.tsx` + `hubx-subnav.tsx` wrapper, `services/layout.tsx`, `service-inquiry.tsx`, `services.ts`, `confirmations.ts` | — | Home pinned unchanged pixel-for-pixel; `/hubx` sub-nav unchanged except the white marker; `WideOnly` SSRs nothing and reserves the box |
| WP3 Figures | `engagement-rail.tsx`, `delivery-stage.tsx`, `sprint-loop.tsx`, `professional-hero-object.tsx`, `globals.css` rail rules | WP2 | Rail pre-drawn with JS off and under reduced motion; arrow keys move stations; one orange node |
| WP4 Professional | `services/professional/page.tsx` | WP2, WP3 | No `IllustrativeAsset` import; first H2 ≤ 820 px at 1440, ≤ 940 px at 375; `#inquiry` submits with "Professional services" checked; two pearl chapters |
| WP5 Development | `services/development/page.tsx` | WP2, WP3 | No empty section in production (section count drops to the expected number); teaser turn 1 only; strip links `#hubai` on phones |
| WP6 Index + managed | `services/page.tsx`, `services/managed/page.tsx` | WP2 | `?branch=managed` preselects; zero orange icon tiles; frame absent below lg |
| WP7 Home | `audience-band.tsx`, `home-sections.tsx`, `page.tsx`, `home.ts`, `direct-bill.ts` | WP1 | Band directly under the proof strip with `id="who-we-serve"`; five entries; spine 01–05; hero primary goes to `/contact#contact-form` |
| WP8 Programs + licensing | `program-page.tsx`, `partners.ts`, `partners/page.tsx`, `licensing.ts`, `licensing/{page,switch,ea-to-csp}/page.tsx`, `evidence.ts`, `hubx/features/[module]/page.tsx` | WP2 (`WideOnly`, `anchors`) | `/partners/reseller#vars` lands on the VAR row; In HubX chapter links `/hubx/features/customers`; agent page links all five bring rows; no "Illustrative" string in build output |
| WP9 Quick Find | `find-index.ts`, `quick-find.tsx`, header/sheet triggers | WP1 | Opens on ⌘K/Ctrl+K and both triggers, never from inside an input; combobox semantics pass axe; no first-paint cost; may ship in the next PR |
| WP10 Verify + deploy | §11 | all | Gates green; PR merged to main; Vercel production shows the new build; Luke pinged with the URLs |

WP1, WP2, WP3 can run in parallel; WP4–WP8 in parallel after their dependencies; WP9 last.

## 11. Verification checklist

1. `npx tsc --noEmit`, `npm run lint`, `npm run build` clean.
2. `grep -ril "Illustrative\|not product UI\|Editorial" .next/server/app` returns nothing; grep source for `#talk-to-msphub` outside `route-d.tsx` returns nothing; no customer or partner name added (run the forbidden-terms script where present).
3. Routes, redirects, `sitemap.ts`, per-route metadata, `serviceSchema`, `BreadcrumbList` and FAQPage structure diff-clean (the only JSON-LD text delta is the qualified `licensingFaq[1]` answer).
4. Screenshots at 1440×900, 768×1024, 375×812: `/`, `/services`, `/services/professional`, `/services/development`, `/services/managed`, `/partners/reseller`, `/licensing/switch`; each of the four header panels open at 1440; the mobile sheet at 375; Quick Find empty and with "transfer"; first-H2 offset measured on the three practice pages.
5. Orange count per services viewport ≤ 3 including the header pill (pill, primary, one node or tint).
6. axe-core zero violations at 1440 and 390 on every route; keyboard walk of the header (open, rows, Escape, focus return), the rail stations, the sub-nav `<details>`, the palette.
7. Reduced motion (`emulateMedia reducedMotion: reduce`) on `/`, the three practice pages: no transforms, rail fully drawn, SprintLoop lit, pinned stacked, no opacity-0 starts, anchors jump instantly.
8. Lighthouse mobile ≥ 90 performance / 100 accessibility / 100 best practices on `/`, `/services`, the three practice pages, `/partners/reseller`, `/licensing/switch`; LCP is the H1 (phones) or the hero frame (desktop); CLS 0 when `WideOnly` mounts.
9. Repeat the PR #18 `--disable-gpu` idle check: 0 % CPU at idle after 12 s.
10. Forms: `/services/professional#inquiry` submits with the practice checked (SERVICE label untouched); `/services?branch=managed` preselects; `/licensing/ea-to-csp` form posts kind `switch` with provider `ea-lsp`; `/partners/apply?program=agent` still preselects.

## 12. Risks and open decisions for Luke (build proceeds with the stated default)

1. **Captures off HubX routes.** `customersList` (reseller/platform heroes and In HubX), `homeWidgets` (managed hero) and `customerProductsHubx` are declared "HubX routes only" in `evidence.ts` but already ship on `/for/businesses` and `/licensing`. Default: use them and record the approval in `offHubxApproved`; fallback on objection is `customerProductsHome`.
2. **Managed commercial model.** Ships hidden behind `managedPricingModel` until he supplies one line (model only).
3. **Support hours.** Footer, contact and `/support` keep the fallback until `supportHours` is confirmed.
4. **"Your current MSP can't run the transfer. We can."** stays as written (brief §7 item 2); the new "Moving a whole book?" chapter gives MSPs their own door. He may retitle it to "Only a direct-bill partner can run the transfer."
5. **Tenant-count field on quote/switch forms.** Not in this PR (forms frozen); the reseller apply form already has it.
6. **Quick Find.** Built last; ships only if its gates pass today, otherwise next PR.
7. **Agent collateral.** Reworded to "sent by the partner team after onboarding"; hosting the three PDFs needs the files.
8. **Licensing and partners sub-navs.** Anchor chips only in this pass; a sticky sub-nav for those sections needs a pearl-tone variant and the bleed override.
9. **Home section 7 cards.** Replaced by the band under the proof strip (one router per page).
10. **"Partners" top-level item.** Removed from the header; reachable from the Who we serve footer rows, Company and the site footer.
11. **Sub-nav active marker.** Orange dot becomes white on `/hubx` and `/services` to protect the orange budget.

## Build notes (2026-11-04)

Deviations from the spec made during the build, with the reason for each:

1. **Quick Find shipped in this PR.** WP9 passed its gates (lazy chunk, nothing on first paint, combobox and listbox semantics), so it did not move to a later PR. The native `close` event is ignored while the dialog is open, because the queued event can land after a fast reopen.
2. **Hero eyebrows lost their orange rule site-wide.** The rule made a fourth orange element in every services hero. Eyebrows are now mono wayfinding text everywhere, matching the chapter eyebrows.
3. **The header pill has a short label on phones** ("Apply", "Start inquiry", "Contact us"). The full label does not fit beside the logo and the menu button at 360–375 px.
4. **Reduced motion moved from JavaScript to CSS** in `Pinned`, `Parallax`, and `Spine`. `useReducedMotion` reads `null` on the server, so branching on it rendered different markup on the server and the client for exactly the visitors who asked for less motion.
5. **`.hero-line` now sets `display: block` on spans only.** The rule is unlayered, so it beat every Tailwind display utility on the same element. That turned hero button rows from flex into block, which is why hero buttons touched on every page. It also stopped `max-lg:hidden` from hiding desktop-only asides.
6. **Backdrop filters go through custom properties.** Lightning CSS emitted only `-webkit-backdrop-filter` for literal values, which Chromium and Firefox ignore, so the header glass and the palette backdrop had never blurred. The header blur is 12 px (DESIGN.md `backdrop-blur-md`), not 18 px.
7. **`/licensing` reads "Six ways in."** because the motions list now has six entries.
8. **`/licensing/switch` puts "Moving a whole book?" after the send-invoice panel**, matching the hero anchor order and keeping the comparison next to its form.
9. **The development hero object is server-rendered, shown from lg, at 90 % zoom.** It carries no image bytes, so there is nothing to defer, and rendering it on the server avoids a layout shift when it mounts. The zoom keeps the object near 460 px tall so chapter 01 starts above the fold at 1440 × 900.
10. **Hero facts render as one mono line below md, not a scrolling chip row.** A scroll region with nothing focusable inside cannot be scrolled from the keyboard (axe `scrollable-region-focusable`). The anchor row still scrolls, because its links keep it keyboard-reachable.
11. **`PageHero` gained `asideBelowLg`.** With `false`, desktop-only asides (frames inside `WideOnly`) drop below lg along with their 48 px gap.
12. **Pinned figures use `--pinned-top`.** Pages with a section sub-nav raise it to 9.25rem from lg, so the sticky figure clears the header and the sub-nav.
13. **Footer contact icons are neutral.** The orange company close sits directly above the footer and already carries the accent.
14. **Retired:** `AudienceTabs`, `AudienceCard`, and `homeAudiences`. `audienceLinks` in `content/nav.ts` is the one audience source.
15. **The company close is a named region** (`aria-labelledby`). It sits outside `<main>`, and axe flagged it as content outside any landmark.
16. **Pinned step titles on the services pages are plain headings.** Linked to `#inquiry`, they put four orange underlines beside the active node and four links with one destination (review). The inquiry stays one click away in the header, the sub-nav, and the hero.
17. **The Practices chapter dropped its per-practice "Request a scoping call" links**, for the same reason: three orange underlines in one row, all to `#inquiry`.
18. **Neutral variants for viewports whose orange is spent:** `InkLink underline="neutral"`, `RuleList linkUnderline`, `EvidenceFigure accent={false}`, `EngineTile accent={false}` (the symbol dot and the arrow turn orange on hover only), the white HubX mark in the compact HubAI teaser, and a neutral stroke on the chapter 01 numeral that hangs in a services hero.
19. **Same-page anchor calls to action are native links** (`ButtonLink`, `InkLink`, the sub-nav action), so focus follows the jump; a client-side `Link` to `#id` scrolls without moving focus.
20. **ISO/IEC 27001:2022 is published.** Luke confirmed the certification on 2026-11-04 and holds the paperwork; the `isoEntity` confirmation is retired. The HubX FAQ and the security page say the certificate is available on request.
21. **Quick Find draws groups in the order of their best match, and Enter opens the highlighted row.** Before the fix the two orders could differ.
22. **The header pill hides below 360 px**, where the bar cannot hold the logo, the pill, and the toggle; the sheet carries the same action.
23. **The mobile sheet makes the page behind it inert**, so Tab from the toggle lands in the sheet; Escape returns focus to the toggle.
24. **Services pinned figures read their data as props** from the server pages, so no content module ships in their client bundles, and they raise `--pinned-top` themselves (a `main:has()` rule matched the hidden sub-nav that the router keeps in `<main>`).
25. **Open decision §12 #1 now also covers the dashboards crop**, which the homepage outcomes already show; `offHubxApproved` lists it.

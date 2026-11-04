/**
 * Registry of every open CONFIRM / DECISION / ASSET item from the private
 * handoff (§2 and §10). `NeedsConfirm` renders the review chip for these ids
 * only when NEXT_PUBLIC_SHOW_TODOS === "true"; production always gets the
 * caller's `fallback`.
 */
export type ConfirmKind = "confirm" | "decision" | "asset";

export type Confirmation = {
  kind: ConfirmKind;
  label: string;
  detail: string;
};

export const confirmations = {
  servicesHeadcount: {
    kind: "confirm",
    label: "Services headcount",
    detail: "“100+ staff on the services team” is unverified; hidden in production until confirmed.",
  },
  badgesHeld: {
    kind: "asset",
    label: "Microsoft Solutions Partner designation artwork",
    detail:
      "Enrolled solution areas render as text chips (no scores). Designation badge artwork only once Luke confirms a designation as attained and supplies the Logo Builder file.",
  },
  awardTitle: {
    kind: "confirm",
    label: "ChannelPro award title",
    detail: "Confirm the exact award title and category (ChannelPro LIVE Chicago 2025, Editor's Choice).",
  },
  marketPosition: {
    kind: "confirm",
    label: "Market-position number",
    detail: "“One of ~125 CSP direct-bill partners in North America” needs a source before publishing.",
  },
  phone: {
    kind: "confirm",
    label: "Sales phone",
    detail: "+1-847-859-0500 (from msphub.com) — confirm it still routes to sales.",
  },
  supportHours: {
    kind: "confirm",
    label: "Support hours",
    detail: "Publish exact licensing & billing desk hours (proposed Mon–Fri, 8am–6pm Central).",
  },
  deliveryRegions: {
    kind: "confirm",
    label: "Delivery regions",
    detail: "North America, UK, India are confirmed; add Australia/NZ?",
  },
  officePresentation: {
    kind: "decision",
    label: "Office presentation",
    detail: "HQ city only vs full address (the street address is a mailbox suite; recommended: full address in footer/legal only).",
  },
  whiteLabel: {
    kind: "confirm",
    label: "Visual white-label",
    detail: "Partner logo/theme on the HubX portal was not observed; confirm with product before claiming.",
  },
  integrations: {
    kind: "confirm",
    label: "Integrations beyond Partner Center and SSO",
    detail: "RMM/PSA/CRM connectors and a public partner API were not observed. Until confirmed: “API-first platform; integrations on request”.",
  },
  seatAssignment: {
    kind: "confirm",
    label: "Seat-assignment visibility",
    detail: "HubX shows purchased quantities; do not claim unassigned-seat analytics until confirmed.",
  },
  dataHosting: {
    kind: "confirm",
    label: "Data hosting region",
    detail: "Azure region / residency for the HubX FAQ — do not guess.",
  },
  sixOneDate: {
    kind: "confirm",
    label: "Six.One → MSP Hub marketplace date",
    detail: "Nov 2024 per the previous site; confirm.",
  },
  loginContinuity: {
    kind: "confirm",
    label: "Legacy login continuity",
    detail: "Confirm Marketplace (portal.msphub.com) users sign in to HubX with existing accounts.",
  },
  portalRedirect: {
    kind: "decision",
    label: "portal.msphub.com redirect",
    detail: "Permanent 301 to hubx.msphub.com, hostname kept 12 months (DNS-level, outside this repo).",
  },
  leadership: {
    kind: "confirm",
    label: "Leadership",
    detail: "Names, titles, and bios per Luke's round-2 decision #8; confirm order and any additions.",
  },
  teamPhotos: {
    kind: "asset",
    label: "Hi-res leadership photos",
    detail: "Portraits are cropped from the leadership slide at its resolution; supply hi-res originals before launch.",
  },
  testimonials: {
    kind: "asset",
    label: "Testimonials",
    detail: "2–4 quotes from current partners/customers (one MSP partner + one direct customer minimum). Component hidden until then.",
  },
  vendorLogos: {
    kind: "asset",
    label: "Vendor logos and permissions",
    detail: "Text chips until logo files + written permission exist; prune the list to vendors actually transacted.",
  },
  allianceLogos: {
    kind: "asset",
    label: "Alliance logos and permissions",
    detail: "Text until permission; confirm the alliance list to show publicly.",
  },
  partnerTiers: {
    kind: "decision",
    label: "Partner program tiers",
    detail: "No public tiers today; recommended: one program, pricing by volume. Agent program public?",
  },
  devProducts: {
    kind: "decision",
    label: "Products we built",
    detail: "SIX.One, Wave, AppLauncher only with CEO/CPO approval; label as platform engineering heritage. Hidden in production until approved.",
  },
  quoteResponse: {
    kind: "decision",
    label: "Quote response promise",
    detail: "Licensing desk is business hours; recommended wording “within one business day”.",
  },
  onboardingWording: {
    kind: "decision",
    label: "Onboarding time-to-live wording",
    detail: "Transfers depend on reseller-relationship acceptance and the ~30-day transfer window; recommended “Live in one billing cycle”.",
  },
  pricingWording: {
    kind: "decision",
    label: "HubX pricing FAQ wording",
    detail: "Included with licensing for MSP Hub reseller partners; licensed separately for direct-bill CSPs on their own tenant.",
  },
  bookingLink: {
    kind: "asset",
    label: "Demo booking page",
    detail: "Microsoft Bookings page “HubX demo — 30 min” (sales engineering); embed on /demo with the form as fallback.",
  },
  legalText: {
    kind: "asset",
    label: "Legal pages",
    detail: "Migrate Terms, Privacy, and Cookie policies verbatim with updated entity/brand names.",
  },
  government: {
    kind: "confirm",
    label: "Government (GCC)",
    detail: "Authorization status must be verified before any Government page or claim.",
  },
  orange: {
    kind: "decision",
    label: "Website orange",
    detail: "Standardize on #F97316 (HubX kit) and retire the print orange #E88B2C on the web.",
  },
  eaCspGuide: {
    kind: "asset",
    label: "EA → CSP customer guide",
    detail: "The Microsoft Learn–cited guide has not been supplied; /licensing/ea-to-csp carries interim copy from the handoff until it arrives.",
  },
  insightsSource: {
    kind: "asset",
    label: "WordPress export for Insights",
    detail: "Posts are rebuilt from facts in the handoff, not the original msphub.com text; replace with the originals when the export lands.",
  },
  managedPricingModel: {
    kind: "decision",
    label: "Managed services commercial model",
    detail: "One line on how managed services are priced (model only, never a rate); hidden in production until supplied.",
  },
} as const satisfies Record<string, Confirmation>;

export type ConfirmId = keyof typeof confirmations;

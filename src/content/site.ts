export const site = {
  name: "MSP Hub",
  legalName: "MSP Hub Technologies, LLC",
  founded: 1999,
  formerly: "READY Networks",
  tagline: "Your single technology partner for everything Microsoft.",
  /** Company one-liner from the handoff §1.1. */
  description:
    "MSP Hub is a Microsoft CSP direct-bill partner (Tier-1 Direct) and IT services company. One partner for licensing, cloud, security, AI, and managed operations — and the team that built HubX, the portal that puts your Microsoft estate in one place.",
  salesEmail: "sales@msphub.com",
  salesPhone: "+1-847-859-0500",
  salesPhoneHref: "tel:+18478590500",
  /** Licensing & billing desk; managed-services monitoring is the only 24/7 service. */
  supportHours: "Business hours, US Central and Eastern",
  supportHoursProposed: "Mon–Fri, 8am–6pm Central",
  hq: {
    city: "North Palm Beach, Florida",
    address: "11231 US Highway 1, #356, North Palm Beach, FL 33408",
  },
  deliveryRegions: ["North America", "the UK", "India"],
  hubxLoginUrl: "https://hubx.msphub.com",
  /** Static so every page can be prerendered; bump at year end. */
  copyrightYear: 2026,
  social: {
    linkedin: "https://www.linkedin.com/company/msp-hub",
    facebook: "https://www.facebook.com/msphub1",
    instagram: "https://www.instagram.com/msphub_",
    x: "https://x.com/msp_hub",
    youtube: "https://www.youtube.com/@MSPhubFoundersNetwork",
  },
} as const;

export const platforms = ["Microsoft", "Azure", "AWS", "Google Cloud", "VMware"] as const;

/** Rebrand history (handoff §2 #14). */
export const timeline = [
  {
    when: "1999",
    title: "ReadyNetworks is founded",
    body: "An MSP that built its own licensing platform because the distributors' tools weren't good enough.",
  },
  {
    when: "Nov 2024",
    title: "The marketplace, built by an MSP for MSPs",
    body: "The licensing marketplace (Six.One) opens to other MSPs and VARs.",
    confirm: "sixOneDate" as const,
  },
  {
    when: "Jul 2025",
    title: "ReadyNetworks becomes MSP Hub",
    body: "The company rebrands to MSP Hub: licensing, services, and the platform under one name.",
  },
  {
    when: "Oct 2026",
    title: "HubX launches",
    body: "The platform is redesigned and renamed HubX, powered by MSP Hub.",
  },
] as const;

/** Leadership candidates pending confirmation of titles, order, and photos (handoff §2 #15). */
export const leadership = [
  { name: "Sam Barhoumeh", title: "Chief Executive Officer" },
  { name: "Danny Gaston", title: "Senior Vice President" },
  { name: "Matt H.", title: "Chief Revenue Officer" },
  { name: "Arek Zimny", title: "Chief Product Officer" },
  { name: "Destné Bailey", title: "Director of Strategic Growth" },
  { name: "John Fitzsimmons", title: "Presales Operations Manager" },
  { name: "Luke Barhoumeh", title: "Senior Solutions Architect" },
] as const;

export type Testimonial = { text: string; name: string; role: string };

/** Empty until current partners/customers supply quotes (handoff §2 #8); the component renders nothing when empty. */
export const testimonials: Testimonial[] = [];

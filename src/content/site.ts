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

/** Company story (handoff §1.2 and §5.8, filled from the company deck where the two agree). */
export const companyStory = {
  headline: "Since 1999. Built by an MSP, for the people who run Microsoft.",
  lead: "MSP Hub started in 1999 as ReadyNetworks, an MSP that built its own licensing platform because the distributors' tools weren't good enough. In 2025 the company became MSP Hub; in 2026 the platform became HubX.",
  body: [
    "MSP Hub Technologies, LLC is a Microsoft CSP direct-bill partner (Tier-1 Direct) and a proprietary platform built on more than 25 years of Microsoft cloud delivery heritage.",
    "Four sibling branches sit under MSP Hub: HubX, Professional Services, Managed Services, and Development & AI. HubX is the flagship platform, not the parent of the service branches. It is the New Commerce Experience platform for licensing, invoicing reconciliation, and lifecycle management. Professional Services and Managed Services span Microsoft Azure, AWS, and Google Cloud, and Development & AI builds the applications and automation beside them. Multi-vendor procurement through distribution still gives partners and customers one procurement spine and one invoice.",
    "We serve MSPs and VARs who resell Microsoft and need a platform and a bench behind them, direct-bill CSPs who run HubX on their own Partner Center tenant, and businesses buying licensing and services directly, from small companies to large enterprises. Licensing is the entry point; the services make it work.",
  ],
} as const;

/** Rebrand history (handoff §2 #14) with the deck's stages filled in where they agree. */
export const timeline = [
  {
    when: "1999",
    title: "Founded as ReadyNetworks",
    body: "A full-service technology and MSP firm: infrastructure, cloud, security, and IT consulting, building customer delivery and channel credibility.",
  },
  {
    when: "CSP era",
    title: "Microsoft CSP direct-bill partner",
    body: "Advanced into Microsoft cloud licensing as a Tier-1 Direct partner, owning billing, support, partner operations, and the subscription lifecycle.",
  },
  {
    when: "Platform build",
    title: "Automated licensing, billing, and provisioning",
    body: "The platform that became HubX: CSP licensing, billing, and provisioning automated, with marketplace, orchestration, and cloud-operations IP built in-house.",
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
    body: "READY becomes MSP Hub Technologies, repositioned on partner growth: a services-led firm becomes a platform-led ecosystem.",
  },
  {
    when: "Oct 2026",
    title: "HubX launches",
    body: "The platform is redesigned and renamed HubX, powered by MSP Hub: Microsoft-first, built for MSPs, VARs, ISVs, and technology advisors, from distribution to end customer.",
  },
] as const;

export type Leader = {
  slug: string;
  name: string;
  title: string;
  bio: string;
  /** Cropped from the leadership slide; hi-res originals are a go-live ask. */
  photo: string;
};

/** Leadership (Luke's round-2 decision #8; bios transcribed from the leadership slide). */
export const leadership: Leader[] = [
  {
    slug: "sam-barhoumeh",
    name: "Sam Barhoumeh",
    title: "Founder & CEO",
    bio: "Two-time founder: Ready Networks for 27 years, and MSP Hub since 2025. Building a SaaS marketplace across the Microsoft CSP and NCE ecosystem with AI-driven sales development, CPQ, and marketplace intelligence.",
    photo: "/team/sam-barhoumeh.jpg",
  },
  {
    slug: "matt-hurley",
    name: "Matt Hurley",
    title: "Chief Revenue Officer",
    bio: "25-year go-to-market global executive, CRO, and channel chief. Prior roles at Sun Microsystems, Bell Canada, Juniper Networks, and OneLogin.",
    photo: "/team/matt-hurley.jpg",
  },
  {
    slug: "arek-zimny",
    name: "Arek Zimny",
    title: "Chief Product Officer",
    bio: "30 years in software and product development. Led global U.S. and offshore engineering teams; enterprise architecture, SaaS, and modern AI practices.",
    photo: "/team/arek-zimny.jpg",
  },
  {
    slug: "konrad-jachim",
    name: "Konrad Jachim",
    title: "Director, Professional Services",
    bio: "20+ years in IT infrastructure, cybersecurity, and managed services. Leads SMB and enterprise client operations across the Cisco, Microsoft, and cloud stack: end-to-end technology operations.",
    photo: "/team/konrad-jachim.jpg",
  },
  {
    slug: "sai-vaidyanathan",
    name: "Sai Vaidyanathan",
    title: "Country Head, India",
    bio: "25 years in software development and delivery, from programmer to delivery head at Citigroup, Polaris, IBM Labs, and eBay. Director and Country Head at MSP Hub; active in India's startup ecosystem.",
    photo: "/team/sai-vaidyanathan.jpg",
  },
];

export type Testimonial = { text: string; name: string; role: string };

/** Empty until current partners/customers supply quotes (handoff §2 #8); the component renders nothing when empty. */
export const testimonials: Testimonial[] = [];

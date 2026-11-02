/**
 * Copy for the generated Open Graph images (`src/lib/og.tsx`), one entry per
 * route that ships its own `opengraph-image.tsx`. Keep titles under ~70
 * characters so they set on two lines at 1200 × 630.
 */
export type OgCopy = {
  /** Small mono line above the title. */
  eyebrow: string;
  title: string;
  /** Alt text for the image. */
  alt: string;
  /** Show the "HubX, powered by MSP Hub" lockup line instead of the company tagline. */
  product?: boolean;
};

export const ogCopy = {
  hubx: {
    eyebrow: "HubX, powered by MSP Hub",
    title: "The Microsoft portal for licensing, procurement, and spend.",
    alt: "HubX, powered by MSP Hub — the Microsoft portal for licensing, procurement, and spend",
    product: true,
  },
  services: {
    eyebrow: "Services",
    title: "Four practices, one delivery team.",
    alt: "MSP Hub services: professional, managed, and development services for Microsoft estates",
  },
  professional: {
    eyebrow: "Professional services",
    title: "Microsoft 365, Azure, security and identity, data and platform.",
    alt: "MSP Hub professional services",
  },
  managed: {
    eyebrow: "Managed services",
    title: "Managed operations run to agreed SLAs.",
    alt: "MSP Hub managed services",
  },
  development: {
    eyebrow: "Development as a service",
    title: "Applications, DevOps, and AI development.",
    alt: "MSP Hub development as a service",
  },
  partners: {
    eyebrow: "Partners",
    title: "Resell, refer, or run the platform.",
    alt: "Partner with MSP Hub: reseller, agent, and platform programs",
  },
  about: {
    eyebrow: "About MSP Hub · Since 1999",
    title: "One partner for licensing, cloud, security, AI, and managed operations.",
    alt: "About MSP Hub, Microsoft CSP direct-bill partner and IT services company since 1999",
  },
  contact: {
    eyebrow: "Contact",
    title: "Talk to MSP Hub.",
    alt: "Contact MSP Hub",
  },
  demo: {
    eyebrow: "HubX, powered by MSP Hub",
    title: "See HubX in 30 minutes.",
    alt: "Schedule a HubX demo",
    product: true,
  },
  quote: {
    eyebrow: "Microsoft licensing",
    title: "Tier-1 direct pricing on Microsoft 365, Azure, and Copilot.",
    alt: "Request a Microsoft licensing quote from MSP Hub",
  },
} as const satisfies Record<string, OgCopy>;

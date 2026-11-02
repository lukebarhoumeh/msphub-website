export const site = {
  name: "MSP Hub",
  legalName: "MSP Hub Technologies, LLC",
  tagline: "Your single technology partner for everything Microsoft.",
  description:
    "MSP Hub is the single technology partner for everything Microsoft: Tier-1 direct licensing through HubX, powered by MSP Hub, plus the professional, managed, and development services to run it.",
  salesEmail: "sales@msphub.com",
  /** Static so every page can be prerendered; bump at year end. */
  copyrightYear: 2026,
  hubxLoginUrl: "https://hubx.msphub.com",
  social: {
    linkedin: "https://www.linkedin.com/company/msp-hub",
    x: "https://x.com/msp_hub",
    youtube: "https://www.youtube.com/@MSPhubFoundersNetwork",
    facebook: "https://www.facebook.com/msphub1",
    instagram: "https://www.instagram.com/msphub_",
  },
} as const;

/** The only statistics approved for publication (Luke, Nov 2 2026). */
export const approvedStats = [
  { value: "478", suffix: "+", label: "Companies served" },
  { value: "600K", suffix: "+", label: "Microsoft licenses managed" },
  { value: "100", suffix: "+", label: "Staff on the services team" },
] as const;

/** Certifications approved for display, in the approved wording. */
export const certifications = [
  "ISO certified",
  "Microsoft Modern Work certified",
  "Azure certified",
] as const;

export const platforms = [
  "Microsoft",
  "Azure",
  "AWS",
  "Google Cloud",
  "VMware",
] as const;

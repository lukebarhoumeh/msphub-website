/**
 * Registry of content Luke still has to supply. Every entry renders as a
 * visible "Needs Luke" tag (see `components/ui/needs.tsx`) wherever the
 * missing item would appear, so reviewers can spot gaps on the preview.
 * The README lists the same items.
 */
export const needs = {
  phone: {
    label: "Phone number",
    detail: "Sales phone number for the footer and contact page.",
  },
  offices: {
    label: "Office locations",
    detail:
      "Which offices to list (HQ address plus any regional offices) and how to present them.",
  },
  booking: {
    label: "Demo booking link",
    detail:
      "Microsoft Bookings (or Calendly) URL and owner for the demo calendar embed. The form below is the fallback until then.",
  },
  loginUrl: {
    label: "HubX login URL",
    detail:
      "Confirm hubx.msphub.com as the HubX login URL and whether portal.msphub.com retires.",
  },
  pricing: {
    label: "HubX pricing model",
    detail:
      "How HubX is priced: included with licensing, per tenant, or separate partner pricing.",
  },
  screenshots: {
    label: "HubX screenshots",
    detail:
      "6-10 dark-mode HubX screenshots or a short screen recording. Portal visuals shown are design mock-ups with sample data.",
  },
  audienceSplit: {
    label: "MSP vs direct split",
    detail:
      "Confirm the MSP/VAR vs direct-customer positioning and whether partners can white-label HubX.",
  },
  hubAi: {
    label: "Hub AI scope",
    detail: "Confirm Hub AI ships in HubX and which capabilities are live.",
  },
  integrations: {
    label: "Integrations list",
    detail: "Which RMM, PSA, and CRM integrations are available today.",
  },
  onboarding: {
    label: "Onboarding steps",
    detail: "Confirm the real HubX onboarding steps and typical time to live.",
  },
  marketplace: {
    label: "Marketplace relationship",
    detail:
      "State how HubX relates to the existing MSP Hub Marketplace at portal.msphub.com.",
  },
  dataHosting: {
    label: "Data hosting",
    detail: "Hosting region, data residency, and security certifications for HubX.",
  },
  responseTime: {
    label: "Quote response time",
    detail: "Confirm the response-time promise for Microsoft 365 quotes.",
  },
  leadership: {
    label: "Leadership",
    detail: "Who appears on About: names, titles, photos, short bios.",
  },
  logosPermission: {
    label: "Logo permission",
    detail:
      "Confirm the vendor and partner logos carried over from msphub.com may be displayed, and supply any additions.",
  },
  testimonialPermission: {
    label: "Testimonial permission",
    detail:
      "Re-confirm permission and wording for the MNJ Technologies testimonials carried over from msphub.com; add 2-4 more if available.",
  },
  caseStudies: {
    label: "Case studies",
    detail: "1-3 short customer wins (problem, work, result).",
  },
  alliances: {
    label: "Alliance logos",
    detail:
      "Permission and logo files for Ingram Micro, Trust X Alliance, Frontier Technologies, and P2 Telecom.",
  },
  partnerProgram: {
    label: "Partner program mechanics",
    detail:
      "Program tiers, deal-registration process, and enablement details for the Partners page.",
  },
  devProducts: {
    label: "Products we built",
    detail:
      "Confirm SIX.One, Wave, and AppLauncher may be shown publicly as development credentials.",
  },
  deliveryCenters: {
    label: "Delivery locations",
    detail: "Confirm the delivery regions named (North America, UK, India).",
  },
  formerly: {
    label: "Rebrand history",
    detail:
      "How prominent 'Formerly READY Networks / Six.One' should be, and the HubX launch date for the timeline.",
  },
  social: {
    label: "Social links",
    detail: "Confirm all five social profiles carried over from msphub.com are active.",
  },
  legal: {
    label: "Legal text",
    detail:
      "Who owns the Termly account; approve porting the Privacy, Terms, and Cookie policies from msphub.com.",
  },
  team: {
    label: "Team photos",
    detail: "Real team photography for About (no stock people).",
  },
} as const;

export type NeedId = keyof typeof needs;

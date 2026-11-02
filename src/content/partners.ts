/** Partner programs (handoff §5.7). No tiers are published; economics copy carries no numbers. */
export type PartnerProgram = {
  id: "reseller" | "agent" | "platform";
  name: string;
  who: string;
  gets: string[];
};

export const partnerPrograms: PartnerProgram[] = [
  {
    id: "reseller",
    name: "Reseller partner",
    who: "MSPs and VARs selling Microsoft",
    gets: [
      "Tier-1 direct pricing on the full catalog",
      "Every customer in HubX",
      "Partner-branded customer invoices with your own remittance details",
      "Margin per customer, and what changed since last period",
      "Partner-to-partner transfers run by MSP Hub's deal desk",
      "MSP Hub's services bench behind you",
    ],
  },
  {
    id: "agent",
    name: "Agent / referral partner",
    who: "Advisors, technology-advisor agents, consultants",
    gets: [
      "Bring opportunities; MSP Hub sells and delivers",
      "Evergreen commission on licensing and services",
      "Weekly pipeline visibility",
    ],
  },
  {
    id: "platform",
    name: "Platform partner",
    who: "Direct-bill CSPs",
    gets: [
      "HubX on your own Partner Center tenant",
      "Quoting, provisioning, and billing reconciliation",
      "Dashboards, scheduled reports, and HubAI",
    ],
  },
];

export const partnerSteps = [
  { title: "Apply", body: "Tell us about your business, your customers, and the Microsoft workloads you sell today." },
  { title: "Onboard", body: "Tenants, pricing, billing, and training are set up in HubX with the partner team." },
  { title: "Transact or submit opportunities", body: "Sell and provision through HubX, or register opportunities for MSP Hub to sell and deliver." },
];

export const partnerEnablement = [
  "Product training on HubX",
  "Quoting support from the deal desk",
  "Co-selling with MSP Hub engineers on scoping calls",
  "Marketing collateral: company deck, services deck, “Why MSP Hub” brief",
];

/** Safe economics statement: no percentages, no pass-through rates, no margins. */
export const partnerEconomics =
  "Pricing is set as a pass-through off Microsoft list. You see partner price and MSRP side by side in HubX for every SKU.";

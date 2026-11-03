import { Fingerprint, KeyRound, ScrollText, ShieldCheck, UserCog, type LucideIcon } from "lucide-react";
import type { ConfirmId } from "@/content/confirmations";
import type { LightScreenId } from "@/content/screens";

/**
 * /hubx/security content. Every statement was observed in the product
 * (private handoff §6.2 Administration, Customers → Microsoft) or is a
 * publishable company fact (§1.2). Nothing about encryption, hosting, uptime,
 * or third-party audits beyond ISO/IEC 27001:2022 is claimed, because none of
 * it has been confirmed.
 */
export type SecurityPillar = {
  id: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  points: readonly string[];
  screen?: LightScreenId;
  confirm?: ConfirmId;
};

export const securityPillars: readonly SecurityPillar[] = [
  {
    id: "sso",
    icon: KeyRound,
    title: "Single sign-on with your own identity provider",
    summary:
      "HubX authenticates against the identity provider you already run. Users sign in with the accounts, policies, and lifecycle your IT team controls.",
    points: [
      "Microsoft Entra ID, Google, and Okta, through OpenID Connect.",
      "Managed domains route each sign-in to the right identity provider.",
      "Identity providers and domains are configured under Administration → Authentication.",
      "Multi-organization accounts switch organizations from the header.",
    ],
  },
  {
    id: "roles",
    icon: UserCog,
    title: "Users and roles at every level",
    summary:
      "Access is assigned per organization and per customer, so a partner's staff, a customer's IT team, and MSP Hub each see what they should and nothing more.",
    points: [
      "Users & Roles for the partner organization and for each customer.",
      "Customer portal access: customers sign in to their own products, orders, invoices, and tickets.",
      "Billing subscriptions are separate books; dashboards, reports, and HubAI are scoped to the one you select.",
      "Customer types and named discount groups keep commercial terms consistent across staff.",
    ],
  },
  {
    id: "audit",
    icon: ScrollText,
    title: "Audit logs everywhere",
    summary:
      "Changes are recorded organization-wide and per customer, and the most recent events are on the home page next to the invoice, expirations, and Service Desk widgets.",
    points: [
      "Organization-wide audit logs under Administration.",
      "Per-customer audit logs on each customer record.",
      "Audit log feed on the HubX home page.",
      "CSV export on every table, including the audit logs.",
    ],
    screen: "homeWidgets",
  },
  {
    id: "microsoft",
    icon: Fingerprint,
    title: "Microsoft access through Microsoft's own mechanisms",
    summary:
      "HubX runs on MSP Hub's own Microsoft Partner Center integration, so customer tenants are reached through the Cloud Solution Provider program's own controls: reseller relationships, GDAP, and the Microsoft Customer Agreement.",
    points: [
      "The customer accepts the reseller relationship from a link; HubX tracks the status.",
      "Admin access is granted through Granular Delegated Admin Privileges (GDAP) relationships, with coverage, expiring-soon, not-established, and pending-approval views in HubX.",
      "Microsoft Customer Agreement (MCA) acceptance is recorded per tenant.",
      "Partner-to-partner transfers move subscriptions between CSP partners inside Microsoft's transfer window, visible end to end in HubX.",
    ],
  },
  {
    id: "compliance",
    icon: ShieldCheck,
    title: "Compliance",
    summary:
      "Healthcare clients can sign a HIPAA Business Associate Agreement and a Data Processing Agreement with MSP Hub.",
    points: [
      "HIPAA Business Associate Agreement and Data Processing Agreement available on request.",
      "Licensing and billing support in business hours with Microsoft Premier escalation; 24/7 monitoring and incident management for environments under MSP Hub managed services.",
    ],
    confirm: "isoEntity",
  },
] as const;

export const securityPage = {
  hero: {
    eyebrow: "Security · HubX, powered by MSP Hub",
    title: "Your identity provider, your roles, an audit trail everywhere.",
    lead: "HubX signs users in through Microsoft Entra ID, Google, or Okta, scopes access per organization and per customer, records changes in audit logs, and reaches Microsoft tenants only through the CSP program's own mechanisms: reseller relationships, GDAP, and the Microsoft Customer Agreement.",
  },
  pillars: { eyebrow: "How access works", title: "Five things to know before your security review." },
  audit: {
    eyebrow: "In the product",
    title: "The audit feed sits on the home page.",
    lead: "Latest invoice, upcoming expirations, Service Desk, and the audit log, side by side.",
  },
  faq: { eyebrow: "Questions", title: "Security questions we hear most" },
  cta: {
    eyebrow: "Next step",
    title: "Bring your security questionnaire.",
    lead: "Our solutions architects walk through identity, roles, audit, and Microsoft access live.",
  },
} as const;

/** Facts the page states as short tiles. */
export const securityFacts = [
  { label: "Identity providers", value: "Entra ID · Google · Okta" },
  { label: "Protocol", value: "OpenID Connect" },
  { label: "Audit scope", value: "Organization + customer" },
  { label: "Certification", value: "ISO/IEC 27001:2022", confirm: "isoEntity" as const },
] as const;

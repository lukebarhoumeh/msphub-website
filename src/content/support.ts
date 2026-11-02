import type { ConfirmId } from "@/content/confirmations";
import { site } from "@/content/site";

/**
 * Support paths and hours (handoff §1.2 support model, §3 #1, §4 /support row,
 * §5.9). Licensing and billing support is business hours; only managed-services
 * monitoring is 24/7; Microsoft issues escalate to Microsoft Premier support.
 */

export const supportPage = {
  eyebrow: "Support",
  title: "Support that matches the service.",
  lead: "Licensing and billing support runs business hours through the HubX Service Desk and our sales inbox. Managed environments are monitored around the clock. Microsoft issues escalate directly to Microsoft Premier support, because MSP Hub is a CSP direct-bill partner.",
};

export type SupportPath = {
  id: "service-desk" | "licensing-billing" | "microsoft" | "managed";
  title: string;
  body: string;
  availability: string;
  confirm?: ConfirmId;
  /** Proposed wording shown on review builds next to the confirm chip. */
  proposed?: string;
  cta: { label: string; href: string };
};

export const supportPaths: SupportPath[] = [
  {
    id: "service-desk",
    title: "HubX Service Desk",
    body: "Customers and partners open tickets in HubX. Every ticket carries a status, a priority, and an SLA state, visible to the customer and the partner, and customer tickets can be queued to the partner or shared read-only.",
    availability: "Tickets tracked with priority and SLA state",
    cta: { label: "Log in to HubX", href: site.hubxLoginUrl },
  },
  {
    id: "licensing-billing",
    title: "Licensing and billing desk",
    body: "Quotes, orders, renewals, invoices, partner-to-partner transfers, and anything about your bill. Reach the desk through a Service Desk ticket or by email.",
    availability: site.supportHours,
    confirm: "supportHours",
    proposed: site.supportHoursProposed,
    cta: { label: `Email ${site.salesEmail}`, href: `mailto:${site.salesEmail}` },
  },
  {
    id: "microsoft",
    title: "Microsoft escalation",
    body: "As a Microsoft CSP direct-bill partner, MSP Hub escalates service issues straight to Microsoft Premier support. There is no distributor between you and a fix.",
    availability: "Direct escalation, run by MSP Hub",
    cta: { label: "Open a Service Desk ticket", href: site.hubxLoginUrl },
  },
  {
    id: "managed",
    title: "Managed services",
    body: "Environments under MSP Hub managed services are monitored around the clock, with alerts triaged by engineers and incidents owned from first response to resolution.",
    availability: "24/7 monitoring and incident management",
    cta: { label: "Managed services", href: "/services/managed" },
  },
];

export type HoursRow = { service: string; hours: string; confirm?: ConfirmId; proposed?: string };

export const hoursTable: HoursRow[] = [
  { service: "Licensing and billing support", hours: site.supportHours, confirm: "supportHours", proposed: site.supportHoursProposed },
  { service: "HubX Service Desk tickets", hours: "Business hours, tracked with priority and SLA state" },
  { service: "Microsoft escalation (Premier support)", hours: "Initiated by MSP Hub as issues require" },
  { service: "Managed-services monitoring and incident management", hours: "24/7 for environments under MSP Hub managed services" },
];

export const ticketChecklist = {
  title: "What to include in a ticket",
  items: [
    "The customer or tenant it concerns, and the users affected",
    "The subscription or SKU, if it is about licensing or billing",
    "What changed, and when it started",
    "The invoice or order number for billing questions",
    "How urgent it is for the business, so the priority is right",
  ],
};

export type SupportFaq = { q: string; a: string; confirm?: ConfirmId };

export const supportFaq: SupportFaq[] = [
  {
    q: "What are the support hours?",
    a: "Licensing and billing support runs business hours, US Central and Eastern. Managed environments are monitored 24/7 under MSP Hub managed services.",
    confirm: "supportHours",
  },
  {
    q: "How does billing work?",
    a: "Calendar-month billing, one month in advance, with daily-rate proration for mid-month starts and changes, on Net 30 terms. Invoices and statements are in HubX with PDF download, including a view of what changed since the last period.",
  },
  {
    q: "I am a customer of an MSP Hub partner. Where do I go?",
    a: "Your partner is your first contact, and your tickets live in the HubX Service Desk, where your partner sees them too. Microsoft escalations run through MSP Hub.",
  },
  {
    q: "Is 24/7 support included with licensing?",
    a: "Licensing and billing support is business hours. Around-the-clock monitoring and incident management applies to environments under MSP Hub managed services.",
  },
  {
    q: "How do I ask about a partner-to-partner transfer?",
    a: "Open a Service Desk ticket or use the contact form with the topic “Partner-to-partner transfer”. The deal desk runs transfers and will confirm the status with you.",
  },
  {
    q: "Where do I log in?",
    a: `HubX is at ${site.hubxLoginUrl.replace("https://", "")}. If you used the previous MSP Hub platform, your account carried over to HubX.`,
    confirm: "loginContinuity",
  },
];

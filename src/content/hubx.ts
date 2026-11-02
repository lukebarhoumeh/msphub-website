import {
  BarChart3,
  Bot,
  Cable,
  LayoutGrid,
  ShoppingCart,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type Capability = { icon: LucideIcon; title: string; body: string };

/** Six capabilities from the company deck (p3). */
export const hubxCapabilities: Capability[] = [
  {
    icon: LayoutGrid,
    title: "Centralized management",
    body: "One platform for IT, finance, and purchasing to manage all licenses anytime, anywhere.",
  },
  {
    icon: BarChart3,
    title: "Visibility & reporting",
    body: "See which licenses are used, reduce waste, and maximize your software investment.",
  },
  {
    icon: Wallet,
    title: "Cost tracking",
    body: "Track license counts, usage, renewals, and costs to prevent overages and surprises.",
  },
  {
    icon: Cable,
    title: "Seamless integration",
    body: "Connect with your existing tools and systems through flexible API integrations.",
  },
  {
    icon: Bot,
    title: "AI-powered insights",
    body: "Automated invoice reconciliation and intelligent recommendations to reduce spend.",
  },
  {
    icon: ShoppingCart,
    title: "Self-service procurement",
    body: "Purchase, provision, and manage licenses directly. No middlemen, no delays.",
  },
];

export const hubxAudiences = [
  {
    who: "For MSPs & VARs",
    title: "Every customer tenant in one console.",
    body: "Resell Microsoft at Tier-1 direct pricing without building a licensing desk. HubX gives your team one view across all customers, with billing and provisioning handled.",
    points: [
      "Tier-1 direct CSP pricing on the Microsoft catalog",
      "Multi-tenant management: licenses, orders, renewals per customer",
      "Automated billing and invoice reconciliation",
      "Schedule renewals and add-on orders in advance",
      "MSP Hub's services team behind you for migrations and support",
    ],
  },
  {
    who: "For your business",
    title: "IT, finance, and procurement on the same page.",
    body: "Buy, provision, and manage Microsoft licenses directly, no middlemen, no delays, and see exactly what you pay for, who uses it, and when it renews.",
    points: [
      "Self-service purchasing and provisioning",
      "Usage visibility to cut unused seats",
      "Cost tracking, renewal alerts, and forecasting",
      "AI recommendations to right-size plans",
      "Integrated support tickets with severity and attachments",
    ],
  },
] as const;

export const hubxSteps = [
  {
    title: "Connect your tenants",
    body: "Link one Microsoft tenant or forty-two. Existing CSP agreements and subscriptions are transferred, not re-bought.",
  },
  {
    title: "See everything",
    body: "Every license, assignment, renewal date, invoice, and cost, reconciled automatically and reported the way finance needs it.",
  },
  {
    title: "Buy, assign, optimize",
    body: "Provision in minutes, schedule renewals and add-ons ahead of time, and act on Hub AI recommendations to cut waste.",
  },
];

/** Hub AI feature list carried over from the current msphub.com. */
export const hubAiFeatures = [
  { title: "Centralized information access", body: "Orders, products, licenses, and subscriptions, answered in one place." },
  { title: "Partner-centric insights", body: "Customer information, associated products, order specifics, and license status for every tenant." },
  { title: "Customer-focused queries", body: "Visibility into orders and license assignments for end users." },
  { title: "License tracking", body: "Assigned and remaining licenses, so inventory and forecasting stay current." },
];

export const licensingCatalog = [
  "Microsoft 365 E3",
  "Microsoft 365 E5",
  "Business Premium",
  "Copilot for Microsoft 365",
  "Defender",
  "Teams Phone",
  "Dynamics 365",
  "Power BI",
  "Azure consumption",
];

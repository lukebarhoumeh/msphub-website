import { Code2, Layers, ShieldCheck, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Branch = {
  slug: "hubx" | "professional" | "managed" | "development";
  name: string;
  href: string;
  icon: LucideIcon;
  short: string;
  description: string;
  linkLabel: string;
};

/** The four branches in display order: HubX first, then the three service practices. */
export const branches: Branch[] = [
  {
    slug: "hubx",
    name: "HubX",
    href: "/hubx",
    icon: Layers,
    short: "The Microsoft portal for licensing, procurement, and spend.",
    description:
      "One platform for IT, finance, and purchasing to see every license, cost, and renewal, and to buy, provision, and optimize directly. Built for MSPs managing many tenants and for businesses managing their own.",
    linkLabel: "Explore HubX",
  },
  {
    slug: "professional",
    name: "Professional services",
    href: "/services/professional",
    icon: ShieldCheck,
    short: "Cloud expertise, delivered.",
    description:
      "Microsoft 365 and Exchange migrations, Intune and Autopilot, Azure infrastructure and Virtual Desktop, Defender and Zero Trust, Power Platform and Fabric.",
    linkLabel: "Microsoft professional services",
  },
  {
    slug: "managed",
    name: "Managed services",
    href: "/services/managed",
    icon: Clock,
    short: "Improved uptime, security, and strategic growth.",
    description:
      "24/7 monitoring, alerting, and incident management across Microsoft 365, cloud, and databases, run to agreed SLAs with clear ownership and direct Microsoft escalation.",
    linkLabel: "Managed services",
  },
  {
    slug: "development",
    name: "Development as a service",
    href: "/services/development",
    icon: Code2,
    short: "Faster deployments. Improved collaboration. Scalability.",
    description:
      "Custom .NET and cloud-native applications, CI/CD and infrastructure as code, and AI development, from Copilot rollouts to purpose-built agents and automation.",
    linkLabel: "Development & AI",
  },
];

export const serviceBranches = branches.filter((b) => b.slug !== "hubx");

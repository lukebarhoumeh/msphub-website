import type { ConfirmId } from "@/content/confirmations";

/**
 * Credentials and badges. Only entries with `active: true` ever render
 * (`CredentialBadges`). Microsoft badge names follow the Aug 2026 naming
 * ("Solutions Partner for …"); "Gold/Silver" no longer exist.
 *
 * Microsoft Solutions Partner program (Partner Center, Nov 2 2026): the
 * enrolled solution areas render as text chips reading "Enrolled". Scores,
 * points, and percentages are never shown. Designation badge artwork is used
 * only once Luke confirms a designation as attained and supplies the file
 * (set `active: true` and `logo` on the designation entry).
 */
export type Credential = {
  id: string;
  /** Display name, exactly as the issuer writes it. */
  name: string;
  /** Short qualifier shown under the name (region, year, scope). */
  qualifier?: string;
  issuer: "microsoft" | "iso" | "award";
  active: boolean;
  /** Badge artwork once the file is supplied (Logo Builder / issuer kit). */
  logo?: string;
  href?: string;
  confirm?: ConfirmId;
};

export const credentials: Credential[] = [
  {
    id: "csp-direct-bill",
    name: "Microsoft CSP direct-bill partner",
    qualifier: "Tier-1 Direct · North America",
    issuer: "microsoft",
    active: true,
  },
  {
    id: "iso-27001",
    name: "ISO/IEC 27001:2022",
    qualifier: "Certified information security management system",
    issuer: "iso",
    active: true,
  },
  {
    id: "channelpro-2025",
    name: "ChannelPro LIVE Chicago 2025",
    qualifier: "Editor's Choice Award",
    issuer: "award",
    active: true,
    logo: "/proof/awards/channelpro-editors-choice-2025.webp",
    confirm: "awardTitle",
  },
  // Designation badges: artwork only once attained and supplied.
  {
    id: "sp-cloud-ai-platforms",
    name: "Solutions Partner for Cloud & AI Platforms",
    issuer: "microsoft",
    active: false,
    confirm: "badgesHeld",
  },
  {
    id: "sp-ai-business-solutions",
    name: "Solutions Partner for AI Business Solutions",
    issuer: "microsoft",
    active: false,
    confirm: "badgesHeld",
  },
  {
    id: "sp-security",
    name: "Solutions Partner for Security",
    issuer: "microsoft",
    active: false,
    confirm: "badgesHeld",
  },
];

export const activeCredentials = credentials.filter((c) => c.active);

export type SolutionAreaStatus = "enrolled" | "in-progress";

export type SolutionArea = {
  id: string;
  /** Solution area (pathway) name as Partner Center writes it. */
  name: string;
  /** Designation the area counts toward. */
  designation: "Cloud & AI Platforms" | "AI Business Solutions" | "Security";
  status: SolutionAreaStatus;
};

/** Microsoft Solutions Partner program status per Partner Center (Nov 2 2026). Only `enrolled` areas render. */
export const solutionAreas: SolutionArea[] = [
  { id: "data-ai", name: "Data & AI", designation: "Cloud & AI Platforms", status: "enrolled" },
  { id: "digital-app-innovation", name: "Digital & App Innovation", designation: "Cloud & AI Platforms", status: "enrolled" },
  { id: "infrastructure", name: "Infrastructure", designation: "Cloud & AI Platforms", status: "enrolled" },
  { id: "modern-work", name: "Modern Work", designation: "AI Business Solutions", status: "enrolled" },
  { id: "security", name: "Security", designation: "Security", status: "enrolled" },
  { id: "business-applications", name: "Business Applications", designation: "AI Business Solutions", status: "in-progress" },
];

export const enrolledSolutionAreas = solutionAreas.filter((a) => a.status === "enrolled");

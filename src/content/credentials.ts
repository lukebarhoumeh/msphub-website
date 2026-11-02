import type { ConfirmId } from "@/content/confirmations";

/**
 * Credentials and badges. Only entries with `active: true` ever render
 * (`CredentialBadges`). Microsoft badge names follow the Aug 2026 naming
 * ("Solutions Partner for …"); "Gold/Silver" no longer exist. Set a badge
 * active only when Partner Center → Logo Builder shows it as held.
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
    qualifier: "Certified delivery organization",
    issuer: "iso",
    active: true,
    confirm: "isoEntity",
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
  {
    id: "sp-cloud-ai-platforms",
    name: "Solutions Partner for Cloud & AI Platforms",
    issuer: "microsoft",
    active: false,
    confirm: "badgesHeld",
  },
];

export const activeCredentials = credentials.filter((c) => c.active);

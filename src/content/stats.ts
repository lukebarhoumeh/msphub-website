import type { ConfirmId } from "@/content/confirmations";

export type Stat = {
  id: string;
  value: string;
  suffix?: string;
  label: string;
  /** Hidden in production until the number is confirmed. */
  confirm?: ConfirmId;
  /** When true the stat is published even though a decision chip shows in preview. */
  publish: boolean;
};

/**
 * One number per stat, the single source for every page (trust strip, KPI
 * band, About). Public figures per Luke, Nov 3 2026: 478+ companies and
 * 600K+ Microsoft licenses (supersedes the handoff's 500K+ for public copy).
 */
export const stats: Stat[] = [
  { id: "since", value: "1999", label: "Founded as ReadyNetworks", publish: true },
  { id: "companies", value: "478", suffix: "+", label: "Companies served", publish: true },
  { id: "licenses", value: "600K", suffix: "+", label: "Microsoft licenses managed", publish: true },
  { id: "skus", value: "7,600", suffix: "+", label: "SKUs in the HubX catalog", publish: true },
  { id: "headcount", value: "100", suffix: "+", label: "Staff on the services team", publish: false, confirm: "servicesHeadcount" },
];

export const publishedStats = stats.filter((s) => s.publish);

export function getStat(id: string): Stat {
  const stat = stats.find((s) => s.id === id);
  if (!stat) throw new Error(`Unknown stat: ${id}`);
  return stat;
}

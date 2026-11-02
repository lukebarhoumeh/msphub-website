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

/** One number per stat. Values and provenance per the private handoff §1.2. */
export const stats: Stat[] = [
  { id: "since", value: "1999", label: "Founded as ReadyNetworks", publish: true },
  { id: "companies", value: "478", suffix: "+", label: "Companies served", publish: true, confirm: "companiesNumber" },
  { id: "licenses", value: "500K", suffix: "+", label: "Microsoft licenses managed", publish: true, confirm: "licensesNumber" },
  { id: "skus", value: "7,600", suffix: "+", label: "SKUs in the HubX catalog", publish: true },
  { id: "headcount", value: "100", suffix: "+", label: "Staff on the services team", publish: false, confirm: "servicesHeadcount" },
];

export const publishedStats = stats.filter((s) => s.publish);

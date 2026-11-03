/**
 * Vendor, distribution, and alliance ecosystem, rendered as text chips until
 * logo files and written permission exist (handoff §2 #9–10; Luke's round-2
 * decision #2). Reseller/MSP partner names and customer names never appear.
 * `logo` stays undefined until permission; `LogoCloud` only renders artwork
 * when it is set.
 */
export type EcosystemEntry = {
  name: string;
  kind: "vendor" | "distribution" | "alliance";
  note?: string;
  logo?: string;
};

/** Vendors transacted through the deal desk today (brief 6.2: the wall is pruned to what is actually sold). */
export const vendors: EcosystemEntry[] = [
  { name: "Microsoft", kind: "vendor" },
  { name: "Cisco Meraki", kind: "vendor" },
  { name: "Fortinet", kind: "vendor" },
  { name: "Coro", kind: "vendor", note: "Publisher in the HubX catalog" },
];

/** Distribution relationships (kept as-is) and alliances already public. */
export const alliances: EcosystemEntry[] = [
  { name: "Ingram Micro", kind: "distribution", note: "Distribution" },
  { name: "TD SYNNEX", kind: "distribution", note: "Distribution" },
  { name: "Trust X Alliance", kind: "alliance", note: "Member community of IT solution providers" },
  { name: "Frontier Technologies", kind: "alliance", note: "Strategic alliance" },
  { name: "P2 Telecom", kind: "alliance", note: "Partner events and co-selling" },
];

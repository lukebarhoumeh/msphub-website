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

/** Vendors already shown on the previous msphub.com or in the company deck. */
export const vendors: EcosystemEntry[] = [
  { name: "Microsoft", kind: "vendor" },
  { name: "Cisco Meraki", kind: "vendor" },
  { name: "Fortinet", kind: "vendor" },
  { name: "Palo Alto Networks", kind: "vendor" },
  { name: "SentinelOne", kind: "vendor" },
  { name: "Arctic Wolf", kind: "vendor" },
  { name: "Barracuda", kind: "vendor" },
  { name: "Adlumin", kind: "vendor" },
  { name: "Veeam", kind: "vendor" },
  { name: "Nutanix", kind: "vendor" },
  { name: "VMware", kind: "vendor" },
  { name: "Extreme Networks", kind: "vendor" },
  { name: "HPE Aruba Networking", kind: "vendor" },
  { name: "APC by Schneider Electric", kind: "vendor" },
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

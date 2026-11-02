/**
 * Vendor and alliance ecosystem, rendered as text chips until logo files and
 * written permission exist (handoff §2 #9–10). `logo` stays undefined until
 * then; `LogoCloud` only renders artwork when it is set.
 */
export type EcosystemEntry = {
  name: string;
  kind: "vendor" | "distribution" | "alliance";
  note?: string;
  logo?: string;
};

/** Vendor set carried over from the previous msphub.com (13), pending Luke's pruning. */
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
];

/** Distribution and alliance relationships named in the handoff §2 #10; text until permission. */
export const alliances: EcosystemEntry[] = [
  { name: "Ingram Micro", kind: "distribution", note: "Distribution" },
  { name: "TD SYNNEX", kind: "distribution", note: "Distribution" },
  { name: "Coro", kind: "alliance", note: "Billing partnership; publisher in the HubX catalog" },
  { name: "Trust X Alliance", kind: "alliance", note: "Member community of IT solution providers" },
  { name: "Frontier Technologies", kind: "alliance", note: "Strategic alliance" },
  { name: "P2 Telecom", kind: "alliance", note: "Partner events and co-selling" },
];

/**
 * Proof carried over from the current msphub.com (legitimate content only;
 * theme-demo material is excluded). Permission re-checks are tagged in the UI.
 */
export type Testimonial = { text: string; name: string; role: string };

export const testimonials: Testimonial[] = [
  {
    text: "I'm a huge fan! It has a well-designed layout that is super easy to navigate. I love the ability to view my licenses in a whole new way. I can filter columns and see the information that's pertinent to my business. The scheduling order feature covering renewals and add-on orders is a game-changer.",
    name: "Erin Michaels",
    role: "Product Manager – Cloud, MNJ Technologies",
  },
  {
    text: "MSP Hub empowers me to make decisions ahead of time, providing me with peace of mind, and I can trust that the tool will make my changes seamlessly on the day I selected. The integrated support ticket system is a true stand-out: I can create, respond to, and track updates all within the same portal.",
    name: "Erin Michaels",
    role: "Product Manager – Cloud, MNJ Technologies",
  },
];

export const vendorLogos = [
  { name: "Nutanix", src: "/proof/vendors/nutanix.webp" },
  { name: "SentinelOne", src: "/proof/vendors/sentinelone.webp" },
  { name: "Barracuda", src: "/proof/vendors/barracuda.webp" },
  { name: "Adlumin", src: "/proof/vendors/adlumin.webp" },
  { name: "Extreme Networks", src: "/proof/vendors/extreme-networks.webp" },
  { name: "Veeam", src: "/proof/vendors/veeam.webp" },
  { name: "HPE Aruba Networking", src: "/proof/vendors/hpe-aruba.webp" },
  { name: "Fortinet", src: "/proof/vendors/fortinet.webp" },
  { name: "VMware", src: "/proof/vendors/vmware.webp" },
  { name: "Palo Alto Networks", src: "/proof/vendors/palo-alto-networks.webp" },
  { name: "Arctic Wolf", src: "/proof/vendors/arctic-wolf.webp" },
  { name: "APC by Schneider Electric", src: "/proof/vendors/apc.webp" },
] as const;

/** Alliances announced on the MSP Hub LinkedIn page (Sep–Oct 2026). Logos pending permission. */
export const alliances = [
  { name: "Ingram Micro", note: "Distribution and Ingram Micro Cloud marketplace" },
  { name: "Trust X Alliance", note: "Member community of IT solution providers" },
  { name: "Frontier Technologies", note: "Strategic alliance: federal contracting and compliance" },
  { name: "P2 Telecom", note: "Partner events and co-selling" },
] as const;

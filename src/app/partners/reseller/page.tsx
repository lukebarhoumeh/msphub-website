import { ProgramPage } from "@/components/partners/program-page";
import { programDetails } from "@/content/partners";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Reseller partner program — resell Microsoft at Tier-1 direct pricing through HubX",
  description: "For MSPs and VARs: Tier-1 direct Microsoft pricing on 7,600+ SKUs, every customer tenant in HubX, partner-branded customer invoices, margin per customer, and MSP Hub's services bench behind you.",
  path: "/partners/reseller",
});

export default function ResellerPartnerPage() {
  return <ProgramPage program={programDetails.reseller} />;
}

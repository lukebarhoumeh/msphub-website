import { ProgramPage } from "@/components/partners/program-page";
import { programDetails } from "@/content/partners";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Platform partner program — HubX for direct-bill CSPs on your own Partner Center tenant",
  description: "Direct-bill CSPs license HubX as a platform: quoting, provisioning, billing reconciliation, dashboards, scheduled reports, and HubAI on top of your own Microsoft Partner Center.",
  path: "/partners/platform",
});

export default function PlatformPartnerPage() {
  return <ProgramPage program={programDetails.platform} />;
}

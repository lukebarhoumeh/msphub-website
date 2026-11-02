import { ProgramPage } from "@/components/partners/program-page";
import { programDetails } from "@/content/partners";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Agent and referral partner program — bring the opportunity, MSP Hub sells and delivers",
  description: "For technology advisors, agents, and consultants: register opportunities, MSP Hub sells and delivers Microsoft licensing and services, and you earn an evergreen commission with weekly pipeline visibility.",
  path: "/partners/agents",
});

export default function AgentPartnerPage() {
  return <ProgramPage program={programDetails.agent} />;
}

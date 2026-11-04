import { ArrowRight } from "lucide-react";
import { Chapter, ChipRow, DotList, InkLink, NextStep, RuleList, inkTone, monoLabel } from "@/components/ink/interior";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { alliances, vendors } from "@/content/ecosystem";
import { partnerEconomics, partnerEnablement, partnerPrograms, partnerSteps } from "@/content/partners";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({
  title: "Partners — reseller, agent, and platform programs",
  description: "Three ways to partner with MSP Hub: resell Microsoft at Tier-1 direct pricing through HubX, refer opportunities as an agent, or run HubX on your own Partner Center tenant as a direct-bill CSP.",
  path: "/partners",
});

const why = [
  {
    title: "Tier-1 direct pricing through HubX",
    body: "Resell the Microsoft catalog at Tier-1 direct pricing and manage every customer tenant from one console.",
  },
  {
    title: "A services bench as your back office",
    body: "Migrations, Azure projects, security work, and managed operations delivered under your relationship.",
  },
  {
    title: "Co-selling",
    body: "Joint pursuits on licensing-led deals, with MSP Hub's engineers on scoping calls.",
  },
  {
    title: "Enablement",
    body: "Product training, quoting support from the deal desk, and marketing collateral for your practice.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        tone="light"
        eyebrow="Partners"
        title="Grow with MSP Hub."
        lead="For MSPs, VARs, agents, and direct-bill CSPs who want Tier-1 Microsoft pricing, a services team behind them, and a platform their customers can see themselves in."
      >
        <ButtonLink href="/partners/apply">
          Apply to partner
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="/demo" variant="outline">
          Schedule a HubX demo
        </ButtonLink>
      </PageHero>

      <Chapter tone="pearl" pad="flush-top" title="Licensing is the tip of the spear. Services make you sticky." headingWidth="max-w-[20ch]">
        <RuleList tone="pearl" numbered columns={4} items={why} />
      </Chapter>

      <Chapter
        tone="ink"
        id="programs"
        title="Resell, refer, or run the platform."
        lead={<NeedsConfirm id="partnerTiers" fallback="One program per path, with pricing by volume. No tiers to climb." />}
      >
        <RuleList
          tone="ink"
          columns={3}
          items={partnerPrograms.map((program) => ({
            id: `program-${program.id}`,
            label: program.who,
            title: program.name,
            children: (
              <>
                <DotList tone="ink" marker="neutral" items={program.gets} />
                {program.id === "reseller" ? (
                  <p className={cn("mt-4 max-w-[44ch] text-[15px] leading-[1.6]", inkTone.ink.muted)}>{partnerEconomics}</p>
                ) : null}
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href={program.href} variant="glass" size="sm">
                    About the program
                  </ButtonLink>
                  <InkLink href={`/partners/apply?program=${program.id}`} tone="ink" className="px-1 text-[15px]">
                    Apply
                  </InkLink>
                </div>
              </>
            ),
          }))}
        />
      </Chapter>

      <Chapter tone="pearl" title="Apply, onboard, transact." lead="The same path for every program. Deal registration is a form to the partner team.">
        <RuleList tone="pearl" numbered columns={3} items={partnerSteps} />
        <div className="mt-12 grid gap-6 border-t border-[#0b1020]/15 pt-6 lg:grid-cols-[180px_minmax(0,1fr)]">
          <p className={cn(monoLabel, inkTone.pearl.faint)}>Enablement</p>
          <DotList tone="pearl" columns={2} marker="neutral" items={partnerEnablement} />
        </div>
      </Chapter>

      <Chapter tone="pearl" pad="tight" size="md" title="Who we work with." headingWidth="max-w-[24ch]">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="border-t border-[#0b1020]/15 pt-5">
            <p className={cn(monoLabel, inkTone.pearl.faint)}>Distribution & alliances</p>
            <ChipRow tone="pearl" className="mt-4" label="Distribution and alliance relationships" items={alliances.map((a) => ({ label: a.name, title: a.note }))} />
            <p className={cn("mt-4 text-[13px]", inkTone.pearl.faint)}>
              <NeedsConfirm id="allianceLogos" fallback={null}>
                Names shown as text until logo files and written permission are in hand.
              </NeedsConfirm>
            </p>
          </div>
          <div className="border-t border-[#0b1020]/15 pt-5">
            <p className={cn(monoLabel, inkTone.pearl.faint)}>Vendor ecosystem</p>
            <p className={cn("mt-3 max-w-[48ch] text-[15px] leading-[1.6]", inkTone.pearl.muted)}>
              Beyond Microsoft, MSP Hub procures and supports across hardware and networking, hyperscalers, security and data protection, and productivity vendors.
            </p>
            <ChipRow tone="pearl" className="mt-4" label="Vendors" items={vendors.map((v) => ({ label: v.name, title: v.note }))} />
            <p className={cn("mt-4 text-[13px]", inkTone.pearl.faint)}>
              <NeedsConfirm id="vendorLogos" fallback={null}>
                Names shown as text until logo files and written permission are in hand.
              </NeedsConfirm>
            </p>
          </div>
        </div>
      </Chapter>

      <NextStep
        tone="ink"
        title="Become a partner."
        lead="Tell us about your customers and the Microsoft workloads you sell. We set up a call with the partner team."
        primary={{ label: "Apply to partner", href: "/partners/apply" }}
        secondary={[{ label: "Schedule a HubX demo", href: "/demo" }]}
      />
    </>
  );
}

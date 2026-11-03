import { Suspense } from "react";
import { LeadForm } from "@/components/forms/lead-form";
import { DotList, Panel, RuleList, inkTone, monoLabel } from "@/components/ink/interior";
import { PageHero } from "@/components/marketing/page-hero";
import { Container } from "@/components/ui/section";
import { applyPage, partnerEnablement, programIds, type PartnerProgramId } from "@/content/partners";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({
  title: "Apply to partner with MSP Hub",
  description: "Apply to the reseller, agent, or platform partner program. Tell us about your business and your customers; the partner team replies with next steps and a call.",
  path: "/partners/apply",
});

/** Reads `?program=` at request time; isolated so the rest of the page prerenders. */
async function ApplyForm({ searchParams }: { searchParams: PageProps<"/partners/apply">["searchParams"] }) {
  const params = await searchParams;
  const requested = typeof params.program === "string" ? params.program : undefined;
  const program = requested && (programIds as readonly string[]).includes(requested) ? (requested as PartnerProgramId) : undefined;
  return <LeadForm kind="partner" defaultValues={program ? { program } : undefined} />;
}

export default function PartnerApplyPage({ searchParams }: PageProps<"/partners/apply">) {
  return (
    <>
      <PageHero eyebrow={applyPage.eyebrow} title={applyPage.title} lead={applyPage.lead} />

      <section data-surface="ink" className="bg-[#0b1020] pb-[clamp(64px,7vw,104px)] text-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
            <div>
              <p className={cn(monoLabel, inkTone.ink.muted)}>What happens next</p>
              <h2 className="mt-4 font-display text-[30px] leading-[1.1] font-bold tracking-[-0.02em] lg:text-[40px]">Apply, onboard, transact.</h2>
              <p className={cn("mt-4 max-w-[46ch] text-[17px] leading-[1.6]", inkTone.ink.muted)}>
                The same path for every program. Deal registration is a form to the partner team.
              </p>
              <RuleList tone="ink" numbered columns={1} titleSize="md" className="mt-8 gap-y-6" items={applyPage.nextSteps} />
              <div className="mt-10 border-t border-white/15 pt-5">
                <p className={cn(monoLabel, inkTone.ink.faint)}>Enablement</p>
                <DotList tone="ink" className="mt-4" items={partnerEnablement} />
              </div>
            </div>
            <Panel tone="ink" className="sm:p-10">
              <h2 className="font-display text-[30px] leading-[1.1] font-bold tracking-[-0.02em]">Partner application</h2>
              <p className={cn("mt-3 mb-7 text-[16px] leading-[1.6]", inkTone.ink.muted)}>Pick the program, tell us about your customers, and we take it from there.</p>
              <Suspense fallback={<LeadForm kind="partner" />}>
                <ApplyForm searchParams={searchParams} />
              </Suspense>
            </Panel>
          </div>
        </Container>
      </section>
    </>
  );
}

import { Suspense } from "react";
import { LeadForm } from "@/components/forms/lead-form";
import { CheckList } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { GlassCard } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/typography";
import { applyPage, partnerEnablement, programIds, type PartnerProgramId } from "@/content/partners";
import { pageMetadata } from "@/lib/metadata";

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

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
            <div className="space-y-6">
              <div>
                <Eyebrow>What happens next</Eyebrow>
                <Display className="mt-3.5" size="md">
                  Apply, onboard, transact.
                </Display>
                <Lead className="mt-3 text-base">The same path for every program. Deal registration is a form to the partner team.</Lead>
              </div>
              <ol className="grid gap-3">
                {applyPage.nextSteps.map((step, i) => (
                  <li key={step.title} className="glass flex gap-4 p-5">
                    <span className="font-display text-[2rem] leading-none text-brand-orange">{i + 1}</span>
                    <div>
                      <h3 className="font-semibold text-white">{step.title}</h3>
                      <p className="mt-1 text-[14.5px] leading-relaxed text-white/70">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <GlassCard>
                <p className="font-mono text-xs font-semibold tracking-[0.12em] text-brand-orange uppercase">Enablement</p>
                <CheckList items={partnerEnablement} className="mt-4" />
              </GlassCard>
            </div>
            <div className="glass glass-lg p-7 sm:p-10">
              <Display size="md" className="mb-2">
                Partner application
              </Display>
              <Lead className="mb-7 text-base">Pick the program, tell us about your customers, and we take it from there.</Lead>
              <Suspense fallback={<LeadForm kind="partner" />}>
                <ApplyForm searchParams={searchParams} />
              </Suspense>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

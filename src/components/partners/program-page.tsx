import { ArrowRight } from "lucide-react";
import { Chapter, DotList, NextStep, RuleList, inkTone, monoLabel } from "@/components/ink/interior";
import { FaqSection } from "@/components/marketing/faq-section";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { partnerEnablement, partnerPrograms, type ProgramDetail } from "@/content/partners";
import { cn } from "@/lib/cn";

/** Shared layout for the three partner program pages; all copy comes from `content/partners.ts`. */
export function ProgramPage({ program }: { program: ProgramDetail }) {
  const others = partnerPrograms.filter((p) => p.id !== program.id);
  return (
    <>
      <PageHero eyebrow={program.eyebrow} title={program.title} lead={program.lead}>
        <ButtonLink href={program.cta.href}>
          {program.cta.label}
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="/demo" variant="glass">
          Schedule a HubX demo
        </ButtonLink>
      </PageHero>

      <Chapter tone="ink" pad="flush-top" size="md" title="Built for the way you already sell.">
        <RuleList tone="ink" columns={3} titleSize="md" items={program.forWhom} />
      </Chapter>

      <Chapter tone="pearl" title="What the program gives you.">
        <RuleList tone="pearl" columns={3} titleSize="md" items={program.includes} />
        <div className="mt-12 grid gap-4 border-t border-[#0b1020]/15 pt-6 lg:grid-cols-[180px_minmax(0,1fr)]">
          <p className={cn(monoLabel, inkTone.pearl.faint)}>Commercial terms</p>
          <p className={cn("max-w-[64ch] text-[16px] leading-[1.6]", inkTone.pearl.muted)}>
            {program.economics.confirm ? <NeedsConfirm id={program.economics.confirm} fallback={program.economics.body} /> : program.economics.body}
          </p>
        </div>
      </Chapter>

      <Chapter tone="ink" title="From application to the first billing run.">
        <RuleList tone="ink" numbered columns={program.steps.length === 4 ? 4 : 3} titleSize="md" items={program.steps} />
        <div className="mt-12 grid gap-6 border-t border-white/15 pt-6 lg:grid-cols-[180px_minmax(0,1fr)]">
          <p className={cn(monoLabel, inkTone.ink.faint)}>Enablement</p>
          <DotList tone="ink" columns={2} items={partnerEnablement} />
        </div>
      </Chapter>

      <Chapter tone="pearl" size="md" title="Program questions, answered.">
        <FaqSection items={program.faq} tone="light" variant="rule" className="max-w-[860px]" />
      </Chapter>

      <Chapter tone="pearl" pad="tight" size="md" title="Two more ways to partner.">
        <RuleList
          tone="pearl"
          columns={2}
          titleSize="md"
          items={others.map((p) => ({
            id: `program-${p.id}`,
            label: p.who,
            title: p.name,
            children: <DotList tone="pearl" items={p.gets.slice(0, 3)} />,
            link: { label: p.name, href: p.href },
          }))}
        />
      </Chapter>

      <NextStep
        tone="ink"
        title="Apply to partner with MSP Hub."
        lead="Tell us about your business and your customers. The partner team replies with next steps and a call."
        primary={{ label: program.cta.label, href: program.cta.href }}
        secondary={[{ label: "Schedule a HubX demo", href: "/demo" }]}
      />
    </>
  );
}

import { ArrowRight } from "lucide-react";
import { DeviceFrame } from "@/components/ink/device-frame";
import { EvidenceFigure } from "@/components/ink/evidence";
import { Parallax } from "@/components/ink/flow";
import { Chapter, DotList, InkLink, NextStep, RuleList, inkTone, monoLabel } from "@/components/ink/interior";
import { Spotlight } from "@/components/ink/motion";
import { WideOnly } from "@/components/ink/wide-only";
import { FaqSection } from "@/components/marketing/faq-section";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { captures, truthLabel } from "@/content/evidence";
import { partnerEnablement, partnerPrograms, type ProgramDetail } from "@/content/partners";
import { cn } from "@/lib/cn";

/**
 * The customer list in a browser frame beside the hero copy (lg+). `WideOnly`
 * keeps the image off phones; its box reserves the frame and caption
 * (1.125 × width + 64 px at the narrowest lg column, 420 px at the widest),
 * so the hero never shifts when the frame mounts.
 */
function CustomersFrame() {
  return (
    <WideOnly className="ml-auto hidden aspect-[100/131] w-full max-w-[420px] lg:block">
      <figure className="m-0">
        <Parallax range={24}>
          <Spotlight className="tilt tilt-hero rounded-[18px]">
            <DeviceFrame variant="browser" capture={captures.customersList} path="/customers" priority />
          </Spotlight>
        </Parallax>
        <figcaption className={cn(monoLabel, "mt-3 leading-4", inkTone.ink.muted)}>{truthLabel}</figcaption>
      </figure>
    </WideOnly>
  );
}

/** Shared layout for the three partner program pages; all copy comes from `content/partners.ts`. */
export function ProgramPage({ program }: { program: ProgramDetail }) {
  const others = partnerPrograms.filter((p) => p.id !== program.id);
  // Agents bring opportunities rather than run customer tenants, so their page shows what they can bring in place of HubX (spec §6).
  const bring = program.bring;
  return (
    <>
      <PageHero eyebrow={program.eyebrow} title={program.title} lead={program.lead} anchors={program.anchors} aside={bring ? undefined : <CustomersFrame />} asideBelowLg={false}>
        <ButtonLink href={program.cta.href}>
          {program.cta.label}
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href={program.voice.secondary.href} variant="glass">
          {program.voice.secondary.label}
        </ButtonLink>
      </PageHero>

      <Chapter tone="ink" id="for-whom" pad="flush-top" size="md" title={program.voice.forWhomTitle}>
        <RuleList tone="ink" columns={3} titleSize="md" items={program.forWhom} />
      </Chapter>

      <Chapter tone="ink" id="includes" title="What the program gives you.">
        <RuleList tone="ink" columns={3} titleSize="md" items={program.includes} />
        <div className={cn("mt-12 grid gap-4 border-t pt-6 lg:grid-cols-[180px_minmax(0,1fr)]", inkTone.ink.rule)}>
          <p className={cn(monoLabel, inkTone.ink.faint)}>Commercial terms</p>
          <p className={cn("max-w-[64ch] text-[16px] leading-[1.6]", inkTone.ink.muted)}>
            {program.economics.confirm ? <NeedsConfirm id={program.economics.confirm} fallback={program.economics.body} /> : program.economics.body}
          </p>
        </div>
      </Chapter>

      {bring ? (
        <Chapter tone="pearl" id="bring" title="What you can bring.">
          <RuleList
            linkUnderline="neutral"
            tone="pearl"
            columns={3}
            titleSize="md"
            items={bring.map((item) => ({ title: item.title, body: item.body, link: { label: item.linkLabel, href: item.href } }))}
          />
        </Chapter>
      ) : (
        <Chapter tone="pearl" id="in-hubx" title="Every customer tenant, in HubX.">
          <div className="grid gap-12 lg:grid-cols-2">
            <EvidenceFigure capture={captures.customersList} tone="pearl" accent={false} />
            <EvidenceFigure capture={captures.customerProductsHubx} tone="pearl" accent={false} />
          </div>
          <InkLink href="/hubx/features/customers" tone="pearl" underline="neutral" className="mt-10">
            Explore Customers in HubX
          </InkLink>
        </Chapter>
      )}

      <Chapter tone="ink" id="steps" title={program.voice.stepsTitle}>
        <RuleList tone="ink" numbered columns={program.steps.length === 4 ? 4 : 3} titleSize="md" items={program.steps} />
        <div className={cn("mt-12 grid gap-6 border-t pt-6 lg:grid-cols-[180px_minmax(0,1fr)]", inkTone.ink.rule)}>
          <p className={cn(monoLabel, inkTone.ink.faint)}>Enablement</p>
          <DotList tone="ink" columns={2} marker="neutral" items={partnerEnablement} />
        </div>
      </Chapter>

      <Chapter tone="pearl" id="faq" size="md" title="Program questions, answered.">
        <FaqSection items={program.faq} tone="light" variant="rule" className="max-w-[860px]" />
      </Chapter>

      <Chapter tone="ink" pad="tight" size="md" title="Two more ways to partner.">
        <RuleList
          tone="ink"
          columns={2}
          titleSize="md"
          items={others.map((p) => ({
            id: `program-${p.id}`,
            label: p.who,
            title: p.name,
            children: <DotList tone="ink" marker="neutral" items={p.gets.slice(0, 3)} />,
            link: { label: p.name, href: p.href },
          }))}
        />
      </Chapter>

      <NextStep
        tone="ink"
        title="Apply to partner with MSP Hub."
        lead={program.voice.nextLead}
        primary={{ label: program.cta.label, href: program.cta.href }}
        secondary={[program.voice.secondary]}
      />
    </>
  );
}

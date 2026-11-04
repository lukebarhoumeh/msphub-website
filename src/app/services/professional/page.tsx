import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Chapter, DotList, FactRows, RuleList, inkTone, monoLabel, type RuleItem } from "@/components/ink/interior";
import { PageHero } from "@/components/marketing/page-hero";
import { PairsWithHubX } from "@/components/marketing/pairs-with-hubx";
import { JsonLd } from "@/components/seo/json-ld";
import { DeliveryPinned } from "@/components/services/delivery-pinned";
import { ProfessionalHeroObject } from "@/components/services/professional-hero-object";
import { ServiceInquiry } from "@/components/services/service-inquiry";
import { ButtonLink } from "@/components/ui/button";
import { serviceSchema } from "@/lib/schema";
import { professional } from "@/content/services";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Professional services — Microsoft 365, Azure, security & identity, data & platform",
  description:
    "MSP Hub professional services: tenant and Exchange migrations, Intune and Autopilot, Azure infrastructure and Virtual Desktop, Defender and Zero Trust, Power Platform and Fabric.",
  alternates: { canonical: "/services/professional" },
};

/** The four capability columns, with neutral bullets so the page spends no orange on lists. */
const capabilities: RuleItem[] = professional.columns.map((column) => ({
  title: column.title,
  children: <DotList tone="ink" size="sm" marker="neutral" items={column.items} />,
}));

/** The three practices, every tile kept, as a compact definition list per practice. */
const practices: RuleItem[] = professional.practices.map((practice) => ({
  title: practice.name,
  children: (
    <dl className="grid gap-4">
      {practice.tiles.map(([name, body]) => (
        <div key={name}>
          <dt className="text-[15px] leading-snug font-semibold">{name}</dt>
          <dd className={cn("mt-1 text-[14px] leading-[1.55]", inkTone.pearl.muted)}>{body}</dd>
        </div>
      ))}
    </dl>
  ),
}));

export default function ProfessionalServicesPage() {
  return (
    <>
      <PageHero
        tone="dark"
        art="lifecycle-glass-corridor"
        eyebrow="Services · Professional services"
        title={professional.headline}
        lead={professional.lead}
        facts={professional.heroFacts}
        anchors={professional.anchors}
        aside={<ProfessionalHeroObject />}
      >
        <ButtonLink href="#inquiry">
          Request a scoping call
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="#delivery" variant="glass">
          How we deliver
        </ButtonLink>
      </PageHero>

      {/* `lg:scroll-mt-32`: from lg the services sub-nav sticks under the header (121px together), so anchors land clear of both. */}
      <Chapter spine="01" tone="ink" pad="flush-top" id="capabilities" className="lg:scroll-mt-32" title="Four capability areas, one engagement model.">
        <RuleList tone="ink" columns={4} items={capabilities} />
        <div className="mt-14 lg:mt-16">
          <p data-reveal className={cn(monoLabel, inkTone.ink.faint)}>
            How we engage
          </p>
          <FactRows tone="ink" rows={professional.scoping} className="mt-3" />
        </div>
      </Chapter>

      {/* Chapters 02 and 03 are one pearl slab: it bleeds in here and out after the delivery model. */}
      <Chapter
        spine="02"
        tone="pearl"
        id="practices"
        className="lg:scroll-mt-32"
        title="Cloud, Microsoft 365, and database practices."
        lead="Each practice runs as a dedicated team with its own architects and engineers. Scope one tile or combine them."
      >
        <RuleList tone="pearl" columns={3} items={practices} />
      </Chapter>

      <Chapter
        spine="03"
        tone="pearl"
        pad="tight"
        id="delivery"
        className="lg:scroll-mt-32"
        title="Align → Plan → Deliver → Validate & Transition."
        lead="The same model MSP Hub uses in its Modern Work delivery white paper and in every proposal."
      >
        <DeliveryPinned stages={professional.engagement} deliverables={professional.deliverables} />
        <div data-reveal className={cn("mt-16 border-t pt-8 lg:mt-20", inkTone.pearl.rule)}>
          <DotList tone="pearl" columns={2} marker="neutral" items={professional.commitments} />
        </div>
      </Chapter>

      <section id="hubx" data-surface="ink" className="relative scroll-mt-24 pb-[clamp(64px,7vw,104px)] lg:scroll-mt-32">
        <PairsWithHubX body="Migrations land in a licensing estate you can actually see. Every tenant we migrate can be managed, renewed, and optimized in HubX from day one." />
      </section>

      <ServiceInquiry branch="professional" title={professional.inquiry.title} lead={professional.inquiry.lead} />

      <JsonLd
        data={serviceSchema({
          name: "Professional services",
          description: metadata.description!,
          path: "/services/professional",
          serviceType: "Microsoft 365, Azure, security and identity, and data platform professional services",
        })}
      />
    </>
  );
}

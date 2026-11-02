import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { CheckList, CtaBand, Steps } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { PairsWithHubX } from "@/components/marketing/pairs-with-hubx";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { Container, Glow, Section } from "@/components/ui/section";
import { serviceSchema } from "@/lib/schema";
import { SectionHeading } from "@/components/ui/typography";
import { professional } from "@/content/services";

export const metadata: Metadata = {
  title: "Professional services — Microsoft 365, Azure, security & identity, data & platform",
  description:
    "MSP Hub professional services: tenant and Exchange migrations, Intune and Autopilot, Azure infrastructure and Virtual Desktop, Defender and Zero Trust, Power Platform and Fabric.",
  alternates: { canonical: "/services/professional" },
};

export default function ProfessionalServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services · Professional services" title={professional.headline} lead={professional.lead}>
        <ButtonLink href="/services#inquiry">
          Request a scoping call
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="/services" variant="glass">
          All services
        </ButtonLink>
      </PageHero>

      <Section className="pt-0 sm:pt-0 lg:pt-0" decor={<Glow tone="navy" className="top-0 right-[-300px] h-[700px] w-[900px]" />}>
        <Container>
          <SectionHeading eyebrow="What we deliver" title="Four capability areas, one engagement model." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {professional.columns.map((col) => (
              <GlassCard key={col.title}>
                <h3 className="text-lg font-semibold tracking-tight text-white">{col.title}</h3>
                <CheckList items={col.items} className="mt-4" />
              </GlassCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <SectionHeading
            eyebrow="Practice detail"
            title="Cloud, Microsoft 365, and database practices."
            lead="Each practice runs as a dedicated team with its own architects and engineers. Scope one tile or combine them."
          />
          <div className="grid gap-10">
            {professional.practices.map((practice) => (
              <div key={practice.name}>
                <h3 className="mb-4 flex items-center gap-3 text-sm font-semibold tracking-[0.12em] text-brand-orange uppercase">
                  {practice.name}
                  <span className="text-white/60">{practice.tiles.length} capabilities</span>
                </h3>
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {practice.tiles.map(([title, body]) => (
                    <li key={title} className="rounded-2xl border border-white/12 bg-white/4 p-5">
                      <p className="font-semibold text-white">{title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/65">{body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <SectionHeading
            eyebrow="Delivery model"
            title="Align → Plan → Deliver → Validate & Transition."
            lead="The same model MSP Hub uses in its Modern Work delivery white paper and in every proposal."
          />
          <Steps steps={professional.engagement} className="md:grid-cols-4" />
          <CheckList items={professional.commitments} className="mt-8 sm:grid-cols-2" />
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <PairsWithHubX body="Migrations land in a licensing estate you can actually see. Every tenant we migrate can be managed, renewed, and optimized in HubX from day one." />
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <CtaBand
          title="Request a scoping call."
          lead="Tell us about the estate and the deadline. We come back with questions, a proposed approach, and a fixed-scope assessment where it fits."
          primary={{ label: "Start a service inquiry", href: "/services#inquiry" }}
          secondary={[{ label: "Contact sales", href: "/contact" }]}
        />
      </Section>
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

import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { IllustrativeAsset } from "@/components/ink/illustrative-asset";
import { RuleList } from "@/components/ink/interior";
import { CheckList, CtaBand } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { PairsWithHubX } from "@/components/marketing/pairs-with-hubx";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { NeedsConfirmBlock } from "@/components/ui/needs-confirm";
import { Container, Section } from "@/components/ui/section";
import { serviceSchema } from "@/lib/schema";
import { SectionHeading } from "@/components/ui/typography";
import { development } from "@/content/services";

export const metadata: Metadata = {
  title: "Development as a service — applications, DevOps, and AI development",
  description:
    "MSP Hub development as a service: custom .NET and cloud-native applications, CI/CD and infrastructure as code, and AI development from Copilot rollouts to purpose-built agents.",
  alternates: { canonical: "/services/development" },
};

export default function DevelopmentServicesPage() {
  return (
    <>
      <PageHero tone="light" eyebrow="Services · Development & AI" title={development.headline} lead={development.lead}>
        <ButtonLink href="/services#inquiry">
          Start a project
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="/services" variant="glass">
          All services
        </ButtonLink>
      </PageHero>

      <Section tone="light" className="pt-0">
        <Container>
          <IllustrativeAsset name="ai-inference-lattice" sizes="(min-width: 1024px) 70vw, 100vw" />
        </Container>
      </Section>

      <Section tone="light" className="pt-0">
        <Container>
          <SectionHeading tone="light" eyebrow="Three tracks" title="Applications, DevOps, and AI." />
          <div className="grid gap-8 lg:grid-cols-3">
            {development.tracks.map((t) => (
              <article key={t.title} className="border-t border-[#0b1020]/12 pt-4">
                <h3 className="text-lg font-semibold tracking-tight text-[#0b1020]">{t.title}</h3>
                <CheckList items={t.items} tone="light" className="mt-4" />
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <SectionHeading eyebrow="How a project runs" title="Discover, build, ship, improve." />
          <RuleList tone="ink" numbered columns={4} titleSize="md" items={development.method} />
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <NeedsConfirmBlock id="devProducts" fallback={null}>
            <SectionHeading
              eyebrow="Platform engineering heritage"
              title="Software we built and run ourselves."
              lead="Shown publicly only with CEO/CPO approval."
              className="mb-6"
            />
            <div className="grid gap-4 md:grid-cols-3">
              {development.products.map((p) => (
                <GlassCard key={p.name}>
                  <p className="font-display text-2xl text-white">{p.name}</p>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-white/70">{p.body}</p>
                </GlassCard>
              ))}
            </div>
          </NeedsConfirmBlock>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <PairsWithHubX body="Copilot rollouts, Power Platform automation, and custom AI tools run on licenses you can buy, assign, and track in HubX." />
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <CtaBand
          title="Start a project."
          lead="Share the problem, the systems involved, and the deadline. We reply with a proposed first milestone."
          primary={{ label: "Start a service inquiry", href: "/services#inquiry" }}
          secondary={[{ label: "Contact sales", href: "/contact" }]}
        />
      </Section>
      <JsonLd
        data={serviceSchema({
          name: "Development as a service",
          description: metadata.description!,
          path: "/services/development",
          serviceType: "Application development, DevOps, and AI development",
        })}
      />
    </>
  );
}

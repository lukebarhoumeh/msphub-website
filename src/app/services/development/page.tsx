import type { Metadata } from "next";
import { ArrowRight, Bot, Code2, GitBranch } from "lucide-react";
import { CheckList, CtaBand, Steps } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { PairsWithHubX } from "@/components/marketing/pairs-with-hubx";
import { ButtonLink } from "@/components/ui/button";
import { GlassCard, IconTile } from "@/components/ui/card";
import { Needs } from "@/components/ui/needs";
import { Container, Glow, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/typography";
import { development } from "@/content/services";

export const metadata: Metadata = {
  title: "Development as a service — applications, DevOps, and AI development",
  description:
    "MSP Hub development as a service: custom .NET and cloud-native applications, CI/CD and infrastructure as code, and AI development from Copilot rollouts to purpose-built agents.",
  alternates: { canonical: "/services/development" },
};

const trackIcons = [Code2, GitBranch, Bot];

export default function DevelopmentServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services · Development as a service" title={development.headline} lead={development.lead}>
        <ButtonLink href="/services#inquiry">
          Start a project
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="/services" variant="glass">
          All services
        </ButtonLink>
      </PageHero>

      <Section className="pt-0 sm:pt-0 lg:pt-0" decor={<Glow tone="orange" className="top-0 right-[-250px] h-[700px] w-[700px] opacity-60" />}>
        <Container>
          <SectionHeading eyebrow="Three tracks" title="Applications, DevOps, and AI, including AI development." />
          <div className="grid gap-4 lg:grid-cols-3">
            {development.tracks.map((t, i) => (
              <GlassCard key={t.title}>
                <IconTile icon={trackIcons[i]} className="mb-5" />
                <h3 className="text-lg font-semibold tracking-tight text-white">{t.title}</h3>
                <CheckList items={t.items} className="mt-4" />
              </GlassCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <SectionHeading eyebrow="Delivery method" title="Agile delivery with predictable milestones." />
          <Steps steps={development.method} />
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <SectionHeading
            eyebrow="Products we built"
            title="Software we ship and run ourselves."
            lead={
              <>
                Platforms built and operated by the MSP Hub development team. <Needs id="devProducts" />
              </>
            }
          />
          <div className="grid gap-4 md:grid-cols-3">
            {development.products.map((p) => (
              <GlassCard key={p.name}>
                <p className="font-display text-2xl text-white">{p.name}</p>
                <p className="mt-2.5 text-[15px] leading-relaxed text-white/70">{p.body}</p>
              </GlassCard>
            ))}
          </div>
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
    </>
  );
}

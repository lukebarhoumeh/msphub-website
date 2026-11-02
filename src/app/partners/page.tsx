import type { Metadata } from "next";
import { ArrowRight, Briefcase, Handshake, Layers, Megaphone } from "lucide-react";
import { CheckList, CtaBand, LogoCloud, Steps } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { FeatureCard, GlassCard } from "@/components/ui/card";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { Container, Glow, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/typography";
import { alliances, vendors } from "@/content/ecosystem";
import { partnerEconomics, partnerEnablement, partnerPrograms, partnerSteps } from "@/content/partners";

export const metadata: Metadata = {
  title: "Partners — reseller, agent, and platform programs",
  description:
    "Three ways to partner with MSP Hub: resell Microsoft at Tier-1 direct pricing through HubX, refer opportunities as an agent, or run HubX on your own Partner Center tenant as a direct-bill CSP.",
  alternates: { canonical: "/partners" },
};

const why = [
  {
    icon: Layers,
    title: "Tier-1 direct pricing through HubX",
    body: "Resell the Microsoft catalog at Tier-1 direct pricing and manage every customer tenant from one console.",
  },
  {
    icon: Briefcase,
    title: "A services bench as your back office",
    body: "Migrations, Azure projects, security work, and managed operations delivered under your relationship.",
  },
  {
    icon: Handshake,
    title: "Co-selling",
    body: "Joint pursuits on licensing-led deals, with MSP Hub's engineers on scoping calls.",
  },
  {
    icon: Megaphone,
    title: "Enablement",
    body: "Product training, quoting support from the deal desk, and marketing collateral for your practice.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Grow with MSP Hub."
        lead="For MSPs, VARs, agents, and direct-bill CSPs who want Tier-1 Microsoft pricing, a services team behind them, and a platform their customers can see themselves in."
      >
        <ButtonLink href="/contact?topic=partnership#contact-form">
          Become a partner
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="/demo" variant="glass">
          Schedule a HubX demo
        </ButtonLink>
      </PageHero>

      <Section className="pt-0 sm:pt-0 lg:pt-0" decor={<Glow tone="navy" className="top-0 right-[-300px] h-[700px] w-[900px]" />}>
        <Container>
          <SectionHeading eyebrow="Why partner" title="Licensing is the tip of the spear. Services make you sticky." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w) => (
              <FeatureCard key={w.title} icon={w.icon} title={w.title}>
                {w.body}
              </FeatureCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <SectionHeading
            eyebrow="Three programs"
            title="Resell, refer, or run the platform."
            lead={<NeedsConfirm id="partnerTiers" fallback="One program, with pricing by volume. No tiers to climb." />}
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {partnerPrograms.map((p) => (
              <GlassCard key={p.id} className="p-8">
                <p className="text-xs font-semibold tracking-[0.12em] text-brand-orange uppercase">{p.who}</p>
                <h3 className="mt-3 font-display text-[1.625rem] leading-tight tracking-[-0.01em] text-white">{p.name}</h3>
                <CheckList items={p.gets} className="mt-5" />
              </GlassCard>
            ))}
          </div>
          <p className="mt-6 max-w-[80ch] text-[15px] text-white/70">{partnerEconomics}</p>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <SectionHeading eyebrow="How it works" title="Apply, onboard, transact." lead="The same path for every program. Deal registration is a form to the partner team." />
          <Steps steps={partnerSteps} />
          <GlassCard className="mt-4">
            <p className="text-xs font-semibold tracking-[0.12em] text-brand-orange uppercase">Enablement</p>
            <CheckList items={partnerEnablement} className="mt-4 sm:grid-cols-2" />
          </GlassCard>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <SectionHeading eyebrow="Distribution & alliances" title="Who we work with." />
          <LogoCloud items={alliances} confirm="allianceLogos" />
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <SectionHeading
            eyebrow="Vendor ecosystem"
            title="Hardware, cloud, security, and productivity through one partner."
            lead="Beyond Microsoft, MSP Hub procures and supports across hardware and networking, hyperscalers, security and data protection, and productivity vendors."
          />
          <LogoCloud items={vendors} confirm="vendorLogos" />
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <CtaBand
          title="Become a partner."
          lead="Tell us about your customers and the Microsoft workloads you sell. We set up a call with the partner team."
          primary={{ label: "Become a partner", href: "/contact?topic=partnership#contact-form" }}
          secondary={[{ label: "Schedule a HubX demo", href: "/demo" }]}
        />
      </Section>
    </>
  );
}

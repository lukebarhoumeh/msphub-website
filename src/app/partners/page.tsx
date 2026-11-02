import type { Metadata } from "next";
import { ArrowRight, Briefcase, Handshake, Layers, Megaphone } from "lucide-react";
import { CtaBand, Steps, VendorLogoWall } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/card";
import { Needs } from "@/components/ui/needs";
import { Container, Glow, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/typography";
import { alliances } from "@/content/proof";

export const metadata: Metadata = {
  title: "Partners — grow with MSP Hub",
  description:
    "For MSPs, VARs, and agents: Tier-1 Microsoft pricing through HubX, MSP Hub's services team as your back office, co-selling, and enablement.",
  alternates: { canonical: "/partners" },
};

const why = [
  {
    icon: Layers,
    title: "Tier-1 pricing through HubX",
    body: "Resell the Microsoft catalog at Tier-1 direct pricing and manage every customer tenant from one console.",
  },
  {
    icon: Briefcase,
    title: "A services bench as your back office",
    body: "Migrations, Azure projects, security work, and 24/7 operations delivered under your relationship.",
  },
  {
    icon: Handshake,
    title: "Co-selling",
    body: "Joint pursuits on licensing-led deals, with MSP Hub's engineers in the room for scoping.",
  },
  {
    icon: Megaphone,
    title: "Enablement",
    body: "Product training, pricing guidance, and marketing support for your HubX and services practice.",
  },
];

const steps = [
  { title: "Apply", body: "Tell us about your business, your customers, and the Microsoft workloads you sell today." },
  { title: "Onboard", body: "Your tenants, pricing, and billing are set up in HubX and your team is trained." },
  { title: "Transact and submit opportunities", body: "Sell and provision through HubX; bring services opportunities to the MSP Hub team." },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Grow with MSP Hub."
        lead="For MSPs, VARs, and agents who want Tier-1 Microsoft pricing, a services team behind them, and a platform their customers can see themselves in."
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
            eyebrow="How it works"
            title="Apply, onboard, transact."
            lead={
              <>
                Program tiers and deal-registration details will be published here. <Needs id="partnerProgram" />
              </>
            }
          />
          <Steps steps={steps} />
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <SectionHeading eyebrow="Alliances" title="Who we work with." />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {alliances.map((a) => (
              <li key={a.name} className="glass p-7">
                <p className="font-semibold text-white">{a.name}</p>
                <p className="mt-1.5 text-sm text-white/65">{a.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/55">
            Alliances as announced on MSP Hub&apos;s LinkedIn page; logos shown once permission is confirmed. <Needs id="alliances" />
          </p>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <SectionHeading
            eyebrow="Vendor ecosystem"
            title="Hardware, cloud, security, and productivity through one partner."
            lead="Beyond Microsoft, MSP Hub procures and supports across hardware and networking, hyperscalers, security and data protection, and productivity vendors."
          />
          <VendorLogoWall />
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

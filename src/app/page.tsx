import type { Metadata } from "next";
import { ArrowRight, Building2, Globe2, Layers, Users } from "lucide-react";
import { HubXLockup, HubXPoweredBy } from "@/components/brand/hubx-logo";
import { HomeHubxSpotlight, HomeProductProof } from "@/components/hubx/home-sections";
import { AudienceTabs } from "@/components/marketing/audience-tabs";
import { BrowserFrame } from "@/components/marketing/browser-frame";
import {
  CredentialBadges,
  CtaBand,
  LogoCloud,
  StatBand,
  Testimonials,
  TextLink,
  TrustStrip,
} from "@/components/marketing/blocks";
import { ButtonLink } from "@/components/ui/button";
import { Chip, FeatureCard, GlassCard, IconTile } from "@/components/ui/card";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { Container, Glow, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead, SectionHeading } from "@/components/ui/typography";
import { audiences } from "@/content/audiences";
import { branches, serviceBranches } from "@/content/branches";
import { enrolledSolutionAreas } from "@/content/credentials";
import { vendors } from "@/content/ecosystem";
import { screens } from "@/content/screens";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} — Your single technology partner for everything Microsoft`,
  description: site.description,
  alternates: { canonical: "/" },
};

const whyItems = [
  {
    icon: Layers,
    title: "Microsoft CSP direct-bill partner",
    body: "We buy from Microsoft and bill, support, and provision customers ourselves. No distributor layer in the price or in the escalation path. Tier-1 Direct, North America.",
  },
  {
    icon: Users,
    title: "One team, end to end",
    body: "The same team designs it, migrates it, and runs it. No handoffs between strategy and day-to-day operations.",
  },
  {
    icon: Globe2,
    title: "Teams across time zones",
    body: `Delivery teams across ${site.deliveryRegions.join(", ")} keep migrations and managed operations moving.`,
    confirm: "deliveryRegions" as const,
  },
  {
    icon: Building2,
    title: "Microsoft-first, multi-cloud",
    body: "Deep on Microsoft, fluent across AWS, Google Cloud, and VMware. We meet your estate where it is.",
  },
];

export default function HomePage() {
  const hubx = branches[0];
  return (
    <>
      {/* Hero */}
      <Section
        className="overflow-hidden pt-12 pb-16 sm:pt-16 lg:pt-24 lg:pb-24"
        decor={
          <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
            <div className="bg-hex absolute inset-0" />
            <Glow tone="orange" className="top-[-320px] left-[-280px] h-[760px] w-[760px]" drift />
            <Glow tone="navy" className="top-[-200px] right-[-300px] h-[900px] w-[900px]" />
            <Glow tone="blue" className="right-[10%] bottom-[-320px] h-[620px] w-[620px]" />
          </div>
        }
      >
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div>
              <Eyebrow className="motion-safe:animate-fade-up">Microsoft CSP direct-bill partner · Services · Development</Eyebrow>
              <Display as="h1" size="xl" className="mt-5 motion-safe:animate-fade-up stagger-1">
                Your single technology partner for <span className="text-brand-orange">everything Microsoft.</span>
              </Display>
              <Lead className="mt-6 motion-safe:animate-fade-up stagger-2">
                Licensing, cloud, security, AI, and managed operations — bought and run through one partner and one
                team. MSP Hub delivers the services; HubX, our portal, puts your Microsoft estate in one place.
              </Lead>
              <div className="mt-8 flex flex-wrap gap-3 motion-safe:animate-fade-up stagger-3">
                <ButtonLink href="/demo">
                  Schedule a HubX demo
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
                <ButtonLink href="/microsoft-365-quote" variant="glass">
                  Get a licensing quote
                </ButtonLink>
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                <Chip>
                  <span className="size-1.5 rounded-full bg-brand-orange" aria-hidden />
                  Microsoft 365 · Azure · Copilot · Dynamics
                </Chip>
                <Chip>
                  <span className="size-1.5 rounded-full bg-brand-orange" aria-hidden />
                  For MSPs and for businesses
                </Chip>
              </div>
            </div>
            <div className="motion-safe:animate-fade-up stagger-2">
              <BrowserFrame screen={screens.dashboardsDark} priority sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust strip */}
      <Section tight className="pt-0 sm:pt-0">
        <Container>
          <TrustStrip />
        </Container>
      </Section>

      {/* Product proof (light section: the real product is light-theme by default) */}
      <HomeProductProof />

      {/* Who we serve */}
      <Section id="who-we-serve">
        <Container>
          <SectionHeading
            eyebrow="Who we serve"
            title="Three audiences, one partner."
            lead="MSPs and VARs reselling Microsoft, businesses buying direct, direct-bill CSPs running HubX on their own tenant, and the advisors who bring them in."
          />
          <AudienceTabs audiences={audiences} />
        </Container>
      </Section>

      {/* Four branches */}
      <Section
        id="services"
        decor={<Glow tone="navy" className="top-[10%] left-[-300px] h-[700px] w-[900px]" />}
      >
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Four branches. One partner."
            lead="Engage a single practice or hand over the full stack. The same team designs it, migrates it, and runs it, with HubX as the front door to your Microsoft estate."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <GlassCard className="grid gap-7 overflow-hidden p-8 md:col-span-2 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:p-9">
              <div>
                <span className="inline-flex h-7.5 items-center rounded-full border border-brand-orange/30 bg-brand-orange/12 px-3 text-xs font-semibold tracking-[0.06em] text-brand-orange uppercase">
                  Flagship · the Microsoft portal
                </span>
                <HubXLockup logoClassName="h-10 w-auto" className="mt-5 mb-4" />
                <h3 className="text-2xl font-semibold tracking-tight text-white">{hubx.short}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">{hubx.description}</p>
                <TextLink href={hubx.href} className="mt-5">
                  {hubx.linkLabel}
                </TextLink>
              </div>
              <div className="hidden lg:block">
                <BrowserFrame screen={screens.dashboardsDark} caption={false} sizes="400px" />
              </div>
            </GlassCard>

            {serviceBranches.map((b) => (
              <FeatureCard
                key={b.slug}
                icon={b.icon}
                title={b.name}
                footer={<TextLink href={b.href}>{b.linkLabel}</TextLink>}
              >
                {b.description}
              </FeatureCard>
            ))}

            <GlassCard className="flex flex-col justify-between border-brand-orange/30 bg-[linear-gradient(160deg,rgba(249,115,22,.16),rgba(249,115,22,.04))]">
              <div>
                <Eyebrow>Not sure where to start?</Eyebrow>
                <h3 className="mt-3.5 font-display text-[1.625rem] leading-tight tracking-[-0.01em] text-white">
                  Book a 30-minute scoping call.
                </h3>
                <p className="mt-2.5 text-[15px] text-white/70">
                  One practice or the whole stack. We map your estate and show exactly where MSP Hub fits. No obligation.
                </p>
              </div>
              <ButtonLink href="/contact" className="mt-6 self-start">
                Book a call
              </ButtonLink>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* HubX spotlight: the twelve real capabilities (handoff §6.3) */}
      <HomeHubxSpotlight />

      {/* Why MSP Hub */}
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <SectionHeading
            eyebrow="Why MSP Hub"
            title="A direct line to Microsoft. One team across the full lifecycle."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whyItems.map((w) => (
              <GlassCard key={w.title}>
                <IconTile icon={w.icon} className="mb-5" />
                <h3 className="text-lg font-semibold tracking-tight text-white">{w.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-white/70">
                  {w.confirm ? <NeedsConfirm id={w.confirm} fallback={w.body} /> : w.body}
                </p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </Section>

      {/* Numbers */}
      <Section
        className="pt-0 sm:pt-0 lg:pt-0"
        decor={<Glow tone="blue" className="top-[-100px] left-[30%] h-[600px] w-[800px] opacity-60" />}
      >
        <Container>
          <SectionHeading eyebrow="Track record" title="What we run today." />
          <StatBand />
          <Testimonials className="mt-4" />
        </Container>
      </Section>

      {/* Credentials and ecosystem */}
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="grid gap-4 lg:grid-cols-2">
            <GlassCard>
              <p className="mb-4 text-xs tracking-[0.12em] text-white/60 uppercase">Credentials</p>
              <CredentialBadges variant="chips" />
              <p className="mt-4 text-sm text-white/70">
                Microsoft Solutions Partner program, enrolled: {enrolledSolutionAreas.map((a) => a.name).join(" · ")}.
              </p>
            </GlassCard>
            <GlassCard>
              <p className="mb-4 text-xs tracking-[0.12em] text-white/60 uppercase">Vendor ecosystem</p>
              <LogoCloud items={vendors} confirm="vendorLogos" />
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <CtaBand
          title="Book a 30-minute scoping call."
          lead="One practice or the whole stack. We'll map your estate, surface the gaps, and show exactly where MSP Hub fits. No obligation."
          primary={{ label: "Schedule a HubX demo", href: "/demo" }}
          secondary={[
            { label: "Get a licensing quote", href: "/microsoft-365-quote" },
            { label: "Service inquiry", href: "/services#inquiry" },
          ]}
        >
          <p className="mt-8 text-sm text-white/70">
            Speak with us:{" "}
            <a href={`mailto:${site.salesEmail}`} className="font-medium text-white underline-offset-4 hover:underline">
              {site.salesEmail}
            </a>
            <span className="mx-2 text-white/30">·</span>
            <NeedsConfirm id="phone" fallback={<a href={site.salesPhoneHref} className="font-medium text-white underline-offset-4 hover:underline">{site.salesPhone}</a>} />
          </p>
          <p className="mt-3 text-xs text-white/60">
            <HubXPoweredBy logoClassName="h-4 w-auto" className="text-xs text-white/60" />
          </p>
        </CtaBand>
      </Section>
    </>
  );
}

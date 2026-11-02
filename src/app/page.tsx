import type { Metadata } from "next";
import { ArrowRight, Building2, Globe2, Layers, Users } from "lucide-react";
import { HubXLogo, HubXPoweredBy } from "@/components/brand/hubx-logo";
import {
  AwardCard,
  CtaBand,
  StatBand,
  Testimonial,
  TextLink,
  TrustStrip,
  VendorLogoWall,
} from "@/components/marketing/blocks";
import { PortalFrame } from "@/components/marketing/portal-frame";
import { ButtonLink } from "@/components/ui/button";
import { Chip, FeatureCard, GlassCard, IconTile } from "@/components/ui/card";
import { Needs } from "@/components/ui/needs";
import { Container, Glow, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead, SectionHeading } from "@/components/ui/typography";
import { branches, serviceBranches } from "@/content/branches";
import { hubxCapabilities } from "@/content/hubx";
import { testimonials } from "@/content/proof";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} — Your single technology partner for everything Microsoft`,
  description: site.description,
  alternates: { canonical: "/" },
};

const whyItems = [
  {
    icon: Layers,
    title: "Microsoft Tier-1 Direct CSP",
    body: "A direct relationship with Microsoft for licensing, CSP automation, and support, with no reseller layer in between.",
  },
  {
    icon: Users,
    title: "One team, end to end",
    body: "The same team designs it, migrates it, and runs it. No handoffs between strategy and day-to-day operations.",
  },
  {
    icon: Globe2,
    title: "Follow-the-sun delivery",
    body: "Delivery teams across North America, the UK, and India keep work moving around the clock.",
    needs: "deliveryCenters" as const,
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
              <Eyebrow>Microsoft Tier-1 Direct CSP · Services · Development</Eyebrow>
              <Display as="h1" size="xl" className="mt-5">
                Your single technology partner for <span className="text-brand-orange">everything Microsoft.</span>
              </Display>
              <Lead className="mt-6">
                Licensing, cloud, security, AI, and 24/7 managed support, bought and run through one partner and one
                team. MSP Hub delivers the services; our new portal, HubX, puts your Microsoft estate in one place.
              </Lead>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/demo">
                  Schedule a HubX demo
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
                <ButtonLink href="/services" variant="glass">
                  Explore services
                </ButtonLink>
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                <Chip>
                  <span className="size-1.5 rounded-full bg-brand-orange" aria-hidden />
                  Microsoft 365 · Azure · Copilot
                </Chip>
                <Chip>
                  <span className="size-1.5 rounded-full bg-brand-orange" aria-hidden />
                  For MSPs and for businesses
                </Chip>
              </div>
            </div>
            <div className="relative">
              <PortalFrame />
              <div className="glass absolute -top-6 right-2 hidden min-w-[190px] rounded-2xl px-4 py-3.5 xl:block">
                <p className="text-[11.5px] tracking-[0.08em] text-white/45 uppercase">Renewal alerts</p>
                <p className="mt-0.5 text-xl font-semibold tabular-nums">
                  7 <small className="ml-2 text-xs font-medium text-success">auto-scheduled</small>
                </p>
              </div>
              <div className="glass absolute -bottom-6 left-2 hidden min-w-[190px] rounded-2xl px-4 py-3.5 xl:block">
                <p className="text-[11.5px] tracking-[0.08em] text-white/45 uppercase">Licenses managed</p>
                <p className="mt-0.5 text-xl font-semibold tabular-nums">
                  12,480 <small className="ml-2 text-xs font-medium text-success">+3.2%</small>
                </p>
              </div>
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
                <HubXLogo className="mt-5 mb-4 h-10 w-auto" />
                <h3 className="text-2xl font-semibold tracking-tight text-white">{hubx.short}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">{hubx.description}</p>
                <p className="mt-4">
                  <HubXPoweredBy logoClassName="h-5 w-auto" />
                </p>
                <TextLink href={hubx.href} className="mt-5">
                  {hubx.linkLabel}
                </TextLink>
              </div>
              <div aria-hidden className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl border border-white/12 bg-[#181818] lg:block">
                <div className="absolute -inset-[40%] bg-[radial-gradient(circle_at_70%_20%,rgba(249,115,22,.35),transparent_50%)]" />
                <div className="absolute inset-x-3.5 top-3.5 grid grid-cols-2 gap-2.5 text-[#ECEDEF]">
                  {[
                    ["Active licenses", "12,480", "+3.2%"],
                    ["Savings found", "$21,900", "Hub AI"],
                  ].map(([k, v, d]) => (
                    <div key={k} className="rounded-xl border border-white/8 bg-[#1F1F1F] px-3.5 py-3">
                      <div className="text-[11px] text-white/50">{k}</div>
                      <div className="mt-1 text-xl font-semibold tabular-nums">{v}</div>
                      <div className="mt-0.5 text-[11px] text-success">{d}</div>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-x-3.5 bottom-3.5 flex h-[70px] items-end gap-1.5">
                  {[40, 52, 46, 64, 58, 72, 68, 84, 92].map((h, i) => (
                    <i
                      key={i}
                      style={{ height: `${h}%` }}
                      className={
                        i < 3
                          ? "flex-1 rounded-t bg-white/15"
                          : "flex-1 rounded-t bg-[linear-gradient(180deg,rgba(249,115,22,.95),rgba(249,115,22,.35))]"
                      }
                    />
                  ))}
                </div>
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

      {/* HubX spotlight */}
      <Section
        className="pt-0 sm:pt-0 lg:pt-0"
        decor={<Glow tone="orange" className="top-0 right-[-200px] h-[700px] w-[700px] opacity-70" />}
      >
        <Container>
          <div className="glass glass-lg overflow-hidden p-7 sm:p-10 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
              <div>
                <HubXLogo className="h-12 w-auto sm:h-14" />
                <p className="mt-3 text-sm text-white/70">HubX, powered by MSP Hub</p>
                <Eyebrow className="mt-7">The Microsoft portal</Eyebrow>
                <Display className="mt-3.5">See every license. Control every dollar.</Display>
                <Lead className="mt-4">
                  HubX puts procurement, visibility, and optimization in one place, so IT, finance, and purchasing stop
                  reconciling spreadsheets and start making data-driven decisions.
                </Lead>
                <div className="mt-7 inline-flex rounded-full border border-white/12 bg-white/6 p-1 text-xs font-medium sm:text-sm">
                  <span className="rounded-full bg-brand-orange px-3 py-2 text-ink sm:px-4">For MSPs & VARs</span>
                  <span className="px-3 py-2 text-white/70 sm:px-4">For your business</span>
                </div>
                <p className="mt-3 text-sm text-white/55">
                  Manage every customer tenant from one console with Tier-1 direct pricing and automated billing.{" "}
                  <Needs id="audienceSplit" />
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <ButtonLink href="/demo">Schedule a demo</ButtonLink>
                  <ButtonLink href="/microsoft-365-quote" variant="glass">
                    Get a Microsoft 365 quote
                  </ButtonLink>
                </div>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {hubxCapabilities.map((c, i) => (
                  <li key={c.title} className="rounded-2xl border border-white/12 bg-white/4 p-5">
                    <span className="text-xs font-semibold tracking-[0.08em] text-brand-orange">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-semibold text-white">{c.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/70">{c.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

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
                  {w.body} {w.needs ? <Needs id={w.needs} /> : null}
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
        </Container>
      </Section>

      {/* Proof */}
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
            <Testimonial quote={testimonials[0]} />
            <div className="grid gap-4">
              <AwardCard />
              <GlassCard>
                <p className="mb-4 text-xs tracking-[0.12em] text-white/45 uppercase">Vendor ecosystem</p>
                <VendorLogoWall compact />
              </GlassCard>
            </div>
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
            { label: "Get a Microsoft 365 quote", href: "/microsoft-365-quote" },
            { label: "Service inquiry", href: "/services#inquiry" },
          ]}
        >
          <p className="mt-8 text-sm text-white/70">
            Speak with us:{" "}
            <a href={`mailto:${site.salesEmail}`} className="font-medium text-white underline-offset-4 hover:underline">
              {site.salesEmail}
            </a>
          </p>
        </CtaBand>
      </Section>
    </>
  );
}

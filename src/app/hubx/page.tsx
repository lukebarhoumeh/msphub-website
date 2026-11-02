import type { Metadata } from "next";
import { ArrowRight, Cable, Headset, ShieldCheck } from "lucide-react";
import { HubXLockup } from "@/components/brand/hubx-logo";
import { FaqSection } from "@/components/hubx/faq-section";
import { FeatureGrid } from "@/components/hubx/feature-grid";
import { HubAiConversation } from "@/components/hubx/hubai-conversation";
import { ModuleExplorer } from "@/components/hubx/module-explorer";
import { JsonLd, ToneLink } from "@/components/hubx/primitives";
import { ScreenshotCarousel } from "@/components/hubx/screenshot-carousel";
import { BrowserFrame } from "@/components/marketing/browser-frame";
import { CheckList, CtaBand, Steps, Testimonials, TextLink } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Chip, FeatureCard, GlassCard } from "@/components/ui/card";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { Container, Glow, Section } from "@/components/ui/section";
import { Display, Eyebrow, SectionHeading } from "@/components/ui/typography";
import { hubAiFeatures } from "@/content/hubai-demo";
import { hubxAudiences, hubxIntegrations, hubxPage, hubxSteps, hubxTagline, licensingCatalog } from "@/content/hubx";
import { hubxFaq } from "@/content/hubx-faq";
import { hubxModules } from "@/content/hubx-modules";
import { screens } from "@/content/screens";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "HubX, powered by MSP Hub — the Microsoft portal for licensing, procurement, and spend",
  description:
    "HubX is MSP Hub's Microsoft portal for MSPs, businesses, and direct-bill CSPs: see every license, cost, renewal, and invoice; buy and provision directly at Tier-1 pricing; ask HubAI.",
  alternates: { canonical: "/hubx" },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "HubX",
  alternateName: "HubX, powered by MSP Hub",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${siteUrl}/hubx`,
  description: metadata.description,
  publisher: { "@type": "Organization", name: site.name, url: siteUrl },
  featureList: hubxModules.map((m) => m.name),
};

export default function HubXPage() {
  const { hero, audiences, tour, modules, features, steps, hubai, trust, licensing, faq, cta } = hubxPage;
  return (
    <>
      <PageHero
        align="center"
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        below={<BrowserFrame screen={screens.dashboardsDark} priority viewport="crop" sizes="(min-width: 1280px) 1100px, 100vw" />}
      >
        <ButtonLink href={hero.primary.href}>
          {hero.primary.label}
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href={site.hubxLoginUrl} variant="glass">
          {hero.secondary.label}
        </ButtonLink>
      </PageHero>

      <Section tight className="pt-0 sm:pt-0">
        <Container className="flex flex-col items-center gap-5 text-center">
          <HubXLockup align="center" logoClassName="h-12 w-auto sm:h-14" />
          <p className="max-w-[60ch] text-sm text-white/70">{hubxTagline} Delivered by MSP Hub&apos;s services team.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {hero.chips.map((chip) => (
              <Chip key={chip} wrap>
                {chip}
              </Chip>
            ))}
          </div>
        </Container>
      </Section>

      {/* Who it's for */}
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <SectionHeading eyebrow={audiences.eyebrow} title={audiences.title} />
          <div className="grid gap-4 lg:grid-cols-3">
            {hubxAudiences.map((a) => (
              <GlassCard key={a.id} className="p-8">
                <p className="font-mono text-xs font-semibold tracking-[0.12em] text-brand-orange uppercase">{a.who}</p>
                <h3 className="mt-3 font-display text-[1.625rem] leading-tight tracking-[-0.01em] text-white">{a.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-white/70">{a.body}</p>
                <CheckList items={a.points} className="mt-5" />
              </GlassCard>
            ))}
          </div>
          <p className="mt-4 text-sm text-white/60">
            <NeedsConfirm id="whiteLabel" fallback="Your customers see your brand on invoices and get their own portal access." />
          </p>
        </Container>
      </Section>

      {/* Product tour + modules (light canvas: the product is light-theme by default) */}
      <Section tone="light">
        <Container>
          <SectionHeading tone="light" eyebrow={tour.eyebrow} title={tour.title} lead={tour.lead} />
          <ScreenshotCarousel screens={tour.screens.map((id) => screens[id])} labels={tour.labels} label="HubX product tour" />
        </Container>
        <Container className="mt-20 sm:mt-24" id="modules">
          <SectionHeading tone="light" eyebrow={modules.eyebrow} title={modules.title} lead={modules.lead} />
          <ModuleExplorer />
        </Container>
      </Section>

      {/* The twelve cool things */}
      <Section id="capabilities" decor={<Glow tone="navy" className="top-0 right-[-300px] h-[700px] w-[900px]" />}>
        <Container>
          <SectionHeading eyebrow={features.eyebrow} title={features.title} lead={features.lead} />
          <FeatureGrid columns={3} />
        </Container>
      </Section>

      {/* How it works */}
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <SectionHeading
            eyebrow={steps.eyebrow}
            title={<NeedsConfirm id="onboardingWording" fallback="Live in one billing cycle." />}
            lead={steps.lead}
          />
          <Steps steps={hubxSteps} className="md:grid-cols-2 lg:grid-cols-4" />
        </Container>
      </Section>

      {/* HubAI (light: the captures are light-theme) */}
      <Section tone="light" id="hubai">
        <Container>
          <SectionHeading tone="light" eyebrow={hubai.eyebrow} title={hubai.title} lead={hubai.lead} />
          <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10 [&>*]:min-w-0">
            <HubAiConversation tone="light" />
            <ScreenshotCarousel
              screens={hubai.screens.map((id) => screens[id])}
              labels={hubai.labels}
              label="HubAI in the product"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {hubAiFeatures.map((f, i) => (
              <li key={f.title} className="card-light p-5">
                <span className="font-mono text-xs tracking-[0.08em] text-charcoal/80">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-semibold text-charcoal">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-charcoal/80">{f.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ToneLink href="/hubx/features/hubai" tone="light">
              More about HubAI
            </ToneLink>
          </div>
        </Container>
      </Section>

      {/* Integrations & trust */}
      <Section>
        <Container>
          <SectionHeading eyebrow={trust.eyebrow} title={trust.title} />
          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard icon={Cable} title="Integrations">
              <ul className="grid gap-2">
                {hubxIntegrations.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <p className="mt-3">
                <NeedsConfirm id="integrations" fallback="API-first platform; integrations on request." />
              </p>
            </FeatureCard>
            <FeatureCard icon={ShieldCheck} title="Security and compliance" footer={<TextLink href="/hubx/security">HubX security</TextLink>}>
              Single sign-on with your own identity provider, roles, and audit logs on every organization and customer.
              Delivered by an ISO/IEC 27001:2022-certified organization, with Microsoft access handled through the CSP
              program&apos;s own mechanisms. <NeedsConfirm id="isoEntity" fallback={null} />
            </FeatureCard>
            <FeatureCard icon={Headset} title="Direct Microsoft escalation">
              As a CSP direct-bill partner, MSP Hub escalates to Microsoft Premier support directly. No distributor layer
              between you and a fix.
            </FeatureCard>
          </div>
        </Container>
      </Section>

      {/* Licensing teaser */}
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="glass glass-lg grid gap-7 p-8 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Eyebrow>{licensing.eyebrow}</Eyebrow>
              <Display className="mt-3.5">{licensing.title}</Display>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {licensingCatalog.map((family) => (
                  <Chip key={family}>{family}</Chip>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start gap-3">
              <ButtonLink href="/licensing/quote">Get a licensing quote</ButtonLink>
              <ButtonLink href="/contact" variant="glass">
                Talk to licensing
              </ButtonLink>
              <p className="text-xs text-white/60">
                <NeedsConfirm id="quoteResponse" fallback="Response within one business day." />
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <Testimonials />
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="pt-0 sm:pt-0 lg:pt-0" id="faq">
        <Container>
          <SectionHeading eyebrow={faq.eyebrow} title={faq.title} align="center" />
          <FaqSection items={hubxFaq} />
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <CtaBand
          eyebrow={cta.eyebrow}
          title={cta.title}
          lead={cta.lead}
          primary={{ label: "Schedule a demo", href: "/demo" }}
          secondary={[{ label: "Talk to sales", href: "/contact" }]}
        >
          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
            <a href={`mailto:${site.salesEmail}`} className="font-medium text-white underline-offset-4 hover:underline">
              {site.salesEmail}
            </a>
            <span>
              Already a customer?{" "}
              <a href={site.hubxLoginUrl} rel="noopener" className="font-medium text-white underline-offset-4 hover:underline">
                Log in to HubX
              </a>
            </span>
          </p>
        </CtaBand>
      </Section>

      <JsonLd data={productJsonLd} />
    </>
  );
}

import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { FaqSection } from "@/components/hubx/faq-section";
import { FeatureGrid } from "@/components/hubx/feature-grid";
import { HubAiConversation } from "@/components/hubx/hubai-conversation";
import { ModuleList } from "@/components/hubx/module-list";
import { JsonLd } from "@/components/hubx/primitives";
import { EvidenceBezel, EvidenceCaption, EvidenceFigure, EvidenceStage } from "@/components/ink/evidence";
import { Chapter, ChipRow, DotList, InkLink, NextStep, RuleList, inkTone, monoLabel } from "@/components/ink/interior";
import { PageHero } from "@/components/marketing/page-hero";
import { Testimonials } from "@/components/marketing/blocks";
import { ButtonLink } from "@/components/ui/button";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { Container } from "@/components/ui/section";
import { hubAiFeatures } from "@/content/hubai-demo";
import { hubxAudiences, hubxIntegrations, hubxPage, hubxSteps, hubxTagline, licensingCatalog } from "@/content/hubx";
import { hubxFaq } from "@/content/hubx-faq";
import { captures, hubxEvidence } from "@/content/evidence";
import { hubxModules } from "@/content/hubx-modules";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site";
import { cn } from "@/lib/cn";

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
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        aside={
          <figure className="m-0 flex flex-col items-center lg:items-end">
            <EvidenceBezel capture={captures.homeOverview} tilt beam priority className="max-w-[460px]" />
            <div className="w-full max-w-[460px] text-white">
              <EvidenceCaption capture={captures.homeOverview} />
            </div>
          </figure>
        }
      >
        <ButtonLink href={hero.primary.href}>
          {hero.primary.label}
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href={site.hubxLoginUrl} variant="glass">
          {hero.secondary.label}
        </ButtonLink>
      </PageHero>

      <section className="bg-[#0b1020] pb-14 text-white">
        <Container className="grid gap-5 border-t border-white/15 pt-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <p className={cn("max-w-[60ch] text-[16px] leading-[1.6]", inkTone.ink.muted)}>
            <span className="font-semibold text-white">{hubxTagline}</span> Delivered by MSP Hub&apos;s services team.
          </p>
          <ChipRow tone="ink" items={hero.chips} label="HubX at a glance" />
        </Container>
      </section>

      {/* Who it's for */}
      <Chapter tone="ink" pad="tight" id="who-its-for" title={audiences.title} headingWidth="max-w-[18ch]">
        <RuleList
          tone="ink"
          columns={3}
          items={hubxAudiences.map((audience) => ({
            id: `audience-${audience.id}`,
            label: audience.who,
            title: audience.title,
            body: audience.body,
            children: <DotList tone="ink" size="sm" items={audience.points} />,
          }))}
        />
        <p className={cn("mt-8 text-[15px]", inkTone.ink.muted)}>
          <NeedsConfirm id="whiteLabel" fallback="Your customers see your brand on invoices and get their own portal access." />
        </p>
      </Chapter>

      {/* Product tour + modules (pearl: the product is light-theme by default) */}
      <Chapter tone="pearl" eyebrow={tour.eyebrow} title={tour.title} lead={tour.lead} headingWidth="max-w-[20ch]">
        <EvidenceStage ids={hubxEvidence} tone="pearl" />
      </Chapter>
      <Chapter tone="pearl" pad="tight" id="modules" eyebrow={modules.eyebrow} title={modules.title} lead={modules.lead}>
        <ModuleList />
      </Chapter>

      {/* The twelve capabilities */}
      <Chapter tone="ink" id="capabilities" title={features.title} lead={features.lead} headingWidth="max-w-[22ch]">
        <FeatureGrid columns={3} />
      </Chapter>

      {/* How it works */}
      <Chapter tone="ink" pad="tight" eyebrow={steps.eyebrow} title={<NeedsConfirm id="onboardingWording" fallback="Live in one billing cycle." />} lead={steps.lead}>
        <RuleList tone="ink" numbered columns={4} titleSize="md" items={hubxSteps} />
      </Chapter>

      {/* HubAI (pearl: the captures are light-theme) */}
      <Chapter tone="pearl" id="hubai" eyebrow={hubai.eyebrow} title={hubai.title} lead={hubai.lead} headingWidth="max-w-[20ch]">
        <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10 [&>*]:min-w-0">
          <HubAiConversation tone="light" />
          <EvidenceFigure capture={captures.hubaiHome} tone="pearl" />
        </div>
        <RuleList tone="pearl" numbered columns={4} titleSize="md" className="mt-12" items={hubAiFeatures} />
        <InkLink href="/hubx/features/hubai" tone="pearl" className="mt-8">
          More about HubAI
        </InkLink>
      </Chapter>

      {/* Integrations & trust */}
      <Chapter tone="ink" eyebrow={trust.eyebrow} title={trust.title} headingWidth="max-w-[18ch]">
        <RuleList
          tone="ink"
          columns={3}
          titleSize="md"
          items={[
            {
              title: "Integrations",
              children: (
                <>
                  <DotList tone="ink" size="sm" items={hubxIntegrations} />
                  <p className={cn("mt-4 text-[15px]", inkTone.ink.muted)}>
                    <NeedsConfirm id="integrations" fallback="API-first platform; integrations on request." />
                  </p>
                </>
              ),
            },
            {
              title: "Security and compliance",
              body: (
                <>
                  Single sign-on with your own identity provider, roles, and audit logs on every organization and customer. Microsoft access is handled
                  through the CSP program&apos;s own mechanisms.{" "}
                  <NeedsConfirm id="isoEntity" fallback={null}>
                    ISO/IEC 27001:2022 certification is not published until the certificate entity is confirmed.
                  </NeedsConfirm>
                </>
              ),
              link: { label: "HubX security", href: "/hubx/security" },
            },
            {
              title: "Direct Microsoft escalation",
              body: "As a CSP direct-bill partner, MSP Hub escalates to Microsoft Premier support directly. No distributor layer between you and a fix.",
            },
          ]}
        />
      </Chapter>

      {/* Licensing */}
      <Chapter tone="ink" pad="tight" id="licensing" eyebrow={licensing.eyebrow} title={licensing.title} headingWidth="max-w-[18ch]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-12">
          <ChipRow tone="ink" items={licensingCatalog} label="Microsoft licensing families" />
          <div className="flex flex-col items-start gap-3">
            <ButtonLink href="/licensing/quote">Get a licensing quote</ButtonLink>
            <ButtonLink href="/contact" variant="glass">
              Talk to licensing
            </ButtonLink>
            <p className={cn("text-[13px]", inkTone.ink.muted)}>
              <NeedsConfirm id="quoteResponse" fallback="The licensing desk replies during business hours.">
                Response within one business day.
              </NeedsConfirm>
            </p>
          </div>
        </div>
        <div className="mt-10">
          <Testimonials />
        </div>
      </Chapter>

      {/* FAQ */}
      <Chapter tone="pearl" id="faq" size="md" eyebrow={faq.eyebrow} title={faq.title}>
        <FaqSection items={hubxFaq} tone="light" variant="rule" className="max-w-[860px]" />
      </Chapter>

      <NextStep tone="ink" eyebrow={cta.eyebrow} title={cta.title} lead={cta.lead} primary={{ label: "Schedule a demo", href: "/demo" }} secondary={[{ label: "Talk to sales", href: "/contact" }]}>
        <p className={cn("mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]", inkTone.ink.muted)}>
          <a href={`mailto:${site.salesEmail}`} className="font-semibold text-white underline decoration-[#ffb05c] decoration-2 underline-offset-[5px]">
            {site.salesEmail}
          </a>
          <span>
            Already a customer?{" "}
            <a href={site.hubxLoginUrl} rel="noopener" className="font-semibold text-white underline decoration-[#ffb05c] decoration-2 underline-offset-[5px]">
              Log in to HubX
            </a>
          </span>
        </p>
        <p className={cn(monoLabel, "mt-6", inkTone.ink.faint)}>Real HubX screens with demo data.</p>
      </NextStep>

      <JsonLd data={productJsonLd} />
    </>
  );
}

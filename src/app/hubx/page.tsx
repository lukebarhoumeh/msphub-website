import type { Metadata } from "next";
import { ArrowRight, Cable, ShieldCheck, Headset } from "lucide-react";
import { HubXLockup } from "@/components/brand/hubx-logo";
import { BrowserFrame } from "@/components/marketing/browser-frame";
import { CheckList, CtaBand, Faq, Steps, Testimonials, type FaqItem } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Chip, FeatureCard, GlassCard } from "@/components/ui/card";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { Container, Glow, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead, SectionHeading } from "@/components/ui/typography";
import {
  hubAiDemo,
  hubAiFeatures,
  hubAiFooter,
  hubxAudiences,
  hubxCapabilities,
  hubxIntegrations,
  hubxLockup,
  hubxSteps,
  hubxTagline,
  licensingCatalog,
} from "@/content/hubx";
import { screens } from "@/content/screens";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "HubX, powered by MSP Hub — the Microsoft portal for licensing, procurement, and spend",
  description:
    "HubX is MSP Hub's Microsoft portal for MSPs, businesses, and direct-bill CSPs: see every license, cost, renewal, and invoice; buy and provision directly at Tier-1 pricing; ask HubAI.",
  alternates: { canonical: "/hubx" },
};

const faq: FaqItem[] = [
  {
    q: "Is HubX for MSPs or for end customers?",
    a: "Both, plus direct-bill CSPs. MSPs and VARs use HubX to manage every customer tenant from one console at Tier-1 direct pricing. Businesses use it to buy, see, and optimize their own Microsoft licensing. Direct-bill CSPs license HubX to run on their own Partner Center tenant. HubX is powered by MSP Hub.",
    schemaText:
      "Both, plus direct-bill CSPs. MSPs and VARs use HubX to manage every customer tenant from one console at Tier-1 direct pricing. Businesses use it to buy, see, and optimize their own Microsoft licensing. Direct-bill CSPs license HubX to run on their own Partner Center tenant.",
  },
  {
    q: "Does HubX replace the MSP Hub Marketplace?",
    a: (
      <>
        Yes. HubX is the redesigned and renamed MSP Hub platform (October 2026). Existing accounts and data carried over.{" "}
        <NeedsConfirm id="loginContinuity" fallback={null} />
      </>
    ),
    schemaText: "Yes. HubX is the redesigned and renamed MSP Hub platform (October 2026). Existing accounts and data carried over.",
  },
  {
    q: "How is HubX priced?",
    a: (
      <NeedsConfirm
        id="pricingWording"
        fallback="For MSP Hub reseller partners, HubX is included with licensing bought through MSP Hub. For direct-bill CSPs running their own Partner Center tenant, HubX is licensed separately. Talk to sales for details."
      />
    ),
    schemaText:
      "For MSP Hub reseller partners, HubX is included with licensing bought through MSP Hub. For direct-bill CSPs running their own Partner Center tenant, HubX is licensed separately.",
  },
  {
    q: "Can I move an existing CSP agreement to HubX?",
    a: "Yes. Existing subscriptions transfer partner-to-partner; terms and renewal dates carry over and nothing is re-bought. The customer accepts the reseller relationship from a link, then the transfer completes inside the open transfer window.",
    schemaText:
      "Yes. Existing subscriptions transfer partner-to-partner; terms and renewal dates carry over and nothing is re-bought. The customer accepts the reseller relationship, then the transfer completes inside the open transfer window.",
  },
  {
    q: "What support is included?",
    a: "HubX Service Desk tickets with priority and SLA state, business-hours licensing and billing support, and Microsoft Premier escalation. Managed services add 24/7 monitoring and incident management for the environments we run.",
    schemaText:
      "HubX Service Desk tickets, business-hours licensing and billing support, and Microsoft Premier escalation. Managed services add 24/7 monitoring and incident management for managed environments.",
  },
  {
    q: "Where is my data hosted?",
    a: (
      <NeedsConfirm id="dataHosting" fallback="Hosting region and data-residency details are available from sales on request.">
        Hosting region and data residency to be published once confirmed with engineering.
      </NeedsConfirm>
    ),
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq
    .filter((f) => f.schemaText)
    .map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.schemaText },
    })),
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "HubX",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${siteUrl}/hubx`,
  description: metadata.description,
  publisher: { "@type": "Organization", name: site.name, url: siteUrl },
};

export default function HubXPage() {
  return (
    <>
      <PageHero
        align="center"
        eyebrow={`The Microsoft portal · ${hubxLockup}`}
        title="The Microsoft portal for licensing, procurement, and spend."
        lead="See every license, cost, renewal, and invoice in one place. Buy, provision, and manage directly at Tier-1 pricing. Ask HubAI instead of digging through portals. Built for MSPs managing many customers, and for businesses managing their own."
        below={<BrowserFrame screen={screens.dashboardsDark} priority sizes="(min-width: 1024px) 1100px, 100vw" />}
      >
        <ButtonLink href="/demo">
          Schedule a demo
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href={site.hubxLoginUrl} variant="glass">
          Log in to HubX
        </ButtonLink>
      </PageHero>

      <Section tight className="pt-0 sm:pt-0">
        <Container className="flex flex-col items-center gap-5 text-center">
          <HubXLockup align="center" logoClassName="h-12 w-auto sm:h-14" />
          <p className="max-w-[60ch] text-sm text-white/70">{hubxTagline} Delivered by MSP Hub&apos;s services team.</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Chip>Microsoft 365 · Azure · Copilot · Dynamics</Chip>
            <Chip>Tier-1 direct pricing</Chip>
            <Chip>For MSPs, businesses, and direct-bill CSPs</Chip>
          </div>
        </Container>
      </Section>

      {/* Who it's for */}
      <Section>
        <Container>
          <SectionHeading eyebrow="Who it's for" title="One portal. Three ways to run Microsoft." />
          <div className="grid gap-4 lg:grid-cols-3">
            {hubxAudiences.map((a) => (
              <GlassCard key={a.id} className="p-8">
                <p className="text-xs font-semibold tracking-[0.12em] text-brand-orange uppercase">{a.who}</p>
                <h3 className="mt-3 font-display text-[1.625rem] leading-tight tracking-[-0.01em] text-white">{a.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-white/70">{a.body}</p>
                <CheckList items={a.points} className="mt-5" />
              </GlassCard>
            ))}
          </div>
          <p className="mt-4 text-sm text-white/55">
            <NeedsConfirm id="whiteLabel" fallback="Your customers see your brand on invoices and get their own portal access." />
          </p>
        </Container>
      </Section>

      {/* Product proof — light section */}
      <Section className="bg-brand-canvas text-brand-charcoal">
        <Container>
          <SectionHeading
            tone="light"
            eyebrow="Inside HubX"
            title="Customers, catalog, quotes, billing, dashboards, reports, Service Desk."
            lead="Real HubX screens with demo data. The full module tour with every screen lands on this page next."
          />
          <div className="grid gap-8 lg:grid-cols-2">
            <BrowserFrame screen={screens.customers} />
            <BrowserFrame screen={screens.catalog} />
          </div>
        </Container>
      </Section>

      {/* Capabilities */}
      <Section decor={<Glow tone="navy" className="top-0 right-[-300px] h-[700px] w-[900px]" />}>
        <Container>
          <SectionHeading eyebrow="Capabilities" title="What HubX does that nothing else in the stack does." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hubxCapabilities.map((c) => (
              <FeatureCard key={c.title} icon={c.icon} title={c.title}>
                {c.body}
              </FeatureCard>
            ))}
          </div>
        </Container>
      </Section>

      {/* How it works */}
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title={<NeedsConfirm id="onboardingWording" fallback="Live in one billing cycle." />}
            lead="Existing subscriptions move by partner-to-partner transfer and the customer accepts the reseller relationship from a link, so timing depends on acceptance and the open transfer window."
          />
          <Steps steps={hubxSteps} className="md:grid-cols-4" />
        </Container>
      </Section>

      {/* HubAI */}
      <Section className="pt-0 sm:pt-0 lg:pt-0" decor={<Glow tone="orange" className="top-[-100px] left-[-250px] h-[700px] w-[700px] opacity-60" />}>
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16 [&>*]:min-w-0">
            <div>
              <Eyebrow>HubAI</Eyebrow>
              <Display className="mt-3.5">Ask your estate a question. Get a table in seconds.</Display>
              <Lead className="mt-4">
                HubAI answers questions about customers, products, orders, subscriptions, and HubX workflows from your own
                data, scoped to the billing subscription you select.
              </Lead>
              <ul className="mt-7 grid gap-2.5">
                {hubAiFeatures.map((f, i) => (
                  <li key={f.title} className="flex gap-3.5 rounded-2xl border border-white/12 bg-white/4 px-4 py-3.5 text-[15px] text-white/70">
                    <span className="pt-0.5 text-xs font-semibold tracking-[0.08em] text-brand-orange">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <b className="font-semibold text-white">{f.title}.</b> {f.body}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass glass-lg grid min-w-0 gap-3 overflow-hidden p-5 sm:p-6" aria-label="Example HubAI conversation (demo data)">
              <p className="flex items-center gap-2 text-[11px] tracking-[0.1em] text-white/45 uppercase">
                <svg viewBox="772 65.5 244 244" className="size-3.5" aria-hidden>
                  <path fill="#F97316" d="M772 81H842L894 145.4L946 81H1016L930 187.5L894 159L858 187.5ZM772 294H842L894 229.6L946 294H1016L930 187.5L894 216L858 187.5Z" />
                </svg>
                HubAI · Default subscription · Demo data
              </p>
              {hubAiDemo.map((turn, i) =>
                turn.role === "user" ? (
                  <div key={i} className="ml-auto max-w-[86%] rounded-2xl rounded-br-sm border border-brand-orange/30 bg-brand-orange/16 px-3.5 py-3 text-sm">
                    {turn.text}
                  </div>
                ) : (
                  <div key={i} className="max-w-full rounded-2xl rounded-bl-sm border border-white/12 bg-white/6 px-3.5 py-3 text-sm text-white/70">
                    <p className="text-white">{turn.intro}</p>
                    <div className="mt-2.5 overflow-x-auto">
                      <table className="w-full border-collapse text-[12px]">
                        <thead>
                          <tr>
                            {turn.columns.map((c) => (
                              <th key={c} className="border-b border-white/10 px-2 pb-1.5 text-left font-medium whitespace-nowrap text-white/45">
                                {c}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {turn.rows.map((r) => (
                            <tr key={r.join()}>
                              {r.map((cell, j) => (
                                <td key={j} className="border-b border-white/6 px-2 py-1.5 whitespace-nowrap text-white/80 last:border-b-0">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ),
              )}
              <p className="text-xs text-white/45">{hubAiFooter}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Integrations & trust */}
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <SectionHeading eyebrow="Integrations & trust" title="API-first, built on Microsoft Partner Center." />
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
            <FeatureCard icon={ShieldCheck} title="Security and compliance">
              Single sign-on with your own identity provider, roles, and audit logs on every organization and customer.
              Delivered by an ISO/IEC 27001:2022-certified organization, with data handled under Microsoft&apos;s CSP program.{" "}
              <NeedsConfirm id="isoEntity" fallback={null} />
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
              <Eyebrow>Microsoft licensing</Eyebrow>
              <Display className="mt-3.5">Tier-1 direct pricing on 7,600+ SKUs.</Display>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {licensingCatalog.map((sku) => (
                  <Chip key={sku}>{sku}</Chip>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start gap-3">
              <ButtonLink href="/microsoft-365-quote">Get a licensing quote</ButtonLink>
              <ButtonLink href="/contact" variant="glass">
                Talk to licensing
              </ButtonLink>
              <p className="text-xs text-white/45">
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
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <SectionHeading eyebrow="Questions" title="Frequently asked" align="center" />
          <Faq items={faq} />
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <CtaBand
          eyebrow="See it live"
          title="See HubX in 30 minutes."
          lead="A live walkthrough of the portal with your tenant scenario, your licensing questions, and clear next steps. No obligation."
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
    </>
  );
}

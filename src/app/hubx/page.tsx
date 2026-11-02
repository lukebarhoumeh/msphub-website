import type { Metadata } from "next";
import { ArrowRight, Cable, ShieldCheck, Headset } from "lucide-react";
import { HubXLogo } from "@/components/brand/hubx-logo";
import { CheckList, CtaBand, Faq, Steps, Testimonial } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { PortalFrame } from "@/components/marketing/portal-frame";
import { ButtonLink } from "@/components/ui/button";
import { Chip, FeatureCard, GlassCard } from "@/components/ui/card";
import { Needs } from "@/components/ui/needs";
import { Container, Glow, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead, SectionHeading } from "@/components/ui/typography";
import { hubAiFeatures, hubxAudiences, hubxCapabilities, hubxSteps, licensingCatalog } from "@/content/hubx";
import { testimonials } from "@/content/proof";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "HubX, powered by MSP Hub — the Microsoft portal for licensing, procurement, and spend",
  description:
    "HubX is MSP Hub's Microsoft portal for MSPs and businesses: see every license, cost, and renewal; buy and provision directly at Tier-1 pricing; optimize with Hub AI.",
  alternates: { canonical: "/hubx" },
};

const faq = [
  {
    q: "Is HubX for MSPs or for end customers?",
    a: "Both. MSPs and VARs use HubX to manage every customer tenant from one console at Tier-1 direct pricing. Businesses use it to buy, see, and optimize their own Microsoft licensing. HubX is powered by MSP Hub.",
  },
  {
    q: "Does HubX replace the MSP Hub Marketplace?",
    a: (
      <>
        HubX is MSP Hub&apos;s newly released Microsoft portal. How it relates to the existing marketplace at
        portal.msphub.com will be stated here. <Needs id="marketplace" />
      </>
    ),
  },
  {
    q: "How is HubX priced?",
    a: (
      <>
        Pricing details are being finalized: whether HubX is included with licensing purchased through MSP Hub,
        offered per tenant, or priced for partners separately. Ask on the demo in the meantime. <Needs id="pricing" />
      </>
    ),
  },
  {
    q: "Can I move an existing CSP agreement to HubX?",
    a: "Yes. Existing subscriptions are transferred under the Microsoft CSP program and appear in HubX without re-purchasing. Timing and steps are covered on the demo.",
  },
  {
    q: "What support is included?",
    a: "Integrated support tickets inside the portal with severity, attachments, and team assignment, backed by MSP Hub's 24/7 managed support team and direct Microsoft escalation.",
  },
  {
    q: "Where is my data hosted?",
    a: (
      <>
        Hosting region, data residency, and security certifications for HubX will be published here.{" "}
        <Needs id="dataHosting" />
      </>
    ),
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq
    .filter((f) => typeof f.a === "string")
    .map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a as string },
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
        eyebrow="The Microsoft portal · HubX, powered by MSP Hub"
        title="The Microsoft portal for licensing, procurement, and spend."
        lead="See every license, cost, and renewal in one place. Buy, provision, and manage directly at Tier-1 pricing. Let Hub AI find the savings. Built for MSPs managing many tenants, and for businesses managing their own."
        below={<PortalFrame variant="licenses" />}
      >
        <ButtonLink href="/demo">
          Schedule a demo
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href={site.hubxLoginUrl} variant="glass">
          Log in to HubX
        </ButtonLink>
        <span className="inline-flex items-center">
          <Needs id="loginUrl" />
        </span>
      </PageHero>

      <Section tight className="pt-0 sm:pt-0">
        <Container className="flex flex-col items-center gap-5 text-center">
          <HubXLogo className="h-12 w-auto sm:h-14" />
          <p className="text-sm text-white/70">HubX, powered by MSP Hub. Delivered by MSP Hub&apos;s services team.</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Chip>Microsoft 365 · Azure · Copilot · Dynamics</Chip>
            <Chip>Tier-1 Direct CSP pricing</Chip>
            <Chip>For MSPs and for businesses</Chip>
          </div>
        </Container>
      </Section>

      {/* Who it's for */}
      <Section>
        <Container>
          <SectionHeading eyebrow="Who it's for" title="One portal. Two ways to run Microsoft." />
          <div className="grid gap-4 lg:grid-cols-2">
            {hubxAudiences.map((a) => (
              <GlassCard key={a.who} className="p-8 sm:p-9">
                <p className="text-xs font-semibold tracking-[0.12em] text-brand-orange uppercase">{a.who}</p>
                <h3 className="mt-3 font-display text-[1.75rem] leading-tight tracking-[-0.01em] text-white">{a.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-white/70">{a.body}</p>
                <CheckList items={[...a.points]} className="mt-5" />
              </GlassCard>
            ))}
          </div>
          <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/55">
            Audience positioning and white-label options to be confirmed. <Needs id="audienceSplit" />
          </p>
        </Container>
      </Section>

      {/* Capabilities */}
      <Section className="pt-0 sm:pt-0 lg:pt-0" decor={<Glow tone="navy" className="top-0 right-[-300px] h-[700px] w-[900px]" />}>
        <Container>
          <SectionHeading eyebrow="Capabilities" title="Data-driven decisions in a single pane of glass." />
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
            title="Live in days, not quarters."
            lead={
              <>
                Onboarding steps are indicative and will be confirmed with the HubX product team. <Needs id="onboarding" />
              </>
            }
          />
          <Steps steps={hubxSteps} />
        </Container>
      </Section>

      {/* Hub AI */}
      <Section className="pt-0 sm:pt-0 lg:pt-0" decor={<Glow tone="orange" className="top-[-100px] left-[-250px] h-[700px] w-[700px] opacity-60" />}>
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Hub AI</Eyebrow>
              <Display className="mt-3.5">Ask your licensing estate a question.</Display>
              <Lead className="mt-4">
                Hub AI answers questions about orders, products, licenses, and subscriptions, for your team and for your
                customers, so nobody digs through portals and PDFs.
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
              <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/55">
                Hub AI feature set carried over from the current site. <Needs id="hubAi" />
              </p>
            </div>
            <div className="glass glass-lg grid gap-3 p-5 sm:p-6" aria-label="Example Hub AI conversation (sample data)">
              <p className="flex items-center gap-2 text-[11px] tracking-[0.1em] text-white/45 uppercase">
                <svg viewBox="772 65.5 244 244" className="size-3.5" aria-hidden>
                  <path fill="#F97316" d="M772 81H842L894 145.4L946 81H1016L930 187.5L894 159L858 187.5ZM772 294H842L894 229.6L946 294H1016L930 187.5L894 216L858 187.5Z" />
                </svg>
                Hub AI · Contoso Ltd · Sample data
              </p>
              <div className="ml-auto max-w-[86%] rounded-2xl rounded-br-sm border border-brand-orange/30 bg-brand-orange/16 px-3.5 py-3 text-sm">
                Which Contoso licenses renew before December, and what will they cost?
              </div>
              <div className="max-w-[86%] rounded-2xl rounded-bl-sm border border-white/12 bg-white/6 px-3.5 py-3 text-sm leading-relaxed text-white/70">
                <b className="text-white">Two subscriptions renew before December 1.</b>
                <br />• Microsoft 365 E3 — 420 seats — renews Nov 14 — $15,120 / mo
                <br />• Business Premium — 85 seats — renews Nov 20 — $1,870 / mo
                <br />
                <br />
                133 E3 seats are currently unassigned. Reclaiming them before Nov 14 saves{" "}
                <b className="text-white">$4,788 / mo</b>. Want me to schedule the change?
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {["Licenses · Contoso", "Invoice · Oct 2026", "Renewal calendar"].map((s) => (
                    <span key={s} className="rounded-full border border-white/12 px-2 py-0.5 text-[11px] text-white/45">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="ml-auto max-w-[86%] rounded-2xl rounded-br-sm border border-brand-orange/30 bg-brand-orange/16 px-3.5 py-3 text-sm">
                Yes, schedule it for Nov 13 and notify finance.
              </div>
              <div className="max-w-[86%] rounded-2xl rounded-bl-sm border border-white/12 bg-white/6 px-3.5 py-3 text-sm text-white/70">
                Scheduled. Order #48213 will reduce E3 to 287 seats on Nov 13. Finance has been notified.
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Integrations & trust */}
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <SectionHeading eyebrow="Integrations & trust" title="Fits the stack you already run." />
          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard icon={Cable} title="APIs and integrations">
              Flexible API integrations with your RMM, PSA, and CRM platforms, plus automated billing and invoicing.{" "}
              <Needs id="integrations" />
            </FeatureCard>
            <FeatureCard icon={ShieldCheck} title="Security and compliance">
              ISO certified operations and Microsoft Modern Work and Azure credentials, with data handled under
              Microsoft&apos;s CSP program.
            </FeatureCard>
            <FeatureCard icon={Headset} title="Direct Microsoft escalation">
              As a Tier-1 Direct CSP, MSP Hub escalates to Microsoft directly. No reseller layer between you and a fix.
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
              <Display className="mt-3.5">Tier-1 direct pricing on the whole Microsoft catalog.</Display>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {licensingCatalog.map((sku) => (
                  <Chip key={sku}>{sku}</Chip>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start gap-3">
              <ButtonLink href="/microsoft-365-quote">Get a Microsoft 365 quote</ButtonLink>
              <ButtonLink href="/contact" variant="glass">
                Talk to licensing
              </ButtonLink>
              <p className="flex flex-wrap items-center gap-2 text-xs text-white/45">
                Response within one business day <Needs id="responseTime" />
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Testimonial */}
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <Testimonial quote={testimonials[1]} className="mx-auto max-w-[900px]" />
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
              <a href={site.hubxLoginUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-white underline-offset-4 hover:underline">
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

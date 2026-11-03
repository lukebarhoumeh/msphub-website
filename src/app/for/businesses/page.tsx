import { ArrowRight, ExternalLink } from "lucide-react";
import { CaseCard } from "@/components/ink/cards";
import { DeviceFrame } from "@/components/ink/device-frame";
import { EvidenceFigure } from "@/components/ink/evidence";
import { Chapter, DotList, InkLink, NextStep, RuleList, StatRail, inkTone, monoLabel } from "@/components/ink/interior";
import { FaqSection } from "@/components/marketing/faq-section";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { audiences } from "@/content/audiences";
import { cases } from "@/content/cases";
import { nceFacts, transferFacts } from "@/content/direct-bill";
import { captures } from "@/content/evidence";
import { homeProof } from "@/content/home";
import { licensingFaq } from "@/content/licensing";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({
  title: "Microsoft licensing and services for businesses — buy direct, see everything in HubX",
  description:
    "For businesses buying Microsoft 365, Azure, and Copilot directly: Tier-1 direct pricing from a CSP direct-bill partner, every subscription and invoice in HubX, and migration and managed services from the same team.",
  path: "/for/businesses",
});

const business = audiences.find((a) => a.id === "business")!;
const staffing = cases.find((c) => c.id === "staffing-firm")!;

const outcomes = [
  {
    title: "Cost visibility",
    body: "Every subscription with its quantity, term, billing frequency, expiration date, and auto-renew setting, and the invoice behind it. Finance and IT read the same page.",
  },
  {
    title: "One support path",
    body: "Licensing and billing questions go to the HubX Service Desk during business hours. MSP Hub escalates to Microsoft Premier support directly, with no distributor in between.",
  },
  {
    title: "Licensing and services from one team",
    body: "Migrations, security, Azure, and managed operations from the team that holds the licensing, so every project starts from the estate as it actually is.",
  },
];

const faq = [
  ...licensingFaq.filter((f) => ["How does billing work?", "Which commitment terms are available?", "Do my existing subscriptions transfer?"].includes(f.q)),
  { q: nceFacts[0].q, a: nceFacts[0].a },
  {
    q: "What are the support hours?",
    a: `Licensing and billing support runs during business hours (${site.supportHours}), through the HubX Service Desk and ${site.salesEmail}. Around-the-clock monitoring applies to environments under MSP Hub managed services.`,
  },
];

export default function BusinessesPage() {
  return (
    <>
      <PageHero
        eyebrow="For businesses · buy direct"
        title={business.title}
        lead={business.body}
        aside={
          // The frame is the largest paint on phones; the copy carries the hero there and the same screens follow below.
          <figure className="m-0 hidden flex-col items-center lg:flex lg:items-end">
            <DeviceFrame capture={captures.customerProductsHome} variant="browser" path="/customers/products" priority className="w-full max-w-[520px]" />
            <figcaption className={cn(monoLabel, "mt-3 w-full max-w-[520px]", inkTone.ink.muted)}>Actual HubX UI · demo data</figcaption>
          </figure>
        }
      >
        <ButtonLink href={business.cta.href}>
          {business.cta.label}
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="/licensing/switch" variant="glass">
          Send us your invoice
        </ButtonLink>
      </PageHero>

      <section aria-label="Company proof" className="pb-14 text-white">
        <Container>
          <StatRail tone="ink" items={homeProof} />
        </Container>
      </section>

      <Chapter tone="pearl" title="Three things change when you buy direct." headingWidth="max-w-[18ch]">
        <RuleList tone="pearl" numbered columns={3} items={outcomes} />
      </Chapter>

      <Chapter tone="pearl" pad="tight" id="hubx" title="What you see in HubX." lead="The customer portal: products, invoices, and the Service Desk, with HubAI for questions about your own estate." headingWidth="max-w-[18ch]">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <EvidenceFigure capture={captures.customerProductsHubx} tone="pearl" />
          <EvidenceFigure capture={captures.homeWidgets} tone="pearl" />
        </div>
        <DotList tone="pearl" columns={2} className="mt-10" items={business.points} />
      </Chapter>

      <Chapter tone="ink" id="offers" title="Two ways in." headingWidth="max-w-[12ch]">
        <RuleList
          tone="ink"
          columns={2}
          items={[
            {
              title: "Already buying Microsoft somewhere else? Send us your invoice.",
              body: "The deal desk returns a line-by-line comparison and a transfer plan. Subscriptions, terms, and renewal dates move intact by partner-to-partner transfer; nothing is re-bought.",
              link: { label: "Switch to MSP Hub", href: "/licensing/switch" },
            },
            {
              title: "Leaving an Enterprise Agreement?",
              body: "Mid-market and enterprise organizations move LSP-run Enterprise Agreements to CSP for flexibility per workload, a direct support path, and services from the same team.",
              link: { label: "Read the EA to CSP guide", href: "/licensing/ea-to-csp" },
            },
          ]}
        />
        <div className="mt-12 grid gap-8 border-t border-white/15 pt-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className={cn(monoLabel, inkTone.ink.faint)}>What Microsoft says about moving</p>
            <p className={cn("mt-3 max-w-[46ch] text-[15.5px] leading-[1.6]", inkTone.ink.muted)}>{transferFacts[2].a}</p>
            <InkLink href={transferFacts[2].citation.href} tone="ink" className="mt-3 gap-1.5 text-[14px]">
              {transferFacts[2].citation.label}
              <ExternalLink className="size-3.5" aria-hidden />
            </InkLink>
          </div>
          <div className="lg:col-span-7">
            <CaseCard item={staffing} tone="ink" />
          </div>
        </div>
      </Chapter>

      <Chapter tone="pearl" size="md" title="Buying direct, answered.">
        <FaqSection items={faq} tone="light" variant="rule" className="max-w-[860px]" />
      </Chapter>

      <NextStep
        tone="ink"
        title="Get a licensing quote."
        lead="Tell us what you run and who you buy from today. A licensing specialist replies with pricing, the right plan mix, and a transfer plan if you already own the subscriptions."
        primary={{ label: "Request a quote", href: "/licensing/quote" }}
        secondary={[
          { label: "Send us your invoice", href: "/licensing/switch" },
          { label: "Talk to licensing", href: "/contact?topic=sales#contact-form" },
        ]}
      />
    </>
  );
}

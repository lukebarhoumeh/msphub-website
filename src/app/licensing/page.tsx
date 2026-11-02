import { ArrowRight, ExternalLink } from "lucide-react";
import { BrowserFrame } from "@/components/marketing/browser-frame";
import { CtaBand, TextLink, TrustStrip } from "@/components/marketing/blocks";
import { FaqSection } from "@/components/marketing/faq-section";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Chip, GlassCard } from "@/components/ui/card";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { Container, Glow, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead, SectionHeading } from "@/components/ui/typography";
import {
  billingFacts,
  catalogFamilies,
  commitmentTerms,
  licensingFaq,
  licensingHub,
  licensingMotions,
  qualifications,
} from "@/content/licensing";
import { screens } from "@/content/screens";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Microsoft licensing from a CSP direct-bill partner — Microsoft 365, Azure, Copilot, Dynamics 365",
  description: "Buy Microsoft licensing direct from MSP Hub, a Microsoft CSP direct-bill partner (Tier-1 Direct): 7,600+ SKUs, transfers that keep your terms, EA to CSP, and every subscription managed in HubX.",
  path: "/licensing",
});

/** Literal class names so Tailwind's scanner emits every stagger step. */
const stagger = ["stagger-1", "stagger-2", "stagger-3", "stagger-4", "stagger-5"];

export default function LicensingPage() {
  return (
    <>
      <PageHero eyebrow={licensingHub.eyebrow} title={licensingHub.title} lead={licensingHub.lead}>
        <ButtonLink href="/licensing/quote">
          Get a licensing quote
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="/licensing/switch" variant="glass">
          Switch to MSP Hub
        </ButtonLink>
      </PageHero>

      <Section className="pt-0 sm:pt-0 lg:pt-0" decor={<Glow tone="navy" className="top-0 right-[-300px] h-[700px] w-[900px]" />}>
        <Container>
          <SectionHeading eyebrow="What the deal desk does" title="Five ways in. One licensing desk." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {licensingMotions.map((m, i) => (
              <GlassCard key={m.title} className={`flex flex-col motion-safe:animate-fade-up ${stagger[Math.min(i, 4)]}`}>
                <span className="font-mono text-xs font-semibold tracking-[0.08em] text-brand-orange">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">{m.title}</h3>
                <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-white/70">{m.body}</p>
                <TextLink href={m.href} className="mt-5">
                  {m.linkLabel}
                </TextLink>
              </GlassCard>
            ))}
            <GlassCard className="flex flex-col justify-between border-brand-orange/30 bg-[linear-gradient(160deg,rgba(249,115,22,.16),rgba(249,115,22,.04))]">
              <div>
                <Eyebrow>Not sure which?</Eyebrow>
                <h3 className="mt-3.5 font-display text-[1.625rem] leading-tight tracking-[-0.01em] text-white">Send what you have.</h3>
                <p className="mt-2.5 text-[15px] text-white/70">
                  A current invoice, a license export, or just the SKUs you think you run. The licensing desk sorts out the rest.
                </p>
              </div>
              <ButtonLink href="/licensing/quote" className="mt-6 self-start">
                Request a quote
              </ButtonLink>
            </GlassCard>
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <SectionHeading
            tone="light"
            eyebrow="Catalog"
            title="7,600+ SKUs. Every Microsoft cloud family, direct."
            lead={licensingHub.catalogClaim}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {catalogFamilies.map((f) => (
              <GlassCard key={f.name} tone="light" className="p-6">
                <h3 className="text-lg font-semibold tracking-tight text-charcoal">{f.name}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {f.items.map((item) => (
                    <li key={item}>
                      <Chip tone="light" wrap mono className="text-charcoal/85">
                        {item}
                      </Chip>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
            <GlassCard tone="light" className="p-7">
              <p className="font-mono text-xs font-semibold tracking-[0.12em] text-charcoal uppercase">Qualification types</p>
              <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                {qualifications.map((q) => (
                  <div key={q.id}>
                    <dt className="font-semibold text-charcoal">{q.label}</dt>
                    <dd className="mt-1 text-[14.5px] leading-relaxed text-charcoal/80">{q.body}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-[13px] text-charcoal/80">
                HubX shows each customer only the offers they are qualified to buy. <NeedsConfirm id="government" fallback={null}>Government estates: hold until authorization is confirmed.</NeedsConfirm>
              </p>
            </GlassCard>
            <GlassCard tone="light" className="p-7">
              <p className="font-mono text-xs font-semibold tracking-[0.12em] text-charcoal uppercase">Commitment terms</p>
              <dl className="mt-4 grid gap-4">
                {commitmentTerms.map((t) => (
                  <div key={t.term} className="flex gap-4">
                    <dt className="w-20 shrink-0 font-semibold text-charcoal">{t.term}</dt>
                    <dd className="text-[14.5px] leading-relaxed text-charcoal/80">{t.body}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-[13px] text-charcoal/80">
                License-based subscriptions follow the New Commerce Experience (NCE); Azure consumption runs through an Azure plan. Existing
                subscriptions transfer with their terms.
              </p>
            </GlassCard>
          </div>
        </Container>
      </Section>

      <Section decor={<Glow tone="orange" className="top-[-100px] left-[-250px] h-[700px] w-[700px] opacity-60" />}>
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>{licensingHub.whyDirect.title}</Eyebrow>
              <Display className="mt-3.5">No distributor in the price. None in the escalation path.</Display>
              <Lead className="mt-4">{licensingHub.whyDirect.body}</Lead>
              <a
                href={licensingHub.whyDirect.citation.href}
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 underline-offset-4 hover:text-white hover:underline"
              >
                {licensingHub.whyDirect.citation.label}
                <ExternalLink className="size-3.5" aria-hidden />
              </a>
            </div>
            <GlassCard className="p-7">
              <p className="font-mono text-xs font-semibold tracking-[0.12em] text-brand-orange uppercase">How billing works</p>
              <dl className="mt-4 grid gap-4">
                {billingFacts.map((b) => (
                  <div key={b.label} className="grid gap-1 border-b border-white/10 pb-4 last:border-b-0 last:pb-0 sm:grid-cols-[150px_1fr] sm:gap-4">
                    <dt className="text-sm font-medium text-white/60">{b.label}</dt>
                    <dd className="text-[15px] text-white">{b.value}</dd>
                  </div>
                ))}
              </dl>
            </GlassCard>
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <SectionHeading
            tone="light"
            eyebrow="Managed in HubX"
            title="Every subscription, term, and renewal per SKU."
            lead="Licensing bought through MSP Hub is managed in HubX, powered by MSP Hub: status, quantity, term and billing frequency, purchase and expiration dates, auto-renew, and the invoices behind them."
          />
          <BrowserFrame screen={screens.customerProducts} sizes="(min-width: 1024px) 1100px, 100vw" viewport="scroll" />
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/hubx" variant="glass" className="border-black/15 bg-white text-charcoal hover:bg-white/80">
              Explore HubX
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Questions" title="Licensing, answered." align="center" />
          <FaqSection items={licensingFaq} />
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <TrustStrip />
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <CtaBand
          title="Get a licensing quote."
          lead="Tell us what you run and who you buy from today. A licensing specialist replies with pricing, the right plan mix, and a transfer plan if you already own the subscriptions."
          primary={{ label: "Request a quote", href: "/licensing/quote" }}
          secondary={[
            { label: "Send us your invoice", href: "/licensing/switch" },
            { label: "Talk to licensing", href: "/contact?topic=sales#contact-form" },
          ]}
        />
      </Section>
    </>
  );
}

import { ArrowRight, ExternalLink, Lock } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { InvoiceUpload } from "@/components/licensing/invoice-upload";
import { CheckList, CtaBand, TrustStrip } from "@/components/marketing/blocks";
import { BrowserFrame } from "@/components/marketing/browser-frame";
import { FaqSection } from "@/components/marketing/faq-section";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { Container, Glow, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead, SectionHeading } from "@/components/ui/typography";
import { microsoftLearn, switchFaq, switchPage, switchSteps } from "@/content/licensing";
import { screens } from "@/content/screens";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Switch your Microsoft licensing to MSP Hub — send your invoice, nothing is re-bought",
  description: "Transfer Microsoft 365 and Azure subscriptions to MSP Hub by partner-to-partner transfer. Send your current invoice; the deal desk returns a line-by-line comparison and a transfer plan. Terms and renewal dates carry over.",
  path: "/licensing/switch",
});

const stagger = ["stagger-1", "stagger-2", "stagger-3", "stagger-4", "stagger-5"];

export default function SwitchPage() {
  return (
    <>
      <PageHero eyebrow={switchPage.eyebrow} title={switchPage.title} lead={switchPage.lead}>
        <ButtonLink href="#send-invoice">
          Send your invoice
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="#how-it-works" variant="glass">
          How the transfer works
        </ButtonLink>
      </PageHero>

      <Section className="pt-0 sm:pt-0 lg:pt-0" decor={<Glow tone="navy" className="top-0 right-[-300px] h-[700px] w-[900px]" />}>
        <Container>
          <SectionHeading eyebrow="Who switches" title="Three places people buy Microsoft today. One transfer." />
          <div className="grid gap-4 md:grid-cols-3">
            {switchPage.movingFrom.map((m, i) => (
              <GlassCard key={m.title} className={`motion-safe:animate-fade-up ${stagger[i]}`}>
                <h3 className="text-lg font-semibold tracking-tight text-white">{m.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-white/70">{m.body}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="how-it-works" tone="light" className="scroll-mt-20">
        <Container>
          <SectionHeading
            tone="light"
            eyebrow="How it works"
            title="Five steps. Nothing re-bought."
            lead="Subscriptions move between CSP partners by partner-to-partner transfer. Your tenant, users, and data stay exactly where they are."
          />
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {switchSteps.map((step, i) => (
              <li key={step.title} className={`card-light flex flex-col p-6 motion-safe:animate-fade-up ${stagger[i]}`}>
                <span className="font-display text-[2.5rem] leading-none text-brand-orange">{i + 1}</span>
                <h3 className="mt-4 text-[17px] font-semibold text-charcoal">{step.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-charcoal/80">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-[13px] text-charcoal/80">
            Timing depends on your acceptance of the reseller relationship and the open transfer window.{" "}
            <NeedsConfirm id="onboardingWording" fallback="Most switches complete within one billing cycle." />{" "}
            <a href={microsoftLearn.transfers.href} rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-charcoal underline decoration-brand-orange/60 underline-offset-4 hover:decoration-brand-orange">
              How Microsoft describes partner-to-partner transfers
              <ExternalLink className="size-3" aria-hidden />
            </a>
          </p>
        </Container>
      </Section>

      <Section decor={<Glow tone="orange" className="top-[-100px] left-[-250px] h-[700px] w-[700px] opacity-60" />}>
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>{switchPage.comparison.title}</Eyebrow>
              <Display className="mt-3.5">A comparison you can hand to finance.</Display>
              <Lead className="mt-4">
                The deal desk works from your actual invoice, not a list price sheet, and returns the comparison and the transfer plan
                together.
              </Lead>
              <CheckList items={switchPage.comparison.items} className="mt-7" />
            </div>
            <BrowserFrame screen={screens.customerProducts} sizes="(min-width: 1024px) 50vw, 100vw" viewport="scroll" />
          </div>
        </Container>
      </Section>

      <Section id="send-invoice" className="scroll-mt-20 pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="glass glass-lg grid gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_1.4fr] lg:p-14">
            <div>
              <Eyebrow>Send your invoice</Eyebrow>
              <Display className="mt-3.5">Start the comparison.</Display>
              <Lead className="mt-4">
                Upload your current Microsoft invoice or a license export and tell us who you buy from today. The deal desk replies with
                the comparison and the transfer plan.
              </Lead>
              <p className="mt-6 flex items-start gap-2.5 text-sm text-white/70">
                <Lock className="mt-0.5 size-4 shrink-0 text-brand-orange" aria-hidden />
                {switchPage.privacyNote}
              </p>
              <p className="mt-4 text-sm text-white/70">
                <NeedsConfirm id="quoteResponse" fallback="The licensing desk replies during business hours.">
                  Response within one business day.
                </NeedsConfirm>
              </p>
            </div>
            <LeadForm kind="switch">
              <InvoiceUpload kind="switch" />
            </LeadForm>
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <SectionHeading tone="light" eyebrow="Questions" title="Switching, answered." align="center" />
          <FaqSection items={switchFaq} tone="light" />
        </Container>
      </Section>

      <Section>
        <Container>
          <TrustStrip />
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <CtaBand
          eyebrow="Enterprise Agreement?"
          title="Leaving an EA is a different path. We run that too."
          lead="Enterprise Agreements are transacted by a Licensing Solution Provider. We map the estate to CSP, plan the timing around your agreement dates, and provision in HubX."
          primary={{ label: "Read the EA to CSP guide", href: "/licensing/ea-to-csp" }}
          secondary={[{ label: "Talk to licensing", href: "/contact?topic=sales#contact-form" }]}
        />
      </Section>
    </>
  );
}

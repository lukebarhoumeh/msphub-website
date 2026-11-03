import { ArrowRight, ExternalLink, Lock } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { EvidenceFigure } from "@/components/ink/evidence";
import { Chapter, DotList, InkLink, NextStep, Panel, RuleList, StatRail, inkTone, monoLabel } from "@/components/ink/interior";
import { InvoiceUpload } from "@/components/licensing/invoice-upload";
import { FaqSection } from "@/components/marketing/faq-section";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { Container } from "@/components/ui/section";
import { captures } from "@/content/evidence";
import { homeProof } from "@/content/home";
import { microsoftLearn, switchFaq, switchPage, switchSteps } from "@/content/licensing";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({
  title: "Switch your Microsoft licensing to MSP Hub — send your invoice, nothing is re-bought",
  description: "Transfer Microsoft 365 and Azure subscriptions to MSP Hub by partner-to-partner transfer. Send your current invoice; the deal desk returns a line-by-line comparison and a transfer plan. Terms and renewal dates carry over.",
  path: "/licensing/switch",
});

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

      <Chapter tone="ink" pad="flush-top" size="md" title="Three places people buy Microsoft today. One transfer." headingWidth="max-w-[24ch]">
        <RuleList tone="ink" columns={3} titleSize="md" items={switchPage.movingFrom} />
      </Chapter>

      <Chapter
        tone="pearl"
        id="how-it-works"
        title="Five steps. Nothing re-bought."
        lead="Subscriptions move between CSP partners by partner-to-partner transfer. Your tenant, users, and data stay exactly where they are."
      >
        <RuleList tone="pearl" numbered columns={5} titleSize="md" items={switchSteps} />
        <p className={cn("mt-10 max-w-[80ch] text-[15px] leading-[1.6]", inkTone.pearl.muted)}>
          Timing depends on your acceptance of the reseller relationship and the open transfer window.{" "}
          <NeedsConfirm id="onboardingWording" fallback="Most switches complete within one billing cycle." />{" "}
          <InkLink href={microsoftLearn.transfers.href} tone="pearl" className="min-h-0 gap-1 text-[15px]">
            How Microsoft describes partner-to-partner transfers
            <ExternalLink className="size-3" aria-hidden />
          </InkLink>
        </p>
      </Chapter>

      <Chapter tone="ink" title="A comparison you can hand to finance." headingWidth="max-w-[16ch]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:col-span-5">
            <p className={cn(monoLabel, inkTone.ink.faint)}>{switchPage.comparison.title}</p>
            <p className={cn("mt-4 max-w-[46ch] text-[17px] leading-[1.6]", inkTone.ink.muted)}>
              The deal desk works from your actual invoice, not a list price sheet, and returns the comparison and the transfer plan together.
            </p>
            <DotList tone="ink" className="mt-6" items={switchPage.comparison.items} />
          </div>
          <div className="lg:col-span-7">
            <EvidenceFigure capture={captures.customerProductsHubx} tone="ink" />
          </div>
        </div>
      </Chapter>

      <section id="send-invoice" data-surface="ink" className="scroll-mt-24 bg-[#0b1020] pb-[clamp(64px,7vw,104px)] text-white">
        <Container>
          <Panel tone="ink" className="grid gap-10 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:p-14">
            <div>
              <p className={cn(monoLabel, inkTone.ink.muted)}>Send your invoice</p>
              <h2 className="mt-4 font-display text-[30px] leading-[1.1] font-bold tracking-[-0.02em] lg:text-[40px]">Start the comparison.</h2>
              <p className={cn("mt-4 max-w-[46ch] text-[17px] leading-[1.6]", inkTone.ink.muted)}>
                Upload your current Microsoft invoice or a license export and tell us who you buy from today. The deal desk replies with the comparison and
                the transfer plan.
              </p>
              <p className={cn("mt-6 flex items-start gap-2.5 text-sm", inkTone.ink.muted)}>
                <Lock className="mt-0.5 size-4 shrink-0 text-[#f97316]" aria-hidden />
                {switchPage.privacyNote}
              </p>
              <p className={cn("mt-4 text-sm", inkTone.ink.muted)}>
                <NeedsConfirm id="quoteResponse" fallback="The licensing desk replies during business hours.">
                  Response within one business day.
                </NeedsConfirm>
              </p>
            </div>
            <LeadForm kind="switch">
              <InvoiceUpload kind="switch" />
            </LeadForm>
          </Panel>
        </Container>
      </section>

      <Chapter tone="pearl" size="md" title="Switching, answered.">
        <FaqSection items={switchFaq} tone="light" variant="rule" className="max-w-[860px]" />
      </Chapter>

      <section aria-label="Company proof" data-surface="pearl" className="bg-[#f4f6fb] pb-[clamp(64px,7vw,104px)] text-[#0b1020]">
        <Container>
          <StatRail tone="pearl" items={homeProof} />
        </Container>
      </section>

      <NextStep
        tone="ink"
        eyebrow="Enterprise Agreement?"
        title="Leaving an EA is a different path. We run that too."
        lead="Enterprise Agreements are transacted by a Licensing Solution Provider. We map the estate to CSP, plan the timing around your agreement dates, and provision in HubX."
        primary={{ label: "Read the EA to CSP guide", href: "/licensing/ea-to-csp" }}
        secondary={[{ label: "Talk to licensing", href: "/contact?topic=sales#contact-form" }]}
      />
    </>
  );
}

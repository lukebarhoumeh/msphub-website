import { HubXPoweredBy } from "@/components/brand/hubx-logo";
import { LeadForm } from "@/components/forms/lead-form";
import { InvoiceUpload } from "@/components/licensing/invoice-upload";
import { CheckList, TrustStrip } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { Chip, GlassCard } from "@/components/ui/card";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { Container, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/typography";
import { licenseOptions } from "@/content/forms";
import { quotePage } from "@/content/licensing";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Licensing quote — Tier-1 direct pricing on Microsoft 365, Azure, and Copilot",
  description:
    "Request Tier-1 direct pricing on Microsoft 365, Azure, Copilot, and the rest of the Microsoft catalog from MSP Hub, a CSP direct-bill partner. Attach your current invoice for a line-by-line comparison.",
  path: "/licensing/quote",
  socialTitle: "Request a Microsoft licensing quote",
});

export default function QuotePage() {
  return (
    <>
      <PageHero eyebrow={quotePage.eyebrow} title={quotePage.title} lead={quotePage.lead}>
        <div className="flex flex-wrap gap-2">
          {licenseOptions.map((sku) => (
            <Chip key={sku} mono>
              {sku}
            </Chip>
          ))}
        </div>
      </PageHero>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
            <div className="space-y-6">
              <GlassCard>
                <Eyebrow>Why buy through MSP Hub</Eyebrow>
                <CheckList className="mt-4" items={quotePage.why} />
                <p className="mt-5">
                  <HubXPoweredBy logoClassName="h-5 w-auto" />
                </p>
              </GlassCard>
              <GlassCard>
                <Eyebrow>Already buying Microsoft?</Eyebrow>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                  Attach your current invoice and the deal desk returns a line-by-line comparison and a transfer plan. Existing subscriptions
                  move by partner-to-partner transfer; nothing is re-bought.
                </p>
              </GlassCard>
              <p className="text-sm text-white/70">
                <NeedsConfirm id="quoteResponse" fallback="Response within one business day." />
              </p>
            </div>
            <div className="glass glass-lg p-7 sm:p-10">
              <Display size="md" className="mb-2">
                Request a quote
              </Display>
              <Lead className="mb-7 text-base">Approximate numbers are fine; we refine them with you.</Lead>
              <LeadForm kind="quote">
                <InvoiceUpload kind="quote" />
              </LeadForm>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <TrustStrip />
        </Container>
      </Section>
    </>
  );
}

import { LeadForm } from "@/components/forms/lead-form";
import { ChipRow, DotList, Panel, StatRail, inkTone, monoLabel } from "@/components/ink/interior";
import { InvoiceUpload } from "@/components/licensing/invoice-upload";
import { PageHero } from "@/components/marketing/page-hero";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { Container } from "@/components/ui/section";
import { licenseOptions } from "@/content/forms";
import { homeProof } from "@/content/home";
import { hubxLockup } from "@/content/hubx";
import { quotePage } from "@/content/licensing";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/cn";

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
        <ChipRow tone="ink" mono items={licenseOptions} label="Licensing families" />
      </PageHero>

      <section data-surface="ink" className="bg-[#0b1020] pb-[clamp(64px,7vw,104px)] text-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
            <div>
              <div className="border-t border-white/15 pt-5">
                <p className={cn(monoLabel, inkTone.ink.faint)}>Why buy through MSP Hub</p>
                <DotList tone="ink" className="mt-4" items={quotePage.why} />
                <p className={cn(monoLabel, "mt-6", inkTone.ink.muted)}>{hubxLockup}</p>
              </div>
              <div className="mt-8 border-t border-white/15 pt-5">
                <p className={cn(monoLabel, inkTone.ink.faint)}>Already buying Microsoft?</p>
                <p className={cn("mt-3 max-w-[46ch] text-[16px] leading-[1.6]", inkTone.ink.muted)}>
                  Attach your current invoice and the deal desk returns a line-by-line comparison and a transfer plan. Existing subscriptions move by
                  partner-to-partner transfer; nothing is re-bought.
                </p>
              </div>
              <p className={cn("mt-8 text-sm", inkTone.ink.muted)}>
                <NeedsConfirm id="quoteResponse" fallback="The licensing desk replies during business hours.">
                  Response within one business day.
                </NeedsConfirm>
              </p>
            </div>
            <Panel tone="ink" id="quote-form" className="scroll-mt-24 sm:p-10">
              <h2 className="font-display text-[30px] leading-[1.1] font-bold tracking-[-0.02em]">Request a quote</h2>
              <p className={cn("mt-3 mb-7 text-[16px] leading-[1.6]", inkTone.ink.muted)}>Approximate numbers are fine; we refine them with you.</p>
              <LeadForm kind="quote">
                <InvoiceUpload kind="quote" />
              </LeadForm>
            </Panel>
          </div>
        </Container>
      </section>

      <section aria-label="Company proof" data-surface="pearl" className="bg-[#f4f6fb] py-[clamp(48px,5vw,72px)] text-[#0b1020]">
        <Container>
          <StatRail tone="pearl" items={homeProof} />
        </Container>
      </section>
    </>
  );
}

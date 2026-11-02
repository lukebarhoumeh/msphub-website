import type { Metadata } from "next";
import { HubXPoweredBy } from "@/components/brand/hubx-logo";
import { LeadForm } from "@/components/forms/lead-form";
import { CheckList, TrustStrip } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { Chip, GlassCard } from "@/components/ui/card";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { Container, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/typography";
import { licensingCatalog } from "@/content/hubx";

export const metadata: Metadata = {
  title: "Licensing quote — Tier-1 direct pricing on Microsoft 365, Azure, and Copilot",
  description:
    "Request Tier-1 direct pricing on Microsoft 365, Azure, Copilot, and the rest of the Microsoft catalog from MSP Hub. Licenses are managed in HubX, powered by MSP Hub.",
  alternates: { canonical: "/microsoft-365-quote" },
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Microsoft licensing"
        title="Tier-1 direct pricing on Microsoft 365, Azure, and Copilot."
        lead="Tell us what you run and what renews when. A licensing specialist replies with pricing, the right plan mix, and any savings we can see."
      >
        <div className="flex flex-wrap gap-2">
          {licensingCatalog.map((sku) => (
            <Chip key={sku}>{sku}</Chip>
          ))}
        </div>
      </PageHero>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
            <div className="space-y-6">
              <GlassCard>
                <Eyebrow>Why buy through MSP Hub</Eyebrow>
                <CheckList
                  className="mt-4"
                  items={[
                    "Microsoft CSP direct-bill partner: no distributor layer in the price",
                    "Existing subscriptions transfer; nothing is re-bought",
                    "Every license managed, renewed, and optimized in HubX",
                    "Migration and managed services from the same team",
                  ]}
                />
                <p className="mt-5">
                  <HubXPoweredBy logoClassName="h-5 w-auto" />
                </p>
              </GlassCard>
              <p className="text-sm text-white/55">
                <NeedsConfirm id="quoteResponse" fallback="Response within one business day." />
              </p>
            </div>
            <div className="glass glass-lg p-7 sm:p-10">
              <Display size="md" className="mb-2">
                Request a quote
              </Display>
              <Lead className="mb-7 text-base">Approximate numbers are fine; we refine them with you.</Lead>
              <LeadForm flow="quote" />
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

import { ArrowRight, ExternalLink } from "lucide-react";
import { EvidenceFigure } from "@/components/ink/evidence";
import { Chapter, ChipRow, FactRows, InkLink, NextStep, RuleList, StatRail, inkTone, itemTitle, monoLabel } from "@/components/ink/interior";
import { FaqSection } from "@/components/marketing/faq-section";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { Container } from "@/components/ui/section";
import { captures } from "@/content/evidence";
import { homeProof } from "@/content/home";
import {
  billingFacts,
  catalogFamilies,
  commitmentTerms,
  licensingFaq,
  licensingHub,
  licensingMotions,
  qualifications,
} from "@/content/licensing";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({
  title: "Microsoft licensing from a CSP direct-bill partner — Microsoft 365, Azure, Copilot, Dynamics 365",
  description: "Buy Microsoft licensing direct from MSP Hub, a Microsoft CSP direct-bill partner (Tier-1 Direct): 7,600+ SKUs, transfers that keep your terms, EA to CSP, and every subscription managed in HubX.",
  path: "/licensing",
});

export default function LicensingPage() {
  return (
    <>
      <PageHero tone="light" eyebrow={licensingHub.eyebrow} title={licensingHub.title} lead={licensingHub.lead}>
        <ButtonLink href="/licensing/quote">
          Get a licensing quote
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="/licensing/switch" variant="outline">
          Switch to MSP Hub
        </ButtonLink>
      </PageHero>

      <Chapter tone="pearl" pad="flush-top" title="Five ways in. One licensing desk." headingWidth="max-w-[18ch]">
        <RuleList
          tone="pearl"
          numbered
          columns={3}
          items={licensingMotions.map((motion) => ({ title: motion.title, body: motion.body, link: { label: motion.linkLabel, href: motion.href } }))}
        />
        <div className="mt-12 grid gap-6 border-t border-[#0b1020]/15 pt-6 lg:grid-cols-[180px_minmax(0,1fr)_auto] lg:items-start">
          <p className={cn(monoLabel, inkTone.pearl.faint)}>Not sure which?</p>
          <div>
            <h3 className={itemTitle}>Send what you have.</h3>
            <p className={cn("mt-3 max-w-[52ch] text-[16px] leading-[1.65]", inkTone.pearl.muted)}>
              A current invoice, a license export, or just the SKUs you think you run. The licensing desk sorts out the rest.
            </p>
          </div>
          <ButtonLink href="/licensing/quote" variant="outline" className="self-start">
            Request a quote
          </ButtonLink>
        </div>
      </Chapter>

      <Chapter tone="ink" id="catalog" title="7,600+ SKUs. Every Microsoft cloud family, direct." lead={licensingHub.catalogClaim} headingWidth="max-w-[20ch]">
        <RuleList
          tone="ink"
          columns={3}
          titleSize="md"
          items={catalogFamilies.map((family) => ({
            title: family.name,
            children: <ChipRow tone="ink" mono items={family.items} />,
          }))}
        />
        <div className="mt-14 grid gap-10 border-t border-white/15 pt-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className={cn(monoLabel, inkTone.ink.faint)}>Qualification types</p>
            <dl className="mt-5 grid gap-5">
              {qualifications.map((q) => (
                <div key={q.id}>
                  <dt className="font-semibold">{q.label}</dt>
                  <dd className={cn("mt-1 text-[15px] leading-[1.6]", inkTone.ink.muted)}>{q.body}</dd>
                </div>
              ))}
            </dl>
            <p className={cn("mt-5 text-[14px] leading-[1.6]", inkTone.ink.muted)}>
              HubX shows each customer only the offers they are qualified to buy.{" "}
              <NeedsConfirm id="government" fallback={null}>
                Government estates: hold until authorization is confirmed.
              </NeedsConfirm>
            </p>
          </div>
          <div>
            <p className={cn(monoLabel, inkTone.ink.faint)}>Commitment terms</p>
            <dl className="mt-5 grid gap-5">
              {commitmentTerms.map((term) => (
                <div key={term.term} className="grid gap-1 sm:grid-cols-[110px_1fr] sm:gap-4">
                  <dt className="font-semibold">{term.term}</dt>
                  <dd className={cn("text-[15px] leading-[1.6]", inkTone.ink.muted)}>{term.body}</dd>
                </div>
              ))}
            </dl>
            <p className={cn("mt-5 text-[14px] leading-[1.6]", inkTone.ink.muted)}>
              License-based subscriptions follow the New Commerce Experience (NCE); Azure consumption runs through an Azure plan. Existing subscriptions
              transfer with their terms.
            </p>
          </div>
        </div>
      </Chapter>

      <Chapter tone="pearl" title="No distributor in the price. None in the escalation path." headingWidth="max-w-[20ch]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <p className={cn(monoLabel, inkTone.pearl.faint)}>{licensingHub.whyDirect.title}</p>
            <p className={cn("mt-4 max-w-[54ch] text-[17px] leading-[1.65]", inkTone.pearl.muted)}>{licensingHub.whyDirect.body}</p>
            <InkLink href={licensingHub.whyDirect.citation.href} tone="pearl" className="mt-4 gap-1.5 text-[15px]">
              {licensingHub.whyDirect.citation.label}
              <ExternalLink className="size-3.5" aria-hidden />
            </InkLink>
          </div>
          <div className="lg:col-span-6">
            <p className={cn(monoLabel, inkTone.pearl.faint)}>How billing works</p>
            <FactRows tone="pearl" className="mt-4" rows={billingFacts.map((fact) => ({ label: fact.label, value: fact.value }))} />
          </div>
        </div>
      </Chapter>

      <Chapter
        tone="ink"
        title="Every subscription, term, and renewal per SKU."
        lead="Licensing bought through MSP Hub is managed in HubX, powered by MSP Hub: status, quantity, term and billing frequency, purchase and expiration dates, auto-renew, and the invoices behind them."
        headingWidth="max-w-[18ch]"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:col-span-7">
            <EvidenceFigure capture={captures.customerProductsHubx} tone="ink" />
          </div>
          <div className="lg:col-span-5">
            <RuleList
              tone="ink"
              columns={1}
              titleSize="md"
              className="gap-y-6"
              items={[
                { title: "Status and quantity", body: "Active or expired per SKU, with the purchased quantity and category." },
                { title: "Term and billing", body: "Monthly, annual, or triennial terms and how each line is billed." },
                { title: "Purchase, expiration, and renewal", body: "Purchase and expiration dates and the auto-renew setting on every line, with the invoices behind them." },
              ]}
            />
            <ButtonLink href="/hubx" variant="glass" className="mt-8">
              Explore HubX
            </ButtonLink>
          </div>
        </div>
      </Chapter>

      <Chapter tone="pearl" size="md" title="Licensing, answered.">
        <FaqSection items={licensingFaq} tone="light" variant="rule" className="max-w-[860px]" />
      </Chapter>

      <section aria-label="Company proof" data-surface="pearl" className="bg-[#f4f6fb] pb-[clamp(64px,7vw,104px)] text-[#0b1020]">
        <Container>
          <StatRail tone="pearl" items={homeProof} />
        </Container>
      </section>

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

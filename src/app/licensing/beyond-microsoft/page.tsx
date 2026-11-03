import { ArrowRight } from "lucide-react";
import { Chapter, ChipRow, NextStep, RuleList, inkTone, monoLabel } from "@/components/ink/interior";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { alliances, vendors } from "@/content/ecosystem";
import { beyondMicrosoft } from "@/content/licensing";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({
  title: "Beyond Microsoft — Google Workspace, Adobe, Cisco Meraki, Fortinet, Coro, Citrix, Dell and Lenovo through one partner",
  description: "MSP Hub procures and supports productivity, security, networking, and hardware beyond Microsoft through its distribution relationships. One partner, one invoice.",
  path: "/licensing/beyond-microsoft",
});

const distribution = alliances.filter((a) => a.kind === "distribution");

export default function BeyondMicrosoftPage() {
  return (
    <>
      <PageHero tone="light" eyebrow={beyondMicrosoft.eyebrow} title={beyondMicrosoft.title} lead={beyondMicrosoft.lead}>
        <ButtonLink href="/contact?topic=sales#contact-form">
          Talk to the deal desk
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="/licensing" variant="outline">
          Microsoft licensing
        </ButtonLink>
      </PageHero>

      <Chapter tone="pearl" pad="flush-top" title="The vendors you already run, from the desk that quotes your Microsoft." headingWidth="max-w-[24ch]">
        <RuleList
          tone="pearl"
          columns={3}
          titleSize="md"
          items={beyondMicrosoft.categories.map((category) => ({
            title: category.title,
            body: category.body,
            children: <ChipRow tone="pearl" items={category.vendors} />,
          }))}
        />
      </Chapter>

      <Chapter tone="ink" title="One quote, one partner, one invoice." headingWidth="max-w-[18ch]">
        <RuleList tone="ink" numbered columns={3} titleSize="md" items={beyondMicrosoft.howItWorks} />
        <div className="mt-14 grid gap-10 border-t border-white/15 pt-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className={cn(monoLabel, inkTone.ink.faint)}>Distribution</p>
            <ChipRow tone="ink" className="mt-4" label="Distribution relationships" items={distribution.map((d) => ({ label: d.name, title: d.note }))} />
            <p className={cn("mt-4 max-w-[48ch] text-[15px] leading-[1.6]", inkTone.ink.muted)}>
              Hardware, Google Workspace, Adobe, and the broader vendor catalog are procured through MSP Hub&apos;s distribution relationships.
            </p>
            <p className={cn("mt-3 text-[13px]", inkTone.ink.faint)}>
              <NeedsConfirm id="allianceLogos" fallback={null}>
                Names shown as text until logo files and written permission are in hand.
              </NeedsConfirm>
            </p>
          </div>
          <div>
            <p className={cn(monoLabel, inkTone.ink.faint)}>Vendor ecosystem</p>
            <ChipRow tone="ink" className="mt-4" label="Vendors" items={vendors.map((v) => ({ label: v.name, title: v.note }))} />
            <p className={cn("mt-3 text-[13px]", inkTone.ink.faint)}>
              <NeedsConfirm id="vendorLogos" fallback={null}>
                Names shown as text until logo files and written permission are in hand.
              </NeedsConfirm>
            </p>
          </div>
        </div>
      </Chapter>

      <NextStep
        tone="pearl"
        title="Send the deal desk your renewal calendar."
        lead="Microsoft and everything around it, quoted by one desk and delivered by one team."
        primary={{ label: "Talk to the deal desk", href: "/contact?topic=sales#contact-form" }}
        secondary={[{ label: "Get a Microsoft licensing quote", href: "/licensing/quote" }]}
      />
    </>
  );
}

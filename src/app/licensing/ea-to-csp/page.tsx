import { ArrowRight, ExternalLink } from "lucide-react";
import { Chapter, DotList, InkLink, NextStep, RuleList, inkTone, monoLabel } from "@/components/ink/interior";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { NeedsConfirmBlock, showTodos } from "@/components/ui/needs-confirm";
import { Container } from "@/components/ui/section";
import { eaToCsp } from "@/content/licensing";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({
  title: "EA to CSP — moving an Enterprise Agreement to Microsoft CSP with MSP Hub",
  description: "How mid-market and enterprise organizations move an LSP-transacted Enterprise Agreement to the Cloud Solution Provider program: flexibility per workload, a direct support path, and services from one team. Microsoft Learn–cited.",
  path: "/licensing/ea-to-csp",
});

export default function EaToCspPage() {
  return (
    <>
      <PageHero eyebrow={eaToCsp.eyebrow} title={eaToCsp.title} lead={eaToCsp.lead}>
        <ButtonLink href="/licensing/switch#send-invoice">
          Send your EA estate for a comparison
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="/contact?topic=sales#contact-form" variant="glass">
          Talk to licensing
        </ButtonLink>
      </PageHero>

      {showTodos ? (
        <section className="bg-[#0b1020] pb-10 text-white">
          <Container>
            <NeedsConfirmBlock id={eaToCsp.confirm} fallback={null}>
              <p className="text-sm text-white/70">
                Interim copy from the handoff (§1.4). Replace with the Microsoft Learn–cited customer guide when the document is supplied.
              </p>
            </NeedsConfirmBlock>
          </Container>
        </section>
      ) : null}

      <Chapter tone="ink" pad="flush-top" size="md" title="What changes when you leave an LSP-run agreement." headingWidth="max-w-[24ch]">
        <RuleList tone="ink" numbered columns={4} titleSize="md" items={eaToCsp.reasons} />
      </Chapter>

      <Chapter
        tone="pearl"
        title="Reviewed, timed, provisioned, run."
        lead="Your Microsoft 365 tenant, users, and data stay where they are. What changes is who you buy from, how you are billed, and who picks up the phone."
      >
        <RuleList tone="pearl" numbered columns={5} titleSize="md" items={eaToCsp.steps} />
      </Chapter>

      <Chapter tone="ink" title="The comparison is the decision." headingWidth="max-w-[16ch]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className={cn(monoLabel, inkTone.ink.faint)}>{eaToCsp.compare.title}</p>
            <p className={cn("mt-4 max-w-[54ch] text-[17px] leading-[1.6]", inkTone.ink.muted)}>
              Send your agreement or your current invoice and the deal desk returns every line against its CSP equivalent, with the terms and the support
              path spelled out.
            </p>
            <DotList tone="ink" className="mt-6" items={eaToCsp.compare.items} />
          </div>
          <div className="border-t border-white/15 pt-5 lg:col-span-5">
            <p className={cn(monoLabel, inkTone.ink.faint)}>From Microsoft Learn</p>
            <p className={cn("mt-3 text-[15px] leading-[1.6]", inkTone.ink.muted)}>
              The Cloud Solution Provider program and partner-to-partner transfers are documented by Microsoft. These are the pages the deal desk works from.
            </p>
            <ul className="mt-5 grid gap-2">
              {eaToCsp.citations.map((citation) => (
                <li key={citation.href}>
                  <InkLink href={citation.href} tone="ink" className="min-h-0 items-start gap-2 py-1.5 text-[15px]">
                    <ExternalLink className="mt-1 size-4 shrink-0 text-[#f97316]" aria-hidden />
                    <span>{citation.label}</span>
                  </InkLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Chapter>

      <NextStep
        tone="pearl"
        title="Send your EA estate. Get the comparison."
        lead="Upload your agreement or your current invoice and the deal desk returns a line-by-line comparison and a transition plan timed to your dates."
        primary={{ label: "Send your invoice", href: "/licensing/switch#send-invoice" }}
        secondary={[
          { label: "Get a licensing quote", href: "/licensing/quote" },
          { label: "Talk to licensing", href: "/contact?topic=sales#contact-form" },
        ]}
      />
    </>
  );
}

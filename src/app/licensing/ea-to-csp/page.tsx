import { ArrowRight, ExternalLink } from "lucide-react";
import { CheckList, CtaBand, Steps } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { FeatureCard, GlassCard } from "@/components/ui/card";
import { NeedsConfirmBlock, showTodos } from "@/components/ui/needs-confirm";
import { Container, Glow, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead, SectionHeading } from "@/components/ui/typography";
import { eaToCsp } from "@/content/licensing";
import { pageMetadata } from "@/lib/metadata";

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
        <Section tight className="pt-0 sm:pt-0">
          <Container>
            <NeedsConfirmBlock id={eaToCsp.confirm} fallback={null}>
              <p className="text-sm text-white/70">
                Interim copy from the handoff (§1.4). Replace with the Microsoft Learn–cited customer guide when the document is supplied.
              </p>
            </NeedsConfirmBlock>
          </Container>
        </Section>
      ) : null}

      <Section className="pt-0 sm:pt-0 lg:pt-0" decor={<Glow tone="navy" className="top-0 right-[-300px] h-[700px] w-[900px]" />}>
        <Container>
          <SectionHeading eyebrow="Why organizations move" title="What changes when you leave an LSP-run agreement." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {eaToCsp.reasons.map((r) => (
              <FeatureCard key={r.title} title={r.title}>
                {r.body}
              </FeatureCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <SectionHeading
            tone="light"
            eyebrow="How the transition runs"
            title="Reviewed, timed, provisioned, run."
            lead="Your Microsoft 365 tenant, users, and data stay where they are. What changes is who you buy from, how you are billed, and who picks up the phone."
          />
          <Steps steps={eaToCsp.steps} tone="light" className="lg:grid-cols-5" />
        </Container>
      </Section>

      <Section decor={<Glow tone="orange" className="top-[-100px] left-[-250px] h-[700px] w-[700px] opacity-60" />}>
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>{eaToCsp.compare.title}</Eyebrow>
              <Display className="mt-3.5">The comparison is the decision.</Display>
              <Lead className="mt-4">
                Send your agreement or your current invoice and the deal desk returns every line against its CSP equivalent, with the terms
                and the support path spelled out.
              </Lead>
              <CheckList items={eaToCsp.compare.items} className="mt-7" />
            </div>
            <GlassCard className="p-7">
              <p className="font-mono text-xs font-semibold tracking-[0.12em] text-brand-orange uppercase">From Microsoft Learn</p>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                The Cloud Solution Provider program and partner-to-partner transfers are documented by Microsoft. These are the pages the
                deal desk works from.
              </p>
              <ul className="mt-5 grid gap-3">
                {eaToCsp.citations.map((c) => (
                  <li key={c.href}>
                    <a
                      href={c.href}
                      rel="noopener noreferrer"
                      className="inline-flex items-start gap-2 text-[15px] font-medium text-white underline-offset-4 hover:underline"
                    >
                      <ExternalLink className="mt-1 size-4 shrink-0 text-brand-orange" aria-hidden />
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <CtaBand
          title="Send your EA estate. Get the comparison."
          lead="Upload your agreement or your current invoice and the deal desk returns a line-by-line comparison and a transition plan timed to your dates."
          primary={{ label: "Send your invoice", href: "/licensing/switch#send-invoice" }}
          secondary={[
            { label: "Get a licensing quote", href: "/licensing/quote" },
            { label: "Talk to licensing", href: "/contact?topic=sales#contact-form" },
          ]}
        />
      </Section>
    </>
  );
}

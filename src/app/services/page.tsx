import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/lead-form";
import { HubXLogo } from "@/components/brand/hubx-logo";
import { SupportModel } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
import { Display, Lead } from "@/components/ui/typography";
import { serviceBranches } from "@/content/branches";
import { hubxLockup } from "@/content/hubx";

export const metadata: Metadata = {
  title: "Services — professional, managed, and development services for Microsoft estates",
  description:
    "Three practices plus licensing. MSP Hub designs, migrates, runs, and builds on Microsoft estates. HubX is the portal beside the work.",
  alternates: { canonical: "/services" },
};

const licensing = {
  name: "Licensing",
  href: "/licensing",
  description: "Microsoft 365, Azure, Copilot, Dynamics 365, and the rest of the catalog, bought direct from a CSP direct-bill partner. Existing subscriptions transfer. Terms carry over.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        tone="light"
        eyebrow="Services"
        title="Three practices, plus licensing."
        lead="Professional services, managed services, and development sit at the same level. Licensing is the path in. HubX is the portal beside the work, not a fourth practice and not the parent."
      >
        <ButtonLink href="#inquiry">Start a service inquiry</ButtonLink>
        <ButtonLink href="/licensing" variant="glass">
          Licensing
        </ButtonLink>
      </PageHero>

      <Section tone="light" className="pt-0">
        <Container>
          <div className="grid border-t border-[#0b1020]/10 md:grid-cols-3">
            {serviceBranches.map((branch) => (
              <article key={branch.slug} className="flex flex-col gap-4 border-[#0b1020]/10 px-0 py-8 md:px-6 md:not-first:border-l">
                <h2 className="font-display text-2xl font-bold tracking-[-0.015em]">{branch.name}</h2>
                <p className="text-[16px] leading-[1.65] text-[#4b5569]">{branch.description}</p>
                <Link href={branch.href} className="mt-auto inline-flex h-11 items-center font-semibold underline decoration-[#f97316] decoration-2 underline-offset-[5px]">
                  {branch.linkLabel}
                </Link>
              </article>
            ))}
          </div>
          <article className="border-t border-[#0b1020]/10 py-8">
            <h2 className="font-display text-2xl font-bold tracking-[-0.015em]">{licensing.name}</h2>
            <p className="mt-3 max-w-[68ch] text-[16px] leading-[1.65] text-[#4b5569]">{licensing.description}</p>
            <Link href={licensing.href} className="mt-4 inline-flex h-11 items-center font-semibold underline decoration-[#f97316] decoration-2 underline-offset-[5px]">
              Explore licensing
            </Link>
          </article>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid items-center gap-8 border-t border-white/15 pt-8 lg:grid-cols-[auto_1fr_auto]">
            <HubXLogo className="h-8 w-auto" />
            <div>
              <p className="font-mono text-[11px] tracking-[0.12em] text-[#b8c0d4] uppercase">{hubxLockup}</p>
              <p className="mt-2 max-w-[62ch] text-[16px] leading-relaxed text-[#b8c0d4]">
                Customer products, purchasing, renewals, invoices, and service activity in one portal. HubX does not contain the service practices.
              </p>
            </div>
            <ButtonLink href="/hubx" variant="glass">
              Explore HubX
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <h2 className="font-display text-[30px] font-bold tracking-[-0.02em] lg:text-[40px]">Business hours for licensing and billing. Around the clock for managed environments.</h2>
          <SupportModel tone="light" className="mt-8" />
        </Container>
      </Section>

      <Section id="inquiry" tone="light" className="scroll-mt-24 pt-0">
        <Container className="grid max-w-[800px] gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Display tone="light" size="md">Tell us what you are trying to get done.</Display>
            <Lead tone="light" className="mt-4">
              Pick the practices involved. A solutions engineer replies with questions and a proposed scoping call.
            </Lead>
          </div>
          <div data-surface="pearl" className="rounded-[12px] border border-[#0b1020]/10 bg-white p-6 sm:p-8">
            <LeadForm kind="service" surface="pearl" />
          </div>
        </Container>
      </Section>
    </>
  );
}

import { ArrowRight, Clock, Headset, LifeBuoy, ShieldCheck } from "lucide-react";
import { CheckList, CtaBand, SupportModel } from "@/components/marketing/blocks";
import { FaqSection } from "@/components/marketing/faq-section";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { GlassCard, IconTile } from "@/components/ui/card";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { Container, Glow, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/typography";
import { site } from "@/content/site";
import { hoursTable, supportFaq, supportPage, supportPaths, ticketChecklist } from "@/content/support";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Support — HubX Service Desk, licensing and billing hours, Microsoft escalation",
  description: "How support works at MSP Hub: the HubX Service Desk for customers and partners, business-hours licensing and billing support, direct Microsoft Premier escalation, and 24/7 monitoring for managed environments.",
  path: "/support",
});

const icons = { "service-desk": LifeBuoy, "licensing-billing": Clock, microsoft: Headset, managed: ShieldCheck } as const;

/** Literal class names so Tailwind's scanner emits every stagger step. */
const stagger = ["stagger-1", "stagger-2", "stagger-3", "stagger-4", "stagger-5"];

export default function SupportPage() {
  return (
    <>
      <PageHero eyebrow={supportPage.eyebrow} title={supportPage.title} lead={supportPage.lead}>
        <ButtonLink href={site.hubxLoginUrl}>
          Log in to HubX
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="/contact?topic=support#contact-form" variant="glass">
          Contact support
        </ButtonLink>
      </PageHero>

      <Section className="pt-0 sm:pt-0 lg:pt-0" decor={<Glow tone="navy" className="top-0 right-[-300px] h-[700px] w-[900px]" />}>
        <Container>
          <SectionHeading eyebrow="Support paths" title="Four doors. The right one depends on what you need." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {supportPaths.map((p, i) => {
              const Icon = icons[p.id];
              return (
                <GlassCard key={p.id} className={`flex flex-col motion-safe:animate-fade-up ${stagger[i]}`}>
                  <IconTile icon={Icon} className="mb-5" />
                  <h3 className="text-lg font-semibold tracking-tight text-white">{p.title}</h3>
                  <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-white/70">{p.body}</p>
                  <p className="mt-4 font-mono text-[12px] tracking-[0.06em] text-brand-orange uppercase">
                    {p.confirm ? (
                      <NeedsConfirm id={p.confirm} fallback={p.availability}>
                        {p.proposed ?? p.availability}
                      </NeedsConfirm>
                    ) : (
                      p.availability
                    )}
                  </p>
                  <ButtonLink href={p.cta.href} variant="glass" size="sm" className="mt-5 self-start">
                    {p.cta.label}
                  </ButtonLink>
                </GlassCard>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <SectionHeading
            tone="light"
            eyebrow="Hours"
            title="Business hours for licensing and billing. Around the clock for managed environments."
          />
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <div className="card-light overflow-hidden">
              <table className="w-full border-collapse text-left text-[15px]">
                <thead>
                  <tr className="font-mono text-[12px] tracking-[0.08em] text-charcoal uppercase">
                    <th scope="col" className="border-b border-black/10 px-5 py-3.5 font-semibold">
                      Service
                    </th>
                    <th scope="col" className="border-b border-black/10 px-5 py-3.5 font-semibold">
                      Hours
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hoursTable.map((row) => (
                    <tr key={row.service}>
                      <th scope="row" className="border-b border-black/8 px-5 py-3.5 align-top font-medium text-charcoal last:border-b-0">
                        {row.service}
                      </th>
                      <td className="border-b border-black/8 px-5 py-3.5 align-top text-charcoal/85">
                        {row.confirm ? (
                          <NeedsConfirm id={row.confirm} fallback={row.hours}>
                            {row.proposed ?? row.hours}
                          </NeedsConfirm>
                        ) : (
                          row.hours
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <GlassCard tone="light" className="p-7">
              <p className="font-mono text-xs font-semibold tracking-[0.12em] text-charcoal uppercase">{ticketChecklist.title}</p>
              <CheckList items={ticketChecklist.items} tone="light" className="mt-4" />
            </GlassCard>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Support model" title="What 24/7 means here, and what it does not." />
          <SupportModel />
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <SectionHeading tone="light" eyebrow="Questions" title="Support and billing, answered." align="center" />
          <FaqSection items={supportFaq} tone="light" />
        </Container>
      </Section>

      <Section>
          <CtaBand
            eyebrow="Need a person?"
            title="Open a ticket or send a message."
            lead="Customers and partners: the HubX Service Desk is the fastest path. Everyone else: the contact form reaches the right team."
            primary={{ label: "Log in to HubX", href: site.hubxLoginUrl }}
            secondary={[{ label: "Contact support", href: "/contact?topic=support#contact-form" }]}
          >
            <p className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
              <a href={`mailto:${site.salesEmail}`} className="font-medium text-white underline-offset-4 hover:underline">
                {site.salesEmail}
              </a>
              <NeedsConfirm
                id="phone"
                fallback={
                  <a href={site.salesPhoneHref} className="font-medium text-white underline-offset-4 hover:underline">
                    {site.salesPhone}
                  </a>
                }
              />
            </p>
          </CtaBand>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, CalendarDays, FileText, Mail, Wrench } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { PageHero } from "@/components/marketing/page-hero";
import { GlassCard, IconTile } from "@/components/ui/card";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { Container, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/typography";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact MSP Hub",
  description:
    "Schedule a HubX demo, start a service inquiry, request a Microsoft 365 quote, or send a general message. Every form reaches sales@msphub.com.",
  alternates: { canonical: "/contact" },
};

const paths = [
  {
    icon: CalendarDays,
    title: "Schedule a HubX demo",
    body: "A 30-minute walkthrough of the portal with your tenant scenario.",
    href: "/demo",
    cta: "Book a demo",
  },
  {
    icon: Wrench,
    title: "Service inquiry",
    body: "Professional, managed, or development work. Describe it and we scope it.",
    href: "/services#inquiry",
    cta: "Start an inquiry",
  },
  {
    icon: FileText,
    title: "Microsoft 365 quote",
    body: "Tier-1 direct pricing on Microsoft 365, Azure, and Copilot.",
    href: "/microsoft-365-quote",
    cta: "Request a quote",
  },
  {
    icon: Mail,
    title: "General contact",
    body: "Sales, support, partnerships, press, or anything else.",
    href: "#contact-form",
    cta: "Send a message",
  },
];

const validTopics = new Set(["general", "sales", "billing", "transfer", "support", "partnership", "press"]);

/** Reads `?topic=` at request time; isolated so the rest of the page prerenders. */
async function ContactForm({ searchParams }: { searchParams: PageProps<"/contact">["searchParams"] }) {
  const params = await searchParams;
  const requested = typeof params.topic === "string" ? params.topic : undefined;
  const topic = requested && validTopics.has(requested) ? requested : undefined;
  return <LeadForm kind="contact" defaultValues={topic ? { topic } : undefined} />;
}

export default function ContactPage({ searchParams }: PageProps<"/contact">) {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to MSP Hub."
        lead="Four ways in, one team on the other side. Pick the path that matches what you need; every request lands with our sales team."
      />

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {paths.map((p) => (
              <GlassCard key={p.title} className="flex flex-col">
                <IconTile icon={p.icon} className="mb-5" />
                <h2 className="text-lg font-semibold tracking-tight text-white">{p.title}</h2>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-white/70">{p.body}</p>
                <Link href={p.href} className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-orange hover:text-orange-hover">
                  {p.cta}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </GlassCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="contact-form" className="scroll-mt-20 pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
            <div>
              <Eyebrow>General contact</Eyebrow>
              <Display className="mt-3.5">Send us a message.</Display>
              <Lead className="mt-4">We read every message and reply from a real inbox.</Lead>

              <dl className="mt-8 grid gap-5 text-[15px]">
                <div>
                  <dt className="text-xs tracking-[0.12em] text-white/60 uppercase">Sales</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${site.salesEmail}`} className="font-medium text-white hover:underline">
                      {site.salesEmail}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.12em] text-white/60 uppercase">Phone</dt>
                  <dd className="mt-1 text-white/70">
                    <NeedsConfirm
                      id="phone"
                      fallback={
                        <a href={site.salesPhoneHref} className="font-medium text-white hover:underline">
                          {site.salesPhone}
                        </a>
                      }
                    />
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.12em] text-white/60 uppercase">Hours</dt>
                  <dd className="mt-1 text-white/70">
                    <NeedsConfirm id="supportHours" fallback={site.supportHours}>
                      {site.supportHoursProposed}
                    </NeedsConfirm>
                    . Managed environments are monitored around the clock.
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.12em] text-white/60 uppercase">Headquarters</dt>
                  <dd className="mt-1 text-white/70">{site.hq.city}</dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.12em] text-white/60 uppercase">Already a customer?</dt>
                  <dd className="mt-1 text-white/70">
                    <a href={site.hubxLoginUrl} rel="noopener" className="font-medium text-white hover:underline">
                      Log in to HubX
                    </a>{" "}
                    and open a Service Desk ticket.
                  </dd>
                </div>
              </dl>
            </div>
            <div className="glass glass-lg p-7 sm:p-10">
              <Suspense fallback={<LeadForm kind="contact" />}>
                <ContactForm searchParams={searchParams} />
              </Suspense>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

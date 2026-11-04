import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { audienceLinks } from "@/content/nav";
import { LeadForm } from "@/components/forms/lead-form";
import { PageHero } from "@/components/marketing/page-hero";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { Container, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/typography";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact MSP Hub",
  description:
    "Schedule a HubX demo, start a service inquiry, request a licensing quote, or send a general message. Every form reaches sales@msphub.com.",
  alternates: { canonical: "/contact" },
};

const validTopics = new Set(["general", "sales", "billing", "transfer", "support", "partnership", "press"]);

/** Reads `?topic=` at request time; isolated so the rest of the page prerenders. */
async function ContactForm({ searchParams }: { searchParams: PageProps<"/contact">["searchParams"] }) {
  const params = await searchParams;
  const requested = typeof params.topic === "string" ? params.topic : undefined;
  const topic = requested && validTopics.has(requested) ? requested : undefined;
  // Keyed on the topic: react-hook-form reads defaultValues once, so a same-page "?topic=" link must remount the form.
  return <LeadForm key={topic ?? "general"} kind="contact" defaultValues={topic ? { topic } : undefined} />;
}

export default function ContactPage({ searchParams }: PageProps<"/contact">) {
  return (
    <>
      <PageHero
        tone="light"
        eyebrow="Contact"
        title="Talk to MSP Hub."
        lead="Start with who you are. We’ll route you to the right licensing, platform, services, or partner conversation. If you already know the question, send it below."
      />

      <Section tone="light" className="pt-0">
        <Container>
          {/* Who you are → the first thing to do. Each row goes straight to that audience's action, not back to its program page. */}
          <ul aria-label="Start with who you are" className="grid border-b border-[#0b1020]/12">
            {[
              ...audienceLinks.map((a) => ({ key: a.id, label: a.label, meta: a.meta, action: a.action.label, href: a.action.href })),
              { key: "message", label: "Not sure yet?", meta: "Anything", action: "Send a message", href: "#contact-form" },
            ].map((route) => (
              <li key={route.key} className="border-t border-[#0b1020]/12">
                <Link href={route.href} className="band-link grid min-h-14 items-center gap-x-6 gap-y-0.5 py-3 sm:grid-cols-[200px_minmax(0,1fr)_auto]">
                  <span className="font-display text-[19px] leading-[1.2] font-bold tracking-[-0.01em] text-[#0b1020]">{route.label}</span>
                  <span className="text-[15px] text-[#4b5569]">
                    <span className="mr-2 font-mono text-[11px] tracking-[0.12em] uppercase">{route.meta}</span>{" "}
                    {route.action}
                  </span>
                  <span aria-hidden className="band-arrow hidden text-[#0b1020] sm:inline-flex">
                    <ArrowRight className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="contact-form" className="scroll-mt-20 pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
            <div>
              <Eyebrow>General contact</Eyebrow>
              <Display className="mt-3.5">Send us a message.</Display>
              <Lead className="mt-4">We read every message and reply from a real inbox.</Lead>
              <p className="mt-4 text-[15px] text-white/70">
                Prefer to talk?{" "}
                <Link href="/demo" className="font-medium text-white underline decoration-[#ffb05c] decoration-2 underline-offset-4">
                  Book a 30-minute demo
                </Link>{" "}
                or call{" "}
                <a href={site.salesPhoneHref} className="font-medium text-white underline decoration-[#ffb05c] decoration-2 underline-offset-4">
                  {site.salesPhone}
                </a>
                .
              </p>

              <dl className="mt-8 grid gap-5 text-[15px]">
                <div>
                  <dt className="text-xs tracking-[0.12em] text-white/60 uppercase">Sales</dt>
                  <dd className="mt-1 flex flex-col gap-1">
                    <a href={`mailto:${site.salesEmail}`} className="font-medium text-white hover:underline">
                      {site.salesEmail}
                    </a>
                    <a href={site.salesPhoneHref} className="font-medium text-white hover:underline">
                      {site.salesPhone}
                    </a>
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

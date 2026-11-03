import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { homeAudiences } from "@/content/home";
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
  return <LeadForm kind="contact" defaultValues={topic ? { topic } : undefined} />;
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
          <ul className="grid gap-3 sm:grid-cols-2">
            {[...homeAudiences.map((a) => ({ label: a.label, href: a.href })), { label: "Not sure yet? Send a message", href: "#contact-form" }].map((route) => (
              <li key={route.href}>
                <Link href={route.href} className="flex min-h-12 items-center border-t border-[#0b1020]/12 pt-3 text-lg font-semibold underline decoration-[#f97316] decoration-2 underline-offset-[5px]">
                  {route.label}
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

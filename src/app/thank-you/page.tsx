import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container, Glow, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/typography";
import { site } from "@/content/site";
import { isLeadKind, leadKinds, type LeadKind } from "@/lib/lead";

export const metadata: Metadata = {
  title: "Thanks — we have your request",
  robots: { index: false, follow: false },
};

const nextSteps: Partial<Record<LeadKind, { body: string; links: { label: string; href: string }[] }>> = {
  demo: {
    body: "We confirm a demo slot within one business day. In the meantime, see what the portal covers.",
    links: [
      { label: "Explore HubX", href: "/hubx" },
      { label: "Get a Microsoft 365 quote", href: "/microsoft-365-quote" },
    ],
  },
  service: {
    body: "A solutions engineer reviews the inquiry and replies with questions and a proposed scoping call.",
    links: [
      { label: "Services overview", href: "/services" },
      { label: "Explore HubX", href: "/hubx" },
    ],
  },
  quote: {
    body: "A licensing specialist prices the estate and replies within one business day.",
    links: [
      { label: "Explore HubX", href: "/hubx" },
      { label: "Professional services", href: "/services/professional" },
    ],
  },
  contact: {
    body: "Your message is with the team. We reply from a real inbox.",
    links: [
      { label: "Back to home", href: "/" },
      { label: "About MSP Hub", href: "/about" },
    ],
  },
};

async function ThankYouBody({ searchParams }: { searchParams: PageProps<"/thank-you">["searchParams"] }) {
  const params = await searchParams;
  const raw = typeof params.flow === "string" ? params.flow : "contact";
  const kind: LeadKind = isLeadKind(raw) ? raw : "contact";
  const step = nextSteps[kind] ?? nextSteps.contact!;
  return (
    <>
      <Eyebrow className="before:hidden">{leadKinds[kind].label} received</Eyebrow>
      <Display as="h1" size="xl" className="mt-5">
        Thanks. We&apos;re on it.
      </Display>
      <Lead className="mx-auto mt-6">{step.body}</Lead>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {step.links.map((l, i) => (
          <ButtonLink key={l.href} href={l.href} variant={i === 0 ? "primary" : "glass"}>
            {l.label}
            {i === 0 ? <ArrowRight className="size-4" aria-hidden /> : null}
          </ButtonLink>
        ))}
      </div>
    </>
  );
}

export default function ThankYouPage({ searchParams }: PageProps<"/thank-you">) {
  return (
    <Section
      className="flex min-h-[70vh] items-center"
      decor={
        <>
          <div className="bg-hex absolute inset-0" />
          <Glow tone="orange" className="top-[-380px] left-1/2 h-[760px] w-[760px] -translate-x-1/2" />
        </>
      }
    >
      <Container className="text-center">
        <div className="mx-auto max-w-[720px]">
          <CheckCircle2 className="mx-auto size-12 text-brand-orange" strokeWidth={1.6} aria-hidden />
          <div className="mt-6">
            <Suspense
              fallback={
                <>
                  <Display as="h1" size="xl">
                    Thanks. We&apos;re on it.
                  </Display>
                  <Lead className="mx-auto mt-6">Your request is with the team.</Lead>
                </>
              }
            >
              <ThankYouBody searchParams={searchParams} />
            </Suspense>
          </div>
          <p className="mt-10 text-sm text-white/55">
            Need to add something?{" "}
            <a href={`mailto:${site.salesEmail}`} className="font-medium text-white underline-offset-4 hover:underline">
              {site.salesEmail}
            </a>
          </p>
        </div>
      </Container>
    </Section>
  );
}

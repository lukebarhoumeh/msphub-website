import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { Container, Glow, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/typography";
import { site } from "@/content/site";
import { thankYou, thankYouForms, type ThankYouForm } from "@/content/thank-you";
import { env } from "@/lib/env";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Thanks — we have your request",
  description: "Your request is with the MSP Hub team.",
  path: "/thank-you",
  noIndex: true,
});

export function generateStaticParams() {
  return thankYouForms.map((form) => ({ form }));
}

/** Microsoft Bookings page for demos; unset for the POC, so the copy falls back honestly. */
const bookingsUrl = env.bookingsUrl();

function isForm(value: string): value is ThankYouForm {
  return (thankYouForms as readonly string[]).includes(value);
}

export default async function ThankYouPage({ params }: PageProps<"/thank-you/[form]">) {
  const { form } = await params;
  if (!isForm(form)) notFound();
  const copy = thankYou[form];

  return (
    <Section
      className="flex min-h-[70vh] items-center justify-center [&>div]:w-full"
      decor={
        <>
          <div className="bg-hex absolute inset-0" />
          <Glow tone="orange" className="top-[-380px] left-1/2 h-[760px] w-[760px] -translate-x-1/2" />
        </>
      }
    >
      <Container>
        <div className="mx-auto max-w-[760px] text-center">
          <CheckCircle2 className="mx-auto size-12 text-brand-orange motion-safe:animate-fade-up" strokeWidth={1.6} aria-hidden />
          <Eyebrow className="mt-6 before:hidden motion-safe:animate-fade-up stagger-1">{copy.received}</Eyebrow>
          <Display as="h1" size="xl" className="mt-5 motion-safe:animate-fade-up stagger-2">
            {copy.title}
          </Display>
          <Lead className="mx-auto mt-6 motion-safe:animate-fade-up stagger-3">{copy.body}</Lead>
        </div>

        <div className="mx-auto mt-10 max-w-[760px] motion-safe:animate-fade-up stagger-4">
          <div className="glass glass-lg p-7 text-left sm:p-8">
            <p className="font-mono text-xs font-semibold tracking-[0.12em] text-brand-orange uppercase">What happens next</p>
            <ol className="mt-4 grid gap-3">
              {copy.next.map((step, i) => (
                <li key={step} className="flex gap-3.5 text-[15px] leading-relaxed text-white/80">
                  <span className="font-display text-xl leading-none text-brand-orange tabular-nums">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            {copy.bookings ? (
              <div className="mt-6 border-t border-white/10 pt-5">
                {bookingsUrl ? (
                  <ButtonLink href={bookingsUrl} size="sm">
                    <CalendarDays className="size-4" aria-hidden />
                    {copy.bookings.label}
                  </ButtonLink>
                ) : (
                  <p className="flex items-start gap-2.5 text-sm text-white/70">
                    <CalendarDays className="mt-0.5 size-4 shrink-0 text-brand-orange" aria-hidden />
                    <NeedsConfirm id="bookingLink" fallback={copy.bookings.fallback}>
                      {copy.bookings.fallback} A Microsoft Bookings link appears here once NEXT_PUBLIC_BOOKINGS_URL is set.
                    </NeedsConfirm>
                  </p>
                )}
              </div>
            ) : null}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {copy.links.map((l, i) => (
              <ButtonLink key={l.href} href={l.href} variant={i === 0 ? "primary" : "glass"}>
                {l.label}
                {i === 0 ? <ArrowRight className="size-4" aria-hidden /> : null}
              </ButtonLink>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-white/65">
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

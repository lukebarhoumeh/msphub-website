import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container, Glow, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Section
      className="flex min-h-[70vh] items-center"
      decor={
        <>
          <div className="bg-hex absolute inset-0" />
          <Glow tone="navy" className="top-[-200px] right-[-300px] h-[800px] w-[800px]" />
        </>
      }
    >
      <Container className="text-center">
        <div className="mx-auto max-w-[640px]">
          <Eyebrow className="before:hidden">404</Eyebrow>
          <Display as="h1" size="xl" className="mt-5">
            That page isn&apos;t here.
          </Display>
          <Lead className="mx-auto mt-6">
            The address may have changed with the new site. Try one of these instead.
          </Lead>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/hubx">
              HubX
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/services" variant="glass">
              Services
            </ButtonLink>
            <ButtonLink href="/contact" variant="glass">
              Contact
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}

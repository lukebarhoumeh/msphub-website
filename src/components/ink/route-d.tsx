"use client";

import { usePathname } from "next/navigation";
import { DotField, Grain } from "@/components/ink/atmosphere";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { routeD } from "@/content/home";
import { site } from "@/content/site";

/** The company close: one line, one button, one email, one phone. Hidden on thank-you pages, which carry one next step of their own. */
export function RouteDConversion() {
  const pathname = usePathname();
  if (pathname.startsWith("/thank-you")) return null;

  return (
    <section id="talk-to-msphub" data-surface="orange" className="relative scroll-mt-24 overflow-hidden bg-[linear-gradient(135deg,#ffb05c_0%,#f97316_56%,#e8600f_100%)] text-[#0b1020]">
      <DotField tone="pearl" className="opacity-60 [mask-image:radial-gradient(ellipse_60%_80%_at_90%_50%,#000_10%,transparent_80%)]" />
      <Grain />
      <Container className="relative py-16 lg:py-24">
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <h2 data-reveal className="font-display text-[clamp(40px,5vw,72px)] leading-[1] font-extrabold tracking-[-0.03em] text-balance">
              {routeD.title}
            </h2>
            <p data-reveal style={{ "--reveal-delay": "80ms" } as React.CSSProperties} className="mt-5 max-w-[46ch] text-[17px] leading-[1.6] lg:text-[19px]">
              {routeD.lead}
            </p>
          </div>
          <div data-reveal style={{ "--reveal-delay": "140ms" } as React.CSSProperties} className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
            <ButtonLink href={routeD.primary.href} variant="ink" size="lg">
              {routeD.primary.label}
            </ButtonLink>
            <p className="flex flex-col gap-1 text-[15px] font-medium lg:text-right">
              <a href={`mailto:${site.salesEmail}`} className="link-draw [--ul:#0b1020]">
                {site.salesEmail}
              </a>
              <a href={site.salesPhoneHref} className="link-draw [--ul:#0b1020]">
                {site.salesPhone}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

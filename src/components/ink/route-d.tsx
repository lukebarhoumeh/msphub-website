"use client";

import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { routeD } from "@/content/home";

/** Neutral company close. Hidden on thank-you pages, which carry one next step of their own. */
export function RouteDConversion() {
  const pathname = usePathname();
  if (pathname.startsWith("/thank-you")) return null;

  return (
    <section id="talk-to-msphub" data-surface="orange" className="scroll-mt-24 bg-[linear-gradient(135deg,#ffb05c_0%,#f97316_56%,#e8600f_100%)] text-[#0b1020]">
      <Container className="py-16 lg:py-20">
        <h2 className="font-display text-[40px] leading-[1.02] font-extrabold tracking-[-0.03em] lg:text-[64px]">{routeD.title}</h2>
        <p className="mt-4 max-w-[46ch] text-[17px] leading-[1.6] lg:text-[19px]">{routeD.lead}</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {routeD.routes.map((route, index) => (
            <li key={route.href}>
              <ButtonLink href={route.href} variant={index === routeD.routes.length - 1 ? "frost" : "ink"} className="w-full">
                {route.label}
              </ButtonLink>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

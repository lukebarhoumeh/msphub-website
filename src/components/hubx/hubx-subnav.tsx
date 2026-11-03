"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@/components/hubx/track";
import { Container } from "@/components/ui/section";
import { hubxLockup, hubxNav } from "@/content/hubx";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Secondary navigation across the HubX section (Overview · Features ·
 * Security · What's new), with the text lockup and the product login. Sticks
 * under the site header from lg up; a scrollable row below that.
 */
export function HubxSubnav() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/hubx" ? pathname === "/hubx" : pathname.startsWith(href));
  return (
    <div className="z-20 border-b border-white/10 bg-[#0b1020] lg:sticky lg:top-[72px]">
      <Container className="flex flex-col gap-1 py-2 lg:h-12 lg:flex-row lg:items-center lg:gap-4 lg:py-0">
        <details className="group lg:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-sm font-semibold [&::-webkit-details-marker]:hidden">
            HubX
            <span className="font-mono text-[11px] tracking-[0.12em] text-[#b8c0d4] uppercase group-open:hidden">Show</span>
            <span className="hidden font-mono text-[11px] tracking-[0.12em] text-[#b8c0d4] uppercase group-open:inline">Hide</span>
          </summary>
          <nav aria-label="HubX section" className="grid pb-2">
            {hubxNav.map((item) => (
              <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className="flex min-h-11 items-center text-[15px]">
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
        <p className="hidden shrink-0 font-mono text-[11px] tracking-[0.12em] text-white/60 uppercase md:block">{hubxLockup}</p>
        <nav
          aria-label="HubX section"
          className="hidden min-w-0 flex-1 items-center gap-1 lg:flex"
        >
          {hubxNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex h-9 shrink-0 items-center gap-2 rounded-full px-3.5 text-sm font-medium whitespace-nowrap transition-colors",
                  active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/8 hover:text-white",
                )}
              >
                {active ? <span aria-hidden className="size-1.5 rounded-full bg-brand-orange" /> : null}
                {item.label}
              </Link>
            );
          })}
        </nav>
        <a
          href={site.hubxLoginUrl}
          rel="noopener"
          onClick={() => track("hubx_login_click", { placement: "hubx_subnav" })}
          className="hidden shrink-0 text-sm font-medium text-white/70 hover:text-white sm:inline-flex"
        >
          Log in to HubX
        </a>
      </Container>
    </div>
  );
}

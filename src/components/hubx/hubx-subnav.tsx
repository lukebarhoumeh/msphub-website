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
    <div className="z-40 border-b border-white/10 bg-ink/85 backdrop-blur-xl lg:sticky lg:top-[76px]">
      <Container className="flex h-12 items-center gap-4">
        <p className="hidden shrink-0 font-mono text-[11px] tracking-[0.12em] text-white/60 uppercase md:block">{hubxLockup}</p>
        <nav
          aria-label="HubX section"
          className="scrollbar-none -mx-1 flex min-w-0 flex-1 items-center gap-1 overflow-x-auto px-1 [mask-image:linear-gradient(to_right,#000_calc(100%-28px),transparent)] lg:[mask-image:none]"
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

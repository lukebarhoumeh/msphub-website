"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/section";
import type { SectionNavItem } from "@/content/nav";
import { cn } from "@/lib/cn";

type SectionSubnavProps = {
  items: readonly SectionNavItem[];
  /** Accessible name of the navigation landmark. */
  ariaLabel: string;
  /** The label of the collapsed row below lg. */
  mobileLabel: string;
  /** Mono label at the left from md up. */
  lockup?: string;
  /** A page action at the right (an anchor on the current page or a route). */
  action?: { label: string; href: string };
  /** Anything else at the right (the HubX login link). */
  trailing?: ReactNode;
};

/**
 * Secondary navigation for a section (HubX, Services): the lockup, the pages
 * of the section, and one action. Sticks under the site header from lg up; a
 * disclosure row below that. The active marker is white, not orange, so the
 * sub-nav never spends the page's orange budget (spec §2.4). Mount it from a
 * section layout as a sibling of the pages so sections stay direct children
 * of `<main>` for the header theme observer.
 */
export function SectionSubnav({ items, ariaLabel, mobileLabel, lockup, action, trailing }: SectionSubnavProps) {
  const pathname = usePathname();
  const isActive = (item: SectionNavItem) => (item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`));
  return (
    <div className="section-subnav z-20 border-b border-white/10 bg-[#0b1020] lg:sticky lg:top-[72px]">
      <Container className="flex flex-col gap-1 py-2 lg:h-12 lg:flex-row lg:items-center lg:gap-4 lg:py-0">
        {/* Keyed on the route so the phone disclosure starts closed on every page. */}
        <details key={pathname} className="group lg:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-sm font-semibold [&::-webkit-details-marker]:hidden">
            {mobileLabel}
            <span className="font-mono text-[11px] tracking-[0.12em] text-[#b8c0d4] uppercase group-open:hidden">Show</span>
            <span className="hidden font-mono text-[11px] tracking-[0.12em] text-[#b8c0d4] uppercase group-open:inline">Hide</span>
          </summary>
          <nav aria-label={ariaLabel} className="grid pb-2">
            {items.map((item) => (
              <Link key={item.href} href={item.href} aria-current={isActive(item) ? "page" : undefined} className="flex min-h-11 items-center text-[15px]">
                {item.label}
              </Link>
            ))}
            {action ? (
              action.href.startsWith("#") ? (
                <a href={action.href} className="flex min-h-11 items-center text-[15px] font-semibold">
                  {action.label}
                </a>
              ) : (
                <Link href={action.href} className="flex min-h-11 items-center text-[15px] font-semibold">
                  {action.label}
                </Link>
              )
            ) : null}
          </nav>
        </details>
        {lockup ? <p className="hidden shrink-0 font-mono text-[11px] tracking-[0.12em] text-white/60 uppercase lg:block">{lockup}</p> : null}
        <nav aria-label={ariaLabel} className="hidden min-w-0 flex-1 items-center gap-1 lg:flex">
          {items.map((item) => {
            const active = isActive(item);
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
                {active ? <span aria-hidden className="size-1.5 rounded-full bg-white/70" /> : null}
                {item.label}
              </Link>
            );
          })}
        </nav>
        {action ? (
          action.href.startsWith("#") ? (
            <a href={action.href} className="hidden shrink-0 text-sm font-medium text-white/70 hover:text-white lg:inline-flex">
              {action.label}
            </a>
          ) : (
            <Link href={action.href} className="hidden shrink-0 text-sm font-medium text-white/70 hover:text-white lg:inline-flex">
              {action.label}
            </Link>
          )
        ) : null}
        {trailing}
      </Container>
    </div>
  );
}

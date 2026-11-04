"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { currentHref, isExternal } from "@/components/layout/nav-utils";
import { ButtonLink } from "@/components/ui/button";
import { primaryNav, type NavLink, type SectionCta } from "@/content/nav";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/** Who we serve leads on phones: the visitor's own name is the fastest way in. */
const sheetOrder = ["who-we-serve", "what-we-do", "licensing", "company"];
const groups = [...primaryNav].sort((a, b) => sheetOrder.indexOf(a.id) - sheetOrder.indexOf(b.id));

const mono = "font-mono text-[11px] tracking-[0.12em] uppercase";

function SheetRow({ link, current, onNavigate }: { link: NavLink; current: boolean; onNavigate: () => void }) {
  const className = cn("flex min-h-12 flex-col justify-center gap-0.5 border-t border-white/8 py-2.5", current && "text-white");
  const body = (
    <>
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-[16px] font-semibold">
          {current ? <span aria-hidden className="mr-2 inline-block size-1.5 -translate-y-0.5 rounded-full bg-white/70" /> : null}
          {link.label}
        </span>{" "}
        {link.meta ? <span className={cn(mono, "shrink-0 text-[#8e98ae]")}>{link.meta}</span> : null}
      </span>{" "}
      {link.description ? <span className="text-[13.5px] leading-snug text-[#b8c0d4]">{link.description}</span> : null}
    </>
  );
  if (isExternal(link.href)) {
    return (
      <a href={link.href} rel="noopener" onClick={onNavigate} className={className}>
        {body}
      </a>
    );
  }
  return (
    <Link href={link.href} onClick={onNavigate} aria-current={current ? "page" : undefined} className={className}>
      {body}
    </Link>
  );
}

type MobileSheetProps = {
  pathname: string;
  cta: SectionCta;
  onNavigate: () => void;
  /** Closes the sheet and opens Quick Find, with focus parked where Quick Find can return it. */
  onFind: () => void;
};

/**
 * The phone navigation (spec §2.2): a full-height ink sheet under the bar.
 * A "Find a page" row opens Quick Find; the groups (role="group", not landmark sections) are the header's panels
 * with the same labels, metas, and descriptions, headed by mono labels
 * rather than links; the section action, the HubX login, and the sales line
 * stay pinned to the bottom of the sheet. No accordions.
 */
export function MobileSheet({ pathname, cta, onNavigate, onFind }: MobileSheetProps) {
  return (
    // No bottom padding on the scroller: a sticky child sticks inside the padding, and rows would show beneath the action bar.
    <div id="mobile-menu" className="fixed inset-x-0 top-16 bottom-0 z-[60] flex scroll-pb-[200px] flex-col overflow-y-auto overscroll-contain bg-[#0b1020] text-white lg:hidden">
      <nav aria-label="Mobile" className="flex flex-1 flex-col px-5 pt-4">
        <button
          type="button"
          onClick={onFind}
          className="flex min-h-12 items-center gap-3 rounded-xl border border-white/12 bg-white/5 px-4 text-left text-[15px] font-medium text-[#b8c0d4]"
        >
          <Search className="size-4 shrink-0" aria-hidden />
          Find a page
        </button>

        {groups.map((group) => {
          const rows = [...group.children, ...(group.footer ?? [])];
          const current = currentHref(pathname, rows);
          const headingId = `sheet-${group.id}`;
          return (
            <div key={group.id} role="group" aria-labelledby={headingId} className="mt-7">
              <h2 id={headingId} className={cn(mono, "text-[#8e98ae]")}>
                {group.label}
              </h2>
              <ul className="mt-2 grid">
                {rows.map((link) => (
                  <li key={link.href}>
                    <SheetRow link={link} current={link.href === current} onNavigate={onNavigate} />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        <div className="sheet-actions mt-auto grid gap-2 pt-6" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
          <ButtonLink href={cta.href} onClick={onNavigate}>
            {cta.label}
          </ButtonLink>
          <ButtonLink href={site.hubxLoginUrl} variant="glass" onClick={onNavigate}>
            Log in to HubX
          </ButtonLink>
          <a href={site.salesPhoneHref} onClick={onNavigate} className="inline-flex min-h-11 items-center justify-center text-[15px] font-medium text-[#b8c0d4]">
            Call sales {site.salesPhone}
          </a>
        </div>
      </nav>
    </div>
  );
}

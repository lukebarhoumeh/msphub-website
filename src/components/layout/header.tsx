"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { MspHubLogo } from "@/components/brand/msp-hub-logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { primaryNav, type NavLink, type PrimaryNavItem } from "@/content/nav";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function DesktopMenu({ item, pathname }: { item: PrimaryNavItem; pathname: string }) {
  return (
    <div className="group relative">
      <Link
        href={item.href}
        aria-current={isActive(pathname, item.href) ? "page" : undefined}
        className={cn(
          "inline-flex h-11 items-center rounded-full px-3 text-[15px] font-medium text-[#b8c0d4] hover:text-white",
          isActive(pathname, item.href) && "text-white",
        )}
      >
        {item.label}
      </Link>
      <div className="invisible absolute top-full left-0 z-50 w-[320px] pt-2 opacity-0 transition-opacity duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <ul className="rounded-[18px] border border-white/13 bg-[#12192b] p-2 shadow-[0_24px_64px_rgba(0,0,0,.28)]">
          {item.children?.map((child) => (
            <li key={child.href}>
              <Link href={child.href} className="flex min-h-11 items-baseline justify-between gap-3 rounded-xl px-3 py-2 text-[15px] font-medium text-white hover:bg-white/8">
                <span>{child.label}</span>
                {child.meta ? <span className="font-mono text-[11px] tracking-[0.12em] text-[#8e98ae] uppercase">{child.meta}</span> : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileSheet({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
  return (
    <div id="mobile-menu" className="fixed inset-x-0 top-16 bottom-0 z-[60] overflow-y-auto bg-[#0b1020] text-white lg:hidden" style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}>
      <nav aria-label="Mobile" className="flex flex-col gap-1 px-5 py-4">
        {primaryNav.map((item) => (
          <div key={item.label} className="border-b border-white/10 py-1">
            <Link href={item.href} onClick={onNavigate} className="flex min-h-11 items-center text-lg font-semibold">
              {item.label}
            </Link>
            {item.children ? (
              <ul className="pb-2">
                {item.children.map((child: NavLink) => (
                  <li key={child.href}>
                    <Link href={child.href} onClick={onNavigate} className="flex min-h-11 items-center justify-between gap-3 pl-3 text-[15px] text-[#b8c0d4]">
                      <span>{child.label}</span>
                      {child.meta ? <span className="font-mono text-[11px] tracking-[0.12em] uppercase">{child.meta}</span> : null}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
        <div className="mt-4 grid gap-2">
          <ButtonLink href="#talk-to-msphub" onClick={onNavigate}>
            Talk to MSP Hub
          </ButtonLink>
          <ButtonLink href={site.hubxLoginUrl} variant="glass" onClick={onNavigate}>
            Log in to HubX
          </ButtonLink>
        </div>
        <p className="sr-only">Current path {pathname}</p>
      </nav>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPathname, setMenuPathname] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);

  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 h-16 border-b border-white/10 lg:h-[72px]",
        scrolled && !open ? "header-glass" : "bg-[#0b1020]",
      )}
    >
      <Container className="flex h-full items-center justify-between gap-3">
        <Link href="/" aria-label="MSP Hub home" className="flex shrink-0 items-center py-3">
          <MspHubLogo priority className="h-5 w-auto sm:h-6 lg:h-7" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center lg:flex">
          {primaryNav.map((item) =>
            item.children ? (
              <DesktopMenu key={item.label} item={item} pathname={pathname} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className={cn(
                  "inline-flex h-11 items-center rounded-full px-3 text-[15px] font-medium text-[#b8c0d4] hover:text-white",
                  isActive(pathname, item.href) && "text-white",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link href={site.hubxLoginUrl} rel="noopener" className="hidden h-11 items-center px-2 text-[15px] font-medium text-[#b8c0d4] underline-offset-4 hover:text-white hover:underline xl:inline-flex">
            Log in to HubX
          </Link>
          <span className="hidden sm:block">
            <ButtonLink href="#talk-to-msphub" size="sm">
              Talk to MSP Hub
            </ButtonLink>
          </span>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full border border-white/15 text-white lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </Container>
      {open && typeof document !== "undefined" ? createPortal(<MobileSheet pathname={pathname} onNavigate={() => setOpen(false)} />, document.body) : null}
    </header>
  );
}

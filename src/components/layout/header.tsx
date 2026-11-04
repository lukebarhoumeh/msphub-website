"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type FocusEvent, type KeyboardEvent, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { MspHubLogo } from "@/components/brand/msp-hub-logo";
import { MobileSheet } from "@/components/layout/mobile-sheet";
import { currentHref, isExternal, isParentActive } from "@/components/layout/nav-utils";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { headerCtaFor, primaryNav, type NavLink, type PrimaryNavItem } from "@/content/nav";
import { site } from "@/content/site";
import { openQuickFind } from "@/lib/quick-find";
import { cn } from "@/lib/cn";

/**
 * Top-level nav control; colour comes from the header theme variables
 * (globals.css). `cn` joins without merging, so class strings here never
 * carry two utilities for the same property.
 */
const navLink = "hdr-link inline-flex h-11 items-center rounded-full px-2.5 text-[15px] font-medium transition-colors duration-150 xl:px-3";
const loginLink = "hdr-link hidden h-11 items-center rounded-full px-2 text-[15px] font-medium underline-offset-4 transition-colors duration-150 hover:underline lg:inline-flex";

/** Hover intent: open after a short rest on the trigger, close after a short grace period off it. */
const HOVER_OPEN_MS = 120;
const HOVER_CLOSE_MS = 200;
/** A click that lands this soon after a hover opened the panel keeps it open instead of toggling it shut. */
const HOVER_CLICK_GRACE_MS = 400;

const noopSubscribe = () => () => {};
const shortcutLabel = () => (/Mac|iPhone|iPad|iPod/.test(navigator.userAgent) ? "⌘K" : "Ctrl K");

function PanelRow({ link, current, onNavigate }: { link: NavLink; current: boolean; onNavigate: () => void }) {
  const className = cn("block rounded-xl px-3 py-2.5 outline-offset-[-2px] hover:bg-white/8 focus-visible:bg-white/8", current && "bg-white/[.06]");
  const body = (
    <>
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-[15px] font-semibold text-white">
          {current ? <span aria-hidden className="mr-2 inline-block size-1.5 -translate-y-0.5 rounded-full bg-white/70" /> : null}
          {link.label}
        </span>{" "}
        {link.meta ? <span className="shrink-0 font-mono text-[11px] tracking-[0.12em] text-[#8e98ae] uppercase">{link.meta}</span> : null}
      </span>{" "}
      {link.description ? <span className="mt-0.5 block text-[13.5px] leading-snug text-[#b8c0d4]">{link.description}</span> : null}
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
    <Link href={link.href} aria-current={current ? "page" : undefined} onClick={onNavigate} className={className}>
      {body}
    </Link>
  );
}

type DesktopMenuProps = {
  item: PrimaryNavItem;
  pathname: string;
  open: boolean;
  /** Another panel is open: moving onto this trigger switches at once instead of waiting for hover intent. */
  anyOpen: boolean;
  onOpen: (id: string) => void;
  onClose: (id: string) => void;
  align: "left" | "right";
};

/**
 * One header parent (spec §2.1): a disclosure button that never navigates
 * and the panel it controls. Opens on click, Enter or Space, ArrowDown (and
 * focuses the first row), or hover intent on pointers that can hover; closes
 * on Escape (focus returns to the button), on a pointer press outside, when
 * focus moves to another control, and on navigation.
 */
function DesktopMenu({ item, pathname, open, anyOpen, onOpen, onClose, align }: DesktopMenuProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timer = useRef(0);
  const hoverOpenedAt = useRef(0);
  /** Row to focus once the panel has rendered open (ArrowDown → first, ArrowUp → last). */
  const pendingFocus = useRef<number | null>(null);
  const panelId = `menu-${item.id}`;
  const rows = [...item.children, ...(item.footer ?? [])];
  const current = currentHref(pathname, rows);
  const active = isParentActive(pathname, item);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const links = useCallback(() => Array.from(wrapRef.current?.querySelectorAll<HTMLAnchorElement>(`#${panelId} a`) ?? []), [panelId]);
  const focusRow = useCallback(
    (index: number) => {
      const list = links();
      if (list.length === 0) return;
      list[((index % list.length) + list.length) % list.length].focus();
    },
    [links],
  );

  // Focus after the open state has committed, so the panel is visible (and focusable) when focus lands.
  useEffect(() => {
    if (!open || pendingFocus.current === null) return;
    focusRow(pendingFocus.current);
    pendingFocus.current = null;
  }, [open, focusRow]);
  const close = () => {
    window.clearTimeout(timer.current);
    onClose(item.id);
  };

  const onPointerEnter = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(timer.current);
    if (open) return;
    if (anyOpen) {
      hoverOpenedAt.current = Date.now();
      onOpen(item.id);
      return;
    }
    timer.current = window.setTimeout(() => {
      hoverOpenedAt.current = Date.now();
      onOpen(item.id);
    }, HOVER_OPEN_MS);
  };

  const onPointerLeave = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(timer.current);
    if (open) timer.current = window.setTimeout(() => onClose(item.id), HOVER_CLOSE_MS);
  };

  const onClick = () => {
    window.clearTimeout(timer.current);
    if (open && Date.now() - hoverOpenedAt.current < HOVER_CLICK_GRACE_MS) return;
    if (open) onClose(item.id);
    else onOpen(item.id);
  };

  const onButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const target = event.key === "ArrowDown" ? 0 : -1;
    if (open) {
      focusRow(target);
      return;
    }
    pendingFocus.current = target;
    onOpen(item.id);
  };

  const onPanelKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const list = links();
    const index = list.indexOf(document.activeElement as HTMLAnchorElement);
    const moves: Record<string, number> = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: list.length - 1 };
    const next = moves[event.key];
    if (next === undefined) return;
    event.preventDefault();
    focusRow(next);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape" || !open) return;
    event.preventDefault();
    close();
    buttonRef.current?.focus();
  };

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    // Only when focus lands on another control; a press on the panel's padding is handled by the outside-press listener.
    const next = event.relatedTarget as Node | null;
    if (open && next && !wrapRef.current?.contains(next)) close();
  };

  return (
    <div ref={wrapRef} className="relative" onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} onKeyDown={onKeyDown} onBlur={onBlur}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onClick}
        onKeyDown={onButtonKeyDown}
        className={cn(navLink, "gap-1", (active || open) && "is-active")}
      >
        {item.label}
        <ChevronDown aria-hidden className={cn("size-3.5 opacity-60 transition-transform duration-150 motion-reduce:transition-none", open && "rotate-180")} />
      </button>
      <div id={panelId} data-open={open ? "true" : "false"} onKeyDown={onPanelKeyDown} className={cn("nav-panel absolute top-full z-50 pt-2", align === "right" ? "right-0" : "left-0")}>
        <div className="w-[400px] rounded-[18px] border border-white/13 bg-[#12192b] p-2 text-white shadow-[0_24px_64px_rgba(0,0,0,.28)]">
          <ul className="grid">
            {item.children.map((link) => (
              <li key={link.href}>
                <PanelRow link={link} current={link.href === current} onNavigate={close} />
              </li>
            ))}
          </ul>
          {item.footer?.length ? (
            <ul className="mt-1 grid border-t border-white/10 pt-1">
              {item.footer.map((link) => (
                <li key={link.href}>
                  <PanelRow link={link} current={link.href === current} onNavigate={close} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/**
 * Sticky, theme-aware header. `HeaderThemeObserver` (layout) sets
 * `data-header-theme` to the surface under the header; the colours, the
 * glass, and the wordmark variant follow it in CSS. While the mobile sheet is
 * open the header is forced dark to match the sheet. The call to action
 * follows the section (`headerCtaFor`), and stays visible at every width.
 */
export function Header() {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [menuPathname, setMenuPathname] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const shortcut = useSyncExternalStore(noopSubscribe, shortcutLabel, () => null);
  const cta = headerCtaFor(pathname);

  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setSheetOpen(false);
    setOpenId(null);
  }

  const openMenu = useCallback((id: string) => setOpenId(id), []);
  const closeMenu = useCallback((id: string) => setOpenId((value) => (value === id ? null : value)), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Desktop panels: a press outside the primary nav or Escape anywhere closes the open panel.
  useEffect(() => {
    if (!openId) return;
    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenId(null);
    };
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpenId(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openId]);

  // Mobile sheet: the page behind it is inert (Tab from the toggle lands in the sheet, never under it) and does not
  // scroll; Escape closes it and, when focus was in the sheet, hands focus back to the toggle.
  useEffect(() => {
    if (!sheetOpen) return;
    const sheet = document.getElementById("mobile-menu");
    const behind = Array.from(document.body.children).filter(
      (el): el is HTMLElement => el instanceof HTMLElement && el !== sheet && !el.classList.contains("site-header"),
    );
    for (const el of behind) el.inert = true;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const inside = sheet?.contains(document.activeElement);
      setSheetOpen(false);
      if (inside) toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      for (const el of behind) el.inert = false;
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [sheetOpen]);

  return (
    <header
      data-header-theme="dark"
      data-scrolled={scrolled ? "true" : "false"}
      data-menu-open={sheetOpen ? "true" : "false"}
      className="site-header sticky top-0 z-40 h-16 border-b lg:h-[72px]"
    >
      <Container className="flex h-full items-center justify-between gap-2 lg:gap-3">
        <Link href="/" aria-label="MSP Hub home" className="flex shrink-0 items-center py-3">
          <MspHubLogo priority className="logo-on-dark h-5 w-auto sm:h-6 xl:h-7" />
          <MspHubLogo variant="ink" className="logo-on-light h-5 w-auto sm:h-6 xl:h-7" />
        </Link>

        <nav ref={navRef} aria-label="Primary" className="hidden items-center lg:flex">
          {primaryNav.map((item, index) => (
            <DesktopMenu
              key={item.id}
              item={item}
              pathname={pathname}
              open={openId === item.id}
              anyOpen={openId !== null}
              onOpen={openMenu}
              onClose={closeMenu}
              align={index === primaryNav.length - 1 ? "right" : "left"}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openQuickFind()}
            aria-keyshortcuts="Meta+K Control+K"
            className="hdr-toggle hidden h-10 items-center gap-2 rounded-full border px-3 text-[14px] font-medium lg:inline-flex"
          >
            <Search className="size-4" aria-hidden />
            {/* The name comes from this text (screen-reader only at lg, visible from xl), so it always matches what is shown. */}
            <span className="sr-only xl:not-sr-only">Search</span>
            {/* A fixed box rendered on the server too: the label fills in after hydration without moving the nav. */}
            <kbd aria-hidden className="hidden w-[3.9em] text-center font-mono text-[11px] tracking-[0.04em] opacity-60 xl:inline-block">
              {shortcut}
            </kbd>
          </button>
          <a href={site.hubxLoginUrl} rel="noopener" aria-label="Log in to HubX" className={loginLink}>
            <span className="xl:hidden">Log in</span>
            <span className="hidden xl:inline">Log in to HubX</span>
          </a>
          {/* Below 360 px the bar cannot hold the logo, the pill, and the toggle; the sheet carries the same action there. */}
          <ButtonLink href={cta.href} size="sm" className="max-sm:px-3.5 max-[360px]:hidden">
            <span className="sm:hidden">{cta.short}</span>
            <span className="hidden sm:inline">{cta.label}</span>
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setSheetOpen((value) => !value)}
            aria-expanded={sheetOpen}
            aria-controls="mobile-menu"
            aria-label={sheetOpen ? "Close menu" : "Open menu"}
            className="hdr-toggle grid size-11 shrink-0 place-items-center rounded-full border lg:hidden"
          >
            {sheetOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </Container>
      {sheetOpen && typeof document !== "undefined"
        ? createPortal(
            <MobileSheet
              pathname={pathname}
              cta={cta}
              onNavigate={() => setSheetOpen(false)}
              onFind={() => {
                // Park focus on the toggle first, so Quick Find returns it there (the sheet is gone when it closes).
                toggleRef.current?.focus({ preventScroll: true });
                setSheetOpen(false);
                openQuickFind();
              }}
            />,
            document.body,
          )
        : null}
    </header>
  );
}

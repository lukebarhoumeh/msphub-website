"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { MspHubLogo } from "@/components/brand/msp-hub-logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { primaryNav, serviceLinks } from "@/content/nav";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPathname, setMenuPathname] = useState(pathname);

  // Close the mobile menu when navigation changes the route (state adjusted during render).
  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/60 backdrop-blur-xl backdrop-saturate-150">
      <Container className="flex h-[68px] items-center justify-between gap-6 lg:h-[76px]">
        <Link href="/" aria-label="MSP Hub home" className="flex shrink-0 items-center py-3">
          <MspHubLogo priority className="h-7 w-auto lg:h-8" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) =>
            item.label === "Services" ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-[15px] font-medium text-white/70 transition hover:bg-white/8 hover:text-white",
                    isActive(item.href) && "bg-white/8 text-white",
                  )}
                >
                  {item.label}
                  <ChevronDown className="size-3.5 opacity-70 transition group-hover:rotate-180" aria-hidden />
                </Link>
                <div className="invisible absolute top-full left-1/2 w-[340px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="glass glass-lg bg-ink/90 p-2">
                    {serviceLinks.map((s) => (
                      <li key={s.href}>
                        <Link
                          href={s.href}
                          className="block rounded-xl px-3.5 py-3 transition hover:bg-white/8"
                        >
                          <span className="block text-[15px] font-medium text-white">{s.label}</span>
                          <span className="block text-[13px] text-white/65">{s.description}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2.5 text-[15px] font-medium text-white/70 transition hover:bg-white/8 hover:text-white",
                  isActive(item.href) && "bg-white/8 text-white",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden lg:inline-flex">
            <ButtonLink href={site.hubxLoginUrl} variant="ghost" size="sm">
              Log in to HubX
            </ButtonLink>
          </span>
          <ButtonLink href="/demo" size="sm">
            <span className="sm:hidden">Demo</span>
            <span className="hidden sm:inline">Schedule a demo</span>
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-xl border border-white/12 bg-white/5 text-white lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-[68px] bottom-0 z-40 overflow-y-auto border-t border-white/10 bg-ink/95 backdrop-blur-xl lg:hidden"
      >
        <Container className="flex flex-col gap-1 py-6">
          {primaryNav.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                className="block rounded-xl px-4 py-3.5 text-lg font-medium text-white hover:bg-white/8"
              >
                {item.label}
              </Link>
              {item.label === "Services" ? (
                <ul className="mb-2 ml-4 border-l border-white/10 pl-2">
                  {serviceLinks.slice(1).map((s) => (
                    <li key={s.href}>
                      <Link href={s.href} className="block rounded-lg px-4 py-2.5 text-[15px] text-white/70 hover:bg-white/8 hover:text-white">
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
          <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-6">
            <ButtonLink href="/demo">Schedule a demo</ButtonLink>
            <ButtonLink href="/microsoft-365-quote" variant="glass">
              Get a Microsoft 365 quote
            </ButtonLink>
            <ButtonLink href={site.hubxLoginUrl} variant="ghost">
              Log in to HubX
            </ButtonLink>
          </div>
        </Container>
      </div>
    </header>
  );
}

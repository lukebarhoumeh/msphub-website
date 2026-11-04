import type { NavLink, PrimaryNavItem } from "@/content/nav";

/** `/partners/reseller#vars` compares as `/partners/reseller`. */
export function baseHref(href: string): string {
  return href.split(/[?#]/)[0] || "/";
}

export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

/** True on the prefix itself and on every route beneath it (`/for` lights on `/for/businesses`). */
export function matchesPath(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function isParentActive(pathname: string, item: PrimaryNavItem): boolean {
  return item.matches.some((prefix) => matchesPath(pathname, prefix));
}

/**
 * The row that marks the current page in a panel. Only the first match
 * wins, so the MSP and VAR rows, which share a page, never both claim it.
 */
export function currentHref(pathname: string, links: readonly NavLink[]): string | undefined {
  return links.find((link) => !isExternal(link.href) && baseHref(link.href) === pathname)?.href;
}

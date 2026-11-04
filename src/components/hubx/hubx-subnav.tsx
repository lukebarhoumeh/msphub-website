"use client";

import { track } from "@/components/hubx/track";
import { SectionSubnav } from "@/components/layout/section-subnav";
import { hubxLockup, hubxNav } from "@/content/hubx";
import { site } from "@/content/site";

/**
 * Secondary navigation across the HubX section (Overview · Features ·
 * Security · What is new), with the text lockup and the product login, on
 * the shared section sub-nav.
 */
export function HubxSubnav() {
  return (
    <SectionSubnav
      items={hubxNav.map((item) => ({ ...item, exact: item.href === "/hubx" }))}
      ariaLabel="HubX section"
      mobileLabel="HubX"
      lockup={hubxLockup}
      trailing={
        <a
          href={site.hubxLoginUrl}
          rel="noopener"
          onClick={() => track("hubx_login_click", { placement: "hubx_subnav" })}
          className="hidden shrink-0 text-sm font-medium text-white/70 hover:text-white sm:inline-flex"
        >
          Log in to HubX
        </a>
      }
    />
  );
}

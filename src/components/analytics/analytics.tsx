"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { consentCopy, consentFreeCountries } from "@/content/consent";
import { site } from "@/content/site";
import { subscribeToTrackEvents, track } from "@/lib/analytics";
import { CONSENT_EVENT, CONSENT_OPEN_EVENT, getConsent, setConsent, type ConsentRecord } from "@/lib/consent";

/**
 * GA4 + Microsoft Clarity loader with consent.
 *
 * - Nothing loads before the first interaction or browser idle time, so the
 *   first paint and Lighthouse's lab run stay script-free.
 * - Visitors in `consentFreeCountries` (US) get analytics without a notice.
 *   Everyone else sees the notice: GA4 loads with Consent Mode defaulting
 *   to denied (cookieless pings only) and Clarity waits until consent is
 *   granted. The country comes from `/api/geo` (Vercel's edge header).
 * - Without `NEXT_PUBLIC_GA4_ID` and `NEXT_PUBLIC_CLARITY_ID` the component
 *   renders nothing: no scripts, no cookies, no notice.
 * - Clicks on any link to the HubX login host fire `hubx_login_click`.
 */

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? "";

const loaded = { ga4: false, clarity: false };

function loadScript(src: string, id: string) {
  if (document.getElementById(id)) return;
  const s = document.createElement("script");
  s.id = id;
  s.src = src;
  s.async = true;
  document.head.appendChild(s);
}

function ensureGtag() {
  window.dataLayer = window.dataLayer ?? [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      // gtag relies on the arguments object, not an array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  }
}

function startGa4(consentGranted: boolean) {
  if (!GA4_ID) return;
  ensureGtag();
  if (!loaded.ga4) {
    window.gtag!("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: consentGranted ? "granted" : "denied",
      wait_for_update: 500,
    });
    window.gtag!("js", new Date());
    window.gtag!("config", GA4_ID, { anonymize_ip: true });
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`, "ga4-script");
    loaded.ga4 = true;
  } else {
    window.gtag!("consent", "update", { analytics_storage: consentGranted ? "granted" : "denied" });
  }
}

function startClarity() {
  if (!CLARITY_ID || loaded.clarity) return;
  if (!window.clarity) {
    const queue: unknown[][] = [];
    const stub = function clarity(...args: unknown[]) {
      queue.push(args);
    } as ((...args: unknown[]) => void) & { q?: unknown[][] };
    stub.q = queue;
    window.clarity = stub;
  }
  loadScript(`https://www.clarity.ms/tag/${encodeURIComponent(CLARITY_ID)}`, "clarity-script");
  loaded.clarity = true;
}

function applyConsent(record: ConsentRecord) {
  const granted = record.analytics === "granted";
  startGa4(granted);
  if (granted) startClarity();
  else if (loaded.clarity) window.clarity?.("consent", false);
}

/** Resolves after the first user interaction or when the browser is idle. */
function whenArmed(): Promise<void> {
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      events.forEach((e) => window.removeEventListener(e, finish));
      resolve();
    };
    const events = ["pointerdown", "keydown", "touchstart", "scroll"] as const;
    events.forEach((e) => window.addEventListener(e, finish, { once: true, passive: true }));
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(() => finish(), { timeout: 4000 });
    } else {
      window.setTimeout(finish, 3000);
    }
  });
}

export function Analytics() {
  const enabled = Boolean(GA4_ID || CLARITY_ID);
  const [notice, setNotice] = useState(false);
  const pathname = usePathname();
  const firstPath = useRef(true);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    const onConsent = (e: Event) => applyConsent((e as CustomEvent<ConsentRecord>).detail);
    const onOpen = () => setNotice(true);
    window.addEventListener(CONSENT_EVENT, onConsent);
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);

    whenArmed().then(async () => {
      if (cancelled) return;
      const stored = getConsent();
      if (stored) {
        applyConsent(stored);
        return;
      }
      let country: string | null = null;
      try {
        const res = await fetch("/api/geo", { cache: "no-store" });
        country = ((await res.json()) as { country?: string | null }).country ?? null;
      } catch {
        country = null;
      }
      if (cancelled) return;
      if (country && (consentFreeCountries as readonly string[]).includes(country)) {
        applyConsent(setConsent("granted", "region"));
      } else {
        // Consent Mode: GA4 starts denied (no cookies); Clarity waits for a choice.
        startGa4(false);
        setNotice(true);
      }
    });

    return () => {
      cancelled = true;
      window.removeEventListener(CONSENT_EVENT, onConsent);
      window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
    };
  }, [enabled]);

  // Client-side navigations: GA4 only counts the first page view on its own.
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    if (loaded.ga4) window.gtag?.("event", "page_view", { page_path: pathname });
  }, [pathname]);

  // "Log in to HubX" anywhere on the site, plus `msphub:track` events dispatched by components.
  useEffect(() => {
    if (!enabled) return;
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as Element | null)?.closest?.("a[href]");
      if (anchor instanceof HTMLAnchorElement && anchor.href.startsWith(site.hubxLoginUrl)) {
        track("hubx_login_click", { location: window.location.pathname });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    const unsubscribe = subscribeToTrackEvents();
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      unsubscribe();
    };
  }, [enabled]);

  if (!enabled || !notice) return null;

  const decide = (analytics: "granted" | "denied") => {
    setConsent(analytics, "choice");
    setNotice(false);
  };

  return (
    <section
      role="dialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-body"
      className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-[640px] rounded-2xl border border-white/15 bg-ink/95 p-5 text-white shadow-[0_20px_60px_rgba(0,0,0,.5)] backdrop-blur-xl sm:inset-x-6 sm:bottom-6"
    >
      <h2 id="consent-title" className="text-sm font-semibold">
        {consentCopy.title}
      </h2>
      <p id="consent-body" className="mt-1.5 text-[14px] leading-relaxed text-white/75">
        {consentCopy.body}{" "}
        <Link href={consentCopy.policyHref} className="font-medium text-white underline-offset-4 hover:underline">
          {consentCopy.policyLabel}
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-2.5">
        <Button size="sm" onClick={() => decide("granted")}>
          {consentCopy.accept}
        </Button>
        <Button size="sm" variant="glass" onClick={() => decide("denied")}>
          {consentCopy.decline}
        </Button>
      </div>
    </section>
  );
}

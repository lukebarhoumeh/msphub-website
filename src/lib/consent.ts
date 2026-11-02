/**
 * Client-side consent state for analytics. The decision lives in
 * localStorage (not a cookie) and is broadcast as a window event so the
 * analytics loader and the notice stay in sync. Clearing site data resets it.
 */

export type ConsentDecision = "granted" | "denied";

export type ConsentRecord = {
  analytics: ConsentDecision;
  /** How the decision was made: explicit choice, or the visitor's region allows analytics without one. */
  basis: "choice" | "region";
  at: string;
};

const STORAGE_KEY = "msphub-consent";
export const CONSENT_EVENT = "msphub:consent";
export const CONSENT_OPEN_EVENT = "msphub:consent-open";

export function getConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    if (parsed.analytics !== "granted" && parsed.analytics !== "denied") return null;
    return { analytics: parsed.analytics, basis: parsed.basis === "region" ? "region" : "choice", at: parsed.at ?? "" };
  } catch {
    return null;
  }
}

export function setConsent(analytics: ConsentDecision, basis: ConsentRecord["basis"] = "choice"): ConsentRecord {
  const record: ConsentRecord = { analytics, basis, at: new Date().toISOString() };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Private mode or storage disabled: the decision still applies for this page view.
  }
  window.dispatchEvent(new CustomEvent<ConsentRecord>(CONSENT_EVENT, { detail: record }));
  return record;
}

/** Re-opens the consent notice (for a "Cookie settings" control). */
export function openConsentSettings(): void {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

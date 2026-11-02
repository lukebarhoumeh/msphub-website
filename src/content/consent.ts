/**
 * Analytics consent (handoff architecture note §9 item 6, approved in
 * Luke's round-2 decisions): visitors outside the US see a minimal notice
 * with Google Consent Mode defaulting to denied; US visitors get analytics
 * without a banner. Where the country is unknown (local development, no
 * edge header) the notice is shown.
 */

/** ISO 3166-1 alpha-2 countries where analytics may start without a notice. */
export const consentFreeCountries = ["US"] as const;

export const consentCopy = {
  title: "Analytics cookies",
  body: "We use Google Analytics and Microsoft Clarity to understand how the site is used. Nothing is stored until you accept.",
  accept: "Accept analytics",
  decline: "Decline",
  policyLabel: "Cookie policy",
  policyHref: "/cookies",
  /** Footer-style control to change the decision later. */
  settingsLabel: "Cookie settings",
} as const;

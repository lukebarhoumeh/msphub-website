/**
 * Per-form confirmation copy for /thank-you/[form] (handoff §4 thank-you row):
 * what happens next, the Bookings link where it applies, and where to go
 * meanwhile. Keyed by the lead `kind` the form posted.
 */
export type ThankYouForm = "demo" | "service" | "quote" | "contact" | "switch" | "partner";

export type ThankYouCopy = {
  received: string;
  title: string;
  body: string;
  /** Short "what happens next" list, in order. */
  next: string[];
  /** Offer the Microsoft Bookings calendar when NEXT_PUBLIC_BOOKINGS_URL is set. */
  bookings?: { label: string; fallback: string };
  links: { label: string; href: string }[];
};

export const thankYou: Record<ThankYouForm, ThankYouCopy> = {
  demo: {
    received: "Demo request received",
    title: "Thanks. Let's find a time.",
    body: "We confirm a 30-minute HubX demo within one business day, with your tenant scenario and your licensing questions on the agenda.",
    next: [
      "A sales engineer replies with two or three time slots, or confirms the one you proposed",
      "You get a calendar invite with the meeting link",
      "The demo runs on demo data unless you ask us to walk through your own scenario",
    ],
    bookings: { label: "Pick a time now", fallback: "Prefer to pick a time yourself? Reply to our confirmation email and we send a booking link." },
    links: [
      { label: "Explore HubX", href: "/hubx" },
      { label: "Get a licensing quote", href: "/licensing/quote" },
    ],
  },
  service: {
    received: "Service inquiry received",
    title: "Thanks. A solutions engineer is reading it.",
    body: "We review the inquiry and reply with questions and a proposed scoping call. Every project starts with a licensing review in HubX.",
    next: [
      "A solutions engineer reviews the practices and the description you sent",
      "You get a reply with clarifying questions and two or three slots for a scoping call",
      "After the call: a fixed-fee statement of work with a named project manager",
    ],
    links: [
      { label: "Services overview", href: "/services" },
      { label: "Explore HubX", href: "/hubx" },
    ],
  },
  quote: {
    received: "Licensing quote request received",
    title: "Thanks. Your quote is in the queue.",
    body: "A licensing specialist prices the estate and replies within one business day with pricing, the right plan mix, and any savings we can see.",
    next: [
      "If you attached an invoice, we match every line to the equivalent SKU, quantity, and term",
      "You get a quote and, where it applies, a transfer plan for the subscriptions you already own",
      "Nothing moves until you accept the reseller relationship from a link",
    ],
    links: [
      { label: "How switching works", href: "/licensing/switch" },
      { label: "Explore HubX", href: "/hubx" },
    ],
  },
  contact: {
    received: "Message received",
    title: "Thanks. We're on it.",
    body: "Your message is with the team. We reply from a real inbox, not an auto-responder.",
    next: ["The right team reads it: sales, licensing, support, or partnerships", "You get a reply by email, usually within one business day"],
    links: [
      { label: "Back to home", href: "/" },
      { label: "About MSP Hub", href: "/about" },
    ],
  },
  switch: {
    received: "Invoice comparison request received",
    title: "Thanks. The deal desk has it.",
    body: "We return a line-by-line comparison against your current invoice and a transfer plan. Nothing gets re-bought and nothing moves until you say so.",
    next: [
      "If the secure upload was not available, we reply with a secure way to send your invoice",
      "The deal desk matches every line to the equivalent SKU, quantity, and term and sends the comparison",
      "If you go ahead, you accept the reseller relationship from a link and we request the partner-to-partner transfer",
      "Billing starts with the next cycle, and everything is visible in HubX",
    ],
    links: [
      { label: "How the transfer works", href: "/licensing/switch#how-it-works" },
      { label: "Explore HubX", href: "/hubx" },
    ],
  },
  partner: {
    received: "Partner application received",
    title: "Thanks. The partner team will be in touch.",
    body: "We review the application and reply with next steps and a call. Onboarding covers tenants, pricing, billing, and training in HubX.",
    next: [
      "The partner team reviews your application and the program you chose",
      "You get a reply with a call to walk through how the program works for your business",
      "Onboarding: organization, users and single sign-on, tenants, pricing, billing, and training",
    ],
    bookings: { label: "Book a HubX demo", fallback: "Want to see HubX first? Schedule a demo and we walk through the platform side as well." },
    links: [
      { label: "Partner programs", href: "/partners" },
      { label: "Explore HubX", href: "/hubx" },
    ],
  },
};

export const thankYouForms = Object.keys(thankYou) as ThankYouForm[];

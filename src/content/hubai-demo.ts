/**
 * HubAI as it ships today (private handoff §2 #5, §5.2): read-only question
 * answering over the signed-in organization's HubX data. The transcript below
 * is fictional demo data; it never schedules orders, detects invoice variance,
 * or recommends dollar savings, because the product does not do those things.
 */
export const hubAiFeatures = [
  {
    title: "Ask in plain language",
    body: "Questions about customers, products, orders, subscriptions, and HubX workflows, scoped to the billing subscription you select.",
  },
  {
    title: "Answers in about five seconds",
    body: "Tables or text you can copy, with edit, retry, like, and dislike controls on every answer.",
  },
  {
    title: "Suggested prompts",
    body: "“List all my active customers”, “Licenses expiring in the next 30 days”, “Top products sold last month”.",
  },
  {
    title: "Read-only by design",
    body: "HubAI reads your HubX data; it does not place orders or change subscriptions.",
  },
] as const;

export const hubAiSuggestedPrompts = [
  "List all my active customers",
  "Licenses expiring in the next 30 days",
  "Top products sold last month",
] as const;

export type HubAiTurn =
  | { role: "user"; text: string }
  | { role: "ai"; intro: string; columns: readonly string[]; rows: readonly (readonly string[])[]; note?: string };

/** Read-only demo conversation (handoff §5.2). Customer names follow the anonymized captures ("Customer A"). */
export const hubAiDemo: readonly HubAiTurn[] = [
  { role: "user", text: "Which licenses expire in the next 30 days?" },
  {
    role: "ai",
    intro: "Four subscriptions expire in the next 30 days.",
    columns: ["Subscription", "Customer", "Expires", "Term", "Auto-renew", "Qty"],
    rows: [
      ["Microsoft 365 E3", "Customer A", "Nov 14", "Annual", "Off", "420"],
      ["Microsoft 365 Business Premium", "Customer D", "Nov 20", "Annual", "On", "85"],
      ["Teams Phone Standard", "Customer F", "Nov 26", "Monthly", "On", "40"],
      ["Defender for Business", "Customer K", "Dec 1", "Annual", "Off", "120"],
    ],
    note: "Two of the four have auto-renew off.",
  },
  { role: "user", text: "Top products sold last month?" },
  {
    role: "ai",
    intro: "Top products by units sold last month.",
    columns: ["#", "Product", "Units", "Customers"],
    rows: [
      ["1", "Microsoft 365 E3", "1,240", "18"],
      ["2", "Microsoft 365 Business Premium", "860", "27"],
      ["3", "Microsoft 365 Copilot", "310", "9"],
      ["4", "Defender for Endpoint Plan 2", "275", "6"],
    ],
  },
];

export const hubAiScopeLabel = "Default billing subscription · Demo data";

/** What the website must not imply about HubAI (handoff §2 #5, §3 #6). */
export const hubAiBoundaries = {
  title: "What HubAI does not do",
  body: "HubAI is read-only today. It does not place or schedule orders, change subscriptions, raise alerts, or recommend savings figures. It answers questions about your HubX data, in tables and text, and lets you edit, retry, rate, and copy every answer.",
} as const;

export const hubAiFooter = "HubAI answers from your own HubX data, scoped to the billing subscription you select.";

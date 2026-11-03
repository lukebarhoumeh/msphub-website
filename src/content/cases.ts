/**
 * Anonymised deal-desk work (redesign brief §4 row 8 and §8.4). Industry and
 * scale only; never a name, logo, or figure that is not on record. `number`
 * stays empty until Luke supplies a figure the customer has approved, and the
 * card renders without it.
 */
export type CaseStudy = {
  id: string;
  industry: string;
  /** e.g. "500 seats"; omitted when not on record. */
  size?: string;
  /** Who they bought from and what was wrong. */
  startingPoint: string;
  /** What the deal desk did. */
  work: string;
  /** What changed, in one line. */
  outcome: string;
  /** The one approved number, when there is one. */
  number?: { value: string; label: string };
};

export const cases: CaseStudy[] = [
  {
    id: "food-manufacturer",
    industry: "Food manufacturer, Brooklyn",
    startingPoint: "A reseller takeover had left the estate on Microsoft 365 E3 plus a stack of separate security and compliance add-ons, with nobody owning the renewal dates.",
    work: "The deal desk mapped every add-on to the E5 bundle that already covered it and sequenced the consolidation around the existing renewal dates.",
    outcome: "One plan per user group, fewer SKUs to reconcile, and every term visible in HubX.",
  },
  {
    id: "midwest-msp",
    industry: "MSP, Midwest",
    startingPoint: "Resold Microsoft through a distributor and wanted direct pricing without re-buying a book of customer subscriptions.",
    work: "The deal desk ran the partner-to-partner transfers customer by customer, in batches under Microsoft’s per-request limit, with the distributor approving each one.",
    outcome: "The whole book moved with its terms and renewal dates intact. Nothing was re-bought.",
  },
  {
    id: "staffing-firm",
    industry: "Staffing firm",
    size: "500 seats",
    startingPoint: "Mixed Business and Enterprise plans accumulated through growth, with Copilot and Teams Phone on the way and no plan for either.",
    work: "The deal desk returned three licensing options side by side: consolidate, right-size by user group, or hold and add, each with its term mix and renewal calendar.",
    outcome: "Finance chose with the numbers in front of them, and the term mix now matches how the seats actually change.",
  },
];

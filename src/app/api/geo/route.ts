import { NextResponse, type NextRequest } from "next/server";

/**
 * Country of the visitor from Vercel's edge header, for the analytics
 * consent decision (handoff risk register: UK/EU visitors see a consent
 * notice, US visitors do not). Returns `null` where the header is absent,
 * such as local development; the client then falls back to showing the
 * notice.
 */
export function GET(req: NextRequest) {
  const country = req.headers.get("x-vercel-ip-country")?.toUpperCase() ?? null;
  return NextResponse.json(
    { country: country && /^[A-Z]{2}$/.test(country) ? country : null },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}

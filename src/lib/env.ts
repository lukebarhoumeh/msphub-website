/**
 * Server-side environment access for the plumbing integrations. Every
 * integration is optional: when its variables are missing the feature
 * degrades to an honest fallback instead of failing the request. Values are
 * read lazily so tests and previews can change them per request.
 */

function read(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

export const env = {
  /** Pipedrive CRM (leads). */
  pipedrive: () => {
    const token = read("PIPEDRIVE_API_TOKEN");
    if (!token) return null;
    const domain = read("PIPEDRIVE_COMPANY_DOMAIN");
    const owner = read("PIPEDRIVE_OWNER_ID");
    return {
      token,
      apiBase: domain ? `https://${domain}.pipedrive.com/api/v1` : "https://api.pipedrive.com/v1",
      webBase: domain ? `https://${domain}.pipedrive.com` : null,
      ownerId: owner && /^\d+$/.test(owner) ? Number(owner) : undefined,
      /** Lead label UUID for a kind, from PIPEDRIVE_LEAD_LABEL_<KIND>. */
      labelFor: (kind: string) => read(`PIPEDRIVE_LEAD_LABEL_${kind.toUpperCase().replace(/[^A-Z0-9]/g, "_")}`),
    };
  },

  /** Resend transactional email. */
  email: () => {
    const apiKey = read("RESEND_API_KEY");
    if (!apiKey) return null;
    return {
      apiKey,
      from: read("LEAD_FROM_EMAIL") ?? "MSP Hub Website <onboarding@resend.dev>",
      to: read("LEAD_TO_EMAIL"),
    };
  },

  /** Cloudflare Turnstile server secret (the site key is public, see `NEXT_PUBLIC_TURNSTILE_SITE_KEY`). */
  turnstileSecret: () => read("TURNSTILE_SECRET_KEY"),

  /** Microsoft Bookings page for the /demo embed. */
  bookingsUrl: () => read("NEXT_PUBLIC_BOOKINGS_URL") ?? read("BOOKINGS_URL"),

  /** Private file storage for uploaded invoices: Vercel Blob or Azure Blob Storage. */
  storage: () => {
    const vercel = read("BLOB_READ_WRITE_TOKEN");
    if (vercel) return { provider: "vercel-blob" as const, token: vercel };
    const azure = read("AZURE_STORAGE_CONNECTION_STRING");
    if (azure) {
      return {
        provider: "azure-blob" as const,
        connectionString: azure,
        container: read("AZURE_STORAGE_CONTAINER") ?? "msphub-invoices",
      };
    }
    return null;
  },

  /** Lifetime of signed invoice links sent to the deal desk (hours, default 72). */
  uploadLinkTtlHours: () => {
    const raw = read("UPLOAD_LINK_TTL_HOURS");
    const hours = raw ? Number(raw) : NaN;
    return Number.isFinite(hours) && hours > 0 ? Math.min(hours, 24 * 30) : 72;
  },

  isProduction: () => process.env.VERCEL_ENV === "production",
};

export type IntegrationStatus = {
  pipedrive: boolean;
  email: boolean;
  turnstile: boolean;
  bookings: boolean;
  storage: "vercel-blob" | "azure-blob" | null;
  ga4: boolean;
  clarity: boolean;
};

/** Presence flags only (never values); used by the review-build status strip. */
export function integrationStatus(): IntegrationStatus {
  return {
    pipedrive: env.pipedrive() !== null,
    email: env.email() !== null,
    turnstile: Boolean(env.turnstileSecret()) && Boolean(read("NEXT_PUBLIC_TURNSTILE_SITE_KEY")),
    bookings: Boolean(env.bookingsUrl()),
    storage: env.storage()?.provider ?? null,
    ga4: Boolean(read("NEXT_PUBLIC_GA4_ID")),
    clarity: Boolean(read("NEXT_PUBLIC_CLARITY_ID")),
  };
}

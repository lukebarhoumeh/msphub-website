/**
 * Fixed-window, per-key rate limiter kept in process memory. Good enough for
 * a marketing site's form endpoints: serverless instances are short-lived, so
 * this bounds abuse per instance rather than globally (documented in README).
 */
export type RateLimiter = {
  /** Records a hit and reports whether the key is over its limit. */
  hit(key: string): { limited: boolean; remaining: number; retryAfterSeconds: number };
  reset(): void;
};

export function createRateLimiter({ windowMs, max, maxKeys = 5000 }: { windowMs: number; max: number; maxKeys?: number }): RateLimiter {
  const hits = new Map<string, number[]>();
  return {
    hit(key) {
      const now = Date.now();
      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
      recent.push(now);
      if (hits.size >= maxKeys && !hits.has(key)) hits.clear();
      hits.set(key, recent);
      const limited = recent.length > max;
      const oldest = recent[0] ?? now;
      return {
        limited,
        remaining: Math.max(0, max - recent.length),
        retryAfterSeconds: limited ? Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)) : 0,
      };
    },
    reset() {
      hits.clear();
    },
  };
}

/** Best-effort client address behind Vercel's proxy. */
export function clientIp(headers: Headers): string {
  return (
    headers.get("x-real-ip")?.trim() ||
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

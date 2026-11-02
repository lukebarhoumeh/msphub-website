import { env } from "@/lib/env";

export type TurnstileResult =
  | { status: "skipped"; reason: "not_configured" }
  | { status: "passed" }
  | { status: "failed"; codes: string[] };

/**
 * Verifies a Cloudflare Turnstile response token with `siteverify`. Fails
 * closed when `TURNSTILE_SECRET_KEY` is set (a missing or invalid token
 * rejects the submission) and passes through when it is not, so previews
 * without the secret keep working. The client shows a visible notice in
 * that case.
 */
export async function verifyTurnstile(token: string | undefined, remoteIp?: string): Promise<TurnstileResult> {
  const secret = env.turnstileSecret();
  if (!secret) return { status: "skipped", reason: "not_configured" };
  if (!token) return { status: "failed", codes: ["missing-input-response"] };

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp && remoteIp !== "unknown") body.set("remoteip", remoteIp);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(8000),
    });
    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    return data.success ? { status: "passed" } : { status: "failed", codes: data["error-codes"] ?? ["unknown"] };
  } catch (err) {
    console.error("[turnstile] siteverify request failed", err);
    return { status: "failed", codes: ["siteverify-unreachable"] };
  }
}

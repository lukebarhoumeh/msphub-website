import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { storageCredential } from "./index";

/**
 * Opaque upload references. `POST /api/upload` returns `id`, an HMAC-signed
 * encoding of the storage key, so `POST /api/lead` only ever resolves
 * references this server issued and never a client-supplied path or URL.
 * The signing key is derived from the storage credential, so no extra
 * secret has to be configured.
 */

function signingKey(): Buffer | null {
  const credential = storageCredential();
  if (!credential) return null;
  return createHash("sha256").update(`msphub:upload-ref:${credential}`).digest();
}

const b64url = {
  encode: (input: string | Buffer) => Buffer.from(input).toString("base64url"),
  decode: (input: string) => Buffer.from(input, "base64url"),
};

export function issueUploadRef(key: string): string | null {
  const secret = signingKey();
  if (!secret) return null;
  const payload = b64url.encode(key);
  const sig = createHmac("sha256", secret).update(payload).digest();
  return `${payload}.${b64url.encode(sig)}`;
}

/** Returns the storage key for a valid reference, or null when it was not issued here. */
export function resolveUploadRef(ref: string): string | null {
  const secret = signingKey();
  if (!secret) return null;
  const [payload, sig] = ref.split(".");
  if (!payload || !sig) return null;
  const expected = createHmac("sha256", secret).update(payload).digest();
  const given = b64url.decode(sig);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
  const key = b64url.decode(payload).toString("utf8");
  return /^invoices\/\d{4}\/\d{2}\/[a-z0-9-]+\.(pdf|xlsx|xls|csv)$/.test(key) ? key : null;
}

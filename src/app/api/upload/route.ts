import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { clientIp, createRateLimiter } from "@/lib/rate-limit";
import { getStorage } from "@/lib/storage";
import { resolveUploadRef, issueUploadRef } from "@/lib/storage/refs";

/**
 * Secure invoice upload for the licensing forms.
 *
 * Request:  multipart/form-data with `file` (PDF, XLSX, XLS, or CSV, ≤ 10 MB)
 *           and `kind` (the lead kind the file belongs to).
 * Success:  200 `{ ok: true, file: { id, name, size, type } }` — `id` is an
 *           opaque, server-signed reference (never a URL). The lead posts it
 *           back as `invoiceId`, and `/api/lead` turns it into a signed,
 *           expiring deal-desk link.
 * Failure:  `{ ok: false, error }` with 400 invalid_file, 415
 *           unsupported_type, 413 too_large, 429 rate_limited, 503
 *           not_configured (no storage variables), 500 upload_failed.
 *
 * Files are stored privately under a random key; nothing here is public.
 * Note: Vercel Functions cap request bodies at 4.5 MB, so on Vercel the
 * platform answers 413 before this handler for larger files.
 */

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

const limiter = createRateLimiter({ windowMs: 10 * 60 * 1000, max: 8 });

const types: Record<string, { contentType: string; magic?: number[][] }> = {
  pdf: { contentType: "application/pdf", magic: [[0x25, 0x50, 0x44, 0x46]] },
  xlsx: { contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", magic: [[0x50, 0x4b, 0x03, 0x04]] },
  xls: { contentType: "application/vnd.ms-excel", magic: [[0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]] },
  csv: { contentType: "text/csv" },
};

function extensionOf(name: string): string {
  return name.toLowerCase().split(".").pop() ?? "";
}

function startsWith(bytes: Uint8Array, magic: number[]): boolean {
  return magic.every((b, i) => bytes[i] === b);
}

/** Checks the declared extension against the first bytes of the file. */
function sniff(ext: string, bytes: Uint8Array): boolean {
  const spec = types[ext];
  if (!spec) return false;
  if (spec.magic) return spec.magic.some((m) => startsWith(bytes, m));
  // CSV: text only (no NUL bytes in the first 4 KB) and not one of the binary formats.
  const head = bytes.subarray(0, 4096);
  if (head.some((b) => b === 0)) return false;
  return !Object.values(types).some((t) => t.magic?.some((m) => startsWith(bytes, m)));
}

const fail = (status: number, error: string) => NextResponse.json({ ok: false, error }, { status });

export async function POST(req: NextRequest) {
  const storage = await getStorage();
  if (!storage) return fail(503, "not_configured");

  const limit = limiter.hit(clientIp(req.headers));
  if (limit.limited) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } });
  }

  const declared = Number(req.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > MAX_UPLOAD_BYTES + 64 * 1024) return fail(413, "too_large");

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail(400, "invalid_file");
  }

  const file = form.get("file");
  const kind = form.get("kind");
  if (!(file instanceof File) || typeof kind !== "string" || !/^[a-z][a-z0-9-]{0,30}$/.test(kind)) return fail(400, "invalid_file");
  if (file.size === 0) return fail(400, "invalid_file");
  if (file.size > MAX_UPLOAD_BYTES) return fail(413, "too_large");

  const name = file.name.trim().slice(0, 255);
  const ext = extensionOf(name);
  if (!types[ext]) return fail(415, "unsupported_type");

  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!sniff(ext, bytes)) return fail(415, "unsupported_type");

  const now = new Date();
  const key = `invoices/${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${randomUUID()}.${ext}`;
  const contentType = types[ext]!.contentType;

  try {
    await storage.put(key, bytes, contentType);
  } catch (err) {
    console.error("[upload] storage put failed", storage.provider, err);
    return fail(500, "upload_failed");
  }

  const id = issueUploadRef(key);
  if (!id || resolveUploadRef(id) !== key) {
    console.error("[upload] could not issue a signed reference");
    return fail(500, "upload_failed");
  }

  console.info("[upload] stored", { kind, provider: storage.provider, size: file.size, type: contentType });
  return NextResponse.json({ ok: true, file: { id, name, size: file.size, type: contentType } });
}

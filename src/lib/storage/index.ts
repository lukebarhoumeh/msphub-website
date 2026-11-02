import { env } from "@/lib/env";

/**
 * Private file storage behind one interface. The provider is chosen by which
 * variable is present: `BLOB_READ_WRITE_TOKEN` (Vercel Blob, private access)
 * or `AZURE_STORAGE_CONNECTION_STRING` (+ `AZURE_STORAGE_CONTAINER`, Azure
 * Blob Storage, private container). Neither set → `getStorage()` is null and
 * uploads answer `503 not_configured`.
 *
 * Nothing stored here is ever public: downloads happen only through signed,
 * expiring links created for the deal-desk notification.
 */
export type StorageProvider = "vercel-blob" | "azure-blob";

export interface StorageAdapter {
  readonly provider: StorageProvider;
  /** Stores bytes under `key` (unique, server-generated). */
  put(key: string, data: Uint8Array, contentType: string): Promise<void>;
  /** A signed URL that downloads `key` until `ttlSeconds` from now. */
  createDownloadUrl(key: string, ttlSeconds: number): Promise<string>;
}

/** The configured adapter, loading only the SDK that is needed; null when storage is not configured. */
export async function getStorage(): Promise<StorageAdapter | null> {
  const cfg = env.storage();
  if (!cfg) return null;
  if (cfg.provider === "vercel-blob") {
    const { createVercelBlobStorage } = await import("./vercel-blob");
    return createVercelBlobStorage(cfg.token);
  }
  const { createAzureBlobStorage } = await import("./azure-blob");
  return createAzureBlobStorage(cfg.connectionString, cfg.container);
}

/** The secret material the signed references are keyed on (never exposed). */
export function storageCredential(): string | null {
  const cfg = env.storage();
  if (!cfg) return null;
  return cfg.provider === "vercel-blob" ? cfg.token : cfg.connectionString;
}

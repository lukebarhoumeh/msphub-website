import { issueSignedToken, presignUrl, put } from "@vercel/blob";
import type { StorageAdapter } from "./index";

/** Vercel Blob with `access: "private"`; downloads via short-lived presigned URLs. */
export function createVercelBlobStorage(token: string): StorageAdapter {
  return {
    provider: "vercel-blob",
    async put(key, data, contentType) {
      await put(key, Buffer.from(data), { access: "private", contentType, addRandomSuffix: false, token });
    },
    async createDownloadUrl(key, ttlSeconds) {
      const validUntil = Date.now() + ttlSeconds * 1000;
      const signed = await issueSignedToken({ pathname: key, operations: ["get"], validUntil, token });
      const { presignedUrl } = await presignUrl(signed, { operation: "get", pathname: key, validUntil, access: "private" });
      return presignedUrl;
    },
  };
}

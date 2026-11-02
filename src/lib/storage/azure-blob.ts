import { BlobSASPermissions, BlobServiceClient } from "@azure/storage-blob";
import type { StorageAdapter } from "./index";

/**
 * Azure Blob Storage in a private container; downloads via a read-only
 * blob SAS. The connection string must carry an account key so the SDK can
 * sign the SAS locally.
 */
export function createAzureBlobStorage(connectionString: string, container: string): StorageAdapter {
  const service = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = service.getContainerClient(container);
  return {
    provider: "azure-blob",
    async put(key, data, contentType) {
      await containerClient.createIfNotExists();
      await containerClient.getBlockBlobClient(key).uploadData(data, {
        blobHTTPHeaders: { blobContentType: contentType },
      });
    },
    async createDownloadUrl(key, ttlSeconds) {
      return containerClient.getBlockBlobClient(key).generateSasUrl({
        permissions: BlobSASPermissions.parse("r"),
        expiresOn: new Date(Date.now() + ttlSeconds * 1000),
      });
    },
  };
}

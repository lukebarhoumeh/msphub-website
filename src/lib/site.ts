/**
 * Search engines are told not to index the site until launch. Set
 * `NEXT_PUBLIC_ALLOW_INDEXING=true` only on the production msphub.com
 * deployment; previews and the placeholder stay out of search results.
 */
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

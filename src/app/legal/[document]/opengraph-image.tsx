import { legalDocuments, legalSlugs } from "@/content/legal";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "MSP Hub legal";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return legalSlugs.map((document) => ({ document }));
}

export default async function Image({ params }: { params: Promise<{ document: string }> }) {
  const { document } = await params;
  const doc = legalDocuments.find((d) => d.slug === document);
  return renderOgImage({ eyebrow: "Legal", title: doc?.title ?? "MSP Hub legal" });
}

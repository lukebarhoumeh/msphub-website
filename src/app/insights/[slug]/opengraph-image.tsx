import { getPost, postSlugs } from "@/content/insights";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "MSP Hub news and insights";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return renderOgImage({
    eyebrow: "News & Insights",
    title: post?.title ?? "Insights from the MSP Hub team.",
  });
}

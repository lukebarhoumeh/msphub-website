import { ogCopy } from "@/content/og";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = ogCopy.about.alt;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage(ogCopy.about);
}

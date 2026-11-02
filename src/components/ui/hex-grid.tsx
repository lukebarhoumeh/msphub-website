import { cn } from "@/lib/cn";

/**
 * Decorative hex-grid texture (echoes the X mark's open diamond) as an inline
 * SVG pattern. Inline SVG is not a Largest Contentful Paint candidate, unlike a
 * CSS background-image, so the hero's LCP stays on the headline or product
 * image. Masked to fade toward the edges.
 */
export function HexGrid({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn(
        "absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_70%_60%_at_60%_30%,#000_20%,transparent_75%)]",
        className,
      )}
    >
      <defs>
        <pattern id="msphub-hex" width="126" height="72.75" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="1" transform="scale(1.5)">
            <polygon points="70,24.25 56,48.5 28,48.5 14,24.25 28,0 56,0" />
            <path d="M0 24.25H14M70 24.25H84" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#msphub-hex)" />
    </svg>
  );
}

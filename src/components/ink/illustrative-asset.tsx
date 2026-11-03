import { cn } from "@/lib/cn";

export type ArtName = "four-engine-refraction" | "lifecycle-glass-corridor" | "ai-inference-lattice";

const art = {
  "four-engine-refraction": { width: 1280, height: 720, widths: [800, 1280] },
  "lifecycle-glass-corridor": { width: 1152, height: 864, widths: [800, 1152] },
  "ai-inference-lattice": { width: 1152, height: 864, widths: [800, 1152] },
} as const;

type IllustrativeAssetProps = {
  name: ArtName;
  priority?: boolean;
  className?: string;
  sizes?: string;
  /** Decorative use (a masked background): hidden from assistive tech. */
  decorative?: boolean;
};

/**
 * Generated artwork. Per DESIGN.md §5 the renders are backgrounds and
 * atmosphere, never framed as product: no visible caption, and the alt text
 * says what it is.
 */
export function IllustrativeAsset({
  name,
  priority = false,
  className,
  sizes = "(min-width: 1024px) 54vw, 100vw",
  decorative = false,
}: IllustrativeAssetProps) {
  const { width, height, widths } = art[name];
  const srcSet = (ext: "avif" | "webp") => widths.map((w) => `/ink-glass/${name}-${w}.${ext} ${w}w`).join(", ");
  return (
    <picture className={cn("block", className)}>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={`/ink-glass/${name}.jpg`}
        alt={decorative ? "" : "Illustrative render, not HubX product UI"}
        aria-hidden={decorative || undefined}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className="h-auto w-full"
      />
    </picture>
  );
}

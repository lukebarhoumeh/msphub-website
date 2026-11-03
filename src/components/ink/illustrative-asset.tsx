import { cn } from "@/lib/cn";

type ArtName = "four-engine-refraction" | "lifecycle-glass-corridor" | "ai-inference-lattice";

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
};

/** Generated artwork. Empty alt; the visible caption is the truth label. */
export function IllustrativeAsset({
  name,
  priority = false,
  className,
  sizes = "(min-width: 1024px) 54vw, 100vw",
}: IllustrativeAssetProps) {
  const { width, height, widths } = art[name];
  const srcSet = (ext: "avif" | "webp") => widths.map((w) => `/ink-glass/${name}-${w}.${ext} ${w}w`).join(", ");
  return (
    <figure className={cn("m-0", className)}>
      <picture>
        <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
        <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
        <img
          src={`/ink-glass/${name}.jpg`}
          alt=""
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className="h-auto w-full"
        />
      </picture>
      <figcaption className="mt-3 font-mono text-[11px] tracking-[0.12em] text-current uppercase opacity-70">
        Illustrative — not product UI
      </figcaption>
    </figure>
  );
}

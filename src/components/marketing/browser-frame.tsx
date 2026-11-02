import Image from "next/image";
import type { Screen } from "@/content/screens";
import { cn } from "@/lib/cn";

type BrowserFrameProps = {
  screen: Screen;
  /** Only the first above-the-fold frame on a page should be priority. */
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Show the caption line under the frame. */
  caption?: boolean;
  /** Override next/image's lazy default, e.g. for the active slide of a carousel. */
  loading?: "eager" | "lazy";
  /** Hint for the browser's resource scheduler on the active slide. */
  fetchPriority?: "high" | "low" | "auto";
  /** Id for aria-controls / anchors. */
  id?: string;
  /**
   * How to present the tall full-page captures (800×1216) on wide screens:
   * `auto` shows the whole capture; `scroll` caps the frame height from lg up
   * and lets the capture scroll inside the window, like the product itself;
   * `crop` caps the height and fades the bottom edge (heroes).
   */
  viewport?: "auto" | "scroll" | "crop";
};

/**
 * Browser chrome around a real HubX capture. The bezel follows the capture's
 * theme so light screenshots sit on light sections and the dark capture on
 * dark bands. Images are static imports (intrinsic size + blur placeholder).
 */
export function BrowserFrame({
  screen,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className,
  caption = true,
  loading,
  fetchPriority,
  id,
  viewport = "auto",
}: BrowserFrameProps) {
  const dark = screen.theme === "dark";
  const image = (
    <Image
      src={screen.image}
      alt={screen.alt}
      placeholder="blur"
      priority={priority}
      loading={priority ? undefined : loading}
      fetchPriority={priority ? undefined : fetchPriority}
      sizes={sizes}
      className="block h-auto w-full"
    />
  );
  return (
    <figure id={id} className={cn("w-full", className)}>
      <div className={cn(viewport === "crop" && "[mask-image:linear-gradient(to_bottom,#000_62%,transparent_100%)]")}>
        <div
          className={cn(
            "overflow-hidden rounded-2xl border shadow-[0_20px_60px_rgba(0,0,0,.25)]",
            dark ? "border-white/12 bg-[#121212]" : "border-black/10 bg-white",
            viewport === "crop" && "max-h-[600px]",
          )}
        >
          <div
            className={cn(
              "flex h-10 items-center gap-2.5 border-b px-4",
              dark ? "border-white/10 bg-white/4" : "border-black/8 bg-[#F5F5F5]",
            )}
          >
            <div className="flex gap-1.5" aria-hidden>
              <i className={cn("size-2.5 rounded-full", dark ? "bg-white/15" : "bg-black/12")} />
              <i className={cn("size-2.5 rounded-full", dark ? "bg-white/15" : "bg-black/12")} />
              <i className={cn("size-2.5 rounded-full", dark ? "bg-white/15" : "bg-black/12")} />
            </div>
            <div
              className={cn(
                "mx-auto inline-flex h-6 max-w-[70%] items-center gap-2 truncate rounded-full border px-3 font-mono text-[11px]",
                dark ? "border-white/12 bg-white/6 text-white/65" : "border-black/8 bg-white text-black/65",
              )}
            >
              <span aria-hidden className="size-2.5 shrink-0 rounded-[3px] border-[1.5px] border-current" />
              <span className="truncate">hubx.msphub.com{screen.path === "/" ? "" : screen.path}</span>
            </div>
          </div>
          {viewport === "scroll" ? (
            <div
              tabIndex={0}
              role="group"
              aria-label={`${screen.caption} (scrollable screenshot)`}
              className="overscroll-y-contain focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-orange lg:max-h-[min(640px,72vh)] lg:overflow-y-auto"
            >
              {image}
            </div>
          ) : (
            image
          )}
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-xs text-current opacity-85">
          HubX — live product, demo data. {screen.caption}.
          {viewport === "scroll" ? <span className="hidden lg:inline"> Scroll inside the window to see the full page.</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

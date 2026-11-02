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
};

/**
 * Browser chrome around a real HubX capture. The bezel follows the capture's
 * theme so light screenshots sit on light sections and the dark capture on
 * dark bands. Images are static imports (intrinsic size + blur placeholder).
 */
export function BrowserFrame({ screen, priority, sizes = "(min-width: 1024px) 50vw, 100vw", className, caption = true }: BrowserFrameProps) {
  const dark = screen.theme === "dark";
  return (
    <figure className={cn("w-full", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-2xl border shadow-[0_20px_60px_rgba(0,0,0,.25)]",
          dark ? "border-white/12 bg-[#121212]" : "border-black/10 bg-white",
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
              "mx-auto inline-flex h-6 items-center gap-2 rounded-full border px-3 font-mono text-[11px]",
              dark ? "border-white/12 bg-white/6 text-white/65" : "border-black/8 bg-white text-black/65",
            )}
          >
            <span aria-hidden className="size-2.5 rounded-[3px] border-[1.5px] border-current" />
            hubx.msphub.com{screen.path === "/" ? "" : screen.path}
          </div>
        </div>
        <Image
          src={screen.image}
          alt={screen.alt}
          placeholder="blur"
          priority={priority}
          sizes={sizes}
          className="block h-auto w-full"
        />
      </div>
      {caption ? (
        <figcaption className={cn("mt-3 text-center text-xs", dark ? "text-white/60" : "text-charcoal/80")}>
          HubX — live product, demo data. {screen.caption}.
        </figcaption>
      ) : null}
    </figure>
  );
}

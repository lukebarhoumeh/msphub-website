import { CaptureImage } from "@/components/ink/evidence";
import type { Capture } from "@/content/evidence";
import { cn } from "@/lib/cn";

type DeviceFrameProps = {
  capture: Capture;
  /** `browser`: a chrome bar with the HubX route. `tablet`: the glass bezel. `bare`: the crop with a hairline. */
  variant?: "browser" | "tablet" | "bare";
  /** The HubX route shown in the browser chrome. */
  path?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Real HubX screens in a frame. Three frames, one brand: the browser (the
 * product as people meet it), the tablet bezel (the hero object), and bare
 * (a comparison or a document). Captures stay off the image optimizer.
 */
export function DeviceFrame({ capture, variant = "browser", path = "/", priority = false, className }: DeviceFrameProps) {
  if (variant === "bare") {
    return (
      <div className={cn("overflow-hidden rounded-[18px] border border-white/12 bg-[#12192b] shadow-[0_32px_80px_-24px_rgba(0,0,0,.6)]", className)}>
        <CaptureImage capture={capture} priority={priority} className="max-w-none rounded-none" />
      </div>
    );
  }
  if (variant === "tablet") {
    return (
      <div className={cn("overflow-hidden rounded-[24px] border border-white/14 bg-[#12192b] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,.16),0_40px_90px_rgba(0,0,0,.45)]", className)}>
        <CaptureImage capture={capture} priority={priority} className="max-w-none rounded-[14px]" />
      </div>
    );
  }
  return (
    <div className={cn("overflow-hidden rounded-[18px] border border-white/14 bg-[#12192b] shadow-[inset_0_1px_0_rgba(255,255,255,.14),0_40px_90px_rgba(0,0,0,.45)]", className)}>
      <div className="flex h-9 items-center gap-2 border-b border-white/10 px-3.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </span>
        <span className="ml-2 inline-flex h-6 min-w-0 max-w-full items-center truncate rounded-md bg-white/6 px-2.5 font-mono text-[11px] text-white/60">
          hubx.msphub.com{path === "/" ? "" : path}
        </span>
      </div>
      <CaptureImage capture={capture} priority={priority} className="max-w-none rounded-none" />
    </div>
  );
}

import type { CSSProperties } from "react";
import { DeviceFrame } from "@/components/ink/device-frame";
import { Parallax } from "@/components/ink/flow";
import { Panel, inkTone, monoLabel } from "@/components/ink/interior";
import { Spotlight } from "@/components/ink/motion";
import { WideOnly } from "@/components/ink/wide-only";
import { EngagementRail } from "@/components/services/engagement-rail";
import { captures, truthLabel } from "@/content/evidence";
import { professional } from "@/content/services";
import { cn } from "@/lib/cn";

const capture = captures.customerProductsHome;

/**
 * The /services/professional hero object (spec §3): step 01 of the delivery
 * model happens in this screen, so the customer-products view sits in a
 * browser frame with the Align → Plan → Deliver → Validate rail docked under
 * it and the lead's own sentence as the rail caption.
 *
 * From lg it is one glass panel, tinted and blurred so the rail stays legible
 * over the hero's background render. The frame mounts only there and after
 * hydration (`WideOnly`), inside a box reserved at its exact height, so
 * phones download no image and nothing shifts when it appears. Below lg the
 * panel steps aside (`display: contents`) and only the rail strip shows.
 */
export function ProfessionalHeroObject() {
  return (
    <Panel tone="ink" className="max-lg:contents lg:ml-auto lg:max-w-[440px] lg:bg-[#0b1020]/90 lg:p-5 lg:backdrop-blur-md">
      {/* The box is the frame's height at any width: the crop at the frame's inner width (2px of side
          borders less) plus the 38px chrome (the 36px address bar and the 1px top and bottom borders). */}
      <div className="@container" style={{ "--crop-ratio": capture.crop.height / capture.crop.width } as CSSProperties}>
        <WideOnly className="hidden h-[calc((100cqw_-_2px)_*_var(--crop-ratio)_+_38px)] lg:block">
          <Parallax range={24}>
            <Spotlight className="tilt tilt-hero rounded-[18px]">
              <DeviceFrame variant="browser" capture={capture} path="/customers/products" priority />
            </Spotlight>
          </Parallax>
        </WideOnly>
      </div>
      <EngagementRail
        variant="hero"
        stages={professional.engagement}
        idPrefix="delivery"
        caption="Every project starts with a licensing review in HubX"
        className="lg:mt-5"
      />
      <p className={cn(monoLabel, "mt-2 hidden lg:block", inkTone.ink.muted)}>{truthLabel}</p>
    </Panel>
  );
}

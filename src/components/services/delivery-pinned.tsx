"use client";

import { Pinned, type PinnedStep } from "@/components/ink/pinned";
import { DeliveryStage, type DeliveryStageData } from "@/components/services/delivery-stage";

/**
 * "How we deliver" (spec §3, chapter 03): the delivery model pinned beside
 * `DeliveryStage`. A client wrapper because the figure is a render prop,
 * which cannot cross the server/client boundary; the page passes the data in
 * as props, so no content module ships in the client bundle. Step ids are
 * `delivery-01`…`delivery-04`, the targets of the hero rail's stations.
 * Step titles are plain headings: the inquiry is one click away in the header,
 * the sub-nav, and the hero. The wrapper raises the pin offset so the figure
 * clears the services sub-nav, which sticks under the header from lg.
 */
export function DeliveryPinned({ stages, deliverables }: DeliveryStageData) {
  const steps: PinnedStep[] = stages.map((stage, i) => ({ n: String(i + 1).padStart(2, "0"), title: stage.title, body: stage.body }));
  return (
    <div className="lg:[--pinned-top:9.25rem]">
      <Pinned
        steps={steps}
        label="How we deliver"
        idPrefix="delivery"
        stepMinH="56vh"
        tone="pearl"
        caption={null}
        figure={(i) => <DeliveryStage active={i} stages={stages} deliverables={deliverables} />}
      />
    </div>
  );
}

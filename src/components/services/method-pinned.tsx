"use client";

import { Pinned, type PinnedStep } from "@/components/ink/pinned";
import { SprintLoop, type SprintLoopData } from "@/components/services/sprint-loop";

/**
 * Chapter 02 of /services/development (spec §4): the four method steps scroll
 * while the sprint loop stays pinned and lights the matching stage. A client
 * wrapper because `figure` is a render prop, which cannot cross the server
 * boundary; the page passes the data in as props. Below lg and under reduced
 * motion `Pinned` stacks every step with its own fully lit loop. Step titles
 * are plain headings, and the wrapper raises the pin offset so the loop clears
 * the services sub-nav.
 */
export function MethodPinned({ stages, loop }: SprintLoopData) {
  const steps: PinnedStep[] = stages.map((step, index) => ({ n: String(index + 1).padStart(2, "0"), title: step.title, body: step.body }));
  return (
    <div className="lg:[--pinned-top:9.25rem]">
      <Pinned
        steps={steps}
        label="How a project runs"
        idPrefix="method"
        stepMinH="56vh"
        tone="pearl"
        caption={null}
        figure={(index) => <SprintLoop active={index} stages={stages} loop={loop} />}
      />
    </div>
  );
}

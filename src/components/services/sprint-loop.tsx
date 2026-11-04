import { Panel, type InkTone } from "@/components/ink/interior";
import type { development } from "@/content/services";
import { cn } from "@/lib/cn";

/** The method steps and the loop's labels (`development.method`, `development.loop`), passed in by the page. */
export type SprintLoopData = {
  stages: typeof development.method;
  loop: typeof development.loop;
};

type SprintLoopProps = SprintLoopData & {
  /** Index into `development.method` (0 Discover, 1 Build, 2 Ship, 3 Improve). Omit to light every stage. */
  active?: number;
  tone?: InkTone;
  className?: string;
};


const ORANGE = "#f97316";

const palettes = {
  pearl: { ink: "#0b1020", muted: "#4b5569", lane: "#f4f6fb", laneStroke: "rgba(11,16,32,.12)", laneHi: "#ffffff", cap: "rgba(11,16,32,.3)" },
  ink: { ink: "#ffffff", muted: "#b8c0d4", lane: "rgba(255,255,255,.06)", laneStroke: "rgba(255,255,255,.14)", laneHi: "rgba(255,255,255,.18)", cap: "rgba(255,255,255,.35)" },
} as const;

type Palette = (typeof palettes)[InkTone];

/*
 * Geometry in viewBox units (360 × 372, portrait so the labels stay legible
 * on phones): the milestone node top-left, three stacked lanes DEV → UAT →
 * PROD, promotion arrows down the left of the lanes, the dashed rollback up
 * the right, the demo node on the PROD lane, and the next-milestone arc
 * leaving PROD, running up the left edge, and arriving back at the node.
 */
const LANE_X = 44;
const LANE_W = 272;
const LANE_H = 44;
const LANE_Y = [84, 164, 244] as const;
const NODE = { x: 44, y: 40 };
const PROMOTE_X = 100;
const ROLLBACK_X = 272;
const DEMO = { x: 296, y: LANE_Y[2] + LANE_H / 2 };
const ARC = `M 80 ${LANE_Y[2] + LANE_H} V 316 Q 80 330 66 330 H 34 Q 20 330 20 316 V 54 Q 20 ${NODE.y} 29 ${NODE.y}`;

const mono = "font-mono uppercase";

function Chevron({ x, y, dir }: { x: number; y: number; dir: "down" | "up" | "right" }) {
  const d =
    dir === "down"
      ? `M${x - 4} ${y - 5} L${x} ${y} L${x + 4} ${y - 5}`
      : dir === "up"
        ? `M${x - 4} ${y + 5} L${x} ${y} L${x + 4} ${y + 5}`
        : `M${x - 5} ${y - 4} L${x} ${y} L${x - 5} ${y + 4}`;
  return <path d={d} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />;
}

/** A glass lane bar with its mono-ish label and the left cap that carries the one orange accent. */
function Lane({ y, label, cap, p }: { y: number; label: string; cap: string; p: Palette }) {
  return (
    <>
      <rect x={LANE_X} y={y} width={LANE_W} height={LANE_H} rx={10} fill={p.lane} stroke={p.laneStroke} />
      <line x1={LANE_X + 10} y1={y + 1} x2={LANE_X + LANE_W - 10} y2={y + 1} stroke={p.laneHi} strokeOpacity={0.9} />
      <rect x={LANE_X + 6} y={y + 10} width={4} height={LANE_H - 20} rx={2} fill={cap} />
      <text x={LANE_X + 22} y={y + LANE_H / 2 + 5} fontSize={15} fontWeight={700} letterSpacing="0.04em" fill={p.ink}>
        {label}
      </text>
    </>
  );
}

/**
 * How a development project runs (spec §4): the sprint loop as an SVG whose
 * stages light with the pinned step. Discover lights the milestone node,
 * Build the DEV lane and the sprint label, Ship the promotion arrows,
 * rollback, demo node and the UAT and PROD lanes, Improve the arc and its
 * label. Lit is opacity 1, the rest .35 over 300 ms; one orange element at a
 * time (the active lane cap or node). Under reduced motion, below lg, or with
 * no `active`, everything is lit and nothing transitions. Every label comes
 * from `development.loop`; every element traces to a sentence in
 * `development.method`.
 *
 * Pure markup: the dimming is gated in CSS (`motion-safe:` + `lg:`), not with
 * `useReducedMotion`, so the server and client render identical classes and a
 * reduced-motion reader never inherits the server's dimmed state (React does
 * not patch attribute mismatches on hydration).
 */
export function SprintLoop({ active, stages, loop, tone = "pearl", className }: SprintLoopProps) {
  const { lanes, labels } = loop;
  const p = palettes[tone];
  const stage = typeof active === "number" ? stages[active] : undefined;
  const staged = stage !== undefined;
  const group = (i: number) => cn(staged && "motion-safe:transition-opacity motion-safe:duration-300", staged && active !== i && "motion-safe:lg:opacity-35");
  const accent = active ?? 0;
  const summary =
    typeof active === "number" && stage
      ? `Stage ${active + 1} of ${stages.length}: ${stage.title}. ${stage.body}`
      : stages.map((s) => `${s.title}: ${s.body}`).join(" ");

  return (
    <Panel tone={tone} className={cn("mx-auto w-full max-w-[560px]", className)}>
      <svg viewBox="0 0 360 372" aria-hidden="true" className="mx-auto block h-auto w-full max-w-[440px] font-display" style={{ color: p.ink }}>
        {/* Discover: the milestone node, and the first sprint it starts. */}
        <g className={group(0)}>
          <circle cx={NODE.x} cy={NODE.y} r={14} fill="none" stroke="currentColor" strokeWidth={1.25} />
          <circle cx={NODE.x} cy={NODE.y} r={7} fill={accent === 0 ? ORANGE : p.ink} />
          <text x={NODE.x + 22} y={NODE.y + 5} fontSize={14} fontWeight={600} fill={p.ink}>
            {stages[0].title}
          </text>
          <line x1={NODE.x} y1={NODE.y + 16} x2={NODE.x} y2={LANE_Y[0] - 4} stroke="currentColor" strokeWidth={1.25} />
          <Chevron x={NODE.x} y={LANE_Y[0] - 3} dir="down" />
        </g>

        {/* Build: the DEV lane and the sprint cadence. */}
        <g className={group(1)}>
          <Lane y={LANE_Y[0]} label={lanes[0]} cap={accent === 1 ? ORANGE : p.cap} p={p} />
          <text x={LANE_X + LANE_W - 16} y={LANE_Y[0] + LANE_H / 2 + 4} textAnchor="end" fontSize={11} letterSpacing="0.1em" fill={p.muted} className={mono}>
            {labels.sprint}
          </text>
        </g>

        {/* Ship: promotion, rollback, the demo node, UAT and PROD. */}
        <g className={group(2)}>
          <line x1={PROMOTE_X} y1={LANE_Y[0] + LANE_H} x2={PROMOTE_X} y2={LANE_Y[1] - 4} stroke="currentColor" strokeWidth={1.25} />
          <Chevron x={PROMOTE_X} y={LANE_Y[1] - 3} dir="down" />
          <text x={PROMOTE_X + 12} y={(LANE_Y[0] + LANE_H + LANE_Y[1]) / 2 + 4} fontSize={11} letterSpacing="0.1em" fill={p.muted} className={mono}>
            {labels.promote}
          </text>
          <Lane y={LANE_Y[1]} label={lanes[1]} cap={p.cap} p={p} />
          <line x1={PROMOTE_X} y1={LANE_Y[1] + LANE_H} x2={PROMOTE_X} y2={LANE_Y[2] - 4} stroke="currentColor" strokeWidth={1.25} />
          <Chevron x={PROMOTE_X} y={LANE_Y[2] - 3} dir="down" />
          <line x1={ROLLBACK_X} y1={LANE_Y[2]} x2={ROLLBACK_X} y2={LANE_Y[1] + LANE_H + 4} stroke="currentColor" strokeWidth={1.25} strokeDasharray="3 4" strokeLinecap="round" />
          <Chevron x={ROLLBACK_X} y={LANE_Y[1] + LANE_H + 3} dir="up" />
          <text x={ROLLBACK_X - 12} y={(LANE_Y[1] + LANE_H + LANE_Y[2]) / 2 + 4} textAnchor="end" fontSize={11} letterSpacing="0.1em" fill={p.muted} className={mono}>
            {labels.rollback}
          </text>
          <Lane y={LANE_Y[2]} label={lanes[2]} cap={p.cap} p={p} />
          <circle cx={DEMO.x} cy={DEMO.y} r={7} fill={accent === 2 ? ORANGE : p.ink} stroke={p.lane} strokeWidth={2} />
          <text x={LANE_X + LANE_W} y={LANE_Y[2] + LANE_H + 20} textAnchor="end" fontSize={11} letterSpacing="0.1em" fill={p.muted} className={mono}>
            {labels.demo}
          </text>
        </g>

        {/* Improve: the next milestone loops back to Discover. */}
        <g className={group(3)} style={{ color: accent === 3 ? ORANGE : p.ink }}>
          <path d={ARC} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          <Chevron x={NODE.x - 15} y={NODE.y} dir="right" />
          <text x={92} y={334} fontSize={11} letterSpacing="0.1em" fill={p.muted} className={mono}>
            {labels.next}
          </text>
          <text x={92} y={354} fontSize={12.5} fontWeight={500} fill={p.ink}>
            {labels.improve}
          </text>
        </g>
      </svg>
      <p className="sr-only">{summary}</p>
    </Panel>
  );
}

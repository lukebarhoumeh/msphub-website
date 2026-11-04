import type { EngineId } from "@/content/home";

/** Four sibling marks from the MSP Hub diamond. Same box, same stroke, one orange accent. */
export function EngineSymbol({ engine, accent = true }: { engine: EngineId; accent?: boolean }) {
  const dot = accent ? "#f97316" : "#0b1020";
  return (
    <svg viewBox="0 0 46 46" className="size-[46px] shrink-0" aria-hidden>
      <path d="M23 5.5 40.5 23 23 40.5 5.5 23Z" fill="none" stroke="#1a2949" strokeWidth="1.4" />
      {engine === "hubx" ? (
        <path d="M23 14.5 31.5 23 23 31.5 14.5 23Z" fill={dot} />
      ) : null}
      {engine === "professional" ? (
        <>
          <path d="M14 23h18M16.5 18.5h13M16.5 27.5h13" stroke="#0b1020" strokeWidth="1.4" />
          <circle cx="33" cy="23" r="2" fill={dot} />
        </>
      ) : null}
      {engine === "managed" ? (
        <>
          <circle cx="23" cy="23" r="7.5" fill="none" stroke="#0b1020" strokeWidth="1.4" />
          <circle cx="23" cy="15.5" r="2.1" fill={dot} />
        </>
      ) : null}
      {engine === "development" ? (
        <>
          <path d="M23 12v22M12 23h22M15.5 15.5l15 15M30.5 15.5l-15 15" stroke="#0b1020" strokeWidth="1.2" />
          <circle cx="23" cy="23" r="2.4" fill={dot} />
        </>
      ) : null}
    </svg>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HubxPathChip, type HubxTone } from "@/components/hubx/primitives";
import { BrowserFrame } from "@/components/marketing/browser-frame";
import { IconTile } from "@/components/ui/card";
import type { HubxModule } from "@/content/hubx-modules";
import { screens } from "@/content/screens";
import { cn } from "@/lib/cn";

type ModuleCardProps = {
  module: HubxModule;
  tone?: HubxTone;
  /** Show the module's first capture inside the card. */
  thumbnail?: boolean;
  className?: string;
};

/** Module summary card for the features index and the related-module footers. */
export function ModuleCard({ module: m, tone = "light", thumbnail = true, className }: ModuleCardProps) {
  const dark = tone === "dark";
  const isFeaturePage = m.href.startsWith("/hubx/features/");
  return (
    <article className={cn("flex h-full flex-col overflow-hidden", dark ? "glass" : "card-light", className)}>
      {thumbnail ? (
        <div className={cn("h-52 overflow-hidden px-5 pt-5", dark ? "bg-white/3" : "bg-canvas")} aria-hidden>
          <BrowserFrame screen={screens[m.screens[0]]} caption={false} sizes="(min-width: 1024px) 380px, 100vw" />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <IconTile icon={m.icon} />
          <div className="min-w-0">
            <h3 className={cn("text-lg font-semibold tracking-tight", dark ? "text-white" : "text-charcoal")}>{m.name}</h3>
            <HubxPathChip path={m.hubxPath} tone={tone} className="mt-1 h-6 text-[10.5px]" />
          </div>
        </div>
        <p className={cn("mt-4 text-[15px] leading-relaxed", dark ? "text-white/70" : "text-charcoal/80")}>{m.summary}</p>
        <Link
          href={m.href}
          className={cn(
            "mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold underline-offset-4 hover:underline",
            dark ? "text-brand-orange" : "text-charcoal",
          )}
        >
          {isFeaturePage ? `Explore ${m.name}` : "Security and administration"}
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

"use client";

import { useId, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { homeAudiences } from "@/content/home";
import { cn } from "@/lib/cn";

export function AudienceRouter() {
  const baseId = useId();
  const [active, setActive] = useState<(typeof homeAudiences)[number]["id"]>(homeAudiences[0].id);
  const [open, setOpen] = useState<(typeof homeAudiences)[number]["id"]>(homeAudiences[0].id);
  const selected = homeAudiences.find((item) => item.id === active) ?? homeAudiences[0];

  return (
    <div>
      <div className="hidden md:grid md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] md:gap-10">
        <div role="tablist" aria-label="Who we work with" className="grid content-start">
          {homeAudiences.map((item, index) => {
            const selectedTab = item.id === active;
            return (
              <button
                key={item.id}
                id={`${baseId}-tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={selectedTab}
                aria-controls={`${baseId}-panel`}
                tabIndex={selectedTab ? 0 : -1}
                onClick={() => setActive(item.id)}
                onKeyDown={(e) => {
                  const next =
                    e.key === "ArrowDown" || e.key === "ArrowRight"
                      ? index + 1
                      : e.key === "ArrowUp" || e.key === "ArrowLeft"
                        ? index - 1
                        : e.key === "Home"
                          ? 0
                          : e.key === "End"
                            ? homeAudiences.length - 1
                            : null;
                  if (next === null) return;
                  e.preventDefault();
                  const target = homeAudiences[(next + homeAudiences.length) % homeAudiences.length];
                  setActive(target.id);
                  document.getElementById(`${baseId}-tab-${target.id}`)?.focus();
                }}
                className={cn(
                  "flex min-h-14 items-center border-b border-[#0b1020]/10 px-2 text-left text-lg font-semibold",
                  selectedTab ? "text-[#0b1020]" : "text-[#4b5569]",
                )}
              >
                <span aria-hidden className={cn("mr-3 size-1.5 rounded-full", selectedTab ? "bg-[#f97316]" : "bg-transparent")} />
                {item.label}
              </button>
            );
          })}
        </div>
        <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${selected.id}`} className="rounded-[20px] border border-[#0b1020]/8 bg-white/90 px-8 py-8 shadow-[inset_0_1px_0_#fff,0_20px_48px_rgba(11,16,32,.08)] motion-safe:transition-opacity motion-safe:duration-200">
          <h3 className="font-display text-2xl font-bold tracking-[-0.015em]">{selected.label}</h3>
          <p className="mt-4 max-w-[48ch] text-[17px] leading-[1.65]">{selected.body}</p>
          <ButtonLink href={selected.href} variant="outline" className="mt-6">
            Continue
          </ButtonLink>
        </div>
      </div>

      <div className="grid md:hidden">
        {homeAudiences.map((item) => {
          const expanded = open === item.id;
          return (
            <div key={item.id} className="border-b border-[#0b1020]/10">
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`${baseId}-disc-${item.id}`}
                onClick={() => setOpen(item.id)}
                className="flex min-h-14 w-full items-center text-left text-lg font-semibold"
              >
                <span aria-hidden className={cn("mr-3 size-1.5 rounded-full", expanded ? "bg-[#f97316]" : "bg-[#0b1020]/25")} />
                {item.label}
              </button>
              {expanded ? (
                <div id={`${baseId}-disc-${item.id}`} className="pb-5">
                  <p className="text-[16px] leading-[1.65]">{item.body}</p>
                  <ButtonLink href={item.href} variant="outline" size="sm" className="mt-4">
                    Continue
                  </ButtonLink>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

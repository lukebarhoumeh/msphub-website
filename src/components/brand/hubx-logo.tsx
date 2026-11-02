import Image from "next/image";
import { MspHubPoweredByBadge } from "@/components/brand/msp-hub-logo";
import { cn } from "@/lib/cn";

/**
 * HubX lockup, reversed version for dark surfaces (brand kit rule). Only used
 * where the Microsoft side is introduced, and always paired with the
 * "Powered by MSP Hub" badge (`HubXWithBadge`) or the sentence
 * "HubX, powered by MSP Hub" (`HubXPoweredBy`).
 */
export function HubXLogo({ className = "h-8 w-auto", priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/svg/hubx-logo-reversed.svg"
      alt="HubX"
      width={1087}
      height={282}
      priority={priority}
      className={className}
    />
  );
}

type HubXWithBadgeProps = {
  /** Height class for the HubX lockup (sets the row's scale). */
  hubxClassName?: string;
  /** Height class for the badge: 0.75–1× the HubX height, never below 24 px (h-6). */
  badgeClassName?: string;
  className?: string;
  priority?: boolean;
};

/**
 * HubX logo beside the "Powered by MSP Hub" badge, vertically centred and
 * separated by a 1 px rule (MSP Hub logo guidelines, "Pairing with HubX").
 */
export function HubXWithBadge({
  hubxClassName = "h-10 w-auto sm:h-14",
  badgeClassName = "h-8 w-auto sm:h-12",
  className,
  priority,
}: HubXWithBadgeProps) {
  return (
    <div className={cn("flex items-center gap-3 sm:gap-5", className)}>
      <HubXLogo className={hubxClassName} priority={priority} />
      <span aria-hidden className="my-1 w-px self-stretch bg-white/25" />
      <MspHubPoweredByBadge className={badgeClassName} priority={priority} />
    </div>
  );
}

/** Inline sentence "HubX, powered by MSP Hub" with the lockup standing in for the word. */
export function HubXPoweredBy({ className, logoClassName = "h-6 w-auto" }: { className?: string; logoClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center text-sm text-white/70", className)}>
      <HubXLogo className={logoClassName} />
      <span>, powered by MSP Hub</span>
    </span>
  );
}

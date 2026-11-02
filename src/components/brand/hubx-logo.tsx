import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * HubX lockup, reversed version for dark surfaces (brand kit rule). Only used
 * where the Microsoft side is introduced, and always paired with
 * "powered by MSP Hub" nearby (see `HubXPoweredBy`).
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

/** Inline "HubX, powered by MSP Hub" line with the lockup. */
export function HubXPoweredBy({ className, logoClassName = "h-6 w-auto" }: { className?: string; logoClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center text-sm text-white/70", className)}>
      <HubXLogo className={logoClassName} />
      <span>, powered by MSP Hub</span>
    </span>
  );
}

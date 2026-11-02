import Image from "next/image";
import { hubxLockup } from "@/content/hubx";
import { cn } from "@/lib/cn";

/**
 * HubX lockup, reversed version for dark surfaces (brand kit rule). Only used
 * where the Microsoft side is introduced, always with the text lockup
 * "HubX, powered by MSP Hub" nearby. No combined logo is ever composed.
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

/** The HubX logo with the text lockup beneath it. */
export function HubXLockup({
  logoClassName = "h-10 w-auto sm:h-14",
  className,
  align = "left",
  priority,
}: {
  logoClassName?: string;
  className?: string;
  align?: "left" | "center";
  priority?: boolean;
}) {
  return (
    <div className={cn("flex flex-col gap-3", align === "center" && "items-center text-center", className)}>
      <HubXLogo className={logoClassName} priority={priority} />
      <p className="text-sm text-white/70">{hubxLockup}</p>
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

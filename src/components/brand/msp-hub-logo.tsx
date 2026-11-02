import Image from "next/image";

/**
 * The MSP Hub logo (concept "Core", Nov 2 2026): an orange core held by two
 * brackets beside the wordmark. This is the only place the lockup asset is
 * referenced, so a future swap is a one-file change.
 *
 * Rules (docs: MSP Hub logo guidelines v1.0): reversed version on dark
 * grounds; horizontal lockup at least 24 px tall, header 28–32 px; clear
 * space of half the mark's height on every side; never add effects, recolour,
 * or retype the wordmark. Below 24 px use the mark alone.
 */
export const MSP_HUB_LOGO = {
  src: "/brand/msphub/svg/msphub-logo-horizontal-reversed.svg",
  width: 583.88,
  height: 100,
  alt: "MSP Hub",
} as const;

/** "Powered by MSP Hub" badge for HubX surfaces: 0.75–1× the HubX logo height, never below 24 px. */
export const MSP_HUB_POWERED_BY_BADGE = {
  src: "/brand/msphub/badge/msphub-powered-by-reversed.svg",
  width: 359.08,
  height: 100,
  alt: "Powered by MSP Hub",
} as const;

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export function MspHubLogo({ className = "h-8 w-auto", priority }: LogoProps) {
  return (
    <Image
      src={MSP_HUB_LOGO.src}
      alt={MSP_HUB_LOGO.alt}
      width={MSP_HUB_LOGO.width}
      height={MSP_HUB_LOGO.height}
      priority={priority}
      className={className}
    />
  );
}

export function MspHubPoweredByBadge({ className = "h-8 w-auto", priority }: LogoProps) {
  return (
    <Image
      src={MSP_HUB_POWERED_BY_BADGE.src}
      alt={MSP_HUB_POWERED_BY_BADGE.alt}
      width={MSP_HUB_POWERED_BY_BADGE.width}
      height={MSP_HUB_POWERED_BY_BADGE.height}
      priority={priority}
      className={className}
    />
  );
}

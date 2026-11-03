import Image from "next/image";

/**
 * The MSP Hub logo: the current wordmark supplied by Luke on Nov 3 2026
 * (white, with the gradient "MSP" letterforms, for dark grounds). This is the
 * only place the lockup asset is referenced, so a future swap is a one-file
 * change.
 *
 * Rules (MSP Hub logo guidelines v1.0): reversed version on dark grounds;
 * horizontal lockup at least 24 px tall, header 28–32 px; clear space of half
 * the mark's height on every side; never add effects, recolour, or retype the
 * wordmark. Below 24 px use the mark alone. The "Powered by MSP Hub" badge in
 * the kit is not used on the site: the HubX pairing is the text lockup only.
 */
export const MSP_HUB_LOGO = {
  src: "/brand/msphub/svg/msphub-logo-white-2026.svg",
  width: 513.3,
  height: 71.4,
  alt: "MSP Hub",
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
      fetchPriority={priority ? "high" : undefined}
      className={className}
    />
  );
}

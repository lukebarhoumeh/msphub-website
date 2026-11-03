import Image from "next/image";

/**
 * The MSP Hub logo: the current wordmark supplied by Luke on Nov 3 2026
 * (white, with the gradient "MSP" letterforms, for dark grounds). The ink
 * variant is the same artwork with the white swapped for ink so the header
 * can read over pearl sections. This is the only place the lockup assets
 * are referenced, so a future swap is a one-file change.
 *
 * Rules (MSP Hub logo guidelines v1.0): reversed version on dark grounds,
 * positive version on light grounds; horizontal lockup at least 24 px tall,
 * header 28–32 px; clear space of half the mark's height on every side; never
 * add effects or retype the wordmark. Below 24 px use the mark alone. The
 * "Powered by MSP Hub" badge in the kit is not used on the site: the HubX
 * pairing is the text lockup only.
 */
export const MSP_HUB_LOGO = {
  src: "/brand/msphub/svg/msphub-logo-white-2026.svg",
  width: 513.3,
  height: 71.4,
  alt: "MSP Hub",
} as const;

export const MSP_HUB_LOGO_INK = {
  ...MSP_HUB_LOGO,
  src: "/brand/msphub/svg/msphub-logo-ink-2026.svg",
} as const;

type LogoProps = {
  className?: string;
  priority?: boolean;
  /** `white` for ink grounds (default), `ink` for pearl grounds. */
  variant?: "white" | "ink";
};

export function MspHubLogo({ className = "h-8 w-auto", priority, variant = "white" }: LogoProps) {
  const logo = variant === "ink" ? MSP_HUB_LOGO_INK : MSP_HUB_LOGO;
  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      priority={priority}
      fetchPriority={priority ? "high" : undefined}
      className={className}
    />
  );
}

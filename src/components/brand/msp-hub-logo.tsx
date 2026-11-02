import Image from "next/image";

/**
 * The MSP Hub wordmark. This is the only place the asset is referenced, so a
 * new logo (master files are in progress) is a one-file swap: replace the
 * file at `MSP_HUB_LOGO.src` and update the intrinsic size below.
 *
 * Current asset: the name logo supplied by Luke on Nov 2 2026 (white on
 * transparent, for dark backgrounds only).
 */
export const MSP_HUB_LOGO = {
  src: "/brand/msphub/msphub-name-logo.png",
  width: 300,
  height: 42,
  alt: "MSP Hub",
} as const;

type MspHubLogoProps = {
  className?: string;
  priority?: boolean;
};

export function MspHubLogo({ className = "h-7 w-auto", priority }: MspHubLogoProps) {
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

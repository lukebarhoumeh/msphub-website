import localFont from "next/font/local";
import { Plus_Jakarta_Sans } from "next/font/google";

/**
 * Ink & Glass typography: Plus Jakarta Sans for display, Inter for body,
 * JetBrains Mono for evidence labels. Tailwind reads the faces through
 * `--font-body` / `--font-heading` / `--font-code`.
 *
 * Files are self-hosted from `public/brand/fonts` (Google Fonts latin subsets,
 * SIL Open Font License; see the LICENSE-* files next to them).
 */
export const bodyFont = localFont({
  src: "../../public/brand/fonts/inter-latin-wght.woff2",
  weight: "400 700",
  display: "swap",
  variable: "--font-body",
});

export const headingFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
  variable: "--font-heading",
  adjustFontFallback: true,
});

export const monoFont = localFont({
  src: "../../public/brand/fonts/jetbrains-mono-latin-wght.woff2",
  weight: "400 600",
  display: "swap",
  variable: "--font-code",
  preload: false,
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

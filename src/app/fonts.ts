import localFont from "next/font/local";

/**
 * Site typography (handoff §7.1): serif headings (Georgia-compatible),
 * Inter-class sans for body, JetBrains Mono for SKUs, ids, and eyebrows.
 * Swap a family here only; Tailwind reads the faces through the
 * `--font-body` / `--font-heading` / `--font-code` variables in `globals.css`.
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

export const headingFont = localFont({
  src: "../../public/brand/fonts/source-serif-4-latin-opsz-wght.woff2",
  weight: "400 700",
  display: "swap",
  variable: "--font-heading",
  adjustFontFallback: "Times New Roman",
});

export const monoFont = localFont({
  src: "../../public/brand/fonts/jetbrains-mono-latin-wght.woff2",
  weight: "400 600",
  display: "swap",
  variable: "--font-code",
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

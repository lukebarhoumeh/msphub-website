import localFont from "next/font/local";

/**
 * Site typography.
 *
 * The HubX brand kit ships logos and colors only, so these families are the
 * proposal from the website plan (section 7) and are not yet approved by
 * MSP Hub. To swap a family, change the file and weight range below; Tailwind
 * reads the faces through the `--font-body` / `--font-heading` variables in
 * `globals.css`, so nothing else needs to change.
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

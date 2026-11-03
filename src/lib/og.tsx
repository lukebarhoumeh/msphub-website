import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { OgCopy } from "@/content/og";
import { hubxLockup } from "@/content/hubx";
import { site } from "@/content/site";

/**
 * Open Graph image renderer shared by every route's `opengraph-image.tsx`.
 * Dark ground, the MSP Hub logo (reversed version, per the logo guidelines),
 * mono eyebrow, serif title, one orange accent. Images are generated at
 * build time (no request-time data), so they cost nothing per request.
 *
 * Fonts are static instances of the site's self-hosted families (TTF, which
 * the renderer needs; the site itself uses the variable woff2 files).
 */

export const ogSize = { width: 1200, height: 630 } as const;
export const ogContentType = "image/png";

const assets = join(process.cwd(), "public", "brand");
const [serif, sans, mono, logo] = await Promise.all([
  readFile(join(assets, "fonts", "source-serif-4-latin-600.ttf")),
  readFile(join(assets, "fonts", "inter-latin-500.ttf")),
  readFile(join(assets, "fonts", "jetbrains-mono-latin-500.ttf")),
  readFile(join(assets, "msphub", "svg", "msphub-logo-white-2026.svg")),
]);
const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

export function renderOgImage({ eyebrow, title, product }: Pick<OgCopy, "eyebrow" | "title" | "product">) {
  const titleSize = title.length > 56 ? 58 : 68;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0A0D14",
          backgroundImage:
            "radial-gradient(circle at 18% 0%, rgba(249,115,22,0.28), rgba(249,115,22,0) 48%), radial-gradient(circle at 100% 100%, rgba(19,33,66,1), rgba(19,33,66,0) 55%)",
          color: "#FFFFFF",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" height={56} width={Math.round(56 * 7.189)} />
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "JetBrains Mono", fontSize: 22, color: "rgba(255,255,255,0.7)" }}>
            <div style={{ width: 10, height: 10, background: "#F97316", transform: "rotate(45deg)", borderRadius: 2 }} />
            msphub.com
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "JetBrains Mono", fontSize: 24, letterSpacing: 3, textTransform: "uppercase", color: "#F97316" }}>
            <div style={{ width: 28, height: 3, background: "#F97316", borderRadius: 2 }} />
            {eyebrow}
          </div>
          <div style={{ fontFamily: "Source Serif 4", fontSize: titleSize, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 1000, textWrap: "balance" }}>
            {title}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 40, fontSize: 24, color: "rgba(255,255,255,0.72)" }}>
          <div style={{ display: "flex", maxWidth: 640 }}>{product ? hubxLockup : site.tagline}</div>
          <div style={{ display: "flex", fontFamily: "JetBrains Mono", fontSize: 20, color: "rgba(255,255,255,0.55)" }}>Microsoft CSP direct-bill partner</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Source Serif 4", data: serif, weight: 600, style: "normal" },
        { name: "Inter", data: sans, weight: 500, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}

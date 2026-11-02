import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { MSP_HUB_LOGO } from "@/components/brand/msp-hub-logo";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Site-wide Open Graph image: MSP Hub wordmark (the single logo asset) over the ink/navy canvas. */
export default async function OpenGraphImage() {
  const root = process.cwd();
  const [logo, serif] = await Promise.all([
    readFile(path.join(root, "public", MSP_HUB_LOGO.src)),
    readFile(path.join(root, "src/assets/fonts/SourceSerif4-Semibold.ttf")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const logoHeight = 64;
  const logoWidth = Math.round((MSP_HUB_LOGO.width / MSP_HUB_LOGO.height) * logoHeight);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(ellipse at 20% 0%, #132142 0%, #0A0D14 60%)",
          color: "#FFFFFF",
          fontFamily: "Source Serif 4",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -160,
            bottom: -220,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(249,115,22,0.38) 0%, rgba(249,115,22,0) 65%)",
          }}
        />
        <img src={logoSrc} alt="" width={logoWidth} height={logoHeight} />
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 64, lineHeight: 1.05, letterSpacing: "-0.02em", maxWidth: 980 }}>
            Your single technology partner for everything Microsoft.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "rgba(255,255,255,0.7)" }}>
            <div style={{ width: 28, height: 3, background: "#F97316", borderRadius: 2 }} />
            Licensing · Professional services · Managed services · Development
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Source Serif 4", data: serif, style: "normal", weight: 600 }],
    },
  );
}

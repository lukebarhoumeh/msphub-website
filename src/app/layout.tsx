import type { Metadata, Viewport } from "next";
import { bodyFont, headingFont } from "./fonts";
import { allowIndexing } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MSP Hub — Your single technology partner for everything Microsoft",
    template: "%s | MSP Hub",
  },
  applicationName: "MSP Hub",
  description:
    "MSP Hub delivers Microsoft licensing through HubX, powered by MSP Hub, plus professional, managed, and development services. New website coming soon.",
  openGraph: { siteName: "MSP Hub", type: "website" },
  robots: allowIndexing ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0a0d14",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}

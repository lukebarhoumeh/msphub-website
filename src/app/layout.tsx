import type { Metadata, Viewport } from "next";
import { bodyFont, headingFont } from "./fonts";
import { allowIndexing } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: "HubX — powered by MSP Hub",
  description:
    "MSP Hub: the HubX Microsoft portal plus professional, managed, and development services. New website coming soon.",
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

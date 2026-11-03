import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { bodyFont, headingFont, monoFont } from "./fonts";
import { Analytics } from "@/components/analytics/analytics";
import { RouteDConversion } from "@/components/ink/route-d";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { IntegrationStatusStrip } from "@/components/layout/integration-status";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/content/site";
import { organizationSchema, webSiteSchema } from "@/lib/schema";
import { allowIndexing, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Your single technology partner for everything Microsoft`,
    template: `%s | ${site.name}`,
  },
  applicationName: site.name,
  description: site.description,
  openGraph: { siteName: site.name, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
  manifest: "/site.webmanifest",
  robots: allowIndexing ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0b1020",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable} ${monoFont.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-brand-orange focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <RouteDConversion />
        <IntegrationStatusStrip />
        <Footer />
        <JsonLd data={[organizationSchema(), webSiteSchema()]} />
        {/* Own boundary: the loader reads the pathname, which partially prerendered routes resolve at request time. */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}

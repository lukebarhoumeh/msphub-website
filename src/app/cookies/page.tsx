import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Cookie Policy",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      currentUrl="https://msphub.com/cookie-policy/"
      summary="Which cookies msphub.com sets, why, and how to control them."
    />
  );
}

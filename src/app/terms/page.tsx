import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      currentUrl="https://msphub.com/terms-and-conditions/"
      summary="The terms that govern use of msphub.com and MSP Hub services."
    />
  );
}

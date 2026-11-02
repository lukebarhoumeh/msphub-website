import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      currentUrl="https://msphub.com/privacy-policy/"
      summary="How MSP Hub Technologies, LLC collects, uses, and protects personal information across msphub.com, HubX, and our services."
    />
  );
}

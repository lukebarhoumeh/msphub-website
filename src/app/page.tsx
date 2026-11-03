import type { Metadata } from "next";
import {
  AudienceRow,
  CatalogTicker,
  EnginesBento,
  InkHomeHero,
  InsightsRow,
  OutcomesPinned,
  ProofChapter,
  ProofStrip,
  SwitchOffer,
  WhyDirect,
} from "@/components/ink/home-sections";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} — Your single technology partner for everything Microsoft`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <InkHomeHero />
      <ProofStrip />
      <CatalogTicker />
      <WhyDirect />
      <OutcomesPinned />
      <EnginesBento />
      <SwitchOffer />
      <AudienceRow />
      <ProofChapter />
      <InsightsRow />
    </>
  );
}

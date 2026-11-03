import type { Metadata } from "next";
import {
  AudienceChapter,
  DevelopmentChapter,
  EngineChapter,
  HubxEvidenceChapter,
  InkHomeHero,
  InsightNote,
  ManagedChapter,
  OutcomeSequence,
  ProfessionalChapter,
  ProofRail,
  TrustBand,
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
      <ProofRail />
      <OutcomeSequence />
      <EngineChapter />
      <AudienceChapter />
      <HubxEvidenceChapter />
      <ProfessionalChapter />
      <ManagedChapter />
      <DevelopmentChapter />
      <TrustBand />
      <InsightNote />
    </>
  );
}

import Link from "next/link";
import { IllustrativeAsset } from "@/components/ink/illustrative-asset";
import { AudienceRouter } from "@/components/ink/audience-router";
import { EngineMatrix } from "@/components/ink/engine-matrix";
import { EvidenceStage } from "@/components/ink/evidence";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { homeEvidence } from "@/content/evidence";
import {
  homeDevelopment,
  homeHero,
  homeHubx,
  homeManaged,
  homeOutcomes,
  homeProfessional,
  homeProof,
  homeTrust,
} from "@/content/home";
import { getPost, formatPostDate, isoPostDate } from "@/content/insights";

export function InkHomeHero() {
  return (
    <section className="bg-[#0b1020] text-white">
      <Container className="grid items-center gap-10 py-12 lg:min-h-[min(720px,calc(100svh-72px))] lg:grid-cols-12 lg:gap-6 lg:py-16">
        <div className="lg:col-span-5">
          <p className="font-mono text-[11px] tracking-[0.12em] text-[#b8c0d4] uppercase">{homeHero.eyebrow}</p>
          <h1 className="mt-5 font-display text-[44px] leading-[1.02] font-extrabold tracking-[-0.03em] sm:text-[48px] lg:text-[72px] lg:leading-[0.98]">
            {homeHero.title.map((line, index) => (
              <span key={line} className="block">
                {index === homeHero.title.length - 1 ? <span className="ink-gradient-text">{line}</span> : line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-[38ch] text-[17px] leading-[1.6] text-[#b8c0d4] lg:max-w-[46ch] lg:text-[19px]">{homeHero.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={homeHero.primary.href} className="sheen-once">
              {homeHero.primary.label}
            </ButtonLink>
            <ButtonLink href={homeHero.secondary.href} variant="glass">
              {homeHero.secondary.label}
            </ButtonLink>
          </div>
          <p className="mt-6 text-[15px] text-[#b8c0d4]">{homeHero.platforms}</p>
        </div>
        <div className="hero-art lg:col-span-7">
          <IllustrativeAsset name="four-engine-refraction" priority sizes="(min-width: 1024px) 58vw, 100vw" />
        </div>
      </Container>
    </section>
  );
}

export function ProofRail() {
  return (
    <section aria-label="Company proof" className="bg-[#0b1020] pb-14 text-white">
      <Container>
        <ul className="grid overflow-hidden rounded-[18px] border border-white/13 bg-[linear-gradient(180deg,rgba(255,255,255,.09),rgba(255,255,255,.04))] shadow-[inset_0_1px_0_rgba(255,255,255,.16)] sm:grid-cols-2 lg:grid-cols-4">
          {homeProof.map((item) => (
            <li key={item.id} className="border-b border-white/10 px-5 py-5 sm:border-r lg:border-b-0 lg:py-6 lg:last:border-r-0">
              <p className="font-display text-[28px] font-bold tracking-[-0.02em] tabular-nums">{item.value}</p>
              <p className="mt-1 max-w-[24ch] text-sm leading-snug text-[#b8c0d4]">{item.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function OutcomeSequence() {
  return (
    <section className="bg-[#f4f6fb] py-[clamp(64px,7vw,104px)] text-[#0b1020]">
      <Container>
        <h2 className="max-w-[16ch] font-display text-[34px] leading-[1.08] font-bold tracking-[-0.025em] lg:text-[52px]">
          Three outcomes. One partner.
        </h2>
        <ol className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {homeOutcomes.map((item) => (
            <li key={item.n} className="border-t border-[#0b1020]/15 pt-5">
              <p className="font-mono text-[11px] tracking-[0.12em] text-[#4b5569] uppercase">{item.n}</p>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.015em]">
                <Link href={item.href} className="underline decoration-[#f97316] decoration-2 underline-offset-[5px]">
                  {item.title}
                </Link>
              </h3>
              <p className="mt-3 max-w-[40ch] text-[16px] leading-[1.65] text-[#4b5569] lg:text-[17px]">{item.body}</p>
            </li>
          ))}
        </ol>
        <div aria-hidden className="outcome-line mt-12 h-px origin-left bg-[#f97316]" />
      </Container>
    </section>
  );
}

export function EngineChapter() {
  return (
    <section id="engines" className="scroll-mt-24 bg-[#f4f6fb] pb-[clamp(64px,7vw,104px)] text-[#0b1020]">
      <Container>
        <h2 className="max-w-[18ch] font-display text-[34px] leading-[1.08] font-bold tracking-[-0.025em] lg:text-[52px]">
          Four engines. One accountable partner.
        </h2>
        <div className="mt-10">
          <EngineMatrix />
        </div>
      </Container>
    </section>
  );
}

export function AudienceChapter() {
  return (
    <section id="who-we-work-with" className="scroll-mt-24 bg-[#f4f6fb] pb-[clamp(64px,7vw,96px)] text-[#0b1020]">
      <Container>
        <h2 className="font-display text-[34px] leading-[1.08] font-bold tracking-[-0.025em] lg:text-[52px]">Who we work with</h2>
        <div className="mt-10">
          <AudienceRouter />
        </div>
      </Container>
    </section>
  );
}

export function HubxEvidenceChapter() {
  return (
    <section className="bg-[#0b1020] py-[clamp(72px,8vw,120px)] text-white">
      <Container>
        <h2 className="max-w-[16ch] font-display text-[34px] leading-[1.05] font-bold tracking-[-0.025em] lg:text-[52px]">{homeHubx.title}</h2>
        <p className="mt-5 max-w-[54ch] text-[17px] leading-[1.6] text-[#b8c0d4] lg:text-[19px]">{homeHubx.lead}</p>
        <div className="mt-12">
          <EvidenceStage ids={homeEvidence} />
        </div>
      </Container>
    </section>
  );
}

export function ProfessionalChapter() {
  return (
    <section className="bg-[#f4f6fb] py-[clamp(72px,8vw,120px)] text-[#0b1020]">
      <Container className="grid items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="font-display text-[34px] leading-[1.08] font-bold tracking-[-0.025em] lg:text-[52px]">{homeProfessional.title}</h2>
          <ol className="mt-8 grid gap-4">
            {homeProfessional.process.map((step, index) => (
              <li key={step} className="flex items-baseline gap-4 border-t border-[#0b1020]/12 pt-3">
                <span className="font-mono text-[11px] tracking-[0.12em] text-[#4b5569]">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-display text-2xl font-bold tracking-[-0.015em]">{step}</span>
              </li>
            ))}
          </ol>
          <ButtonLink href={homeProfessional.href} variant="outline" className="mt-8">
            Professional Services
          </ButtonLink>
        </div>
        <div className="lg:col-span-7">
          <IllustrativeAsset name="lifecycle-glass-corridor" sizes="(min-width: 1024px) 46vw, 100vw" />
          <ul className="mt-8 grid gap-2 sm:grid-cols-2">
            {homeProfessional.scope.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-snug">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-[#f97316]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export function ManagedChapter() {
  return (
    <section className="bg-[#0b1020] py-[clamp(72px,8vw,120px)] text-white">
      <Container>
        <h2 className="max-w-[14ch] font-display text-[34px] leading-[1.08] font-bold tracking-[-0.025em] lg:text-[52px]">{homeManaged.title}</h2>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {homeManaged.process.map((step, index) => (
            <li key={step} className="border-t border-white/15 pt-4">
              <p className="font-mono text-[11px] tracking-[0.12em] text-[#8e98ae]">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-2 font-display text-2xl font-bold">{step}</p>
            </li>
          ))}
        </ol>
        <ul className="mt-12 grid max-w-[70ch] gap-4">
          {homeManaged.points.map((point) => (
            <li key={point} className="text-[17px] leading-[1.6] text-[#b8c0d4]">
              {point}
            </li>
          ))}
        </ul>
        <ButtonLink href={homeManaged.href} variant="glass" className="mt-8">
          Managed Services
        </ButtonLink>
      </Container>
    </section>
  );
}

export function DevelopmentChapter() {
  return (
    <section className="bg-[#f4f6fb] py-[clamp(72px,8vw,120px)] text-[#0b1020]">
      <Container className="grid items-center gap-12 lg:grid-cols-12">
        <div className="order-2 lg:order-1 lg:col-span-6">
          <IllustrativeAsset name="ai-inference-lattice" sizes="(min-width: 1024px) 42vw, 100vw" />
        </div>
        <div className="order-1 lg:order-2 lg:col-span-6">
          <h2 className="font-display text-[34px] leading-[1.08] font-bold tracking-[-0.025em] lg:text-[52px]">{homeDevelopment.title}</h2>
          <ol className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {homeDevelopment.process.map((step, index) => (
              <li key={step} className="font-display text-xl font-bold">
                <span className="mr-2 font-mono text-[11px] font-medium tracking-[0.12em] text-[#4b5569]">{String(index + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
          <ul className="mt-8 grid gap-2">
            {homeDevelopment.scope.map((item) => (
              <li key={item} className="flex gap-3 text-[16px] leading-snug">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-[#f97316]" />
                {item}
              </li>
            ))}
          </ul>
          <ButtonLink href={homeDevelopment.href} variant="outline" className="mt-8">
            Development & AI
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

export function TrustBand() {
  return (
    <section className="bg-[#0b1020] py-12 text-white lg:py-16">
      <Container>
        <h2 className="font-display text-[30px] leading-[1.1] font-bold tracking-[-0.02em] lg:text-[40px]">Evidence you can check.</h2>
        <ul className="mt-8 grid gap-4 lg:grid-cols-5">
          {homeTrust.map((item) => (
            <li key={item} className="border-t border-white/15 pt-4 text-[15px] leading-snug text-[#b8c0d4]">
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function InsightNote() {
  const post = getPost("introducing-msp-hub");
  if (!post) return null;
  return (
    <section className="bg-[#f4f6fb] py-16 text-[#0b1020] lg:py-20">
      <Container className="grid gap-6 lg:grid-cols-[180px_minmax(0,1fr)] lg:items-baseline">
        <p className="font-mono text-[11px] tracking-[0.12em] text-[#4b5569] uppercase">One insight</p>
        <article>
          <p className="font-mono text-[12px] tracking-[0.08em] text-[#4b5569] uppercase">
            <time dateTime={isoPostDate(post.date)}>{formatPostDate(post.date)}</time>
          </p>
          <h2 className="mt-3 max-w-[22ch] font-display text-[30px] leading-[1.1] font-bold tracking-[-0.02em] lg:text-[40px]">
            <Link href={`/insights/${post.slug}`} className="underline decoration-[#f97316] decoration-2 underline-offset-[6px]">
              {post.title}
            </Link>
          </h2>
          <p className="mt-4 max-w-[62ch] text-[17px] leading-[1.65] text-[#4b5569]">{post.summary}</p>
          <Link href="/insights" className="mt-5 inline-flex h-11 items-center text-[15px] font-semibold underline decoration-[#f97316] decoration-2 underline-offset-[5px]">
            All insights
          </Link>
        </article>
      </Container>
    </section>
  );
}

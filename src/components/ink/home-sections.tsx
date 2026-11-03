import Link from "next/link";
import { BorderBeam, DotField, GhostNumeral, Marquee } from "@/components/ink/atmosphere";
import { IllustrativeAsset } from "@/components/ink/illustrative-asset";
import { AudienceRouter } from "@/components/ink/audience-router";
import { EngineMatrix } from "@/components/ink/engine-matrix";
import { EvidenceBezel, EvidenceStage } from "@/components/ink/evidence";
import { Parallax } from "@/components/ink/flow";
import { StatRail } from "@/components/ink/interior";
import { Spotlight } from "@/components/ink/motion";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { captures, homeEvidence, truthLabel } from "@/content/evidence";
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
import { licensingCatalog } from "@/content/hubx";
import { getPost, formatPostDate, isoPostDate } from "@/content/insights";

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;

export function InkHomeHero() {
  const crop = captures.customerProductsHome;
  return (
    <section className="relative overflow-x-clip text-white">
      <Container className="relative grid items-center gap-12 pt-14 pb-28 lg:min-h-[min(760px,calc(100svh-72px))] lg:grid-cols-12 lg:gap-8 lg:pt-20 lg:pb-36">
        <div className="lg:col-span-5">
          <p className="hero-line font-mono text-[11px] tracking-[0.12em] text-[#b8c0d4] uppercase" style={{ "--i": 0 } as React.CSSProperties}>
            {homeHero.eyebrow}
          </p>
          <h1 className="mt-5 font-display text-[44px] leading-[1.02] font-extrabold tracking-[-0.03em] sm:text-[48px] lg:text-[72px] lg:leading-[0.98]">
            {homeHero.title.map((line, index) => (
              <span key={line} className="hero-line" style={{ "--i": index + 1 } as React.CSSProperties}>
                {index === homeHero.title.length - 1 ? <span className="ink-gradient-text">{line}</span> : line}
              </span>
            ))}
          </h1>
          <p className="hero-line mt-6 max-w-[38ch] text-[17px] leading-[1.6] text-[#b8c0d4] lg:max-w-[46ch] lg:text-[19px]" style={{ "--i": 6 } as React.CSSProperties}>
            {homeHero.lead}
          </p>
          <div className="hero-line mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={{ "--i": 7 } as React.CSSProperties}>
            <ButtonLink href={homeHero.primary.href} className="sheen-once">
              {homeHero.primary.label}
            </ButtonLink>
            <ButtonLink href={homeHero.secondary.href} variant="glass">
              {homeHero.secondary.label}
            </ButtonLink>
          </div>
          <p className="hero-line mt-6 text-[15px] text-[#b8c0d4]" style={{ "--i": 8 } as React.CSSProperties}>
            {homeHero.platforms}
          </p>
        </div>
        <div className="hero-art relative lg:col-span-7">
          <Parallax range={24}>
            <Spotlight className="tilt tilt-hero relative overflow-hidden rounded-[22px] border border-white/14 bg-[#12192b]/80 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,.16),0_40px_90px_rgba(0,0,0,.45)]">
              <IllustrativeAsset name="four-engine-refraction" priority sizes="(min-width: 1024px) 58vw, 100vw" className="[&_figcaption]:px-3 [&_figcaption]:pb-2" />
              <BorderBeam duration={11} />
            </Spotlight>
          </Parallax>
          <div className="pointer-events-none absolute -bottom-6 left-0 hidden w-[300px] lg:block xl:-left-6 xl:w-[340px]" style={delay(600)} data-reveal="scale">
            <div className="pointer-events-auto rotate-[-3deg]">
              <EvidenceBezel capture={crop} />
              <p className="mt-2 font-mono text-[11px] tracking-[0.12em] text-[#b8c0d4] uppercase">{truthLabel}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** A quiet ticker of the Microsoft families sold through HubX, straight from the licensing content. */
export function CatalogTicker() {
  return (
    <section aria-label="Microsoft licensing families" className="relative border-y border-white/10 text-white">
      <div className="relative mx-auto w-[min(1280px,calc(100%-2*var(--page-pad)))] py-4">
        <div className="grid items-center gap-4 lg:grid-cols-[auto_minmax(0,1fr)]">
          <p className="shrink-0 font-mono text-[11px] tracking-[0.12em] text-[#8e98ae] uppercase">Sold direct · managed in HubX</p>
          <div className="relative min-w-0 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <Marquee duration={70}>
              {licensingCatalog.map((family) => (
                <span key={family} className="inline-flex h-9 shrink-0 items-center rounded-full border border-white/13 bg-white/5 px-3.5 font-mono text-[12.5px] whitespace-nowrap text-white/85">
                  {family}
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProofRail() {
  return (
    <section aria-label="Company proof" className="relative z-20 -mt-20 pb-14 text-white lg:-mt-24">
      <Container>
        <div data-reveal="scale" style={delay(80)} className="shadow-[0_32px_80px_-32px_rgba(0,0,0,.6)]">
          <StatRail tone="ink" items={homeProof} beam />
        </div>
      </Container>
    </section>
  );
}

export function OutcomeSequence() {
  return (
    <section className="relative bg-[#f4f6fb] py-[clamp(64px,7vw,104px)] text-[#0b1020]" data-surface="pearl">
      <DotField tone="pearl" className="opacity-50 [mask-image:radial-gradient(ellipse_60%_50%_at_85%_20%,#000_10%,transparent_80%)]" />
      <Container className="relative">
        <h2 data-reveal className="max-w-[16ch] font-display text-[34px] leading-[1.08] font-bold tracking-[-0.025em] lg:text-[52px]">
          Three outcomes. One partner.
        </h2>
        <ol className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {homeOutcomes.map((item, index) => (
            <li key={item.n} data-reveal style={delay(index * 90)} className="rule-item relative border-t border-[#0b1020]/15 pt-5">
              <GhostNumeral>{item.n}</GhostNumeral>
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
        <div aria-hidden className="outcome-line mt-12 h-px origin-left bg-[linear-gradient(90deg,#f97316,rgba(249,115,22,0))]" />
      </Container>
    </section>
  );
}

export function EngineChapter() {
  return (
    <section id="engines" className="scroll-mt-24 bg-[#f4f6fb] pb-[clamp(64px,7vw,104px)] text-[#0b1020]" data-surface="pearl">
      <Container>
        <h2 data-reveal className="max-w-[18ch] font-display text-[34px] leading-[1.08] font-bold tracking-[-0.025em] lg:text-[52px]">
          Four engines. One accountable partner.
        </h2>
        <div data-reveal style={delay(120)} className="mt-10">
          <EngineMatrix />
        </div>
      </Container>
    </section>
  );
}

export function AudienceChapter() {
  return (
    <section id="who-we-work-with" className="scroll-mt-24 bg-[#f4f6fb] pb-[clamp(64px,7vw,96px)] text-[#0b1020]" data-surface="pearl">
      <Container>
        <h2 data-reveal className="font-display text-[34px] leading-[1.08] font-bold tracking-[-0.025em] lg:text-[52px]">
          Who we work with
        </h2>
        <div data-reveal style={delay(120)} className="mt-10">
          <AudienceRouter />
        </div>
      </Container>
    </section>
  );
}

export function HubxEvidenceChapter() {
  return (
    <section className="relative overflow-x-clip py-[clamp(72px,8vw,120px)] text-white">
      <Container className="relative">
        <h2 data-reveal className="max-w-[16ch] font-display text-[34px] leading-[1.05] font-bold tracking-[-0.025em] lg:text-[52px]">
          {homeHubx.title}
        </h2>
        <p data-reveal style={delay(80)} className="mt-5 max-w-[54ch] text-[17px] leading-[1.6] text-[#b8c0d4] lg:text-[19px]">
          {homeHubx.lead}
        </p>
        <div data-reveal="scale" style={delay(160)} className="mt-12">
          <EvidenceStage ids={homeEvidence} />
        </div>
      </Container>
    </section>
  );
}

export function ProfessionalChapter() {
  return (
    <section className="relative bg-[#f4f6fb] py-[clamp(72px,8vw,120px)] text-[#0b1020]" data-surface="pearl">
      <Container className="grid items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 data-reveal className="font-display text-[34px] leading-[1.08] font-bold tracking-[-0.025em] lg:text-[52px]">
            {homeProfessional.title}
          </h2>
          <ol className="mt-8 grid gap-4">
            {homeProfessional.process.map((step, index) => (
              <li key={step} data-reveal="left" style={delay(100 + index * 70)} className="rule-item flex items-baseline gap-4 border-t border-[#0b1020]/12 pt-3">
                <span className="font-mono text-[11px] tracking-[0.12em] text-[#4b5569]">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-display text-2xl font-bold tracking-[-0.015em]">{step}</span>
              </li>
            ))}
          </ol>
          <div data-reveal style={delay(420)}>
            <ButtonLink href={homeProfessional.href} variant="outline" className="mt-8">
              Professional Services
            </ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-7">
          <Parallax range={40}>
            <div data-reveal="scale" style={delay(120)} className="overflow-hidden rounded-[18px] border border-[#0b1020]/8 bg-white p-2 shadow-[0_24px_64px_rgba(11,16,32,.12)]">
              <IllustrativeAsset name="lifecycle-glass-corridor" sizes="(min-width: 1024px) 46vw, 100vw" className="[&_figcaption]:px-2 [&_figcaption]:pb-1" />
            </div>
          </Parallax>
          <ul className="mt-8 grid gap-2 sm:grid-cols-2">
            {homeProfessional.scope.map((item, index) => (
              <li key={item} data-reveal style={delay(200 + index * 40)} className="flex gap-3 text-[15px] leading-snug">
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
    <section className="relative overflow-x-clip py-[clamp(72px,8vw,120px)] text-white">
      <Container className="relative">
        <h2 data-reveal className="max-w-[14ch] font-display text-[34px] leading-[1.08] font-bold tracking-[-0.025em] lg:text-[52px]">
          {homeManaged.title}
        </h2>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {homeManaged.process.map((step, index) => (
            <li key={step} data-reveal style={delay(100 + index * 80)} className="rule-item relative border-t border-white/15 pt-4">
              <GhostNumeral className="text-[88px]">{String(index + 1).padStart(2, "0")}</GhostNumeral>
              <p className="font-mono text-[11px] tracking-[0.12em] text-[#8e98ae]">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-2 font-display text-2xl font-bold">{step}</p>
            </li>
          ))}
        </ol>
        <ul className="mt-12 grid max-w-[70ch] gap-4">
          {homeManaged.points.map((point, index) => (
            <li key={point} data-reveal style={delay(200 + index * 60)} className="text-[17px] leading-[1.6] text-[#b8c0d4]">
              {point}
            </li>
          ))}
        </ul>
        <div data-reveal style={delay(480)}>
          <ButtonLink href={homeManaged.href} variant="glass" className="mt-8">
            Managed Services
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

export function DevelopmentChapter() {
  return (
    <section className="relative bg-[#f4f6fb] py-[clamp(72px,8vw,120px)] text-[#0b1020]" data-surface="pearl">
      <Container className="grid items-center gap-12 lg:grid-cols-12">
        <div className="order-2 lg:order-1 lg:col-span-6">
          <Parallax range={40}>
            <div data-reveal="scale" style={delay(120)} className="overflow-hidden rounded-[18px] border border-[#0b1020]/8 bg-white p-2 shadow-[0_24px_64px_rgba(11,16,32,.12)]">
              <IllustrativeAsset name="ai-inference-lattice" sizes="(min-width: 1024px) 42vw, 100vw" className="[&_figcaption]:px-2 [&_figcaption]:pb-1" />
            </div>
          </Parallax>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-6">
          <h2 data-reveal className="font-display text-[34px] leading-[1.08] font-bold tracking-[-0.025em] lg:text-[52px]">
            {homeDevelopment.title}
          </h2>
          <ol className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {homeDevelopment.process.map((step, index) => (
              <li key={step} data-reveal style={delay(100 + index * 60)} className="font-display text-xl font-bold">
                <span className="mr-2 font-mono text-[11px] font-medium tracking-[0.12em] text-[#4b5569]">{String(index + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
          <ul className="mt-8 grid gap-2">
            {homeDevelopment.scope.map((item, index) => (
              <li key={item} data-reveal style={delay(240 + index * 40)} className="flex gap-3 text-[16px] leading-snug">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-[#f97316]" />
                {item}
              </li>
            ))}
          </ul>
          <div data-reveal style={delay(460)}>
            <ButtonLink href={homeDevelopment.href} variant="outline" className="mt-8">
              Development & AI
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function TrustBand() {
  return (
    <section className="relative overflow-x-clip py-12 text-white lg:py-16">
      <Container className="relative">
        <h2 data-reveal className="font-display text-[30px] leading-[1.1] font-bold tracking-[-0.02em] lg:text-[40px]">
          Evidence you can check.
        </h2>
        <ul className="mt-8 grid gap-4 lg:grid-cols-5">
          {homeTrust.map((item, index) => (
            <li key={item} data-reveal style={delay(index * 70)} className="rule-item border-t border-white/15 pt-4 text-[15px] leading-snug text-[#b8c0d4]">
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
    <section className="bg-[#f4f6fb] py-16 text-[#0b1020] lg:py-20" data-surface="pearl">
      <Container className="grid gap-6 lg:grid-cols-[180px_minmax(0,1fr)] lg:items-baseline">
        <p data-reveal className="font-mono text-[11px] tracking-[0.12em] text-[#4b5569] uppercase">
          One insight
        </p>
        <article data-reveal style={delay(80)}>
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

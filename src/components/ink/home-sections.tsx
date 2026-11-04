import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { HubXMark } from "@/components/hubx/primitives";
import { BorderBeam, Marquee } from "@/components/ink/atmosphere";
import { AudienceBand } from "@/components/ink/audience-band";
import { SpineMark } from "@/components/ink/canvas";
import { CaseCard, EngineTile, InsightCard } from "@/components/ink/cards";
import { DeviceFrame } from "@/components/ink/device-frame";
import { CaptureImage } from "@/components/ink/evidence";
import { Parallax } from "@/components/ink/flow";
import { IllustrativeAsset } from "@/components/ink/illustrative-asset";
import { ChipRow, InkLink, StatRail, inkTone, monoLabel } from "@/components/ink/interior";
import { Spotlight } from "@/components/ink/motion";
import { Pinned } from "@/components/ink/pinned";
import { CredentialBadges } from "@/components/marketing/blocks";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { cases } from "@/content/cases";
import { directBillBar, learn, pathDiagram } from "@/content/direct-bill";
import { captures, truthLabel } from "@/content/evidence";
import { homeChecks, homeEngines, homeHero, homeOutcomes, homeProof, homeSwitch } from "@/content/home";
import { licensingCatalog } from "@/content/hubx";
import { posts } from "@/content/insights";
import { switchSteps } from "@/content/licensing";
import { cn } from "@/lib/cn";

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;
const h2 = "font-display text-[clamp(32px,3.6vw,52px)] leading-[1.05] font-bold tracking-[-0.025em] text-balance";
const statement = "font-display text-[clamp(40px,5vw,72px)] leading-[1] font-extrabold tracking-[-0.03em] text-balance";

/* ------------------------------------------------------------------ */
/* 1. Hero: split 5/7, the real HubX screen as the object               */
/* ------------------------------------------------------------------ */

export function InkHomeHero() {
  const capture = captures.customerProductsHome;
  return (
    <section className="relative overflow-x-clip text-white">
      <Container className="relative grid items-center gap-12 pt-14 pb-28 lg:min-h-[min(760px,calc(100svh-72px))] lg:grid-cols-12 lg:gap-8 lg:pt-20 lg:pb-36">
        <div className="lg:col-span-5">
          <p className="hero-line font-mono text-[11px] tracking-[0.12em] text-[#b8c0d4] uppercase" style={{ "--i": 0 } as React.CSSProperties}>
            {homeHero.eyebrow}
          </p>
          <h1 className="mt-5 font-display text-[44px] leading-[1.02] font-extrabold tracking-[-0.03em] sm:text-[48px] lg:text-[clamp(56px,5.4vw,80px)] lg:leading-[0.98]">
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
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
          <p className="hero-line mt-6 text-[15px] text-[#b8c0d4]" style={{ "--i": 8 } as React.CSSProperties}>
            {homeHero.platforms}
          </p>
        </div>

        <div className="hero-art relative lg:col-span-7">
          {/* The four-engine render becomes atmosphere: masked, parallaxed, behind the product. */}
          <div aria-hidden className="pointer-events-none absolute -inset-x-16 -top-24 -bottom-16 opacity-60 [mask-image:radial-gradient(ellipse_70%_65%_at_55%_45%,#000_20%,transparent_72%)]">
            <Parallax range={48}>
              <IllustrativeAsset name="four-engine-refraction" decorative sizes="(min-width: 1024px) 70vw, 100vw" />
            </Parallax>
          </div>
          <Parallax range={24} className="relative">
            <Spotlight className="tilt tilt-hero relative">
              <DeviceFrame capture={capture} variant="browser" path="/customers/products" priority className="[&_img]:w-full" />
              <BorderBeam duration={11} className="rounded-[18px]" />
            </Spotlight>
          </Parallax>
          <p className="mt-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-[#b8c0d4] uppercase">
            <HubXMark className="size-3.5" />
            {truthLabel}
          </p>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Proof strip: one glass band over the hero's bottom edge           */
/* ------------------------------------------------------------------ */

export function ProofStrip() {
  return (
    <section aria-label="Company proof" className="relative z-20 -mt-20 pb-10 text-white lg:-mt-24">
      <Container>
        <div data-reveal="scale" style={delay(80)} className="shadow-[0_32px_80px_-32px_rgba(0,0,0,.6)]">
          <StatRail tone="ink" items={homeProof} beam />
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className={cn(monoLabel, inkTone.ink.faint)}>Credentials</p>
          <CredentialBadges variant="chips" />
          <span className="inline-flex min-h-9 items-center rounded-full border border-white/13 bg-white/5 px-3.5 text-[13.5px] font-medium text-white">HIPAA BAA and DPA available</span>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Who we serve: five doors in one band, right under the proof rail  */
/* ------------------------------------------------------------------ */

export function AudienceBandSection() {
  return (
    <section id="who-we-serve" aria-label="Who we serve" className="relative scroll-mt-24 overflow-x-clip pb-10 text-white">
      <Container>
        <div data-reveal style={delay(80)}>
          <AudienceBand variant="band" tone="ink" />
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

/* ------------------------------------------------------------------ */
/* 4. Why direct: the annual bar, and where the money and ticket go     */
/* ------------------------------------------------------------------ */

function PathRow({ label, nodes, highlight }: { label: string; nodes: readonly string[]; highlight?: boolean }) {
  return (
    <div className={cn("rounded-[16px] border p-4 sm:p-5", highlight ? "border-[#f97316]/40 bg-[#f97316]/8" : "border-white/10 bg-white/[.03]")}>
      <p className={cn(monoLabel, highlight ? "text-[#ffb05c]" : inkTone.ink.faint)}>{label}</p>
      <ol className="mt-3 flex flex-wrap items-center gap-y-2">
        {nodes.map((node, index) => (
          <li key={node} className="flex items-center">
            <span className={cn("inline-flex h-9 items-center rounded-full border px-3.5 text-[14px] font-semibold", highlight ? "border-[#ffb05c]/50 bg-[#0b1020]/60 text-white" : "border-white/14 bg-[#0b1020]/60 text-white/85")}>{node}</span>
            {index < nodes.length - 1 ? <span aria-hidden className={cn("mx-1.5 h-px w-5 sm:w-7", highlight ? "bg-[#ffb05c]/70" : "bg-white/25")} /> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function WhyDirect() {
  return (
    <section id="why-direct" className="relative scroll-mt-24 overflow-x-clip py-[clamp(72px,8vw,120px)] text-white">
      <SpineMark n="01" />
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <p data-reveal className={cn(monoLabel, inkTone.ink.muted)}>{directBillBar.eyebrow}</p>
          <h2 data-reveal style={delay(60)} className={cn(h2, "mt-4 max-w-[16ch]")}>
            {directBillBar.title}
          </h2>
          <p data-reveal style={delay(140)} className={cn("mt-5 max-w-[58ch] text-[17px] leading-[1.6] lg:text-[19px]", inkTone.ink.muted)}>
            {directBillBar.lead}
          </p>
          <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {directBillBar.requirements.map((item, index) => (
              <li key={item.title} data-reveal style={delay(200 + index * 70)} className="rule-item border-t border-white/15 pt-4">
                <h3 className="font-display text-[20px] leading-[1.2] font-bold tracking-[-0.01em]">{item.title}</h3>
                <p className={cn("mt-2 text-[15px] leading-[1.6]", inkTone.ink.muted)}>{item.body}</p>
              </li>
            ))}
          </ul>
          <p data-reveal style={delay(500)} className={cn("mt-8 max-w-[62ch] text-[15px] leading-[1.6]", inkTone.ink.muted)}>
            {directBillBar.consequence}
          </p>
          <ul data-reveal style={delay(560)} className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {directBillBar.citations.map((c) => (
              <li key={c.href}>
                <InkLink href={c.href} tone="ink" className="gap-1.5 text-[14px]">
                  {c.label}
                  <ExternalLink className="size-3.5" aria-hidden />
                </InkLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5 lg:pt-16">
          <div data-reveal="scale" style={delay(200)} className="grid gap-3">
            <p className={cn(monoLabel, inkTone.ink.faint)}>{pathDiagram.title}</p>
            {pathDiagram.rows.map((row) => (
              <PathRow key={row.label} label={row.label} nodes={row.nodes} highlight={"highlight" in row && row.highlight} />
            ))}
            <p className={cn("mt-2 text-[14px] leading-[1.6]", inkTone.ink.muted)}>{pathDiagram.note}</p>
            <InkLink href={pathDiagram.citation.href} tone="ink" className="gap-1.5 text-[14px]">
              {pathDiagram.citation.label}
              <ExternalLink className="size-3.5" aria-hidden />
            </InkLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Three outcomes: the pinned sequence (paper #1 begins)             */
/* ------------------------------------------------------------------ */

export function OutcomesPinned() {
  return (
    <section id="outcomes" data-surface="pearl" className="relative scroll-mt-24 overflow-x-clip py-[clamp(64px,7vw,104px)] text-[#0b1020]">
      <SpineMark n="02" />
      <Container>
        <h2 data-reveal className={cn(statement, "max-w-[14ch]")}>
          Three outcomes. One partner.
        </h2>
        <div className="mt-12 lg:mt-16">
          <Pinned
            label="Outcomes"
            steps={homeOutcomes.map((o) => ({
              ...o,
              path: o.capture === "customerProductsHubx" ? "/customers/products" : o.capture === "dashboards" ? "/dashboards" : "/",
            }))}
          />
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Four engines: bento, all visible                                   */
/* ------------------------------------------------------------------ */

export function EnginesBento() {
  const hubx = homeEngines[0];
  const rest = homeEngines.slice(1);
  return (
    <section id="engines" data-surface="pearl" className="relative scroll-mt-24 overflow-x-clip pb-[clamp(64px,7vw,104px)] text-[#0b1020]">
      <SpineMark n="03" />
      <Container>
        <h2 data-reveal className={cn(h2, "max-w-[18ch]")}>
          Four engines. One accountable partner.
        </h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <article data-reveal="scale" style={delay(80)} className="glow-card relative overflow-hidden rounded-[20px] border border-[#0b1020]/10 bg-white shadow-[0_1px_2px_rgba(11,16,32,.06),0_12px_40px_-24px_rgba(11,16,32,.25)] lg:col-span-7 lg:row-span-2">
            <div className="grid h-full gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
              <div className="flex flex-col">
                <p className={cn(monoLabel, "flex items-center gap-2", inkTone.pearl.faint)}>
                  <HubXMark className="size-3.5" />
                  {hubx.meta}
                </p>
                <h3 className="mt-4 font-display text-[32px] leading-[1.05] font-bold tracking-[-0.02em]">
                  <Link href={hubx.href} className="after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-none">
                    {hubx.name}
                  </Link>
                </h3>
                <p className={cn("mt-3 max-w-[40ch] text-[16px] leading-[1.6]", inkTone.pearl.muted)}>{hubx.summary}</p>
                <span aria-hidden className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold">
                  Explore HubX
                  <ArrowRight className="size-3.5 text-[#f97316]" />
                </span>
              </div>
              <div className="relative -mr-6 -mb-6 overflow-hidden rounded-tl-[14px] border-t border-l border-[#0b1020]/10 shadow-[0_24px_64px_-24px_rgba(11,16,32,.35)] sm:-mr-8 sm:-mb-8">
                <CaptureImage capture={captures.catalogHome} className="max-w-none rounded-none" />
              </div>
            </div>
          </article>
          {rest.map((engine, index) => (
            <div key={engine.id} data-reveal style={delay(160 + index * 70)} className={index === 2 ? "lg:col-span-12" : "lg:col-span-5"}>
              <EngineTile {...engine} className="h-full" wide={index === 2} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Switch offer: the deal desk as a product (paper exits via bleed)   */
/* ------------------------------------------------------------------ */

function ComparisonSample() {
  const { sample } = homeSwitch;
  return (
    <div className="overflow-hidden rounded-[18px] border border-white/12 bg-[#12192b] text-white shadow-[0_32px_80px_-24px_rgba(0,0,0,.6)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <p className="font-semibold">{sample.title}</p>
        <p className={cn(monoLabel, inkTone.ink.faint)}>Deal desk · sample</p>
      </div>
      <table className="w-full text-left text-[13.5px] tabular-nums">
        <thead className={cn(monoLabel, "text-[10.5px]", inkTone.ink.faint)}>
          <tr>
            {sample.columns.map((col, i) => (
              <th key={col} scope="col" className={cn("px-4 py-2.5 font-medium", i >= 3 && "text-right", i === 1 && "text-right")}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sample.rows.map(([sku, qty, term]) => (
            <tr key={sku} className="border-t border-white/8">
              <th scope="row" className="px-4 py-2.5 font-medium text-white/90">
                {sku}
              </th>
              <td className="px-4 py-2.5 text-right text-white/70">{qty}</td>
              <td className="px-4 py-2.5 text-white/70">{term}</td>
              <td className="px-4 py-2.5 text-right">
                <span className="sr-only">Your current price</span>
                <span aria-hidden className="inline-block h-2.5 w-14 rounded-sm bg-white/18" />
              </td>
              <td className="px-4 py-2.5 text-right">
                <span className="sr-only">MSP Hub price</span>
                <span aria-hidden className="inline-block h-2.5 w-14 rounded-sm bg-[#f97316]/70" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={cn("border-t border-white/10 px-4 py-3 text-[12.5px] leading-[1.5]", inkTone.ink.muted)}>{sample.footer}</p>
    </div>
  );
}

export function SwitchOffer() {
  return (
    <section id="switch" className="relative scroll-mt-24 overflow-x-clip pt-[clamp(72px,8vw,120px)] pb-[clamp(72px,8vw,120px)] text-white">
      <SpineMark n="04" />
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p data-reveal className={cn(monoLabel, inkTone.ink.muted)}>{homeSwitch.eyebrow}</p>
            <h2 data-reveal style={delay(60)} className={cn(h2, "mt-4 max-w-[16ch]")}>
              {homeSwitch.title}
            </h2>
            <p data-reveal style={delay(140)} className={cn("mt-5 max-w-[50ch] text-[17px] leading-[1.6]", inkTone.ink.muted)}>
              {homeSwitch.lead}
            </p>
            <div data-reveal style={delay(220)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={homeSwitch.cta.href}>
                {homeSwitch.cta.label}
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href={homeSwitch.secondary.href} variant="glass">
                {homeSwitch.secondary.label}
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div data-reveal="scale" style={delay(160)}>
              <Parallax range={24}>
                <ComparisonSample />
              </Parallax>
            </div>
          </div>
        </div>
        <ol className="mt-14 grid gap-6 border-t border-white/15 pt-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {switchSteps.map((step, index) => (
            <li key={step.title} data-reveal style={delay(index * 70)} className="rule-item border-t border-white/15 pt-4 lg:border-t-0 lg:pt-0">
              <p className={cn(monoLabel, inkTone.ink.faint)}>{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-display text-[18px] leading-[1.2] font-bold tracking-[-0.01em]">{step.title}</h3>
              <p className={cn("mt-2 text-[14.5px] leading-[1.6]", inkTone.ink.muted)}>{step.body}</p>
            </li>
          ))}
        </ol>
        <div data-reveal className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
          <p className={cn(monoLabel, inkTone.ink.faint)}>Where people buy today</p>
          <ChipRow tone="ink" items={homeSwitch.providers} label="Current providers" />
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 8. Proof: anonymised work, and things you can check (paper #2)        */
/* ------------------------------------------------------------------ */

export function ProofChapter() {
  const checks = [learn.directBillRequirements, learn.transfers, learn.transfersLicenseBased, learn.cancellation];
  return (
    <section id="proof" data-surface="pearl" className="relative scroll-mt-24 overflow-x-clip py-[clamp(64px,7vw,104px)] text-[#0b1020]">
      <SpineMark n="05" />
      <Container>
        <h2 data-reveal className={cn(h2, "max-w-[18ch]")}>
          Work the deal desk has done.
        </h2>
        <p data-reveal style={delay(80)} className={cn("mt-4 max-w-[58ch] text-[16px] leading-[1.6]", inkTone.pearl.muted)}>
          Anonymised. No names and no logos without written approval; the shape of the work is the point.
        </p>
        <ul className="mt-10 grid gap-4 lg:grid-cols-3">
          {cases.map((item, index) => (
            <li key={item.id} data-reveal style={delay(120 + index * 70)}>
              <CaseCard item={item} tone="pearl" className="h-full" />
            </li>
          ))}
        </ul>
        <div data-reveal className="mt-14 grid gap-8 rounded-[20px] border border-[#0b1020]/10 bg-white/70 p-6 sm:p-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h3 className="font-display text-[26px] leading-[1.1] font-bold tracking-[-0.02em]">{homeChecks.title}</h3>
            <p className={cn("mt-3 text-[15.5px] leading-[1.6]", inkTone.pearl.muted)}>{homeChecks.lead}</p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <CredentialBadges variant="chips" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className={cn(monoLabel, inkTone.pearl.faint)}>The Microsoft Learn pages the deal desk works from</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {checks.map((c) => (
                <li key={c.href}>
                  <InkLink href={c.href} tone="pearl" className="min-h-0 items-start gap-1.5 py-1 text-[14.5px] leading-snug">
                    <span>{c.label.replace(" (Microsoft Learn)", "")}</span>
                    <ExternalLink className="mt-1 size-3.5 shrink-0" aria-hidden />
                  </InkLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 9. Insights: the latest three                                         */
/* ------------------------------------------------------------------ */

export function InsightsRow() {
  const latest = posts.slice(0, 3);
  return (
    <section id="insights" className="relative scroll-mt-24 overflow-x-clip py-[clamp(72px,8vw,120px)] text-white">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 data-reveal className={cn(h2, "max-w-[14ch]")}>
            Insights
          </h2>
          <InkLink href="/insights" tone="ink" className="text-[15px]">
            All insights
          </InkLink>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {latest.map((post, index) => (
            <li key={post.slug} data-reveal style={delay(80 + index * 70)}>
              <InsightCard post={post} tone="ink" className="h-full" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

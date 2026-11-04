import { DotField } from "@/components/ink/atmosphere";
import { DeferredArt } from "@/components/ink/deferred-art";
import { Parallax } from "@/components/ink/flow";
import { IllustrativeAsset, type ArtName } from "@/components/ink/illustrative-asset";
import { ChipRow } from "@/components/ink/interior";
import { Container, Section, type SectionTone } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/typography";
import { cn } from "@/lib/cn";

type PageHeroProps = {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  align?: "left" | "center";
  /** Rendered beneath the hero copy, full container width (e.g. a product frame). */
  below?: React.ReactNode;
  /** Variant A: rendered beside the copy from lg up (a device frame). */
  aside?: React.ReactNode;
  /** Variant C: an ink-glass render as a masked, parallaxed background behind the copy (ink heroes only). */
  art?: ArtName;
  /** Mono chips under the buttons: the three facts a buyer checks first. */
  facts?: readonly string[];
  /** "On this page" links to the chapters below (every chapter needs an id). */
  anchors?: readonly { label: string; href: string }[];
  /**
   * `false` when the aside is desktop-only (a frame inside `WideOnly`): below lg the aside column, and its
   * 48 px gap under the copy, are dropped instead of leaving empty space.
   */
  asideBelowLg?: boolean;
  className?: string;
  tone?: SectionTone;
};

/** Below md: a single row of links that scrolls sideways and bleeds to the screen edges (links keep it keyboard-scrollable). */
const phoneRow =
  "max-md:-mx-[var(--page-pad)] max-md:-my-1.5 max-md:flex-nowrap max-md:overflow-x-auto max-md:px-[var(--page-pad)] max-md:py-1.5 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden max-md:[&>li]:shrink-0";

/**
 * Interior hero in three variants (brief §5): A, split copy + device
 * (`aside`); B, copy over the canvas (default); C, copy over a masked
 * full-bleed render (`art`). Pearl heroes get a soft haze and dot field.
 */
export function PageHero({ eyebrow, title, lead, children, align = "left", below, aside, art, facts, anchors, asideBelowLg = true, className, tone = "dark" }: PageHeroProps) {
  const center = align === "center";
  const light = tone === "light";
  return (
    <Section
      tone={tone}
      className={cn("overflow-x-clip pt-12 pb-12 sm:pt-16 lg:pt-20 lg:pb-16", className)}
      decor={
        light ? (
          <>
            <div aria-hidden className="absolute -top-40 right-[-10%] h-[560px] w-[720px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,.16),transparent_60%)]" />
            <DotField tone="pearl" className="opacity-70" />
          </>
        ) : art ? (
          // Mounted after load on wide screens only, so the H1 stays the largest paint on every device.
          <DeferredArt>
            <div className="art-fade absolute inset-y-[-15%] right-[-10%] left-[38%] opacity-60 [mask-image:radial-gradient(ellipse_60%_70%_at_60%_50%,#000_10%,transparent_70%)]">
              <Parallax range={80} className="h-full">
                <IllustrativeAsset name={art} decorative sizes="70vw" className="h-full [&_img]:h-full [&_img]:object-cover" />
              </Parallax>
            </div>
          </DeferredArt>
        ) : null
      }
    >
      <Container className={cn(center && "text-center", !!aside && "lg:grid lg:grid-cols-12 lg:items-center lg:gap-10")}>
        <div className={cn("max-w-[820px]", center && "mx-auto", !!aside && "lg:col-span-7", !!art && "lg:max-w-[720px]")}>
          {eyebrow ? (
            <div className="hero-line" style={{ "--i": 0 } as React.CSSProperties}>
              <Eyebrow tone={light ? "light" : "dark"} className="before:hidden">
                {eyebrow}
              </Eyebrow>
            </div>
          ) : null}
          <div className="hero-line" style={{ "--i": 1 } as React.CSSProperties}>
            <Display as="h1" size="xl" tone={light ? "light" : "dark"} className="mt-5">
              {title}
            </Display>
          </div>
          {lead ? (
            <div className="hero-line" style={{ "--i": 2 } as React.CSSProperties}>
              <Lead tone={light ? "light" : "dark"} className={cn("mt-6", center && "mx-auto")}>
                {lead}
              </Lead>
            </div>
          ) : null}
          {children ? (
            <div className={cn("hero-line mt-8 flex flex-wrap gap-3", center && "justify-center")} style={{ "--i": 3 } as React.CSSProperties}>
              {children}
            </div>
          ) : null}
          {facts?.length ? (
            <div className="hero-line mt-7" style={{ "--i": 4 } as React.CSSProperties}>
              <ChipRow tone={light ? "pearl" : "ink"} mono items={facts} label="At a glance" className={cn("max-md:hidden", center && "justify-center")} />
              <p className={cn("font-mono text-[11px] leading-[1.8] tracking-[0.12em] uppercase md:hidden", light ? "text-[#4b5569]" : "text-[#b8c0d4]")}>
                {facts.join(" · ")}
              </p>
            </div>
          ) : null}
          {anchors?.length ? (
            <nav aria-label="On this page" className="hero-line mt-6" style={{ "--i": 5 } as React.CSSProperties}>
              <ul className={cn("flex flex-wrap items-center gap-x-5 gap-y-1 text-[14px] font-medium", phoneRow, center && "justify-center", light ? "text-[#4b5569]" : "text-[#b8c0d4]")}>
                <li className={cn("font-mono text-[11px] tracking-[0.12em] uppercase", light ? "text-[#4b5569]" : "text-[#8e98ae]")}>On this page</li>
                {anchors.map((anchor) => (
                  <li key={anchor.href}>
                    <a href={anchor.href} className={cn("link-draw inline-flex min-h-9 items-center whitespace-nowrap", light ? "[--ul:rgba(11,16,32,.22)] hover:text-[#0b1020]" : "[--ul:rgba(255,255,255,.28)] hover:text-white")}>
                      {anchor.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>
        {aside ? (
          <div className={cn("hero-line mt-12 lg:col-span-5 lg:mt-0", !asideBelowLg && "max-lg:hidden")} style={{ "--i": 2 } as React.CSSProperties}>
            {aside}
          </div>
        ) : null}
        {below ? <div className="mt-12 lg:mt-16">{below}</div> : null}
      </Container>
    </Section>
  );
}

import { DotField } from "@/components/ink/atmosphere";
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
  /** Rendered beside the copy from lg up (an evidence crop, an illustration). */
  aside?: React.ReactNode;
  className?: string;
  tone?: SectionTone;
};

/** Interior hero: the canvas shows through on ink; a soft haze and dot field on pearl; copy rising in sequence. */
export function PageHero({ eyebrow, title, lead, children, align = "left", below, aside, className, tone = "dark" }: PageHeroProps) {
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
        ) : null
      }
    >
      <Container className={cn(center && "text-center", !!aside && "lg:grid lg:grid-cols-12 lg:items-center lg:gap-10")}>
        <div className={cn("max-w-[820px]", center && "mx-auto", !!aside && "lg:col-span-7")}>
          {eyebrow ? (
            <div className="hero-line" style={{ "--i": 0 } as React.CSSProperties}>
              <Eyebrow tone={light ? "light" : "dark"} className={cn(center && "before:hidden")}>
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
        </div>
        {aside ? (
          <div className="hero-line mt-12 lg:col-span-5 lg:mt-0" style={{ "--i": 2 } as React.CSSProperties}>
            {aside}
          </div>
        ) : null}
        {below ? <div className="mt-12 lg:mt-16">{below}</div> : null}
      </Container>
    </Section>
  );
}

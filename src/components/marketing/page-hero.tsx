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
  className?: string;
  tone?: SectionTone;
};

export function PageHero({ eyebrow, title, lead, children, align = "left", below, className, tone = "dark" }: PageHeroProps) {
  const center = align === "center";
  const light = tone === "light";
  return (
    <Section
      tone={tone}
      className={cn("overflow-hidden pt-12 pb-12 sm:pt-16 lg:pt-20 lg:pb-16", className)}
    >
      <Container className={cn(center && "text-center")}>
        <div className={cn("max-w-[820px]", center && "mx-auto")}>
          {eyebrow ? <Eyebrow tone={light ? "light" : "dark"} className={cn(center && "before:hidden")}>{eyebrow}</Eyebrow> : null}
          <Display as="h1" size="xl" tone={light ? "light" : "dark"} className="mt-5">
            {title}
          </Display>
          {lead ? <Lead tone={light ? "light" : "dark"} className={cn("mt-6", center && "mx-auto")}>{lead}</Lead> : null}
          {children ? <div className={cn("mt-8 flex flex-wrap gap-3", center && "justify-center")}>{children}</div> : null}
        </div>
        {below ? <div className="mt-12 lg:mt-16">{below}</div> : null}
      </Container>
    </Section>
  );
}

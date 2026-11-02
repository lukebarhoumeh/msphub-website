import { Container, Glow, Section } from "@/components/ui/section";
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
};

export function PageHero({ eyebrow, title, lead, children, align = "left", below, className }: PageHeroProps) {
  const center = align === "center";
  return (
    <Section
      className={cn("overflow-hidden pt-12 pb-14 sm:pt-16 lg:pt-20", className)}
      decor={
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]">
          <div className="bg-hex absolute inset-0" />
          <Glow tone="orange" className="top-[-380px] left-1/2 h-[760px] w-[760px] -translate-x-1/2" drift />
          <Glow tone="navy" className="top-[20%] left-[-400px] h-[800px] w-[1000px]" />
          <Glow tone="blue" className="top-[10%] right-[-300px] h-[800px] w-[800px]" />
        </div>
      }
    >
      <Container className={cn(center && "text-center")}>
        <div className={cn("max-w-[820px]", center && "mx-auto")}>
          {eyebrow ? <Eyebrow className={cn(center && "before:hidden")}>{eyebrow}</Eyebrow> : null}
          <Display as="h1" size="xl" className="mt-5">
            {title}
          </Display>
          {lead ? <Lead className={cn("mt-6", center && "mx-auto")}>{lead}</Lead> : null}
          {children ? <div className={cn("mt-8 flex flex-wrap gap-3", center && "justify-center")}>{children}</div> : null}
        </div>
        {below ? <div className="mt-12 lg:mt-16">{below}</div> : null}
      </Container>
    </Section>
  );
}

import { HubXLogo } from "@/components/brand/hubx-logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { hubxLockup } from "@/content/hubx";

/** Cross-sell callout used on every services page; text lockup only. */
export function PairsWithHubX({ body }: { body: string }) {
  return (
    <Container>
      <div className="glass flex flex-col gap-6 p-7 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <HubXLogo className="h-8 w-auto shrink-0" />
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] text-brand-orange uppercase">Pairs with {hubxLockup}</p>
            <p className="mt-1.5 max-w-[64ch] text-[15px] leading-relaxed text-white/70">{body}</p>
          </div>
        </div>
        <ButtonLink href="/hubx" variant="glass" className="shrink-0 self-start lg:self-auto">
          Explore HubX
        </ButtonLink>
      </div>
    </Container>
  );
}

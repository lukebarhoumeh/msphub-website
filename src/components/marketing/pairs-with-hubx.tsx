import { HubXWithBadge } from "@/components/brand/hubx-logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";

/** Cross-sell callout used on every services page (plan section 5). */
export function PairsWithHubX({ body }: { body: string }) {
  return (
    <Container>
      <div className="glass flex flex-col gap-6 p-7 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <HubXWithBadge hubxClassName="h-8 w-auto" badgeClassName="h-6 w-auto" className="shrink-0 gap-3 sm:gap-3" />
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] text-brand-orange uppercase">Pairs with HubX, powered by MSP Hub</p>
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

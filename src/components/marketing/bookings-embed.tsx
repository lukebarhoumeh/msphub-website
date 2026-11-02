import { CalendarDays, ExternalLink } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { NeedsConfirmBlock } from "@/components/ui/needs-confirm";
import { env } from "@/lib/env";
import { cn } from "@/lib/cn";

type BookingsEmbedProps = {
  /** Heading shown above the calendar. */
  title: string;
  /** One line under the heading. */
  lead: string;
  /** Shown beneath the embed: the form below is always the fallback. */
  fallbackNote: string;
  className?: string;
};

/**
 * Microsoft Bookings page for the HubX demo (handoff §2 #19). Renders the
 * iframe when `NEXT_PUBLIC_BOOKINGS_URL` is set, lazily and sandboxed, with
 * an "open in a new tab" link in case the tenant blocks embedding. Without
 * the variable, production shows nothing here (the request form below is
 * the path) and review builds show the asset marker.
 */
export function BookingsEmbed({ title, lead, fallbackNote, className }: BookingsEmbedProps) {
  const url = env.bookingsUrl();
  if (!url) {
    return (
      <NeedsConfirmBlock id="bookingLink" fallback={null} className={className}>
        <p className="flex items-center gap-2 text-sm text-white/70">
          <CalendarDays className="size-5 text-amber-300/80" aria-hidden />
          The Microsoft Bookings calendar embeds here once NEXT_PUBLIC_BOOKINGS_URL is set; the form stays as fallback.
        </p>
      </NeedsConfirmBlock>
    );
  }

  return (
    <section aria-labelledby="bookings-title" className={cn("glass glass-lg overflow-hidden", className)}>
      <div className="flex flex-wrap items-start justify-between gap-4 p-6 pb-4 sm:px-8">
        <div>
          <h2 id="bookings-title" className="flex items-center gap-2.5 text-lg font-semibold text-white">
            <CalendarDays className="size-5 text-brand-orange" aria-hidden />
            {title}
          </h2>
          <p className="mt-1 text-[15px] text-white/70">{lead}</p>
        </div>
        <ButtonLink href={url} variant="glass" size="sm" target="_blank" rel="noopener noreferrer">
          Open in Microsoft Bookings
          <ExternalLink className="size-4" aria-hidden />
        </ButtonLink>
      </div>
      <iframe
        src={url}
        title={title}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        className="block h-[760px] w-full border-0 bg-white"
      />
      <p className="px-6 py-4 text-[13px] text-white/65 sm:px-8">{fallbackNote}</p>
    </section>
  );
}

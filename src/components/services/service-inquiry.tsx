import type { ReactNode } from "react";
import { LeadForm } from "@/components/forms/lead-form";
import { Panel, inkTone, monoLabel } from "@/components/ink/interior";
import { Container } from "@/components/ui/section";
import { serviceInquiryNote } from "@/content/services";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export type ServiceBranch = "professional" | "managed" | "development";

type ServiceInquiryProps = {
  /** Pre-selects the practice in the inquiry form. */
  branch?: ServiceBranch;
  title: string;
  lead: string;
  id?: string;
  eyebrow?: string;
  /** Replaces the default form (the services index reads `?branch=` into one). */
  form?: ReactNode;
};

/**
 * The inquiry that ends every services page (spec §3): the page's own next
 * step, with the practice already ticked, so no services call to action
 * leaves the page. The company close (Route D) still follows.
 */
export function ServiceInquiry({ branch, title, lead, id = "inquiry", eyebrow = "Start here", form }: ServiceInquiryProps) {
  return (
    <section id={id} data-surface="ink" className="relative scroll-mt-24 overflow-x-clip pb-[clamp(64px,7vw,104px)] text-white">
      <Container>
        <Panel tone="ink" className="grid gap-10 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:p-14">
          <div>
            <p className={cn(monoLabel, inkTone.ink.muted)}>{eyebrow}</p>
            <h2 className="mt-4 font-display text-[30px] leading-[1.1] font-bold tracking-[-0.02em] lg:text-[40px]">{title}</h2>
            <p className={cn("mt-4 max-w-[46ch] text-[17px] leading-[1.6]", inkTone.ink.muted)}>{lead}</p>
            <p className={cn("mt-6 text-sm", inkTone.ink.muted)}>
              {serviceInquiryNote.reply} {serviceInquiryNote.talk}{" "}
              <a href={site.salesPhoneHref} className="link-draw font-medium text-white [--ul:rgba(255,255,255,.35)]">
                {serviceInquiryNote.call} {site.salesPhone}
              </a>
              .
            </p>
          </div>
          {form ?? <LeadForm kind="service" defaultValues={branch ? { branches: [branch] } : undefined} />}
        </Panel>
      </Container>
    </section>
  );
}

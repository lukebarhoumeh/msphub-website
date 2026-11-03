import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { HubXLogo } from "@/components/brand/hubx-logo";
import { MspHubLogo } from "@/components/brand/msp-hub-logo";
import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon, YouTubeIcon } from "@/components/layout/social-icons";
import { Container } from "@/components/ui/section";
import { footerColumns, legalLinks } from "@/content/nav";
import { site } from "@/content/site";

const socials = [
  { label: "LinkedIn", href: site.social.linkedin, Icon: LinkedInIcon },
  { label: "Facebook", href: site.social.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
  { label: "X", href: site.social.x, Icon: XIcon },
  { label: "YouTube", href: site.social.youtube, Icon: YouTubeIcon },
];

const linkClass = "inline-block py-0.5 text-[14.5px] text-white/70 transition hover:text-white";

/** Site footer per the handoff §4: Company · Services · HubX · Licensing, socials, legal entity, address, phone, legal links. */
export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-2 pt-16 pb-8">
      <Container>
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="MSP Hub home" className="inline-flex">
              <MspHubLogo className="h-7 w-auto" />
            </Link>
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-white/70">{site.tagline}</p>
            <p className="mt-2 max-w-[38ch] text-[13px] leading-relaxed text-white/60">
              Microsoft CSP direct-bill partner (Tier-1 Direct), North America. HubX, powered by MSP Hub.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-sm text-white/70">
              <HubXLogo className="h-5 w-auto" />
              <span>powered by MSP Hub</span>
            </p>
            <ul className="mt-6 grid gap-2.5 text-[14.5px] text-white/70">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-1 size-4 shrink-0 text-[#f97316]" aria-hidden />
                <a href={`mailto:${site.salesEmail}`} className="hover:text-white">
                  {site.salesEmail}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-1 size-4 shrink-0 text-[#f97316]" aria-hidden />
                <address className="not-italic">{site.hq.address}</address>
              </li>
            </ul>
          </div>

          {footerColumns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="mb-3.5 font-mono text-xs font-semibold tracking-[0.12em] text-white/60 uppercase">{col.heading}</h2>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    {l.href.startsWith("http") ? (
                      <a href={l.href} rel="noopener" className={linkClass}>
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className={linkClass}>
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-6 text-[13px] text-white/60 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p>
              © {site.copyrightYear} {site.legalName} · formerly {site.formerly}
            </p>
            <p className="mt-1 text-white/60">HubX™ is a trademark of {site.legalName}.</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <ul className="flex gap-5" aria-label="Legal">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex items-center gap-2" aria-label="Social">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-[10px] border border-white/12 bg-white/5 text-white/70 transition hover:text-white"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}

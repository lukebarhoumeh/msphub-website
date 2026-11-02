import Link from "next/link";
import { MspHubLogo } from "@/components/brand/msp-hub-logo";
import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon, YouTubeIcon } from "@/components/layout/social-icons";
import { Needs } from "@/components/ui/needs";
import { Container } from "@/components/ui/section";
import { footerColumns, legalLinks } from "@/content/nav";
import { site } from "@/content/site";

const socials = [
  { label: "LinkedIn", href: site.social.linkedin, Icon: LinkedInIcon },
  { label: "X", href: site.social.x, Icon: XIcon },
  { label: "YouTube", href: site.social.youtube, Icon: YouTubeIcon },
  { label: "Facebook", href: site.social.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-2 pt-16 pb-8">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="md:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="MSP Hub home" className="inline-flex">
              <MspHubLogo className="h-8 w-auto" />
            </Link>
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-white/70">{site.tagline}</p>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/45">
              Formerly READY Networks and Six.One. <Needs id="formerly" />
            </p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h2 className="mb-3.5 text-xs font-semibold tracking-[0.12em] text-white/45 uppercase">{col.heading}</h2>
              <ul className="space-y-2">
                {col.links.map((l) =>
                  l.href.startsWith("http") ? (
                    <li key={l.href}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-[14.5px] text-white/70 hover:text-white">
                        {l.label}
                      </a>
                    </li>
                  ) : (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[14.5px] text-white/70 hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="mb-3.5 text-xs font-semibold tracking-[0.12em] text-white/45 uppercase">Contact</h2>
            <ul className="space-y-2.5 text-[14.5px] text-white/70">
              <li>
                <a href={`mailto:${site.salesEmail}`} className="hover:text-white">
                  {site.salesEmail}
                </a>
              </li>
              <li className="flex flex-wrap items-center gap-2">
                Phone <Needs id="phone" />
              </li>
              <li className="flex flex-wrap items-center gap-2">
                Offices <Needs id="offices" />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-[13px] text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {site.copyrightYear} {site.legalName}. HubX™ is a trademark of {site.legalName}.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <ul className="flex gap-5">
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
                    className="grid size-9 place-items-center rounded-[10px] border border-white/12 bg-white/5 text-white/70 hover:text-white"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
              <li>
                <Needs id="social" />
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}

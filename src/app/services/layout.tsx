import { SectionSubnav } from "@/components/layout/section-subnav";
import { servicesNav } from "@/content/nav";

/** Every services page shares the section navigation beneath the site header (spec §2.4). */
export default function ServicesLayout({ children }: LayoutProps<"/services">) {
  return (
    <>
      <SectionSubnav items={servicesNav} ariaLabel="Services section" mobileLabel="Services" lockup="Services · MSP Hub" action={{ label: "Start a service inquiry", href: "#inquiry" }} />
      {children}
    </>
  );
}

import { HubxSubnav } from "@/components/hubx/hubx-subnav";

/** Every HubX page shares the section navigation beneath the site header. */
export default function HubxLayout({ children }: LayoutProps<"/hubx">) {
  return (
    <>
      <HubxSubnav />
      {children}
    </>
  );
}

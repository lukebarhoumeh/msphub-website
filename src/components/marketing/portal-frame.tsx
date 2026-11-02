import { HubXLogo } from "@/components/brand/hubx-logo";
import { Needs } from "@/components/ui/needs";
import { cn } from "@/lib/cn";

/**
 * Design mock-up of the HubX portal with sample data. Stands in for real
 * dark-mode screenshots until Luke supplies them (tagged on every use).
 */

const navItems = ["Dashboard", "Licenses", "Orders", "Customers", "Billing", "Reports", "Hub AI"];

type Kpi = { k: string; v: string; d: string; warn?: boolean };

const dashboardKpis: Kpi[] = [
  { k: "Active licenses", v: "12,480", d: "+3.2% this month" },
  { k: "Monthly spend", v: "$184,220", d: "−1.8% vs last month" },
  { k: "Renewals (30d)", v: "7", d: "2 need action", warn: true },
  { k: "Savings found", v: "$21,900", d: "Hub AI · 14 tips" },
];

const licenseKpis: Kpi[] = [
  { k: "Active licenses", v: "12,480", d: "+3.2% this month" },
  { k: "Unassigned seats", v: "286", d: "$9,120 / mo recoverable", warn: true },
  { k: "Renewals · 30 days", v: "7", d: "2 need action", warn: true },
  { k: "Hub AI savings found", v: "$21,900", d: "14 recommendations" },
];

const dashboardRows = [
  ["Microsoft 365 E3", "4,120", "3,987", "$36.00", "Active"],
  ["Microsoft 365 E5", "1,250", "1,250", "$57.00", "Active"],
  ["Business Premium", "2,640", "2,511", "$22.00", "Renews Nov 20"],
  ["Defender for Endpoint P2", "3,100", "3,100", "$5.20", "Active"],
];

const licenseRows = [
  ["Microsoft 365 E3", "Contoso Ltd", "4,120", "3,987", "Renews in 11 days"],
  ["Microsoft 365 E5", "Fabrikam Inc", "1,250", "1,250", "Active"],
  ["Business Premium", "Northwind Traders", "2,640", "2,511", "Renews in 17 days"],
  ["Copilot for Microsoft 365", "Contoso Ltd", "60", "58", "Active"],
  ["Defender for Endpoint P2", "Fabrikam Inc", "3,100", "3,100", "Active"],
  ["Teams Phone Standard", "Northwind Traders", "410", "402", "Active"],
];

const bars = [42, 48, 45, 58, 54, 66, 62, 74, 70, 82, 78, 92];

function Bars({ values, muted = 0, className }: { values: number[]; muted?: number; className?: string }) {
  return (
    <div className={cn("flex h-24 items-end gap-1.5", className)} aria-hidden>
      {values.map((h, i) => (
        <i
          key={i}
          style={{ height: `${h}%` }}
          className={cn(
            "flex-1 rounded-t",
            i < muted
              ? "bg-white/15"
              : "bg-[linear-gradient(180deg,rgba(249,115,22,.95),rgba(249,115,22,.35))]",
          )}
        />
      ))}
    </div>
  );
}

function Status({ label }: { label: string }) {
  const renew = label.startsWith("Renews");
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <span className={cn("size-1.5 rounded-full", renew ? "bg-brand-orange" : "bg-success")} />
      {label}
    </span>
  );
}

type PortalFrameProps = {
  variant?: "dashboard" | "licenses";
  className?: string;
  url?: string;
};

export function PortalFrame({ variant = "dashboard", className, url }: PortalFrameProps) {
  const isLicenses = variant === "licenses";
  const kpis = isLicenses ? licenseKpis : dashboardKpis;
  const rows = isLicenses ? licenseRows : dashboardRows;
  const head = isLicenses
    ? ["Product", "Tenant", "Seats", "Assigned", "Status"]
    : ["Product", "Seats", "Assigned", "Unit / mo", "Status"];

  return (
    <figure className={cn("glass glass-lg overflow-hidden text-left", className)}>
      <div className="flex h-10.5 items-center gap-2.5 border-b border-white/12 bg-white/3 px-4">
        <div className="flex gap-1.5" aria-hidden>
          <i className="size-2.5 rounded-full bg-white/15" />
          <i className="size-2.5 rounded-full bg-white/15" />
          <i className="size-2.5 rounded-full bg-white/15" />
        </div>
        <div className="mx-auto hidden h-6.5 items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3.5 text-xs text-white/45 sm:inline-flex">
          <span aria-hidden className="size-2.5 rounded-[3px] border-[1.5px] border-current" />
          {url ?? (isLicenses ? "hubx.msphub.com/licenses" : "hubx.msphub.com")}
        </div>
      </div>

      <div className={cn("grid bg-[#181818] text-[12.5px] text-[#ECEDEF]", "md:grid-cols-[176px_1fr]", isLicenses ? "min-h-[520px]" : "min-h-[420px]")}>
        <aside className="hidden flex-col gap-1.5 border-r border-white/8 bg-[#151515] px-3.5 py-4.5 md:flex">
          <HubXLogo className="mx-1 mt-0.5 mb-4 h-6 w-auto" />
          {navItems.map((item) => {
            const active = isLicenses ? item === "Licenses" : item === "Dashboard";
            return (
              <div
                key={item}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-white/60",
                  active && "bg-brand-orange/15 text-white",
                )}
              >
                <i
                  aria-hidden
                  className={cn(
                    "size-3.5 rounded border-[1.5px] border-current opacity-80",
                    active && "border-brand-orange bg-brand-orange/40",
                  )}
                />
                {item}
              </div>
            );
          })}
          {isLicenses ? (
            <div className="mt-auto rounded-[10px] border border-white/8 bg-white/5 p-2.5 text-[11.5px] text-white/60">
              <b className="block font-semibold text-white">All customers</b>42 tenants · MSP view
            </div>
          ) : null}
        </aside>

        <div className="flex flex-col gap-3.5 p-4 sm:p-[18px]">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold">
              {isLicenses ? "Licenses" : "Good morning, Jordan"}
              <small className="block text-[11.5px] font-normal text-white/50">
                {isLicenses ? "42 tenants · 12,480 active · 7 renewals in 30 days" : "Tuesday, Nov 3 · 7 renewals in the next 30 days"}
              </small>
            </div>
            <div className="hidden h-7.5 max-w-[260px] flex-1 items-center rounded-lg border border-white/10 bg-white/6 px-2.5 text-[11.5px] text-white/45 sm:flex">
              {isLicenses ? "Filter by product, tenant, or renewal…" : "Search licenses, orders, customers…"}
            </div>
            <div aria-hidden className="size-7 rounded-full bg-[linear-gradient(135deg,#F97316,#c2410c)]" />
          </div>

          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            {kpis.map((kpi) => (
              <div key={kpi.k} className="rounded-xl border border-white/8 bg-[#1F1F1F] px-3.5 py-3">
                <div className="text-[11px] text-white/50">{kpi.k}</div>
                <div className="mt-1 text-xl font-semibold tracking-[-0.01em] tabular-nums">{kpi.v}</div>
                <div className={cn("mt-0.5 text-[11px]", kpi.warn ? "text-brand-orange" : "text-success")}>{kpi.d}</div>
              </div>
            ))}
          </div>

          {isLicenses ? (
            <>
              <div className="rounded-xl border border-white/8 bg-[#1F1F1F] p-3.5">
                <Table head={head} rows={rows} />
              </div>
              <div className="grid gap-2.5 lg:grid-cols-[1.4fr_1fr]">
                <div className="rounded-xl border border-white/8 bg-[#1F1F1F] p-3.5">
                  <div className="mb-3 flex justify-between text-[12.5px] font-semibold">
                    Spend by tenant <span className="font-normal text-white/45">Top 9 · this month</span>
                  </div>
                  <Bars values={[92, 76, 64, 55, 48, 40, 34, 28, 22].reverse()} muted={4} />
                </div>
                <div className="rounded-xl border border-white/8 bg-[#1F1F1F] p-3.5">
                  <div className="mb-3 flex justify-between text-[12.5px] font-semibold">
                    Hub AI recommendations <span className="font-normal text-white/45">14 open</span>
                  </div>
                  <ul className="text-[11.5px] text-white/75">
                    {[
                      ["Reclaim 133 unassigned E3 seats · Contoso", "$4,788 / mo"],
                      ["Move 129 users to Business Premium · Northwind", "$1,806 / mo"],
                      ["Invoice variance detected · Fabrikam · Oct", "Review"],
                    ].map(([t, v]) => (
                      <li key={t} className="flex justify-between gap-2.5 border-t border-white/7 py-2 first:border-t-0">
                        <span className="text-white">{t}</span>
                        <span className="whitespace-nowrap text-brand-orange">{v}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-2.5 lg:grid-cols-[1.4fr_1fr]">
                <div className="rounded-xl border border-white/8 bg-[#1F1F1F] p-3.5">
                  <div className="mb-3 flex justify-between text-[12.5px] font-semibold">
                    License spend <span className="font-normal text-white/45">Last 12 months</span>
                  </div>
                  <Bars values={bars} />
                </div>
                <div className="rounded-xl border border-white/8 bg-[#1F1F1F] p-3.5">
                  <div className="mb-3 flex justify-between text-[12.5px] font-semibold">
                    Upcoming renewals <span className="font-normal text-white/45">Next 30 days</span>
                  </div>
                  <ul className="text-[11.5px] text-white/75">
                    {[
                      ["Microsoft 365 E3 · 420 seats", "Nov 14"],
                      ["Business Premium · 85 seats", "Nov 20"],
                      ["Copilot for M365 · 60 seats", "Dec 2"],
                    ].map(([t, v]) => (
                      <li key={t} className="flex justify-between gap-2.5 border-t border-white/7 py-2 first:border-t-0">
                        <span className="text-white">{t}</span>
                        <span className="whitespace-nowrap text-brand-orange">{v}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="rounded-xl border border-white/8 bg-[#1F1F1F] p-3.5">
                <Table head={head} rows={rows} />
              </div>
            </>
          )}
        </div>
      </div>
      <figcaption className="flex flex-wrap items-center gap-2 border-t border-white/10 px-4 py-2.5 text-xs text-white/45">
        Design mock-up of the HubX portal with sample data. <Needs id="screenshots" />
      </figcaption>
    </figure>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <table className="w-full border-collapse text-[11.5px]">
      <thead>
        <tr>
          {head.map((h, i) => (
            <th
              key={h}
              className={cn(
                "border-b border-white/8 px-2 pb-2 text-left font-medium text-white/45",
                i >= 2 && i <= 3 && "hidden sm:table-cell",
              )}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.join()}>
            {r.map((c, i) => (
              <td
                key={i}
                className={cn(
                  "border-b border-white/6 px-2 py-2 whitespace-nowrap text-white/80 last:border-b-0",
                  i >= 2 && i <= 3 && "hidden sm:table-cell",
                )}
              >
                {i === r.length - 1 ? <Status label={c} /> : c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

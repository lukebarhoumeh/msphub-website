import Image from "next/image";
import { MspHubLogo } from "@/components/brand/msp-hub-logo";

export default function Home() {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-navy-900),var(--color-ink)_60%)]" />
        <div className="absolute top-[-20%] left-1/2 h-[60vh] w-[70vw] -translate-x-1/2 rounded-full bg-navy-700/70 blur-3xl" />
        <div className="absolute right-[-10%] bottom-[-20%] h-[45vh] w-[45vw] rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <section className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 px-8 py-12 text-center shadow-2xl shadow-black/40 backdrop-blur-xl sm:px-14 sm:py-16">
        <MspHubLogo priority className="mx-auto h-8 w-auto sm:h-10" />
        <h1 className="mt-10 font-display text-2xl font-normal tracking-tight text-balance text-white sm:text-3xl">
          Your single technology partner for everything Microsoft.
        </h1>
        <p className="mt-4 text-xs font-medium tracking-[0.25em] text-white/60 uppercase">
          New site coming soon
        </p>
        <p className="mt-10 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/70">
          <span>Introducing</span>
          <span className="inline-flex items-center">
            <Image
              src="/brand/svg/hubx-logo-reversed.svg"
              alt="HubX"
              width={1087}
              height={282}
              className="h-6 w-auto"
            />
            <span>, powered by MSP Hub</span>
          </span>
        </p>
      </section>
    </main>
  );
}

import Reveal from "./Reveal";

export default function PageHeader({ label, title, intro }: { label: string; title: string; intro?: string }) {
  return (
    <section className="relative overflow-hidden bg-navy pt-40 pb-20 md:pt-52 md:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[70rem] -translate-x-1/2 rounded-full bg-sky/10 blur-[140px]"
      />
      {/* Faint dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)] opacity-40"
        style={{ backgroundImage: "radial-gradient(rgba(49,169,255,0.35) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <p className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-sky uppercase md:text-sm">
          <span className="size-2 rounded-full bg-sky shadow-[0_0_12px_var(--sky)]" />
          {label}
        </p>
        <Reveal
          as="h1"
          immediate
          mode="words"
          className="mt-8 max-w-[16ch] text-[clamp(2.8rem,7.5vw,7rem)] leading-[0.95] font-semibold tracking-[-0.045em]"
        >
          {title}
        </Reveal>
        {intro && (
          <Reveal as="p" mode="fade" immediate delay={0.4} className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
            {intro}
          </Reveal>
        )}
      </div>
    </section>
  );
}

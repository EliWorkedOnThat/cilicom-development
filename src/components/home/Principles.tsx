import Reveal from "../Reveal";
import SpotlightCard from "../SpotlightCard";
import type { Dictionary } from "@/src/i18n/dictionaries";

export default function Principles({ t }: { t: Dictionary["home"]["principles"] }) {
  return (
    <section className="bg-navy-deep py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <p className="font-mono text-xs tracking-[0.2em] text-sky uppercase">{t.eyebrow}</p>
        <Reveal as="h2" className="mt-4 max-w-3xl text-4xl leading-[1.02] font-semibold tracking-[-0.03em] md:text-6xl">
          {t.title}
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-2 md:gap-5">
          {t.items.map((p, i) => (
            <Reveal key={p.title} mode="fade" delay={i * 0.06} className="h-full">
              <SpotlightCard className="h-full p-8 md:p-10">
                <span className="font-mono text-sm text-sky">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-10 text-2xl font-semibold tracking-tight md:text-3xl">{p.title}</h3>
                <p className="mt-3 max-w-md text-lg leading-relaxed text-ink-soft">{p.body}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

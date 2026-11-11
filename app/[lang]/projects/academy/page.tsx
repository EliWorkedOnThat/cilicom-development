import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import SpotlightCard from "@/src/components/SpotlightCard";
import Reveal from "@/src/components/Reveal";
import Magnetic from "@/src/components/Magnetic";
import CallToAction from "@/src/components/CallToAction";
import { getDictionary } from "@/src/i18n/dictionaries";
import { hasLocale, localize } from "@/src/i18n/config";

type Content = ReturnType<typeof getDictionary>["academyPage"];

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/academy">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).academyPage;
  return { title: t.metaTitle, description: t.metaDescription };
}

// Line icons (24×24, stroked) for the feature cards, keyed by `features[].icon`.
const ICONS: Record<string, ReactNode> = {
  live: (
    <>
      <circle cx="12" cy="12" r="2" />
      <path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8" />
    </>
  ),
  play: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m10 9 5 3-5 3Z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  bell: (
    <>
      <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a2 2 0 0 0 3.4 0" />
    </>
  ),
  wallet: (
    <>
      <path d="M3 7a2 2 0 0 1 2-2h13v4" />
      <path d="M3 7v10a2 2 0 0 0 2 2h15V9H5a2 2 0 0 1-2-2Z" />
      <circle cx="16" cy="14" r="1" />
    </>
  ),
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.6l6.2-.9Z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
};

function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {ICONS[name]}
    </svg>
  );
}

function Check() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-1 size-4 shrink-0 text-sky" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

/** A drawn phone showing a student's lesson page as class starts, in the app's own warm palette. */
function PhoneMock({ m }: { m: Content["mock"] }) {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[19rem] select-none">
      <div className="absolute inset-x-6 -bottom-6 top-10 rounded-full bg-sky/25 blur-3xl" />
      <div className="relative rotate-2 rounded-[2.75rem] border border-line bg-navy-deep p-2.5 shadow-2xl shadow-black/50">
        <div className="overflow-hidden rounded-[2.2rem] bg-[#1c1613] px-5 pt-8 pb-7 text-[#f3ebe0]">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="flex items-center gap-1 rounded-full bg-[#d8443a] px-2 py-0.5 font-medium text-white">
              <span className="size-1.5 animate-pulse rounded-full bg-white" />
              {m.live}
            </span>
            <span className="text-[#f3ebe0]/55">{m.course}</span>
          </div>
          <p className="mt-4 font-serif text-2xl">{m.lesson}</p>
          <p className="mt-1 text-xs text-[#f3ebe0]/55">{m.time}</p>
          <div className="mt-5 flex gap-1 text-[11px]">
            {m.tabs.map((tab, i) => (
              <span key={tab} className={`rounded-md px-2.5 py-1.5 ${i === 0 ? "bg-[#f3ebe0] text-[#1c1613]" : "text-[#f3ebe0]/55"}`}>
                {tab}
              </span>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-7 text-center">
            <span className="mx-auto grid size-10 place-items-center rounded-full bg-[#d8443a]/15 text-[#ef6b61]">
              <Icon name="live" className="size-5" />
            </span>
            <p className="mt-3 font-serif text-lg">{m.started}</p>
            <p className="mt-1 text-[11px] text-[#f3ebe0]/55">{m.hint}</p>
            <span className="mt-4 inline-block rounded-lg bg-[#d8443a] px-7 py-2 text-sm font-medium text-white">{m.join}</span>
          </div>
        </div>
      </div>
      {/* The notification students get as class starts */}
      <div className="absolute -bottom-6 -left-6 flex -rotate-2 items-center gap-3 rounded-2xl border border-line bg-navy-raised/95 py-3 pr-5 pl-3 shadow-xl shadow-black/40 backdrop-blur sm:-left-14">
        <span className="grid size-9 place-items-center rounded-xl bg-sky text-navy">
          <Icon name="bell" className="size-5" />
        </span>
        <span className="text-left">
          <span className="block text-sm font-semibold text-ink">{m.toastTitle}</span>
          <span className="block text-xs text-ink-soft">{m.toastBody}</span>
        </span>
      </div>
    </div>
  );
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <>
      <p className="font-mono text-xs tracking-[0.2em] text-sky uppercase">{label}</p>
      <Reveal as="h2" className="mt-5 max-w-3xl text-3xl leading-tight font-semibold tracking-tight md:text-5xl">
        {title}
      </Reveal>
    </>
  );
}

// Product page for our academy platform (linked from the projects page).
export default async function AcademyPage({ params }: PageProps<"/[lang]/projects/academy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang).academyPage;
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pt-[calc(7.5rem+env(safe-area-inset-top))] pb-24 md:pt-44 md:pb-32">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[70rem] -translate-x-1/2 rounded-full bg-sky/10 blur-[140px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-sky uppercase md:text-sm">
              <span className="size-2 rounded-full bg-sky shadow-[0_0_12px_var(--sky)]" />
              {t.eyebrow}
            </p>
            <Reveal as="h1" immediate mode="words" className="mt-8 text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.98] font-semibold tracking-[-0.04em]">
              {t.title}
            </Reveal>
            <Reveal as="p" mode="fade" immediate delay={0.3} className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
              {t.lead}
            </Reveal>
            <Reveal mode="fade" immediate delay={0.45} className="mt-10 grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
              <Magnetic className="w-full sm:w-auto">
                <Link
                  href={localize(lang, "/contact")}
                  className="focus-ring group flex items-center justify-between gap-3 rounded-full bg-sky py-3.5 pr-3.5 pl-7 text-lg font-semibold text-navy transition-colors hover:bg-sky-bright"
                >
                  {t.primaryCta}
                  <span className="grid size-9 place-items-center rounded-full bg-navy text-sky transition-transform duration-500 group-hover:rotate-45">↗</span>
                </Link>
              </Magnetic>
              <a
                href="#how"
                className="focus-ring rounded-full border border-line px-6 py-4 text-center text-lg text-ink-soft transition-colors hover:border-sky hover:text-ink"
              >
                {t.secondaryCta}
              </a>
            </Reveal>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
              {t.trust.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <Reveal mode="fade" immediate delay={0.2} className="px-6 sm:px-0">
            <PhoneMock m={t.mock} />
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-24 bg-navy pb-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeading label={t.featuresLabel} title={t.featuresTitle} />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
            {t.features.map((f, i) => (
              <Reveal key={f.title} mode="fade" delay={(i % 4) * 0.05} className="h-full">
                <SpotlightCard className="h-full p-6 md:p-7">
                  <span className="grid size-11 place-items-center rounded-xl bg-sky/10 text-sky">
                    <Icon name={f.icon} className="size-5" />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{f.body}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="scroll-mt-24 border-y border-line bg-navy-deep py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeading label={t.stepsLabel} title={t.stepsTitle} />
          <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {t.steps.map((s, i) => (
              <Reveal as="li" key={s.title} mode="fade" delay={i * 0.08}>
                <div className="flex items-center gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border border-sky/50 font-mono text-sky">{i + 1}</span>
                  <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-line to-transparent" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 max-w-sm leading-relaxed text-ink-soft">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* For the academy / for students */}
      <section className="bg-navy py-28">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 md:grid-cols-2 md:gap-5 md:px-10">
          {t.audiences.map((a, i) => (
            <Reveal key={a.label} mode="fade" delay={i * 0.08} className="h-full">
              <SpotlightCard className="h-full p-8 md:p-10">
                <p className="font-mono text-xs tracking-[0.2em] text-sky uppercase">{a.label}</p>
                <h2 className="mt-5 text-2xl leading-tight font-semibold tracking-tight md:text-3xl">{a.title}</h2>
                <ul className="mt-8 grid gap-3">
                  {a.points.map((p) => (
                    <li key={p} className="flex gap-3 leading-relaxed text-ink-soft">
                      <Check />
                      {p}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-navy pb-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading label={t.faqLabel} title={t.faqTitle} />
          </div>
          <div className="border-t border-line">
            {t.faq.map((item) => (
              <details key={item.q} className="group border-b border-line">
                <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span aria-hidden="true" className="text-2xl leading-none text-sky transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 leading-relaxed text-ink-soft">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CallToAction title={t.ctaTitle} body={t.ctaBody} />
    </>
  );
}

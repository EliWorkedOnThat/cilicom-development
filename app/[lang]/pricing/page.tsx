import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/src/components/PageHeader";
import SpotlightCard from "@/src/components/SpotlightCard";
import Reveal from "@/src/components/Reveal";
import CallToAction from "@/src/components/CallToAction";
import { notFound } from "next/navigation";
import { getDictionary } from "@/src/i18n/dictionaries";
import { hasLocale, localize } from "@/src/i18n/config";

export async function generateMetadata({ params }: PageProps<"/[lang]/pricing">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).pricingPage;
  return { title: t.metaTitle, description: t.metaDescription };
}

// The middle model is the highlighted one
const FEATURED = 1;

export default async function PricingPage({ params }: PageProps<"/[lang]/pricing">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.pricingPage;
  return (
    <>
      <PageHeader
        label={t.label}
        title={t.title}
        intro={t.intro}
      />

      <section className="bg-navy pb-28">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 md:px-10 lg:grid-cols-3 lg:gap-5">
          {t.models.map((m, i) => (
            <Reveal key={m.name} mode="fade" delay={i * 0.08} className="h-full">
              <SpotlightCard className={`h-full p-8 md:p-10 ${i === FEATURED ? "border-sky/60 bg-navy-raised/70" : ""}`}>
                <div className="flex h-7 items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.15em] text-sky uppercase">{m.tag}</span>
                  {i === FEATURED && (
                    <span className="rounded-full bg-sky px-3 py-1 font-mono text-[0.7rem] text-navy">{t.featured}</span>
                  )}
                </div>
                <h2 className="mt-10 text-4xl font-semibold tracking-tight">{m.name}</h2>
                <p className="mt-3 leading-relaxed text-ink-soft">{m.body}</p>
                <ul className="mt-8 mb-10 space-y-3 border-t border-line pt-8">
                  {m.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-sky" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={localize(lang, "/contact")}
                  className={`focus-ring mt-auto inline-flex w-full justify-center rounded-full py-3.5 font-semibold transition-colors ${
                    i === FEATURED ? "bg-sky text-navy hover:bg-sky-bright" : "border border-line hover:border-sky hover:text-sky"
                  }`}
                >
                  {t.request}
                </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-navy-deep py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal as="h2" className="text-4xl leading-[1.02] font-semibold tracking-[-0.03em] md:text-5xl">
            {t.faqTitle}
          </Reveal>
          <div className="border-t border-line">
            {t.faqs.map((f) => (
              <details key={f.q} className="group border-b border-line">
                <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-xl font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-sky transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 text-lg leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}

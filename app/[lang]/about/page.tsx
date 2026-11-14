import type { Metadata } from "next";
import PageHeader from "@/src/components/PageHeader";
import Reveal from "@/src/components/Reveal";
import Principles from "@/src/components/home/Principles";
import CallToAction from "@/src/components/CallToAction";
import { notFound } from "next/navigation";
import { getDictionary } from "@/src/i18n/dictionaries";
import { hasLocale } from "@/src/i18n/config";
import { pageAlternates } from "@/src/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).aboutPage;
  return { title: t.metaTitle, description: t.metaDescription, alternates: pageAlternates(lang, "/about") };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.aboutPage;
  return (
    <>
      <PageHeader
        label={t.label}
        title={t.title}
      />

      <section className="bg-navy pb-28 md:pb-40">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Logo, set large as a brand plate */}
          <Reveal mode="fade" className="relative grid aspect-square place-items-center overflow-hidden rounded-3xl border border-line bg-navy">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(49,169,255,0.18),transparent_60%)]" />
            <p className="relative text-[clamp(3.5rem,10vw,8rem)] font-bold tracking-[-0.05em] lowercase">
              <span>cili</span>
              <span className="text-sky">com</span>
            </p>
          </Reveal>

          <div className="space-y-8 text-xl leading-relaxed text-ink-soft md:text-2xl">
            <Reveal as="p" mode="fade">
              <span className="text-ink">cilicom</span> {t.paragraphs[0]}
            </Reveal>
            <Reveal as="p" mode="fade">
              {t.paragraphs[1]}
            </Reveal>
            <Reveal as="p" mode="fade">
              {t.paragraphs[2]}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-navy py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <p className="font-mono text-xs tracking-[0.2em] text-sky uppercase">{t.beliefsTitle}</p>
          <div className="mt-12 grid gap-12 md:grid-cols-3">
            {t.beliefs.map((b) => (
              <div key={b.title}>
                <Reveal as="h2" className="text-3xl leading-tight font-semibold tracking-tight">
                  {b.title}
                </Reveal>
                <p className="mt-4 text-lg leading-relaxed text-ink-soft">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Principles t={dict.home.principles} />
      <CallToAction />
    </>
  );
}

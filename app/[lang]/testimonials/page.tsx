import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/src/components/PageHeader";
import SpotlightCard from "@/src/components/SpotlightCard";
import Reveal from "@/src/components/Reveal";
import CallToAction from "@/src/components/CallToAction";
import { EMAIL } from "@/src/content/contact";
import { getDictionary } from "@/src/i18n/dictionaries";
import { hasLocale } from "@/src/i18n/config";
import { pageAlternates } from "@/src/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/testimonials">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).testimonialsPage;
  return { title: t.metaTitle, description: t.metaDescription, alternates: pageAlternates(lang, "/testimonials") };
}

export default async function TestimonialsPage({ params }: PageProps<"/[lang]/testimonials">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang).testimonialsPage;

  return (
    <>
      <PageHeader label={t.label} title={t.title} intro={t.intro} />

      <section className="bg-navy pb-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          {t.items.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 md:gap-5">
              {t.items.map((item, i) => (
                <Reveal key={item.name} mode="fade" delay={(i % 2) * 0.06} className="h-full">
                  <SpotlightCard className="h-full p-8 md:p-10">
                    <figure className="flex h-full flex-col">
                      <span aria-hidden="true" className="text-5xl leading-none font-semibold text-sky">
                        “
                      </span>
                      <blockquote className="mt-4 text-xl leading-snug font-medium tracking-tight md:text-2xl">{item.quote}</blockquote>
                      <figcaption className="mt-auto pt-8">
                        <p className="font-semibold">{item.name}</p>
                        <p className="mt-1 font-mono text-xs tracking-[0.15em] text-ink-mute uppercase">{item.role}</p>
                      </figcaption>
                    </figure>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal mode="fade">
              <SpotlightCard className="p-8 md:p-14">
                <h2 className="max-w-2xl text-3xl leading-tight font-semibold tracking-tight md:text-4xl">{t.emptyTitle}</h2>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">{t.emptyBody}</p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="focus-ring mt-8 inline-block self-start rounded-full bg-sky px-6 py-3 font-semibold text-navy transition-colors hover:bg-sky-bright"
                >
                  {t.emptyButton}
                </a>
              </SpotlightCard>
            </Reveal>
          )}
        </div>
      </section>

      <CallToAction title={t.ctaTitle} />
    </>
  );
}

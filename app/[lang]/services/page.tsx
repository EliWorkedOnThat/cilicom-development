import type { Metadata } from "next";
import PageHeader from "@/src/components/PageHeader";
import ServiceGlyph from "@/src/components/ServiceGlyph";
import Reveal from "@/src/components/Reveal";
import CallToAction from "@/src/components/CallToAction";
import { notFound } from "next/navigation";
import { getDictionary } from "@/src/i18n/dictionaries";
import { hasLocale } from "@/src/i18n/config";
import { pageAlternates } from "@/src/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).servicesPage;
  return { title: t.metaTitle, description: t.metaDescription, alternates: pageAlternates(lang, "/services") };
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.servicesPage;
  const services = dict.services;
  return (
    <>
      <PageHeader
        label={t.label}
        title={t.title}
        intro={t.intro}
      />

      <section className="bg-navy pb-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          {/* Quick index */}
          <nav aria-label={t.indexLabel} className="mb-16 flex flex-wrap gap-2">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="focus-ring rounded-full border border-line px-4 py-2 font-mono text-xs text-ink-soft transition-colors hover:border-sky hover:text-sky"
              >
                {s.title}
              </a>
            ))}
          </nav>

          <div className="border-t border-line">
            {services.map((s, i) => (
              <article
                key={s.id}
                id={s.id}
                className="group grid scroll-mt-28 gap-8 border-b border-line py-14 md:grid-cols-[5rem_1fr_1fr] md:py-20 lg:grid-cols-[6rem_1.1fr_1fr_14rem]"
              >
                <div className="flex items-center justify-between md:block">
                  <span className="font-mono text-sm text-ink-mute transition-colors group-hover:text-sky">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ServiceGlyph id={s.id} className="h-14 w-auto opacity-80 md:hidden" />
                </div>
                <div>
                  <Reveal as="h2" className="text-3xl leading-tight font-semibold tracking-tight md:text-5xl">
                    {s.title}
                  </Reveal>
                  <p className="mt-4 text-lg text-sky">{s.short}</p>
                </div>
                <div>
                  <p className="text-lg leading-relaxed text-ink-soft">{s.long}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.examples.map((e) => (
                      <li key={e} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-ink-soft">
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
                <ServiceGlyph
                  id={s.id}
                  className="hidden h-32 w-auto opacity-60 transition-opacity duration-500 group-hover:opacity-100 lg:block"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <CallToAction title={t.ctaTitle} body={t.ctaBody} />
    </>
  );
}

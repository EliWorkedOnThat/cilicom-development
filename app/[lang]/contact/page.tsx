import type { Metadata } from "next";
import ContactHero from "@/src/components/contact/ContactHero";
import ContactForm from "@/src/components/ContactForm";
import Reveal from "@/src/components/Reveal";
import { notFound } from "next/navigation";
import { getDictionary } from "@/src/i18n/dictionaries";
import { hasLocale } from "@/src/i18n/config";
import { pageAlternates } from "@/src/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).contactPage;
  return { title: t.metaTitle, description: t.metaDescription, alternates: pageAlternates(lang, "/contact") };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.contactPage;
  return (
    <>
      <ContactHero />

      <section id="brief" className="scroll-mt-20 bg-navy pt-12 pb-28 md:pb-36">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-sky uppercase">{t.briefEyebrow}</p>
              <Reveal as="h2" className="mt-4 max-w-2xl text-4xl leading-[1.02] font-semibold tracking-[-0.03em] md:text-6xl">
                {t.briefTitle}
              </Reveal>
            </div>
            <p className="max-w-sm text-lg leading-relaxed text-ink-soft">
              {t.briefBody}
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="border-t border-line bg-navy-deep py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <p className="font-mono text-xs tracking-[0.2em] text-sky uppercase">{t.nextTitle}</p>
          <div className="relative mt-14">
            <div aria-hidden="true" className="absolute top-[1.375rem] right-0 left-0 hidden h-px bg-linear-to-r from-sky via-line to-line md:block" />
            <ol className="relative grid gap-12 md:grid-cols-3 md:gap-8">
              {t.next.map((s, i) => (
                <li key={s.title}>
                  <span className="grid size-11 place-items-center rounded-full border border-sky bg-navy-deep font-mono text-sm text-sky">
                    0{i + 1}
                  </span>
                  <Reveal as="h3" className="mt-7 text-2xl font-semibold tracking-tight md:text-3xl">
                    {s.title}
                  </Reveal>
                  <p className="mt-3 max-w-xs text-lg leading-relaxed text-ink-soft">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}

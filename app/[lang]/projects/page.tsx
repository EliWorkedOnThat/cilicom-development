import type { Metadata } from "next";
import PageHeader from "@/src/components/PageHeader";
import SpotlightCard from "@/src/components/SpotlightCard";
import Reveal from "@/src/components/Reveal";
import CallToAction from "@/src/components/CallToAction";
import { notFound } from "next/navigation";
import { getDictionary } from "@/src/i18n/dictionaries";
import { hasLocale } from "@/src/i18n/config";

export async function generateMetadata({ params }: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).projectsPage;
  return { title: t.metaTitle, description: t.metaDescription };
}

// Card widths for the bento grid, in the same order as the ideas in the dictionary.
// Replace the ideas with real case studies as they're published.
const spans = ["md:col-span-2", "", "", "md:col-span-2", "", "", ""];

export default async function ProjectsPage({ params }: PageProps<"/[lang]/projects">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.projectsPage;
  return (
    <>
      <PageHeader
        label={t.label}
        title={t.title}
        intro={t.intro}
      />

      <section className="bg-navy pb-28">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 md:grid-cols-3 md:gap-5 md:px-10">
          {t.ideas.map((p, i) => (
            <Reveal key={p.title} mode="fade" delay={(i % 3) * 0.06} className={`h-full ${spans[i] ?? ""}`}>
              <SpotlightCard className="h-full p-8 md:p-10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.15em] text-sky uppercase">{p.sector}</span>
                  <span className="font-mono text-xs text-ink-mute">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h2 className="mt-16 text-2xl leading-tight font-semibold tracking-tight md:text-3xl">{p.title}</h2>
                <p className="mt-3 max-w-lg leading-relaxed text-ink-soft">{p.body}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-8">
                  {p.stack.map((s) => (
                    <li key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-ink-soft">
                      {s}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      <CallToAction title={t.ctaTitle} />
    </>
  );
}

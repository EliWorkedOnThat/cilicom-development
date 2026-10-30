import type { Metadata } from "next";
import PageHeader from "@/src/components/PageHeader";
import Reveal from "@/src/components/Reveal";
import Principles from "@/src/components/home/Principles";
import CallToAction from "@/src/components/CallToAction";

export const metadata: Metadata = {
  title: "Rreth nesh",
  description: "cilicom është një studio softueri që ndërton teknologji të personalizuar për biznese.",
};

const beliefs = [
  ["Thjeshtësia fiton.", "Softueri më i mirë është ai që ekipi juaj e përdor pa e menduar dy herë."],
  ["Teknologjia është mjet.", "Na intereson rezultati për biznesin tuaj, jo të përdorim mjetin më të ri."],
  ["Marrëdhënie, jo transaksion.", "Projekti mbaron, bashkëpunimi vazhdon. Ndërtojmë që të rritemi bashkë."],
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="Rreth nesh"
        title="Ndërtojmë softuerin që do të donim të përdornim vetë."
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
              <span className="text-ink">cilicom</span> është një studio softueri që ndihmon bizneset të punojnë
              më shpejt, më zgjuar dhe me më pak punë manuale.
            </Reveal>
            <Reveal as="p" mode="fade">
              Ndërtojmë sisteme menaxhimi, automatizime, aplikacione web dhe zgjidhje me inteligjencë artificiale,
              gjithmonë të projektuara rreth mënyrës si punon klienti ynë.
            </Reveal>
            <Reveal as="p" mode="fade">
              Nuk shesim paketa të gatshme. Dëgjojmë, kuptojmë problemin dhe ndërtojmë pikërisht atë që duhet, pastaj
              qëndrojmë pranë që gjithçka të vazhdojë të funksionojë.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-navy py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <p className="font-mono text-xs tracking-[0.2em] text-sky uppercase">Çfarë besojmë</p>
          <div className="mt-12 grid gap-12 md:grid-cols-3">
            {beliefs.map(([t, b]) => (
              <div key={t}>
                <Reveal as="h2" className="text-3xl leading-tight font-semibold tracking-tight">
                  {t}
                </Reveal>
                <p className="mt-4 text-lg leading-relaxed text-ink-soft">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Principles />
      <CallToAction />
    </>
  );
}

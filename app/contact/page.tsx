import type { Metadata } from "next";
import ContactHero from "@/src/components/contact/ContactHero";
import ContactForm from "@/src/components/ContactForm";
import Reveal from "@/src/components/Reveal";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Na tregoni për projektin tuaj. Biseda e parë është falas.",
};

const next = [
  { title: "Lexojmë brief-in", body: "E shqyrtojmë me kujdes dhe, nëse duhet, ju bëjmë disa pyetje sqaruese." },
  { title: "Bisedojmë", body: "Një takim i shkurtër, online ose fizik, për të kuptuar mirë nevojat tuaja." },
  { title: "Merrni propozimin", body: "Një plan i qartë me zgjidhjen, afatin dhe koston, pa asnjë detyrim." },
];

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section id="brief" className="scroll-mt-20 bg-navy pt-12 pb-28 md:pb-36">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-sky uppercase">Brief-i i projektit</p>
              <Reveal as="h2" className="mt-4 max-w-2xl text-4xl leading-[1.02] font-semibold tracking-[-0.03em] md:text-6xl">
                Katër hapa. Dy minuta.
              </Reveal>
            </div>
            <p className="max-w-sm text-lg leading-relaxed text-ink-soft">
              Sa më shumë na tregoni, aq më e saktë do të jetë përgjigja jonë.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="border-t border-line bg-navy-deep py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <p className="font-mono text-xs tracking-[0.2em] text-sky uppercase">Çfarë ndodh më pas</p>
          <div className="relative mt-14">
            <div aria-hidden="true" className="absolute top-[1.375rem] right-0 left-0 hidden h-px bg-linear-to-r from-sky via-line to-line md:block" />
            <ol className="relative grid gap-12 md:grid-cols-3 md:gap-8">
              {next.map((s, i) => (
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

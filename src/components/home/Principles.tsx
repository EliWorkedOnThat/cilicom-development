import Reveal from "../Reveal";
import SpotlightCard from "../SpotlightCard";

export const principles = [
  {
    k: "01",
    title: "Një ekip, nga fillimi në fund",
    body: "I njëjti ekip që ju dëgjon, e projekton, e ndërton dhe e mirëmban. Asnjë informacion nuk humbet rrugës.",
  },
  {
    k: "02",
    title: "Kodi është i juaji",
    body: "Gjithçka që ndërtojmë ju përket. Pa varësi të fshehura, pa licenca që ju mbajnë peng.",
  },
  {
    k: "03",
    title: "Flasim gjuhën tuaj",
    body: "Shpjegojmë gjithçka qartë, në shqip, pa zhargon teknik. Ju vendosni, ne zbatojmë.",
  },
  {
    k: "04",
    title: "Teknologji që zgjat",
    body: "Përdorim mjete moderne dhe të provuara, që sistemi juaj të jetë i shpejtë sot dhe i lehtë për t'u zgjeruar nesër.",
  },
];

export default function Principles() {
  return (
    <section className="bg-navy-deep py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <p className="font-mono text-xs tracking-[0.2em] text-sky uppercase">04 — Pse cilicom</p>
        <Reveal as="h2" className="mt-4 max-w-3xl text-4xl leading-[1.02] font-semibold tracking-[-0.03em] md:text-6xl">
          Partner teknologjik, jo thjesht një furnizues.
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-2 md:gap-5">
          {principles.map((p, i) => (
            <Reveal key={p.k} mode="fade" delay={i * 0.06} className="h-full">
              <SpotlightCard className="h-full p-8 md:p-10">
                <span className="font-mono text-sm text-sky">{p.k}</span>
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

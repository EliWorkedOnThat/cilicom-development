import type { Metadata } from "next";
import PageHeader from "@/src/components/PageHeader";
import SpotlightCard from "@/src/components/SpotlightCard";
import Reveal from "@/src/components/Reveal";
import CallToAction from "@/src/components/CallToAction";

export const metadata: Metadata = {
  title: "Projektet",
  description: "Shembuj të zgjidhjeve që cilicom ndërton për biznese të ndryshme.",
};

// Typical builds by industry. Replace with real case studies as they're published.
const ideas = [
  {
    sector: "Shëndetësi",
    title: "Klinikë pa radhë në telefon",
    body: "Rezervime online, kartela elektronike pacientësh dhe kujtesa automatike me SMS para çdo takimi.",
    stack: ["Rezervime", "Kartela", "Njoftime"],
    span: "md:col-span-2",
  },
  {
    sector: "Tregti & logjistikë",
    title: "Magazinë që numërohet vetë",
    body: "Stok në kohë reale, porosi automatike kur malli bie nën minimum dhe raporte ditore për pronarin.",
    stack: ["Inventar", "Automatizim", "Raporte"],
    span: "",
  },
  {
    sector: "Shërbime profesionale",
    title: "Asistent AI mbi kontratat",
    body: "Pyesni në shqip për çdo kontratë apo dokument dhe merrni përgjigjen me referencën e saktë.",
    stack: ["LLM", "Kërkim semantik", "Siguri"],
    span: "",
  },
  {
    sector: "Turizëm & restorante",
    title: "Nga porosia te kuzhina, pa letra",
    body: "Menu dixhitale, porosi nga tavolina, ekran për kuzhinën dhe raport i shitjeve në fund të ditës.",
    stack: ["Web app", "Tablet", "Dashboard"],
    span: "md:col-span-2",
  },
  {
    sector: "Prodhim",
    title: "Linja e prodhimit në një ekran",
    body: "Ndjekje e porosive nëpër faza, kohë të humbura, cilësi dhe performanca e turneve.",
    stack: ["Sistem menaxhimi", "IoT", "Analitikë"],
    span: "",
  },
  {
    sector: "Startup",
    title: "Nga skica te MVP në javë, jo muaj",
    body: "Prototip që e testoni me klientë të vërtetë, pastaj produkti i parë gati për lançim.",
    stack: ["Prototip", "MVP", "Lançim"],
    span: "",
  },
  {
    sector: "Arsim",
    title: "Portal për studentë dhe mësues",
    body: "Regjistrime, orare, materiale mësimore dhe pagesa në një platformë të vetme.",
    stack: ["Portal", "Pagesa", "Role"],
    span: "",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        label="Projektet"
        title="Çfarë ndërtojmë, në praktikë."
        intro="Disa shembuj tipikë të zgjidhjeve që ndërtojmë për sektorë të ndryshëm. Studimet e plota të rasteve po vijnë së shpejti."
      />

      <section className="bg-navy pb-28">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 md:grid-cols-3 md:gap-5 md:px-10">
          {ideas.map((p, i) => (
            <Reveal key={p.title} mode="fade" delay={(i % 3) * 0.06} className={`h-full ${p.span}`}>
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

      <CallToAction title="Projekti juaj mund të jetë i radhës." />
    </>
  );
}

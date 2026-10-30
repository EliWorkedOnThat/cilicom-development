import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/src/components/PageHeader";
import SpotlightCard from "@/src/components/SpotlightCard";
import Reveal from "@/src/components/Reveal";
import CallToAction from "@/src/components/CallToAction";

export const metadata: Metadata = {
  title: "Bashkëpunimi",
  description: "Si punojmë dhe si e caktojmë koston: projekte me çmim fiks, partneritet mujor dhe mirëmbajtje.",
};

const models = [
  {
    name: "Projekt",
    tag: "Çmim fiks",
    body: "Për një produkt me objektiv të qartë: një sistem, një aplikacion, një faqe.",
    points: ["Analizë dhe prototip para ofertës", "Çmim dhe afat i fiksuar me shkrim", "Demo çdo javë", "30 ditë suport pas lançimit"],
    featured: false,
  },
  {
    name: "Partneritet",
    tag: "Mujor",
    body: "Për biznese që duan një ekip teknologjik të dedikuar pa e punësuar vetë.",
    points: ["Orë të rezervuara çdo muaj", "Prioritet në zhvillim", "Planifikim i përbashkët i rrugës", "Raport mujor i punës"],
    featured: true,
  },
  {
    name: "Mirëmbajtje",
    tag: "Abonim",
    body: "Për sistemet që janë tashmë në punë, të ndërtuara nga ne ose nga të tjerë.",
    points: ["Monitorim dhe backup", "Përditësime sigurie", "Rregullime të shpejta", "Kohë përgjigjeje e garantuar"],
    featured: false,
  },
];

const faqs = [
  {
    q: "Sa kushton një projekt?",
    a: "Varet nga madhësia dhe kompleksiteti. Pas një bisede të parë falas, ju dërgojmë një ofertë të detajuar me çmim fiks, kështu që e dini koston para se të nisim.",
  },
  {
    q: "Sa kohë zgjat?",
    a: "Një prototip zakonisht gati brenda 1–2 javësh. Një version i parë funksional, zakonisht brenda 4–10 javësh, në varësi të projektit.",
  },
  {
    q: "Kujt i përket kodi?",
    a: "Juve. Pas pagesës, kodi, të dhënat dhe dokumentimi janë plotësisht pronë e juaja.",
  },
  {
    q: "A mund të marrim përsipër një sistem ekzistues?",
    a: "Po. Fillojmë me një auditim të shkurtër, pastaj propozojmë si ta stabilizojmë, mirëmbajmë ose përmirësojmë.",
  },
  {
    q: "A punoni me klientë jashtë Shqipërisë?",
    a: "Po. Punojmë në distancë me klientë kudo dhe komunikojmë në shqip ose anglisht.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        label="Bashkëpunimi"
        title="Mënyra të qarta për të punuar bashkë."
        intro="Asnjë kosto e fshehur. Para se të fillojmë, e dini saktësisht çfarë merrni, kur dhe me çfarë çmimi."
      />

      <section className="bg-navy pb-28">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 md:px-10 lg:grid-cols-3 lg:gap-5">
          {models.map((m, i) => (
            <Reveal key={m.name} mode="fade" delay={i * 0.08} className="h-full">
              <SpotlightCard className={`h-full p-8 md:p-10 ${m.featured ? "border-sky/60 bg-navy-raised/70" : ""}`}>
                <div className="flex h-7 items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.15em] text-sky uppercase">{m.tag}</span>
                  {m.featured && (
                    <span className="rounded-full bg-sky px-3 py-1 font-mono text-[0.7rem] text-navy">Më i zgjedhuri</span>
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
                  href="/contact"
                  className={`focus-ring mt-auto inline-flex w-full justify-center rounded-full py-3.5 font-semibold transition-colors ${
                    m.featured ? "bg-sky text-navy hover:bg-sky-bright" : "border border-line hover:border-sky hover:text-sky"
                  }`}
                >
                  Kërkoni ofertë
                </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-navy-deep py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal as="h2" className="text-4xl leading-[1.02] font-semibold tracking-[-0.03em] md:text-5xl">
            Pyetje të shpeshta
          </Reveal>
          <div className="border-t border-line">
            {faqs.map((f) => (
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

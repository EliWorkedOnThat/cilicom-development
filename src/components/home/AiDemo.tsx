"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import Reveal from "../Reveal";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const question = "Sa fatura janë ende të papaguara këtë muaj?";
const tools = ["kërkoj te sistemi i faturimit…", "filtroj: statusi = e papaguar, muaji = tetor", "llogaris totalin dhe afatet…"];
const answer =
  "Keni 12 fatura të papaguara, gjithsej 8,430 €. Tre prej tyre e kanë kaluar afatin. Dëshironi që t'u dërgoj klientëve një kujtesë?";

const capabilities = [
  { title: "Asistentë mbi të dhënat tuaja", body: "Pyetni sistemin në shqip dhe merrni përgjigje nga faturat, kontratat dhe raportet tuaja." },
  { title: "Nxjerrje automatike", body: "Faturat, formularët dhe email-et kthehen vetë në të dhëna të strukturuara." },
  { title: "Agjentë që veprojnë", body: "Jo vetëm përgjigje: AI dërgon kujtesa, plotëson regjistra dhe ju njofton kur duhet." },
];

export default function AiDemo() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const q = root.current!.querySelector(".ai-q")!;
      const a = root.current!.querySelector(".ai-a")!;

      if (reduce) {
        q.textContent = question;
        a.textContent = answer;
        gsap.set(".ai-tool, .ai-answer, .ai-actions", { autoAlpha: 1 });
        return;
      }

      gsap
        .timeline({ scrollTrigger: { trigger: ".ai-window", start: "top 70%", toggleActions: "restart none none reset" } })
        .to(q, { text: question, duration: question.length * 0.035, ease: "none" })
        .fromTo(".ai-tool", { x: -8 }, { autoAlpha: 1, x: 0, duration: 0.4, stagger: 0.55, ease: "power2.out" }, "+=0.3")
        .fromTo(".ai-answer", { y: 8 }, { autoAlpha: 1, y: 0, duration: 0.5 }, "+=0.4")
        .to(a, { text: answer, duration: answer.length * 0.02, ease: "none" })
        .fromTo(".ai-actions", { y: 8 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "expo.out" });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-navy py-28 md:py-40">
      {/* Soft sky glow behind the window */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[42%] right-[-6%] size-[42vw] -translate-y-1/2 rounded-full bg-sky/10 blur-[120px]"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-10 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-sky uppercase">03 — AI & LLM</p>
          <Reveal as="h2" className="mt-4 text-4xl leading-[1.02] font-semibold tracking-[-0.03em] md:text-6xl">
            AI që e njeh biznesin tuaj.
          </Reveal>
          <Reveal as="p" mode="fade" className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            Lidhim modelet më të avancuara të gjuhës me sistemet tuaja, në mënyrë të sigurt dhe nën kontrollin tuaj.
          </Reveal>
          <ul className="mt-10 space-y-6">
            {capabilities.map((c) => (
              <li key={c.title} className="flex gap-4">
                <span className="mt-2.5 size-2 shrink-0 rounded-full bg-sky" />
                <div>
                  <h3 className="text-lg font-semibold">{c.title}</h3>
                  <p className="mt-1 leading-relaxed text-ink-soft">{c.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="ai-window overflow-hidden rounded-3xl border border-line bg-navy-deep/80 shadow-[0_40px_120px_-40px_rgba(49,169,255,0.35)] backdrop-blur">
          <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-line" />
              <span className="size-2.5 rounded-full bg-line" />
              <span className="size-2.5 rounded-full bg-sky" />
            </div>
            <span className="font-mono text-xs text-ink-mute">asistenti · demo</span>
          </div>

          <div className="min-h-[26rem] space-y-5 p-6 font-mono text-sm md:p-8">
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-sky px-4 py-3 text-navy">
              <span className="ai-q" />
              <span aria-hidden="true">&#8203;</span>
            </div>

            <div className="space-y-2">
              {tools.map((t) => (
                <p key={t} className="ai-tool invisible flex items-center gap-2 text-ink-mute">
                  <span className="text-sky">⟶</span> {t}
                </p>
              ))}
            </div>

            <div className="ai-answer invisible max-w-[90%] rounded-2xl rounded-tl-sm border border-line bg-navy-raised/60 px-4 py-3 leading-relaxed text-ink">
              <span className="ai-a" />
              <span aria-hidden="true">&#8203;</span>
            </div>

            <div className="ai-actions invisible flex gap-2">
              <span className="rounded-full bg-sky/15 px-3 py-1.5 text-xs text-sky">Po, dërgo kujtesat</span>
              <span className="rounded-full border border-line px-3 py-1.5 text-xs text-ink-soft">Shfaq listën</span>
            </div>
          </div>
        </div>
      </div>
      <p className="relative mx-auto mt-6 max-w-7xl px-5 text-right font-mono text-xs text-ink-mute md:px-10">
        * Shembull ilustrues i një asistenti që ndërtojmë.
      </p>
    </section>
  );
}

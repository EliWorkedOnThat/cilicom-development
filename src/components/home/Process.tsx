"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Reveal from "../Reveal";

gsap.registerPlugin(ScrollTrigger);

export const steps = [
  {
    title: "Dëgjojmë",
    body: "Fillojmë me një bisedë: si punoni sot, ku humbet koha, çfarë do të thotë sukses për ju.",
    out: "Përmbledhje e problemit & objektivave",
  },
  {
    title: "Projektojmë",
    body: "Hartojmë zgjidhjen dhe ndërtojmë një prototip që e prekni para se të shkruhet rreshti i parë i kodit.",
    out: "Prototip interaktiv · plan · ofertë e qartë",
  },
  {
    title: "Ndërtojmë",
    body: "Zhvillojmë në cikle të shkurtra. Çdo javë shihni progresin e vërtetë dhe jepni mendimin tuaj.",
    out: "Version funksional, i testuar",
  },
  {
    title: "Lançojmë & kujdesemi",
    body: "E vendosim në punë, trajnojmë ekipin tuaj dhe mbetemi pranë për mirëmbajtje dhe përmirësime.",
    out: "Sistem në punë + suport i vazhdueshëm",
  },
];

export default function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ".process-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".process-list", start: "top 60%", end: "bottom 60%", scrub: true },
        },
      );

      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 60%",
          end: "bottom 60%",
          toggleClass: { targets: step, className: "is-active" },
        });
        gsap.from(step.querySelectorAll(".step-anim"), {
          y: 30,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: step, start: "top 80%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative bg-navy-deep py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="font-mono text-xs tracking-[0.2em] text-sky uppercase">02 — Procesi</p>
          <Reveal as="h2" className="mt-4 text-4xl leading-[1.02] font-semibold tracking-[-0.03em] md:text-6xl">
            Nga një bisedë te një sistem që punon.
          </Reveal>
          <Reveal as="p" mode="fade" className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            Pa surpriza, pa zhargon. Gjithmonë e dini ku ndodhet projekti, sa kushton dhe çfarë vjen më pas.
          </Reveal>
        </div>

        <ol className="process-list relative">
          <div aria-hidden="true" className="absolute top-2 bottom-2 left-[11px] w-px bg-line">
            <div className="process-fill h-full w-px origin-top bg-sky shadow-[0_0_10px_var(--sky)]" />
          </div>
          {steps.map((s, i) => (
            <li key={s.title} className="process-step group relative pb-16 pl-14 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute top-1.5 left-0 grid size-6 place-items-center rounded-full border border-line bg-navy-deep transition-colors duration-500 group-[.is-active]:border-sky"
              >
                <span className="size-2 rounded-full bg-line transition-all duration-500 group-[.is-active]:bg-sky group-[.is-active]:shadow-[0_0_12px_var(--sky)]" />
              </span>
              <p className="step-anim font-mono text-sm text-ink-mute">Hapi {String(i + 1).padStart(2, "0")}</p>
              <h3 className="step-anim mt-2 text-3xl font-semibold tracking-tight text-ink-soft transition-colors duration-500 group-[.is-active]:text-ink md:text-4xl">
                {s.title}
              </h3>
              <p className="step-anim mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">{s.body}</p>
              <p className="step-anim mt-5 inline-flex items-start gap-2 rounded-xl border border-line px-4 py-2 sm:rounded-full sm:py-1.5 font-mono text-xs text-sky">
                → {s.out}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import NetworkCanvas from "../NetworkCanvas";
import Magnetic from "../Magnetic";

gsap.registerPlugin(SplitText, ScrambleTextPlugin, ScrollTrigger);

const rotating = [
  "sisteme menaxhimi",
  "automatizime",
  "aplikacione web",
  "zgjidhje me AI",
  "aplikacione të personalizuara",
  "ide që marrin jetë",
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.set(".hero-fade, .hero-title", { autoAlpha: 1 });
      if (reduce) return;

      const split = SplitText.create(".hero-title", { type: "chars,words,lines", mask: "lines", linesClass: "split-line" });

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(".hero-canvas", { autoAlpha: 0, duration: 2.4, ease: "power2.out" }, 0)
        .from(split.chars, { yPercent: 135, duration: 1.3, stagger: 0.018 }, 0.15)
        .from(".hero-fade", { autoAlpha: 0, y: 24, duration: 1.1, stagger: 0.08 }, 0.7);

      // Cycle the highlighted service with a scramble, terminal style
      const word = root.current!.querySelector(".hero-word")!;
      let i = 0;
      const cycle = gsap.timeline({ repeat: -1, delay: 2 });
      rotating.forEach(() => {
        cycle.to(word, {
          duration: 1.1,
          scrambleText: {
            text: rotating[(i = (i + 1) % rotating.length)],
            chars: "01<>/{}#_",
            speed: 0.6,
          },
          ease: "none",
        });
        cycle.to({}, { duration: 1.8 });
      });

      // Parallax out as the page scrolls past
      gsap.to(".hero-inner", {
        yPercent: -18,
        autoAlpha: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-canvas", {
        scale: 1.15,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex min-h-dvh flex-col overflow-hidden bg-navy">
      <NetworkCanvas className="hero-canvas absolute inset-0 size-full" />
      {/* Fade the network into the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--navy)_85%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-navy" />

      <div className="hero-inner relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pt-[calc(7rem+env(safe-area-inset-top))] pb-14 md:pt-32 md:px-10 md:pb-16">
        <p className="hero-fade invisible mb-8 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-sky uppercase md:text-sm">
          <span className="size-2 rounded-full bg-sky shadow-[0_0_12px_var(--sky)]" />
          Studio softueri · Shqipëri
        </p>

        <h1 className="hero-title invisible max-w-[14ch] text-[clamp(3rem,9.5vw,9.5rem)] leading-[0.92] font-semibold tracking-[-0.045em]">
          Ideja juaj, e kthyer në softuer.
        </h1>

        <div className="mt-10 grid items-end gap-10 md:mt-14 md:grid-cols-[1fr_auto]">
          <div className="hero-fade invisible max-w-xl">
            <p className="font-mono text-sm text-ink-mute">
              ndërtojmë <span className="text-ink-mute">→</span>{" "}
              <span className="block sm:inline">
                <span className="hero-word text-sky">{rotating[0]}</span>
                <span className="caret ml-0.5 text-sky">▍</span>
              </span>
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft md:text-xl">
              Nga sistemet e menaxhimit te automatizimi dhe AI, ndërtojmë
              softuerin që i duhet biznesit tuaj, dhe kujdesemi për të edhe pas lançimit.
            </p>
          </div>

          <div className="hero-fade invisible grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
            <Magnetic className="w-full sm:w-auto">
              <Link
                href="/contact"
                className="focus-ring group flex items-center justify-between gap-3 rounded-full bg-sky py-4 pr-4 pl-7 text-lg font-semibold text-navy transition-colors hover:bg-sky-bright"
              >
                Na tregoni idenë
                <span className="grid size-9 place-items-center rounded-full bg-navy text-sky transition-transform duration-500 group-hover:rotate-45">
                  ↗
                </span>
              </Link>
            </Magnetic>
            <Link
              href="/services"
              className="focus-ring rounded-full border border-line px-6 py-4 text-center text-lg text-ink-soft transition-colors hover:border-sky hover:text-ink"
            >
              Shërbimet
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

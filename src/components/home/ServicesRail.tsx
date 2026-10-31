"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import { services } from "@/src/content/services";
import ServiceGlyph from "../ServiceGlyph";
import Reveal from "../Reveal";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

// Desktop: the section pins and the cards travel sideways as you scroll down.
// Smaller screens: a native swipe carousel with a counter.
export default function ServicesRail() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const onSwipe = () => {
    const el = track.current!;
    const card = el.firstElementChild as HTMLElement;
    setCurrent(Math.round(el.scrollLeft / (card.offsetWidth + 16)));
  };

  const go = (dir: number) => {
    const el = track.current!;
    const card = el.firstElementChild as HTMLElement;
    el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: "smooth" });
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => track.current!.scrollWidth - window.innerWidth;

        const scroll = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".rail-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });

        // Each card's glyph draws in as it slides into view. Cards already on
        // screen before the rail moves draw when the section itself arrives.
        gsap.utils.toArray<HTMLElement>(".rail-card").forEach((card) => {
          const visibleAtStart = card.getBoundingClientRect().left < window.innerWidth * 0.85;
          gsap.from(card.querySelectorAll("path:not([stroke-dasharray]), rect, circle"), {
            drawSVG: 0,
            opacity: 0,
            duration: 0.8,
            stagger: 0.04,
            scrollTrigger: visibleAtStart
              ? { trigger: root.current, start: "top 55%" }
              : { trigger: card, containerAnimation: scroll, start: "left 85%" },
          });
        });
      });

      // Swipe carousel: glyphs draw as each card snaps into view
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".rail-card");
        const shapes = (card: Element) => card.querySelectorAll("path:not([stroke-dasharray]), rect, circle");
        cards.forEach((card) => gsap.set(shapes(card), { drawSVG: 0, opacity: 0 }));
        const io = new IntersectionObserver(
          (entries) =>
            entries.forEach((e) => {
              if (!e.isIntersecting) return;
              gsap.to(shapes(e.target), { drawSVG: "100%", opacity: 1, duration: 0.9, stagger: 0.05, ease: "power2.out" });
              io.unobserve(e.target);
            }),
          { root: track.current, threshold: 0.6 },
        );
        cards.forEach((card) => io.observe(card));
        return () => io.disconnect();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-navy py-24 lg:flex lg:h-dvh lg:flex-col lg:justify-center lg:py-0">
      <div className="mx-auto mb-12 flex w-full max-w-7xl flex-wrap items-end justify-between gap-6 px-5 md:px-10 lg:mb-14">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-sky uppercase">01 — Shërbimet</p>
          <Reveal as="h2" className="mt-4 max-w-2xl text-4xl leading-[1.02] font-semibold tracking-[-0.03em] md:text-6xl">
            Çdo gjë që i duhet biznesit tuaj dixhital.
          </Reveal>
        </div>
        <Link href="/services" className="focus-ring font-mono text-sm text-ink-soft transition-colors hover:text-sky">
          Të gjitha shërbimet →
        </Link>
      </div>

      <div
        ref={track}
        onScroll={onSwipe}
        className="no-scrollbar flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto overscroll-x-contain px-5 md:scroll-px-10 md:px-10 lg:w-max lg:snap-none lg:gap-6 lg:overflow-visible lg:pr-[10vw]"
      >
        {services.map((s, i) => (
          <article
            key={s.id}
            className="rail-card group relative flex w-[82vw] max-w-[26rem] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-3xl border border-line bg-navy-raised/40 p-7 transition-colors duration-500 hover:border-sky/60 hover:bg-navy-raised md:p-9 lg:h-[58vh] lg:w-[min(30rem,38vw)] lg:max-w-none"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-sm text-ink-mute">{String(i + 1).padStart(2, "0")}</span>
              <span className="size-2.5 rounded-full bg-sky opacity-0 shadow-[0_0_16px_var(--sky)] transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <ServiceGlyph id={s.id} className="my-8 h-28 w-auto self-start md:h-36 [&_*]:[vector-effect:non-scaling-stroke]" />
            <div>
              <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{s.short}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {s.examples.slice(0, 3).map((e) => (
                  <li key={e} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-ink-soft">
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {/* Swipe controls (below lg) */}
      <div className="mt-6 flex items-center justify-between px-5 md:px-10 lg:hidden">
        <p className="font-mono text-sm text-ink-mute" aria-live="polite">
          <span className="text-sky">{String(current + 1).padStart(2, "0")}</span> / {String(services.length).padStart(2, "0")}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Shërbimi i mëparshëm"
            onClick={() => go(-1)}
            disabled={current === 0}
            className="focus-ring grid size-12 place-items-center rounded-full border border-line text-sky transition-colors disabled:opacity-30"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Shërbimi tjetër"
            onClick={() => go(1)}
            disabled={current === services.length - 1}
            className="focus-ring grid size-12 place-items-center rounded-full border border-line text-sky transition-colors disabled:opacity-30"
          >
            →
          </button>
        </div>
      </div>

      <div className="mx-auto mt-12 hidden w-full max-w-7xl px-10 lg:block">
        <div className="h-px w-full bg-line">
          <div className="rail-progress h-px origin-left scale-x-0 bg-sky" />
        </div>
      </div>
    </section>
  );
}

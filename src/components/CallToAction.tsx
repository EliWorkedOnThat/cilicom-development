"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Magnetic from "./Magnetic";

gsap.registerPlugin(ScrollTrigger);

// Closing band: the headline scales up as it scrolls in, on a sky backdrop.
export default function CallToAction({
  title = "Le ta ndërtojmë së bashku.",
  body = "Na tregoni çfarë keni në mendje. Ju përgjigjemi brenda një dite pune.",
}: {
  title?: string;
  body?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const narrow = window.matchMedia("(max-width: 767px)").matches;
      gsap.fromTo(
        ".cta-panel",
        { clipPath: narrow ? "inset(6% 4% 6% 4% round 32px)" : "inset(12% 6% 12% 6% round 48px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 20%", scrub: true },
        },
      );
      gsap.from(".cta-title", {
        scale: 0.85,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 20%", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-navy-deep">
      <div className="cta-panel relative overflow-hidden bg-sky text-navy">
        {/* Big faint rings, a nod to the round "i" dots of the logo */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-1/3 -right-1/4 size-[70vw] rounded-full border border-navy/10" />
        <div aria-hidden="true" className="pointer-events-none absolute -top-1/4 -right-1/6 size-[50vw] rounded-full border border-navy/10" />

        <div className="relative mx-auto max-w-7xl px-8 py-24 md:px-10 md:py-44">
          <h2 className="cta-title max-w-[12ch] origin-left text-[clamp(3rem,8.5vw,8.5rem)] leading-[0.92] font-semibold tracking-[-0.045em]">
            {title}
          </h2>
          <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-xl leading-relaxed text-navy/75">{body}</p>
            <Magnetic className="self-start">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-4 rounded-full bg-navy py-5 pr-5 pl-9 text-xl font-semibold text-ink transition-transform focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
              >
                Fillojmë
                <span className="grid size-11 place-items-center rounded-full bg-sky text-navy transition-transform duration-500 group-hover:rotate-45">
                  ↗
                </span>
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}

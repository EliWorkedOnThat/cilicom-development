"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";
import NetworkCanvas from "../NetworkCanvas";
import Magnetic from "../Magnetic";
import { EMAIL } from "@/src/content/contact";
import { useI18n } from "@/src/i18n/I18nProvider";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export default function ContactHero() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const t = useI18n().t.contactPage.hero;

  useGSAP(
    () => {
      gsap.set(".ch-title, .ch-fade", { autoAlpha: 1 });
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = SplitText.create(".ch-title", { type: "chars,lines", mask: "lines", linesClass: "split-line" });
      // Empty the address so it can decode itself in
      root.current!.querySelector(".ch-email")!.textContent = "";
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(".ch-canvas", { autoAlpha: 0, duration: 2.4, ease: "power2.out" }, 0)
        .from(split.chars, { yPercent: 135, duration: 1.3, stagger: 0.03 }, 0.1)
        .from(".ch-fade", { autoAlpha: 0, y: 24, duration: 1.1, stagger: 0.09 }, 0.6)
        .to(".ch-email", { duration: 1.4, scrambleText: { text: EMAIL, chars: "01<>/{}#_", speed: 0.5 } }, 0.7);
    },
    { scope: root },
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section ref={root} className="relative flex min-h-[92dvh] flex-col overflow-hidden bg-navy">
      <NetworkCanvas className="ch-canvas absolute inset-0 size-full" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,var(--navy)_85%)]"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pt-[calc(7rem+env(safe-area-inset-top))] pb-14 md:pt-32 md:px-10 md:pb-20">
        <p className="ch-fade invisible mb-8 inline-flex items-center gap-3 self-start rounded-full border border-line bg-navy/60 px-4 py-2 font-mono text-xs text-ink-soft backdrop-blur md:text-sm">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-sky opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-sky" />
          </span>
          {t.badge}
        </p>

        <h1 className="ch-title invisible text-[clamp(4rem,14vw,13rem)] leading-[0.88] font-semibold tracking-[-0.055em]">
          {t.title}<span className="text-sky">.</span>
        </h1>

        <div className="mt-12 grid items-end gap-10 md:mt-16 md:grid-cols-[1fr_auto]">
          <div className="ch-fade invisible">
            <p className="font-mono text-xs tracking-[0.2em] text-ink-mute uppercase">{t.direct}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${EMAIL}`}
                className="ch-email focus-ring text-[clamp(1.6rem,4.4vw,3.6rem)] leading-none font-medium tracking-tight transition-colors hover:text-sky"
              >
                {EMAIL}
              </a>
              <Magnetic strength={0.25}>
                <button
                  type="button"
                  onClick={copy}
                  className="focus-ring rounded-full border border-line px-4 py-2 font-mono text-xs text-ink-soft transition-colors hover:border-sky hover:text-sky"
                >
                  <span aria-live="polite">{copied ? t.copied : t.copy}</span>
                </button>
              </Magnetic>
            </div>
          </div>

          <a
            href="#brief"
            className="ch-fade focus-ring group invisible flex items-center gap-4 text-ink-soft transition-colors hover:text-ink"
          >
            <span className="text-lg leading-snug md:text-right">
              {t.briefLine1}
              <br />
              {t.briefLine2}
            </span>
            <span className="grid size-14 place-items-center rounded-full border border-line text-sky transition-all duration-500 group-hover:translate-y-1 group-hover:border-sky">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

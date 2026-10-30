"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** "lines" slides each line up from a mask; "fade" lifts the whole block */
  mode?: "lines" | "words" | "fade";
  delay?: number;
  /** Play immediately instead of waiting for the element to scroll into view */
  immediate?: boolean;
};

export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  mode = "lines",
  delay = 0,
  immediate = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(el, { autoAlpha: 1 });
        return;
      }
      const scrollTrigger = immediate ? undefined : { trigger: el, start: "top 88%", once: true };

      if (mode === "fade") {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 1.1, ease: "expo.out", delay, scrollTrigger },
        );
        return;
      }

      SplitText.create(el, {
        type: mode === "lines" ? "lines" : "words,lines",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          gsap.set(el, { autoAlpha: 1 });
          return gsap.from(mode === "lines" ? self.lines : self.words, {
            yPercent: 110,
            rotate: 2,
            duration: 1.2,
            ease: "expo.out",
            stagger: mode === "lines" ? 0.09 : 0.035,
            delay,
            scrollTrigger,
          });
        },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={`invisible ${className}`}>
      {children}
    </Tag>
  );
}

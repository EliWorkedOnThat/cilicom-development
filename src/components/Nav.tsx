"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Wordmark from "./Wordmark";
import { links } from "@/src/content/nav";

export default function Nav() {
  const pathname = usePathname();
  // Remember which page the menu was opened on, so navigating closes it
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);

  // Tuck the bar away when scrolling down, bring it back on the way up
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 240 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .set(menuRef.current, { display: "flex" })
        .fromTo(
          menuRef.current,
          { clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" },
          { clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)", duration: 0.8, ease: "expo.inOut" },
        )
        .from(".menu-link", { yPercent: 120, duration: 0.7, stagger: 0.06, ease: "expo.out" }, "-=0.35");
    },
    { scope: menuRef },
  );

  useEffect(() => {
    if (!tl.current) return;
    if (open) tl.current.timeScale(1).play();
    else tl.current.timeScale(1.6).reverse();
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${scrolled && !open ? "border-b border-line/60 bg-navy/75 backdrop-blur-xl" : "border-b border-transparent"}`}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 md:px-10">
          <Link href="/" aria-label="cilicom, faqja kryesore" className="focus-ring relative z-10 text-[1.7rem]">
            <Wordmark />
          </Link>

          <nav aria-label="Kryesore" className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`focus-ring group relative rounded-full px-4 py-2 text-[0.95rem] transition-colors ${
                    active ? "text-ink" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-sky transition-transform duration-500 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="focus-ring ml-3 rounded-full bg-sky px-5 py-2.5 text-[0.95rem] font-semibold text-navy transition-colors hover:bg-sky-bright"
            >
              Fillojmë një projekt
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpenOn(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Mbyll menunë" : "Hap menunë"}
            className="focus-ring relative z-10 flex size-11 flex-col items-center justify-center gap-1.5 rounded-full border border-line md:hidden"
          >
            <span className={`h-px w-5 bg-ink transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-ink transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      <div
        ref={menuRef}
        id="mobile-menu"
        className="fixed inset-0 z-40 hidden flex-col justify-between bg-sky px-5 pt-28 pb-10 text-navy md:hidden"
        aria-hidden={!open}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {[...links, { href: "/contact", label: "Kontakt" }].map((l, i) => (
            <div key={l.href} className="overflow-hidden">
              <Link
                href={l.href}
                tabIndex={open ? 0 : -1}
                className="menu-link flex items-baseline gap-4 py-1 text-[2.6rem] leading-tight font-semibold tracking-tight"
              >
                <span className="font-mono text-sm font-normal opacity-60">0{i + 1}</span>
                {l.label}
              </Link>
            </div>
          ))}
        </nav>
        <a href="mailto:hello@cilicom.al" tabIndex={open ? 0 : -1} className="font-mono text-sm">
          hello@cilicom.al
        </a>
      </div>
    </>
  );
}

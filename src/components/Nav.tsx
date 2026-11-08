"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Wordmark from "./Wordmark";
import LanguageSwitch from "./LanguageSwitch";
import InstagramIcon from "./InstagramIcon";
import { INSTAGRAM } from "@/src/content/contact";
import { useI18n } from "@/src/i18n/I18nProvider";

export default function Nav() {
  const pathname = usePathname();
  const { t: dict, href } = useI18n();
  const t = dict.nav;
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
      // The menu grows out of the button, wherever the safe area put it
      const buttonCenter = () => {
        const r = document.querySelector('[aria-controls="mobile-menu"]')!.getBoundingClientRect();
        return `${r.left + r.width / 2}px ${r.top + r.height / 2}px`;
      };
      tl.current = gsap
        .timeline({ paused: true })
        .set(menuRef.current, { display: "flex" })
        .fromTo(
          menuRef.current,
          { clipPath: () => `circle(0% at ${buttonCenter()})` },
          { clipPath: () => `circle(150% at ${buttonCenter()})`, duration: 0.8, ease: "expo.inOut" },
        )
        .from(".menu-rule", { scaleX: 0, duration: 0.8, stagger: 0.05, ease: "expo.out" }, "-=0.45")
        .from(".menu-link", { yPercent: 110, duration: 0.7, stagger: 0.05, ease: "expo.out" }, "<0.05")
        .from(".menu-foot", { autoAlpha: 0, y: 16, duration: 0.6, stagger: 0.06, ease: "expo.out" }, "-=0.5");
    },
    { scope: menuRef },
  );

  // Keep the page behind the open menu still
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    if (!tl.current) return;
    if (open) tl.current.timeScale(1).play();
    else tl.current.timeScale(1.6).reverse();
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-[transform,background-color,border-color] duration-500 ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${
          open
            ? "border-b border-transparent"
            : scrolled
              ? "border-b border-line/60 bg-navy/75 backdrop-blur-xl"
              : // Solid on phones so Safari tints the status bar area to match
                "border-b border-transparent bg-navy md:bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-18 md:px-10">
          <Link href={href("/")} aria-label={t.homeAria} className="focus-ring relative z-10 text-[1.55rem] md:text-[1.7rem]">
            <Wordmark />
          </Link>

          <div className="flex items-center gap-3">
          <nav aria-label={t.menu} className="hidden items-center gap-1 lg:flex">
            {t.links.map((l) => {
              const active = pathname === href(l.href);
              return (
                <Link
                  key={l.href}
                  href={href(l.href)}
                  aria-current={active ? "page" : undefined}
                  className={`focus-ring group relative rounded-full px-4 py-2 text-[0.95rem] whitespace-nowrap transition-colors ${
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
              href={href("/contact")}
              className="focus-ring ml-3 rounded-full bg-sky px-5 py-2.5 text-[0.95rem] font-semibold whitespace-nowrap text-navy transition-colors hover:bg-sky-bright"
            >
              {t.cta}
            </Link>
          </nav>

          <LanguageSwitch />

          <button
            type="button"
            onClick={() => setOpenOn(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.close : t.open}
            className={`focus-ring relative z-10 flex size-11 flex-col items-center justify-center gap-1.5 rounded-full border transition-colors duration-500 lg:hidden ${
              open ? "border-sky/60" : "border-line"
            }`}
          >
            <span className={`h-px w-5 transition-all duration-300 ${open ? "translate-y-[3.5px] rotate-45 bg-sky" : "bg-ink"}`} />
            <span className={`h-px w-5 transition-all duration-300 ${open ? "-translate-y-[3.5px] -rotate-45 bg-sky" : "bg-ink"}`} />
          </button>
          </div>
        </div>
      </header>

      <div
        ref={menuRef}
        id="mobile-menu"
        className="fixed inset-0 z-40 hidden flex-col overflow-y-auto bg-navy-deep px-5 pt-[calc(5.5rem+env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] lg:hidden"
        aria-hidden={!open}
      >
        {/* Glow and rings radiating from the menu button */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-40 size-[34rem] rounded-full bg-sky/15 blur-[100px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full border border-sky/10" />
        <div aria-hidden="true" className="pointer-events-none absolute -top-48 -right-48 size-[32rem] rounded-full border border-sky/[0.07]" />

        <p className="menu-foot relative font-mono text-xs tracking-[0.2em] text-sky uppercase">{t.menu}</p>
        <nav aria-label="Mobile" className="relative mt-5 flex flex-col">
          {[{ href: "/", label: t.home }, ...t.links, { href: "/contact", label: t.contact }].map((l, i) => {
            const active = pathname === href(l.href);
            return (
              <div key={l.href} className="relative">
                <span aria-hidden="true" className="menu-rule absolute inset-x-0 top-0 h-px origin-left bg-line" />
                <div className="overflow-hidden">
                  <Link
                    href={href(l.href)}
                    tabIndex={open ? 0 : -1}
                    aria-current={active ? "page" : undefined}
                    className="menu-link group flex items-center gap-4 py-3.5 [@media(max-height:700px)]:py-2"
                  >
                    <span className={`w-6 font-mono text-xs ${active ? "text-sky" : "text-ink-mute"}`}>0{i + 1}</span>
                    <span className={`flex-1 text-[2rem] leading-tight font-semibold tracking-tight ${active ? "text-sky" : "text-ink"}`}>
                      {l.label}
                    </span>
                    <span
                      className={`grid size-9 place-items-center rounded-full border text-sm transition-colors ${
                        active ? "border-sky bg-sky text-navy" : "border-line text-ink-soft group-active:border-sky group-active:text-sky"
                      }`}
                    >
                      {active ? "●" : "→"}
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
          <span aria-hidden="true" className="menu-rule h-px origin-left bg-line" />
        </nav>

        <div className="relative mt-auto space-y-6 pt-10 [@media(max-height:700px)]:space-y-3 [@media(max-height:700px)]:pt-5">
          <Link
            href={href("/contact#brief")}
            tabIndex={open ? 0 : -1}
            className="menu-foot flex items-center justify-between rounded-full bg-sky py-3.5 pr-3.5 pl-7 text-lg font-semibold text-navy"
          >
            {t.cta}
            <span className="grid size-9 place-items-center rounded-full bg-navy text-sky">↗</span>
          </Link>
          <div className="menu-foot flex items-end justify-between gap-4 font-mono text-xs">
            <span className="flex items-center gap-4">
              <a href="mailto:team@cilicom.net" tabIndex={open ? 0 : -1} className="py-2 text-ink-soft">
                team@cilicom.net
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={open ? 0 : -1}
                aria-label={dict.footer.instagram}
                className="grid size-9 place-items-center rounded-full border border-line text-ink-soft"
              >
                <InstagramIcon className="size-4" />
              </a>
            </span>
            <span className="flex items-center gap-2 py-2 text-ink-mute">
              <span className="size-1.5 rounded-full bg-sky shadow-[0_0_8px_var(--sky)]" />
              {t.location}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

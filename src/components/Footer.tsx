import Link from "next/link";
import InstagramIcon from "./InstagramIcon";
import { INSTAGRAM } from "@/src/content/contact";
import { getDictionary } from "@/src/i18n/dictionaries";
import { localize, type Locale } from "@/src/i18n/config";

export default function Footer({ lang }: { lang: Locale }) {
  const { footer: t, nav } = getDictionary(lang);
  const href = (path: string) => localize(lang, path);

  return (
    <footer className="relative overflow-hidden border-t border-line bg-navy-deep">
      {/* Oversized wordmark sitting behind the content, fading out toward the top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-[4vw] select-none text-center leading-none [mask-image:linear-gradient(to_bottom,transparent,black_45%)] md:-bottom-[3vw]"
      >
        <p className="text-[29vw] font-bold tracking-[-0.06em] whitespace-nowrap lowercase md:text-[24vw]">
          <span className="text-ink/[0.07]">cili</span>
          <span className="text-sky/25">com</span>
        </p>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[80%] -translate-x-1/2 rounded-full bg-sky/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 px-5 pt-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-10 md:pt-20">
        <div className="col-span-2 md:col-span-1">
          <p className="max-w-sm text-2xl leading-snug font-medium tracking-tight">
            {t.tagline}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={href("/contact#brief")}
              className="focus-ring group inline-flex items-center gap-3 rounded-full bg-sky py-2.5 pr-2.5 pl-5 font-semibold text-navy transition-colors hover:bg-sky-bright"
            >
              {nav.cta}
              <span className="grid size-7 place-items-center rounded-full bg-navy text-sm text-sky transition-transform duration-500 group-hover:rotate-45">
                ↗
              </span>
            </Link>
            <a
              href="mailto:team@cilicom.net"
              className="focus-ring inline-block py-2.5 font-mono sm:px-2 text-sm text-sky transition-colors hover:text-sky-bright"
            >
              team@cilicom.net
            </a>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.instagram}
              className="focus-ring grid size-11 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-sky hover:text-sky"
            >
              <InstagramIcon className="size-5" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="font-mono text-xs tracking-[0.2em] text-ink-mute uppercase">{t.pages}</p>
          <ul className="mt-4 space-y-0.5">
            {[...nav.links, { href: "/contact", label: nav.contact }].map((l) => (
              <li key={l.href}>
                <Link href={href(l.href)} className="focus-ring inline-block py-2 text-ink-soft transition-colors hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-10">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-ink-mute uppercase">{t.whereTitle}</p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              {t.where}
              <br />
              {t.whereNote}
            </p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-ink-mute uppercase">{t.statusTitle}</p>
            <p className="mt-4 flex items-start gap-2.5 leading-relaxed text-ink-soft">
              <span className="relative mt-2 flex size-2 shrink-0">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-sky opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-sky" />
              </span>
              {t.status}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom row, with room underneath for the wordmark to show through */}
      <div className="relative mx-auto mt-14 flex max-w-7xl items-center justify-between gap-4 px-5 pb-[16vw] font-mono text-xs text-ink-mute md:mt-20 md:px-10 md:pb-[9vw]">
        <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>© 2026 cilicom</span>
          <a href="/sitemap.xml" className="focus-ring py-2 transition-colors hover:text-sky">
            {t.sitemap}
          </a>
        </span>
        <a
          href="#top"
          className="focus-ring group flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-ink-soft transition-colors hover:border-sky hover:text-sky"
        >
          {t.top}
          <span className="transition-transform duration-500 group-hover:-translate-y-0.5">↑</span>
        </a>
      </div>
    </footer>
  );
}

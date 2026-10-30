import Link from "next/link";
import { links } from "@/src/content/nav";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-navy-deep">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pt-20 pb-10 md:grid-cols-[1.4fr_1fr_1fr] md:px-10">
        <div>
          <p className="max-w-sm text-2xl leading-snug font-medium tracking-tight">
            Softuer i ndërtuar me kujdes, për biznese që duan të rriten.
          </p>
          <a
            href="mailto:hello@cilicom.al"
            className="focus-ring mt-6 inline-block font-mono text-sky transition-colors hover:text-sky-bright"
          >
            hello@cilicom.al ↗
          </a>
        </div>
        <nav aria-label="Footer">
          <p className="font-mono text-xs tracking-[0.2em] text-ink-mute uppercase">Faqet</p>
          <ul className="mt-5 space-y-2.5">
            {[...links, { href: "/contact", label: "Kontakt" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="focus-ring text-ink-soft transition-colors hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-ink-mute uppercase">Ku jemi</p>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Shqipëri
            <br />
            Punojmë me klientë kudo.
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl justify-between border-t border-line px-5 py-6 font-mono text-xs text-ink-mute md:px-10">
        <span>© 2026 cilicom</span>
        <span>cilicom.al</span>
      </div>

      {/* Oversized wordmark, cropped by the bottom edge */}
      <div aria-hidden="true" className="pointer-events-none -mb-[5vw] select-none px-3 leading-none">
        <p className="text-center text-[26vw] font-bold tracking-[-0.06em] lowercase">
          <span className="text-ink/[0.06]">cili</span>
          <span className="text-sky/20">com</span>
        </p>
      </div>
    </footer>
  );
}

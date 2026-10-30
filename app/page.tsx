import { Outfit } from "next/font/google";

const font = Outfit({ subsets: ["latin", "latin-ext"] });

// Palette (from the Instagram)
// night   #060B14  – page background
// panel   #08111F  – tiles
// line    #16233A  – borders
// blue    #1E7BFF  – brand blue ("com")
// glow    #4DA3FF  – focus rings, path glow

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4DA3FF]";

const services = [
  {
    title: "Zhvillim web",
    body: "Faqe interneti të shpejta dhe moderne që e paraqesin mirë biznesin tuaj.",
  },
  {
    title: "Aplikacione të personalizuara",
    body: "Aplikacione dhe sisteme të ndërtuara sipas mënyrës se si punon biznesi juaj.",
  },
  {
    title: "Zgjidhje dixhitale",
    body: "Zëvendësojmë Excel-in dhe punën manuale me mjete dixhitale të thjeshta.",
  },
  {
    title: "Konsulencë teknologjike",
    body: "Ju ndihmojmë të zgjidhni teknologjinë e duhur para se të investoni.",
  },
  {
    title: "Mirëmbajtje dhe suport",
    body: "Sigurojmë që sistemet tuaja të funksionojnë pa ndërprerje.",
  },
  {
    title: "Zgjidhje për rritje",
    body: "Automatizim dhe raporte që e ndihmojnë biznesin të rritet.",
  },
];

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-bold tracking-tight ${className}`}>
      <span className="text-white">cili</span>
      <span className="text-[#1E7BFF]">com</span>
    </span>
  );
}

export default function Home() {
  return (
    <main
      className={`${font.className} min-h-screen w-full bg-[#060B14] text-white`}
    >
      {/* The one animated moment: the glowing path draws itself on load */}
      <style>{`
        .glow-path { stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw 2.6s ease-out 0.3s forwards; }
        @keyframes draw { to { stroke-dashoffset: 0; } }
        @media (prefers-reduced-motion: reduce) {
          .glow-path { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>

      {/* Hero */}
      <section id="top" className="relative flex min-h-[92vh] flex-col overflow-hidden">
        <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 md:px-12">
          <a href="#top" className={`text-3xl ${focus}`} aria-label="cilicom, kreu">
            <Wordmark />
          </a>
          <nav aria-label="Kryesore" className="flex items-center gap-6 text-sm font-medium">
            <a href="#sherbimet" className={`text-white/75 hover:text-white ${focus}`}>
              Shërbimet
            </a>
            <a
              href="#kontakt"
              className={`rounded-full bg-[#1E7BFF] px-5 py-2 text-white transition-colors hover:bg-[#3D8DFF] ${focus}`}
            >
              Kontakto tani
            </a>
          </nav>
        </header>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-72 pt-16 md:px-12 md:pb-96 md:pt-24">
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Teknologji e ndërtuar për biznesin.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl">
            Ndërtojmë faqe interneti, aplikacione të personalizuara dhe sisteme
            që e bëjnë biznesin tuaj më të shpejtë dhe më të organizuar.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#kontakt"
              className={`rounded-full bg-[#1E7BFF] px-6 py-3 font-semibold transition-colors hover:bg-[#3D8DFF] ${focus}`}
            >
              Kontakto tani
            </a>
            <a
              href="#sherbimet"
              className={`rounded-full border border-white/25 px-6 py-3 font-semibold transition-colors hover:bg-white/10 ${focus}`}
            >
              Shiko shërbimet
            </a>
          </div>
        </div>

        {/* Night mountain with a glowing path, echoing the Instagram hero.
            Swap for a real photo later: <Image src="/hero.jpg" fill className="object-cover" alt="" /> */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 600"
          preserveAspectRatio="xMidYMax slice"
          className="absolute inset-x-0 bottom-0 h-[60%] w-full"
        >
          <defs>
            <linearGradient id="rock" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#12233D" />
              <stop offset="1" stopColor="#060B14" />
            </linearGradient>
            <radialGradient id="halo" cx="50%" cy="30%" r="45%">
              <stop offset="0" stopColor="#1E7BFF" stopOpacity="0.28" />
              <stop offset="1" stopColor="#1E7BFF" stopOpacity="0" />
            </radialGradient>
            <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
          </defs>
          <rect width="1440" height="600" fill="url(#halo)" />
          <polygon
            fill="url(#rock)"
            points="0,600 0,440 190,405 370,450 560,335 720,170 870,325 1060,365 1250,305 1440,385 1440,600"
          />
          <path
            className="glow-path"
            pathLength={1}
            d="M700 600 C 790 560 560 525 665 475 S 810 405 700 355 S 745 255 720 178"
            fill="none"
            stroke="#1E7BFF"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.55"
            filter="url(#blur)"
          />
          <path
            className="glow-path"
            pathLength={1}
            d="M700 600 C 790 560 560 525 665 475 S 810 405 700 355 S 745 255 720 178"
            fill="none"
            stroke="#8CC4FF"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </section>

      {/* Services */}
      <section id="sherbimet" className="mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-32">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
          Çfarë ndërtojmë
        </h2>
        <div className="mt-14 grid gap-px border border-[#16233A] bg-[#16233A] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-[#08111F] p-8 transition-colors hover:bg-[#0B1A2F] md:p-10"
            >
              <span className="block h-px w-5 bg-white/60" aria-hidden="true" />
              <h3 className="mt-5 text-sm font-light uppercase tracking-[0.22em] text-white">
                {s.title}
              </h3>
              <p className="mt-4 max-w-xs leading-relaxed text-white/65">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="kontakt" className="border-t border-[#16233A] bg-[#08111F]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
            Ende i bëni të gjitha gjërat manualisht?
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            Na tregoni si e drejtoni biznesin sot dhe do t’ju propozojmë një
            zgjidhje të thjeshtë.
          </p>
          <a
            href="mailto:hello@cilicom.al"
            className={`mt-8 inline-block rounded-full bg-[#1E7BFF] px-6 py-3 font-semibold transition-colors hover:bg-[#3D8DFF] ${focus}`}
          >
            Kontakto tani
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-white/50 md:px-12">
        <Wordmark className="text-lg" />
        <span>cilicom.al · © 2026</span>
      </footer>
    </main>
  );
}
import type { Dictionary } from "@/src/i18n/dictionaries";

const rowB = ["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL", "Python", "OpenAI", "Claude", "Docker", "REST & GraphQL"];

function Row({ items, reverse, muted }: { items: string[]; reverse?: boolean; muted?: boolean }) {
  // Duplicate the list so translateX(-50%) loops seamlessly
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <ul className={`marquee-track flex shrink-0 items-center ${reverse ? "reverse" : ""}`}>
        {doubled.map((t, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length}
            className={`flex items-center whitespace-nowrap ${
              muted ? "font-mono text-lg text-ink-mute md:text-xl" : "text-4xl font-semibold tracking-tight md:text-6xl"
            }`}
          >
            <span className="px-6 md:px-10">{t}</span>
            <span className={`rounded-full bg-sky ${muted ? "size-1.5 opacity-50" : "size-3"}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Marquee({ t }: { t: Dictionary["home"]["marquee"] }) {
  return (
    <section aria-label={t.label} className="space-y-6 border-y border-line bg-navy py-10 md:py-14">
      <Row items={t.items} />
      <Row items={rowB} reverse muted />
    </section>
  );
}

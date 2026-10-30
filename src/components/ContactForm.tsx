"use client";

import { useState } from "react";
import { services } from "@/src/content/services";

const EMAIL = "hello@cilicom.al";

// No backend yet: composes the message and hands it to the visitor's mail app.
export default function ContactForm() {
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (t: string) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = [
      `Emri: ${f.get("name")}`,
      `Email: ${f.get("email")}`,
      f.get("company") ? `Kompania: ${f.get("company")}` : "",
      picked.length ? `Interesi: ${picked.join(", ")}` : "",
      "",
      String(f.get("message")),
    ]
      .filter((l) => l !== null)
      .join("\n");
    const subject = `Projekt i ri: ${f.get("name")}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const field =
    "peer w-full border-b border-line bg-transparent pt-7 pb-3 text-xl text-ink outline-none transition-colors placeholder:text-transparent focus:border-sky";
  const label =
    "pointer-events-none absolute top-7 left-0 text-xl text-ink-mute transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-sky peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs";

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <fieldset>
        <legend className="font-mono text-xs tracking-[0.15em] text-ink-mute uppercase">Çfarë ju intereson?</legend>
        <div className="mt-5 flex flex-wrap gap-2">
          {services.map((s) => {
            const on = picked.includes(s.title);
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(s.title)}
                className={`focus-ring rounded-full border px-4 py-2 text-sm transition-colors ${
                  on ? "border-sky bg-sky text-navy" : "border-line text-ink-soft hover:border-sky hover:text-ink"
                }`}
              >
                {s.title}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative">
          <input id="name" name="name" required placeholder="Emri" autoComplete="name" className={field} />
          <label htmlFor="name" className={label}>
            Emri juaj *
          </label>
        </div>
        <div className="relative">
          <input id="email" name="email" type="email" required placeholder="Email" autoComplete="email" className={field} />
          <label htmlFor="email" className={label}>
            Email *
          </label>
        </div>
      </div>
      <div className="relative">
        <input id="company" name="company" placeholder="Kompania" autoComplete="organization" className={field} />
        <label htmlFor="company" className={label}>
          Kompania
        </label>
      </div>
      <div className="relative">
        <textarea id="message" name="message" required rows={4} placeholder="Mesazhi" className={`${field} resize-none`} />
        <label htmlFor="message" className={label}>
          Na tregoni për projektin *
        </label>
      </div>

      <button
        type="submit"
        className="focus-ring group inline-flex items-center gap-3 rounded-full bg-sky py-4 pr-4 pl-8 text-lg font-semibold text-navy transition-colors hover:bg-sky-bright"
      >
        Dërgo mesazhin
        <span className="grid size-9 place-items-center rounded-full bg-navy text-sky transition-transform duration-500 group-hover:rotate-45">
          ↗
        </span>
      </button>
    </form>
  );
}

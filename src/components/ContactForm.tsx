"use client";

import { useState } from "react";
import { services } from "@/src/content/services";
import { EMAIL, timelines, budgets } from "@/src/content/contact";
import ServiceGlyph from "./ServiceGlyph";

type Brief = {
  services: string[];
  timeline: string;
  budget: string;
  name: string;
  email: string;
  company: string;
  message: string;
};

const empty: Brief = { services: [], timeline: "", budget: "", name: "", email: "", company: "", message: "" };

function Step({ n, title, hint, children }: { n: string; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-line pt-10">
      <legend className="sr-only">{title}</legend>
      <div className="flex items-baseline gap-4" aria-hidden="true">
        <span className="font-mono text-sm text-sky">{n}</span>
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      </div>
      {hint && <p className="mt-2 pl-10 text-ink-mute">{hint}</p>}
      <div className="mt-7">{children}</div>
    </fieldset>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`focus-ring rounded-full border px-5 py-2.5 transition-all duration-300 ${
        on ? "border-sky bg-sky text-navy" : "border-line text-ink-soft hover:border-sky/60 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

// No backend yet: the brief is composed into an email and handed to the visitor's mail app.
export default function ContactForm() {
  const [b, setB] = useState<Brief>(empty);
  const [sent, setSent] = useState(false);

  const set = <K extends keyof Brief>(k: K, v: Brief[K]) => setB((prev) => ({ ...prev, [k]: v }));
  const toggleService = (t: string) =>
    set("services", b.services.includes(t) ? b.services.filter((x) => x !== t) : [...b.services, t]);

  const parts = [b.services.length > 0, !!b.timeline, !!b.budget, !!b.name, !!b.email, !!b.message];
  const progress = Math.round((parts.filter(Boolean).length / parts.length) * 100);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const details = [
      `Emri: ${b.name}`,
      `Email: ${b.email}`,
      b.company && `Kompania: ${b.company}`,
      b.services.length > 0 && `Shërbimet: ${b.services.join(", ")}`,
      b.timeline && `Afati: ${b.timeline}`,
      b.budget && `Buxheti: ${b.budget}`,
    ].filter(Boolean);
    const body = `${details.join("\n")}\n\n${b.message}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Projekt i ri: ${b.name}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "peer w-full border-b border-line bg-transparent pt-7 pb-3 text-xl text-ink outline-none transition-colors placeholder:text-transparent focus:border-sky";
  const label =
    "pointer-events-none absolute top-7 left-0 text-xl text-ink-mute transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-sky peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs";

  return (
    <div className="grid gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
      <form id="brief-form" onSubmit={onSubmit} className="space-y-14">
        <Step n="01" title="Çfarë doni të ndërtoni?" hint="Zgjidhni një ose më shumë.">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {services.map((s) => {
              const on = b.services.includes(s.title);
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleService(s.title)}
                  className={`focus-ring group relative flex min-h-36 flex-col justify-between rounded-2xl border p-4 text-left transition-all duration-300 ${
                    on
                      ? "border-sky bg-sky/10 shadow-[0_0_0_1px_var(--sky),0_20px_50px_-20px_rgba(49,169,255,0.5)]"
                      : "border-line bg-navy-raised/30 hover:border-sky/50 hover:bg-navy-raised/60"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-3.5 right-3.5 grid size-5 place-items-center rounded-full border text-[0.65rem] transition-all duration-300 ${
                      on ? "border-sky bg-sky text-navy" : "border-line text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                  <ServiceGlyph
                    id={s.id}
                    className={`h-12 w-auto self-start transition-opacity duration-300 ${on ? "opacity-100" : "opacity-50 group-hover:opacity-80"}`}
                  />
                  <span className="mt-4 text-[0.95rem] leading-snug font-medium">{s.title}</span>
                </button>
              );
            })}
          </div>
        </Step>

        <Step n="02" title="Kur ju duhet?">
          <div className="flex flex-wrap gap-2.5">
            {timelines.map((t) => (
              <Chip key={t} on={b.timeline === t} onClick={() => set("timeline", b.timeline === t ? "" : t)}>
                {t}
              </Chip>
            ))}
          </div>
        </Step>

        <Step n="03" title="Buxheti i përafërt" hint="Na ndihmon të propozojmë zgjidhjen e duhur. Nuk ju detyron.">
          <div className="flex flex-wrap gap-2.5">
            {budgets.map((t) => (
              <Chip key={t} on={b.budget === t} onClick={() => set("budget", b.budget === t ? "" : t)}>
                {t}
              </Chip>
            ))}
          </div>
        </Step>

        <Step n="04" title="Rreth jush">
          <div className="space-y-10">
            <div className="grid gap-10 md:grid-cols-2">
              <div className="relative">
                <input id="name" required placeholder="Emri" autoComplete="name" value={b.name} onChange={(e) => set("name", e.target.value)} className={field} />
                <label htmlFor="name" className={label}>Emri juaj *</label>
              </div>
              <div className="relative">
                <input id="email" type="email" required placeholder="Email" autoComplete="email" value={b.email} onChange={(e) => set("email", e.target.value)} className={field} />
                <label htmlFor="email" className={label}>Email *</label>
              </div>
            </div>
            <div className="relative">
              <input id="company" placeholder="Kompania" autoComplete="organization" value={b.company} onChange={(e) => set("company", e.target.value)} className={field} />
              <label htmlFor="company" className={label}>Kompania</label>
            </div>
            <div className="relative">
              <textarea id="message" required rows={4} placeholder="Mesazhi" value={b.message} onChange={(e) => set("message", e.target.value)} className={`${field} resize-none`} />
              <label htmlFor="message" className={label}>Na tregoni për idenë ose problemin *</label>
            </div>
          </div>
        </Step>
      </form>

      {/* Live summary of the brief */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="overflow-hidden rounded-3xl border border-line bg-navy-deep/70 shadow-[0_40px_120px_-50px_rgba(49,169,255,0.45)]">
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <span className="font-mono text-xs tracking-[0.2em] text-ink-mute uppercase">Brief-i juaj</span>
            <span className="font-mono text-xs text-sky">{progress}%</span>
          </div>
          <div className="h-px bg-line">
            <div className="h-px bg-sky shadow-[0_0_10px_var(--sky)] transition-[width] duration-700 ease-out" style={{ width: `${progress}%` }} />
          </div>

          <dl className="space-y-5 px-6 py-6 text-sm">
            <div>
              <dt className="font-mono text-xs text-ink-mute">Shërbimet</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {b.services.length ? (
                  b.services.map((s) => (
                    <span key={s} className="rounded-full bg-sky/15 px-2.5 py-1 text-xs text-sky">
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-ink-mute">—</span>
                )}
              </dd>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <dt className="font-mono text-xs text-ink-mute">Afati</dt>
                <dd className={`mt-1.5 ${b.timeline ? "text-ink" : "text-ink-mute"}`}>{b.timeline || "—"}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs text-ink-mute">Buxheti</dt>
                <dd className={`mt-1.5 ${b.budget ? "text-ink" : "text-ink-mute"}`}>{b.budget || "—"}</dd>
              </div>
            </div>
            <div>
              <dt className="font-mono text-xs text-ink-mute">Kontakti</dt>
              <dd className={`mt-1.5 truncate ${b.name || b.email ? "text-ink" : "text-ink-mute"}`}>
                {[b.name, b.company].filter(Boolean).join(" · ") || "—"}
                {b.email && <span className="block truncate text-ink-soft">{b.email}</span>}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-ink-mute">Mesazhi</dt>
              <dd className={`mt-1.5 line-clamp-3 ${b.message ? "text-ink-soft" : "text-ink-mute"}`}>{b.message || "—"}</dd>
            </div>
          </dl>

          <div className="border-t border-line p-6">
            {sent ? (
              <p className="text-center leading-relaxed text-ink-soft" role="status">
                <span className="block text-lg font-semibold text-sky">Pothuajse gati!</span>
                Email-i juaj u hap me brief-in e plotësuar. Thjesht shtypni Dërgo.
              </p>
            ) : (
              <button
                type="submit"
                form="brief-form"
                className="focus-ring group flex w-full items-center justify-between rounded-full bg-sky py-3.5 pr-3.5 pl-7 text-lg font-semibold text-navy transition-colors hover:bg-sky-bright"
              >
                Dërgo brief-in
                <span className="grid size-9 place-items-center rounded-full bg-navy text-sky transition-transform duration-500 group-hover:rotate-45">
                  ↗
                </span>
              </button>
            )}
            <p className="mt-4 text-center font-mono text-xs text-ink-mute">
              ose direkt:{" "}
              <a href={`mailto:${EMAIL}`} className="text-ink-soft underline-offset-4 hover:text-sky hover:underline">
                {EMAIL}
              </a>
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

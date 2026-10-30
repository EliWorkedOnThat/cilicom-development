import type { Metadata } from "next";
import PageHeader from "@/src/components/PageHeader";
import ContactForm from "@/src/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Na tregoni për projektin tuaj. Biseda e parë është falas.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Kontakt"
        title="Le të flasim për idenë tuaj."
        intro="Biseda e parë është falas dhe pa asnjë detyrim. Sa më shumë na tregoni, aq më e saktë do të jetë përgjigja jonë."
      />

      <section className="bg-navy pb-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-10 lg:grid-cols-[1.4fr_0.6fr]">
          <ContactForm />

          <aside className="space-y-10 lg:border-l lg:border-line lg:pl-12">
            <div>
              <p className="font-mono text-xs tracking-[0.15em] text-ink-mute uppercase">Email</p>
              <a
                href="mailto:hello@cilicom.al"
                className="focus-ring mt-3 inline-block text-2xl font-medium transition-colors hover:text-sky"
              >
                hello@cilicom.al
              </a>
            </div>
            <div>
              <p className="font-mono text-xs tracking-[0.15em] text-ink-mute uppercase">Çfarë ndodh më pas</p>
              <ol className="mt-4 space-y-4">
                {["Lexojmë mesazhin tuaj", "Caktojmë një bisedë të shkurtër", "Ju dërgojmë një propozim të qartë"].map(
                  (s, i) => (
                    <li key={s} className="flex gap-4 text-lg text-ink-soft">
                      <span className="font-mono text-sm text-sky">0{i + 1}</span>
                      {s}
                    </li>
                  ),
                )}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useI18n } from "@/src/i18n/I18nProvider";
import { LOCALE_COOKIE, localeNames, locales } from "@/src/i18n/config";

const flags = { sq: "/flags/al.svg", en: "/flags/gb.svg" };

// Flag pill in the header. Picking a language remembers it in a cookie so the
// proxy stops guessing from the visitor's country.
export default function LanguageSwitch() {
  const { lang, t } = useI18n();
  const pathname = usePathname();
  const rest = pathname.replace(/^\/[^/]+/, "");

  return (
    <div role="group" aria-label={t.nav.language} className="flex items-center gap-0.5 rounded-full border border-line bg-navy/60 p-1 backdrop-blur">
      {locales.map((l) => {
        const active = l === lang;
        return (
          <a
            key={l}
            href={`/${l}${rest}`}
            hrefLang={l}
            lang={l}
            aria-label={localeNames[l]}
            aria-current={active ? "true" : undefined}
            onClick={() => {
              document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
            }}
            className={`focus-ring flex h-8 items-center gap-1.5 rounded-full px-2 font-mono text-[0.7rem] uppercase transition-all duration-300 ${
              active ? "bg-sky/15 text-ink ring-1 ring-sky/60" : "text-ink-mute opacity-60 hover:text-ink hover:opacity-100"
            }`}
          >
            <Image src={flags[l]} alt="" width={20} height={15} unoptimized className="h-[15px] w-5 rounded-[3px] object-cover" />
            <span className="hidden sm:inline">{l}</span>
          </a>
        );
      })}
    </div>
  );
}

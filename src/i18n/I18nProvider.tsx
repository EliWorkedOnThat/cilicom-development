"use client";

import { createContext, useContext, type ReactNode } from "react";
import { localize, type Locale } from "./config";
import type { Dictionary } from "./dictionaries";

const I18nContext = createContext<{ lang: Locale; t: Dictionary } | null>(null);

export function I18nProvider({ lang, t, children }: { lang: Locale; t: Dictionary; children: ReactNode }) {
  return <I18nContext.Provider value={{ lang, t }}>{children}</I18nContext.Provider>;
}

/** Current locale, its dictionary and a helper for locale-prefixed links. */
export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return { ...ctx, href: (path: string) => localize(ctx.lang, path) };
}

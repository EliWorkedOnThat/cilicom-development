import type { Metadata } from "next";
import { locales, type Locale } from "@/src/i18n/config";

export const SITE_URL = "https://cilicom.net";

/**
 * Canonical URL and hreflang links for a page that exists in every language.
 * `path` is the page without the locale: "" for the home page, "/services", "/projects/academy"…
 * x-default points at the unprefixed URL, which proxy.ts redirects to the visitor's language.
 */
export function pageAlternates(lang: Locale, path: string): NonNullable<Metadata["alternates"]> {
  return {
    canonical: `/${lang}${path}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
      "x-default": path || "/",
    },
  };
}

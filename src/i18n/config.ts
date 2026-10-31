export const locales = ["sq", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "sq";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

// Countries whose visitors get Albanian by default
export const albanianCountries = ["AL", "XK"];

// Cookie that remembers the visitor's choice from the flag switch
export const LOCALE_COOKIE = "lang";

export const localeNames: Record<Locale, string> = { sq: "Shqip", en: "English" };

/** Prefix an app path ("/services", "/contact#brief") with the locale. */
export const localize = (lang: Locale, path: string) => (path === "/" ? `/${lang}` : `/${lang}${path}`);

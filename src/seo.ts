import type { Metadata } from "next";
import { locales, type Locale } from "@/src/i18n/config";
import { getDictionary } from "@/src/i18n/dictionaries";
import { EMAIL, INSTAGRAM } from "@/src/content/contact";

export const SITE_URL = "https://cilicom.net";
export const SITE_NAME = "cilicom";

// Open Graph wants language_TERRITORY. The English copy uses British spelling.
const ogLocales: Record<Locale, string> = { sq: "sq_AL", en: "en_GB" };

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

/**
 * Everything a page puts in <head>: title, description, canonical + hreflang, and the
 * Open Graph / Twitter tags used when the link is shared on WhatsApp, LinkedIn, Facebook…
 * The share image comes from the opengraph-image.tsx next to each page. It's left out here
 * on purpose: setting openGraph.images would stop Next from filling it in from that file.
 * Pass `absoluteTitle` for the home page, whose title already carries the brand.
 */
export function pageMetadata(
  lang: Locale,
  path: string,
  { title, description, absoluteTitle = false }: { title: string; description: string; absoluteTitle?: boolean },
): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: pageAlternates(lang, path),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: ogLocales[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocales[l]),
      url: `/${lang}${path}`,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/* ---------------------------------------------------------------------------
 * Structured data (schema.org JSON-LD), rendered with <JsonLd />.
 * Test changes with https://search.google.com/test/rich-results
 * ------------------------------------------------------------------------- */

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** A pointer to the organization, for the entities a page describes (services, products…). */
const orgRef = { "@type": "Organization", "@id": ORG_ID, name: SITE_NAME, url: SITE_URL };

const pageUrl = (lang: Locale, path: string) => `${SITE_URL}/${lang}${path}`;

/** Who we are, on every page: the organization behind the site and the site itself. */
export function siteJsonLd(lang: Locale) {
  const t = getDictionary(lang);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE_NAME,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/cilicom-logo.jpg`, width: 1254, height: 1254 },
        description: t.meta.description,
        email: EMAIL,
        sameAs: [INSTAGRAM],
        address: { "@type": "PostalAddress", addressCountry: "AL" },
        areaServed: "Worldwide",
        knowsLanguage: ["sq", "en"],
        knowsAbout: t.services.map((s) => s.title),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: EMAIL,
          availableLanguage: ["Albanian", "English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        description: t.meta.description,
        inLanguage: lang,
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

/**
 * Breadcrumb trail from the home page down to this page, which Google can show
 * in place of the bare URL in results. `trail` is every step after Home.
 */
export function breadcrumbJsonLd(lang: Locale, trail: { name: string; path: string }[]) {
  const steps = [{ name: getDictionary(lang).nav.home, path: "" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: steps.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: pageUrl(lang, step.path),
    })),
  };
}

/** Questions and answers exactly as they appear on the page. */
export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** One Service per entry on the services page, each pointing at its own section. */
export function servicesJsonLd(lang: Locale) {
  const url = pageUrl(lang, "/services");
  return {
    "@context": "https://schema.org",
    "@graph": getDictionary(lang).services.map((s) => ({
      "@type": "Service",
      "@id": `${url}#${s.id}`,
      url: `${url}#${s.id}`,
      name: s.title,
      serviceType: s.title,
      description: s.long,
      provider: orgRef,
      areaServed: "Worldwide",
      availableLanguage: ["sq", "en"],
    })),
  };
}

/** The academy platform as a web application (no public price, so no offer). */
export function academyJsonLd(lang: Locale) {
  const t = getDictionary(lang);
  const product = t.projectsPage.products.find((p) => p.href === "/projects/academy");
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: product?.title ?? t.academyPage.metaTitle,
    url: pageUrl(lang, "/projects/academy"),
    description: t.academyPage.metaDescription,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires a modern web browser",
    featureList: t.academyPage.features.map((f) => f.title),
    inLanguage: "sq",
    provider: orgRef,
  };
}

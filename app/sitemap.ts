import type { MetadataRoute } from "next";
import { locales } from "@/src/i18n/config";
import { SITE_URL } from "@/src/seo";

// Pages that exist in every language. Bump `updated` when a page's content changes.
const pages = [
  { path: "", updated: "2026-10-31", changeFrequency: "monthly", priority: 1 },
  { path: "/services", updated: "2026-10-31", changeFrequency: "monthly", priority: 0.9 },
  { path: "/projects", updated: "2026-11-11", changeFrequency: "monthly", priority: 0.7 },
  { path: "/projects/academy", updated: "2026-11-11", changeFrequency: "monthly", priority: 0.7 },
  { path: "/testimonials", updated: "2026-11-08", changeFrequency: "monthly", priority: 0.6 },
  { path: "/pricing", updated: "2026-10-31", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", updated: "2026-10-31", changeFrequency: "yearly", priority: 0.6 },
  { path: "/contact", updated: "2026-10-31", changeFrequency: "yearly", priority: 0.8 },
] as const;

// The static Eztemplate site in public/eztemplate (English only, no language versions)
const staticPages = [
  { path: "/eztemplate/", updated: "2026-11-08", changeFrequency: "monthly", priority: 0.7 },
  { path: "/eztemplate/terms.html", updated: "2026-11-08", changeFrequency: "yearly", priority: 0.2 },
  { path: "/eztemplate/privacy.html", updated: "2026-11-08", changeFrequency: "yearly", priority: 0.2 },
  { path: "/eztemplate/refund.html", updated: "2026-11-08", changeFrequency: "yearly", priority: 0.2 },
] as const;

// One entry per page and language, each listing its translations (same links as pageAlternates in src/seo.ts)
export default function sitemap(): MetadataRoute.Sitemap {
  const localized = pages.flatMap((p) => {
    const languages = {
      ...Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${p.path}`])),
      "x-default": `${SITE_URL}${p.path || "/"}`,
    };
    return locales.map((lang) => ({
      url: `${SITE_URL}/${lang}${p.path}`,
      lastModified: p.updated,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      alternates: { languages },
    }));
  });

  const fixed = staticPages.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: p.updated,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  return [...localized, ...fixed];
}

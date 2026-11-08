import type { MetadataRoute } from "next";
import { locales } from "@/src/i18n/config";

const site = "https://cilicom.net";
const updated = "2026-10-31";

const pages = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.7 },
  { path: "/testimonials", changeFrequency: "monthly", priority: 0.6 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "yearly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.8 },
] as const;

// One entry per page and language, each listing its translations
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((p) =>
    locales.map((lang) => ({
      url: `${site}/${lang}${p.path}`,
      lastModified: updated,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${site}/${l}${p.path}`])) },
    })),
  );
}

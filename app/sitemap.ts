import type { MetadataRoute } from "next";

const site = "https://cilicom.net";
const updated = "2026-10-31";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site, lastModified: updated, changeFrequency: "monthly", priority: 1 },
    { url: `${site}/services`, lastModified: updated, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site}/projects`, lastModified: updated, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site}/pricing`, lastModified: updated, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site}/about`, lastModified: updated, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site}/contact`, lastModified: updated, changeFrequency: "yearly", priority: 0.8 },
  ];
}

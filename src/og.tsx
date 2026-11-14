import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { hasLocale, locales } from "@/src/i18n/config";
import { getDictionary, type Dictionary } from "@/src/i18n/dictionaries";

/*
 * Share cards: the image WhatsApp, LinkedIn, Facebook, X and Slack show when someone shares a page.
 * Each page folder has an opengraph-image.tsx that calls ogImage() with its own label and headline,
 * and Next adds the og:image / twitter:image tags. They're rendered once per language at build time.
 */

export const OG_SIZE = { width: 1200, height: 630 };

// Outfit, the site's own font (static TTFs, since the image renderer can't read woff2 or variable fonts)
const fontDir = join(process.cwd(), "src/assets/fonts");
const [semibold, bold] = await Promise.all([
  readFile(join(fontDir, "Outfit-SemiBold.ttf")),
  readFile(join(fontDir, "Outfit-Bold.ttf")),
]);

const NAVY = "#021236";
const SKY = "#31a9ff";

/** One card per language. */
export const ogStaticParams = () => locales.map((lang) => ({ lang }));

/** Renders the card for one page: wordmark, the page's label and its headline. */
export function ogImage(lang: string, pick: (t: Dictionary) => { label: string; title: string }) {
  if (!hasLocale(lang)) return new Response("Not found", { status: 404 });
  const t = getDictionary(lang);
  const { label, title } = pick(t);
  const footer = t.home.marquee.items.slice(0, 4).join("  ·  ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          backgroundColor: NAVY,
          backgroundImage: "radial-gradient(circle at 88% 8%, rgba(49,169,255,0.30), rgba(49,169,255,0) 55%)",
          color: "#ffffff",
          fontFamily: "Outfit",
        }}
      >
        <div style={{ display: "flex", fontSize: 52, fontWeight: 700, letterSpacing: -2 }}>
          <span>cili</span>
          <span style={{ color: SKY }}>com</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 26, color: SKY, letterSpacing: 4, textTransform: "uppercase" }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: SKY, marginRight: 18 }} />
            {label}
          </div>
          <div
            style={{
              marginTop: 28,
              maxWidth: 1000,
              fontSize: title.length > 36 ? 78 : 96,
              fontWeight: 600,
              lineHeight: 1.04,
              letterSpacing: -3,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "rgba(255,255,255,0.62)" }}>
          <span style={{ color: "#ffffff" }}>cilicom.net</span>
          <span>{footer}</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Outfit", data: semibold, weight: 600, style: "normal" },
        { name: "Outfit", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}

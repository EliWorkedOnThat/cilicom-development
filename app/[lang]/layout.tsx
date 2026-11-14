import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Outfit, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/src/components/SmoothScroll";
import Nav from "@/src/components/Nav";
import Footer from "@/src/components/Footer";
import { I18nProvider } from "@/src/i18n/I18nProvider";
import { getDictionary } from "@/src/i18n/dictionaries";
import { hasLocale, locales } from "@/src/i18n/config";
import JsonLd from "@/src/components/JsonLd";
import { SITE_NAME, SITE_URL, siteJsonLd } from "@/src/seo";
import "../globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "latin-ext"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  // Site-wide defaults. Each page adds its own title, description, canonical and share tags (pageMetadata in src/seo.ts).
  return {
    title: { default: t.meta.title, template: `%s · ${SITE_NAME}` },
    description: t.meta.description,
    applicationName: SITE_NAME,
    publisher: SITE_NAME,
    icons: { icon: "/cilicom-logo.jpg" },
    metadataBase: new URL(SITE_URL),
    // Let Google show large image previews and full-length snippets
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
  };
}

// Draw under the iPhone notch / Dynamic Island and tint the browser bars navy;
// the header pads itself by the safe-area inset instead.
export const viewport: Viewport = {
  themeColor: "#021236",
  viewportFit: "cover",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <html lang={lang} className={`${outfit.variable} ${jetbrains.variable} antialiased`}>
      <body id="top" className="grain flex min-h-dvh flex-col">
        <JsonLd data={siteJsonLd(lang)} />
        <I18nProvider lang={lang} t={t}>
          <SmoothScroll />
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer lang={lang} />
        </I18nProvider>
      </body>
    </html>
  );
}

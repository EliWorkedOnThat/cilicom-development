import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Outfit, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/src/components/SmoothScroll";
import Nav from "@/src/components/Nav";
import Footer from "@/src/components/Footer";
import { I18nProvider } from "@/src/i18n/I18nProvider";
import { getDictionary } from "@/src/i18n/dictionaries";
import { hasLocale, locales } from "@/src/i18n/config";
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
  return {
    title: { default: t.meta.title, template: "%s · cilicom" },
    description: t.meta.description,
    icons: { icon: "/cilicom-logo.jpg" },
    alternates: { languages: { sq: "/sq", en: "/en" } },
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

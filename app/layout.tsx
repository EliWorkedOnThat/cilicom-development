import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/src/components/SmoothScroll";
import Nav from "@/src/components/Nav";
import Footer from "@/src/components/Footer";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: {
    default: "cilicom — Softuer, automatizim dhe AI për biznesin tuaj",
    template: "%s · cilicom",
  },
  description:
    "cilicom ndërton sisteme menaxhimi, aplikacione web, automatizime dhe zgjidhje AI të personalizuara — dhe i mirëmban ato pas lançimit.",
  icons: { icon: "/cilicom-logo.jpg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sq" className={`${outfit.variable} ${jetbrains.variable} antialiased`}>
      <body className="grain flex min-h-dvh flex-col">
        <SmoothScroll />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

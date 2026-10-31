import { notFound } from "next/navigation";
import Hero from "@/src/components/home/Hero";
import Marquee from "@/src/components/home/Marquee";
import ServicesRail from "@/src/components/home/ServicesRail";
import Process from "@/src/components/home/Process";
import AiDemo from "@/src/components/home/AiDemo";
import Principles from "@/src/components/home/Principles";
import CallToAction from "@/src/components/CallToAction";
import { getDictionary } from "@/src/i18n/dictionaries";
import { hasLocale } from "@/src/i18n/config";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <Hero />
      <Marquee t={t.home.marquee} />
      <ServicesRail />
      <Process />
      <AiDemo />
      <Principles t={t.home.principles} />
      <CallToAction />
    </>
  );
}

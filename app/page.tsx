import Hero from "@/src/components/home/Hero";
import Marquee from "@/src/components/home/Marquee";
import ServicesRail from "@/src/components/home/ServicesRail";
import Process from "@/src/components/home/Process";
import AiDemo from "@/src/components/home/AiDemo";
import Principles from "@/src/components/home/Principles";
import CallToAction from "@/src/components/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <ServicesRail />
      <Process />
      <AiDemo />
      <Principles />
      <CallToAction />
    </>
  );
}

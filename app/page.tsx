import Navbar    from "@/components/sections/Navbar";
import Hero      from "@/components/sections/Hero";
import Problem   from "@/components/sections/Problem";
import Features  from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Benefits  from "@/components/sections/Benefits";
import Stats     from "@/components/sections/Stats";
import FinalCTA  from "@/components/sections/FinalCTA";
import Footer    from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Features />
        <HowItWorks />
        <Benefits />
        <Stats />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

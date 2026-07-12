import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { StatisticsSection } from "@/components/statistics-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { AnimatedBackground } from "@/components/animated-background";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <StatisticsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
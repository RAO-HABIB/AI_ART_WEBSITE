import HeroSection from "@/components/HeroSection";
import LogoCloud from "@/components/LogoCloud";
import FeaturesGrid from "@/components/FeaturesGrid";
import ToolsShowcase from "@/components/ToolsShowcase";
import HowItWorks from "@/components/HowItWorks";
import StatsSection from "@/components/StatsSection";
import Testimonials from "@/components/Testimonials";

import CTASection from "@/components/CTASection";
import PricingSection from "@/components/PricingSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LogoCloud />
      <FeaturesGrid />
      <ToolsShowcase limit={6} />
      <HowItWorks />
      <StatsSection />
      <Testimonials />
      <PricingSection />
      <CTASection />
    </>
  );
}
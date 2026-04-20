import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - AI ART",
  description:
    "Simple, transparent pricing for AI ART. Choose the plan that works best for you. Start free, upgrade when ready.",
};

export default function PricingPage() {
  return (
    <div className="pt-24">
      <PricingSection />
      <CTASection />
    </div>
  );
}
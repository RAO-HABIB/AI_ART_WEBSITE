import ToolsShowcase from "@/components/ToolsShowcase";
import GradientText from "@/components/ui/GradientText";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tools Directory - AI ART",
  description:
    "Browse our complete collection of 100+ AI-powered creative tools for image generation, video creation, audio production, and more.",
};

export default function ToolsPage() {
  return (
    <div className="pt-24">
      {/* Page Header */}
      <section className="py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-sm font-semibold text-primary-400 uppercase tracking-widest mb-3">
              Explore All Tools
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              AI Tools <GradientText>Directory</GradientText>
            </h1>
            <p className="max-w-2xl mx-auto text-dark-400 text-lg">
              Discover the perfect AI tool for your creative needs. Filter
              by category and find the right tool to bring your vision to
              life.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* All Tools with Filters */}
      <ToolsShowcase limit={0} showFilters={true} />
    </div>
  );
}
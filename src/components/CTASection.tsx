import AnimatedSection from "./ui/AnimatedSection";
import Button from "./ui/Button";
import GradientText from "./ui/GradientText";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 opacity-10" />
            <div className="absolute inset-0 glass" />

            {/* Decorative Elements */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary-500/20 rounded-full blur-[80px]" aria-hidden="true" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent-500/20 rounded-full blur-[80px]" aria-hidden="true" />

            <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
                Ready to Create{" "}
                <GradientText>Amazing Art</GradientText>?
              </h2>
              <p className="max-w-xl mx-auto text-dark-400 text-lg mb-8">
                Join 500,000+ creators who are already using AI ART to
                bring their creative visions to life. Start for free today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/signup">
                  <Button size="lg" aria-label="Get started for free">
                    Get Started for Free
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Button>
                </Link>
                <Link href="/tools">
                  <Button variant="outline" size="lg" aria-label="Browse all tools">
                    Browse Tools
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
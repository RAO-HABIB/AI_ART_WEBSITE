import AnimatedSection from "./ui/AnimatedSection";

const logos = [
  "OpenAI",
  "Stability AI",
  "Midjourney",
  "RunwayML",
  "Hugging Face",
  "Google AI",
  "Meta AI",
  "Adobe",
];

export default function LogoCloud() {
  return (
    <section className="py-16 border-y border-dark-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <p className="text-center text-sm text-dark-500 mb-8 uppercase tracking-widest">
            Powered by leading AI technologies
          </p>
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {logos.map((logo) => (
              <div
                key={logo}
                className="text-dark-600 hover:text-dark-400 transition-colors duration-300 text-lg font-semibold tracking-wide"
              >
                {logo}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
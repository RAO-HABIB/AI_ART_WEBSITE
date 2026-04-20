import AnimatedSection from "./ui/AnimatedSection";
import GradientText from "./ui/GradientText";
import PremiumIcon from "./ui/PremiumIcon";
import { stepIcons } from "@/lib/icon-map";

const steps: {
  step: string;
  title: string;
  description: string;
  icon: keyof typeof stepIcons;
  gradient: string;
}[] = [
  {
    step: "01",
    title: "Choose Your Tool",
    description:
      "Browse our collection of 100+ AI tools and select the one that fits your creative needs.",
    icon: "search",
    gradient: "from-blue-500 to-primary-600",
  },
  {
    step: "02",
    title: "Describe Your Vision",
    description:
      "Enter a text prompt describing what you want to create. Be as detailed or as simple as you like.",
    icon: "pen",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    step: "03",
    title: "Generate & Refine",
    description:
      "Watch as AI brings your vision to life in seconds. Refine and iterate until it is perfect.",
    icon: "wand",
    gradient: "from-accent-500 to-pink-600",
  },
  {
    step: "04",
    title: "Download & Share",
    description:
      "Export your creation in high quality and share it with the world or use it in your projects.",
    icon: "rocket",
    gradient: "from-orange-500 to-red-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 relative bg-dark-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary-400 uppercase tracking-widest mb-3">
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Create in{" "}
              <GradientText>4 Simple Steps</GradientText>
            </h2>
            <p className="max-w-2xl mx-auto text-dark-400 text-lg">
              From idea to masterpiece in minutes. Our streamlined workflow
              makes AI art creation effortless.
            </p>
          </div>
        </AnimatedSection>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const StepIcon = stepIcons[step.icon];

            return (
              <AnimatedSection key={step.step} delay={index * 150}>
                <div className="relative text-center group">

                  {/* Connector Line (desktop only) */}
                  {index < steps.length - 1 && (
                    <div
                      className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary-500/40 to-transparent"
                      aria-hidden="true"
                    />
                  )}

                  {/* Icon Box */}
                  <div className="relative inline-block mb-6">
                    <PremiumIcon
                      gradient={step.gradient}
                      className="w-20 h-20 rounded-2xl mx-auto group-hover:scale-110 transition-transform duration-300"
                    >
                      {StepIcon && (
                        <StepIcon
                          className="w-8 h-8"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      )}
                    </PremiumIcon>

                    {/* Step Number Badge */}
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-lg bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                      {step.step}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-dark-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
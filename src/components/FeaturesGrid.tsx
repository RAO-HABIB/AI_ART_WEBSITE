import AnimatedSection from "./ui/AnimatedSection";
import Card from "./ui/Card";
import GradientText from "./ui/GradientText";
import PremiumIcon from "./ui/PremiumIcon";
import { featureIcons } from "@/lib/icon-map";

const features: {
  icon: keyof typeof featureIcons;
  title: string;
  description: string;
  gradient: string;
}[] = [
  {
    icon: "zap",
    title: "Lightning Fast",
    description:
      "Generate stunning artwork in seconds, not hours. Our optimized AI pipeline ensures rapid creation without compromising quality.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: "sliders",
    title: "Precision Control",
    description:
      "Fine-tune every aspect of your creation with intuitive controls. Adjust styles, colors, composition, and details with precision.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: "shield",
    title: "Secure & Private",
    description:
      "Your creations are yours. Enterprise-grade security ensures your data and artwork remain completely private and protected.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: "globe",
    title: "Multi-Language",
    description:
      "Create in any language. Our AI understands prompts in 50+ languages, making art creation accessible to everyone worldwide.",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    icon: "workflow",
    title: "API Integration",
    description:
      "Integrate AI art generation into your own applications with our powerful REST API. Comprehensive documentation included.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: "devices",
    title: "Cross-Platform",
    description:
      "Access your tools from any device. Our responsive design works seamlessly on desktop, tablet, and mobile browsers.",
    gradient: "from-indigo-500 to-primary-500",
  },
];

export default function FeaturesGrid() {
  return (
    <section className="py-24 relative" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary-400 uppercase tracking-widest mb-3">
              Features
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Everything You Need to{" "}
              <GradientText>Create</GradientText>
            </h2>
            <p className="max-w-2xl mx-auto text-dark-400 text-lg">
              Powerful features designed to supercharge your creative
              workflow and bring your imagination to life.
            </p>
          </div>
        </AnimatedSection>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const FeatureIcon = featureIcons[feature.icon];

            return (
              <AnimatedSection key={feature.title} delay={index * 100}>
                <Card
                  variant="gradient"
                  className="p-6 h-full group"
                >
                  {/* Premium Icon */}
                  <PremiumIcon
                    gradient={feature.gradient}
                    className="mb-5 group-hover:scale-110 transition-transform duration-300"
                  >
                    {FeatureIcon && (
                      <FeatureIcon
                        className="w-6 h-6"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    )}
                  </PremiumIcon>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-dark-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
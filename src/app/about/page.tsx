import AnimatedSection from "@/components/ui/AnimatedSection";
import GradientText from "@/components/ui/GradientText";
import Card from "@/components/ui/Card";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - AI ART",
  description:
    "Learn about AI ART - the most comprehensive platform for AI-powered creative tools. Our mission, team, and vision.",
};

const team = [
  {
    name: "Alex Rivera",
    role: "Founder & CEO",
    avatar: "AR",
    bio: "Former ML engineer at Google. Passionate about democratizing AI creativity.",
  },
  {
    name: "Sarah Kim",
    role: "CTO",
    avatar: "SK",
    bio: "10+ years in AI research. Previously led computer vision at Adobe.",
  },
  {
    name: "James Chen",
    role: "Head of Design",
    avatar: "JC",
    bio: "Award-winning designer. Believes in making AI tools beautiful and intuitive.",
  },
  {
    name: "Maria Santos",
    role: "Head of Product",
    avatar: "MS",
    bio: "Product leader with experience at Figma and Canva. User-first approach.",
  },
];

const values = [
  {
    icon: "🎯",
    title: "Accessibility",
    description:
      "We believe everyone should have access to powerful AI creative tools, regardless of technical skill level.",
  },
  {
    icon: "🔒",
    title: "Privacy First",
    description:
      "Your creations are yours. We never use your data to train models without explicit consent.",
  },
  {
    icon: "🌱",
    title: "Sustainability",
    description:
      "We're committed to reducing the environmental impact of AI through efficient model design.",
  },
  {
    icon: "🤝",
    title: "Community",
    description:
      "We build with our community. Your feedback directly shapes the tools we create.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-sm font-semibold text-primary-400 uppercase tracking-widest mb-3">
              About Us
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Empowering Creativity with{" "}
              <GradientText>AI Technology</GradientText>
            </h1>
            <p className="max-w-3xl mx-auto text-dark-400 text-lg leading-relaxed">
              AI ART was founded with a simple mission: to make AI-powered
              creative tools accessible to everyone. We believe that artificial
              intelligence should enhance human creativity, not replace it.
              Our platform brings together the best AI tools in one place,
              making it easy for anyone to create stunning artwork, videos,
              music, and more.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <StatsSection />

      {/* Our Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Our <GradientText>Values</GradientText>
              </h2>
              <p className="max-w-2xl mx-auto text-dark-400 text-lg">
                The principles that guide everything we do
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 100}>
                <Card variant="gradient" className="p-6 h-full text-center">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-dark-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-dark-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Meet the <GradientText>Team</GradientText>
              </h2>
              <p className="max-w-2xl mx-auto text-dark-400 text-lg">
                The passionate people behind AI ART
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <AnimatedSection key={member.name} delay={index * 100}>
                <Card variant="gradient" className="p-6 text-center group">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    {member.avatar}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary-400 mb-3">
                    {member.role}
                  </p>
                  <p className="text-dark-400 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </div>
  );
}
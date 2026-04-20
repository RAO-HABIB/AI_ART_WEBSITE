import AnimatedSection from "./ui/AnimatedSection";

const stats = [
  {
    value: "100+",
    label: "AI Tools Available",
    description: "Curated collection of the best AI art tools",
  },
  {
    value: "500K+",
    label: "Active Users",
    description: "Creators from around the world",
  },
  {
    value: "10M+",
    label: "Artworks Created",
    description: "And counting every day",
  },
  {
    value: "99.9%",
    label: "Uptime",
    description: "Enterprise-grade reliability",
  },
];

export default function StatsSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl glass p-8 sm:p-12 overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary-600/10 rounded-full blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent-600/10 rounded-full blur-[80px]" />
          </div>

          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 100}>
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-2">
                    {stat.value}
                  </p>
                  <p className="text-white font-semibold mb-1">
                    {stat.label}
                  </p>
                  <p className="text-sm text-dark-500">{stat.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
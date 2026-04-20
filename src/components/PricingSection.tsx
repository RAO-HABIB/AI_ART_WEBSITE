"use client";

import { pricingPlans } from "@/data/tools";
import AnimatedSection from "./ui/AnimatedSection";
import GradientText from "./ui/GradientText";
import Button from "./ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function PricingSection() {
  return (
    <section className="py-24 relative" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary-400 uppercase tracking-widest mb-3">
              Pricing
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Simple, Transparent{" "}
              <GradientText>Pricing</GradientText>
            </h2>
            <p className="max-w-2xl mx-auto text-dark-400 text-lg">
              Choose the plan that works best for you. All plans include
              access to our core AI tools.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <AnimatedSection key={plan.name} delay={index * 150}>
              <div
                className={cn(
                  "relative rounded-2xl p-8 h-full flex flex-col transition-all duration-500",
                  plan.popular
                    ? "bg-gradient-to-b from-primary-900/50 to-dark-900 border-2 border-primary-500/50 shadow-xl shadow-primary-500/10 scale-105"
                    : "glass hover:border-primary-500/20"
                )}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 text-xs font-bold bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full shadow-lg">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-dark-400">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-dark-400 ml-2">/{plan.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm"
                    >
                      <svg
                        className="w-5 h-5 text-green-400 shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-dark-300">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation) => (
                    <li
                      key={limitation}
                      className="flex items-start gap-3 text-sm"
                    >
                      <svg
                        className="w-5 h-5 text-dark-600 shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span className="text-dark-600">{limitation}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href="/signup">
                  <Button
                    variant={plan.popular ? "primary" : "outline"}
                    size="lg"
                    className="w-full"
                    aria-label={`${plan.cta} - ${plan.name} plan`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
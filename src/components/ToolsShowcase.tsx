"use client";

import { useState } from "react";
import { tools, categories } from "@/data/tools";
import AnimatedSection from "./ui/AnimatedSection";
import GradientText from "./ui/GradientText";
import Button from "./ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Card from "./ui/Card";
import PremiumIcon from "./ui/PremiumIcon";
import { toolIcons } from "@/lib/icon-map";

interface ToolsShowcaseProps {
  limit?: number;
  showFilters?: boolean;
}

export default function ToolsShowcase({
  limit = 6,
  showFilters = false,
}: ToolsShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTools =
    activeCategory === "All"
      ? tools
      : tools.filter((tool) => tool.category === activeCategory);

  const displayedTools =
    limit && limit > 0
      ? filteredTools.slice(0, limit)
      : filteredTools;

  return (
    <section className="py-24 relative" id="tools">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary-400 uppercase tracking-widest mb-3">
              AI Tools Directory
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Explore <GradientText>AI Tools</GradientText>
            </h2>
            <p className="max-w-2xl mx-auto text-dark-400 text-lg">
              Browse our curated collection of the best AI art generation
              tools available today.
            </p>
          </div>
        </AnimatedSection>

        {/* Category Filters */}
        {showFilters && (
          <AnimatedSection delay={100}>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                    activeCategory === category
                      ? "bg-primary-600 text-white shadow-lg shadow-primary-500/25"
                      : "text-dark-400 hover:text-white hover:bg-white/5 border border-dark-700/50"
                  )}
                  aria-label={`Filter by ${category}`}
                  aria-pressed={activeCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTools.map((tool, index) => {
            const ToolIcon = toolIcons[tool.icon as keyof typeof toolIcons];

            return (
              <AnimatedSection key={tool.id} delay={index * 80}>
                <Card
                  variant="gradient"
                  className="p-6 h-full group relative overflow-hidden"
                >
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-4 min-h-[24px]">
                    {tool.isNew && (
                      <span className="px-2.5 py-0.5 text-xs font-semibold bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                        NEW
                      </span>
                    )}
                    {tool.isFeatured && (
                      <span className="px-2.5 py-0.5 text-xs font-semibold bg-primary-500/20 text-primary-400 rounded-full border border-primary-500/30">
                        FEATURED
                      </span>
                    )}
                  </div>

                  {/* Tool Icon & Name */}
                  <div className="flex items-start gap-4 mb-4">
                    <PremiumIcon
                      gradient={tool.gradient}
                      className="shrink-0 group-hover:scale-110 transition-transform duration-300"
                    >
                      {ToolIcon && (
                        <ToolIcon
                          className="w-6 h-6"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      )}
                    </PremiumIcon>

                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-primary-400">
                        {tool.category}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-dark-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {tool.description}
                  </p>

                  {/* Features Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tool.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 text-xs bg-dark-800 text-dark-300 rounded-lg border border-dark-700/50"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-dark-700/50">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-white">
                        {tool.pricing}
                      </span>
                      <span className="text-xs text-dark-500" aria-hidden="true">
                        •
                      </span>
                      <span
                        className="text-sm text-yellow-400"
                        aria-label={`Rating: ${tool.rating} out of 5`}
                      >
                        ★ {tool.rating}
                      </span>
                    </div>
                    <span className="text-xs text-dark-500">
                      {tool.users} users
                    </span>
                  </div>

                  {/* Hover Gradient Overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-primary-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    aria-hidden="true"
                  />
                </Card>
              </AnimatedSection>
            );
          })}
        </div>

        {/* View All Button */}
        {limit > 0 && limit < tools.length && (
          <AnimatedSection delay={400}>
            <div className="text-center mt-12">
              <Link href="/tools">
                <Button
                  variant="outline"
                  size="lg"
                  aria-label="View all AI tools"
                >
                  View All Tools
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
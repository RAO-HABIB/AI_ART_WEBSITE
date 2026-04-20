"use client";

import Link from "next/link";
import Button from "./ui/Button";
import GradientText from "./ui/GradientText";
import AnimatedSection from "./ui/AnimatedSection";
import { Sparkles, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Orbs */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-600/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-600/15 rounded-full blur-[120px] animate-float delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge - No animation delay on LCP elements */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-sm text-dark-300">
            Discover 100+ AI-Powered Creative Tools
          </span>
        </div>

        {/* H1 — NO AnimatedSection wrapper (LCP fix) */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 text-balance">
          Create Stunning Art with{" "}
          <GradientText as="span" className="block sm:inline">
            Artificial Intelligence
          </GradientText>
        </h1>

        {/* Subtitle — NO AnimatedSection wrapper */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-dark-400 mb-10 text-balance leading-relaxed">
          Explore the most comprehensive collection of AI art tools.
          Generate images, videos, music, and 3D models with
          cutting-edge AI technology.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/tools">
            <Button size="lg" aria-label="Explore all AI tools">
              <Sparkles className="w-5 h-5" aria-hidden="true" />
              Explore AI Tools
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              variant="outline"
              size="lg"
              aria-label="Sign up for free"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </Link>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-16">
          {[
            { value: "100+", label: "AI Tools" },
            { value: "500K+", label: "Users" },
            { value: "10M+", label: "Creations" },
            { value: "4.8★", label: "Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">
                {stat.value}
              </p>
              <p className="text-sm text-dark-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Hero Visual Card — AnimatedSection OK here (below fold) */}
        <AnimatedSection delay={200}>
          <div className="relative max-w-4xl mx-auto">
            <div
              className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 rounded-2xl blur-lg opacity-20 animate-glow-pulse"
              aria-hidden="true"
            />
            <div className="relative glass rounded-2xl p-1">
              <div className="bg-dark-900/80 rounded-xl p-6 sm:p-8">
                {/* Mock Window Bar */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500" aria-hidden="true" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" aria-hidden="true" />
                  <div className="w-3 h-3 rounded-full bg-green-500" aria-hidden="true" />
                  <span className="ml-4 text-sm text-dark-500">
                    AI ART Dashboard
                  </span>
                </div>

                {/* Mock Tool Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Image Gen", color: "from-blue-500 to-purple-600" },
                    { label: "Text to Art", color: "from-purple-500 to-pink-600" },
                    { label: "Video AI", color: "from-cyan-500 to-blue-600" },
                    { label: "Audio AI", color: "from-green-500 to-teal-600" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`aspect-square rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer p-4`}
                    >
                      <span className="text-white text-xs font-semibold text-center">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Mock Progress Bar */}
                <div className="mt-4 flex gap-3 items-center">
                  <div className="flex-1 h-2 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full" />
                  <div className="w-20 h-2 bg-dark-800 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
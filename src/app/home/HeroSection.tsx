'use client';

import { Section } from '@/components/design-system/Section';
import { Button } from '@/components/design-system/Button';
import { AnimatedHeadline } from '@/components/design-system/AnimatedHeadline';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ParallaxLayer } from '@/components/animations/ParallaxLayer';

/**
 * Hero section for the Home page.
 * Features an animated dashboard preview, Fraunces headline, and CTA linking to /book.
 */
export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-ink min-h-[85vh] flex items-center"
      aria-label="Hero"
    >
      {/* Background decorative elements with parallax */}
      <ParallaxLayer speed={0.2} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brass/10 rounded-full blur-3xl" />
      </ParallaxLayer>

      <Section className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left: Headline + CTA */}
        <div className="flex-1 text-center lg:text-left">
          <AnimatedHeadline
            text="Premium Accounting, Bookkeeping and Virtual CFO Services"
            as="h1"
            animation="fade-up"
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-paper leading-tight"
          />

          <ScrollReveal animation="fade-up" delay={200}>
            <p className="mt-6 text-lg md:text-xl text-paper/70 font-interface max-w-xl mx-auto lg:mx-0">
              Your books closed, your dashboard live and your CFO on call — purpose-built for DTC brands, agencies, SaaS startups and CPA firms.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={400}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="accent" size="lg" href="/book" magnetic>
                Book a Free Audit
              </Button>
              <Button variant="ghost" size="lg" href="/dashboard" className="text-paper border-paper/30 hover:bg-paper/10">
                Explore Dashboard
              </Button>
            </div>
          </ScrollReveal>
        </div>

        {/* Right: Animated dashboard preview */}
        <ScrollReveal animation="scale" delay={300} className="flex-1 w-full max-w-2xl">
          <div className="relative rounded-[14px] overflow-hidden shadow-2xl border border-paper/10">
            <div className="bg-gradient-to-br from-ink/80 to-ink p-4 border-b border-paper/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-flag/80" />
                <span className="w-3 h-3 rounded-full bg-brass/80" />
                <span className="w-3 h-3 rounded-full bg-accent/80" />
                <span className="ml-3 text-sm text-paper/50 font-data">dashboard.finofii.com</span>
              </div>
            </div>
            <div className="bg-paper/5 p-6">
              {/* Simulated dashboard metrics */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-paper/10 rounded-lg p-3">
                  <p className="text-xs text-paper/50">Revenue</p>
                  <p className="text-lg font-data text-accent font-semibold">$284K</p>
                </div>
                <div className="bg-paper/10 rounded-lg p-3">
                  <p className="text-xs text-paper/50">Expenses</p>
                  <p className="text-lg font-data text-flag font-semibold">$142K</p>
                </div>
                <div className="bg-paper/10 rounded-lg p-3">
                  <p className="text-xs text-paper/50">Net Income</p>
                  <p className="text-lg font-data text-brass font-semibold">$142K</p>
                </div>
              </div>
              {/* Simulated chart bars */}
              <div className="flex items-end gap-2 h-32">
                {[65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88, 92].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-accent/60 rounded-t transition-all duration-300 hover:bg-accent"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-paper/40 font-data">Jan</span>
                <span className="text-xs text-paper/40 font-data">Dec</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Section>
    </section>
  );
}

'use client';

import { Section } from '@/components/design-system/Section';
import { Button } from '@/components/design-system/Button';
import { AnimatedHeadline } from '@/components/design-system/AnimatedHeadline';
import { ParallaxLayer } from '@/components/animations/ParallaxLayer';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

/**
 * Final CTA section with parallax background and animated headline linking to /book.
 * Positioned before the footer to drive conversions.
 */
export function FinalCTASection() {
  return (
    <section
      className="relative overflow-hidden bg-ink py-24 md:py-32"
      aria-label="Call to action"
    >
      {/* Parallax background decorative elements */}
      <ParallaxLayer speed={0.3} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-[20%] w-64 h-64 bg-accent/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[15%] w-80 h-80 bg-brass/10 rounded-full blur-3xl" />
        <div className="absolute top-[40%] right-[40%] w-48 h-48 bg-accent/5 rounded-full blur-2xl" />
      </ParallaxLayer>

      <Section className="relative z-10 text-center">
        <AnimatedHeadline
          text="We Are Ready To Close Your Books On Time, Every Time?"
          as="h2"
          animation="fade-up"
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-paper leading-tight max-w-3xl mx-auto"
        />

        <ScrollReveal animation="fade-up" delay={200}>
          <p className="mt-6 text-lg text-paper/70 max-w-xl mx-auto">
            Join 500+ Businesses That Trust Finofii Edge For Accounting, Bookkeeping And Strategic Financial Advisory.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={400}>
          <div className="mt-10">
            <Button variant="accent" size="lg" href="/book" magnetic>
              Book A Free Audit
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-in" delay={600}>
          <p className="mt-6 text-sm text-paper/50">
            No Commitment. 30-Minute Strategy Call With A Senior Advisor.
          </p>
        </ScrollReveal>
      </Section>
    </section>
  );
}

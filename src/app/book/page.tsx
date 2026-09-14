'use client';

import { Section } from '@/components/design-system/Section';
import { AnimatedHeadline } from '@/components/design-system/AnimatedHeadline';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { CalendlyEmbed } from '@/components/forms/CalendlyEmbed';

// --- Component ---

export default function BookPage() {
  return (
    <main className="min-h-screen bg-paper">
      {/* Hero Section */}
      <Section padding="lg" ariaLabel="Book a Free Audit">
        <div className="text-center mb-12">
          <ScrollReveal animation="fade-up">
            <AnimatedHeadline
              text="Book a Free Audit"
              as="h1"
              animation="fade-up"
            />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <p className="mt-4 text-lg text-ink/70 max-w-2xl mx-auto">
              Pick a time that works for you. We&apos;ll review your books and
              deliver insights within 48 hours.
            </p>
          </ScrollReveal>
        </div>

        {/* Calendly scheduling widget */}
        <ScrollReveal animation="fade-up" delay={300}>
          <div className="max-w-3xl mx-auto">
            <CalendlyEmbed url="https://calendly.com/gjfinofii/30min" height={700} />
          </div>
        </ScrollReveal>
      </Section>
    </main>
  );
}

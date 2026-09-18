'use client';

import { Section } from './Section';
import { Button } from './Button';
import { AnimatedHeadline } from './AnimatedHeadline';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export interface CtaSectionProps {
  /** Main headline text */
  headline: string;
  /** Supporting paragraph beneath the headline */
  description: string;
  /** CTA button label. Default: "Book a Free Audit" */
  buttonText?: string;
  /** CTA button destination. Default: "/book" */
  buttonHref?: string;
  /** Reassurance line rendered under the button. */
  reassurance?: string;
  /** aria-label for the section. Default: "Call to action" */
  ariaLabel?: string;
}

const DEFAULT_REASSURANCE =
  'No commitment. 30-minute strategy call with a senior advisor.';

/**
 * Shared call-to-action section used across the site.
 *
 * Guarantees a consistent, symmetrical layout for every page-level CTA:
 * centered headline, supporting paragraph, primary button, and a standard
 * reassurance line ("No commitment. 30-minute strategy call with a senior
 * advisor.") so every CTA ends the same way.
 */
export function CtaSection({
  headline,
  description,
  buttonText = 'Book a Free Audit',
  buttonHref = '/book',
  reassurance = DEFAULT_REASSURANCE,
  ariaLabel = 'Call to action',
}: CtaSectionProps) {
  return (
    <Section padding="lg" ariaLabel={ariaLabel}>
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal animation="fade-up">
          <AnimatedHeadline
            text={headline}
            as="h2"
            animation="fade-up"
            className="text-2xl md:text-3xl font-bold font-display text-ink"
          />
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={150}>
          <p className="mt-4 text-ink/70 font-interface">{description}</p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={300}>
          <div className="mt-8">
            <Button variant="accent" size="lg" href={buttonHref} magnetic>
              {buttonText}
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-in" delay={450}>
          <p className="mt-6 text-sm text-ink/50">{reassurance}</p>
        </ScrollReveal>
      </div>
    </Section>
  );
}

export default CtaSection;

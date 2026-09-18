'use client';

import { Section } from '@/components/design-system/Section';
import { Testimonial } from '@/components/design-system/Testimonial';
import { CounterAnimation } from '@/components/animations/CounterAnimation';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { StaggeredList } from '@/components/animations/StaggeredList';
import Image from 'next/image';

const clientLogos = [
  { name: 'ADR Foodstuff Trading L.L.C', src: '/images/logos/client-adr.png' },
  { name: 'DOCS Medical', src: '/images/logos/client-docs-medical.svg' },
  { name: 'Tech HQ', src: '/images/logos/client-tech-hq.jpeg' },
];

const metrics = [
  { end: 500, suffix: '+', label: 'Monthly Closes Delivered' },
  { end: 98, suffix: '%', label: 'Client Retention Rate' },
  { end: 3, suffix: 'x', label: 'Faster Month-End Close' },
  { end: 50, prefix: '$', suffix: 'M+', label: 'Revenue Managed' },
];

const testimonials = [
  {
    quote:
      'Finofii Edge transformed our financial visibility. We went from scrambling at month-end to having real-time dashboards within 2 weeks.',
    author: 'Sarah Chen',
    role: 'CEO',
    company: 'Bloom Commerce',
    rating: 5 as const,
  },
  {
    quote:
      'Their Virtual CFO Services helped us identify $200K in tax savings we were leaving on the table. Worth every penny.',
    author: 'Marcus Rodriguez',
    role: 'Founder',
    company: 'NexGen SaaS',
    rating: 5 as const,
  },
  {
    quote:
      'The best part is the proactive communication. I never have to chase my accountant for updates anymore.',
    author: 'Emma Williams',
    role: 'COO',
    company: 'Velocity Agency',
    rating: 5 as const,
  },
];

/**
 * Social proof section with client logos, animated counter metrics,
 * and testimonial cards with staggered scroll-reveal animations.
 */
export function SocialProofSection() {
  return (
    <Section padding="lg" ariaLabel="Social proof and client results">
      {/* Client logos */}
      <ScrollReveal animation="fade-in">
        <p className="text-center text-sm font-medium text-ink/50 uppercase tracking-wider mb-8">
          Trusted by leading brands and agencies
        </p>
        <div
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-16"
          aria-label="Client logos"
        >
          {clientLogos.map((logo) => (
            <div
              key={logo.src}
              className="flex items-center justify-center rounded-2xl bg-white border border-ink/10 shadow-sm px-6 py-4 h-24 md:h-28"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={220}
                height={100}
                unoptimized
                className="object-contain h-16 md:h-20 w-auto"
              />
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Animated counter metrics */}
      <StaggeredList
        staggerDelay={150}
        animation="fade-up"
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
      >
        {metrics.map((metric) => (
          <div key={metric.label} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-ink">
              <CounterAnimation
                end={metric.end}
                prefix={metric.prefix}
                suffix={metric.suffix}
                duration={1800}
              />
            </div>
            <p className="mt-2 text-sm text-ink/60 font-medium">
              {metric.label}
            </p>
          </div>
        ))}
      </StaggeredList>

      {/* Testimonial cards with staggered reveal */}
      <StaggeredList
        staggerDelay={150}
        animation="fade-up"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {testimonials.map((testimonial) => (
          <Testimonial
            key={testimonial.author}
            quote={testimonial.quote}
            author={testimonial.author}
            role={testimonial.role}
            company={testimonial.company}
            rating={testimonial.rating}
            className="h-full"
          />
        ))}
      </StaggeredList>
    </Section>
  );
}

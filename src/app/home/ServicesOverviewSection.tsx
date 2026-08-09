'use client';

import Link from 'next/link';
import { Section } from '@/components/design-system/Section';
import { Card } from '@/components/design-system/Card';
import { AnimatedHeadline } from '@/components/design-system/AnimatedHeadline';
import { StaggeredList } from '@/components/animations/StaggeredList';

const services = [
  {
    title: 'Bookkeeping & Close',
    description:
      'Monthly books closed by Day 5. Categorization, reconciliation, and reporting on autopilot.',
    href: '/services/bookkeeping',
    icon: (
      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: 'Visual MIS & Dashboards',
    description:
      'Real-time financial dashboards delivered within 5 business days of month-end. Revenue, expenses, cash flow — all at a glance.',
    href: '/services/dashboards',
    icon: (
      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: 'Virtual CFO & Advisory',
    description:
      'Strategic financial guidance from experienced CFOs. Forecasting, fundraising support, and board-ready reports.',
    href: '/services/cfo',
    icon: (
      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    title: 'Entity & Compliance',
    description:
      'Entity formation, registered agent services, annual filings, and state compliance — handled end to end.',
    href: '/services/entity',
    icon: (
      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

/**
 * Services overview section with 4 animated icon cards linking to individual service pages.
 */
export function ServicesOverviewSection() {
  return (
    <Section padding="lg" ariaLabel="Our services" className="bg-ink/[0.02]">
      <div className="text-center mb-12">
        <AnimatedHeadline
          text="Everything your finance team needs"
          as="h2"
          animation="fade-up"
          className="font-display text-3xl md:text-4xl font-bold text-ink"
        />
        <p className="mt-4 text-ink/60 text-lg max-w-2xl mx-auto">
          From daily bookkeeping to strategic CFO advisory — we handle the full spectrum so you can focus on growth.
        </p>
      </div>

      <StaggeredList
        staggerDelay={120}
        animation="fade-up"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {services.map((service) => (
          <Link key={service.title} href={service.href} className="group block no-underline">
            <Card variant="interactive" className="h-full flex flex-col gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-ink font-display">
                {service.title}
              </h3>
              <p className="text-sm text-ink/60 leading-relaxed flex-1">
                {service.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
                Learn more
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Card>
          </Link>
        ))}
      </StaggeredList>
    </Section>
  );
}

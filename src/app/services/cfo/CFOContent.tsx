'use client';

import { useState } from 'react';
import { Section } from '@/components/design-system/Section';
import { Button } from '@/components/design-system/Button';
import { AnimatedHeadline } from '@/components/design-system/AnimatedHeadline';
import { Card } from '@/components/design-system/Card';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

/**
 * Advisory deliverables — 8 core offerings of the Virtual CFO service.
 * Each has an icon (SVG path), title, and detail text revealed on expand.
 */
const advisoryDeliverables = [
  {
    id: 'cash-flow',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    title: 'Cash Flow Forecasting',
    detail:
      'Rolling 13-week and 12-month cash flow projections updated weekly. Scenario modeling for best, base, and worst case outcomes to inform capital decisions.',
  },
  {
    id: 'budgeting',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    ),
    title: 'Annual Budgeting & Variance Analysis',
    detail:
      'Bottom-up annual budgets aligned to growth goals. Monthly variance reports highlighting deviations with root-cause commentary and corrective recommendations.',
  },
  {
    id: 'fundraising',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    ),
    title: 'Fundraising & Investor Readiness',
    detail:
      'Financial model preparation, data room organization, and due diligence support. Cap table management and investor reporting packages delivered monthly.',
  },
  {
    id: 'kpi',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    ),
    title: 'KPI Dashboards & Board Reporting',
    detail:
      'Custom executive dashboards tracking unit economics, burn rate, LTV/CAC, and gross margin. Board-ready slide decks with financial narrative and forward guidance.',
  },
  {
    id: 'strategic',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    ),
    title: 'Strategic Financial Planning',
    detail:
      'Long-range financial planning tied to business milestones. Pricing strategy analysis, headcount planning, and expansion cost modeling for informed decision-making.',
  },
  {
    id: 'tax-strategy',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    ),
    title: 'Tax Strategy & Optimization',
    detail:
      'Proactive tax planning including R&D credits, entity structure optimization, state tax nexus analysis, and estimated tax payment scheduling to minimize liability.',
  },
  {
    id: 'ma-support',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
      />
    ),
    title: 'M&A and Exit Planning',
    detail:
      'Financial due diligence support for acquisitions, quality of earnings analysis, and exit readiness assessments including valuation benchmarking and deal structure advisory.',
  },
  {
    id: 'systems',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
    ),
    title: 'Financial Systems & Process Design',
    detail:
      'Design and implementation of financial workflows, approval hierarchies, and reporting automation. ERP and tool stack optimization for operational efficiency.',
  },
];

/**
 * Meeting cadence options — weekly and biweekly formats.
 */
const meetingCadence = [
  {
    id: 'weekly',
    frequency: 'Weekly',
    format: '30-minute video call',
    description:
      'Ideal for high-growth companies navigating fundraising, rapid hiring, or market expansion. Real-time guidance on financial decisions as they arise.',
    includes: [
      'Cash flow review and weekly burn update',
      'Action item follow-up from prior week',
      'Ad-hoc strategic questions',
      'Priority issue escalation',
    ],
  },
  {
    id: 'biweekly',
    frequency: 'Biweekly',
    format: '45-minute video call',
    description:
      'Best for stable-growth businesses seeking consistent strategic oversight without the intensity of weekly cadence.',
    includes: [
      'Financial performance review (P&L, balance sheet)',
      'KPI trend analysis and commentary',
      'Upcoming milestone planning',
      'Budget vs. actual variance discussion',
    ],
  },
];

/**
 * Ideal client profile criteria.
 */
const idealClientProfile = [
  {
    id: 'revenue',
    label: 'Annual Revenue',
    value: '$500K+',
    description: 'Businesses generating $500K or more in annual revenue with growing complexity.',
  },
  {
    id: 'tier',
    label: 'Pricing Tier',
    value: 'Growth or Scale',
    description: 'Clients on our Growth or Scale plans who need strategic financial leadership.',
  },
  {
    id: 'stage',
    label: 'Business Stage',
    value: 'Series A+ or Profitable',
    description: 'Post-seed companies with institutional backing or profitable businesses scaling operations.',
  },
  {
    id: 'complexity',
    label: 'Financial Complexity',
    value: 'Multi-entity or Multi-product',
    description: 'Organizations with intercompany transactions, multiple revenue streams, or multi-state presence.',
  },
];

/**
 * CFOContent — Main content component for the Virtual CFO & Advisory page.
 * Implements:
 * - Scope section with animated headline
 * - 8 advisory deliverables as an animated feature grid (expand/collapse on click ≤300ms)
 * - Meeting cadence section (weekly/biweekly formats)
 * - Ideal client profile section (revenue $500K+, Growth or Scale tier)
 * - CTA section → /book
 */
export function CFOContent() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* Scope Section */}
      <Section padding="lg" ariaLabel="Virtual CFO service scope">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal animation="fade-up">
            <AnimatedHeadline
              text="Virtual CFO & Advisory"
              as="h1"
              animation="fade-up"
              className="text-4xl md:text-5xl font-bold font-display text-ink"
            />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <p className="mt-6 text-lg text-ink/70 font-interface leading-relaxed">
              Strategic financial leadership without the full-time overhead. Our Virtual
              CFO service delivers executive-level guidance on cash flow, fundraising,
              tax strategy, and growth planning — tailored to your stage and goals.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={300}>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-ink/60">
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Fractional CFO
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Growth-Stage Focus
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Weekly or Biweekly
              </span>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* Advisory Deliverables — Animated Feature Grid */}
      <Section padding="lg" ariaLabel="Advisory deliverables">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-ink text-center mb-4">
              What Your Virtual CFO Delivers
            </h2>
            <p className="text-center text-ink/60 font-interface mb-10">
              Eight core advisory services designed to drive financial clarity and
              strategic confidence at every stage of growth.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {advisoryDeliverables.map((deliverable, index) => (
              <ScrollReveal
                key={deliverable.id}
                animation="fade-up"
                delay={index * 80}
              >
                <FeatureCard
                  deliverable={deliverable}
                  isExpanded={expandedCard === deliverable.id}
                  onToggle={() => handleToggle(deliverable.id)}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Meeting Cadence Section */}
      <Section padding="lg" ariaLabel="Meeting cadence">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-ink text-center mb-4">
              Meeting Cadence
            </h2>
            <p className="text-center text-ink/60 font-interface mb-10">
              Choose the rhythm that fits your pace. Both formats include async
              support via Slack and email between sessions.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {meetingCadence.map((cadence, index) => (
              <ScrollReveal
                key={cadence.id}
                animation="fade-up"
                delay={index * 120}
              >
                <Card variant="elevated" className="h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-lg font-bold font-display text-ink">
                        {cadence.frequency}
                      </h3>
                      <p className="text-sm text-ink/50 font-interface">
                        {cadence.format}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-ink/70 font-interface mb-4">
                    {cadence.description}
                  </p>
                  <ul className="space-y-2">
                    {cadence.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-ink/80 font-interface"
                      >
                        <svg
                          className="w-4 h-4 text-accent flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Ideal Client Profile Section */}
      <Section padding="lg" ariaLabel="Ideal client profile">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-ink text-center mb-4">
              Ideal Client Profile
            </h2>
            <p className="text-center text-ink/60 font-interface mb-10">
              Our Virtual CFO service is designed for businesses with the scale and
              complexity that demand strategic financial leadership.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {idealClientProfile.map((criteria, index) => (
              <ScrollReveal
                key={criteria.id}
                animation="fade-up"
                delay={index * 100}
              >
                <Card variant="default" className="h-full">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brass/10 text-brass flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs text-ink/50 font-interface uppercase tracking-wider">
                        {criteria.label}
                      </p>
                      <p className="text-lg font-bold font-display text-ink mt-0.5">
                        {criteria.value}
                      </p>
                      <p className="text-sm text-ink/60 font-interface mt-1">
                        {criteria.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section padding="lg" ariaLabel="Call to action">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal animation="fade-up">
            <AnimatedHeadline
              text="Ready for strategic financial leadership?"
              as="h2"
              animation="fade-up"
              className="text-2xl md:text-3xl font-bold font-display text-ink"
            />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <p className="mt-4 text-ink/70 font-interface">
              Book a free consultation to discuss how a Virtual CFO can accelerate
              your business growth and bring clarity to every financial decision.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={300}>
            <div className="mt-8">
              <Button
                variant="accent"
                size="lg"
                href="/book"
                magnetic
              >
                Book a Free Audit
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
}

/**
 * FeatureCard — An icon card that expands/collapses on click with ≤300ms animation.
 * Uses max-height transition for smooth expand/collapse behavior.
 */
function FeatureCard({
  deliverable,
  isExpanded,
  onToggle,
}: {
  deliverable: (typeof advisoryDeliverables)[number];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="rounded-[14px] border border-ink/10 bg-paper shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      <button
        type="button"
        className="w-full text-left p-5 flex items-start gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-[14px]"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-label={`${deliverable.title} — ${isExpanded ? 'collapse' : 'expand'} details`}
      >
        {/* Icon */}
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent flex-shrink-0">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            {deliverable.icon}
          </svg>
        </span>
        {/* Title + expand indicator */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold font-interface text-ink leading-tight">
            {deliverable.title}
          </h3>
        </div>
        {/* Chevron */}
        <span
          className={`ml-2 text-ink/40 transition-transform duration-300 flex-shrink-0 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {/* Expandable detail panel with max-height transition ≤300ms */}
      <div
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight: isExpanded ? '200px' : '0px' }}
        role="region"
        aria-label={`${deliverable.title} details`}
        aria-hidden={!isExpanded}
      >
        <div className="px-5 pb-5 pt-0 pl-[72px]">
          <p className="text-sm text-ink/70 font-interface leading-relaxed">
            {deliverable.detail}
          </p>
        </div>
      </div>
    </div>
  );
}

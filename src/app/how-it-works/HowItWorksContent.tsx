'use client';

import { Section } from '@/components/design-system/Section';
import { AnimatedHeadline } from '@/components/design-system/AnimatedHeadline';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Timeline, type TimelinePhase } from '@/components/content/Timeline';
import { CtaSection } from '@/components/design-system/CtaSection';

/**
 * 14-day onboarding timeline divided into 4 sequential phases.
 * Each phase includes at least 1 deliverable and 1 client responsibility,
 * visually distinguished via type-based styling in the Timeline component.
 */
const onboardingPhases: TimelinePhase[] = [
  {
    id: 'phase-1',
    title: 'Discovery & Access Setup',
    dayRange: 'Days 1–3',
    items: [
      {
        id: 'p1-d1',
        label: 'Kickoff call to understand your business model, tools, and reporting needs',
        type: 'deliverable',
      },
      {
        id: 'p1-d2',
        label: 'Customized onboarding plan with milestones and deadlines',
        type: 'deliverable',
      },
      {
        id: 'p1-r1',
        label: 'Grant read-only access to bank accounts, credit cards, and payment processors',
        type: 'responsibility',
      },
      {
        id: 'p1-r2',
        label: 'Share login credentials for QuickBooks, Xero, or existing accounting platform',
        type: 'responsibility',
      },
    ],
  },
  {
    id: 'phase-2',
    title: 'Historical Review & System Configuration',
    dayRange: 'Days 4–7',
    items: [
      {
        id: 'p2-d1',
        label: 'Audit of last 3 months of transactions and chart of accounts',
        type: 'deliverable',
      },
      {
        id: 'p2-d2',
        label: 'Configure integrations (bank feeds, Stripe, Ramp, payroll)',
        type: 'deliverable',
      },
      {
        id: 'p2-d3',
        label: 'Deliver findings report with identified discrepancies',
        type: 'deliverable',
      },
      {
        id: 'p2-r1',
        label: 'Respond to clarification questions about historical entries',
        type: 'responsibility',
      },
    ],
  },
  {
    id: 'phase-3',
    title: 'Process Setup & First Close',
    dayRange: 'Days 8–11',
    items: [
      {
        id: 'p3-d1',
        label: 'Establish categorization rules, recurring entries, and approval workflows',
        type: 'deliverable',
      },
      {
        id: 'p3-d2',
        label: 'Complete first monthly close with full reconciliation',
        type: 'deliverable',
      },
      {
        id: 'p3-r1',
        label: 'Review and approve the proposed chart of accounts structure',
        type: 'responsibility',
      },
      {
        id: 'p3-r2',
        label: 'Approve first-month financial statements',
        type: 'responsibility',
      },
    ],
  },
  {
    id: 'phase-4',
    title: 'Dashboard Delivery & Handoff',
    dayRange: 'Days 12–14',
    items: [
      {
        id: 'p4-d1',
        label: 'Custom financial dashboard configured with your KPIs and metrics',
        type: 'deliverable',
      },
      {
        id: 'p4-d2',
        label: 'Documented SOPs for ongoing monthly close process',
        type: 'deliverable',
      },
      {
        id: 'p4-d3',
        label: 'Dedicated Slack channel and ongoing support schedule established',
        type: 'deliverable',
      },
      {
        id: 'p4-r1',
        label: 'Confirm dashboard metrics and reporting preferences',
        type: 'responsibility',
      },
    ],
  },
];

export function HowItWorksContent() {
  return (
    <>
      {/* Hero Section */}
      <Section padding="lg" ariaLabel="How it works introduction">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal animation="fade-up">
            <AnimatedHeadline
              text="How It Works"
              as="h1"
              animation="fade-up"
              className="text-4xl md:text-5xl font-bold font-display text-ink"
            />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <p className="mt-6 text-lg text-ink/70 font-interface leading-relaxed">
              From signup to full financial visibility in just 14 days. Our structured
              onboarding process ensures a smooth transition with zero disruption to
              your business operations.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={300}>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-ink/60">
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                14 Days
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                4 Phases
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Dedicated Team
              </span>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* Onboarding Timeline Section */}
      <Section padding="lg" ariaLabel="14-day onboarding timeline">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-ink text-center mb-4">
              Your 14-Day Onboarding Journey
            </h2>
            <p className="text-center text-ink/60 font-interface mb-10">
              Each phase has clear deliverables from our team and simple responsibilities
              on your end. We keep the process collaborative and transparent.
            </p>
          </ScrollReveal>

          {/* Legend for item types */}
          <ScrollReveal animation="fade-up" delay={100}>
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm">
              <span className="inline-flex items-center gap-2 text-ink/80">
                <svg
                  className="h-4 w-4 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Our Deliverable
              </span>
              <span className="inline-flex items-center gap-2 text-brass">
                <svg
                  className="h-4 w-4 text-brass"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Your Responsibility
              </span>
            </div>
          </ScrollReveal>

          <Timeline
            phases={onboardingPhases}
            className="mt-4"
          />
        </div>
      </Section>

      {/* CTA Section */}
      <CtaSection
        headline="Ready to get started?"
        description="Book a free audit call and we'll walk you through the entire onboarding process. In just 14 days, you'll have complete financial visibility."
      />
    </>
  );
}

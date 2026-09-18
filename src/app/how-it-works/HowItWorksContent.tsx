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
        label: 'Kickoff Call To Understand Your Business Model, Tools And Reporting Needs',
        type: 'deliverable',
      },
      {
        id: 'p1-d2',
        label: 'Customized Onboarding Plan With Milestones And Deadlines',
        type: 'deliverable',
      },
      {
        id: 'p1-r1',
        label: 'Grant Read-Only Access To Bank Accounts, Credit Cards And Payment Processors',
        type: 'responsibility',
      },
      {
        id: 'p1-r2',
        label: 'Share Login Credentials For QuickBooks, Xero Or Existing Accounting Platform',
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
        label: 'Audit Of Last 3 Months Of Transactions And Chart Of Accounts',
        type: 'deliverable',
      },
      {
        id: 'p2-d2',
        label: 'Configure Integrations (Bank Feeds, Stripe, Ramp, Payroll)',
        type: 'deliverable',
      },
      {
        id: 'p2-d3',
        label: 'Deliver Findings Report With Identified Discrepancies',
        type: 'deliverable',
      },
      {
        id: 'p2-r1',
        label: 'Respond To Clarification Questions About Historical Entries',
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
        label: 'Establish Categorization Rules, Recurring Entries And Approval Workflows',
        type: 'deliverable',
      },
      {
        id: 'p3-d2',
        label: 'Complete First Monthly Close With Full Reconciliation',
        type: 'deliverable',
      },
      {
        id: 'p3-r1',
        label: 'Review And Approve The Proposed Chart Of Accounts Structure',
        type: 'responsibility',
      },
      {
        id: 'p3-r2',
        label: 'Approve First-Month Financial Statements',
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
        label: 'Custom Financial Dashboard Configured With Your KPIs And Metrics',
        type: 'deliverable',
      },
      {
        id: 'p4-d2',
        label: 'Documented SOPs For Ongoing Monthly Close Process',
        type: 'deliverable',
      },
      {
        id: 'p4-d3',
        label: 'Dedicated Slack Channel And Ongoing Support Schedule Established',
        type: 'deliverable',
      },
      {
        id: 'p4-r1',
        label: 'Confirm Dashboard Metrics And Reporting Preferences',
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
              From Signup To Full Financial Visibility In Just 14 Days. Our Structured
              Onboarding Process Ensures A Smooth Transition With Zero Disruption To
              Your Business Operations.
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
              Each Phase Has Clear Deliverables From Our Team And Simple Responsibilities
              On Your End. We Keep The Process Collaborative And Transparent.
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
        headline="Ready To Get Started?"
        description="Book A Free Audit Call And We'll Walk You Through The Entire Onboarding Process. In Just 14 Days, You'll Have Complete Financial Visibility."
      />
    </>
  );
}

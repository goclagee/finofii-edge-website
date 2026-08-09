'use client';

import { Section } from '@/components/design-system/Section';
import { Button } from '@/components/design-system/Button';
import { Tooltip } from '@/components/design-system/Tooltip';
import { AnimatedHeadline } from '@/components/design-system/AnimatedHeadline';
import { Card } from '@/components/design-system/Card';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Timeline, type TimelinePhase } from '@/components/content/Timeline';

/**
 * Monthly close cadence phases — 6 sequential steps representing
 * the full monthly bookkeeping cycle.
 */
const monthlyCloseCadence: TimelinePhase[] = [
  {
    id: 'phase-1',
    title: 'Transaction Ingestion & Categorization',
    dayRange: 'Days 1–3',
    items: [
      {
        id: 'p1-1',
        label: 'Import bank and credit card feeds from connected accounts',
        type: 'deliverable',
      },
      {
        id: 'p1-2',
        label: 'Categorize transactions using rule-based engine',
        type: 'deliverable',
      },
      {
        id: 'p1-3',
        label: 'Flag unrecognized transactions for review',
        type: 'milestone',
      },
    ],
  },
  {
    id: 'phase-2',
    title: 'Bank & Credit Card Reconciliation',
    dayRange: 'Days 3–5',
    items: [
      {
        id: 'p2-1',
        label: 'Reconcile all bank accounts to statement balances',
        type: 'deliverable',
      },
      {
        id: 'p2-2',
        label: 'Reconcile credit card and payment processor accounts',
        type: 'deliverable',
      },
      {
        id: 'p2-3',
        label: 'Resolve discrepancies and outstanding items',
        type: 'milestone',
      },
    ],
  },
  {
    id: 'phase-3',
    title: 'Revenue Recognition & AR/AP',
    dayRange: 'Days 5–7',
    items: [
      {
        id: 'p3-1',
        label: 'Record revenue per ASC 606 or cash basis',
        type: 'deliverable',
      },
      {
        id: 'p3-2',
        label: 'Update accounts receivable aging schedule',
        type: 'deliverable',
      },
      {
        id: 'p3-3',
        label: 'Process accounts payable and vendor payments',
        type: 'deliverable',
      },
    ],
  },
  {
    id: 'phase-4',
    title: 'Accruals, Prepaids & Adjusting Entries',
    dayRange: 'Days 7–9',
    items: [
      {
        id: 'p4-1',
        label: 'Book accrued expenses and prepaid amortization',
        type: 'deliverable',
      },
      {
        id: 'p4-2',
        label: 'Record depreciation and amortization entries',
        type: 'deliverable',
      },
      {
        id: 'p4-3',
        label: 'Post intercompany and payroll journal entries',
        type: 'deliverable',
      },
    ],
  },
  {
    id: 'phase-5',
    title: 'Financial Statement Preparation',
    dayRange: 'Days 9–11',
    items: [
      {
        id: 'p5-1',
        label: 'Generate trial balance and resolve variances',
        type: 'deliverable',
      },
      {
        id: 'p5-2',
        label: 'Prepare income statement, balance sheet, and cash flow statement',
        type: 'deliverable',
      },
      {
        id: 'p5-3',
        label: 'Produce management commentary on key movements',
        type: 'milestone',
      },
    ],
  },
  {
    id: 'phase-6',
    title: 'Review, Close & Deliver',
    dayRange: 'Days 11–14',
    items: [
      {
        id: 'p6-1',
        label: 'Senior accountant review and sign-off',
        type: 'deliverable',
      },
      {
        id: 'p6-2',
        label: 'Lock the period in the general ledger',
        type: 'milestone',
      },
      {
        id: 'p6-3',
        label: 'Deliver close package via dashboard and email',
        type: 'deliverable',
      },
    ],
  },
];

/**
 * Service deliverables for the Bookkeeping & Close service.
 */
const deliverables = [
  'Full-cycle monthly bookkeeping and reconciliation',
  'Month-end close within 14 business days',
  'Accounts payable and receivable management',
  'Revenue recognition (ASC 606 or cash basis)',
  'Bank and credit card reconciliation',
  'Payroll journal entry posting',
  'Accrual and prepaid amortization schedules',
  'Monthly financial statements (P&L, Balance Sheet, Cash Flow)',
  'Variance analysis and management commentary',
  'Audit-ready books with clean documentation',
];

/**
 * Tool stack — accounting platforms and fintech tools we integrate with.
 */
const toolStack = [
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    tooltip: 'Full two-way sync with QuickBooks Online for real-time GL updates',
    color: '#2CA01C',
  },
  {
    id: 'xero',
    name: 'Xero',
    tooltip: 'Native Xero integration for bank feeds, invoicing, and reporting',
    color: '#13B5EA',
  },
  {
    id: 'ramp',
    name: 'Ramp',
    tooltip: 'Automated expense categorization and receipt matching from Ramp',
    color: '#1A1A1A',
  },
  {
    id: 'brex',
    name: 'Brex',
    tooltip: 'Direct Brex feed integration for corporate card transactions',
    color: '#F46036',
  },
  {
    id: 'mercury',
    name: 'Mercury',
    tooltip: 'Mercury banking data sync for startup-friendly reconciliation',
    color: '#5B41FF',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    tooltip: 'Stripe revenue and payout reconciliation with fee breakdowns',
    color: '#635BFF',
  },
];

/**
 * Tool logo card component — displays a tool name with its brand color accent
 * and a hover/tap tooltip describing integration capability.
 */
function ToolLogoCard({
  tool,
}: {
  tool: (typeof toolStack)[number];
}) {
  return (
    <Tooltip content={tool.tooltip} position="top">
      <div
        className="group flex flex-col items-center justify-center gap-3 rounded-[14px] border border-ink/10 bg-paper p-5 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1 focus-within:shadow-lg focus-within:-translate-y-1 cursor-default"
        tabIndex={0}
        role="button"
        aria-label={`${tool.name} — ${tool.tooltip}`}
      >
        {/* Brand color accent dot */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
          style={{ backgroundColor: tool.color }}
          aria-hidden="true"
        >
          {tool.name.charAt(0)}
        </div>
        <span className="text-sm font-medium text-ink text-center">
          {tool.name}
        </span>
      </div>
    </Tooltip>
  );
}

export function BookkeepingContent() {
  return (
    <>
      {/* Hero / Scope Section */}
      <Section padding="lg" ariaLabel="Bookkeeping service scope">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal animation="fade-up">
            <AnimatedHeadline
              text="Bookkeeping & Close"
              as="h1"
              animation="fade-up"
              className="text-4xl md:text-5xl font-bold font-display text-ink"
            />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <p className="mt-6 text-lg text-ink/70 font-interface leading-relaxed">
              Full-cycle monthly bookkeeping designed for growing businesses. We handle
              transaction categorization, reconciliation, accruals, and month-end close
              so your books are audit-ready every single month — delivered within 14
              business days of period end.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={300}>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-ink/60">
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                SOC 2 Compliant
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                14-Day Close SLA
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

      {/* Monthly Cadence Timeline */}
      <Section padding="lg" ariaLabel="Monthly close cadence">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-ink text-center mb-4">
              Monthly Close Cadence
            </h2>
            <p className="text-center text-ink/60 font-interface mb-10">
              Our structured 6-phase process ensures accuracy and consistency every month.
            </p>
          </ScrollReveal>
          <Timeline
            phases={monthlyCloseCadence}
            className="mt-4"
          />
        </div>
      </Section>

      {/* Deliverables Section */}
      <Section padding="lg" ariaLabel="Service deliverables">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-ink text-center mb-8">
              What You Get
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deliverables.map((item, index) => (
              <ScrollReveal
                key={item}
                animation="fade-up"
                delay={index * 80}
              >
                <Card variant="default" className="flex items-start gap-3 p-4">
                  <svg
                    className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-ink/80 font-interface">
                    {item}
                  </span>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Tool Stack Section */}
      <Section padding="lg" ariaLabel="Integrated tool stack">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-ink text-center mb-4">
              Our Tool Stack
            </h2>
            <p className="text-center text-ink/60 font-interface mb-10">
              We integrate with the platforms you already use — no migration required.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {toolStack.map((tool, index) => (
              <ScrollReveal
                key={tool.id}
                animation="scale"
                delay={index * 100}
              >
                <ToolLogoCard tool={tool} />
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
              text="Ready to close your books on time?"
              as="h2"
              animation="fade-up"
              className="text-2xl md:text-3xl font-bold font-display text-ink"
            />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <p className="mt-4 text-ink/70 font-interface">
              Get a free audit of your current bookkeeping process. We&apos;ll show you
              exactly how to cut your close time and keep your books audit-ready.
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

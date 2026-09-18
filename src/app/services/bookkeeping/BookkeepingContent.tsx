'use client';

import { Section } from '@/components/design-system/Section';
import { Tooltip } from '@/components/design-system/Tooltip';
import { AnimatedHeadline } from '@/components/design-system/AnimatedHeadline';
import { Card } from '@/components/design-system/Card';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Timeline, type TimelinePhase } from '@/components/content/Timeline';
import { CtaSection } from '@/components/design-system/CtaSection';

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
        label: 'Import Bank And Credit Card Feeds From Connected Accounts',
        type: 'deliverable',
      },
      {
        id: 'p1-2',
        label: 'Categorize Transactions Using Rule-Based Engine',
        type: 'deliverable',
      },
      {
        id: 'p1-3',
        label: 'Flag Unrecognized Transactions For Review',
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
        label: 'Reconcile All Bank Accounts To Statement Balances',
        type: 'deliverable',
      },
      {
        id: 'p2-2',
        label: 'Reconcile Credit Card And Payment Processor Accounts',
        type: 'deliverable',
      },
      {
        id: 'p2-3',
        label: 'Resolve Discrepancies And Outstanding Items',
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
        label: 'Record Revenue Per ASC 606 Or Cash Basis',
        type: 'deliverable',
      },
      {
        id: 'p3-2',
        label: 'Update Accounts Receivable Aging Schedule',
        type: 'deliverable',
      },
      {
        id: 'p3-3',
        label: 'Process Accounts Payable And Vendor Payments',
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
        label: 'Book Accrued Expenses And Prepaid Amortization',
        type: 'deliverable',
      },
      {
        id: 'p4-2',
        label: 'Record Depreciation And Amortization Entries',
        type: 'deliverable',
      },
      {
        id: 'p4-3',
        label: 'Post Intercompany And Payroll Journal Entries',
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
        label: 'Generate Trial Balance And Resolve Variances',
        type: 'deliverable',
      },
      {
        id: 'p5-2',
        label: 'Prepare Income Statement, Balance Sheet And Cash Flow Statement',
        type: 'deliverable',
      },
      {
        id: 'p5-3',
        label: 'Produce Management Commentary On Key Movements',
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
        label: 'Senior Accountant Review And Sign-Off',
        type: 'deliverable',
      },
      {
        id: 'p6-2',
        label: 'Lock The Period In The General Ledger',
        type: 'milestone',
      },
      {
        id: 'p6-3',
        label: 'Deliver Close Package Via Dashboard And Email',
        type: 'deliverable',
      },
    ],
  },
];

/**
 * Service deliverables for the Bookkeeping & Accounting service.
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
    tooltip: 'Full Two-Way Sync With QuickBooks Online For Real-Time GL Updates',
    color: '#2CA01C',
  },
  {
    id: 'xero',
    name: 'Xero',
    tooltip: 'Native Xero Integration For Bank Feeds, Invoicing And Reporting',
    color: '#13B5EA',
  },
  {
    id: 'ramp',
    name: 'Ramp',
    tooltip: 'Automated Expense Categorization And Receipt Matching From Ramp',
    color: '#1A1A1A',
  },
  {
    id: 'brex',
    name: 'Brex',
    tooltip: 'Direct Brex Feed Integration For Corporate Card Transactions',
    color: '#F46036',
  },
  {
    id: 'mercury',
    name: 'Mercury',
    tooltip: 'Mercury Banking Data Sync For Startup-Friendly Reconciliation',
    color: '#5B41FF',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    tooltip: 'Stripe Revenue And Payout Reconciliation With Fee Breakdowns',
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
              text="Bookkeeping & Accounting"
              as="h1"
              animation="fade-up"
              className="text-4xl md:text-5xl font-bold font-display text-ink"
            />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <p className="mt-6 text-lg text-ink/70 font-interface leading-relaxed">
              Full-Cycle Monthly Bookkeeping Designed For Growing Businesses. We Handle
              Transaction Categorization, Reconciliation, Accruals And Month-End Close
              So Your Books Are Audit-Ready Every Single Month — Delivered Within 14
              Business Days Of Period End.
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
              Our Structured 6-Phase Process Ensures Accuracy And Consistency Every Month.
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
              We Integrate With The Platforms You Already Use — No Migration Required.
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
      <CtaSection
        headline="Ready To Close Your Books On Time?"
        description="Get A Free Audit Of Your Current Bookkeeping Process. We'll Show You Exactly How To Cut Your Close Time And Keep Your Books Audit-Ready."
      />
    </>
  );
}

'use client';

import { useState } from 'react';
import { OptimizedImage } from '@/components/OptimizedImage';
import { Section } from '@/components/design-system/Section';
import { Card } from '@/components/design-system/Card';
import { Badge } from '@/components/design-system/Badge';
import { Button } from '@/components/design-system/Button';
import { AnimatedHeadline } from '@/components/design-system/AnimatedHeadline';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { CounterAnimation } from '@/components/animations/CounterAnimation';
import { Lightbox } from '@/components/content/Lightbox';

/* ─── Report Catalogue Data ─────────────────────────────────────────────── */

interface ReportCard {
  id: string;
  name: string;
  description: string;
  category: string;
  categoryVariant: 'accent' | 'brass' | 'flag' | 'default';
}

const reports: ReportCard[] = [
  {
    id: 'pnl',
    name: 'Profit & Loss Statement',
    description:
      'Monthly income statement with revenue breakdowns, COGS, and operating expense categorization.',
    category: 'Financial Statements',
    categoryVariant: 'accent',
  },
  {
    id: 'cashflow',
    name: 'Cash Flow Forecast',
    description:
      '13-week rolling cash flow projection with scenario modeling for best, base, and worst cases.',
    category: 'Cash Management',
    categoryVariant: 'brass',
  },
  {
    id: 'ar-aging',
    name: 'AR Aging Report',
    description:
      'Accounts receivable aging buckets (0–30, 31–60, 61–90, 90+ days) with collection probability scoring.',
    category: 'Receivables',
    categoryVariant: 'flag',
  },
  {
    id: 'burn-rate',
    name: 'Burn Rate Dashboard',
    description:
      'Monthly burn analysis with runway projection, headcount cost allocation, and trend indicators.',
    category: 'Cash Management',
    categoryVariant: 'brass',
  },
  {
    id: 'revenue-cohort',
    name: 'Revenue Cohort Analysis',
    description:
      'Customer cohort retention and expansion revenue tracking with MoM and YoY comparison views.',
    category: 'Revenue Analytics',
    categoryVariant: 'accent',
  },
  {
    id: 'vendor-spend',
    name: 'Vendor Spend Summary',
    description:
      'Top vendor analysis by category, payment terms compliance, and month-over-month variance alerts.',
    category: 'Expense Management',
    categoryVariant: 'default',
  },
  {
    id: 'margin-analysis',
    name: 'Gross Margin Analysis',
    description:
      'Product and service-level margin breakdown with contribution analysis and trend visualization.',
    category: 'Financial Statements',
    categoryVariant: 'accent',
  },
  {
    id: 'kpi-scorecard',
    name: 'Executive KPI Scorecard',
    description:
      'Board-ready summary of key performance indicators with traffic-light status and target tracking.',
    category: 'Revenue Analytics',
    categoryVariant: 'accent',
  },
];

/* ─── Sample Dashboard Screenshots ───────────────────────────────────────── */

interface DashboardScreenshot {
  id: string;
  src: string;
  alt: string;
  title: string;
}

const screenshots: DashboardScreenshot[] = [
  {
    id: 'overview',
    src: '/images/dashboards/dashboard-overview.png',
    alt: 'Financial dashboard overview showing monthly revenue trend line chart, expense pie chart, and key metric cards for net income, gross margin, and operating expenses',
    title: 'Dashboard Overview',
  },
  {
    id: 'revenue',
    src: '/images/dashboards/revenue-breakdown.png',
    alt: 'Revenue breakdown dashboard displaying stacked bar chart of revenue by product line, customer acquisition cost trend, and lifetime value metrics per cohort',
    title: 'Revenue Breakdown',
  },
  {
    id: 'cashflow',
    src: '/images/dashboards/cashflow-forecast.png',
    alt: 'Cash flow forecast dashboard with 13-week projection area chart, runway indicator gauge, and weekly burn rate comparison bars for actuals versus budget',
    title: 'Cash Flow Forecast',
  },
];

/* ─── Delivery SLA Data ──────────────────────────────────────────────────── */

interface SLACommitment {
  id: string;
  metric: number;
  suffix: string;
  label: string;
  description: string;
}

const slaCommitments: SLACommitment[] = [
  {
    id: 'delivery',
    metric: 5,
    suffix: ' days',
    label: 'Report Delivery',
    description: 'Reports delivered within 5 business days of month-end close',
  },
  {
    id: 'accuracy',
    metric: 99,
    suffix: '%',
    label: 'Data Accuracy',
    description: 'Guaranteed data accuracy with multi-point reconciliation checks',
  },
  {
    id: 'uptime',
    metric: 99.9,
    suffix: '%',
    label: 'Dashboard Uptime',
    description: 'Live dashboards available with 99.9% uptime SLA',
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export function DashboardsContent() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeScreenshot, setActiveScreenshot] = useState<DashboardScreenshot | null>(null);

  const openLightbox = (screenshot: DashboardScreenshot) => {
    setActiveScreenshot(screenshot);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setActiveScreenshot(null);
  };

  return (
    <>
      {/* Hero Section */}
      <Section padding="lg" ariaLabel="Visual MIS and Dashboards overview">
        <div className="text-center max-w-3xl mx-auto">
          <ScrollReveal animation="fade-up">
            <AnimatedHeadline
              text="Visual MIS & Dashboards"
              as="h1"
              animation="fade-up"
              className="text-4xl md:text-5xl font-bold font-display text-ink"
            />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <p className="mt-4 text-lg text-ink/70 font-interface leading-relaxed">
              Custom financial dashboards and report catalogues that transform your
              raw accounting data into clear, actionable insights — delivered within
              days of month-end.
            </p>
          </ScrollReveal>
        </div>
      </Section>

      {/* Report Catalogue Grid */}
      <Section padding="md" ariaLabel="Report catalogue">
        <ScrollReveal animation="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-ink text-center mb-8">
            Report Catalogue
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <ScrollReveal
              key={report.id}
              animation="fade-up"
              delay={index * 80}
            >
              <Card variant="elevated" className="h-full flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base font-semibold font-display text-ink leading-tight">
                    {report.name}
                  </h3>
                  <Badge
                    variant={report.categoryVariant}
                    size="sm"
                    className="flex-shrink-0"
                  >
                    {report.category}
                  </Badge>
                </div>
                <p className="text-sm text-ink/70 font-interface leading-relaxed flex-1">
                  {report.description}
                </p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* Sample Output Previews */}
      <Section padding="lg" ariaLabel="Sample dashboard previews">
        <ScrollReveal animation="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-ink text-center mb-4">
            Sample Output Previews
          </h2>
          <p className="text-center text-ink/60 font-interface mb-8">
            Click any screenshot to view at full resolution
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {screenshots.map((screenshot, index) => (
            <ScrollReveal
              key={screenshot.id}
              animation="fade-up"
              delay={index * 120}
            >
              <button
                type="button"
                onClick={() => openLightbox(screenshot)}
                className="group relative w-full rounded-[14px] overflow-hidden border border-ink/10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                aria-label={`View ${screenshot.title} at full resolution`}
              >
                <div className="relative aspect-[16/10] w-full">
                  <OptimizedImage
                    src={screenshot.src}
                    alt={screenshot.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-paper/90 text-ink px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    View Full Size
                  </span>
                </div>
                <div className="p-3 bg-paper text-left">
                  <span className="text-sm font-medium font-interface text-ink">
                    {screenshot.title}
                  </span>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* Delivery SLA Commitments */}
      <Section padding="lg" ariaLabel="Delivery SLA commitments">
        <ScrollReveal animation="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-ink text-center mb-10">
            Delivery SLA Commitments
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {slaCommitments.map((sla, index) => (
            <ScrollReveal
              key={sla.id}
              animation="fade-up"
              delay={index * 150}
            >
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  <CounterAnimation
                    end={sla.metric}
                    suffix={sla.suffix}
                    duration={1800}
                    decimals={sla.metric % 1 !== 0 ? 1 : 0}
                  />
                </div>
                <h3 className="text-lg font-semibold font-display text-ink mb-1">
                  {sla.label}
                </h3>
                <p className="text-sm text-ink/60 font-interface">
                  {sla.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section padding="lg" ariaLabel="Call to action">
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-2xl mx-auto">
            <AnimatedHeadline
              text="Get Your Custom Dashboard"
              as="h2"
              animation="fade-up"
              className="text-2xl md:text-3xl font-bold font-display text-ink mb-4"
            />
            <p className="text-ink/70 font-interface mb-8">
              Book a free audit to see how our visual MIS can transform your
              financial reporting workflow.
            </p>
            <Button variant="accent" size="lg" href="/book" magnetic>
              Book a Free Audit
            </Button>
          </div>
        </ScrollReveal>
      </Section>

      {/* Lightbox */}
      {activeScreenshot && (
        <Lightbox
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          src={activeScreenshot.src}
          alt={activeScreenshot.alt}
        />
      )}
    </>
  );
}

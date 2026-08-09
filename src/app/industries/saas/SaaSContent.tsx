'use client';

import dynamic from 'next/dynamic';
import { Section } from '@/components/design-system/Section';
import { Button } from '@/components/design-system/Button';
import { Badge } from '@/components/design-system/Badge';
import { Card } from '@/components/design-system/Card';
import { AnimatedHeadline } from '@/components/design-system/AnimatedHeadline';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ChartContainer } from '@/components/charts/ChartContainer';
import type { SummaryMetric, ChartDataPoint } from '@/types/dashboard';

// Lazy-load chart components for reduced initial bundle
const MetricCard = dynamic(
  () => import('@/components/charts/MetricCard').then((mod) => ({ default: mod.MetricCard })),
  { ssr: false, loading: () => <div className="bg-paper border border-ink/10 rounded-[14px] p-5 animate-pulse h-[100px]" /> }
);

const FinancialLineChart = dynamic(
  () => import('@/components/charts/LineChart').then((mod) => ({ default: mod.FinancialLineChart })),
  { ssr: false, loading: () => <div className="w-full h-[320px] bg-ink/5 rounded-[14px] animate-pulse" /> }
);

/**
 * SaaS-specific MRR growth data for chart example.
 */
const mrrData: ChartDataPoint[] = [
  { label: 'Jan', mrr: 82000, churn: 4100 },
  { label: 'Feb', mrr: 89000, churn: 3800 },
  { label: 'Mar', mrr: 97000, churn: 4200 },
  { label: 'Apr', mrr: 108000, churn: 3900 },
  { label: 'May', mrr: 118000, churn: 4500 },
  { label: 'Jun', mrr: 132000, churn: 4100 },
];

/**
 * SaaS-specific metric highlights.
 */
const metrics: SummaryMetric[] = [
  { label: 'Monthly Recurring Revenue', value: 132000, prefix: '$', trend: 'up', trendValue: 11.9, suffix: undefined },
  { label: 'Net Revenue Retention', value: 112, suffix: '%', trend: 'up', trendValue: 3.2, prefix: undefined },
  { label: 'CAC Payback Period', value: 8.2, suffix: ' mo', trend: 'down', trendValue: -18, prefix: undefined },
  { label: 'Gross Margin', value: 78.5, suffix: '%', trend: 'up', trendValue: 2.1, prefix: undefined },
];

/**
 * Pain points specific to SaaS startups.
 */
const painPoints = [
  {
    title: 'Revenue recognition under ASC 606',
    description: 'Annual contracts, usage-based billing, and multi-element arrangements require careful revenue recognition that most basic bookkeeping misses entirely.',
  },
  {
    title: 'Deferred revenue and contract liability tracking',
    description: 'Prepaid annual subscriptions create deferred revenue obligations. Getting this wrong means misstated financials that scare off investors.',
  },
  {
    title: 'SaaS metrics for investor reporting',
    description: 'VCs expect MRR, ARR, NRR, CAC payback, and LTV/CAC ratios. These require clean financial data tied to subscription analytics — not spreadsheet estimates.',
  },
  {
    title: 'R&D capitalization and tax credits',
    description: 'Properly capitalizing development costs and claiming R&D tax credits can save hundreds of thousands annually, but requires meticulous time and cost tracking.',
  },
];

/**
 * Case study excerpt for a SaaS startup.
 */
const caseStudy = {
  industry: 'SaaS',
  headline: 'Series A startup saves $340K in R&D tax credits',
  excerpt: 'A B2B SaaS company at $1.5M ARR had never claimed R&D credits. Finofii Edge implemented proper cost capitalization and retroactively filed for three years of credits, funding an entire engineering hire.',
  metrics: [
    { label: 'R&D Credits Recovered', before: '$0', after: '$340K' },
    { label: 'Investor-Ready Close', before: '35 days', after: '7 days' },
  ],
};

export function SaaSContent() {
  return (
    <>
      {/* Hero Section */}
      <Section padding="lg" ariaLabel="SaaS startups hero">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal animation="fade-up">
            <Badge variant="accent" className="mb-4">SaaS & Startups</Badge>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={100}>
            <AnimatedHeadline
              text="Investor-grade financials for SaaS companies"
              as="h1"
              animation="fade-up"
              className="text-4xl md:text-5xl font-bold font-display text-ink"
            />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={200}>
            <p className="mt-6 text-lg text-ink/70 font-interface leading-relaxed">
              Revenue recognition, deferred revenue, and SaaS metrics are table stakes
              for fundraising. We deliver audit-ready books and investor reporting
              packages that close rounds faster.
            </p>
          </ScrollReveal>
        </div>
      </Section>

      {/* Pain Points Section */}
      <Section padding="lg" ariaLabel="SaaS pain points">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-ink text-center mb-10">
              Challenges SaaS Startups Face
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {painPoints.map((point, index) => (
              <ScrollReveal key={point.title} animation="fade-up" delay={index * 100}>
                <Card variant="default" className="h-full">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-flag/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-flag" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink font-interface">{point.title}</h3>
                      <p className="mt-2 text-sm text-ink/60 font-interface leading-relaxed">{point.description}</p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Metrics Section */}
      <Section padding="lg" ariaLabel="SaaS key metrics">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-ink text-center mb-10">
              Key Metrics We Track for SaaS
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <ScrollReveal key={metric.label} animation="fade-up" delay={index * 100}>
                <MetricCard metric={metric} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Chart Section */}
      <Section padding="lg" ariaLabel="SaaS MRR chart">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="fade-up">
            <ChartContainer
              title="MRR Growth vs. Churn"
              description="6-month trend of monthly recurring revenue against churn for a SaaS startup."
              data={mrrData}
              accessibleTableData={mrrData.map((d) => ({
                Month: d.label as string,
                MRR: `$${(d.mrr as number).toLocaleString()}`,
                Churn: `$${(d.churn as number).toLocaleString()}`,
              }))}
            >
              <FinancialLineChart
                data={mrrData}
                xKey="label"
                yKeys={['mrr', 'churn']}
                colors={['#1CB894', '#B4523E']}
                height={300}
              />
            </ChartContainer>
          </ScrollReveal>
        </div>
      </Section>

      {/* Case Study Excerpt */}
      <Section padding="lg" ariaLabel="SaaS case study">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal animation="fade-up">
            <Card variant="elevated" className="p-8">
              <Badge variant="accent" className="mb-4">{caseStudy.industry}</Badge>
              <h3 className="text-xl font-bold font-display text-ink mb-3">
                {caseStudy.headline}
              </h3>
              <p className="text-ink/70 font-interface leading-relaxed mb-6">
                {caseStudy.excerpt}
              </p>
              <div className="flex flex-wrap gap-6 mb-6">
                {caseStudy.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <span className="text-xs text-ink/50 font-interface block">{m.label}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-data text-flag line-through">{m.before}</span>
                      <span className="text-sm text-ink/40">→</span>
                      <span className="text-sm font-data text-accent font-semibold">{m.after}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" href="/case-studies">
                Read full case study →
              </Button>
            </Card>
          </ScrollReveal>
        </div>
      </Section>

      {/* CTA Section */}
      <Section padding="lg" ariaLabel="Call to action">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal animation="fade-up">
            <AnimatedHeadline
              text="Ready for investor-grade financials?"
              as="h2"
              animation="fade-up"
              className="text-2xl md:text-3xl font-bold font-display text-ink"
            />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <p className="mt-4 text-ink/70 font-interface">
              Get a free audit of your SaaS financials. We&apos;ll review your revenue
              recognition, identify unclaimed R&D credits, and get your books VC-ready.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={300}>
            <div className="mt-8">
              <Button
                variant="accent"
                size="lg"
                href="/book?industry=saas"
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

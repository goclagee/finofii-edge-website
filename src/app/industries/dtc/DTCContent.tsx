'use client';

import dynamic from 'next/dynamic';
import { Section } from '@/components/design-system/Section';
import { Button } from '@/components/design-system/Button';
import { Badge } from '@/components/design-system/Badge';
import { Card } from '@/components/design-system/Card';
import { AnimatedHeadline } from '@/components/design-system/AnimatedHeadline';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { CtaSection } from '@/components/design-system/CtaSection';
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
 * DTC-specific revenue data for chart example.
 */
const revenueData: ChartDataPoint[] = [
  { label: 'Jan', revenue: 216000, adSpend: 43200 },
  { label: 'Feb', revenue: 211000, adSpend: 42200 },
  { label: 'Mar', revenue: 238000, adSpend: 47600 },
  { label: 'Apr', revenue: 245000, adSpend: 44100 },
  { label: 'May', revenue: 267000, adSpend: 48060 },
  { label: 'Jun', revenue: 289000, adSpend: 49130 },
];

/**
 * DTC-specific metric highlights.
 */
const metrics: SummaryMetric[] = [
  { label: 'Gross Revenue', value: 289000, prefix: '$', trend: 'up', trendValue: 8.2, suffix: undefined },
  { label: 'ROAS', value: 5.9, suffix: 'x', trend: 'up', trendValue: 18, prefix: undefined },
  { label: 'Net Margin', value: 31.4, suffix: '%', trend: 'up', trendValue: 3.3, prefix: undefined },
  { label: 'Customer LTV', value: 187, prefix: '$', trend: 'up', trendValue: 12, suffix: undefined },
];

/**
 * Pain points specific to DTC brands.
 */
const painPoints = [
  {
    title: 'Revenue Reconciliation Across Multiple Channels',
    description: 'Shopify, Amazon, Wholesale — Revenue Comes From Everywhere. Without Proper Reconciliation, You Are Flying Blind On True Profitability Per Channel.',
  },
  {
    title: 'Ad Spend Tracking And ROAS Attribution',
    description: 'Meta, Google, TikTok Budgets Add Up Fast. Knowing Your Actual Return On Ad Spend Requires Clean Financials That Tie Marketing Cost To Revenue.',
  },
  {
    title: 'Inventory And COGS Complexity',
    description: 'Managing SKU-Level Cost Of Goods, Freight And Landed Cost Calculations Manually Leads To Inaccurate Margins And Tax Surprises.',
  },
  {
    title: 'Sales Tax Compliance Across States',
    description: 'Nexus Obligations Grow With Every State You Ship To. One Missed Filing Means Penalties That Eat Into Already-Thin Margins.',
  },
];

/**
 * Case study excerpt for a DTC brand.
 */
const caseStudy = {
  industry: 'DTC',
  headline: 'How A $3M Skincare Brand Cut Close Time By 70%',
  excerpt: 'A Fast-Growing DTC Skincare Brand Was Spending 3 Weeks On Monthly Close With An Offshore Team. After Switching To Finofiii Edge, They Achieved A 5-Day Close With Real-Time Margin Visibility Across All Sales Channels.',
  metrics: [
    { label: 'Close Time', before: '21 days', after: '5 days' },
    { label: 'Revenue Accuracy', before: '89%', after: '99.8%' },
  ],
};

export function DTCContent() {
  return (
    <>
      {/* Hero Section */}
      <Section padding="lg" ariaLabel="DTC brands hero">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal animation="fade-up">
            <Badge variant="accent" className="mb-4">DTC & E-Commerce</Badge>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={100}>
            <AnimatedHeadline
              text="Financial Clarity For DTC Brands That Scale Fast"
              as="h1"
              animation="fade-up"
              className="text-4xl md:text-5xl font-bold font-display text-ink"
            />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={200}>
            <p className="mt-6 text-lg text-ink/70 font-interface leading-relaxed">
              Multi-Channel Revenue, Complex COGS And Aggressive Ad Budgets Demand
              Precision Bookkeeping. We Give DTC Founders The Financial Visibility
              They Need To Scale Profitably.
            </p>
          </ScrollReveal>
        </div>
      </Section>

      {/* Pain Points Section */}
      <Section padding="lg" ariaLabel="DTC pain points">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-ink text-center mb-10">
              Challenges DTC Brands Face
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
      <Section padding="lg" ariaLabel="DTC key metrics">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-ink text-center mb-10">
              Key Metrics We Track For DTC
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
      <Section padding="lg" ariaLabel="DTC revenue chart">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="fade-up">
            <ChartContainer
              title="Revenue Vs. Ad Spend"
              description="6-Month Trend Showing Revenue Growth Against Advertising Investment For A DTC Brand."
              data={revenueData}
              accessibleTableData={revenueData.map((d) => ({
                Month: d.label as string,
                Revenue: `$${(d.revenue as number).toLocaleString()}`,
                'Ad Spend': `$${(d.adSpend as number).toLocaleString()}`,
              }))}
            >
              <FinancialLineChart
                data={revenueData}
                xKey="label"
                yKeys={['revenue', 'adSpend']}
                colors={['#1CB894', '#B4523E']}
                height={300}
              />
            </ChartContainer>
          </ScrollReveal>
        </div>
      </Section>

      {/* Case Study Excerpt */}
      <Section padding="lg" ariaLabel="DTC case study">
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
                Read Full Case Study →
              </Button>
            </Card>
          </ScrollReveal>
        </div>
      </Section>

      {/* CTA Section */}
      <CtaSection
        headline="Ready To See Your True DTC Margins?"
        description="Get A Free Audit Of Your E-Commerce Financials. We'll Map Your Revenue Channels, Identify Margin Leaks And Show You The Path To A 5-Day Close."
        buttonHref="/book?industry=dtc"
      />
    </>
  );
}

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
    title: 'Revenue reconciliation across multiple channels',
    description: 'Shopify, Amazon, wholesale — revenue comes from everywhere. Without proper reconciliation, you are flying blind on true profitability per channel.',
  },
  {
    title: 'Ad spend tracking and ROAS attribution',
    description: 'Meta, Google, TikTok budgets add up fast. Knowing your actual return on ad spend requires clean financials that tie marketing cost to revenue.',
  },
  {
    title: 'Inventory and COGS complexity',
    description: 'Managing SKU-level cost of goods, freight, and landed cost calculations manually leads to inaccurate margins and tax surprises.',
  },
  {
    title: 'Sales tax compliance across states',
    description: 'Nexus obligations grow with every state you ship to. One missed filing means penalties that eat into already-thin margins.',
  },
];

/**
 * Case study excerpt for a DTC brand.
 */
const caseStudy = {
  industry: 'DTC',
  headline: 'How a $3M skincare brand cut close time by 70%',
  excerpt: 'A fast-growing DTC skincare brand was spending 3 weeks on monthly close with an offshore team. After switching to Finofii Edge, they achieved a 5-day close with real-time margin visibility across all sales channels.',
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
              text="Financial clarity for DTC brands that scale fast"
              as="h1"
              animation="fade-up"
              className="text-4xl md:text-5xl font-bold font-display text-ink"
            />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={200}>
            <p className="mt-6 text-lg text-ink/70 font-interface leading-relaxed">
              Multi-channel revenue, complex COGS, and aggressive ad budgets demand
              precision bookkeeping. We give DTC founders the financial visibility
              they need to scale profitably.
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
              Key Metrics We Track for DTC
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
              title="Revenue vs. Ad Spend"
              description="6-month trend showing revenue growth against advertising investment for a DTC brand."
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
              text="Ready to see your true DTC margins?"
              as="h2"
              animation="fade-up"
              className="text-2xl md:text-3xl font-bold font-display text-ink"
            />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <p className="mt-4 text-ink/70 font-interface">
              Get a free audit of your e-commerce financials. We&apos;ll map your revenue
              channels, identify margin leaks, and show you the path to a 5-day close.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={300}>
            <div className="mt-8">
              <Button
                variant="accent"
                size="lg"
                href="/book?industry=dtc"
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

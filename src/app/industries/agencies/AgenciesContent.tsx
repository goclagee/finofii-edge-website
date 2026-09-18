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

const FinancialBarChart = dynamic(
  () => import('@/components/charts/BarChart').then((mod) => ({ default: mod.FinancialBarChart })),
  { ssr: false, loading: () => <div className="w-full h-[320px] bg-ink/5 rounded-[14px] animate-pulse" /> }
);

/**
 * Agency-specific project profitability data for chart example.
 */
const projectProfitabilityData: ChartDataPoint[] = [
  { label: 'Project A', revenue: 85000, cost: 52000 },
  { label: 'Project B', revenue: 120000, cost: 78000 },
  { label: 'Project C', revenue: 45000, cost: 31000 },
  { label: 'Project D', revenue: 95000, cost: 68000 },
  { label: 'Project E', revenue: 150000, cost: 89000 },
];

/**
 * Agency-specific metric highlights.
 */
const metrics: SummaryMetric[] = [
  { label: 'Monthly Retainer Revenue', value: 420000, prefix: '$', trend: 'up', trendValue: 12.5, suffix: undefined },
  { label: 'Project Margin', value: 38.2, suffix: '%', trend: 'up', trendValue: 4.1, prefix: undefined },
  { label: 'Avg. Collections Period', value: 28, suffix: ' days', trend: 'down', trendValue: -15, prefix: undefined },
  { label: 'Revenue Per Employee', value: 18500, prefix: '$', trend: 'up', trendValue: 7.3, suffix: undefined },
];

/**
 * Pain points specific to creative and digital agencies.
 */
const painPoints = [
  {
    title: 'Project-based revenue recognition complexity',
    description: 'Retainers, milestones, and time-and-materials billing create a tangled revenue picture. Recognizing revenue correctly across dozens of active projects is a nightmare.',
  },
  {
    title: 'Tracking profitability per client and project',
    description: 'Without proper cost allocation across team hours, contractors, and overhead, you cannot tell which clients are profitable and which are draining resources.',
  },
  {
    title: 'Cash flow gaps from extended payment terms',
    description: 'Net-30 or Net-60 client terms combined with biweekly payroll creates cash crunches. Forecasting working capital needs requires real-time AR visibility.',
  },
  {
    title: 'Contractor vs. employee classification risks',
    description: 'Agencies rely heavily on freelancers. Misclassification risks IRS penalties and back-taxes that can cripple a growing shop.',
  },
];

/**
 * Case study excerpt for an agency.
 */
const caseStudy = {
  industry: 'Agency',
  headline: 'Digital agency uncovers $180K in hidden project losses',
  excerpt: 'A 40-person digital agency discovered they were losing money on 3 of their top 10 clients. After implementing Finofii Edge project-level P&L tracking, they renegotiated scopes and improved blended margins by 11 points.',
  metrics: [
    { label: 'Blended Margin', before: '27%', after: '38%' },
    { label: 'AR Days Outstanding', before: '52 days', after: '28 days' },
  ],
};

export function AgenciesContent() {
  return (
    <>
      {/* Hero Section */}
      <Section padding="lg" ariaLabel="Agencies hero">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal animation="fade-up">
            <Badge variant="brass" className="mb-4">Creative & Digital Agencies</Badge>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={100}>
            <AnimatedHeadline
              text="Know exactly which clients make you money"
              as="h1"
              animation="fade-up"
              className="text-4xl md:text-5xl font-bold font-display text-ink"
            />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={200}>
            <p className="mt-6 text-lg text-ink/70 font-interface leading-relaxed">
              Project-based revenue, contractor costs, and retainer billing create
              financial blind spots. We give agencies project-level P&L visibility
              so you can double down on profitable work.
            </p>
          </ScrollReveal>
        </div>
      </Section>

      {/* Pain Points Section */}
      <Section padding="lg" ariaLabel="Agency pain points">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-ink text-center mb-10">
              Challenges Agencies Face
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
      <Section padding="lg" ariaLabel="Agency key metrics">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-ink text-center mb-10">
              Key Metrics We Track for Agencies
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
      <Section padding="lg" ariaLabel="Agency profitability chart">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="fade-up">
            <ChartContainer
              title="Project Profitability"
              description="Revenue vs. cost breakdown by project for a digital agency."
              data={projectProfitabilityData}
              accessibleTableData={projectProfitabilityData.map((d) => ({
                Project: d.label as string,
                Revenue: `$${(d.revenue as number).toLocaleString()}`,
                Cost: `$${(d.cost as number).toLocaleString()}`,
              }))}
            >
              <FinancialBarChart
                data={projectProfitabilityData}
                xKey="label"
                yKeys={['revenue', 'cost']}
                colors={['#1CB894', '#C6A15B']}
                height={300}
              />
            </ChartContainer>
          </ScrollReveal>
        </div>
      </Section>

      {/* Case Study Excerpt */}
      <Section padding="lg" ariaLabel="Agency case study">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal animation="fade-up">
            <Card variant="elevated" className="p-8">
              <Badge variant="brass" className="mb-4">{caseStudy.industry}</Badge>
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
      <CtaSection
        headline="Ready to see your true project margins?"
        description="Get a free audit of your agency financials. We'll show you exactly which clients are profitable and where cash flow gaps are hiding."
        buttonHref="/book?industry=agency"
      />
    </>
  );
}

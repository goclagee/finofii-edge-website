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
 * CPA-specific capacity and utilization data for chart example.
 */
const capacityData: ChartDataPoint[] = [
  { label: 'Jan', billableHours: 1200, capacity: 1600 },
  { label: 'Feb', billableHours: 1350, capacity: 1600 },
  { label: 'Mar', billableHours: 1580, capacity: 1600 },
  { label: 'Apr', billableHours: 1590, capacity: 1600 },
  { label: 'May', billableHours: 1100, capacity: 1600 },
  { label: 'Jun', billableHours: 980, capacity: 1600 },
];

/**
 * CPA-specific metric highlights.
 */
const metrics: SummaryMetric[] = [
  { label: 'Client Capacity Added', value: 45, suffix: '%', trend: 'up', trendValue: 45, prefix: undefined },
  { label: 'Avg. Turnaround Time', value: 3.2, suffix: ' days', trend: 'down', trendValue: -40, prefix: undefined },
  { label: 'Revenue Per Partner', value: 680000, prefix: '$', trend: 'up', trendValue: 22, suffix: undefined },
  { label: 'Staff Utilization', value: 87, suffix: '%', trend: 'up', trendValue: 12, prefix: undefined },
];

/**
 * Pain points specific to CPA firms.
 */
const painPoints = [
  {
    title: 'Seasonal capacity constraints during tax season',
    description: 'Tax season creates unsustainable workloads. You need to serve more clients without burning out your team or compromising quality.',
  },
  {
    title: 'Back-office bookkeeping eating into advisory time',
    description: 'Hours spent on client write-up work and bank recs are hours not spent on higher-value advisory services that grow your practice.',
  },
  {
    title: 'Inconsistent quality across outsourced providers',
    description: 'Offshore teams deliver inconsistent work that requires heavy review. Rework costs eat into the savings you expected from outsourcing.',
  },
  {
    title: 'Scaling the practice without proportional headcount',
    description: 'Adding clients used to mean adding staff. Modern firms need leverage — more clients per partner without sacrificing service quality.',
  },
];

/**
 * Case study excerpt for a CPA firm.
 */
const caseStudy = {
  industry: 'CPA',
  headline: 'Regional CPA firm adds 45% more clients without new hires',
  excerpt: 'A 12-partner regional CPA firm outsourced all client write-up and monthly bookkeeping to Finofii Edge. Their staff shifted to advisory work, and the firm onboarded 45% more clients in one year without a single new hire.',
  metrics: [
    { label: 'Client Capacity', before: '220 clients', after: '320 clients' },
    { label: 'Advisory Revenue', before: '18%', after: '41%' },
  ],
};

export function CPAContent() {
  return (
    <>
      {/* Hero Section */}
      <Section padding="lg" ariaLabel="CPA firms hero">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal animation="fade-up">
            <Badge variant="brass" className="mb-4">CPA Firms</Badge>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={100}>
            <AnimatedHeadline
              text="Scale your practice without scaling headcount"
              as="h1"
              animation="fade-up"
              className="text-4xl md:text-5xl font-bold font-display text-ink"
            />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={200}>
            <p className="mt-6 text-lg text-ink/70 font-interface leading-relaxed">
              Outsource write-up work to a team that meets your standards. Free your
              staff for advisory services and take on more clients without the
              hiring headaches.
            </p>
          </ScrollReveal>
        </div>
      </Section>

      {/* Pain Points Section */}
      <Section padding="lg" ariaLabel="CPA pain points">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-ink text-center mb-10">
              Challenges CPA Firms Face
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
      <Section padding="lg" ariaLabel="CPA key metrics">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-ink text-center mb-10">
              Key Metrics We Track for CPA Firms
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
      <Section padding="lg" ariaLabel="CPA capacity chart">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="fade-up">
            <ChartContainer
              title="Billable Hours vs. Capacity"
              description="Monthly billable hours against total team capacity for a CPA firm."
              data={capacityData}
              accessibleTableData={capacityData.map((d) => ({
                Month: d.label as string,
                'Billable Hours': String(d.billableHours),
                Capacity: String(d.capacity),
              }))}
            >
              <FinancialBarChart
                data={capacityData}
                xKey="label"
                yKeys={['billableHours', 'capacity']}
                colors={['#1CB894', '#C6A15B']}
                height={300}
              />
            </ChartContainer>
          </ScrollReveal>
        </div>
      </Section>

      {/* Case Study Excerpt */}
      <Section padding="lg" ariaLabel="CPA case study">
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
        headline="Ready to grow your practice?"
        description="Get a free assessment of your back-office operations. We'll show you how to free up partner time and add clients without adding headcount."
        buttonHref="/book?industry=cpa"
      />
    </>
  );
}

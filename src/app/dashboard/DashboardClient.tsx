'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Section } from '@/components/design-system/Section';
import { AnimatedHeadline } from '@/components/design-system/AnimatedHeadline';
import { Button } from '@/components/design-system/Button';
import { ChartContainer } from '@/components/charts/ChartContainer';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { useDashboardState } from '@/hooks/useDashboardState';
import type { IndustryType, MonthIndex, ChartDataPoint } from '@/types/dashboard';
import type { AccessibleTableRow } from '@/components/charts/AccessibleTable';

// Lazy-load chart components to reduce initial bundle
const FinancialLineChart = dynamic(
  () => import('@/components/charts/LineChart').then((mod) => ({ default: mod.FinancialLineChart })),
  { ssr: false, loading: () => <div className="w-full h-[320px] bg-ink/5 rounded-[14px] animate-pulse" /> }
);

const FinancialBarChart = dynamic(
  () => import('@/components/charts/BarChart').then((mod) => ({ default: mod.FinancialBarChart })),
  { ssr: false, loading: () => <div className="w-full h-[320px] bg-ink/5 rounded-[14px] animate-pulse" /> }
);

const MetricCard = dynamic(
  () => import('@/components/charts/MetricCard').then((mod) => ({ default: mod.MetricCard })),
  { ssr: false, loading: () => <div className="bg-paper border border-ink/10 rounded-[14px] p-5 animate-pulse h-[100px]" /> }
);

const MONTHS: { value: MonthIndex; label: string }[] = [
  { value: 1, label: 'Jan' },
  { value: 2, label: 'Feb' },
  { value: 3, label: 'Mar' },
  { value: 4, label: 'Apr' },
  { value: 5, label: 'May' },
  { value: 6, label: 'Jun' },
  { value: 7, label: 'Jul' },
  { value: 8, label: 'Aug' },
  { value: 9, label: 'Sep' },
  { value: 10, label: 'Oct' },
  { value: 11, label: 'Nov' },
  { value: 12, label: 'Dec' },
];

const INDUSTRIES: { value: IndustryType; label: string }[] = [
  { value: 'dtc', label: 'DTC' },
  { value: 'agency', label: 'Agency' },
  { value: 'saas', label: 'SaaS' },
  { value: 'cpa', label: 'CPA' },
];

function DashboardContent() {
  const { state, monthData, setMonth, setIndustry } = useDashboardState();

  // Build accessible table data from revenue
  const revenueTableData: AccessibleTableRow[] = monthData.revenue.map((d: ChartDataPoint) => ({
    label: d.label,
    amount: d.amount as number,
  }));

  // Build accessible table data from expenses
  const expensesTableData: AccessibleTableRow[] = monthData.expenses.map((d: ChartDataPoint) => ({
    label: d.label,
    amount: d.amount as number,
  }));

  // Build accessible table data from cash flow
  const cashFlowTableData: AccessibleTableRow[] = monthData.cashFlow.map((d: ChartDataPoint) => ({
    label: d.label,
    inflow: d.inflow as number,
    outflow: d.outflow as number,
  }));

  return (
    <main className="bg-paper min-h-screen">
      {/* Hero Section */}
      <Section padding="lg" className="text-center">
        <AnimatedHeadline
          text="Interactive Financial Dashboard"
          as="h1"
          animation="fade-up"
        />
        <p className="mt-4 text-lg text-ink/70 max-w-2xl mx-auto">
          Explore live financial data across industries. Toggle months and presets
          to see how Finofii Edge delivers clarity to your numbers.
        </p>
      </Section>

      {/* Controls Section */}
      <Section padding="sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Industry Preset Selectors */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-ink/70" id="industry-selector-label">
              Industry Preset
            </label>
            <div
              className="flex flex-wrap gap-2"
              role="radiogroup"
              aria-labelledby="industry-selector-label"
            >
              {INDUSTRIES.map((industry) => (
                <button
                  key={industry.value}
                  onClick={() => setIndustry(industry.value)}
                  className={`px-4 py-2 rounded-default text-sm font-medium transition-all duration-200 ${
                    state.industry === industry.value
                      ? 'bg-accent text-ink shadow-sm'
                      : 'bg-ink/5 text-ink hover:bg-ink/10'
                  }`}
                  role="radio"
                  aria-checked={state.industry === industry.value}
                  aria-label={`${industry.label} industry preset`}
                >
                  {industry.label}
                </button>
              ))}
            </div>
          </div>

          {/* Month Toggle */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-ink/70" id="month-selector-label">
              Month
            </label>
            <div
              className="flex flex-wrap gap-1"
              role="radiogroup"
              aria-labelledby="month-selector-label"
            >
              {MONTHS.map((month) => (
                <button
                  key={month.value}
                  onClick={() => setMonth(month.value)}
                  className={`px-3 py-1.5 rounded-default text-xs font-medium transition-all duration-200 ${
                    state.month === month.value
                      ? 'bg-brass text-white shadow-sm'
                      : 'bg-ink/5 text-ink hover:bg-ink/10'
                  }`}
                  role="radio"
                  aria-checked={state.month === month.value}
                  aria-label={`${month.label} month`}
                >
                  {month.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Shareable URL indicator */}
        <div className="mt-4 flex items-center gap-2 text-sm text-ink/50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          <span>This URL is shareable — your current view is saved in the address bar.</span>
        </div>
      </Section>

      {/* Summary Metrics */}
      <Section padding="md">
        <ScrollReveal animation="fade-up">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {monthData.summaryMetrics.map((metric) => (
              <MetricCard
                key={metric.label}
                metric={metric}
                animateOnView={true}
                animationDuration={1500}
              />
            ))}
          </div>
        </ScrollReveal>
      </Section>

      {/* Revenue Line Chart */}
      <Section padding="md">
        <ScrollReveal animation="fade-up">
          <ChartContainer
            title="Revenue Trend"
            description={`Weekly revenue for ${MONTHS.find((m) => m.value === state.month)?.label} — ${INDUSTRIES.find((i) => i.value === state.industry)?.label}`}
            data={monthData.revenue}
            accessibleTableData={revenueTableData}
          >
            <FinancialLineChart
              data={monthData.revenue}
              xKey="label"
              yKeys={['amount']}
              animateTransition={true}
              transitionDuration={300}
              height={320}
            />
          </ChartContainer>
        </ScrollReveal>
      </Section>

      {/* Expenses Bar Chart */}
      <Section padding="md">
        <ScrollReveal animation="fade-up">
          <ChartContainer
            title="Expense Breakdown"
            description={`Category-level expenses for ${MONTHS.find((m) => m.value === state.month)?.label} — ${INDUSTRIES.find((i) => i.value === state.industry)?.label}`}
            data={monthData.expenses}
            accessibleTableData={expensesTableData}
          >
            <FinancialBarChart
              data={monthData.expenses}
              xKey="label"
              yKeys={['amount']}
              animateTransition={true}
              transitionDuration={300}
              height={320}
            />
          </ChartContainer>
        </ScrollReveal>
      </Section>

      {/* Cash Flow Line Chart */}
      <Section padding="md">
        <ScrollReveal animation="fade-up">
          <ChartContainer
            title="Cash Flow"
            description={`Weekly inflow vs outflow for ${MONTHS.find((m) => m.value === state.month)?.label} — ${INDUSTRIES.find((i) => i.value === state.industry)?.label}`}
            data={monthData.cashFlow}
            accessibleTableData={cashFlowTableData}
          >
            <FinancialLineChart
              data={monthData.cashFlow}
              xKey="label"
              yKeys={['inflow', 'outflow']}
              colors={['#1CB894', '#B4523E']}
              animateTransition={true}
              transitionDuration={300}
              height={320}
            />
          </ChartContainer>
        </ScrollReveal>
      </Section>

      {/* CTA Section */}
      <Section padding="lg" className="text-center">
        <ScrollReveal animation="fade-up">
          <h2 className="text-3xl font-display font-bold text-ink mb-4">
            Want This for Your Business?
          </h2>
          <p className="text-lg text-ink/70 mb-8 max-w-xl mx-auto">
            Get a custom dashboard tailored to your industry and financial stack.
            Book a free audit to see what&apos;s possible.
          </p>
          <Button variant="accent" size="lg" href="/book" magnetic>
            Book a Free Audit
          </Button>
        </ScrollReveal>
      </Section>
    </main>
  );
}

/**
 * DashboardClient wraps the interactive dashboard content in a Suspense boundary.
 * This is necessary because useDashboardState uses useSearchParams which requires Suspense.
 */
export default function DashboardClient() {
  return (
    <Suspense
      fallback={
        <main className="bg-paper min-h-screen">
          <Section padding="lg" className="text-center">
            <div className="animate-pulse">
              <div className="h-10 bg-ink/10 rounded-default w-80 mx-auto mb-4" />
              <div className="h-5 bg-ink/5 rounded-default w-96 mx-auto" />
            </div>
          </Section>
        </main>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}

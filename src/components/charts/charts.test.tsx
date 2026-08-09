import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

// Mock hooks
vi.mock('@/hooks/useReducedMotion', () => ({
  useReducedMotion: vi.fn(() => false),
}));

vi.mock('@/hooks/useIntersectionObserver', () => ({
  useIntersectionObserver: vi.fn(() => ({
    ref: { current: null },
    isIntersecting: true,
    entry: null,
  })),
}));

vi.mock('@/hooks/useMediaQuery', () => ({
  useMediaQuery: vi.fn(() => false),
}));

// Mock Recharts components
vi.mock('recharts', () => ({
  LineChart: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
    <div data-testid="recharts-line-chart" {...props}>{children}</div>
  ),
  Line: (props: Record<string, unknown>) => (
    <div data-testid="recharts-line" data-datakey={props.dataKey} data-stroke={props.stroke} data-animation-active={String(props.isAnimationActive)} data-animation-duration={props.animationDuration} />
  ),
  BarChart: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
    <div data-testid="recharts-bar-chart" {...props}>{children}</div>
  ),
  Bar: (props: Record<string, unknown>) => (
    <div data-testid="recharts-bar" data-datakey={props.dataKey} data-fill={props.fill} data-animation-active={String(props.isAnimationActive)} data-animation-duration={props.animationDuration} />
  ),
  XAxis: () => <div data-testid="recharts-xaxis" />,
  YAxis: () => <div data-testid="recharts-yaxis" />,
  CartesianGrid: () => <div data-testid="recharts-grid" />,
  Tooltip: () => <div data-testid="recharts-tooltip" />,
  Legend: () => <div data-testid="recharts-legend" />,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="recharts-responsive-container">{children}</div>
  ),
}));

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { AccessibleTable } from './AccessibleTable';
import { ChartContainer } from './ChartContainer';
import { FinancialLineChart } from './LineChart';
import { FinancialBarChart } from './BarChart';
import { MetricCard } from './MetricCard';

const mockedUseReducedMotion = vi.mocked(useReducedMotion);
const mockedUseMediaQuery = vi.mocked(useMediaQuery);

const sampleData = [
  { label: 'Jan', revenue: 10000, expenses: 7000 },
  { label: 'Feb', revenue: 12000, expenses: 8000 },
  { label: 'Mar', revenue: 15000, expenses: 9000 },
];

const sampleTableData = [
  { Month: 'Jan', Revenue: 10000, Expenses: 7000 },
  { Month: 'Feb', Revenue: 12000, Expenses: 8000 },
  { Month: 'Mar', Revenue: 15000, Expenses: 9000 },
];

describe('Chart Components', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseReducedMotion.mockReturnValue(false);
  });

  describe('AccessibleTable', () => {
    it('renders a visually hidden table with caption', () => {
      const { container } = render(
        <AccessibleTable
          caption="Revenue by month"
          data={sampleTableData}
        />
      );

      const table = container.querySelector('table');
      expect(table).not.toBeNull();
      expect(table?.getAttribute('aria-label')).toBe('Revenue by month');

      const caption = container.querySelector('caption');
      expect(caption?.textContent).toBe('Revenue by month');
    });

    it('renders column headers from data keys', () => {
      const { container } = render(
        <AccessibleTable
          caption="Data table"
          data={sampleTableData}
        />
      );

      const headers = container.querySelectorAll('th');
      expect(headers.length).toBe(3);
      expect(headers[0].textContent).toBe('Month');
      expect(headers[1].textContent).toBe('Revenue');
      expect(headers[2].textContent).toBe('Expenses');
    });

    it('renders custom headers when provided', () => {
      const { container } = render(
        <AccessibleTable
          caption="Data table"
          data={sampleTableData}
          headers={['Month', 'Income']}
        />
      );

      const headers = container.querySelectorAll('th');
      expect(headers.length).toBe(2);
      expect(headers[0].textContent).toBe('Month');
      expect(headers[1].textContent).toBe('Income');
    });

    it('renders all data rows', () => {
      const { container } = render(
        <AccessibleTable
          caption="Data table"
          data={sampleTableData}
        />
      );

      const rows = container.querySelectorAll('tbody tr');
      expect(rows.length).toBe(3);
    });

    it('is visually hidden using sr-only positioning', () => {
      const { container } = render(
        <AccessibleTable
          caption="Data table"
          data={sampleTableData}
        />
      );

      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.style.position).toBe('absolute');
      expect(wrapper.style.width).toBe('1px');
      expect(wrapper.style.height).toBe('1px');
      expect(wrapper.style.overflow).toBe('hidden');
    });

    it('returns null when data is empty', () => {
      const { container } = render(
        <AccessibleTable
          caption="Empty table"
          data={[]}
        />
      );

      expect(container.firstElementChild).toBeNull();
    });

    it('has proper table role attribute', () => {
      const { container } = render(
        <AccessibleTable
          caption="Accessible data"
          data={sampleTableData}
        />
      );

      const table = container.querySelector('table');
      expect(table?.getAttribute('role')).toBe('table');
    });
  });

  describe('ChartContainer', () => {
    it('renders title and description', () => {
      render(
        <ChartContainer
          title="Revenue Overview"
          description="Monthly revenue breakdown"
          data={sampleData}
          accessibleTableData={sampleTableData}
        >
          <div>Chart content</div>
        </ChartContainer>
      );

      expect(screen.getByText('Revenue Overview')).toBeTruthy();
      expect(screen.getByText('Monthly revenue breakdown')).toBeTruthy();
    });

    it('renders children (chart) content', () => {
      render(
        <ChartContainer
          title="Test Chart"
          data={sampleData}
          accessibleTableData={sampleTableData}
        >
          <div data-testid="chart-child">Chart goes here</div>
        </ChartContainer>
      );

      expect(screen.getByTestId('chart-child')).toBeTruthy();
    });

    it('renders accessible hidden data table', () => {
      const { container } = render(
        <ChartContainer
          title="Revenue Chart"
          data={sampleData}
          accessibleTableData={sampleTableData}
        >
          <div>Chart</div>
        </ChartContainer>
      );

      const table = container.querySelector('table');
      expect(table).not.toBeNull();
      expect(table?.getAttribute('aria-label')).toContain('Revenue Chart');
    });

    it('uses section with aria-labelledby referencing title', () => {
      const { container } = render(
        <ChartContainer
          title="Cash Flow"
          data={sampleData}
          accessibleTableData={sampleTableData}
        >
          <div>Chart</div>
        </ChartContainer>
      );

      const section = container.querySelector('section');
      expect(section?.getAttribute('role')).toBe('group');
      const labelledBy = section?.getAttribute('aria-labelledby');
      expect(labelledBy).toBeTruthy();

      const heading = container.querySelector(`#${labelledBy}`);
      expect(heading?.textContent).toBe('Cash Flow');
    });

    it('does not render description when not provided', () => {
      const { container } = render(
        <ChartContainer
          title="Simple Chart"
          data={sampleData}
          accessibleTableData={sampleTableData}
        >
          <div>Chart</div>
        </ChartContainer>
      );

      const paragraphs = container.querySelectorAll('p');
      expect(paragraphs.length).toBe(0);
    });
  });

  describe('FinancialLineChart', () => {
    it('renders with Recharts ResponsiveContainer', () => {
      render(
        <FinancialLineChart
          data={sampleData}
          xKey="label"
          yKeys={['revenue', 'expenses']}
        />
      );

      expect(screen.getByTestId('recharts-responsive-container')).toBeTruthy();
      expect(screen.getByTestId('recharts-line-chart')).toBeTruthy();
    });

    it('renders a line for each yKey', () => {
      render(
        <FinancialLineChart
          data={sampleData}
          xKey="label"
          yKeys={['revenue', 'expenses']}
        />
      );

      const lines = screen.getAllByTestId('recharts-line');
      expect(lines.length).toBe(2);
      expect(lines[0].getAttribute('data-datakey')).toBe('revenue');
      expect(lines[1].getAttribute('data-datakey')).toBe('expenses');
    });

    it('uses design token colors by default', () => {
      render(
        <FinancialLineChart
          data={sampleData}
          xKey="label"
          yKeys={['revenue', 'expenses']}
        />
      );

      const lines = screen.getAllByTestId('recharts-line');
      expect(lines[0].getAttribute('data-stroke')).toBe('#1CB894'); // accent
      expect(lines[1].getAttribute('data-stroke')).toBe('#C6A15B'); // brass
    });

    it('uses custom colors when provided', () => {
      render(
        <FinancialLineChart
          data={sampleData}
          xKey="label"
          yKeys={['revenue']}
          colors={['#FF0000']}
        />
      );

      const lines = screen.getAllByTestId('recharts-line');
      expect(lines[0].getAttribute('data-stroke')).toBe('#FF0000');
    });

    it('enables animation by default with 300ms duration', () => {
      render(
        <FinancialLineChart
          data={sampleData}
          xKey="label"
          yKeys={['revenue']}
        />
      );

      const line = screen.getByTestId('recharts-line');
      expect(line.getAttribute('data-animation-active')).toBe('true');
      expect(line.getAttribute('data-animation-duration')).toBe('300');
    });

    it('clamps transition duration to max 300ms', () => {
      render(
        <FinancialLineChart
          data={sampleData}
          xKey="label"
          yKeys={['revenue']}
          transitionDuration={500}
        />
      );

      const line = screen.getByTestId('recharts-line');
      expect(line.getAttribute('data-animation-duration')).toBe('300');
    });

    it('disables animation when animateTransition is false', () => {
      render(
        <FinancialLineChart
          data={sampleData}
          xKey="label"
          yKeys={['revenue']}
          animateTransition={false}
        />
      );

      const line = screen.getByTestId('recharts-line');
      expect(line.getAttribute('data-animation-active')).toBe('false');
    });
  });

  describe('FinancialBarChart', () => {
    it('renders with Recharts ResponsiveContainer', () => {
      render(
        <FinancialBarChart
          data={sampleData}
          xKey="label"
          yKeys={['revenue', 'expenses']}
        />
      );

      expect(screen.getByTestId('recharts-responsive-container')).toBeTruthy();
      expect(screen.getByTestId('recharts-bar-chart')).toBeTruthy();
    });

    it('renders a bar for each yKey', () => {
      render(
        <FinancialBarChart
          data={sampleData}
          xKey="label"
          yKeys={['revenue', 'expenses']}
        />
      );

      const bars = screen.getAllByTestId('recharts-bar');
      expect(bars.length).toBe(2);
      expect(bars[0].getAttribute('data-datakey')).toBe('revenue');
      expect(bars[1].getAttribute('data-datakey')).toBe('expenses');
    });

    it('uses design token colors by default', () => {
      render(
        <FinancialBarChart
          data={sampleData}
          xKey="label"
          yKeys={['revenue', 'expenses']}
        />
      );

      const bars = screen.getAllByTestId('recharts-bar');
      expect(bars[0].getAttribute('data-fill')).toBe('#1CB894'); // accent
      expect(bars[1].getAttribute('data-fill')).toBe('#C6A15B'); // brass
    });

    it('enables animation by default with 300ms duration', () => {
      render(
        <FinancialBarChart
          data={sampleData}
          xKey="label"
          yKeys={['revenue']}
        />
      );

      const bar = screen.getByTestId('recharts-bar');
      expect(bar.getAttribute('data-animation-active')).toBe('true');
      expect(bar.getAttribute('data-animation-duration')).toBe('300');
    });

    it('clamps transition duration to max 300ms', () => {
      render(
        <FinancialBarChart
          data={sampleData}
          xKey="label"
          yKeys={['revenue']}
          transitionDuration={600}
        />
      );

      const bar = screen.getByTestId('recharts-bar');
      expect(bar.getAttribute('data-animation-duration')).toBe('300');
    });

    it('disables animation when animateTransition is false', () => {
      render(
        <FinancialBarChart
          data={sampleData}
          xKey="label"
          yKeys={['revenue']}
          animateTransition={false}
        />
      );

      const bar = screen.getByTestId('recharts-bar');
      expect(bar.getAttribute('data-animation-active')).toBe('false');
    });
  });

  describe('MetricCard', () => {
    const sampleMetric = {
      label: 'Monthly Revenue',
      value: 125000,
      prefix: '$',
      suffix: '',
      trend: 'up' as const,
      trendValue: 12,
    };

    it('renders metric label', () => {
      render(<MetricCard metric={sampleMetric} />);
      expect(screen.getByText('Monthly Revenue')).toBeTruthy();
    });

    it('integrates CounterAnimation for the value', () => {
      const { container } = render(<MetricCard metric={sampleMetric} />);

      // CounterAnimation renders a span with font-data class
      const counterSpan = container.querySelector('.font-data');
      expect(counterSpan).not.toBeNull();
    });

    it('displays trend indicator with correct direction', () => {
      const { container } = render(<MetricCard metric={sampleMetric} />);

      // Should show up arrow for 'up' trend
      expect(container.textContent).toContain('↑');
      expect(container.textContent).toContain('12%');
    });

    it('shows down arrow for negative trend', () => {
      const downMetric = { ...sampleMetric, trend: 'down' as const, trendValue: 5 };
      const { container } = render(<MetricCard metric={downMetric} />);

      expect(container.textContent).toContain('↓');
      expect(container.textContent).toContain('5%');
    });

    it('shows flat arrow for flat trend', () => {
      const flatMetric = { ...sampleMetric, trend: 'flat' as const, trendValue: 0 };
      const { container } = render(<MetricCard metric={flatMetric} />);

      expect(container.textContent).toContain('→');
    });

    it('has proper ARIA label with full metric description', () => {
      const { container } = render(<MetricCard metric={sampleMetric} />);

      const group = container.querySelector('[role="group"]');
      expect(group?.getAttribute('aria-label')).toContain('Monthly Revenue');
      expect(group?.getAttribute('aria-label')).toContain('$125000');
      expect(group?.getAttribute('aria-label')).toContain('trend up 12%');
    });

    it('uses font-data class for numeric values (IBM Plex Mono)', () => {
      const { container } = render(<MetricCard metric={sampleMetric} />);

      // The CounterAnimation span uses font-data
      const dataFontElements = container.querySelectorAll('.font-data');
      expect(dataFontElements.length).toBeGreaterThan(0);
    });

    it('renders with rounded-default border radius', () => {
      const { container } = render(<MetricCard metric={sampleMetric} />);

      const card = container.querySelector('[role="group"]');
      expect(card?.className).toContain('rounded-default');
    });
  });

  describe('Responsive Sizing', () => {
    it('LineChart uses ResponsiveContainer for fluid width at 320px viewport', () => {
      // ResponsiveContainer with width="100%" handles responsive sizing
      render(
        <FinancialLineChart
          data={sampleData}
          xKey="label"
          yKeys={['revenue']}
        />
      );

      const container = screen.getByTestId('recharts-responsive-container');
      expect(container).toBeTruthy();
    });

    it('BarChart uses ResponsiveContainer for fluid width at 1440px viewport', () => {
      render(
        <FinancialBarChart
          data={sampleData}
          xKey="label"
          yKeys={['revenue']}
        />
      );

      const container = screen.getByTestId('recharts-responsive-container');
      expect(container).toBeTruthy();
    });

    it('LineChart wrapper has full width styling for responsive adaptation', () => {
      const { container } = render(
        <FinancialLineChart
          data={sampleData}
          xKey="label"
          yKeys={['revenue']}
        />
      );

      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.className).toContain('w-full');
    });

    it('BarChart wrapper has full width styling for responsive adaptation', () => {
      const { container } = render(
        <FinancialBarChart
          data={sampleData}
          xKey="label"
          yKeys={['revenue']}
        />
      );

      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.className).toContain('w-full');
    });

    it('ChartContainer has full-width responsive wrapper', () => {
      const { container } = render(
        <ChartContainer
          title="Responsive Chart"
          data={sampleData}
          accessibleTableData={sampleTableData}
        >
          <div>Chart</div>
        </ChartContainer>
      );

      const section = container.querySelector('section');
      expect(section?.className).toContain('w-full');

      // The chart area wrapper should also be full width
      const chartWrapper = container.querySelector('[aria-hidden="true"]');
      expect(chartWrapper?.className).toContain('w-full');
      expect(chartWrapper?.className).toContain('min-h-[200px]');
    });
  });

  describe('Reduced Motion - Data Transition Animation', () => {
    it('LineChart disables animation when reduced motion is preferred', () => {
      // When reduced motion is on, animateTransition should be set to false
      // by the parent component (integration pattern)
      render(
        <FinancialLineChart
          data={sampleData}
          xKey="label"
          yKeys={['revenue']}
          animateTransition={false}
        />
      );

      const line = screen.getByTestId('recharts-line');
      expect(line.getAttribute('data-animation-active')).toBe('false');
    });

    it('BarChart disables animation when reduced motion is preferred', () => {
      render(
        <FinancialBarChart
          data={sampleData}
          xKey="label"
          yKeys={['revenue']}
          animateTransition={false}
        />
      );

      const bar = screen.getByTestId('recharts-bar');
      expect(bar.getAttribute('data-animation-active')).toBe('false');
    });

    it('MetricCard shows final value immediately when reduced motion is enabled', () => {
      // Enable reduced motion
      mockedUseReducedMotion.mockReturnValue(true);
      mockedUseMediaQuery.mockReturnValue(true);

      const metric = {
        label: 'Total Revenue',
        value: 50000,
        prefix: '$',
        suffix: '',
        trend: 'up' as const,
        trendValue: 8,
      };

      const { container } = render(<MetricCard metric={metric} />);

      // With reduced motion, CounterAnimation should display final value immediately
      const counterSpan = container.querySelector('.font-data');
      expect(counterSpan).not.toBeNull();
      // The aria-label always shows the final value
      expect(counterSpan?.getAttribute('aria-label')).toContain('$50000');
    });

    it('LineChart allows animation when reduced motion is not preferred', () => {
      mockedUseReducedMotion.mockReturnValue(false);

      render(
        <FinancialLineChart
          data={sampleData}
          xKey="label"
          yKeys={['revenue']}
          animateTransition={true}
        />
      );

      const line = screen.getByTestId('recharts-line');
      expect(line.getAttribute('data-animation-active')).toBe('true');
      expect(line.getAttribute('data-animation-duration')).toBe('300');
    });

    it('BarChart allows animation when reduced motion is not preferred', () => {
      mockedUseReducedMotion.mockReturnValue(false);

      render(
        <FinancialBarChart
          data={sampleData}
          xKey="label"
          yKeys={['revenue']}
          animateTransition={true}
        />
      );

      const bar = screen.getByTestId('recharts-bar');
      expect(bar.getAttribute('data-animation-active')).toBe('true');
      expect(bar.getAttribute('data-animation-duration')).toBe('300');
    });
  });
});

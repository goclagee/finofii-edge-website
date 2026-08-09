import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock next/navigation
const mockReplace = vi.fn();
const mockSearchParams = new URLSearchParams();

vi.mock('next/navigation', () => ({
  useSearchParams: () => mockSearchParams,
  useRouter: () => ({ replace: mockReplace }),
  usePathname: () => '/dashboard',
}));

// Mock the JSON data imports
vi.mock('@/content/data/dashboard-dtc.json', () => ({
  default: {
    industry: 'dtc',
    months: {
      1: {
        revenue: [{ label: 'Week 1', amount: 52000 }],
        expenses: [{ label: 'COGS', amount: 64800 }],
        cashFlow: [{ label: 'Week 1', inflow: 52000, outflow: 38000 }],
        summaryMetrics: [{ label: 'Gross Revenue', value: 216000, prefix: '$', trend: 'up', trendValue: 8.2 }],
      },
      2: {
        revenue: [{ label: 'Week 1', amount: 49000 }],
        expenses: [{ label: 'COGS', amount: 63300 }],
        cashFlow: [{ label: 'Week 1', inflow: 49000, outflow: 36000 }],
        summaryMetrics: [{ label: 'Gross Revenue', value: 211000, prefix: '$', trend: 'down', trendValue: -2.3 }],
      },
    },
  },
}));

vi.mock('@/content/data/dashboard-agency.json', () => ({
  default: {
    industry: 'agency',
    months: {
      1: {
        revenue: [{ label: 'Project A', amount: 120000 }],
        expenses: [{ label: 'Payroll', amount: 180000 }],
        cashFlow: [{ label: 'Week 1', inflow: 95000, outflow: 68000 }],
        summaryMetrics: [{ label: 'Revenue', value: 345000, prefix: '$', trend: 'up', trendValue: 5.2 }],
      },
    },
  },
}));

vi.mock('@/content/data/dashboard-saas.json', () => ({
  default: {
    industry: 'saas',
    months: {
      1: {
        revenue: [{ label: 'MRR', amount: 32000 }],
        expenses: [{ label: 'Engineering', amount: 28000 }],
        cashFlow: [{ label: 'Week 1', inflow: 16000, outflow: 14500 }],
        summaryMetrics: [{ label: 'MRR', value: 32000, prefix: '$', trend: 'up', trendValue: 4.6 }],
      },
    },
  },
}));

vi.mock('@/content/data/dashboard-cpa.json', () => ({
  default: {
    industry: 'cpa',
    months: {
      1: {
        revenue: [{ label: 'Tax Prep', amount: 95000 }],
        expenses: [{ label: 'Staff Payroll', amount: 125000 }],
        cashFlow: [{ label: 'Week 1', inflow: 68000, outflow: 45000 }],
        summaryMetrics: [{ label: 'Revenue', value: 265000, prefix: '$', trend: 'up', trendValue: 45.6 }],
      },
    },
  },
}));

import { renderHook, act } from '@testing-library/react';
import { useDashboardState } from './useDashboardState';

describe('useDashboardState', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset search params
    mockSearchParams.delete('month');
    mockSearchParams.delete('industry');
  });

  it('returns default state when no URL params are present', () => {
    const { result } = renderHook(() => useDashboardState());

    expect(result.current.state.industry).toBe('dtc');
    expect(result.current.state.month).toBeGreaterThanOrEqual(1);
    expect(result.current.state.month).toBeLessThanOrEqual(12);
  });

  it('decodes month and industry from URL params', () => {
    mockSearchParams.set('month', '1');
    mockSearchParams.set('industry', 'dtc');

    const { result } = renderHook(() => useDashboardState());

    expect(result.current.state.month).toBe(1);
    expect(result.current.state.industry).toBe('dtc');
  });

  it('returns the correct dataset for the current industry', () => {
    mockSearchParams.set('month', '1');
    mockSearchParams.set('industry', 'dtc');

    const { result } = renderHook(() => useDashboardState());

    expect(result.current.dataset.industry).toBe('dtc');
  });

  it('returns monthData for the current month', () => {
    mockSearchParams.set('month', '1');
    mockSearchParams.set('industry', 'dtc');

    const { result } = renderHook(() => useDashboardState());

    expect(result.current.monthData.revenue).toBeDefined();
    expect(result.current.monthData.expenses).toBeDefined();
    expect(result.current.monthData.cashFlow).toBeDefined();
    expect(result.current.monthData.summaryMetrics).toBeDefined();
  });

  it('setMonth updates URL with encoded state', () => {
    mockSearchParams.set('month', '1');
    mockSearchParams.set('industry', 'dtc');

    const { result } = renderHook(() => useDashboardState());

    act(() => {
      result.current.setMonth(2);
    });

    expect(mockReplace).toHaveBeenCalledWith(
      '/dashboard?month=2&industry=dtc',
      { scroll: false }
    );
  });

  it('setIndustry updates URL with encoded state', () => {
    mockSearchParams.set('month', '1');
    mockSearchParams.set('industry', 'dtc');

    const { result } = renderHook(() => useDashboardState());

    act(() => {
      result.current.setIndustry('agency');
    });

    expect(mockReplace).toHaveBeenCalledWith(
      '/dashboard?month=1&industry=agency',
      { scroll: false }
    );
  });

  it('falls back to defaults for invalid URL params', () => {
    mockSearchParams.set('month', '99');
    mockSearchParams.set('industry', 'invalid');

    const { result } = renderHook(() => useDashboardState());

    expect(result.current.state.industry).toBe('dtc');
    // month should fall back to current month (1-12)
    expect(result.current.state.month).toBeGreaterThanOrEqual(1);
    expect(result.current.state.month).toBeLessThanOrEqual(12);
  });

  it('switches dataset when industry changes via URL', () => {
    mockSearchParams.set('month', '1');
    mockSearchParams.set('industry', 'saas');

    const { result } = renderHook(() => useDashboardState());

    expect(result.current.dataset.industry).toBe('saas');
    expect(result.current.monthData.revenue[0].label).toBe('MRR');
  });
});

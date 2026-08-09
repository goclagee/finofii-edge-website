import { describe, it, expect } from 'vitest';
import {
  encodeDashboardState,
  decodeDashboardState,
  isValidMonth,
  isValidIndustry,
} from './dashboard-url';
import type { DashboardState } from '@/types/dashboard';

describe('isValidMonth', () => {
  it('accepts valid month numbers 1-12', () => {
    for (let i = 1; i <= 12; i++) {
      expect(isValidMonth(i)).toBe(true);
    }
  });

  it('accepts valid month strings "1"-"12"', () => {
    for (let i = 1; i <= 12; i++) {
      expect(isValidMonth(String(i))).toBe(true);
    }
  });

  it('rejects 0 and 13', () => {
    expect(isValidMonth(0)).toBe(false);
    expect(isValidMonth(13)).toBe(false);
  });

  it('rejects non-integer numbers', () => {
    expect(isValidMonth(1.5)).toBe(false);
    expect(isValidMonth(6.7)).toBe(false);
  });

  it('rejects non-numeric values', () => {
    expect(isValidMonth('abc')).toBe(false);
    expect(isValidMonth(null)).toBe(false);
    expect(isValidMonth(undefined)).toBe(false);
    expect(isValidMonth({})).toBe(false);
  });
});

describe('isValidIndustry', () => {
  it('accepts valid industry types', () => {
    expect(isValidIndustry('dtc')).toBe(true);
    expect(isValidIndustry('agency')).toBe(true);
    expect(isValidIndustry('saas')).toBe(true);
    expect(isValidIndustry('cpa')).toBe(true);
  });

  it('rejects invalid industry strings', () => {
    expect(isValidIndustry('retail')).toBe(false);
    expect(isValidIndustry('')).toBe(false);
    expect(isValidIndustry('DTC')).toBe(false);
  });

  it('rejects non-string values', () => {
    expect(isValidIndustry(123)).toBe(false);
    expect(isValidIndustry(null)).toBe(false);
    expect(isValidIndustry(undefined)).toBe(false);
  });
});

describe('encodeDashboardState', () => {
  it('encodes state into query string', () => {
    const state: DashboardState = { month: 6, industry: 'saas' };
    const result = encodeDashboardState(state);
    expect(result).toBe('?month=6&industry=saas');
  });

  it('encodes month 12 and cpa industry', () => {
    const state: DashboardState = { month: 12, industry: 'cpa' };
    const result = encodeDashboardState(state);
    expect(result).toBe('?month=12&industry=cpa');
  });
});

describe('decodeDashboardState', () => {
  it('decodes valid params', () => {
    const params = new URLSearchParams('month=6&industry=saas');
    const result = decodeDashboardState(params);
    expect(result).toEqual({ month: 6, industry: 'saas' });
  });

  it('falls back to defaults for invalid month', () => {
    const params = new URLSearchParams('month=13&industry=dtc');
    const result = decodeDashboardState(params);
    expect(result.month).toBeGreaterThanOrEqual(1);
    expect(result.month).toBeLessThanOrEqual(12);
    expect(result.industry).toBe('dtc');
  });

  it('falls back to defaults for invalid industry', () => {
    const params = new URLSearchParams('month=3&industry=invalid');
    const result = decodeDashboardState(params);
    expect(result.month).toBe(3);
    expect(result.industry).toBe('dtc');
  });

  it('falls back to defaults for empty params', () => {
    const params = new URLSearchParams('');
    const result = decodeDashboardState(params);
    expect(result.month).toBeGreaterThanOrEqual(1);
    expect(result.month).toBeLessThanOrEqual(12);
    expect(result.industry).toBe('dtc');
  });

  it('does not throw for arbitrary string params', () => {
    const params = new URLSearchParams('month=xyz&industry=!!!');
    expect(() => decodeDashboardState(params)).not.toThrow();
    const result = decodeDashboardState(params);
    expect(result.industry).toBe('dtc');
  });
});

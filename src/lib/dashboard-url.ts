import type { DashboardState, IndustryType, MonthIndex } from '@/types/dashboard';

const VALID_INDUSTRIES: IndustryType[] = ['dtc', 'agency', 'saas', 'cpa'];
const DEFAULT_INDUSTRY: IndustryType = 'dtc';

/**
 * Returns the most recent month (current month as MonthIndex).
 */
function getDefaultMonth(): MonthIndex {
  return (new Date().getMonth() + 1) as MonthIndex;
}

/**
 * Validates that a value is a valid MonthIndex (1-12 integer).
 */
export function isValidMonth(value: unknown): value is MonthIndex {
  if (typeof value === 'number') {
    return Number.isInteger(value) && value >= 1 && value <= 12;
  }
  if (typeof value === 'string') {
    const num = Number(value);
    return Number.isInteger(num) && num >= 1 && num <= 12;
  }
  return false;
}

/**
 * Validates that a value is a recognized IndustryType.
 */
export function isValidIndustry(value: unknown): value is IndustryType {
  return typeof value === 'string' && VALID_INDUSTRIES.includes(value as IndustryType);
}

/**
 * Encodes dashboard state into URL query parameters.
 * Example: { month: 6, industry: 'saas' } → "?month=6&industry=saas"
 */
export function encodeDashboardState(state: DashboardState): string {
  const params = new URLSearchParams();
  params.set('month', String(state.month));
  params.set('industry', state.industry);
  return `?${params.toString()}`;
}

/**
 * Decodes URL search params into validated DashboardState.
 * Falls back to defaults (month: current, industry: 'dtc') for invalid params.
 */
export function decodeDashboardState(params: URLSearchParams): DashboardState {
  const monthParam = params.get('month');
  const industryParam = params.get('industry');

  const month: MonthIndex = isValidMonth(monthParam)
    ? (Number(monthParam) as MonthIndex)
    : getDefaultMonth();

  const industry: IndustryType = isValidIndustry(industryParam)
    ? (industryParam as IndustryType)
    : DEFAULT_INDUSTRY;

  return { month, industry };
}

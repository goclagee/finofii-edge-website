export type IndustryType = 'dtc' | 'agency' | 'saas' | 'cpa';

export type MonthIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface DashboardState {
  month: MonthIndex;
  industry: IndustryType;
}

export interface ChartDataPoint {
  label: string;
  [key: string]: string | number;
}

export interface DashboardDataset {
  industry: IndustryType;
  months: Record<MonthIndex, MonthData>;
}

export interface MonthData {
  revenue: ChartDataPoint[];
  expenses: ChartDataPoint[];
  cashFlow: ChartDataPoint[];
  summaryMetrics: SummaryMetric[];
}

export interface SummaryMetric {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend: 'up' | 'down' | 'flat';
  trendValue: number;
}

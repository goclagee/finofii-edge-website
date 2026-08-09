import type { IndustryType } from './dashboard';

export type EntityType = 'llc' | 'scorp' | 'ccorp' | 'sole_prop' | 'partnership';

export type RevenueBand = 'pre_revenue' | '0_100k' | '100k_500k' | '500k_1m' | '1m_5m' | '5m_plus';

export type AccountingTool = 'quickbooks' | 'xero' | 'wave' | 'freshbooks' | 'spreadsheet' | 'none';

export type TransactionVolume = 'under_50' | '50_200' | '200_500' | '500_1000' | 'over_1000';

export type PricingTier = 'essentials' | 'growth' | 'scale';

export interface LeadSubmission {
  id: string;
  entityType: EntityType;
  revenueBand: RevenueBand;
  currentTool: AccountingTool;
  timezone: string;
  email: string;
  companyName?: string;
  submittedAt: string;  // ISO 8601
  source: string;       // Page path
  prefilledIndustry?: IndustryType;
}

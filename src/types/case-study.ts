import type { IndustryType } from './dashboard';

export type ServiceType = 'bookkeeping' | 'mis' | 'cfo' | 'entity';

export interface CaseStudy {
  id: string;
  slug: string;
  industry: IndustryType;
  serviceType: ServiceType;
  headline: string;
  clientIndustryLabel: string;
  problem: string;
  solution: string;
  metrics: BeforeAfterMetric[];
  publishedAt: string;
}

export interface BeforeAfterMetric {
  label: string;
  before: number;
  after: number;
  unit: string;
  improvement: string;
}

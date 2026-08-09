import { describe, it, expect } from 'vitest';
import { filterCaseStudies, filterContent } from './filters';
import type { CaseStudy } from '@/types/case-study';
import type { ContentItem } from '@/types/content';

const sampleCaseStudies: CaseStudy[] = [
  {
    id: '1', slug: 'dtc-bookkeeping', industry: 'dtc', serviceType: 'bookkeeping',
    headline: 'DTC Brand Saves 40 Hours', clientIndustryLabel: 'DTC',
    problem: 'Manual processes', solution: 'Automated bookkeeping', metrics: [],
    publishedAt: '2024-01-15',
  },
  {
    id: '2', slug: 'saas-mis', industry: 'saas', serviceType: 'mis',
    headline: 'SaaS Startup Gets Visibility', clientIndustryLabel: 'SaaS',
    problem: 'No dashboards', solution: 'Custom MIS', metrics: [],
    publishedAt: '2024-02-20',
  },
  {
    id: '3', slug: 'agency-cfo', industry: 'agency', serviceType: 'cfo',
    headline: 'Agency Scales with CFO', clientIndustryLabel: 'Agency',
    problem: 'Cash flow issues', solution: 'Virtual CFO', metrics: [],
    publishedAt: '2024-03-10',
  },
  {
    id: '4', slug: 'cpa-entity', industry: 'cpa', serviceType: 'entity',
    headline: 'CPA Firm Compliance', clientIndustryLabel: 'CPA',
    problem: 'Filing deadlines', solution: 'Entity management', metrics: [],
    publishedAt: '2024-04-05',
  },
];

describe('filterCaseStudies', () => {
  it('returns all items when no filters are active', () => {
    const result = filterCaseStudies(sampleCaseStudies, {});
    expect(result).toHaveLength(4);
  });

  it('returns all items with empty arrays', () => {
    const result = filterCaseStudies(sampleCaseStudies, { industry: [], serviceType: [] });
    expect(result).toHaveLength(4);
  });

  it('filters by industry', () => {
    const result = filterCaseStudies(sampleCaseStudies, { industry: ['dtc'] });
    expect(result).toHaveLength(1);
    expect(result[0].industry).toBe('dtc');
  });

  it('filters by multiple industries', () => {
    const result = filterCaseStudies(sampleCaseStudies, { industry: ['dtc', 'saas'] });
    expect(result).toHaveLength(2);
    expect(result.every(s => ['dtc', 'saas'].includes(s.industry))).toBe(true);
  });

  it('filters by service type', () => {
    const result = filterCaseStudies(sampleCaseStudies, { serviceType: ['cfo'] });
    expect(result).toHaveLength(1);
    expect(result[0].serviceType).toBe('cfo');
  });

  it('applies both industry and service type filters (AND logic)', () => {
    const result = filterCaseStudies(sampleCaseStudies, {
      industry: ['dtc', 'saas'],
      serviceType: ['bookkeeping'],
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('returns empty array when no match', () => {
    const result = filterCaseStudies(sampleCaseStudies, {
      industry: ['dtc'],
      serviceType: ['cfo'],
    });
    expect(result).toHaveLength(0);
  });

  it('returns empty array for empty input list', () => {
    const result = filterCaseStudies([], { industry: ['dtc'] });
    expect(result).toHaveLength(0);
  });

  it('detects empty state with all filters active returning no results', () => {
    const result = filterCaseStudies(sampleCaseStudies, {
      industry: ['cpa'],
      serviceType: ['bookkeeping'],
    });
    // This combination has no matching items — empty-state condition
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });
});

const sampleContent: ContentItem[] = [
  { id: '1', slug: 'blog-1', title: 'Blog Post 1', type: 'blog', publishDate: '2024-01-01', excerpt: 'Excerpt 1', category: 'finance', tags: [] },
  { id: '2', slug: 'guide-1', title: 'Guide 1', type: 'guide', publishDate: '2024-02-01', excerpt: 'Excerpt 2', category: 'tax', tags: [] },
  { id: '3', slug: 'template-1', title: 'Template 1', type: 'template', publishDate: '2024-03-01', excerpt: 'Excerpt 3', category: 'tools', tags: [] },
  { id: '4', slug: 'blog-2', title: 'Blog Post 2', type: 'blog', publishDate: '2024-04-01', excerpt: 'Excerpt 4', category: 'finance', tags: [] },
  { id: '5', slug: 'tax-cal', title: 'Tax Calendar', type: 'tax_calendar', publishDate: '2024-05-01', excerpt: 'Excerpt 5', category: 'tax', tags: [] },
];

describe('filterContent', () => {
  it('returns all items with no type filter and pagination', () => {
    const result = filterContent(sampleContent, {}, { page: 1, pageSize: 10 });
    expect(result.items).toHaveLength(5);
    expect(result.total).toBe(5);
    expect(result.totalPages).toBe(1);
  });

  it('filters by content type', () => {
    const result = filterContent(sampleContent, { types: ['blog'] }, { page: 1, pageSize: 10 });
    expect(result.items).toHaveLength(2);
    expect(result.total).toBe(2);
    expect(result.items.every(i => i.type === 'blog')).toBe(true);
  });

  it('applies pagination correctly', () => {
    const result = filterContent(sampleContent, {}, { page: 1, pageSize: 2 });
    expect(result.items).toHaveLength(2);
    expect(result.total).toBe(5);
    expect(result.totalPages).toBe(3);
  });

  it('returns second page', () => {
    const result = filterContent(sampleContent, {}, { page: 2, pageSize: 2 });
    expect(result.items).toHaveLength(2);
    expect(result.items[0].id).toBe('3');
  });

  it('returns last partial page', () => {
    const result = filterContent(sampleContent, {}, { page: 3, pageSize: 2 });
    expect(result.items).toHaveLength(1);
    expect(result.items[0].id).toBe('5');
  });

  it('returns empty items for empty filter result', () => {
    const result = filterContent(sampleContent, { types: ['tax_calendar'] }, { page: 1, pageSize: 12 });
    expect(result.items).toHaveLength(1);
    expect(result.total).toBe(1);
  });

  it('handles page beyond total gracefully', () => {
    const result = filterContent(sampleContent, {}, { page: 100, pageSize: 2 });
    // Should clamp to last valid page
    expect(result.total).toBe(5);
  });

  it('detects empty state when type filter matches no items', () => {
    // Use a valid type that has no items in our sample set
    const emptyResult = filterContent(
      sampleContent.filter(i => i.type !== 'tax_calendar'),
      { types: ['tax_calendar'] },
      { page: 1, pageSize: 12 }
    );
    expect(emptyResult.items).toHaveLength(0);
    expect(emptyResult.total).toBe(0);
    expect(emptyResult.totalPages).toBe(0);
  });

  it('returns empty items for empty input list', () => {
    const result = filterContent([], { types: ['blog'] }, { page: 1, pageSize: 12 });
    expect(result.items).toHaveLength(0);
    expect(result.total).toBe(0);
    expect(result.totalPages).toBe(0);
  });

  it('filters by multiple content types', () => {
    const result = filterContent(sampleContent, { types: ['blog', 'guide'] }, { page: 1, pageSize: 10 });
    expect(result.items).toHaveLength(3);
    expect(result.items.every(i => ['blog', 'guide'].includes(i.type))).toBe(true);
  });
});

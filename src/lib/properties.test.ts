import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { encodeDashboardState, decodeDashboardState } from '@/lib/dashboard-url';
import { recommendTier, calculateTierScore, type TierRecommenderInputs } from '@/lib/tier-recommender';
import { leadFormSchema } from '@/lib/form-validation';
import { filterCaseStudies } from '@/lib/filters';
import { generatePageSEO } from '@/lib/seo';
import type { DashboardState, IndustryType, MonthIndex } from '@/types/dashboard';
import type { EntityType, RevenueBand, TransactionVolume, AccountingTool } from '@/types/lead';
import type { CaseStudy, ServiceType } from '@/types/case-study';

// --- Arbitraries ---

const monthIndexArb = fc.integer({ min: 1, max: 12 }) as fc.Arbitrary<MonthIndex>;
const industryTypeArb = fc.constantFrom<IndustryType>('dtc', 'agency', 'saas', 'cpa');

const dashboardStateArb: fc.Arbitrary<DashboardState> = fc.record({
  month: monthIndexArb,
  industry: industryTypeArb,
});

const entityTypeArb = fc.constantFrom<EntityType>('llc', 'scorp', 'ccorp', 'sole_prop', 'partnership');
const revenueBandArb = fc.constantFrom<RevenueBand>('pre_revenue', '0_100k', '100k_500k', '500k_1m', '1m_5m', '5m_plus');
const transactionVolumeArb = fc.constantFrom<TransactionVolume>('under_50', '50_200', '200_500', '500_1000', 'over_1000');
const accountingToolArb = fc.constantFrom<AccountingTool>('quickbooks', 'xero', 'wave', 'freshbooks', 'spreadsheet', 'none');
const serviceTypeArb = fc.constantFrom<ServiceType>('bookkeeping', 'mis', 'cfo', 'entity');

const tierRecommenderInputsArb: fc.Arbitrary<TierRecommenderInputs> = fc.record({
  entityType: entityTypeArb,
  monthlyTransactions: transactionVolumeArb,
  revenueBand: revenueBandArb,
});

// Valid email arbitrary: generates realistic email addresses within constraints
const validEmailArb = fc
  .tuple(
    fc.stringMatching(/^[a-z][a-z0-9]{0,19}$/),
    fc.stringMatching(/^[a-z][a-z0-9]{0,9}$/),
    fc.constantFrom('com', 'org', 'net', 'io', 'co')
  )
  .map(([local, domain, tld]) => `${local}@${domain}.${tld}`)
  .filter((email) => email.length <= 254);

// Valid timezone arbitrary: non-empty string ≤50 chars
const validTimezoneArb = fc.stringMatching(/^[A-Za-z][A-Za-z0-9/_+ -]{0,49}$/).filter(
  (s) => s.length >= 1 && s.length <= 50
);

// Case study arbitrary for filter testing
const caseStudyArb: fc.Arbitrary<CaseStudy> = fc.record({
  id: fc.uuid(),
  slug: fc.stringMatching(/^[a-z][a-z0-9-]{2,20}$/),
  industry: industryTypeArb,
  serviceType: serviceTypeArb,
  headline: fc.string({ minLength: 5, maxLength: 100 }),
  clientIndustryLabel: fc.string({ minLength: 3, maxLength: 50 }),
  problem: fc.string({ minLength: 10, maxLength: 200 }),
  solution: fc.string({ minLength: 10, maxLength: 200 }),
  metrics: fc.array(
    fc.record({
      label: fc.string({ minLength: 1, maxLength: 30 }),
      before: fc.integer({ min: 0, max: 10000 }),
      after: fc.integer({ min: 0, max: 10000 }),
      unit: fc.constantFrom('$', '%', 'days', 'hours'),
      improvement: fc.string({ minLength: 1, maxLength: 30 }),
    }),
    { minLength: 0, maxLength: 5 }
  ),
  publishedAt: fc.integer({ min: 1577836800000, max: 1767139200000 }).map((ts) => new Date(ts).toISOString()),
});

// --- Property Tests ---

describe('Feature: finofii-edge-website, Property 1: Dashboard URL State Round-Trip', () => {
  /**
   * **Validates: Requirements 8.4**
   *
   * For any valid DashboardState, encode then decode produces equivalent state.
   */
  it('should round-trip any valid DashboardState through encode/decode', () => {
    fc.assert(
      fc.property(dashboardStateArb, (state) => {
        const encoded = encodeDashboardState(state);
        const params = new URLSearchParams(encoded.replace('?', ''));
        const decoded = decodeDashboardState(params);

        expect(decoded.month).toBe(state.month);
        expect(decoded.industry).toBe(state.industry);
      }),
      { numRuns: 100 }
    );
  });
});

describe('Feature: finofii-edge-website, Property 2: Dashboard URL Invalid Params Fallback', () => {
  /**
   * **Validates: Requirements 8.7**
   *
   * For any arbitrary strings, decodeDashboardState returns defaults without throwing.
   */
  it('should return valid defaults for any arbitrary string params without throwing', () => {
    fc.assert(
      fc.property(fc.string(), fc.string(), (monthStr, industryStr) => {
        const params = new URLSearchParams();
        params.set('month', monthStr);
        params.set('industry', industryStr);

        // Should never throw
        const result = decodeDashboardState(params);

        // Result must have valid month (1-12)
        expect(result.month).toBeGreaterThanOrEqual(1);
        expect(result.month).toBeLessThanOrEqual(12);
        expect(Number.isInteger(result.month)).toBe(true);

        // Result must have valid industry
        expect(['dtc', 'agency', 'saas', 'cpa']).toContain(result.industry);
      }),
      { numRuns: 100 }
    );
  });
});

describe('Feature: finofii-edge-website, Property 3: Tier Recommender Produces Valid Tier', () => {
  /**
   * **Validates: Requirements 7.4**
   *
   * For any valid inputs, recommendTier returns one of essentials/growth/scale
   * consistent with score boundaries.
   */
  it('should return a valid tier consistent with score boundaries for any valid inputs', () => {
    fc.assert(
      fc.property(tierRecommenderInputsArb, (inputs) => {
        const tier = recommendTier(inputs);
        const score = calculateTierScore(inputs);

        // Must be one of the valid tiers
        expect(['essentials', 'growth', 'scale']).toContain(tier);

        // Must be consistent with score boundaries
        if (score <= 3) {
          expect(tier).toBe('essentials');
        } else if (score <= 6) {
          expect(tier).toBe('growth');
        } else {
          expect(tier).toBe('scale');
        }
      }),
      { numRuns: 100 }
    );
  });
});

describe('Feature: finofii-edge-website, Property 4: Lead Form Validation Accepts All Valid Combinations', () => {
  /**
   * **Validates: Requirements 10.2**
   *
   * For any valid enum/string inputs within constraints, leadFormSchema passes.
   */
  it('should pass validation for any valid combination of lead form inputs', () => {
    fc.assert(
      fc.property(
        entityTypeArb,
        revenueBandArb,
        accountingToolArb,
        validTimezoneArb,
        validEmailArb,
        (entityType, revenueBand, currentTool, timezone, email) => {
          const data = {
            entityType,
            revenueBand,
            currentTool,
            timezone,
            email,
          };

          const result = leadFormSchema.safeParse(data);
          expect(result.success).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Feature: finofii-edge-website, Property 5: Case Study Filter Correctness', () => {
  /**
   * **Validates: Requirements 16.1**
   *
   * Returned items match active filters; empty filters return all.
   */
  it('should return all items when no filters are active', () => {
    fc.assert(
      fc.property(fc.array(caseStudyArb, { minLength: 0, maxLength: 20 }), (items) => {
        const result = filterCaseStudies(items, {});
        expect(result).toEqual(items);

        const resultEmptyArrays = filterCaseStudies(items, { industry: [], serviceType: [] });
        expect(resultEmptyArrays).toEqual(items);
      }),
      { numRuns: 100 }
    );
  });

  it('should return only items matching active filters', () => {
    fc.assert(
      fc.property(
        fc.array(caseStudyArb, { minLength: 0, maxLength: 20 }),
        fc.subarray(['dtc', 'agency', 'saas', 'cpa'] as IndustryType[], { minLength: 1 }),
        fc.subarray(['bookkeeping', 'mis', 'cfo', 'entity'] as ServiceType[], { minLength: 1 }),
        (items, industryFilters, serviceTypeFilters) => {
          const result = filterCaseStudies(items, {
            industry: industryFilters,
            serviceType: serviceTypeFilters,
          });

          // Every returned item must match both filters
          for (const item of result) {
            expect(industryFilters).toContain(item.industry);
            expect(serviceTypeFilters).toContain(item.serviceType);
          }

          // Every item in original that matches both filters must be in result
          const expected = items.filter(
            (item) =>
              industryFilters.includes(item.industry) &&
              serviceTypeFilters.includes(item.serviceType)
          );
          expect(result).toEqual(expected);
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Feature: finofii-edge-website, Property 6: SEO Metadata Character Limit Enforcement', () => {
  /**
   * **Validates: Requirements 20.1, 20.6**
   *
   * Output title ≤60, description ≤160, OG fields non-empty.
   */
  it('should enforce character limits and non-empty OG fields for any input', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 0, maxLength: 500 }),
        fc.string({ minLength: 0, maxLength: 1000 }),
        fc.stringMatching(/^\/[a-z0-9/-]{0,50}$/),
        (title, description, path) => {
          const result = generatePageSEO({ title, description, path });

          // Title must be ≤60 chars
          expect(result.title.length).toBeLessThanOrEqual(60);

          // Description must be ≤160 chars
          expect(result.description.length).toBeLessThanOrEqual(160);

          // All OG fields must be non-empty
          expect(result.ogTitle.length).toBeGreaterThan(0);
          expect(result.ogDescription.length).toBeGreaterThan(0);
          expect(result.ogImage.length).toBeGreaterThan(0);
          expect(result.ogUrl.length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });
});

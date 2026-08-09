import { describe, it, expect } from 'vitest';
import { recommendTier, calculateTierScore, TierRecommenderInputs } from './tier-recommender';

describe('calculateTierScore', () => {
  it('returns 0 for lowest complexity inputs', () => {
    const inputs: TierRecommenderInputs = {
      entityType: 'sole_prop',
      monthlyTransactions: 'under_50',
      revenueBand: 'pre_revenue',
    };
    expect(calculateTierScore(inputs)).toBe(0);
  });

  it('returns maximum score for highest complexity inputs', () => {
    const inputs: TierRecommenderInputs = {
      entityType: 'ccorp',
      monthlyTransactions: 'over_1000',
      revenueBand: '5m_plus',
    };
    const score = calculateTierScore(inputs);
    expect(score).toBe(12); // 3 + 4 + 5
  });

  it('returns exactly 3 at essentials upper boundary', () => {
    // partnership(1) + 50_200(1) + 0_100k(1) = 3
    const inputs: TierRecommenderInputs = {
      entityType: 'partnership',
      monthlyTransactions: '50_200',
      revenueBand: '0_100k',
    };
    expect(calculateTierScore(inputs)).toBe(3);
  });

  it('returns exactly 4 at growth lower boundary', () => {
    const inputs: TierRecommenderInputs = {
      entityType: 'llc',       // 1
      monthlyTransactions: '50_200', // 1
      revenueBand: '100k_500k',      // 2 → total = 4
    };
    expect(calculateTierScore(inputs)).toBe(4);
  });

  it('returns exactly 6 at growth upper boundary', () => {
    // scorp(2) + 200_500(2) + 100k_500k(2) = 6
    const inputs: TierRecommenderInputs = {
      entityType: 'scorp',
      monthlyTransactions: '200_500',
      revenueBand: '100k_500k',
    };
    expect(calculateTierScore(inputs)).toBe(6);
  });

  it('returns exactly 7 at scale lower boundary', () => {
    const inputs: TierRecommenderInputs = {
      entityType: 'scorp',           // 2
      monthlyTransactions: '200_500', // 2
      revenueBand: '500k_1m',        // 3 → total = 7
    };
    expect(calculateTierScore(inputs)).toBe(7);
  });

  it('transitions from essentials to growth between score 3 and 4', () => {
    // Score 3: essentials
    const essentialsInputs: TierRecommenderInputs = {
      entityType: 'partnership',  // 1
      monthlyTransactions: '50_200',  // 1
      revenueBand: '0_100k',  // 1 → total = 3
    };
    expect(calculateTierScore(essentialsInputs)).toBe(3);
    expect(recommendTier(essentialsInputs)).toBe('essentials');

    // Score 4: growth
    const growthInputs: TierRecommenderInputs = {
      entityType: 'scorp',  // 2
      monthlyTransactions: '50_200',  // 1
      revenueBand: '0_100k',  // 1 → total = 4
    };
    expect(calculateTierScore(growthInputs)).toBe(4);
    expect(recommendTier(growthInputs)).toBe('growth');
  });

  it('transitions from growth to scale between score 6 and 7', () => {
    // Score 6: growth
    const growthInputs: TierRecommenderInputs = {
      entityType: 'scorp',  // 2
      monthlyTransactions: '200_500',  // 2
      revenueBand: '100k_500k',  // 2 → total = 6
    };
    expect(calculateTierScore(growthInputs)).toBe(6);
    expect(recommendTier(growthInputs)).toBe('growth');

    // Score 7: scale
    const scaleInputs: TierRecommenderInputs = {
      entityType: 'scorp',  // 2
      monthlyTransactions: '200_500',  // 2
      revenueBand: '500k_1m',  // 3 → total = 7
    };
    expect(calculateTierScore(scaleInputs)).toBe(7);
    expect(recommendTier(scaleInputs)).toBe('scale');
  });
});

describe('recommendTier', () => {
  it('recommends essentials for score 0-3', () => {
    // sole_prop(0) + under_50(0) + pre_revenue(0) = 0
    expect(recommendTier({
      entityType: 'sole_prop',
      monthlyTransactions: 'under_50',
      revenueBand: 'pre_revenue',
    })).toBe('essentials');

    // llc(1) + under_50(0) + 0_100k(1) = 2
    expect(recommendTier({
      entityType: 'llc',
      monthlyTransactions: 'under_50',
      revenueBand: '0_100k',
    })).toBe('essentials');

    // partnership(1) + 50_200(1) + 0_100k(1) = 3
    expect(recommendTier({
      entityType: 'partnership',
      monthlyTransactions: '50_200',
      revenueBand: '0_100k',
    })).toBe('essentials');
  });

  it('recommends growth for score 4-6', () => {
    // llc(1) + 50_200(1) + 100k_500k(2) = 4
    expect(recommendTier({
      entityType: 'llc',
      monthlyTransactions: '50_200',
      revenueBand: '100k_500k',
    })).toBe('growth');

    // scorp(2) + 200_500(2) + 100k_500k(2) = 6
    expect(recommendTier({
      entityType: 'scorp',
      monthlyTransactions: '200_500',
      revenueBand: '100k_500k',
    })).toBe('growth');
  });

  it('recommends scale for score 7+', () => {
    // scorp(2) + 200_500(2) + 500k_1m(3) = 7
    expect(recommendTier({
      entityType: 'scorp',
      monthlyTransactions: '200_500',
      revenueBand: '500k_1m',
    })).toBe('scale');

    // ccorp(3) + over_1000(4) + 5m_plus(5) = 12
    expect(recommendTier({
      entityType: 'ccorp',
      monthlyTransactions: 'over_1000',
      revenueBand: '5m_plus',
    })).toBe('scale');
  });

  it('always returns a valid PricingTier', () => {
    const tiers = ['essentials', 'growth', 'scale'];
    const result = recommendTier({
      entityType: 'llc',
      monthlyTransactions: '200_500',
      revenueBand: '1m_5m',
    });
    expect(tiers).toContain(result);
  });
});

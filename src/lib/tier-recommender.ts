import type { EntityType, RevenueBand, TransactionVolume, PricingTier } from '@/types/lead';

export interface TierRecommenderInputs {
  entityType: EntityType;
  monthlyTransactions: TransactionVolume;
  revenueBand: RevenueBand;
}

/**
 * Scoring weights for transaction volume (highest weight — operational complexity).
 */
const TRANSACTION_SCORES: Record<TransactionVolume, number> = {
  under_50: 0,
  '50_200': 1,
  '200_500': 2,
  '500_1000': 3,
  over_1000: 4,
};

/**
 * Scoring weights for revenue band (growth stage indicator).
 */
const REVENUE_SCORES: Record<RevenueBand, number> = {
  pre_revenue: 0,
  '0_100k': 1,
  '100k_500k': 2,
  '500k_1m': 3,
  '1m_5m': 4,
  '5m_plus': 5,
};

/**
 * Scoring weights for entity type (compliance needs).
 */
const ENTITY_SCORES: Record<EntityType, number> = {
  sole_prop: 0,
  llc: 1,
  partnership: 1,
  scorp: 2,
  ccorp: 3,
};

/**
 * Returns the numeric score for the given inputs.
 * Transaction volume has highest weight (determines operational complexity).
 * Revenue band indicates growth stage.
 * Entity type influences compliance needs.
 */
export function calculateTierScore(inputs: TierRecommenderInputs): number {
  const transactionScore = TRANSACTION_SCORES[inputs.monthlyTransactions];
  const revenueScore = REVENUE_SCORES[inputs.revenueBand];
  const entityScore = ENTITY_SCORES[inputs.entityType];

  return transactionScore + revenueScore + entityScore;
}

/**
 * Recommends a pricing tier based on input scoring.
 * Score ranges: 0–3 → essentials, 4–6 → growth, 7+ → scale
 */
export function recommendTier(inputs: TierRecommenderInputs): PricingTier {
  const score = calculateTierScore(inputs);

  if (score <= 3) return 'essentials';
  if (score <= 6) return 'growth';
  return 'scale';
}

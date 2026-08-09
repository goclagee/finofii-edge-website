'use client';

import { useState, useCallback } from 'react';
import { Section } from '@/components/design-system/Section';
import { PricingTier } from '@/components/design-system/PricingTier';
import { Badge } from '@/components/design-system/Badge';
import { Accordion } from '@/components/design-system/Accordion';
import { AnimatedHeadline } from '@/components/design-system/AnimatedHeadline';
import { Button } from '@/components/design-system/Button';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { TierRecommender } from '@/components/forms/TierRecommender';
import type { PricingTier as PricingTierType } from '@/types/lead';
import type { PricingFeature } from '@/components/design-system/PricingTier';
import type { AccordionItem } from '@/components/design-system/Accordion';

// --- Pricing Tier Data ---

interface TierData {
  id: PricingTierType;
  name: string;
  price: string;
  period: string;
  description: string;
  features: PricingFeature[];
  badge?: string;
}

const tiers: TierData[] = [
  {
    id: 'essentials',
    name: 'Essentials',
    price: '$499',
    period: '/mo',
    description: 'Core bookkeeping and compliance for early-stage businesses.',
    features: [
      { name: 'Monthly bookkeeping', included: true },
      { name: 'Bank reconciliation', included: true },
      { name: 'Monthly financial statements', included: true },
      { name: 'Expense categorization', included: true },
      { name: '1099 contractor management', included: true },
      { name: 'Dedicated bookkeeper', included: true },
      { name: 'Visual MIS dashboards', included: false },
      { name: 'Custom reporting', included: false },
      { name: 'CFO advisory calls', included: false },
      { name: 'Strategic tax planning', included: false },
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$999',
    period: '/mo',
    description: 'Full-service accounting with dashboards and advisory check-ins.',
    badge: 'Most Popular',
    features: [
      { name: 'Monthly bookkeeping', included: true },
      { name: 'Bank reconciliation', included: true },
      { name: 'Monthly financial statements', included: true },
      { name: 'Expense categorization', included: true },
      { name: '1099 contractor management', included: true },
      { name: 'Dedicated bookkeeper', included: true },
      { name: 'Visual MIS dashboards', included: true },
      { name: 'Custom reporting', included: true },
      { name: 'CFO advisory calls', included: false },
      { name: 'Strategic tax planning', included: false },
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    price: '$1999',
    period: '/mo',
    description: 'Enterprise-grade CFO services, custom reporting, and strategic planning.',
    features: [
      { name: 'Monthly bookkeeping', included: true },
      { name: 'Bank reconciliation', included: true },
      { name: 'Monthly financial statements', included: true },
      { name: 'Expense categorization', included: true },
      { name: '1099 contractor management', included: true },
      { name: 'Dedicated bookkeeper', included: true },
      { name: 'Visual MIS dashboards', included: true },
      { name: 'Custom reporting', included: true },
      { name: 'CFO advisory calls', included: true },
      { name: 'Strategic tax planning', included: true },
    ],
  },
];

// --- Feature Comparison Table Data ---

interface ComparisonFeature {
  name: string;
  essentials: boolean;
  growth: boolean;
  scale: boolean;
}

const comparisonFeatures: ComparisonFeature[] = [
  { name: 'Monthly bookkeeping & close', essentials: true, growth: true, scale: true },
  { name: 'Bank & credit card reconciliation', essentials: true, growth: true, scale: true },
  { name: 'Monthly P&L, Balance Sheet, Cash Flow', essentials: true, growth: true, scale: true },
  { name: 'Accounts payable & receivable', essentials: true, growth: true, scale: true },
  { name: '1099 contractor management', essentials: true, growth: true, scale: true },
  { name: 'Dedicated bookkeeper', essentials: true, growth: true, scale: true },
  { name: 'Visual MIS dashboards', essentials: false, growth: true, scale: true },
  { name: 'Custom KPI reporting', essentials: false, growth: true, scale: true },
  { name: 'Revenue recognition', essentials: false, growth: true, scale: true },
  { name: 'Multi-entity consolidation', essentials: false, growth: false, scale: true },
  { name: 'Monthly CFO advisory calls', essentials: false, growth: false, scale: true },
  { name: 'Board deck preparation', essentials: false, growth: false, scale: true },
  { name: 'Strategic tax planning', essentials: false, growth: false, scale: true },
  { name: 'Fundraising financial support', essentials: false, growth: false, scale: true },
  { name: 'Budgets & forecasting', essentials: false, growth: false, scale: true },
];

// --- FAQ Data ---

const faqItems: AccordionItem[] = [
  {
    id: 'faq-1',
    title: 'Can I switch tiers later?',
    content:
      "Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle, and we'll handle the transition seamlessly.",
  },
  {
    id: 'faq-2',
    title: 'What accounting tools do you integrate with?',
    content:
      "We support QuickBooks Online, Xero, Ramp, Brex, Mercury, Stripe, and many more. Our team will handle the setup and ongoing reconciliation across all your connected platforms.",
  },
  {
    id: 'faq-3',
    title: 'Is there a minimum commitment?',
    content:
      "No long-term contracts required. All plans are month-to-month. We earn your business every month through quality work and timely delivery.",
  },
  {
    id: 'faq-4',
    title: 'How quickly can I get started?',
    content:
      "Our onboarding process takes 14 days from sign-up to full operation. We handle all the setup, tool connections, and historical data migration during this period.",
  },
  {
    id: 'faq-5',
    title: 'What happens if my transaction volume increases?',
    content:
      "If your business grows beyond the typical range for your current tier, we'll reach out to discuss upgrading. We'll never surprise you with overage fees.",
  },
  {
    id: 'faq-6',
    title: 'Do you handle sales tax and state filings?',
    content:
      "Sales tax compliance and state filings are included in the Growth and Scale tiers. For Essentials, this can be added as a supplemental service.",
  },
];

// --- Page Component ---

export default function PricingPage() {
  const [selectedTier, setSelectedTier] = useState<PricingTierType | null>(null);

  const handleTierSelect = useCallback((tier: PricingTierType) => {
    setSelectedTier(tier);
  }, []);

  const handleRecommendation = useCallback((tier: PricingTierType) => {
    setSelectedTier(tier);
  }, []);

  return (
    <main className="bg-paper min-h-screen">
      {/* Hero Section */}
      <Section padding="lg" className="text-center">
        <AnimatedHeadline
          text="Simple, Transparent Pricing"
          as="h1"
          animation="fade-up"
        />
        <p className="mt-4 text-lg text-ink/70 max-w-2xl mx-auto">
          Choose the plan that fits your business stage. All plans include a
          dedicated team and month-to-month flexibility.
        </p>
      </Section>

      {/* Pricing Tier Cards */}
      <Section padding="md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <ScrollReveal key={tier.id} animation="fade-up" delay={tier.id === 'essentials' ? 0 : tier.id === 'growth' ? 100 : 200}>
              <PricingTier
                name={tier.name}
                price={tier.price}
                period={tier.period}
                description={tier.description}
                features={tier.features}
                highlighted={selectedTier === tier.id || (!selectedTier && tier.id === 'growth')}
                ctaText={selectedTier === tier.id ? 'Book a Free Audit' : 'Select Plan'}
                ctaHref={selectedTier === tier.id ? '/book' : undefined}
                onCtaClick={selectedTier === tier.id ? undefined : () => handleTierSelect(tier.id)}
                badge={
                  tier.badge ? (
                    <Badge variant="accent" size="sm">
                      {tier.badge}
                    </Badge>
                  ) : undefined
                }
                className="h-full cursor-pointer"
                onClick={() => handleTierSelect(tier.id)}
              />
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* Tier Recommender */}
      <Section padding="lg">
        <div className="max-w-xl mx-auto">
          <ScrollReveal animation="fade-up">
            <TierRecommender onRecommendation={handleRecommendation} />
          </ScrollReveal>
        </div>
      </Section>

      {/* Feature Comparison Table */}
      <Section padding="lg">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-ink">
            Feature Comparison
          </h2>
          <p className="mt-2 text-ink/70">
            See exactly what's included in each plan.
          </p>
        </div>

        <ScrollReveal animation="fade-up">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse" aria-label="Feature comparison across pricing tiers">
              <thead>
                <tr className="border-b-2 border-ink/10">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-ink w-1/3">
                    Feature
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-ink">
                    Essentials
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-ink">
                    Growth
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-ink">
                    Scale
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature) => (
                  <ComparisonRow key={feature.name} feature={feature} />
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </Section>

      {/* FAQ Section */}
      <Section padding="lg">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-ink">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-ink/70">
            Everything you need to know about our pricing and services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <ScrollReveal animation="fade-up">
            <Accordion items={faqItems} allowMultiple />
          </ScrollReveal>
        </div>
      </Section>

      {/* CTA Section */}
      <Section padding="lg" className="text-center">
        <ScrollReveal animation="fade-up">
          <h2 className="text-3xl font-display font-bold text-ink mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-ink/70 mb-8 max-w-xl mx-auto">
            Book a free audit and discover which plan will transform your
            financial operations.
          </p>
          <Button variant="accent" size="lg" href="/book" magnetic>
            Book a Free Audit
          </Button>
        </ScrollReveal>
      </Section>
    </main>
  );
}

// --- Helper Components ---

function ComparisonRow({ feature }: { feature: ComparisonFeature }) {
  return (
    <tr className="border-b border-ink/5 hover:bg-ink/[0.02] transition-colors">
      <td className="py-3 px-4 text-sm text-ink">
        {feature.name}
      </td>
      <td className="py-3 px-4 text-center">
        <FeatureIndicator included={feature.essentials} />
      </td>
      <td className="py-3 px-4 text-center">
        <FeatureIndicator included={feature.growth} />
      </td>
      <td className="py-3 px-4 text-center">
        <FeatureIndicator included={feature.scale} />
      </td>
    </tr>
  );
}

function FeatureIndicator({ included }: { included: boolean }) {
  if (included) {
    return (
      <svg
        className="h-5 w-5 inline-block text-accent"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-label="Included"
        role="img"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <svg
      className="h-5 w-5 inline-block text-ink/30"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-label="Not included"
      role="img"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

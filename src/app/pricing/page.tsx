'use client';

import { useState, useCallback } from 'react';
import { Section } from '@/components/design-system/Section';
import { CtaSection } from '@/components/design-system/CtaSection';
import { PricingTier } from '@/components/design-system/PricingTier';
import { Badge } from '@/components/design-system/Badge';
import { Accordion } from '@/components/design-system/Accordion';
import { AnimatedHeadline } from '@/components/design-system/AnimatedHeadline';
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
    description: 'Core Bookkeeping And Compliance For Early-Stage Businesses.',
    features: [
      { name: 'Monthly Bookkeeping', included: true },
      { name: 'Bank Reconciliation', included: true },
      { name: 'Monthly Financial Statements', included: true },
      { name: 'Expense Categorization', included: true },
      { name: '1099 Contractor Management', included: true },
      { name: 'Dedicated Bookkeeper', included: true },
      { name: 'Visual MIS Dashboards', included: false },
      { name: 'Custom Reporting', included: false },
      { name: 'CFO Advisory Calls', included: false },
      { name: 'Strategic Tax Planning', included: false },
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$999',
    period: '/mo',
    description: 'Full-Service Accounting With Dashboards And Advisory Check-Ins.',
    badge: 'Most Popular',
    features: [
      { name: 'Monthly Bookkeeping', included: true },
      { name: 'Bank Reconciliation', included: true },
      { name: 'Monthly Financial Statements', included: true },
      { name: 'Expense Categorization', included: true },
      { name: '1099 Contractor Management', included: true },
      { name: 'Dedicated Bookkeeper', included: true },
      { name: 'Visual MIS Dashboards', included: true },
      { name: 'Custom Reporting', included: true },
      { name: 'CFO Advisory Calls', included: false },
      { name: 'Strategic Tax Planning', included: false },
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    price: '$1999',
    period: '/mo',
    description: 'Enterprise-Grade CFO Services, Custom Reporting And Strategic Planning.',
    features: [
      { name: 'Monthly Bookkeeping', included: true },
      { name: 'Bank Reconciliation', included: true },
      { name: 'Monthly Financial Statements', included: true },
      { name: 'Expense Categorization', included: true },
      { name: '1099 Contractor Management', included: true },
      { name: 'Dedicated Bookkeeper', included: true },
      { name: 'Visual MIS Dashboards', included: true },
      { name: 'Custom Reporting', included: true },
      { name: 'CFO Advisory Calls', included: true },
      { name: 'Strategic Tax Planning', included: true },
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
  { name: 'Monthly Bookkeeping & Accounting', essentials: true, growth: true, scale: true },
  { name: 'Bank & Credit Card Reconciliation', essentials: true, growth: true, scale: true },
  { name: 'Monthly P&L, Balance Sheet, Cash Flow', essentials: true, growth: true, scale: true },
  { name: 'Accounts Payable & Receivable', essentials: true, growth: true, scale: true },
  { name: '1099 Contractor Management', essentials: true, growth: true, scale: true },
  { name: 'Dedicated Bookkeeper', essentials: true, growth: true, scale: true },
  { name: 'Visual MIS Dashboards', essentials: false, growth: true, scale: true },
  { name: 'Custom KPI Reporting', essentials: false, growth: true, scale: true },
  { name: 'Revenue Recognition', essentials: false, growth: true, scale: true },
  { name: 'Multi-Entity Consolidation', essentials: false, growth: false, scale: true },
  { name: 'Monthly CFO Advisory Calls', essentials: false, growth: false, scale: true },
  { name: 'Board Deck Preparation', essentials: false, growth: false, scale: true },
  { name: 'Strategic Tax Planning', essentials: false, growth: false, scale: true },
  { name: 'Fundraising Financial Support', essentials: false, growth: false, scale: true },
  { name: 'Budgets & Forecasting', essentials: false, growth: false, scale: true },
];

// --- FAQ Data ---

const faqItems: AccordionItem[] = [
  {
    id: 'faq-1',
    title: 'Can I Switch Tiers Later?',
    content:
      "Absolutely. You Can Upgrade Or Downgrade Your Plan At Any Time. Changes Take Effect At The Start Of Your Next Billing Cycle, And We'll Handle The Transition Seamlessly.",
  },
  {
    id: 'faq-2',
    title: 'What Accounting Tools Do You Integrate With?',
    content:
      "We Support QuickBooks Online, Xero, Ramp, Brex, Mercury, Stripe And Many More. Our Team Will Handle The Setup And Ongoing Reconciliation Across All Your Connected Platforms.",
  },
  {
    id: 'faq-3',
    title: 'Is There A Minimum Commitment?',
    content:
      "No Long-Term Contracts Required. All Plans Are Month-To-Month. We Earn Your Business Every Month Through Quality Work And Timely Delivery.",
  },
  {
    id: 'faq-4',
    title: 'How Quickly Can I Get Started?',
    content:
      "Our Onboarding Process Takes 14 Days From Sign-Up To Full Operation. We Handle All The Setup, Tool Connections And Historical Data Migration During This Period.",
  },
  {
    id: 'faq-5',
    title: 'What Happens If My Transaction Volume Increases?',
    content:
      "If Your Business Grows Beyond The Typical Range For Your Current Tier, We'll Reach Out To Discuss Upgrading. We'll Never Surprise You With Overage Fees.",
  },
  {
    id: 'faq-6',
    title: 'Do You Handle Sales Tax And State Filings?',
    content:
      "Sales Tax Compliance And State Filings Are Included In The Growth And Scale Tiers. For Essentials, This Can Be Added As A Supplemental Service.",
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
          Choose The Plan That Fits Your Business Stage. All Plans Include A
          Dedicated Team And Month-To-Month Flexibility.
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
            See Exactly What&apos;s Included In Each Plan.
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
            Everything You Need To Know About Our Pricing And Services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <ScrollReveal animation="fade-up">
            <Accordion items={faqItems} allowMultiple />
          </ScrollReveal>
        </div>
      </Section>

      {/* CTA Section */}
      <CtaSection
        headline="Ready To Get Started?"
        description="Book A Free Audit And Discover Which Plan Will Transform Your Financial Operations."
      />
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

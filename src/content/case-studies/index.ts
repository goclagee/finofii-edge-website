import type { CaseStudy } from '@/types/case-study';

/**
 * Sample case study content for the /case-studies page.
 * Covers all four industry verticals and service types.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: 'cs-001',
    slug: 'dtc-skincare-bookkeeping',
    industry: 'dtc',
    serviceType: 'bookkeeping',
    headline: 'DTC Skincare Brand Cuts Close Time from 18 to 4 Days',
    clientIndustryLabel: 'DTC / E-Commerce',
    problem:
      "A fast-growing skincare brand was struggling with an 18-day monthly close cycle. Their in-house bookkeeper couldn't keep up with multi-channel sales (Shopify, Amazon, wholesale), leading to inaccurate COGS and delayed financial visibility.",
    solution:
      'Finofii Edge automated bank feeds across 4 accounts, built custom Ramp categorization rules and implemented a 5-step close cadence synced with their Shopify and Amazon settlement cycles.',
    metrics: [
      {
        label: 'Monthly Close',
        before: 18,
        after: 4,
        unit: 'days',
        improvement: '78% faster',
      },
      {
        label: 'Reconciliation Errors',
        before: 23,
        after: 2,
        unit: '/mo',
        improvement: '91% reduction',
      },
      {
        label: 'Time Saved',
        before: 40,
        after: 8,
        unit: 'hrs/mo',
        improvement: '80% reduction',
      },
    ],
    publishedAt: '2024-09-15',
  },
  {
    id: 'cs-002',
    slug: 'agency-creative-mis',
    industry: 'agency',
    serviceType: 'mis',
    headline: 'Creative Agency Gains Real-Time Profitability by Project',
    clientIndustryLabel: 'Agency',
    problem:
      'A 35-person creative agency had no visibility into project-level profitability. They relied on spreadsheets that were always outdated, making it impossible to identify underperforming accounts until quarter-end reviews.',
    solution:
      'Finofii Edge deployed a custom MIS dashboard integrating their project management tool with QuickBooks. Weekly automated reports break down revenue, contractor costs and margin per client and project.',
    metrics: [
      {
        label: 'Report Delivery',
        before: 15,
        after: 3,
        unit: 'days',
        improvement: '5x faster',
      },
      {
        label: 'Gross Margin',
        before: 32,
        after: 41,
        unit: '%',
        improvement: '+9 points',
      },
    ],
    publishedAt: '2024-10-02',
  },
  {
    id: 'cs-003',
    slug: 'saas-startup-cfo',
    industry: 'saas',
    serviceType: 'cfo',
    headline: 'SaaS Startup Secures Series A with CFO-Ready Financials',
    clientIndustryLabel: 'SaaS',
    problem:
      'A B2B SaaS company approaching Series A had disorganized financials. Their MRR calculations were inconsistent, churn metrics were unreliable and they lacked the financial model required by VCs for due diligence.',
    solution:
      "Finofii Edge's Virtual CFO team rebuilt their revenue recognition model per ASC 606, created a 3-statement financial model with SaaS-specific KPIs and prepared a data room that passed VC due diligence on first review.",
    metrics: [
      {
        label: 'Fundraise Prep',
        before: 90,
        after: 21,
        unit: 'days',
        improvement: '77% faster',
      },
      {
        label: 'MRR Accuracy',
        before: 72,
        after: 99,
        unit: '%',
        improvement: '+27 points',
      },
      {
        label: 'Due Diligence Issues',
        before: 14,
        after: 0,
        unit: '',
        improvement: 'Zero issues',
      },
    ],
    publishedAt: '2024-11-10',
  },
  {
    id: 'cs-004',
    slug: 'cpa-firm-entity',
    industry: 'cpa',
    serviceType: 'entity',
    headline: 'CPA Firm Eliminates Filing Penalties Across 120 Entities',
    clientIndustryLabel: 'CPA Firm',
    problem:
      'A regional CPA firm managing 120+ client entities was missing state filing deadlines regularly. Manual tracking in spreadsheets led to 8 penalty notices in the prior year, totaling over $45,000 in fines passed to clients.',
    solution:
      "Finofii Edge implemented an automated filing calendar with 60/30/7-day alerts, handled annual report filings across 12 states and provided a real-time compliance status dashboard for the firm's partners.",
    metrics: [
      {
        label: 'Filing Penalties',
        before: 8,
        after: 0,
        unit: '/yr',
        improvement: '100% eliminated',
      },
      {
        label: 'Penalty Costs',
        before: 45000,
        after: 0,
        unit: '$',
        improvement: '$45K saved',
      },
    ],
    publishedAt: '2024-08-20',
  },
  {
    id: 'cs-005',
    slug: 'dtc-supplements-mis',
    industry: 'dtc',
    serviceType: 'mis',
    headline: 'Supplement Brand Identifies $180K in Hidden Margin Leaks',
    clientIndustryLabel: 'DTC / E-Commerce',
    problem:
      'A DTC supplements company with $4M revenue had no clear view of true product-level margins. Shipping cost allocation, return processing fees and influencer commissions were lumped into a single "marketing" category.',
    solution:
      'Finofii Edge built a multi-layer margin dashboard that allocated costs per SKU across fulfillment, returns, ad spend and affiliate commissions. Monthly variance reports flagged margin-eroding products automatically.',
    metrics: [
      {
        label: 'Margin Visibility',
        before: 1,
        after: 4,
        unit: 'layers',
        improvement: '4x deeper',
      },
      {
        label: 'Cost Savings Found',
        before: 0,
        after: 180000,
        unit: '$',
        improvement: '$180K identified',
      },
    ],
    publishedAt: '2024-12-01',
  },
  {
    id: 'cs-006',
    slug: 'agency-bookkeeping-scale',
    industry: 'agency',
    serviceType: 'bookkeeping',
    headline: 'Performance Agency Scales from 10 to 40 Clients Without Adding Ops Staff',
    clientIndustryLabel: 'Agency',
    problem:
      'A performance marketing agency scaling rapidly found their single ops manager overwhelmed with invoicing, contractor payments and reconciliation across 10 client retainers. Adding clients meant adding headcount.',
    solution:
      'Finofii Edge took over all transactional bookkeeping with automated invoice matching, contractor 1099 tracking and weekly cash position reports. The ops manager shifted to strategic work while the agency quadrupled its client count.',
    metrics: [
      {
        label: 'Client Capacity',
        before: 10,
        after: 40,
        unit: 'clients',
        improvement: '4x growth',
      },
      {
        label: 'Ops Headcount',
        before: 1,
        after: 1,
        unit: 'FTE',
        improvement: 'No new hires',
      },
      {
        label: 'Invoice Processing',
        before: 5,
        after: 1,
        unit: 'days',
        improvement: '80% faster',
      },
    ],
    publishedAt: '2025-01-05',
  },
];

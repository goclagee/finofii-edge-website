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
    headline: 'DTC Skincare Brand Cuts Close Time From 18 To 4 Days',
    clientIndustryLabel: 'DTC / E-Commerce',
    problem:
      "A Fast-Growing Skincare Brand Was Struggling With An 18-Day Monthly Close Cycle. Their In-House Bookkeeper Couldn't Keep Up With Multi-Channel Sales (Shopify, Amazon, Wholesale), Leading To Inaccurate COGS And Delayed Financial Visibility.",
    solution:
      'Finofiii Edge Automated Bank Feeds Across 4 Accounts, Built Custom Ramp Categorization Rules And Implemented A 5-Step Close Cadence Synced With Their Shopify And Amazon Settlement Cycles.',
    metrics: [
      {
        label: 'Monthly Close',
        before: 18,
        after: 4,
        unit: 'days',
        improvement: '78% Faster',
      },
      {
        label: 'Reconciliation Errors',
        before: 23,
        after: 2,
        unit: '/mo',
        improvement: '91% Reduction',
      },
      {
        label: 'Time Saved',
        before: 40,
        after: 8,
        unit: 'hrs/mo',
        improvement: '80% Reduction',
      },
    ],
    publishedAt: '2024-09-15',
  },
  {
    id: 'cs-002',
    slug: 'agency-creative-mis',
    industry: 'agency',
    serviceType: 'mis',
    headline: 'Creative Agency Gains Real-Time Profitability By Project',
    clientIndustryLabel: 'Agency',
    problem:
      'A 35-Person Creative Agency Had No Visibility Into Project-Level Profitability. They Relied On Spreadsheets That Were Always Outdated, Making It Impossible To Identify Underperforming Accounts Until Quarter-End Reviews.',
    solution:
      'Finofiii Edge Deployed A Custom MIS Dashboard Integrating Their Project Management Tool With QuickBooks. Weekly Automated Reports Break Down Revenue, Contractor Costs And Margin Per Client And Project.',
    metrics: [
      {
        label: 'Report Delivery',
        before: 15,
        after: 3,
        unit: 'days',
        improvement: '5X Faster',
      },
      {
        label: 'Gross Margin',
        before: 32,
        after: 41,
        unit: '%',
        improvement: '+9 Points',
      },
    ],
    publishedAt: '2024-10-02',
  },
  {
    id: 'cs-003',
    slug: 'saas-startup-cfo',
    industry: 'saas',
    serviceType: 'cfo',
    headline: 'SaaS Startup Secures Series A With CFO-Ready Financials',
    clientIndustryLabel: 'SaaS',
    problem:
      'A B2B SaaS Company Approaching Series A Had Disorganized Financials. Their MRR Calculations Were Inconsistent, Churn Metrics Were Unreliable And They Lacked The Financial Model Required By VCs For Due Diligence.',
    solution:
      "Finofiii Edge's Virtual CFO Team Rebuilt Their Revenue Recognition Model Per ASC 606, Created A 3-Statement Financial Model With SaaS-Specific KPIs And Prepared A Data Room That Passed VC Due Diligence On First Review.",
    metrics: [
      {
        label: 'Fundraise Prep',
        before: 90,
        after: 21,
        unit: 'days',
        improvement: '77% Faster',
      },
      {
        label: 'MRR Accuracy',
        before: 72,
        after: 99,
        unit: '%',
        improvement: '+27 Points',
      },
      {
        label: 'Due Diligence Issues',
        before: 14,
        after: 0,
        unit: '',
        improvement: 'Zero Issues',
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
      'A Regional CPA Firm Managing 120+ Client Entities Was Missing State Filing Deadlines Regularly. Manual Tracking In Spreadsheets Led To 8 Penalty Notices In The Prior Year, Totaling Over $45,000 In Fines Passed To Clients.',
    solution:
      "Finofiii Edge Implemented An Automated Filing Calendar With 60/30/7-Day Alerts, Handled Annual Report Filings Across 12 States And Provided A Real-Time Compliance Status Dashboard For The Firm's Partners.",
    metrics: [
      {
        label: 'Filing Penalties',
        before: 8,
        after: 0,
        unit: '/yr',
        improvement: '100% Eliminated',
      },
      {
        label: 'Penalty Costs',
        before: 45000,
        after: 0,
        unit: '$',
        improvement: '$45K Saved',
      },
    ],
    publishedAt: '2024-08-20',
  },
  {
    id: 'cs-005',
    slug: 'dtc-supplements-mis',
    industry: 'dtc',
    serviceType: 'mis',
    headline: 'Supplement Brand Identifies $180K In Hidden Margin Leaks',
    clientIndustryLabel: 'DTC / E-Commerce',
    problem:
      'A DTC Supplements Company With $4M Revenue Had No Clear View Of True Product-Level Margins. Shipping Cost Allocation, Return Processing Fees And Influencer Commissions Were Lumped Into A Single "Marketing" Category.',
    solution:
      'Finofiii Edge Built A Multi-Layer Margin Dashboard That Allocated Costs Per SKU Across Fulfillment, Returns, Ad Spend And Affiliate Commissions. Monthly Variance Reports Flagged Margin-Eroding Products Automatically.',
    metrics: [
      {
        label: 'Margin Visibility',
        before: 1,
        after: 4,
        unit: 'layers',
        improvement: '4X Deeper',
      },
      {
        label: 'Cost Savings Found',
        before: 0,
        after: 180000,
        unit: '$',
        improvement: '$180K Identified',
      },
    ],
    publishedAt: '2024-12-01',
  },
  {
    id: 'cs-006',
    slug: 'agency-bookkeeping-scale',
    industry: 'agency',
    serviceType: 'bookkeeping',
    headline: 'Performance Agency Scales From 10 To 40 Clients Without Adding Ops Staff',
    clientIndustryLabel: 'Agency',
    problem:
      'A Performance Marketing Agency Scaling Rapidly Found Their Single Ops Manager Overwhelmed With Invoicing, Contractor Payments And Reconciliation Across 10 Client Retainers. Adding Clients Meant Adding Headcount.',
    solution:
      'Finofiii Edge Took Over All Transactional Bookkeeping With Automated Invoice Matching, Contractor 1099 Tracking And Weekly Cash Position Reports. The Ops Manager Shifted To Strategic Work While The Agency Quadrupled Its Client Count.',
    metrics: [
      {
        label: 'Client Capacity',
        before: 10,
        after: 40,
        unit: 'clients',
        improvement: '4X Growth',
      },
      {
        label: 'Ops Headcount',
        before: 1,
        after: 1,
        unit: 'FTE',
        improvement: 'No New Hires',
      },
      {
        label: 'Invoice Processing',
        before: 5,
        after: 1,
        unit: 'days',
        improvement: '80% Faster',
      },
    ],
    publishedAt: '2025-01-05',
  },
];

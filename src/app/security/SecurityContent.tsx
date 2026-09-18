'use client';

import { useState, useMemo } from 'react';
import { Section } from '@/components/design-system/Section';
import { Badge } from '@/components/design-system/Badge';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { StickyTOCSidebar, type TOCItem } from '@/components/layout/StickyTOCSidebar';

/* ─── TOC Configuration ──────────────────────────────────────────────────── */

const tocItems: TOCItem[] = [
  { id: 'security-controls', label: 'Security Controls', level: 1 },
  { id: 'data-handling', label: 'Data Handling Policies', level: 1 },
  { id: 'sub-processors', label: 'Sub-Processors', level: 1 },
];

/* ─── Security Controls Data ─────────────────────────────────────────────── */

interface SecurityControl {
  id: string;
  icon: string;
  description: string;
}

const securityControls: SecurityControl[] = [
  {
    id: 'soc2',
    icon: '🛡️',
    description: 'SOC 2 Type II certified with annual audits by independent third-party assessors.',
  },
  {
    id: 'encryption-transit',
    icon: '🔒',
    description: 'All data encrypted in transit using TLS 1.3 with forward secrecy enabled.',
  },
  {
    id: 'encryption-rest',
    icon: '🗄️',
    description: 'Data at rest encrypted with AES-256 across all storage systems and backups.',
  },
  {
    id: 'mfa',
    icon: '🔑',
    description: 'Multi-factor authentication enforced for all team members and admin access.',
  },
  {
    id: 'access-control',
    icon: '👤',
    description: 'Role-based access control with principle of least privilege across all systems.',
  },
  {
    id: 'monitoring',
    icon: '📊',
    description: 'Real-time security monitoring with automated alerting on anomalous activity.',
  },
  {
    id: 'incident-response',
    icon: '🚨',
    description: 'Documented incident response plan with 24-hour notification SLA for breaches.',
  },
  {
    id: 'vendor-assessment',
    icon: '✅',
    description: 'All third-party vendors undergo security assessment before onboarding.',
  },
  {
    id: 'backup',
    icon: '💾',
    description: 'Daily encrypted backups with geo-redundant storage and tested recovery procedures.',
  },
  {
    id: 'pen-testing',
    icon: '🔍',
    description: 'Annual penetration testing performed by certified external security firms.',
  },
];

/* ─── Data Handling Policies Data ────────────────────────────────────────── */

interface DataPolicy {
  id: string;
  title: string;
  summary: string;
  category: string;
  categoryVariant: 'accent' | 'brass' | 'flag' | 'default';
}

const dataPolicies: DataPolicy[] = [
  {
    id: 'collection',
    title: 'Data Collection & Minimization',
    summary: 'We collect only data necessary for service delivery. Personal and financial data is categorized and retention limits are enforced per category.',
    category: 'Personal Data',
    categoryVariant: 'accent',
  },
  {
    id: 'retention',
    title: 'Data Retention & Deletion',
    summary: 'Financial records retained for 7 years per regulatory requirements. Personal data deleted within 30 days of account closure upon request.',
    category: 'Financial Data',
    categoryVariant: 'brass',
  },
  {
    id: 'access',
    title: 'Data Access & Portability',
    summary: 'Clients can request full data export in standard formats at any time. Access requests fulfilled within 5 business days.',
    category: 'Client Data',
    categoryVariant: 'flag',
  },
  {
    id: 'processing',
    title: 'Data Processing Locations',
    summary: 'All client financial data processed and stored within the United States. No cross-border transfers without explicit consent.',
    category: 'Financial Data',
    categoryVariant: 'brass',
  },
  {
    id: 'sharing',
    title: 'Third-Party Data Sharing',
    summary: 'Data shared only with vetted sub-processors listed below. No data sold to third parties. Contractual safeguards in place for all sharing.',
    category: 'Personal Data',
    categoryVariant: 'accent',
  },
  {
    id: 'breach-notification',
    title: 'Breach Notification Policy',
    summary: 'Affected clients notified within 72 hours of confirmed breach. Full incident report provided within 10 business days.',
    category: 'Operational Data',
    categoryVariant: 'default',
  },
];

/* ─── Sub-Processor Data ─────────────────────────────────────────────────── */

interface SubProcessor {
  name: string;
  purpose: string;
  dataLocation: string;
}

const subProcessors: SubProcessor[] = [
  {
    name: 'Amazon Web Services',
    purpose: 'Cloud infrastructure and data hosting',
    dataLocation: 'United States',
  },
  {
    name: 'Cal.com',
    purpose: 'Calendar scheduling and booking',
    dataLocation: 'United States',
  },
  {
    name: 'Google Workspace',
    purpose: 'Email and document collaboration',
    dataLocation: 'United States',
  },
  {
    name: 'HubSpot',
    purpose: 'CRM and client relationship management',
    dataLocation: 'United States',
  },
  {
    name: 'Mercury',
    purpose: 'Banking integration and transaction sync',
    dataLocation: 'United States',
  },
  {
    name: 'QuickBooks Online',
    purpose: 'Accounting and bookkeeping platform',
    dataLocation: 'United States',
  },
  {
    name: 'Ramp',
    purpose: 'Corporate card and expense management',
    dataLocation: 'United States',
  },
  {
    name: 'Slack',
    purpose: 'Internal team communication and alerts',
    dataLocation: 'United States',
  },
  {
    name: 'Stripe',
    purpose: 'Payment processing and billing',
    dataLocation: 'United States',
  },
  {
    name: 'Vercel',
    purpose: 'Website hosting and edge delivery',
    dataLocation: 'United States',
  },
  {
    name: 'Xero',
    purpose: 'Accounting platform integration',
    dataLocation: 'United States',
  },
];

/* ─── Sort Configuration ─────────────────────────────────────────────────── */

type SortField = 'name' | 'purpose' | 'dataLocation';
type SortDirection = 'asc' | 'desc';

/* ─── Component ──────────────────────────────────────────────────────────── */

export function SecurityContent() {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const sortedProcessors = useMemo(() => {
    return [...subProcessors].sort((a, b) => {
      const aVal = a[sortField].toLowerCase();
      const bVal = b[sortField].toLowerCase();
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIndicator = (field: SortField) => {
    if (sortField !== field) return ' ↕';
    return sortDirection === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <Section padding="lg" ariaLabel="Security and Compliance overview">
        <div className="text-center max-w-3xl mx-auto">
          <ScrollReveal animation="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-ink">
              Security &amp; Compliance
            </h1>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <p className="mt-4 text-lg text-ink/70 font-interface leading-relaxed">
              Your financial data deserves the highest level of protection. We maintain
              rigorous security controls, transparent data handling and vetted
              sub-processor relationships.
            </p>
          </ScrollReveal>
        </div>
      </Section>

      {/* Main Content with TOC Sidebar */}
      <Section padding="md">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sticky TOC Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <StickyTOCSidebar
              items={tocItems}
              topOffset={100}
              title="On this page"
            />
          </aside>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            {/* Security Controls Section */}
            <section id="security-controls" aria-labelledby="security-controls-heading">
              <ScrollReveal animation="fade-up">
                <h2
                  id="security-controls-heading"
                  className="text-2xl md:text-3xl font-bold font-display text-ink mb-6"
                >
                  Security Controls
                </h2>
              </ScrollReveal>
              <ul className="space-y-4 list-none p-0 m-0" role="list">
                {securityControls.map((control, index) => (
                  <ScrollReveal
                    key={control.id}
                    animation="fade-up"
                    delay={index * 100}
                  >
                    <li className="flex items-start gap-4 p-4 rounded-[14px] border border-ink/10 bg-paper hover:border-accent/30 transition-colors duration-200">
                      <span
                        className="text-2xl shrink-0 mt-0.5"
                        role="img"
                        aria-hidden="true"
                      >
                        {control.icon}
                      </span>
                      <p className="text-sm md:text-base text-ink/80 font-interface leading-relaxed m-0">
                        {control.description}
                      </p>
                    </li>
                  </ScrollReveal>
                ))}
              </ul>
            </section>

            {/* Data Handling Policies Section */}
            <section
              id="data-handling"
              className="mt-16"
              aria-labelledby="data-handling-heading"
            >
              <ScrollReveal animation="fade-up">
                <h2
                  id="data-handling-heading"
                  className="text-2xl md:text-3xl font-bold font-display text-ink mb-6"
                >
                  Data Handling Policies
                </h2>
              </ScrollReveal>
              <div className="space-y-4">
                {dataPolicies.map((policy, index) => (
                  <ScrollReveal
                    key={policy.id}
                    animation="fade-up"
                    delay={index * 80}
                  >
                    <div className="p-5 rounded-[14px] border border-ink/10 bg-paper">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-base font-semibold font-display text-ink">
                          {policy.title}
                        </h3>
                        <Badge
                          variant={policy.categoryVariant}
                          size="sm"
                          className="shrink-0"
                        >
                          {policy.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-ink/70 font-interface leading-relaxed m-0">
                        {policy.summary}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </section>

            {/* Sub-Processors Section */}
            <section
              id="sub-processors"
              className="mt-16"
              aria-labelledby="sub-processors-heading"
            >
              <ScrollReveal animation="fade-up">
                <h2
                  id="sub-processors-heading"
                  className="text-2xl md:text-3xl font-bold font-display text-ink mb-6"
                >
                  Sub-Processors
                </h2>
                <p className="text-ink/60 font-interface mb-6">
                  The following third-party services process data on our behalf. Click
                  column headers to sort.
                </p>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={100}>
                <div className="overflow-x-auto rounded-[14px] border border-ink/10">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-ink/[0.03]">
                        <th className="p-0">
                          <button
                            type="button"
                            onClick={() => handleSort('name')}
                            className="w-full px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink/60 hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-inset"
                            aria-sort={
                              sortField === 'name'
                                ? sortDirection === 'asc'
                                  ? 'ascending'
                                  : 'descending'
                                : 'none'
                            }
                          >
                            Name{getSortIndicator('name')}
                          </button>
                        </th>
                        <th className="p-0">
                          <button
                            type="button"
                            onClick={() => handleSort('purpose')}
                            className="w-full px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink/60 hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-inset"
                            aria-sort={
                              sortField === 'purpose'
                                ? sortDirection === 'asc'
                                  ? 'ascending'
                                  : 'descending'
                                : 'none'
                            }
                          >
                            Purpose{getSortIndicator('purpose')}
                          </button>
                        </th>
                        <th className="p-0">
                          <button
                            type="button"
                            onClick={() => handleSort('dataLocation')}
                            className="w-full px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink/60 hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-inset"
                            aria-sort={
                              sortField === 'dataLocation'
                                ? sortDirection === 'asc'
                                  ? 'ascending'
                                  : 'descending'
                                : 'none'
                            }
                          >
                            Data Location{getSortIndicator('dataLocation')}
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink/5">
                      {sortedProcessors.map((processor) => (
                        <tr
                          key={processor.name}
                          className="hover:bg-ink/[0.02] transition-colors"
                        >
                          <td className="px-4 py-3 text-sm font-medium text-ink font-interface">
                            {processor.name}
                          </td>
                          <td className="px-4 py-3 text-sm text-ink/70 font-interface">
                            {processor.purpose}
                          </td>
                          <td className="px-4 py-3 text-sm text-ink/70 font-interface">
                            {processor.dataLocation}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ScrollReveal>
            </section>
          </div>
        </div>
      </Section>
    </div>
  );
}

'use client';

import { Section } from '@/components/design-system/Section';
import { Card } from '@/components/design-system/Card';
import { AnimatedHeadline } from '@/components/design-system/AnimatedHeadline';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { CtaSection } from '@/components/design-system/CtaSection';
import { FilingCalendar } from '@/components/content/FilingCalendar';
import type { FilingDeadline } from '@/types/content';

/* ─── Filing Deadlines Data ──────────────────────────────────────────────── */

const filingDeadlines: FilingDeadline[] = [
  {
    month: 1,
    name: 'Annual Report Filing (DE)',
    dueDate: '01/31',
    description: 'Delaware annual report and franchise tax due for all entities incorporated in Delaware.',
    entityTypes: ['llc', 'ccorp', 'scorp'],
  },
  {
    month: 1,
    name: 'Beneficial Ownership Report (BOI)',
    dueDate: '01/01',
    description: 'New FinCEN Beneficial Ownership Information report due for newly formed entities.',
    entityTypes: ['llc', 'ccorp', 'scorp', 'partnership'],
  },
  {
    month: 3,
    name: 'S-Corp Election (Form 2553)',
    dueDate: '03/15',
    description: 'Deadline to file Form 2553 for S-Corp election for the current tax year.',
    entityTypes: ['scorp'],
  },
  {
    month: 3,
    name: 'Partnership Return (Form 1065)',
    dueDate: '03/15',
    description: 'Partnership and multi-member LLC tax return filing deadline.',
    entityTypes: ['partnership', 'llc'],
  },
  {
    month: 3,
    name: 'S-Corp Return (Form 1120-S)',
    dueDate: '03/15',
    description: 'S-Corporation income tax return filing deadline.',
    entityTypes: ['scorp'],
  },
  {
    month: 4,
    name: 'C-Corp Return (Form 1120)',
    dueDate: '04/15',
    description: 'C-Corporation income tax return filing deadline.',
    entityTypes: ['ccorp'],
  },
  {
    month: 4,
    name: 'Individual / Sole Prop Return',
    dueDate: '04/15',
    description: 'Individual income tax return deadline including sole proprietors (Schedule C).',
    entityTypes: ['sole_prop'],
  },
  {
    month: 4,
    name: 'Q1 Estimated Tax Payment',
    dueDate: '04/15',
    description: 'First quarter estimated tax payment due for all pass-through entity owners.',
    entityTypes: ['llc', 'scorp', 'partnership', 'sole_prop'],
  },
  {
    month: 5,
    name: 'Annual Statement Filing (CA)',
    dueDate: '05/15',
    description: 'California Statement of Information due for LLCs formed or registered in California.',
    entityTypes: ['llc'],
  },
  {
    month: 6,
    name: 'Q2 Estimated Tax Payment',
    dueDate: '06/15',
    description: 'Second quarter estimated tax payment due for all pass-through entity owners.',
    entityTypes: ['llc', 'scorp', 'partnership', 'sole_prop'],
  },
  {
    month: 7,
    name: 'Delaware Annual Franchise Tax (C-Corp)',
    dueDate: '07/01',
    description: 'Delaware franchise tax payment due for C-Corporations using the authorized shares method.',
    entityTypes: ['ccorp'],
  },
  {
    month: 9,
    name: 'Q3 Estimated Tax Payment',
    dueDate: '09/15',
    description: 'Third quarter estimated tax payment due for all pass-through entity owners.',
    entityTypes: ['llc', 'scorp', 'partnership', 'sole_prop'],
  },
  {
    month: 9,
    name: 'Extended Partnership/S-Corp Return',
    dueDate: '09/15',
    description: 'Extended deadline for partnership (1065) and S-Corp (1120-S) returns.',
    entityTypes: ['partnership', 'scorp'],
  },
  {
    month: 10,
    name: 'Extended C-Corp Return',
    dueDate: '10/15',
    description: 'Extended deadline for C-Corporation (1120) tax return filing.',
    entityTypes: ['ccorp'],
  },
  {
    month: 10,
    name: 'Extended Individual Return',
    dueDate: '10/15',
    description: 'Extended deadline for individual and sole proprietor tax return filing.',
    entityTypes: ['sole_prop'],
  },
  {
    month: 12,
    name: 'Year-End Compliance Review',
    dueDate: '12/31',
    description: 'Annual review of corporate minutes, operating agreements, and compliance documentation.',
    entityTypes: ['llc', 'ccorp', 'scorp', 'partnership'],
  },
  {
    month: 1,
    name: 'Q4 Estimated Tax Payment',
    dueDate: '01/15',
    description: 'Fourth quarter estimated tax payment due for all pass-through entity owners.',
    entityTypes: ['llc', 'scorp', 'partnership', 'sole_prop'],
  },
];

/* ─── Jurisdiction Coverage Data ─────────────────────────────────────────── */

interface JurisdictionEntry {
  state: string;
  services: string[];
}

const jurisdictions: JurisdictionEntry[] = [
  { state: 'Delaware', services: ['Formation', 'Annual Report', 'Franchise Tax', 'Registered Agent'] },
  { state: 'California', services: ['Formation', 'Statement of Information', 'Franchise Tax', 'Foreign Qualification'] },
  { state: 'New York', services: ['Formation', 'Biennial Statement', 'Publication Requirement', 'Foreign Qualification'] },
  { state: 'Texas', services: ['Formation', 'Franchise Tax Report', 'Registered Agent', 'Foreign Qualification'] },
  { state: 'Florida', services: ['Formation', 'Annual Report', 'Registered Agent', 'Foreign Qualification'] },
  { state: 'Wyoming', services: ['Formation', 'Annual Report', 'Registered Agent', 'Privacy Protection'] },
  { state: 'Nevada', services: ['Formation', 'Annual List', 'Business License', 'Registered Agent'] },
  { state: 'Washington', services: ['Formation', 'Annual Report', 'B&O Tax Registration', 'Foreign Qualification'] },
  { state: 'Illinois', services: ['Formation', 'Annual Report', 'Registered Agent', 'Foreign Qualification'] },
  { state: 'Georgia', services: ['Formation', 'Annual Registration', 'Registered Agent', 'Foreign Qualification'] },
  { state: 'New Jersey', services: ['Formation', 'Annual Report', 'Registered Agent', 'Foreign Qualification'] },
  { state: 'Massachusetts', services: ['Formation', 'Annual Report', 'Registered Agent', 'Foreign Qualification'] },
];

/* ─── Service Scope Data ─────────────────────────────────────────────────── */

const serviceScope = [
  {
    title: 'Entity Formation',
    description: 'LLC, S-Corp, C-Corp, and partnership formation in any US state with operating agreements and EIN registration.',
    icon: 'building',
  },
  {
    title: 'Registered Agent Services',
    description: 'Nationwide registered agent coverage ensuring you never miss a legal notice or state correspondence.',
    icon: 'shield',
  },
  {
    title: 'State Compliance Filings',
    description: 'Annual reports, franchise tax filings, and statements of information filed on time, every time.',
    icon: 'document',
  },
  {
    title: 'Foreign Qualification',
    description: 'Register your entity to do business in additional states with proper authority and compliance.',
    icon: 'globe',
  },
  {
    title: 'Corporate Governance',
    description: 'Maintain corporate minutes, resolutions, and operating agreement amendments per state requirements.',
    icon: 'clipboard',
  },
  {
    title: 'Dissolution & Conversion',
    description: 'Properly dissolve entities or convert between entity types while maintaining compliance.',
    icon: 'switch',
  },
];

/* ─── Icon Component ─────────────────────────────────────────────────────── */

function ScopeIcon({ type }: { type: string }) {
  const iconClass = 'w-6 h-6 text-accent';

  switch (type) {
    case 'building':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      );
    case 'shield':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      );
    case 'document':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      );
    case 'globe':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      );
    case 'clipboard':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
        </svg>
      );
    case 'switch':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export function EntityContent() {
  return (
    <>
      {/* Hero / Service Scope Section */}
      <Section padding="lg" ariaLabel="Entity and compliance service scope">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal animation="fade-up">
            <AnimatedHeadline
              text="Entity & Compliance"
              as="h1"
              animation="fade-up"
              className="text-4xl md:text-5xl font-bold font-display text-ink"
            />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <p className="mt-6 text-lg text-ink/70 font-interface leading-relaxed">
              From entity formation to ongoing state filings, we handle the full lifecycle of
              business compliance. Stay structured, stay compliant, and never miss a deadline
              across any jurisdiction.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={300}>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-ink/60">
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                All 50 States
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Never Miss a Filing
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
                All Entity Types
              </span>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* Service Scope Grid */}
      <Section padding="lg" ariaLabel="Services offered">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-ink text-center mb-4">
              What We Handle
            </h2>
            <p className="text-center text-ink/60 font-interface mb-10">
              Comprehensive entity and compliance services for every stage of your business.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {serviceScope.map((service, index) => (
              <ScrollReveal
                key={service.title}
                animation="fade-up"
                delay={index * 100}
              >
                <Card variant="elevated" className="h-full flex flex-col p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10">
                      <ScopeIcon type={service.icon} />
                    </div>
                    <h3 className="text-base font-semibold font-display text-ink">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm text-ink/70 font-interface leading-relaxed">
                    {service.description}
                  </p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Jurisdiction Coverage Section */}
      <Section padding="lg" ariaLabel="Jurisdiction coverage">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-ink text-center mb-4">
              Jurisdiction Coverage
            </h2>
            <p className="text-center text-ink/60 font-interface mb-10">
              We serve businesses across key US states with formation, compliance, and registered agent services.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jurisdictions.map((jurisdiction, index) => (
              <ScrollReveal
                key={jurisdiction.state}
                animation="fade-up"
                delay={index * 60}
              >
                <Card variant="default" className="p-4 h-full">
                  <h3 className="text-sm font-semibold font-display text-ink mb-2 flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-brass flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {jurisdiction.state}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {jurisdiction.services.map((service) => (
                      <span
                        key={service}
                        className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium bg-accent/8 text-accent/80 border border-accent/10"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Filing Calendar Section */}
      <Section padding="lg" ariaLabel="Filing calendar">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-ink text-center mb-4">
              Filing Calendar
            </h2>
            <p className="text-center text-ink/60 font-interface mb-10">
              Click any month to view filing deadlines and compliance obligations. We track
              and file everything on your behalf.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={100}>
            <FilingCalendar deadlines={filingDeadlines} />
          </ScrollReveal>
        </div>
      </Section>

      {/* CTA Section */}
      <CtaSection
        headline="Stay Compliant, Stay Protected"
        description="Get a free compliance audit. We'll review your entity structure, identify gaps in your filings, and build a plan to keep you on track across every jurisdiction."
        buttonText="Book a Free Compliance Audit"
        buttonHref="/book?service=entity"
      />
    </>
  );
}

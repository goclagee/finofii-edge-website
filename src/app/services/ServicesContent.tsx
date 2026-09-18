'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Section } from '@/components/design-system/Section';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

/** Service capability card data */
interface ServiceCapability {
  id: string;
  title: string;
  href: string;
  icon: React.ReactNode;
  scope: string;
}

const services: ServiceCapability[] = [
  {
    id: 'bookkeeping',
    title: 'Bookkeeping & Accounting',
    href: '/services/bookkeeping',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect x="4" y="6" width="32" height="28" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M4 14h32M14 14v20M26 14v20" stroke="currentColor" strokeWidth="2" />
        <circle cx="9" cy="10" r="1.5" fill="currentColor" />
      </svg>
    ),
    scope:
      'Full-cycle monthly bookkeeping, bank reconciliation and month-end close delivered within 5 business days. Your books stay audit-ready year-round.',
  },
  {
    id: 'dashboards',
    title: 'Visual MIS & Dashboards',
    href: '/services/dashboards',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M10 28V18M16 28V14M22 28V20M28 28V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    scope:
      'Custom financial dashboards with real-time KPIs, margin analysis and cash-flow visualizations delivered monthly.',
  },
  {
    id: 'cfo',
    title: 'Virtual CFO & Advisory',
    href: '/services/cfo',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="14" r="6" stroke="currentColor" strokeWidth="2" />
        <path d="M10 34c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M28 10l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    scope:
      'Strategic financial guidance including budgeting, forecasting, fundraise prep and board-ready reporting from a dedicated CFO.',
  },
  {
    id: 'entity',
    title: 'Entity & Compliance',
    href: '/services/entity',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M20 4l14 8v16l-14 8L6 28V12l14-8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M20 4v32M6 12l14 8 14-8" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    scope:
      'End-to-end entity formation, registered agent services, annual compliance filings and multi-state jurisdiction management.',
  },
];

/** Comparison matrix data: deliverable rows with check/cross per service */
interface DeliverableRow {
  deliverable: string;
  bookkeeping: boolean;
  dashboards: boolean;
  cfo: boolean;
  entity: boolean;
}

const comparisonMatrix: DeliverableRow[] = [
  { deliverable: 'Monthly Reconciliation', bookkeeping: true, dashboards: false, cfo: false, entity: false },
  { deliverable: 'Month-End Close', bookkeeping: true, dashboards: false, cfo: false, entity: false },
  { deliverable: 'Accounts Payable/Receivable', bookkeeping: true, dashboards: false, cfo: false, entity: false },
  { deliverable: 'Custom KPI Dashboards', bookkeeping: false, dashboards: true, cfo: true, entity: false },
  { deliverable: 'Cash Flow Reporting', bookkeeping: false, dashboards: true, cfo: true, entity: false },
  { deliverable: 'Margin & Revenue Analysis', bookkeeping: false, dashboards: true, cfo: true, entity: false },
  { deliverable: 'Budget & Forecast Models', bookkeeping: false, dashboards: false, cfo: true, entity: false },
  { deliverable: 'Fundraise Financial Pack', bookkeeping: false, dashboards: false, cfo: true, entity: false },
  { deliverable: 'Board Deck Preparation', bookkeeping: false, dashboards: false, cfo: true, entity: false },
  { deliverable: 'Entity Formation', bookkeeping: false, dashboards: false, cfo: false, entity: true },
  { deliverable: 'Annual Compliance Filings', bookkeeping: false, dashboards: false, cfo: false, entity: true },
  { deliverable: 'Multi-State Registration', bookkeeping: false, dashboards: false, cfo: false, entity: true },
];

/** Checkmark icon */
function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-accent" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

/** Cross icon */
function CrossIcon() {
  return (
    <svg className="w-5 h-5 text-ink/30" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
}

/** Directional arrow component */
function DirectionalArrow() {
  return (
    <span className="inline-flex items-center text-accent transition-transform duration-300 group-hover:translate-x-1 group-focus-within:translate-x-1">
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </span>
  );
}

/** Individual service capability card with hover/focus/tap expand */
function ServiceCard({ service }: { service: ServiceCapability }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Link
      href={service.href}
      className="group relative block rounded-[14px] border border-ink/10 bg-paper p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onFocus={() => setIsExpanded(true)}
      onBlur={() => setIsExpanded(false)}
      onTouchStart={() => setIsExpanded((prev) => !prev)}
      aria-label={`${service.title} — ${service.scope}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 text-accent">{service.icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold font-display text-ink">
            {service.title}
          </h3>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isExpanded ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
            }`}
            aria-hidden={!isExpanded}
          >
            <p className="text-sm text-ink/70 font-interface leading-relaxed">
              {service.scope}
            </p>
            <div className="mt-3 flex items-center gap-1 text-sm font-medium text-accent">
              <span>Learn more</span>
              <DirectionalArrow />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ServicesContent() {
  return (
    <>
      {/* Hero section */}
      <Section padding="lg" ariaLabel="Services overview">
        <div className="text-center max-w-3xl mx-auto">
          <ScrollReveal animation="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-ink">
              Our Services
            </h1>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <p className="mt-4 text-lg text-ink/70 font-interface">
              Four integrated capabilities to keep your finances accurate, visible,
              strategic and compliant — from day-one bookkeeping to board-ready advisory.
            </p>
          </ScrollReveal>
        </div>
      </Section>

      {/* Capability cards */}
      <Section padding="md" ariaLabel="Service capabilities">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ScrollReveal
              key={service.id}
              animation="fade-up"
              delay={index * 100}
            >
              <ServiceCard service={service} />
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* Comparison matrix */}
      <Section padding="lg" ariaLabel="Service comparison matrix">
        <ScrollReveal animation="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-ink text-center mb-8">
            What&rsquo;s Included
          </h2>
        </ScrollReveal>
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" role="table">
              <thead>
                <tr className="border-b-2 border-ink/10">
                  <th className="py-3 pr-4 text-sm font-semibold font-interface text-ink/70 w-1/3">
                    Deliverable
                  </th>
                  <th className="py-3 px-4 text-sm font-semibold font-interface text-ink/70 text-center">
                    Bookkeeping
                  </th>
                  <th className="py-3 px-4 text-sm font-semibold font-interface text-ink/70 text-center">
                    Dashboards
                  </th>
                  <th className="py-3 px-4 text-sm font-semibold font-interface text-ink/70 text-center">
                    CFO
                  </th>
                  <th className="py-3 px-4 text-sm font-semibold font-interface text-ink/70 text-center">
                    Entity
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonMatrix.map((row) => (
                  <tr
                    key={row.deliverable}
                    className="border-b border-ink/5 hover:bg-ink/[0.02] transition-colors"
                  >
                    <td className="py-3 pr-4 text-sm font-interface text-ink">
                      {row.deliverable}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.bookkeeping ? (
                        <span className="inline-flex justify-center">
                          <CheckIcon />
                          <span className="sr-only">Included</span>
                        </span>
                      ) : (
                        <span className="inline-flex justify-center">
                          <CrossIcon />
                          <span className="sr-only">Not included</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.dashboards ? (
                        <span className="inline-flex justify-center">
                          <CheckIcon />
                          <span className="sr-only">Included</span>
                        </span>
                      ) : (
                        <span className="inline-flex justify-center">
                          <CrossIcon />
                          <span className="sr-only">Not included</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.cfo ? (
                        <span className="inline-flex justify-center">
                          <CheckIcon />
                          <span className="sr-only">Included</span>
                        </span>
                      ) : (
                        <span className="inline-flex justify-center">
                          <CrossIcon />
                          <span className="sr-only">Not included</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.entity ? (
                        <span className="inline-flex justify-center">
                          <CheckIcon />
                          <span className="sr-only">Included</span>
                        </span>
                      ) : (
                        <span className="inline-flex justify-center">
                          <CrossIcon />
                          <span className="sr-only">Not included</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </Section>
    </>
  );
}

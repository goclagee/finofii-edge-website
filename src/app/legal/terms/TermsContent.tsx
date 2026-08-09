'use client';

import React from 'react';
import { LegalPageLayout } from '../LegalPageLayout';
import type { TOCItem } from '@/components/layout/StickyTOCSidebar';

const tocItems: TOCItem[] = [
  { id: 'acceptance', label: 'Acceptance of Terms' },
  { id: 'services-description', label: 'Description of Services' },
  { id: 'account-obligations', label: 'Account Obligations' },
  { id: 'service-fees', label: 'Service Fees & Payment' },
  { id: 'intellectual-property', label: 'Intellectual Property' },
  { id: 'confidentiality', label: 'Confidentiality' },
  { id: 'limitation-liability', label: 'Limitation of Liability' },
  { id: 'termination', label: 'Termination' },
  { id: 'governing-law', label: 'Governing Law' },
  { id: 'contact-terms', label: 'Contact' },
];

export function TermsContent() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      lastUpdated="June 15, 2025"
      tocItems={tocItems}
    >
      <section>
        <h2 id="acceptance">Acceptance of Terms</h2>
        <p>
          By accessing or using Finofii Edge services (&ldquo;Services&rdquo;), you agree to be bound
          by these Terms of Service (&ldquo;Terms&rdquo;). These Terms constitute a legally binding
          agreement between you and Finofii Edge LLC (&ldquo;Company&rdquo;). If you do not agree
          to these Terms, you must not use our Services.
        </p>
        <p>
          We reserve the right to update these Terms at any time. Continued use of the Services
          after changes constitutes acceptance of the revised Terms.
        </p>
      </section>

      <section>
        <h2 id="services-description">Description of Services</h2>
        <p>
          Finofii Edge provides accounting, bookkeeping, virtual CFO advisory, entity formation,
          compliance management, and financial dashboard services. Our offerings include:
        </p>
        <ul>
          <li>Monthly bookkeeping and close services with reconciliation.</li>
          <li>Visual MIS dashboards and financial reporting.</li>
          <li>Virtual CFO advisory sessions and strategic planning.</li>
          <li>Entity formation and ongoing compliance filings.</li>
          <li>Interactive sample dashboard access for prospective clients.</li>
        </ul>
        <p>
          Service scope, deliverables, and cadence vary by subscription tier (Essentials, Growth, Scale)
          as described on our Pricing page.
        </p>
      </section>

      <section>
        <h2 id="account-obligations">Account Obligations</h2>
        <p>When using our Services, you agree to:</p>
        <ol>
          <li>Provide accurate and complete information during registration and intake.</li>
          <li>Maintain the security of your account credentials.</li>
          <li>Provide timely access to financial records and systems required for service delivery.</li>
          <li>Notify us promptly of any unauthorized access to your account.</li>
          <li>Comply with all applicable laws and regulations related to your business activities.</li>
        </ol>
        <p>
          You are responsible for all activities conducted under your account. Failure to meet these
          obligations may result in service delays or suspension.
        </p>
      </section>

      <section>
        <h2 id="service-fees">Service Fees &amp; Payment</h2>
        <p>
          Fees for our Services are based on your selected subscription tier and are billed monthly in
          advance. Payment terms include:
        </p>
        <ul>
          <li>Payment is due within 7 days of invoice date.</li>
          <li>Late payments may incur a fee of 1.5% per month on the outstanding balance.</li>
          <li>We accept payment via ACH, wire transfer, and major credit cards.</li>
          <li>Tier upgrades take effect immediately; downgrades take effect at the next billing cycle.</li>
        </ul>
        <table>
          <thead>
            <tr>
              <th>Tier</th>
              <th>Billing Cycle</th>
              <th>Payment Methods</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Essentials</td>
              <td>Monthly</td>
              <td>ACH, Credit Card</td>
            </tr>
            <tr>
              <td>Growth</td>
              <td>Monthly</td>
              <td>ACH, Credit Card, Wire</td>
            </tr>
            <tr>
              <td>Scale</td>
              <td>Monthly / Annual</td>
              <td>ACH, Wire, Credit Card</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2 id="intellectual-property">Intellectual Property</h2>
        <p>
          All deliverables produced for your business (reports, dashboards, filings) are your property
          upon payment. However, the following remain our intellectual property:
        </p>
        <ul>
          <li>Our proprietary methodologies, templates, and processes.</li>
          <li>The Finofii Edge platform, software, and interface designs.</li>
          <li>Aggregate, anonymized insights derived from service delivery.</li>
        </ul>
        <p>
          You grant us a limited license to use your data solely for the purpose of delivering the
          contracted Services.
        </p>
      </section>

      <section>
        <h2 id="confidentiality">Confidentiality</h2>
        <p>
          Both parties agree to maintain the confidentiality of proprietary information shared during
          the service relationship. Confidential information includes financial data, business strategies,
          client lists, and any information marked as confidential.
        </p>
        <p>
          Confidentiality obligations survive termination of these Terms for a period of 3 years.
        </p>
      </section>

      <section>
        <h2 id="limitation-liability">Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Finofii Edge shall not be liable for indirect,
          incidental, consequential, or punitive damages arising from your use of our Services.
          Our total liability shall not exceed the fees paid by you in the 12 months preceding
          the claim.
        </p>
        <p>
          This limitation does not apply to liability arising from gross negligence, fraud, or
          willful misconduct.
        </p>
      </section>

      <section>
        <h2 id="termination">Termination</h2>
        <p>
          Either party may terminate the service agreement with 30 days written notice. Upon termination:
        </p>
        <ul>
          <li>We will complete any in-progress monthly close already underway.</li>
          <li>All outstanding fees become immediately due.</li>
          <li>We will provide data export within 14 business days of termination.</li>
          <li>Access to the platform and dashboards will cease at end of the billing period.</li>
        </ul>
        <p>
          We may suspend or terminate services immediately for non-payment, violation of these Terms,
          or illegal activity.
        </p>
      </section>

      <section>
        <h2 id="governing-law">Governing Law</h2>
        <p>
          These Terms are governed by the laws of the State of Delaware, United States, without
          regard to conflict of law principles. Any disputes shall be resolved through binding
          arbitration in New York, NY, under the rules of the American Arbitration Association.
        </p>
      </section>

      <section>
        <h2 id="contact-terms">Contact</h2>
        <p>
          For questions about these Terms, contact us:
        </p>
        <ul>
          <li>Email: legal@finofii.com</li>
          <li>Address: Finofii Edge LLC, 123 Finance Street, Suite 400, New York, NY 10001</li>
        </ul>
      </section>
    </LegalPageLayout>
  );
}

export default TermsContent;

'use client';

import React from 'react';
import { LegalPageLayout } from '../LegalPageLayout';
import type { TOCItem } from '@/components/layout/StickyTOCSidebar';

const tocItems: TOCItem[] = [
  { id: 'acceptance', label: 'Acceptance Of Terms' },
  { id: 'services-description', label: 'Description Of Services' },
  { id: 'account-obligations', label: 'Account Obligations' },
  { id: 'service-fees', label: 'Service Fees & Payment' },
  { id: 'intellectual-property', label: 'Intellectual Property' },
  { id: 'confidentiality', label: 'Confidentiality' },
  { id: 'limitation-liability', label: 'Limitation Of Liability' },
  { id: 'termination', label: 'Termination' },
  { id: 'governing-law', label: 'Governing Law' },
  { id: 'contact-terms', label: 'Contact' },
];

export function TermsContent() {
  return (
    <LegalPageLayout
      title="Terms Of Service"
      lastUpdated="June 15, 2025"
      tocItems={tocItems}
    >
      <section>
        <h2 id="acceptance">Acceptance Of Terms</h2>
        <p>
          By Accessing Or Using Finofii Edge Services (&ldquo;Services&rdquo;), You Agree To Be Bound
          By These Terms Of Service (&ldquo;Terms&rdquo;). These Terms Constitute A Legally Binding
          Agreement Between You And Finofii Edge LLC (&ldquo;Company&rdquo;). If You Do Not Agree
          To These Terms, You Must Not Use Our Services.
        </p>
        <p>
          We Reserve The Right To Update These Terms At Any Time. Continued Use Of The Services
          After Changes Constitutes Acceptance Of The Revised Terms.
        </p>
      </section>

      <section>
        <h2 id="services-description">Description Of Services</h2>
        <p>
          Finofii Edge Provides Accounting, Bookkeeping, Virtual CFO Advisory, Entity Formation,
          Compliance Management And Financial Dashboard Services. Our Offerings Include:
        </p>
        <ul>
          <li>Monthly Bookkeeping And Close Services With Reconciliation.</li>
          <li>Visual MIS Dashboards And Financial Reporting.</li>
          <li>Virtual CFO Advisory Sessions And Strategic Planning.</li>
          <li>Entity Formation And Ongoing Compliance Filings.</li>
          <li>Interactive Sample Dashboard Access For Prospective Clients.</li>
        </ul>
        <p>
          Service Scope, Deliverables And Cadence Vary By Subscription Tier (Essentials, Growth, Scale)
          As Described On Our Pricing Page.
        </p>
      </section>

      <section>
        <h2 id="account-obligations">Account Obligations</h2>
        <p>When Using Our Services, You Agree To:</p>
        <ol>
          <li>Provide Accurate And Complete Information During Registration And Intake.</li>
          <li>Maintain The Security Of Your Account Credentials.</li>
          <li>Provide Timely Access To Financial Records And Systems Required For Service Delivery.</li>
          <li>Notify Us Promptly Of Any Unauthorized Access To Your Account.</li>
          <li>Comply With All Applicable Laws And Regulations Related To Your Business Activities.</li>
        </ol>
        <p>
          You Are Responsible For All Activities Conducted Under Your Account. Failure To Meet These
          Obligations May Result In Service Delays Or Suspension.
        </p>
      </section>

      <section>
        <h2 id="service-fees">Service Fees &amp; Payment</h2>
        <p>
          Fees For Our Services Are Based On Your Selected Subscription Tier And Are Billed Monthly In
          Advance. Payment Terms Include:
        </p>
        <ul>
          <li>Payment Is Due Within 7 Days Of Invoice Date.</li>
          <li>Late Payments May Incur A Fee Of 1.5% Per Month On The Outstanding Balance.</li>
          <li>We Accept Payment Via ACH, Wire Transfer And Major Credit Cards.</li>
          <li>Tier Upgrades Take Effect Immediately; Downgrades Take Effect At The Next Billing Cycle.</li>
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
          All Deliverables Produced For Your Business (Reports, Dashboards, Filings) Are Your Property
          Upon Payment. However, The Following Remain Our Intellectual Property:
        </p>
        <ul>
          <li>Our Proprietary Methodologies, Templates And Processes.</li>
          <li>The Finofii Edge Platform, Software And Interface Designs.</li>
          <li>Aggregate, Anonymized Insights Derived From Service Delivery.</li>
        </ul>
        <p>
          You Grant Us A Limited License To Use Your Data Solely For The Purpose Of Delivering The
          Contracted Services.
        </p>
      </section>

      <section>
        <h2 id="confidentiality">Confidentiality</h2>
        <p>
          Both Parties Agree To Maintain The Confidentiality Of Proprietary Information Shared During
          The Service Relationship. Confidential Information Includes Financial Data, Business Strategies,
          Client Lists And Any Information Marked As Confidential.
        </p>
        <p>
          Confidentiality Obligations Survive Termination Of These Terms For A Period Of 3 Years.
        </p>
      </section>

      <section>
        <h2 id="limitation-liability">Limitation Of Liability</h2>
        <p>
          To The Maximum Extent Permitted By Law, Finofii Edge Shall Not Be Liable For Indirect,
          Incidental, Consequential Or Punitive Damages Arising From Your Use Of Our Services.
          Our Total Liability Shall Not Exceed The Fees Paid By You In The 12 Months Preceding
          The Claim.
        </p>
        <p>
          This Limitation Does Not Apply To Liability Arising From Gross Negligence, Fraud, Or
          Willful Misconduct.
        </p>
      </section>

      <section>
        <h2 id="termination">Termination</h2>
        <p>
          Either Party May Terminate The Service Agreement With 30 Days Written Notice. Upon Termination:
        </p>
        <ul>
          <li>We Will Complete Any In-Progress Monthly Close Already Underway.</li>
          <li>All Outstanding Fees Become Immediately Due.</li>
          <li>We Will Provide Data Export Within 14 Business Days Of Termination.</li>
          <li>Access To The Platform And Dashboards Will Cease At End Of The Billing Period.</li>
        </ul>
        <p>
          We May Suspend Or Terminate Services Immediately For Non-Payment, Violation Of These Terms,
          Or Illegal Activity.
        </p>
      </section>

      <section>
        <h2 id="governing-law">Governing Law</h2>
        <p>
          These Terms Are Governed By The Laws Of The State Of Delaware, United States, Without
          Regard To Conflict Of Law Principles. Any Disputes Shall Be Resolved Through Binding
          Arbitration In New York, NY, Under The Rules Of The American Arbitration Association.
        </p>
      </section>

      <section>
        <h2 id="contact-terms">Contact</h2>
        <p>
          For Questions About These Terms, Contact Us:
        </p>
        <ul>
          <li>Email: Legal@finofii.com</li>
          <li>Address: Finofii Edge LLC, 123 Finance Street, Suite 400, New York, NY 10001</li>
        </ul>
      </section>
    </LegalPageLayout>
  );
}

export default TermsContent;

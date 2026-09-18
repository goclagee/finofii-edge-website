'use client';

import React from 'react';
import { LegalPageLayout } from '../LegalPageLayout';
import type { TOCItem } from '@/components/layout/StickyTOCSidebar';

const tocItems: TOCItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'current-sub-processors', label: 'Current Sub-Processors' },
  { id: 'infrastructure-providers', label: 'Infrastructure Providers' },
  { id: 'service-tools', label: 'Service & Tooling' },
  { id: 'communication-providers', label: 'Communication Providers' },
  { id: 'change-notification', label: 'Change Notification Process' },
  { id: 'objection-process', label: 'Objection Process' },
];

export function SubProcessorsContent() {
  return (
    <LegalPageLayout
      title="Sub-Processors"
      lastUpdated="June 15, 2025"
      tocItems={tocItems}
    >
      <section>
        <h2 id="overview">Overview</h2>
        <p>
          Finofii Edge uses select third-party sub-processors to deliver our accounting, bookkeeping,
          and advisory services. Each sub-processor has been evaluated for security, privacy compliance,
          and data handling practices before engagement.
        </p>
        <p>
          This page lists all current sub-processors, their purposes and data processing locations.
          We update this page whenever a sub-processor is added or removed.
        </p>
      </section>

      <section>
        <h2 id="current-sub-processors">Current Sub-Processors</h2>
        <p>
          The following table lists all third-party sub-processors currently engaged by Finofii Edge
          to process client data:
        </p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Purpose</th>
              <th>Data Location</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Amazon Web Services (AWS)</td>
              <td>Cloud infrastructure and data hosting</td>
              <td>United States (us-east-1)</td>
            </tr>
            <tr>
              <td>Vercel</td>
              <td>Website hosting and edge delivery</td>
              <td>United States</td>
            </tr>
            <tr>
              <td>QuickBooks Online (Intuit)</td>
              <td>Accounting platform integration</td>
              <td>United States</td>
            </tr>
            <tr>
              <td>Xero</td>
              <td>Accounting platform integration</td>
              <td>United States</td>
            </tr>
            <tr>
              <td>HubSpot</td>
              <td>CRM and client relationship management</td>
              <td>United States</td>
            </tr>
            <tr>
              <td>Cal.com</td>
              <td>Appointment scheduling</td>
              <td>United States, EU</td>
            </tr>
            <tr>
              <td>Stripe</td>
              <td>Payment processing</td>
              <td>United States</td>
            </tr>
            <tr>
              <td>Slack</td>
              <td>Internal team communication and notifications</td>
              <td>United States</td>
            </tr>
            <tr>
              <td>Google Workspace</td>
              <td>Email, documents and collaboration</td>
              <td>United States</td>
            </tr>
            <tr>
              <td>Datadog</td>
              <td>Application monitoring and logging</td>
              <td>United States</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2 id="infrastructure-providers">Infrastructure Providers</h2>
        <p>
          Our core infrastructure is hosted on AWS and Vercel, providing enterprise-grade security,
          redundancy and compliance certifications including SOC 2 Type II and ISO 27001.
        </p>
        <ul>
          <li><strong>AWS:</strong> Primary data storage, compute and backup infrastructure with encryption at rest and in transit.</li>
          <li><strong>Vercel:</strong> Website and application delivery with edge caching for optimal performance.</li>
        </ul>
      </section>

      <section>
        <h2 id="service-tools">Service &amp; Tooling</h2>
        <p>
          The following tools are used in the delivery of our accounting and advisory services:
        </p>
        <ul>
          <li><strong>QuickBooks Online / Xero:</strong> Client accounting platform access for bookkeeping and reconciliation.</li>
          <li><strong>Ramp / Brex / Mercury:</strong> Corporate card and banking integrations for transaction import.</li>
          <li><strong>Stripe:</strong> Secure payment processing for service billing.</li>
          <li><strong>HubSpot:</strong> Client onboarding, communication tracking and service management.</li>
        </ul>
      </section>

      <section>
        <h2 id="communication-providers">Communication Providers</h2>
        <p>
          Internal and client communications use the following sub-processors:
        </p>
        <ul>
          <li><strong>Slack:</strong> Internal team coordination and automated service notifications.</li>
          <li><strong>Google Workspace:</strong> Client email communication and document sharing.</li>
          <li><strong>Cal.com:</strong> Meeting scheduling and calendar management for client consultations.</li>
        </ul>
      </section>

      <section>
        <h2 id="change-notification">Change Notification Process</h2>
        <p>
          We will notify clients at least 30 days before engaging a new sub-processor. Notifications
          are sent via email to the account&apos;s primary contact address and updated on this page.
        </p>
        <p>
          Clients can subscribe to sub-processor update notifications by contacting privacy@finofii.com.
        </p>
      </section>

      <section>
        <h2 id="objection-process">Objection Process</h2>
        <p>
          If you object to a new sub-processor, you must notify us in writing within 14 days of
          receiving the change notification. We will work with you to:
        </p>
        <ol>
          <li>Explain the necessity of the sub-processor and data handling practices.</li>
          <li>Explore alternative sub-processors that may address your concerns.</li>
          <li>Offer additional contractual safeguards where feasible.</li>
          <li>If no resolution is possible, allow termination of the affected services without penalty.</li>
        </ol>
        <p>
          Objections should be sent to: <a href="mailto:legal@finofii.com">legal@finofii.com</a>
        </p>
      </section>
    </LegalPageLayout>
  );
}

export default SubProcessorsContent;

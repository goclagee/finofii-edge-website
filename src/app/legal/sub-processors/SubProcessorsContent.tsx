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
          Finofii Edge Uses Select Third-Party Sub-Processors To Deliver Our Accounting, Bookkeeping,
          And Advisory Services. Each Sub-Processor Has Been Evaluated For Security, Privacy Compliance,
          And Data Handling Practices Before Engagement.
        </p>
        <p>
          This Page Lists All Current Sub-Processors, Their Purposes And Data Processing Locations.
          We Update This Page Whenever A Sub-Processor Is Added Or Removed.
        </p>
      </section>

      <section>
        <h2 id="current-sub-processors">Current Sub-Processors</h2>
        <p>
          The Following Table Lists All Third-Party Sub-Processors Currently Engaged By Finofii Edge
          To Process Client Data:
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
              <td>Cloud Infrastructure And Data Hosting</td>
              <td>United States (Us-East-1)</td>
            </tr>
            <tr>
              <td>Vercel</td>
              <td>Website Hosting And Edge Delivery</td>
              <td>United States</td>
            </tr>
            <tr>
              <td>QuickBooks Online (Intuit)</td>
              <td>Accounting Platform Integration</td>
              <td>United States</td>
            </tr>
            <tr>
              <td>Xero</td>
              <td>Accounting Platform Integration</td>
              <td>United States</td>
            </tr>
            <tr>
              <td>HubSpot</td>
              <td>CRM And Client Relationship Management</td>
              <td>United States</td>
            </tr>
            <tr>
              <td>Cal.com</td>
              <td>Appointment Scheduling</td>
              <td>United States, EU</td>
            </tr>
            <tr>
              <td>Stripe</td>
              <td>Payment Processing</td>
              <td>United States</td>
            </tr>
            <tr>
              <td>Slack</td>
              <td>Internal Team Communication And Notifications</td>
              <td>United States</td>
            </tr>
            <tr>
              <td>Google Workspace</td>
              <td>Email, Documents And Collaboration</td>
              <td>United States</td>
            </tr>
            <tr>
              <td>Datadog</td>
              <td>Application Monitoring And Logging</td>
              <td>United States</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2 id="infrastructure-providers">Infrastructure Providers</h2>
        <p>
          Our Core Infrastructure Is Hosted On AWS And Vercel, Providing Enterprise-Grade Security,
          Redundancy And Compliance Certifications Including SOC 2 Type II And ISO 27001.
        </p>
        <ul>
          <li><strong>AWS:</strong> Primary Data Storage, Compute And Backup Infrastructure With Encryption At Rest And In Transit.</li>
          <li><strong>Vercel:</strong> Website And Application Delivery With Edge Caching For Optimal Performance.</li>
        </ul>
      </section>

      <section>
        <h2 id="service-tools">Service &amp; Tooling</h2>
        <p>
          The Following Tools Are Used In The Delivery Of Our Accounting And Advisory Services:
        </p>
        <ul>
          <li><strong>QuickBooks Online / Xero:</strong> Client Accounting Platform Access For Bookkeeping And Reconciliation.</li>
          <li><strong>Ramp / Brex / Mercury:</strong> Corporate Card And Banking Integrations For Transaction Import.</li>
          <li><strong>Stripe:</strong> Secure Payment Processing For Service Billing.</li>
          <li><strong>HubSpot:</strong> Client Onboarding, Communication Tracking And Service Management.</li>
        </ul>
      </section>

      <section>
        <h2 id="communication-providers">Communication Providers</h2>
        <p>
          Internal And Client Communications Use The Following Sub-Processors:
        </p>
        <ul>
          <li><strong>Slack:</strong> Internal Team Coordination And Automated Service Notifications.</li>
          <li><strong>Google Workspace:</strong> Client Email Communication And Document Sharing.</li>
          <li><strong>Cal.com:</strong> Meeting Scheduling And Calendar Management For Client Consultations.</li>
        </ul>
      </section>

      <section>
        <h2 id="change-notification">Change Notification Process</h2>
        <p>
          We Will Notify Clients At Least 30 Days Before Engaging A New Sub-Processor. Notifications
          Are Sent Via Email To The Account&apos;s Primary Contact Address And Updated On This Page.
        </p>
        <p>
          Clients Can Subscribe To Sub-Processor Update Notifications By Contacting Privacy@finofii.com.
        </p>
      </section>

      <section>
        <h2 id="objection-process">Objection Process</h2>
        <p>
          If You Object To A New Sub-Processor, You Must Notify Us In Writing Within 14 Days Of
          Receiving The Change Notification. We Will Work With You To:
        </p>
        <ol>
          <li>Explain The Necessity Of The Sub-Processor And Data Handling Practices.</li>
          <li>Explore Alternative Sub-Processors That May Address Your Concerns.</li>
          <li>Offer Additional Contractual Safeguards Where Feasible.</li>
          <li>If No Resolution Is Possible, Allow Termination Of The Affected Services Without Penalty.</li>
        </ol>
        <p>
          Objections Should Be Sent To: <a href="mailto:legal@finofii.com">legal@finofii.com</a>
        </p>
      </section>
    </LegalPageLayout>
  );
}

export default SubProcessorsContent;

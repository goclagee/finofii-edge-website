'use client';

import React from 'react';
import { LegalPageLayout } from '../LegalPageLayout';
import type { TOCItem } from '@/components/layout/StickyTOCSidebar';

const tocItems: TOCItem[] = [
  { id: 'dpa-scope', label: 'Scope & Purpose' },
  { id: 'definitions', label: 'Definitions' },
  { id: 'processing-details', label: 'Processing Details' },
  { id: 'obligations-processor', label: 'Obligations of Processor' },
  { id: 'obligations-controller', label: 'Obligations of Controller' },
  { id: 'sub-processing', label: 'Sub-Processing' },
  { id: 'data-transfers', label: 'International Data Transfers' },
  { id: 'security-obligations', label: 'Security Obligations' },
  { id: 'breach-notification', label: 'Breach Notification' },
  { id: 'data-subject-rights', label: 'Data Subject Rights' },
  { id: 'audit-rights', label: 'Audit Rights' },
  { id: 'dpa-termination', label: 'Term & Termination' },
];

export function DPAContent() {
  return (
    <LegalPageLayout
      title="Data Processing Agreement"
      lastUpdated="June 15, 2025"
      tocItems={tocItems}
    >
      <section>
        <h2 id="dpa-scope">Scope &amp; Purpose</h2>
        <p>
          This Data Processing Agreement (&ldquo;DPA&rdquo;) supplements and forms part of the Terms of Service
          between Finofii Edge LLC (&ldquo;Processor&rdquo;) and the Client (&ldquo;Controller&rdquo;).
          It describes the terms under which the Processor processes Personal Data on behalf of the Controller.
        </p>
        <p>
          This DPA applies to all processing of Personal Data conducted by the Processor in connection
          with providing accounting, bookkeeping, virtual CFO and compliance services.
        </p>
      </section>

      <section>
        <h2 id="definitions">Definitions</h2>
        <ul>
          <li><strong>Personal Data:</strong> Any information relating to an identified or identifiable natural person.</li>
          <li><strong>Processing:</strong> Any operation performed on Personal Data, including collection, storage, use and deletion.</li>
          <li><strong>Controller:</strong> The Client who determines the purposes and means of processing Personal Data.</li>
          <li><strong>Processor:</strong> Finofii Edge LLC, which processes Personal Data on behalf of the Controller.</li>
          <li><strong>Sub-Processor:</strong> A third party engaged by the Processor to process Personal Data.</li>
          <li><strong>Data Subject:</strong> The natural person whose Personal Data is processed.</li>
        </ul>
      </section>

      <section>
        <h2 id="processing-details">Processing Details</h2>
        <p>The Processor shall process Personal Data as follows:</p>
        <table>
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Subject Matter</td>
              <td>Provision of accounting, bookkeeping and advisory services</td>
            </tr>
            <tr>
              <td>Duration</td>
              <td>Duration of the service agreement plus retention period</td>
            </tr>
            <tr>
              <td>Nature &amp; Purpose</td>
              <td>Financial record processing, report generation, compliance filing</td>
            </tr>
            <tr>
              <td>Types of Data</td>
              <td>Financial transactions, account details, business entity data, contact information</td>
            </tr>
            <tr>
              <td>Categories of Data Subjects</td>
              <td>Client employees, contractors, vendors and customers whose data appears in financial records</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2 id="obligations-processor">Obligations of Processor</h2>
        <p>The Processor shall:</p>
        <ol>
          <li>Process Personal Data only on documented instructions from the Controller.</li>
          <li>Ensure that personnel authorized to process Personal Data are bound by confidentiality obligations.</li>
          <li>Implement appropriate technical and organizational security measures.</li>
          <li>Engage Sub-Processors only with prior written consent of the Controller.</li>
          <li>Assist the Controller in responding to Data Subject requests.</li>
          <li>Delete or return all Personal Data upon termination of services, at the Controller&apos;s choice.</li>
          <li>Make available to the Controller all information necessary to demonstrate compliance.</li>
        </ol>
      </section>

      <section>
        <h2 id="obligations-controller">Obligations of Controller</h2>
        <p>The Controller shall:</p>
        <ol>
          <li>Ensure a lawful basis for all processing instructions provided to the Processor.</li>
          <li>Provide clear and documented processing instructions.</li>
          <li>Notify the Processor of any changes to processing requirements.</li>
          <li>Ensure compliance with applicable data protection laws.</li>
        </ol>
      </section>

      <section>
        <h2 id="sub-processing">Sub-Processing</h2>
        <p>
          The Processor maintains an up-to-date list of Sub-Processors on our{' '}
          <a href="/legal/sub-processors">Sub-Processors page</a>. The Controller will be notified
          at least 30 days before any new Sub-Processor is engaged.
        </p>
        <p>
          The Controller may object to a new Sub-Processor within 14 days of notification. If no
          alternative can be agreed upon, either party may terminate the affected services.
        </p>
      </section>

      <section>
        <h2 id="data-transfers">International Data Transfers</h2>
        <p>
          The Processor shall not transfer Personal Data outside the United States unless:
        </p>
        <ul>
          <li>The transfer is to a country with an adequate level of data protection.</li>
          <li>Appropriate safeguards are in place (Standard Contractual Clauses or equivalent).</li>
          <li>The Controller has provided prior written authorization.</li>
        </ul>
      </section>

      <section>
        <h2 id="security-obligations">Security Obligations</h2>
        <p>
          The Processor shall implement and maintain security measures including:
        </p>
        <ul>
          <li>Encryption of Personal Data at rest (AES-256) and in transit (TLS 1.3).</li>
          <li>Access controls with multi-factor authentication and role-based permissions.</li>
          <li>Regular vulnerability assessments and penetration testing.</li>
          <li>Employee security training and background checks.</li>
          <li>SOC 2 Type II certification maintained annually.</li>
        </ul>
      </section>

      <section>
        <h2 id="breach-notification">Breach Notification</h2>
        <p>
          In the event of a Personal Data breach, the Processor shall:
        </p>
        <ol>
          <li>Notify the Controller without undue delay and within 72 hours of becoming aware of the breach.</li>
          <li>Provide details including nature of breach, categories of data affected, approximate number of data subjects and remediation steps.</li>
          <li>Cooperate with the Controller in investigating and mitigating the breach.</li>
          <li>Document all breaches including those that do not require notification.</li>
        </ol>
      </section>

      <section>
        <h2 id="data-subject-rights">Data Subject Rights</h2>
        <p>
          The Processor shall assist the Controller in fulfilling Data Subject requests including
          access, rectification, erasure, portability and objection. The Processor shall respond
          to Controller assistance requests within 5 business days.
        </p>
      </section>

      <section>
        <h2 id="audit-rights">Audit Rights</h2>
        <p>
          The Controller may audit the Processor&apos;s compliance with this DPA once per calendar year
          with 30 days advance written notice. Audits shall be conducted during normal business hours
          and shall not unreasonably interfere with the Processor&apos;s operations.
        </p>
        <p>
          The Processor shall make available SOC 2 Type II reports and other relevant compliance
          documentation as an alternative to on-site audits.
        </p>
      </section>

      <section>
        <h2 id="dpa-termination">Term &amp; Termination</h2>
        <p>
          This DPA remains in effect for the duration of the service agreement. Upon termination:
        </p>
        <ul>
          <li>The Processor shall, at the Controller&apos;s choice, return or delete all Personal Data within 30 days.</li>
          <li>The Processor may retain copies required by applicable law, subject to continued confidentiality.</li>
          <li>Obligations under this DPA survive termination to the extent necessary for ongoing data protection.</li>
        </ul>
      </section>
    </LegalPageLayout>
  );
}

export default DPAContent;

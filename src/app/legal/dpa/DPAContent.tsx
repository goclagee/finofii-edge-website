'use client';

import React from 'react';
import { LegalPageLayout } from '../LegalPageLayout';
import type { TOCItem } from '@/components/layout/StickyTOCSidebar';

const tocItems: TOCItem[] = [
  { id: 'dpa-scope', label: 'Scope & Purpose' },
  { id: 'definitions', label: 'Definitions' },
  { id: 'processing-details', label: 'Processing Details' },
  { id: 'obligations-processor', label: 'Obligations Of Processor' },
  { id: 'obligations-controller', label: 'Obligations Of Controller' },
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
          This Data Processing Agreement (&ldquo;DPA&rdquo;) Supplements And Forms Part Of The Terms Of Service
          Between Finofii Edge LLC (&ldquo;Processor&rdquo;) And The Client (&ldquo;Controller&rdquo;).
          It Describes The Terms Under Which The Processor Processes Personal Data On Behalf Of The Controller.
        </p>
        <p>
          This DPA Applies To All Processing Of Personal Data Conducted By The Processor In Connection
          With Providing Accounting, Bookkeeping, Virtual CFO And Compliance Services.
        </p>
      </section>

      <section>
        <h2 id="definitions">Definitions</h2>
        <ul>
          <li><strong>Personal Data:</strong> Any Information Relating To An Identified Or Identifiable Natural Person.</li>
          <li><strong>Processing:</strong> Any Operation Performed On Personal Data, Including Collection, Storage, Use And Deletion.</li>
          <li><strong>Controller:</strong> The Client Who Determines The Purposes And Means Of Processing Personal Data.</li>
          <li><strong>Processor:</strong> Finofii Edge LLC, Which Processes Personal Data On Behalf Of The Controller.</li>
          <li><strong>Sub-Processor:</strong> A Third Party Engaged By The Processor To Process Personal Data.</li>
          <li><strong>Data Subject:</strong> The Natural Person Whose Personal Data Is Processed.</li>
        </ul>
      </section>

      <section>
        <h2 id="processing-details">Processing Details</h2>
        <p>The Processor Shall Process Personal Data As Follows:</p>
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
              <td>Provision Of Accounting, Bookkeeping And Advisory Services</td>
            </tr>
            <tr>
              <td>Duration</td>
              <td>Duration Of The Service Agreement Plus Retention Period</td>
            </tr>
            <tr>
              <td>Nature &amp; Purpose</td>
              <td>Financial Record Processing, Report Generation, Compliance Filing</td>
            </tr>
            <tr>
              <td>Types Of Data</td>
              <td>Financial Transactions, Account Details, Business Entity Data, Contact Information</td>
            </tr>
            <tr>
              <td>Categories Of Data Subjects</td>
              <td>Client Employees, Contractors, Vendors And Customers Whose Data Appears In Financial Records</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2 id="obligations-processor">Obligations Of Processor</h2>
        <p>The Processor Shall:</p>
        <ol>
          <li>Process Personal Data Only On Documented Instructions From The Controller.</li>
          <li>Ensure That Personnel Authorized To Process Personal Data Are Bound By Confidentiality Obligations.</li>
          <li>Implement Appropriate Technical And Organizational Security Measures.</li>
          <li>Engage Sub-Processors Only With Prior Written Consent Of The Controller.</li>
          <li>Assist The Controller In Responding To Data Subject Requests.</li>
          <li>Delete Or Return All Personal Data Upon Termination Of Services, At The Controller&apos;s Choice.</li>
          <li>Make Available To The Controller All Information Necessary To Demonstrate Compliance.</li>
        </ol>
      </section>

      <section>
        <h2 id="obligations-controller">Obligations Of Controller</h2>
        <p>The Controller Shall:</p>
        <ol>
          <li>Ensure A Lawful Basis For All Processing Instructions Provided To The Processor.</li>
          <li>Provide Clear And Documented Processing Instructions.</li>
          <li>Notify The Processor Of Any Changes To Processing Requirements.</li>
          <li>Ensure Compliance With Applicable Data Protection Laws.</li>
        </ol>
      </section>

      <section>
        <h2 id="sub-processing">Sub-Processing</h2>
        <p>
          The Processor Maintains An Up-To-Date List Of Sub-Processors On Our{' '}
          <a href="/legal/sub-processors">Sub-Processors Page</a>. The Controller Will Be Notified
          At Least 30 Days Before Any New Sub-Processor Is Engaged.
        </p>
        <p>
          The Controller May Object To A New Sub-Processor Within 14 Days Of Notification. If No
          Alternative Can Be Agreed Upon, Either Party May Terminate The Affected Services.
        </p>
      </section>

      <section>
        <h2 id="data-transfers">International Data Transfers</h2>
        <p>
          The Processor Shall Not Transfer Personal Data Outside The United States Unless:
        </p>
        <ul>
          <li>The Transfer Is To A Country With An Adequate Level Of Data Protection.</li>
          <li>Appropriate Safeguards Are In Place (Standard Contractual Clauses Or Equivalent).</li>
          <li>The Controller Has Provided Prior Written Authorization.</li>
        </ul>
      </section>

      <section>
        <h2 id="security-obligations">Security Obligations</h2>
        <p>
          The Processor Shall Implement And Maintain Security Measures Including:
        </p>
        <ul>
          <li>Encryption Of Personal Data At Rest (AES-256) And In Transit (TLS 1.3).</li>
          <li>Access Controls With Multi-Factor Authentication And Role-Based Permissions.</li>
          <li>Regular Vulnerability Assessments And Penetration Testing.</li>
          <li>Employee Security Training And Background Checks.</li>
          <li>SOC 2 Type II Certification Maintained Annually.</li>
        </ul>
      </section>

      <section>
        <h2 id="breach-notification">Breach Notification</h2>
        <p>
          In The Event Of A Personal Data Breach, The Processor Shall:
        </p>
        <ol>
          <li>Notify The Controller Without Undue Delay And Within 72 Hours Of Becoming Aware Of The Breach.</li>
          <li>Provide Details Including Nature Of Breach, Categories Of Data Affected, Approximate Number Of Data Subjects And Remediation Steps.</li>
          <li>Cooperate With The Controller In Investigating And Mitigating The Breach.</li>
          <li>Document All Breaches Including Those That Do Not Require Notification.</li>
        </ol>
      </section>

      <section>
        <h2 id="data-subject-rights">Data Subject Rights</h2>
        <p>
          The Processor Shall Assist The Controller In Fulfilling Data Subject Requests Including
          Access, Rectification, Erasure, Portability And Objection. The Processor Shall Respond
          To Controller Assistance Requests Within 5 Business Days.
        </p>
      </section>

      <section>
        <h2 id="audit-rights">Audit Rights</h2>
        <p>
          The Controller May Audit The Processor&apos;s Compliance With This DPA Once Per Calendar Year
          With 30 Days Advance Written Notice. Audits Shall Be Conducted During Normal Business Hours
          And Shall Not Unreasonably Interfere With The Processor&apos;s Operations.
        </p>
        <p>
          The Processor Shall Make Available SOC 2 Type II Reports And Other Relevant Compliance
          Documentation As An Alternative To On-Site Audits.
        </p>
      </section>

      <section>
        <h2 id="dpa-termination">Term &amp; Termination</h2>
        <p>
          This DPA Remains In Effect For The Duration Of The Service Agreement. Upon Termination:
        </p>
        <ul>
          <li>The Processor Shall, At The Controller&apos;s Choice, Return Or Delete All Personal Data Within 30 Days.</li>
          <li>The Processor May Retain Copies Required By Applicable Law, Subject To Continued Confidentiality.</li>
          <li>Obligations Under This DPA Survive Termination To The Extent Necessary For Ongoing Data Protection.</li>
        </ul>
      </section>
    </LegalPageLayout>
  );
}

export default DPAContent;

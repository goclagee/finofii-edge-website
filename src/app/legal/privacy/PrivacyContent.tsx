'use client';

import React from 'react';
import { LegalPageLayout } from '../LegalPageLayout';
import type { TOCItem } from '@/components/layout/StickyTOCSidebar';

const tocItems: TOCItem[] = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'information-we-collect', label: 'Information We Collect' },
  { id: 'how-we-use-information', label: 'How We Use Information' },
  { id: 'data-sharing', label: 'Data Sharing & Disclosure' },
  { id: 'data-retention', label: 'Data Retention' },
  { id: 'security-measures', label: 'Security Measures' },
  { id: 'your-rights', label: 'Your Rights' },
  { id: 'cookies', label: 'Cookies & Tracking' },
  { id: 'changes', label: 'Changes To This Policy' },
  { id: 'contact', label: 'Contact Us' },
];

export function PrivacyContent() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="June 15, 2025"
      tocItems={tocItems}
    >
      <section>
        <h2 id="introduction">Introduction</h2>
        <p>
          Finofiii Edge (&ldquo;We,&rdquo; &ldquo;Our,&rdquo; Or &ldquo;Us&rdquo;) Is Committed To Protecting The Privacy
          Of Our Clients, Website Visitors And Users Of Our Accounting And Bookkeeping Services.
          This Privacy Policy Describes How We Collect, Use, Store And Share Personal Information
          When You Interact With Our Website, Services And Communications.
        </p>
        <p>
          By Using Our Services Or Browsing Our Website At Finofii.com, You Agree To The Practices
          Described In This Policy. If You Do Not Agree, Please Discontinue Use Of Our Services.
        </p>
      </section>

      <section>
        <h2 id="information-we-collect">Information We Collect</h2>
        <p>We Collect Information In The Following Categories:</p>
        <ul>
          <li><strong>Account Information:</strong> Name, Email Address, Company Name, Entity Type And Timezone When You Create An Account Or Submit Our Intake Form.</li>
          <li><strong>Financial Data:</strong> Transaction Records, Bank Statements, Revenue Figures And Other Accounting Data You Provide For Our Bookkeeping Services.</li>
          <li><strong>Usage Data:</strong> Pages Visited, Features Used, Browser Type, Device Information And IP Address Collected Automatically Through Our Website.</li>
          <li><strong>Communication Data:</strong> Emails, Chat Messages And Scheduling Information From Interactions With Our Team.</li>
          <li><strong>Payment Information:</strong> Billing Details Processed Through Our Secure Payment Provider (We Do Not Store Full Card Numbers).</li>
        </ul>
      </section>

      <section>
        <h2 id="how-we-use-information">How We Use Information</h2>
        <p>We Use Your Personal Information For The Following Purposes:</p>
        <ol>
          <li>Providing And Improving Our Accounting, Bookkeeping And Advisory Services.</li>
          <li>Processing And Managing Your Service Subscription And Billing.</li>
          <li>Communicating About Your Account, Service Updates And Scheduling.</li>
          <li>Generating Financial Reports, Dashboards And Compliance Filings On Your Behalf.</li>
          <li>Analyzing Usage Patterns To Improve Our Website And Service Delivery.</li>
          <li>Meeting Our Legal And Regulatory Obligations.</li>
        </ol>
      </section>

      <section>
        <h2 id="data-sharing">Data Sharing &amp; Disclosure</h2>
        <p>
          We Do Not Sell Your Personal Information. We May Share Data With Third Parties Only In
          The Following Circumstances:
        </p>
        <ul>
          <li><strong>Service Providers:</strong> Sub-Processors Who Assist In Delivering Our Services (See Our Sub-Processors Page For The Full List).</li>
          <li><strong>Legal Requirements:</strong> When Required By Law, Regulation Or Legal Process.</li>
          <li><strong>Business Transfers:</strong> In Connection With A Merger, Acquisition Or Sale Of Assets.</li>
          <li><strong>With Your Consent:</strong> When You Explicitly Authorize Sharing With A Specific Third Party.</li>
        </ul>
      </section>

      <section>
        <h2 id="data-retention">Data Retention</h2>
        <p>
          We Retain Your Personal Information For As Long As Necessary To Provide Our Services
          And Comply With Our Legal Obligations. Specifically:
        </p>
        <table>
          <thead>
            <tr>
              <th>Data Category</th>
              <th>Retention Period</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Account Information</td>
              <td>Duration Of Service + 3 Years</td>
            </tr>
            <tr>
              <td>Financial Records</td>
              <td>7 Years (IRS Requirement)</td>
            </tr>
            <tr>
              <td>Usage Analytics</td>
              <td>26 Months</td>
            </tr>
            <tr>
              <td>Communication Logs</td>
              <td>Duration Of Service + 1 Year</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2 id="security-measures">Security Measures</h2>
        <p>
          We Implement Industry-Standard Security Measures To Protect Your Information, Including:
        </p>
        <ul>
          <li>SOC 2 Type II Certified Infrastructure And Processes.</li>
          <li>AES-256 Encryption For Data At Rest And TLS 1.3 For Data In Transit.</li>
          <li>Role-Based Access Controls With Multi-Factor Authentication.</li>
          <li>Regular Security Audits And Penetration Testing.</li>
          <li>Automated Monitoring And Incident Response Procedures.</li>
        </ul>
      </section>

      <section>
        <h2 id="your-rights">Your Rights</h2>
        <p>
          Depending On Your Jurisdiction, You May Have The Following Rights Regarding Your Personal Data:
        </p>
        <ul>
          <li><strong>Access:</strong> Request A Copy Of The Personal Data We Hold About You.</li>
          <li><strong>Correction:</strong> Request Correction Of Inaccurate Or Incomplete Data.</li>
          <li><strong>Deletion:</strong> Request Deletion Of Your Data (Subject To Legal Retention Requirements).</li>
          <li><strong>Portability:</strong> Request Your Data In A Structured, Machine-Readable Format.</li>
          <li><strong>Restriction:</strong> Request Restriction Of Processing In Certain Circumstances.</li>
          <li><strong>Objection:</strong> Object To Processing Based On Legitimate Interests.</li>
        </ul>
        <p>
          To Exercise Any Of These Rights, Contact Us At Privacy@finofii.com.
        </p>
      </section>

      <section>
        <h2 id="cookies">Cookies &amp; Tracking</h2>
        <p>
          We Use Cookies And Similar Technologies To Improve Your Browsing Experience, Analyze
          Site Traffic And Understand Usage Patterns. The Types Of Cookies We Use Include:
        </p>
        <ul>
          <li><strong>Essential Cookies:</strong> Required For Basic Site Functionality (Session Management, Security).</li>
          <li><strong>Analytics Cookies:</strong> Help Us Understand How Visitors Use Our Site (Vercel Analytics, GA4).</li>
          <li><strong>Preference Cookies:</strong> Remember Your Settings And Preferences Across Visits.</li>
        </ul>
        <p>
          You Can Manage Cookie Preferences Through Your Browser Settings. Disabling Certain
          Cookies May Affect Site Functionality.
        </p>
      </section>

      <section>
        <h2 id="changes">Changes To This Policy</h2>
        <p>
          We May Update This Privacy Policy Periodically. We Will Notify You Of Material Changes
          By Updating The &ldquo;Last Updated&rdquo; Date At The Top Of This Page. For Significant
          Changes, We May Also Notify You Via Email.
        </p>
      </section>

      <section>
        <h2 id="contact">Contact Us</h2>
        <p>
          If You Have Questions About This Privacy Policy Or Our Data Practices, Please Contact Us:
        </p>
        <ul>
          <li>Email: Privacy@finofii.com</li>
          <li>Address: Finofiii Edge, 123 Finance Street, Suite 400, New York, NY 10001</li>
        </ul>
      </section>
    </LegalPageLayout>
  );
}

export default PrivacyContent;

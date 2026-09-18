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
  { id: 'changes', label: 'Changes to This Policy' },
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
          Finofii Edge (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting the privacy
          of our clients, website visitors and users of our accounting and bookkeeping services.
          This Privacy Policy describes how we collect, use, store and share personal information
          when you interact with our website, services and communications.
        </p>
        <p>
          By using our services or browsing our website at finofii.com, you agree to the practices
          described in this policy. If you do not agree, please discontinue use of our services.
        </p>
      </section>

      <section>
        <h2 id="information-we-collect">Information We Collect</h2>
        <p>We collect information in the following categories:</p>
        <ul>
          <li><strong>Account Information:</strong> Name, email address, company name, entity type and timezone when you create an account or submit our intake form.</li>
          <li><strong>Financial Data:</strong> Transaction records, bank statements, revenue figures and other accounting data you provide for our bookkeeping services.</li>
          <li><strong>Usage Data:</strong> Pages visited, features used, browser type, device information and IP address collected automatically through our website.</li>
          <li><strong>Communication Data:</strong> Emails, chat messages and scheduling information from interactions with our team.</li>
          <li><strong>Payment Information:</strong> Billing details processed through our secure payment provider (we do not store full card numbers).</li>
        </ul>
      </section>

      <section>
        <h2 id="how-we-use-information">How We Use Information</h2>
        <p>We use your personal information for the following purposes:</p>
        <ol>
          <li>Providing and improving our accounting, bookkeeping and advisory services.</li>
          <li>Processing and managing your service subscription and billing.</li>
          <li>Communicating about your account, service updates and scheduling.</li>
          <li>Generating financial reports, dashboards and compliance filings on your behalf.</li>
          <li>Analyzing usage patterns to improve our website and service delivery.</li>
          <li>Meeting our legal and regulatory obligations.</li>
        </ol>
      </section>

      <section>
        <h2 id="data-sharing">Data Sharing &amp; Disclosure</h2>
        <p>
          We do not sell your personal information. We may share data with third parties only in
          the following circumstances:
        </p>
        <ul>
          <li><strong>Service Providers:</strong> Sub-processors who assist in delivering our services (see our Sub-Processors page for the full list).</li>
          <li><strong>Legal Requirements:</strong> When required by law, regulation or legal process.</li>
          <li><strong>Business Transfers:</strong> In connection with a merger, acquisition or sale of assets.</li>
          <li><strong>With Your Consent:</strong> When you explicitly authorize sharing with a specific third party.</li>
        </ul>
      </section>

      <section>
        <h2 id="data-retention">Data Retention</h2>
        <p>
          We retain your personal information for as long as necessary to provide our services
          and comply with our legal obligations. Specifically:
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
              <td>Account information</td>
              <td>Duration of service + 3 years</td>
            </tr>
            <tr>
              <td>Financial records</td>
              <td>7 years (IRS requirement)</td>
            </tr>
            <tr>
              <td>Usage analytics</td>
              <td>26 months</td>
            </tr>
            <tr>
              <td>Communication logs</td>
              <td>Duration of service + 1 year</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2 id="security-measures">Security Measures</h2>
        <p>
          We implement industry-standard security measures to protect your information, including:
        </p>
        <ul>
          <li>SOC 2 Type II certified infrastructure and processes.</li>
          <li>AES-256 encryption for data at rest and TLS 1.3 for data in transit.</li>
          <li>Role-based access controls with multi-factor authentication.</li>
          <li>Regular security audits and penetration testing.</li>
          <li>Automated monitoring and incident response procedures.</li>
        </ul>
      </section>

      <section>
        <h2 id="your-rights">Your Rights</h2>
        <p>
          Depending on your jurisdiction, you may have the following rights regarding your personal data:
        </p>
        <ul>
          <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
          <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
          <li><strong>Deletion:</strong> Request deletion of your data (subject to legal retention requirements).</li>
          <li><strong>Portability:</strong> Request your data in a structured, machine-readable format.</li>
          <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances.</li>
          <li><strong>Objection:</strong> Object to processing based on legitimate interests.</li>
        </ul>
        <p>
          To exercise any of these rights, contact us at privacy@finofii.com.
        </p>
      </section>

      <section>
        <h2 id="cookies">Cookies &amp; Tracking</h2>
        <p>
          We use cookies and similar technologies to improve your browsing experience, analyze
          site traffic and understand usage patterns. The types of cookies we use include:
        </p>
        <ul>
          <li><strong>Essential Cookies:</strong> Required for basic site functionality (session management, security).</li>
          <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site (Vercel Analytics, GA4).</li>
          <li><strong>Preference Cookies:</strong> Remember your settings and preferences across visits.</li>
        </ul>
        <p>
          You can manage cookie preferences through your browser settings. Disabling certain
          cookies may affect site functionality.
        </p>
      </section>

      <section>
        <h2 id="changes">Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically. We will notify you of material changes
          by updating the &ldquo;Last Updated&rdquo; date at the top of this page. For significant
          changes, we may also notify you via email.
        </p>
      </section>

      <section>
        <h2 id="contact">Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or our data practices, please contact us:
        </p>
        <ul>
          <li>Email: privacy@finofii.com</li>
          <li>Address: Finofii Edge, 123 Finance Street, Suite 400, New York, NY 10001</li>
        </ul>
      </section>
    </LegalPageLayout>
  );
}

export default PrivacyContent;

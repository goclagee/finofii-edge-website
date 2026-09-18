import type { Metadata } from 'next';
import { generateMetadataFromSEO } from '@/lib/seo';
import Link from 'next/link';
import { Section } from '@/components/design-system/Section';

export function generateMetadata(): Metadata {
  return generateMetadataFromSEO({
    title: 'Legal – Finofii Edge',
    description: 'Access our Privacy Policy, Terms of Service, Data Processing Agreement and Sub-Processor list.',
    path: '/legal',
  });
}

const legalPages = [
  {
    title: 'Privacy Policy',
    description: 'How we collect, use and protect your personal information and business data.',
    href: '/legal/privacy',
  },
  {
    title: 'Terms of Service',
    description: 'Terms and conditions governing your use of Finofii Edge services.',
    href: '/legal/terms',
  },
  {
    title: 'Data Processing Agreement',
    description: 'Our data processing responsibilities and commitments for handling your business data.',
    href: '/legal/dpa',
  },
  {
    title: 'Sub-Processors',
    description: 'Complete list of third-party sub-processors used for data processing.',
    href: '/legal/sub-processors',
  },
];

export default function LegalIndexPage() {
  return (
    <Section padding="lg">
      <header className="mb-10">
        <h1 className="font-fraunces text-3xl md:text-4xl font-bold text-ink mb-3">
          Legal
        </h1>
        <p className="text-ink/70 max-w-2xl">
          Review our legal documents covering privacy, terms of service, data processing,
          and our list of sub-processors.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {legalPages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="block p-6 rounded-[14px] border border-ink/10 hover:border-accent/40 hover:shadow-sm transition-all duration-200 no-underline group"
          >
            <h2 className="text-lg font-semibold text-ink group-hover:text-accent transition-colors mb-2">
              {page.title}
            </h2>
            <p className="text-sm text-ink/60 m-0">
              {page.description}
            </p>
          </Link>
        ))}
      </div>
    </Section>
  );
}

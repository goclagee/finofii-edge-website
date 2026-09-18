import type { Metadata } from 'next';
import { generateMetadataFromSEO } from '@/lib/seo';
import Link from 'next/link';
import { Section } from '@/components/design-system/Section';

export function generateMetadata(): Metadata {
  return generateMetadataFromSEO({
    title: 'Legal – Finofiii Edge',
    description: 'Access Our Privacy Policy, Terms Of Service, Data Processing Agreement And Sub-Processor List.',
    path: '/legal',
  });
}

const legalPages = [
  {
    title: 'Privacy Policy',
    description: 'How We Collect, Use And Protect Your Personal Information And Business Data.',
    href: '/legal/privacy',
  },
  {
    title: 'Terms Of Service',
    description: 'Terms And Conditions Governing Your Use Of Finofiii Edge Services.',
    href: '/legal/terms',
  },
  {
    title: 'Data Processing Agreement',
    description: 'Our Data Processing Responsibilities And Commitments For Handling Your Business Data.',
    href: '/legal/dpa',
  },
  {
    title: 'Sub-Processors',
    description: 'Complete List Of Third-Party Sub-Processors Used For Data Processing.',
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
          Review Our Legal Documents Covering Privacy, Terms Of Service, Data Processing,
          And Our List Of Sub-Processors.
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

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal – Finofii Edge',
  description: 'Legal documents including Privacy Policy, Terms of Service, Data Processing Agreement and Sub-Processors.',
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

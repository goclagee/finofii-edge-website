import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal – Finofii Edge',
  description: 'Legal Documents Including Privacy Policy, Terms Of Service, Data Processing Agreement And Sub-Processors.',
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

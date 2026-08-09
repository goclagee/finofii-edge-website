'use client';

import { usePathname } from 'next/navigation';
import { PageTransition } from '@/components/animations/PageTransition';

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

/**
 * Client-side wrapper that provides the current pathname as the route key
 * to the PageTransition animation component. This separation is needed
 * because usePathname() requires a client component boundary.
 */
export function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  const pathname = usePathname();

  return (
    <PageTransition routeKey={pathname} duration={300}>
      {children}
    </PageTransition>
  );
}

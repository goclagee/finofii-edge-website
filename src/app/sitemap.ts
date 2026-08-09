import type { MetadataRoute } from 'next';
import { SITE_URL, PUBLIC_ROUTES } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: getChangeFrequency(route),
    priority: getPriority(route),
  }));
}

function getChangeFrequency(
  route: string
): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' {
  // Dynamic pages with ISR revalidation
  if (route === '/dashboard' || route === '/case-studies') {
    return 'daily';
  }
  // Resource/blog pages update frequently
  if (route === '/resources') {
    return 'daily';
  }
  // Home page and pricing change occasionally
  if (route === '/' || route === '/pricing') {
    return 'weekly';
  }
  // Legal pages rarely change
  if (route.startsWith('/legal')) {
    return 'monthly';
  }
  // All other pages
  return 'weekly';
}

function getPriority(route: string): number {
  if (route === '/') return 1.0;
  if (route === '/book') return 0.9;
  if (route === '/pricing' || route === '/services') return 0.9;
  if (route === '/dashboard') return 0.8;
  if (route.startsWith('/services/')) return 0.8;
  if (route.startsWith('/industries/')) return 0.7;
  if (route === '/case-studies' || route === '/how-it-works') return 0.7;
  if (route === '/about' || route === '/resources') return 0.6;
  if (route === '/security') return 0.6;
  if (route.startsWith('/legal')) return 0.3;
  return 0.5;
}

import { describe, it, expect } from 'vitest';
import sitemap from './sitemap';
import robots from './robots';
import { PUBLIC_ROUTES, SITE_URL } from '@/lib/seo';

describe('sitemap.ts', () => {
  it('returns sitemap entries for all public routes', () => {
    const entries = sitemap();
    expect(entries.length).toBe(PUBLIC_ROUTES.length);
  });

  it('each entry has a valid full URL', () => {
    const entries = sitemap();
    for (const entry of entries) {
      expect(entry.url).toMatch(/^https:\/\/finofii\.com\//);
    }
  });

  it('each entry has a lastModified date', () => {
    const entries = sitemap();
    for (const entry of entries) {
      expect(entry.lastModified).toBeInstanceOf(Date);
    }
  });

  it('each entry has a changeFrequency', () => {
    const validFrequencies = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
    const entries = sitemap();
    for (const entry of entries) {
      expect(validFrequencies).toContain(entry.changeFrequency);
    }
  });

  it('each entry has a priority between 0 and 1', () => {
    const entries = sitemap();
    for (const entry of entries) {
      expect(entry.priority).toBeGreaterThanOrEqual(0);
      expect(entry.priority).toBeLessThanOrEqual(1);
    }
  });

  it('home page has highest priority (1.0)', () => {
    const entries = sitemap();
    const homeEntry = entries.find((e) => e.url === `${SITE_URL}/`);
    expect(homeEntry?.priority).toBe(1.0);
  });

  it('legal pages have lower priority', () => {
    const entries = sitemap();
    const legalEntries = entries.filter((e) => e.url.includes('/legal/'));
    for (const entry of legalEntries) {
      expect(entry.priority).toBeLessThanOrEqual(0.5);
    }
  });

  it('includes all 16+ public page URLs', () => {
    const entries = sitemap();
    expect(entries.length).toBeGreaterThanOrEqual(16);
  });
});

describe('robots.ts', () => {
  it('allows all crawlers access to root', () => {
    const result = robots();
    expect(result.rules).toBeDefined();

    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const mainRule = rules.find((r) => r.userAgent === '*');
    expect(mainRule).toBeDefined();
    expect(mainRule?.allow).toContain('/');
  });

  it('disallows access to /api/ routes', () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const mainRule = rules.find((r) => r.userAgent === '*');
    expect(mainRule?.disallow).toContain('/api/');
  });

  it('includes sitemap URL', () => {
    const result = robots();
    expect(result.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });
});

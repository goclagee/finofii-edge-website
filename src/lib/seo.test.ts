import { describe, it, expect, beforeAll } from 'vitest';
import { generatePageSEO, truncateWithEllipsis } from './seo';

describe('truncateWithEllipsis', () => {
  it('returns empty string for maxLength 0', () => {
    expect(truncateWithEllipsis('hello', 0)).toBe('');
  });

  it('returns text unchanged when within limit', () => {
    expect(truncateWithEllipsis('hello', 10)).toBe('hello');
  });

  it('returns text unchanged when exactly at limit', () => {
    expect(truncateWithEllipsis('hello', 5)).toBe('hello');
  });

  it('truncates and adds ellipsis when over limit', () => {
    const result = truncateWithEllipsis('hello world', 8);
    expect(result).toBe('hello w…');
    expect(result.length).toBe(8);
  });

  it('handles maxLength of 1', () => {
    expect(truncateWithEllipsis('hello', 1)).toBe('…');
  });

  it('handles empty string input', () => {
    expect(truncateWithEllipsis('', 10)).toBe('');
  });

  it('handles unicode characters', () => {
    const result = truncateWithEllipsis('café latte special', 10);
    expect(result.length).toBe(10);
    expect(result).toBe('café latt…');
  });

  it('handles negative maxLength', () => {
    expect(truncateWithEllipsis('hello', -1)).toBe('');
  });

  it('handles single character text at limit 1', () => {
    expect(truncateWithEllipsis('a', 1)).toBe('a');
  });

  it('handles text with only whitespace', () => {
    expect(truncateWithEllipsis('   ', 2)).toBe(' …');
  });
});

describe('generatePageSEO', () => {
  it('generates valid SEO metadata for normal inputs', () => {
    const result = generatePageSEO({
      title: 'Pricing',
      description: 'Compare our pricing tiers.',
      path: '/pricing',
    });

    expect(result.title).toBe('Pricing');
    expect(result.description).toBe('Compare our pricing tiers.');
    expect(result.ogTitle).toBe('Pricing');
    expect(result.ogDescription).toBe('Compare our pricing tiers.');
    expect(result.ogUrl).toContain('/pricing');
    expect(result.canonical).toContain('/pricing');
    expect(result.ogImage).toBeTruthy();
  });

  it('truncates title to 60 characters', () => {
    const longTitle = 'A'.repeat(80);
    const result = generatePageSEO({
      title: longTitle,
      description: 'Short desc',
      path: '/test',
    });

    expect(result.title.length).toBeLessThanOrEqual(60);
    expect(result.title.endsWith('…')).toBe(true);
  });

  it('truncates description to 160 characters', () => {
    const longDesc = 'B'.repeat(200);
    const result = generatePageSEO({
      title: 'Title',
      description: longDesc,
      path: '/test',
    });

    expect(result.description.length).toBeLessThanOrEqual(160);
    expect(result.description.endsWith('…')).toBe(true);
  });

  it('falls back to defaults when title is empty', () => {
    const result = generatePageSEO({
      title: '',
      description: 'Some description',
      path: '/page',
    });

    expect(result.title).toBeTruthy();
    expect(result.title.length).toBeGreaterThan(0);
    expect(result.title.length).toBeLessThanOrEqual(60);
  });

  it('falls back to defaults when description is empty', () => {
    const result = generatePageSEO({
      title: 'Some title',
      description: '',
      path: '/page',
    });

    expect(result.description).toBeTruthy();
    expect(result.description.length).toBeGreaterThan(0);
    expect(result.description.length).toBeLessThanOrEqual(160);
  });

  it('uses provided ogImage when given', () => {
    const result = generatePageSEO({
      title: 'Test',
      description: 'Test desc',
      path: '/test',
      ogImage: 'https://example.com/image.png',
    });

    expect(result.ogImage).toBe('https://example.com/image.png');
  });

  it('falls back to default OG image when not provided', () => {
    const result = generatePageSEO({
      title: 'Test',
      description: 'Test desc',
      path: '/test',
    });

    expect(result.ogImage).toBeTruthy();
    expect(result.ogImage.length).toBeGreaterThan(0);
  });

  it('ensures all OG fields are non-empty', () => {
    const result = generatePageSEO({
      title: '',
      description: '',
      path: '/',
    });

    expect(result.ogTitle.length).toBeGreaterThan(0);
    expect(result.ogDescription.length).toBeGreaterThan(0);
    expect(result.ogImage.length).toBeGreaterThan(0);
    expect(result.ogUrl.length).toBeGreaterThan(0);
  });
});

describe('generateMetadataFromSEO', () => {
  // Import dynamically to avoid issues with Metadata type in test environment
  let generateMetadataFromSEO: typeof import('./seo').generateMetadataFromSEO;

  beforeAll(async () => {
    const mod = await import('./seo');
    generateMetadataFromSEO = mod.generateMetadataFromSEO;
  });

  it('produces a valid Metadata object with title and description', () => {
    const result = generateMetadataFromSEO({
      title: 'Test Page – Finofii Edge',
      description: 'A test page description.',
      path: '/test',
    });

    expect(result.title).toBe('Test Page – Finofii Edge');
    expect(result.description).toBe('A test page description.');
  });

  it('includes OpenGraph metadata', () => {
    const result = generateMetadataFromSEO({
      title: 'OG Test',
      description: 'OG description.',
      path: '/og-test',
    });

    expect(result.openGraph).toBeDefined();
    expect((result.openGraph as any).title).toBe('OG Test');
    expect((result.openGraph as any).description).toBe('OG description.');
    expect((result.openGraph as any).url).toContain('/og-test');
    expect((result.openGraph as any).siteName).toBe('Finofii Edge');
    expect((result.openGraph as any).images).toHaveLength(1);
  });

  it('includes Twitter card metadata', () => {
    const result = generateMetadataFromSEO({
      title: 'Twitter Test',
      description: 'Twitter description.',
      path: '/twitter',
    });

    expect(result.twitter).toBeDefined();
    expect((result.twitter as any).card).toBe('summary_large_image');
    expect((result.twitter as any).title).toBe('Twitter Test');
  });

  it('includes canonical URL in alternates', () => {
    const result = generateMetadataFromSEO({
      title: 'Canonical Test',
      description: 'Test.',
      path: '/canonical-test',
    });

    expect(result.alternates?.canonical).toContain('/canonical-test');
  });

  it('falls back to defaults when inputs are empty', () => {
    const result = generateMetadataFromSEO({
      title: '',
      description: '',
      path: '/',
    });

    expect(result.title).toBeTruthy();
    expect((result.title as string).length).toBeGreaterThan(0);
    expect(result.description).toBeTruthy();
    expect((result.description as string).length).toBeGreaterThan(0);
  });

  it('respects character limits from generatePageSEO', () => {
    const result = generateMetadataFromSEO({
      title: 'A'.repeat(100),
      description: 'B'.repeat(300),
      path: '/long',
    });

    expect((result.title as string).length).toBeLessThanOrEqual(60);
    expect((result.description as string).length).toBeLessThanOrEqual(160);
  });
});

describe('PAGE_SEO_DATA', () => {
  let PAGE_SEO_DATA: typeof import('./seo').PAGE_SEO_DATA;
  let PUBLIC_ROUTES: typeof import('./seo').PUBLIC_ROUTES;

  beforeAll(async () => {
    const mod = await import('./seo');
    PAGE_SEO_DATA = mod.PAGE_SEO_DATA;
    PUBLIC_ROUTES = mod.PUBLIC_ROUTES;
  });

  it('has SEO data for all public routes', () => {
    for (const route of PUBLIC_ROUTES) {
      expect(PAGE_SEO_DATA[route]).toBeDefined();
      expect(PAGE_SEO_DATA[route].title.length).toBeGreaterThan(0);
      expect(PAGE_SEO_DATA[route].description.length).toBeGreaterThan(0);
    }
  });

  it('all titles are within 60 character limit', () => {
    for (const route of PUBLIC_ROUTES) {
      expect(PAGE_SEO_DATA[route].title.length).toBeLessThanOrEqual(60);
    }
  });

  it('all descriptions are within 160 character limit', () => {
    for (const route of PUBLIC_ROUTES) {
      expect(PAGE_SEO_DATA[route].description.length).toBeLessThanOrEqual(160);
    }
  });

  it('includes all 16+ public page URLs', () => {
    expect(PUBLIC_ROUTES.length).toBeGreaterThanOrEqual(16);
  });

  it('each route has a unique title', () => {
    const titles = PUBLIC_ROUTES.map((r) => PAGE_SEO_DATA[r].title);
    const uniqueTitles = new Set(titles);
    expect(uniqueTitles.size).toBe(titles.length);
  });

  it('each route has a unique description', () => {
    const descriptions = PUBLIC_ROUTES.map((r) => PAGE_SEO_DATA[r].description);
    const uniqueDescriptions = new Set(descriptions);
    expect(uniqueDescriptions.size).toBe(descriptions.length);
  });
});

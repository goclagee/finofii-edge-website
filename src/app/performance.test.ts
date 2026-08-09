/**
 * Performance configuration tests.
 * Verifies that static generation, ISR, lazy-loading, and responsive design
 * configurations are properly set up across the application.
 *
 * Requirements: 20.3, 20.4, 20.5, 21.1, 21.3, 21.5
 */
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const SRC = path.resolve(__dirname, '..');
const ROOT = path.resolve(SRC, '..');

describe('Static Generation and ISR Configuration', () => {
  it('Dashboard page exports revalidate = 60 for ISR', () => {
    const content = fs.readFileSync(
      path.join(SRC, 'app/dashboard/page.tsx'),
      'utf-8'
    );
    expect(content).toContain('export const revalidate = 60');
  });

  it('Case Studies page exports revalidate = 60 for ISR', () => {
    const content = fs.readFileSync(
      path.join(SRC, 'app/case-studies/page.tsx'),
      'utf-8'
    );
    expect(content).toContain('export const revalidate = 60');
  });

  it('Home page does NOT export revalidate (static by default)', () => {
    const content = fs.readFileSync(
      path.join(SRC, 'app/page.tsx'),
      'utf-8'
    );
    expect(content).not.toContain('export const revalidate');
  });

  it('Services page does NOT export revalidate (static by default)', () => {
    const content = fs.readFileSync(
      path.join(SRC, 'app/services/page.tsx'),
      'utf-8'
    );
    expect(content).not.toContain('export const revalidate');
  });

  it('Pricing page does NOT export revalidate (static by default)', () => {
    const content = fs.readFileSync(
      path.join(SRC, 'app/pricing/page.tsx'),
      'utf-8'
    );
    expect(content).not.toContain('export const revalidate');
  });
});

describe('Lazy-loading Configuration', () => {
  it('Home page uses dynamic imports for below-fold sections', () => {
    const content = fs.readFileSync(
      path.join(SRC, 'app/page.tsx'),
      'utf-8'
    );
    expect(content).toContain("import dynamic from 'next/dynamic'");
    expect(content).toContain('SocialProofSection');
    expect(content).toContain('ServicesOverviewSection');
    expect(content).toContain('ComplianceTrustBar');
    expect(content).toContain('FinalCTASection');
  });

  it('Dashboard page uses dynamic imports for chart components', () => {
    const content = fs.readFileSync(
      path.join(SRC, 'app/dashboard/DashboardClient.tsx'),
      'utf-8'
    );
    expect(content).toContain("import dynamic from 'next/dynamic'");
    expect(content).toContain('FinancialLineChart');
    expect(content).toContain('FinancialBarChart');
    expect(content).toContain('MetricCard');
  });

  it('Industry pages use dynamic imports for chart components', () => {
    const pages = [
      'app/industries/dtc/DTCContent.tsx',
      'app/industries/agencies/AgenciesContent.tsx',
      'app/industries/saas/SaaSContent.tsx',
      'app/industries/cpa/CPAContent.tsx',
    ];

    for (const page of pages) {
      const content = fs.readFileSync(path.join(SRC, page), 'utf-8');
      expect(content).toContain("import dynamic from 'next/dynamic'");
      expect(content).toContain('MetricCard');
    }
  });
});

describe('Bundle Analyzer Configuration', () => {
  it('@next/bundle-analyzer is configured in next.config.mjs', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'next.config.mjs'),
      'utf-8'
    );
    expect(content).toContain("import bundleAnalyzer from '@next/bundle-analyzer'");
    expect(content).toContain("enabled: process.env.ANALYZE === 'true'");
  });

  it('package.json has analyze script', () => {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8')
    );
    expect(pkg.scripts.analyze).toBe('ANALYZE=true next build');
  });

  it('@next/bundle-analyzer is installed as devDependency', () => {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8')
    );
    expect(pkg.devDependencies['@next/bundle-analyzer']).toBeDefined();
  });
});

describe('next/image Configuration', () => {
  it('next.config.mjs configures image formats (avif, webp)', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'next.config.mjs'),
      'utf-8'
    );
    expect(content).toContain("'image/avif'");
    expect(content).toContain("'image/webp'");
  });

  it('next.config.mjs configures responsive deviceSizes', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'next.config.mjs'),
      'utf-8'
    );
    expect(content).toContain('320');
    expect(content).toContain('768');
    expect(content).toContain('1024');
    expect(content).toContain('1440');
    expect(content).toContain('2560');
  });

  it('OptimizedImage component uses blur placeholder by default', () => {
    const content = fs.readFileSync(
      path.join(SRC, 'components/OptimizedImage.tsx'),
      'utf-8'
    );
    expect(content).toContain("placeholder: 'blur'");
    expect(content).toContain('blurDataURL');
    expect(content).toContain("loading = 'lazy'");
  });

  it('OptimizedImage uses responsive sizes prop', () => {
    const content = fs.readFileSync(
      path.join(SRC, 'components/OptimizedImage.tsx'),
      'utf-8'
    );
    expect(content).toContain('sizes');
    expect(content).toContain('max-width');
  });
});

describe('Responsive Type Scale', () => {
  it('globals.css uses clamp for body text (16px min, 20px max)', () => {
    const content = fs.readFileSync(
      path.join(SRC, 'styles/globals.css'),
      'utf-8'
    );
    // text-body: clamp(1rem, ..., 1.25rem) => 16px to 20px
    expect(content).toMatch(/--text-body:\s*clamp\(1rem/);
    expect(content).toContain('1.25rem');
  });

  it('globals.css configures line-height >= 1.4 for headings', () => {
    const content = fs.readFileSync(
      path.join(SRC, 'styles/globals.css'),
      'utf-8'
    );
    // Headings should have line-height: 1.4
    expect(content).toContain('line-height: 1.4');
  });

  it('globals.css configures line-height >= 1.4 for body (1.5)', () => {
    const content = fs.readFileSync(
      path.join(SRC, 'styles/globals.css'),
      'utf-8'
    );
    expect(content).toContain('line-height: 1.5');
  });
});

describe('No Horizontal Overflow (320px–2560px)', () => {
  it('html has overflow-x: hidden', () => {
    const content = fs.readFileSync(
      path.join(SRC, 'styles/globals.css'),
      'utf-8'
    );
    // Match html block containing overflow-x: hidden
    expect(content).toMatch(/html\s*\{[^}]*overflow-x:\s*hidden/s);
  });

  it('body has overflow-x: hidden and max-width: 100vw', () => {
    const content = fs.readFileSync(
      path.join(SRC, 'styles/globals.css'),
      'utf-8'
    );
    expect(content).toMatch(/body\s*\{[^}]*overflow-x:\s*hidden/s);
    expect(content).toMatch(/body\s*\{[^}]*max-width:\s*100vw/s);
  });

  it('container-content has overflow-x: hidden', () => {
    const content = fs.readFileSync(
      path.join(SRC, 'styles/globals.css'),
      'utf-8'
    );
    expect(content).toMatch(/\.container-content\s*\{[^}]*overflow-x:\s*hidden/s);
  });
});

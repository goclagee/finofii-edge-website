import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';

// Mock hooks
vi.mock('@/hooks/useReducedMotion', () => ({
  useReducedMotion: vi.fn(() => true),
}));

vi.mock('@/hooks/useMediaQuery', () => ({
  useMediaQuery: vi.fn(() => true),
}));

vi.mock('@/hooks/useIntersectionObserver', () => ({
  useIntersectionObserver: vi.fn(() => ({
    ref: { current: null },
    isIntersecting: true,
    entry: null,
  })),
}));

vi.mock('@/hooks/useScrollReveal', () => ({
  useScrollReveal: vi.fn(() => ({
    ref: { current: null },
    isRevealed: true,
    style: { opacity: 1, transform: 'none' },
  })),
}));

// Mock next/image
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img {...(props as React.ImgHTMLAttributes<HTMLImageElement>)} />
  ),
}));

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { FilterBar } from './FilterBar';
import { CaseStudyCard } from './CaseStudyCard';
import { Lightbox } from './Lightbox';
import { TeamMemberCard } from './TeamMemberCard';
import { StickyTOCSidebar } from '@/components/layout/StickyTOCSidebar';

const mockedUseMediaQuery = vi.mocked(useMediaQuery);

// ============================================================
// FilterBar Tests
// ============================================================
describe('FilterBar', () => {
  const dimensions = [
    {
      key: 'industry',
      label: 'Industry',
      options: [
        { value: 'dtc', label: 'DTC' },
        { value: 'agency', label: 'Agency' },
        { value: 'saas', label: 'SaaS' },
      ],
      multiple: true,
    },
    {
      key: 'service',
      label: 'Service',
      options: [
        { value: 'bookkeeping', label: 'Bookkeeping' },
        { value: 'mis', label: 'MIS' },
      ],
      multiple: false,
    },
  ];

  it('renders all filter dimensions and options', () => {
    const onFilterChange = vi.fn();
    const onReset = vi.fn();

    render(
      <FilterBar
        dimensions={dimensions}
        activeFilters={{}}
        onFilterChange={onFilterChange}
        onReset={onReset}
      />
    );

    expect(screen.getByText('Industry:')).toBeInTheDocument();
    expect(screen.getByText('Service:')).toBeInTheDocument();
    expect(screen.getByText('DTC')).toBeInTheDocument();
    expect(screen.getByText('Agency')).toBeInTheDocument();
    expect(screen.getByText('SaaS')).toBeInTheDocument();
    expect(screen.getByText('Bookkeeping')).toBeInTheDocument();
    expect(screen.getByText('MIS')).toBeInTheDocument();
  });

  it('calls onFilterChange when a filter option is clicked', () => {
    const onFilterChange = vi.fn();
    const onReset = vi.fn();

    render(
      <FilterBar
        dimensions={dimensions}
        activeFilters={{}}
        onFilterChange={onFilterChange}
        onReset={onReset}
      />
    );

    fireEvent.click(screen.getByText('DTC'));
    expect(onFilterChange).toHaveBeenCalledWith('industry', ['dtc']);
  });

  it('toggles off a previously active filter', () => {
    const onFilterChange = vi.fn();
    const onReset = vi.fn();

    render(
      <FilterBar
        dimensions={dimensions}
        activeFilters={{ industry: ['dtc'] }}
        onFilterChange={onFilterChange}
        onReset={onReset}
      />
    );

    // Click DTC again to deselect
    fireEvent.click(screen.getByText('DTC'));
    expect(onFilterChange).toHaveBeenCalledWith('industry', []);
  });

  it('supports multi-select on dimensions with multiple=true', () => {
    const onFilterChange = vi.fn();
    const onReset = vi.fn();

    render(
      <FilterBar
        dimensions={dimensions}
        activeFilters={{ industry: ['dtc'] }}
        onFilterChange={onFilterChange}
        onReset={onReset}
      />
    );

    // Add Agency to existing DTC selection
    fireEvent.click(screen.getByText('Agency'));
    expect(onFilterChange).toHaveBeenCalledWith('industry', ['dtc', 'agency']);
  });

  it('replaces selection on single-select dimensions (multiple=false)', () => {
    const onFilterChange = vi.fn();
    const onReset = vi.fn();

    render(
      <FilterBar
        dimensions={dimensions}
        activeFilters={{ service: ['bookkeeping'] }}
        onFilterChange={onFilterChange}
        onReset={onReset}
      />
    );

    // Click MIS should replace, not append
    fireEvent.click(screen.getByText('MIS'));
    expect(onFilterChange).toHaveBeenCalledWith('service', ['mis']);
  });

  it('shows reset button when filters are active and calls onReset', () => {
    const onFilterChange = vi.fn();
    const onReset = vi.fn();

    render(
      <FilterBar
        dimensions={dimensions}
        activeFilters={{ industry: ['dtc'] }}
        onFilterChange={onFilterChange}
        onReset={onReset}
      />
    );

    const resetButton = screen.getByRole('button', { name: /reset all filters/i });
    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('does not show reset button when no filters are active', () => {
    const onFilterChange = vi.fn();
    const onReset = vi.fn();

    render(
      <FilterBar
        dimensions={dimensions}
        activeFilters={{}}
        onFilterChange={onFilterChange}
        onReset={onReset}
      />
    );

    expect(screen.queryByRole('button', { name: /reset all filters/i })).not.toBeInTheDocument();
  });

  it('marks active filters with aria-checked=true', () => {
    const onFilterChange = vi.fn();
    const onReset = vi.fn();

    render(
      <FilterBar
        dimensions={dimensions}
        activeFilters={{ industry: ['dtc', 'saas'] }}
        onFilterChange={onFilterChange}
        onReset={onReset}
      />
    );

    const dtcButton = screen.getByText('DTC');
    const agencyButton = screen.getByText('Agency');
    const saasButton = screen.getByText('SaaS');

    expect(dtcButton).toHaveAttribute('aria-checked', 'true');
    expect(agencyButton).toHaveAttribute('aria-checked', 'false');
    expect(saasButton).toHaveAttribute('aria-checked', 'true');
  });
});

// ============================================================
// CaseStudyCard Tests
// ============================================================
describe('CaseStudyCard', () => {
  const mockCaseStudy = {
    id: 'cs-1',
    slug: 'acme-dtc',
    industry: 'dtc' as const,
    serviceType: 'bookkeeping' as const,
    headline: 'Acme DTC saved 40% on bookkeeping',
    clientIndustryLabel: 'DTC E-Commerce',
    problem: 'Manual processes causing delays',
    solution: 'Automated reconciliation',
    metrics: [
      { label: 'Close Time', before: 15, after: 5, unit: 'days', improvement: '3x faster' },
      { label: 'Accuracy', before: 92, after: 99, unit: '%', improvement: '7% increase' },
    ],
    publishedAt: '2024-01-15',
  };

  it('renders industry label, headline, and metrics', () => {
    render(<CaseStudyCard caseStudy={mockCaseStudy} />);

    expect(screen.getByText('DTC E-Commerce')).toBeInTheDocument();
    expect(screen.getByText('Acme DTC saved 40% on bookkeeping')).toBeInTheDocument();
    expect(screen.getByText('Close Time')).toBeInTheDocument();
    expect(screen.getByText('Accuracy')).toBeInTheDocument();
  });

  it('renders metric counters with font-data class for IBM Plex Mono', () => {
    const { container } = render(<CaseStudyCard caseStudy={mockCaseStudy} />);

    // CounterAnimation renders <span> elements with font-data class and inline style
    const fontDataSpans = container.querySelectorAll('span.font-data');
    expect(fontDataSpans.length).toBeGreaterThan(0);

    // Each CounterAnimation span should have the IBM Plex Mono font-family
    fontDataSpans.forEach((span) => {
      expect((span as HTMLElement).style.fontFamily).toBe('var(--font-data)');
    });
  });

  it('calls onClick when card is clicked', () => {
    const onClick = vi.fn();
    render(<CaseStudyCard caseStudy={mockCaseStudy} onClick={onClick} />);

    const card = screen.getByRole('button', {
      name: /case study: acme dtc saved/i,
    });
    fireEvent.click(card);
    expect(onClick).toHaveBeenCalledWith(mockCaseStudy);
  });

  it('supports keyboard activation with Enter and Space', () => {
    const onClick = vi.fn();
    render(<CaseStudyCard caseStudy={mockCaseStudy} onClick={onClick} />);

    const card = screen.getByRole('button', {
      name: /case study: acme dtc saved/i,
    });

    fireEvent.keyDown(card, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(card, { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('has accessible aria-label on the card', () => {
    render(<CaseStudyCard caseStudy={mockCaseStudy} />);

    const card = screen.getByRole('button');
    expect(card).toHaveAttribute(
      'aria-label',
      'Case study: Acme DTC saved 40% on bookkeeping'
    );
  });
});

// ============================================================
// Lightbox Tests
// ============================================================
describe('Lightbox', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <Lightbox
        isOpen={false}
        onClose={vi.fn()}
        src="/test.png"
        alt="Test image"
      />
    );

    expect(container.firstElementChild).toBeNull();
  });

  it('renders lightbox dialog when isOpen is true', () => {
    render(
      <Lightbox
        isOpen={true}
        onClose={vi.fn()}
        src="/test.png"
        alt="Test image"
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByAltText('Test image')).toBeInTheDocument();
  });

  it('closes on close button click', () => {
    const onClose = vi.fn();

    render(
      <Lightbox
        isOpen={true}
        onClose={onClose}
        src="/test.png"
        alt="Test image"
      />
    );

    const closeButton = screen.getByRole('button', { name: /close lightbox/i });
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes on Escape key press', () => {
    const onClose = vi.fn();

    render(
      <Lightbox
        isOpen={true}
        onClose={onClose}
        src="/test.png"
        alt="Test image"
      />
    );

    act(() => {
      fireEvent.keyDown(document, { key: 'Escape' });
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes on overlay background click', () => {
    const onClose = vi.fn();

    const { container } = render(
      <Lightbox
        isOpen={true}
        onClose={onClose}
        src="/test.png"
        alt="Test image"
      />
    );

    // The overlay is the div with aria-hidden="true" and the click handler
    const overlay = container.querySelector('[aria-hidden="true"]') as HTMLElement;
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close when clicking on the image content', () => {
    const onClose = vi.fn();

    render(
      <Lightbox
        isOpen={true}
        onClose={onClose}
        src="/test.png"
        alt="Test image"
      />
    );

    const image = screen.getByAltText('Test image');
    fireEvent.click(image);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('has aria-modal=true and proper role', () => {
    render(
      <Lightbox
        isOpen={true}
        onClose={vi.fn()}
        src="/test.png"
        alt="Test image"
      />
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label', 'Lightbox: Test image');
  });
});

// ============================================================
// StickyTOCSidebar Tests
// ============================================================
describe('StickyTOCSidebar', () => {
  const tocItems = [
    { id: 'section-1', label: 'Introduction', level: 1 as const },
    { id: 'section-2', label: 'Details', level: 1 as const },
    { id: 'section-2-1', label: 'Sub-details', level: 2 as const },
    { id: 'section-3', label: 'Conclusion', level: 1 as const },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Default to desktop
    mockedUseMediaQuery.mockReturnValue(true);
  });

  it('renders as a sticky sidebar on desktop (≥1024px)', () => {
    mockedUseMediaQuery.mockReturnValue(true);

    const { container } = render(<StickyTOCSidebar items={tocItems} />);

    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
    expect(nav?.className).toContain('sticky');
    expect(nav).toHaveAttribute('aria-label', 'Table of contents');

    // Should show title text
    expect(screen.getByText('On this page')).toBeInTheDocument();
  });

  it('renders as a collapsible menu on mobile/tablet (<1024px)', () => {
    mockedUseMediaQuery.mockReturnValue(false);

    render(<StickyTOCSidebar items={tocItems} />);

    // Should have a toggle button
    const toggleButton = screen.getByRole('button', { name: /on this page/i });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('expands collapsed menu on button click on mobile', () => {
    mockedUseMediaQuery.mockReturnValue(false);

    render(<StickyTOCSidebar items={tocItems} />);

    const toggleButton = screen.getByRole('button', { name: /on this page/i });

    // Initially collapsed
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    const panel = document.getElementById('toc-mobile-panel');
    expect(panel).toHaveAttribute('hidden');

    // Click to expand
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    expect(panel).not.toHaveAttribute('hidden');
  });

  it('renders all TOC items as links', () => {
    mockedUseMediaQuery.mockReturnValue(true);

    render(<StickyTOCSidebar items={tocItems} />);

    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Sub-details')).toBeInTheDocument();
    expect(screen.getByText('Conclusion')).toBeInTheDocument();
  });

  it('highlights the active section with aria-current', () => {
    mockedUseMediaQuery.mockReturnValue(true);

    render(<StickyTOCSidebar items={tocItems} />);

    // First item should be active by default
    const introLink = screen.getByText('Introduction');
    expect(introLink).toHaveAttribute('aria-current', 'location');

    // Other items should not have aria-current
    const detailsLink = screen.getByText('Details');
    expect(detailsLink).not.toHaveAttribute('aria-current');
  });

  it('applies sticky positioning with top offset', () => {
    mockedUseMediaQuery.mockReturnValue(true);

    const { container } = render(
      <StickyTOCSidebar items={tocItems} topOffset={100} />
    );

    const nav = container.querySelector('nav');
    expect(nav?.style.top).toBe('100px');
  });

  it('supports custom title prop', () => {
    mockedUseMediaQuery.mockReturnValue(true);

    render(<StickyTOCSidebar items={tocItems} title="Contents" />);

    expect(screen.getByText('Contents')).toBeInTheDocument();
  });
});

// ============================================================
// TeamMemberCard Tests
// ============================================================
describe('TeamMemberCard', () => {
  const mockMember = {
    id: 'tm-1',
    name: 'Jane Smith',
    role: 'Lead Accountant',
    photoUrl: '/team/jane.jpg',
    bio: 'Jane has 10 years of experience in forensic accounting and tax advisory.',
    order: 1,
  };

  it('renders photo, name, and role', () => {
    render(<TeamMemberCard member={mockMember} />);

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Lead Accountant')).toBeInTheDocument();
    expect(screen.getByAltText('Photo of Jane Smith')).toBeInTheDocument();
  });

  it('reveals bio on focus for keyboard accessibility', () => {
    const { container } = render(<TeamMemberCard member={mockMember} />);

    const card = container.firstElementChild as HTMLElement;

    // Initially bio overlay is hidden
    const overlay = container.querySelector('[aria-hidden]');
    expect(overlay).toHaveAttribute('aria-hidden', 'true');

    // Focus the card
    fireEvent.focus(card);

    // Bio overlay should become visible
    const revealedOverlay = container.querySelector('[aria-hidden="false"]');
    expect(revealedOverlay).toBeInTheDocument();
    expect(screen.getByText(mockMember.bio)).toBeInTheDocument();
  });

  it('hides bio on blur', () => {
    const { container } = render(<TeamMemberCard member={mockMember} />);

    const card = container.firstElementChild as HTMLElement;

    // Focus to reveal
    fireEvent.focus(card);
    expect(container.querySelector('[aria-hidden="false"]')).toBeInTheDocument();

    // Blur to hide
    fireEvent.blur(card);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('reveals bio on hover (mouseEnter)', () => {
    const { container } = render(<TeamMemberCard member={mockMember} />);

    const card = container.firstElementChild as HTMLElement;

    fireEvent.mouseEnter(card);
    expect(container.querySelector('[aria-hidden="false"]')).toBeInTheDocument();
  });

  it('hides bio on mouseLeave', () => {
    const { container } = render(<TeamMemberCard member={mockMember} />);

    const card = container.firstElementChild as HTMLElement;

    fireEvent.mouseEnter(card);
    fireEvent.mouseLeave(card);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('truncates bio to max 150 characters', () => {
    const longBioMember = {
      ...mockMember,
      bio: 'A'.repeat(200),
    };

    const { container } = render(<TeamMemberCard member={longBioMember} />);

    const card = container.firstElementChild as HTMLElement;
    fireEvent.focus(card);

    // The visible bio text should be truncated to 147 chars + "..."
    const bioText = container.querySelector('[aria-hidden="false"] p')?.textContent;
    expect(bioText?.length).toBeLessThanOrEqual(150);
    expect(bioText).toContain('...');
  });

  it('provides screen reader accessible bio via sr-only element', () => {
    render(<TeamMemberCard member={mockMember} />);

    // The sr-only span always contains the bio text
    const srOnly = document.querySelector('.sr-only');
    expect(srOnly).toBeInTheDocument();
    expect(srOnly?.textContent).toContain(mockMember.bio);
  });

  it('has proper aria-label with name and role', () => {
    const { container } = render(<TeamMemberCard member={mockMember} />);

    const card = container.firstElementChild as HTMLElement;
    expect(card).toHaveAttribute('aria-label', 'Jane Smith, Lead Accountant');
  });

  it('is focusable via tabIndex', () => {
    const { container } = render(<TeamMemberCard member={mockMember} />);

    const card = container.firstElementChild as HTMLElement;
    expect(card).toHaveAttribute('tabindex', '0');
  });
});

// ============================================================
// Empty-state messages when filters return no results
// ============================================================
describe('FilterBar empty-state behavior', () => {
  it('displays reset button enabling users to clear filters when no results match', () => {
    const onFilterChange = vi.fn();
    const onReset = vi.fn();

    const dimensions = [
      {
        key: 'industry',
        label: 'Industry',
        options: [
          { value: 'dtc', label: 'DTC' },
          { value: 'agency', label: 'Agency' },
        ],
        multiple: true,
      },
    ];

    // Simulate active filter state that returns no results
    render(
      <FilterBar
        dimensions={dimensions}
        activeFilters={{ industry: ['dtc'] }}
        onFilterChange={onFilterChange}
        onReset={onReset}
      />
    );

    // Reset button should be visible for clearing filters
    const resetButton = screen.getByRole('button', { name: /reset all filters/i });
    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('has toolbar role for accessibility', () => {
    render(
      <FilterBar
        dimensions={[]}
        activeFilters={{}}
        onFilterChange={vi.fn()}
        onReset={vi.fn()}
      />
    );

    expect(screen.getByRole('toolbar')).toBeInTheDocument();
    expect(screen.getByRole('toolbar')).toHaveAttribute('aria-label', 'Filter controls');
  });
});

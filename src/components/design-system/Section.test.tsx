import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section } from './Section';

describe('Section', () => {
  it('renders children inside a section element by default', () => {
    render(<Section>Section content</Section>);
    const section = screen.getByText('Section content');
    expect(section.tagName).toBe('SECTION');
  });

  it('applies max-width and gutters', () => {
    render(<Section>Styled</Section>);
    const section = screen.getByText('Styled');
    expect(section.className).toContain('max-w-[1180px]');
    expect(section.className).toContain('px-[28px]');
    expect(section.className).toContain('mx-auto');
  });

  it('applies grid layout when grid prop is true', () => {
    render(<Section grid>Grid content</Section>);
    const section = screen.getByText('Grid content');
    expect(section.className).toContain('grid');
    expect(section.className).toContain('lg:grid-cols-12');
    expect(section.className).toContain('gap-[28px]');
  });

  it('does not apply grid layout when grid is false', () => {
    render(<Section>No grid</Section>);
    const section = screen.getByText('No grid');
    expect(section.className).not.toContain('grid');
  });

  it('renders as different HTML elements via "as" prop', () => {
    const { rerender } = render(<Section as="div">Div</Section>);
    expect(screen.getByText('Div').tagName).toBe('DIV');

    rerender(<Section as="article">Article</Section>);
    expect(screen.getByText('Article').tagName).toBe('ARTICLE');

    rerender(<Section as="main">Main</Section>);
    expect(screen.getByText('Main').tagName).toBe('MAIN');
  });

  it('applies aria-label when provided', () => {
    render(<Section ariaLabel="Hero section">Hero</Section>);
    const section = screen.getByLabelText('Hero section');
    expect(section).toBeDefined();
  });

  it('applies aria-labelledby when provided', () => {
    render(
      <Section ariaLabelledBy="heading-1">
        <h2 id="heading-1">Title</h2>
      </Section>
    );
    const section = screen.getByText('Title').closest('section');
    expect(section?.getAttribute('aria-labelledby')).toBe('heading-1');
  });

  it('applies id for anchor linking', () => {
    render(<Section id="services">Services</Section>);
    const section = screen.getByText('Services');
    expect(section.getAttribute('id')).toBe('services');
  });

  it('applies additional className', () => {
    render(<Section className="bg-ink">Custom</Section>);
    const section = screen.getByText('Custom');
    expect(section.className).toContain('bg-ink');
  });
});

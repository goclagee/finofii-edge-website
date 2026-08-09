import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Testimonial } from './Testimonial';

describe('Testimonial', () => {
  it('renders quote text', () => {
    render(<Testimonial quote="Great service!" author="John Doe" />);
    expect(screen.getByText(/Great service!/)).toBeDefined();
  });

  it('renders as a figure element', () => {
    const { container } = render(
      <Testimonial quote="Nice work" author="Jane" />
    );
    expect(container.querySelector('figure')).not.toBeNull();
  });

  it('renders blockquote for the quote', () => {
    const { container } = render(
      <Testimonial quote="Excellent" author="Bob" />
    );
    expect(container.querySelector('blockquote')).not.toBeNull();
  });

  it('renders author name in a cite element', () => {
    const { container } = render(
      <Testimonial quote="Good" author="Alice Smith" />
    );
    const cite = container.querySelector('cite');
    expect(cite).not.toBeNull();
    expect(cite!.textContent).toBe('Alice Smith');
  });

  it('renders role and company', () => {
    render(
      <Testimonial
        quote="Amazing"
        author="Tim"
        role="CEO"
        company="Acme Inc"
      />
    );
    expect(screen.getByText(/CEO/)).toBeDefined();
    expect(screen.getByText(/Acme Inc/)).toBeDefined();
  });

  it('renders avatar when provided', () => {
    const { container } = render(
      <Testimonial
        quote="Solid"
        author="Sam"
        avatarUrl="/avatar.jpg"
      />
    );
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img!.getAttribute('src')).toBe('/avatar.jpg');
  });

  it('does not render avatar when not provided', () => {
    const { container } = render(
      <Testimonial quote="OK" author="Pat" />
    );
    expect(container.querySelector('img')).toBeNull();
  });

  it('renders star rating', () => {
    const { container } = render(
      <Testimonial quote="5 stars" author="Lee" rating={5} />
    );
    const ratingContainer = screen.getByRole('img', { name: /Rating/ });
    expect(ratingContainer).not.toBeNull();
    expect(ratingContainer.getAttribute('aria-label')).toBe('Rating: 5 out of 5 stars');
  });

  it('renders correct number of filled stars', () => {
    const { container } = render(
      <Testimonial quote="Three stars" author="Kim" rating={3} />
    );
    const stars = container.querySelectorAll('svg');
    const filledStars = Array.from(stars).filter((svg) =>
      svg.getAttribute('class')?.includes('text-brass')
    );
    expect(filledStars.length).toBe(3);
  });

  it('does not render rating when not provided', () => {
    const { container } = render(
      <Testimonial quote="No rating" author="Lou" />
    );
    expect(screen.queryByRole('img', { name: /Rating/ })).toBeNull();
  });

  it('applies default variant styles', () => {
    const { container } = render(
      <Testimonial quote="Default" author="Ed" />
    );
    const figure = container.querySelector('figure')!;
    expect(figure.className).toContain('border-ink/10');
    expect(figure.className).toContain('bg-paper');
  });

  it('applies featured variant styles', () => {
    const { container } = render(
      <Testimonial quote="Featured" author="Mel" variant="featured" />
    );
    const figure = container.querySelector('figure')!;
    expect(figure.className).toContain('border-accent/30');
  });

  it('has hover shadow effect', () => {
    const { container } = render(
      <Testimonial quote="Hover" author="Jo" />
    );
    const figure = container.querySelector('figure')!;
    expect(figure.className).toContain('hover:shadow-lg');
  });

  it('passes accessibility audit', async () => {
    const { container } = render(
      <Testimonial
        quote="Excellent bookkeeping service"
        author="Jane Doe"
        role="CFO"
        company="Tech Corp"
        rating={5}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

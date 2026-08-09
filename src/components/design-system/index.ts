/**
 * Design System Barrel Export
 *
 * All 15 reusable design system components exported from a single entry point.
 * Components are organized into base components (Button, Card, Section, Badge,
 * Tooltip, Toggle) and interactive components (Accordion, Modal, FormField,
 * Stat, Testimonial, PricingTier, AnimatedHeadline).
 *
 * Navbar and Footer are also part of the design system but are typically
 * used only in the root layout. They will be added here once implemented.
 */

// Base components
export { Button } from './Button';
export type { ButtonProps } from './Button';

export { Card } from './Card';
export type { CardProps } from './Card';

export { Section } from './Section';
export type { SectionProps } from './Section';

export { Badge } from './Badge';
export type { BadgeProps } from './Badge';

export { Tooltip } from './Tooltip';
export type { TooltipProps } from './Tooltip';

export { Toggle } from './Toggle';
export type { ToggleProps } from './Toggle';

// Interactive components
export { Accordion } from './Accordion';
export type { AccordionProps, AccordionItem } from './Accordion';

export { Modal } from './Modal';
export type { ModalProps } from './Modal';

export { FormField } from './FormField';
export type { FormFieldProps } from './FormField';

export { Stat } from './Stat';
export type { StatProps } from './Stat';

export { Testimonial } from './Testimonial';
export type { TestimonialProps } from './Testimonial';

export { PricingTier } from './PricingTier';
export type { PricingTierProps, PricingFeature } from './PricingTier';

export { AnimatedHeadline } from './AnimatedHeadline';
export type { AnimatedHeadlineProps } from './AnimatedHeadline';

// Layout components
export { Navbar } from './Navbar';
export type { NavbarProps, NavLink } from './Navbar';

export { Footer } from './Footer';
export type { FooterProps } from './Footer';

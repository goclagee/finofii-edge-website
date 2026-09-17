'use client';

import { Section } from '@/components/design-system/Section';
import { Button } from '@/components/design-system/Button';
import { AnimatedHeadline } from '@/components/design-system/AnimatedHeadline';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { TeamMemberCard } from '@/components/content/TeamMemberCard';
import { Timeline, type TimelinePhase } from '@/components/content/Timeline';
import type { TeamMember } from '@/types/content';

/**
 * Sample team members (3-5 members) for the About page.
 * Bio is capped at 150 characters per the requirement.
 */
const teamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Vasu Grover',
    role: 'Head of Operations - Finofiii Edge',
    photoUrl: '/images/team/vasu-grover.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/vasu-grover-69a08615b',
    order: 1,
  },
];

/**
 * Company milestones for the timeline section.
 * At least 3 founding milestones with scroll-triggered animation.
 */
const companyMilestones: TimelinePhase[] = [
  {
    id: 'milestone-1',
    title: 'The Spark',
    dayRange: '2019',
    items: [
      {
        id: 'm1-1',
        label: 'Arjun identifies a gap in accounting services for digital-native businesses',
        type: 'milestone',
      },
      {
        id: 'm1-2',
        label: 'First client onboarded — a DTC brand doing $500K in annual revenue',
        type: 'deliverable',
      },
    ],
  },
  {
    id: 'milestone-2',
    title: 'Building the Foundation',
    dayRange: '2020–2021',
    items: [
      {
        id: 'm2-1',
        label: 'Expanded to a team of 5 dedicated accountants and analysts',
        type: 'milestone',
      },
      {
        id: 'm2-2',
        label: 'Launched proprietary dashboard platform for real-time financial visibility',
        type: 'deliverable',
      },
      {
        id: 'm2-3',
        label: 'Achieved SOC 2 Type II certification for data security',
        type: 'milestone',
      },
    ],
  },
  {
    id: 'milestone-3',
    title: 'Scaling with Purpose',
    dayRange: '2022–2023',
    items: [
      {
        id: 'm3-1',
        label: 'Crossed 100 active clients across DTC, SaaS, agencies, and CPA firms',
        type: 'milestone',
      },
      {
        id: 'm3-2',
        label: 'Introduced Virtual CFO advisory tier for growth-stage businesses',
        type: 'deliverable',
      },
      {
        id: 'm3-3',
        label: 'Partnered with QuickBooks, Xero, Stripe, and Ramp for seamless integrations',
        type: 'milestone',
      },
    ],
  },
  {
    id: 'milestone-4',
    title: 'Where We Are Today',
    dayRange: '2024–Present',
    items: [
      {
        id: 'm4-1',
        label: 'Serving 200+ businesses with a team of 20+ finance professionals',
        type: 'milestone',
      },
      {
        id: 'm4-2',
        label: 'Launched Finofii Edge — next-generation platform combining automation, dashboards, and advisory',
        type: 'deliverable',
      },
    ],
  },
];

export function AboutContent() {
  return (
    <>
      {/* Company Narrative Section */}
      <Section padding="lg" ariaLabel="About Finofii Edge">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            <ScrollReveal animation="fade-up">
              <AnimatedHeadline
                text="Built for Founders Who Move Fast"
                as="h1"
                animation="fade-up"
                className="text-4xl md:text-5xl font-bold font-display text-ink"
              />
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={150}>
              <p className="mt-6 text-lg text-ink/70 font-interface leading-relaxed">
                Finofii Edge was born from a simple frustration: modern businesses deserve
                modern accounting. Too many founders spend hours wrestling with spreadsheets,
                chasing down receipts, and waiting weeks for reports that arrive outdated.
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={250}>
              <p className="mt-4 text-lg text-ink/70 font-interface leading-relaxed">
                We believe financial clarity shouldn&apos;t be a luxury. Our team combines
                deep accounting expertise with technology-first thinking to deliver
                real-time visibility, proactive guidance, and a white-glove experience
                that scales with your business.
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={350}>
              <p className="mt-4 text-base text-ink/60 font-interface leading-relaxed">
                From day one, every engagement is built around your goals — whether
                that&apos;s preparing for fundraising, optimizing cash flow, or simply
                closing the books without the headache.
              </p>
            </ScrollReveal>
          </div>

          {/* Supporting image */}
          <ScrollReveal animation="scale">
            <div className="relative rounded-[14px] overflow-hidden shadow-lg">
              <img
                src="/images/about-team.png"
                alt="The Finofii Edge team collaborating on financial strategies"
                className="w-full h-auto object-cover aspect-[4/3]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" aria-hidden="true" />
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* Team Member Grid Section */}
      <Section padding="lg" ariaLabel="Our team">
        <div className="text-center mb-12">
          <ScrollReveal animation="fade-up">
            <AnimatedHeadline
              text="Meet the Team"
              as="h2"
              animation="fade-up"
              className="text-3xl md:text-4xl font-bold font-display text-ink"
            />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <p className="mt-4 text-lg text-ink/60 font-interface max-w-2xl mx-auto">
              Finance professionals, data experts, and operators united by a shared
              mission: making your numbers work for you.
            </p>
          </ScrollReveal>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {teamMembers
            .sort((a, b) => a.order - b.order)
            .map((member, index) => (
              <ScrollReveal
                key={member.id}
                animation="fade-up"
                delay={index * 100}
              >
                <TeamMemberCard member={member} className="w-full sm:w-64" />
              </ScrollReveal>
            ))}
        </div>
      </Section>

      {/* Company Timeline Section */}
      <Section padding="lg" ariaLabel="Company timeline">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <ScrollReveal animation="fade-up">
              <AnimatedHeadline
                text="Our Journey"
                as="h2"
                animation="fade-up"
                className="text-3xl md:text-4xl font-bold font-display text-ink"
              />
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={150}>
              <p className="mt-4 text-lg text-ink/60 font-interface">
                From a solo practitioner&apos;s vision to a team serving hundreds of businesses.
              </p>
            </ScrollReveal>
          </div>

          <Timeline
            phases={companyMilestones}
            className="mt-4"
          />
        </div>
      </Section>

      {/* CTA Section */}
      <Section padding="lg" ariaLabel="Call to action">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal animation="fade-up">
            <AnimatedHeadline
              text="Let's build your financial future"
              as="h2"
              animation="fade-up"
              className="text-2xl md:text-3xl font-bold font-display text-ink"
            />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <p className="mt-4 text-ink/70 font-interface">
              Ready to experience accounting that moves at the speed of your business?
              Book a free audit call and see how Finofii Edge can help.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={300}>
            <div className="mt-8">
              <Button
                variant="accent"
                size="lg"
                href="/book"
                magnetic
              >
                Book a Free Audit
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
}

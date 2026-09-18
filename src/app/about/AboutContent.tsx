'use client';

import { Section } from '@/components/design-system/Section';
import { AnimatedHeadline } from '@/components/design-system/AnimatedHeadline';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { TeamMemberCard } from '@/components/content/TeamMemberCard';
import { Timeline, type TimelinePhase } from '@/components/content/Timeline';
import { CtaSection } from '@/components/design-system/CtaSection';
import type { TeamMember } from '@/types/content';

/**
 * Sample team members (3-5 members) for the About page.
 * Bio is capped at 150 characters per the requirement.
 */
const teamMembers: TeamMember[] = [
  {
    id: 'team-ceo',
    name: 'Ganesh Jha',
    role: 'CEO - Finofiii Edge',
    photoUrl: '/images/team/ganesh-jha.jpg',
    linkedInUrl: 'https://in.linkedin.com/in/jha-ganesh',
    order: 1,
  },
  {
    id: 'team-1',
    name: 'Vasu Grover',
    role: 'Head Of Operations - Finofiii Edge',
    photoUrl: '/images/team/vasu-grover.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/vasu-grover-69a08615b',
    order: 2,
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
        label: 'Arjun Identifies A Gap In Accounting Services For Digital-Native Businesses',
        type: 'milestone',
      },
      {
        id: 'm1-2',
        label: 'First Client Onboarded — A DTC Brand Doing $500K In Annual Revenue',
        type: 'deliverable',
      },
    ],
  },
  {
    id: 'milestone-2',
    title: 'Building The Foundation',
    dayRange: '2020–2021',
    items: [
      {
        id: 'm2-1',
        label: 'Expanded To A Team Of 5 Dedicated Accountants And Analysts',
        type: 'milestone',
      },
      {
        id: 'm2-2',
        label: 'Launched Proprietary Dashboard Platform For Real-Time Financial Visibility',
        type: 'deliverable',
      },
      {
        id: 'm2-3',
        label: 'Achieved SOC 2 Type II Certification For Data Security',
        type: 'milestone',
      },
    ],
  },
  {
    id: 'milestone-3',
    title: 'Scaling With Purpose',
    dayRange: '2022–2023',
    items: [
      {
        id: 'm3-1',
        label: 'Crossed 100 Active Clients Across DTC, SaaS, Agencies And CPA Firms',
        type: 'milestone',
      },
      {
        id: 'm3-2',
        label: 'Introduced Virtual CFO Advisory Tier For Growth-Stage Businesses',
        type: 'deliverable',
      },
      {
        id: 'm3-3',
        label: 'Partnered With QuickBooks, Xero, Stripe And Ramp For Seamless Integrations',
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
        label: 'Serving 200+ Businesses With A Team Of 20+ Finance Professionals',
        type: 'milestone',
      },
      {
        id: 'm4-2',
        label: 'Launched Finofiii Edge — Next-Generation Platform Combining Automation, Dashboards And Advisory',
        type: 'deliverable',
      },
    ],
  },
];

export function AboutContent() {
  return (
    <>
      {/* Company Narrative Section */}
      <Section padding="lg" ariaLabel="About Finofiii Edge">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            <ScrollReveal animation="fade-up">
              <AnimatedHeadline
                text="Built For Founders Who Move Fast"
                as="h1"
                animation="fade-up"
                className="text-4xl md:text-5xl font-bold font-display text-ink"
              />
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={150}>
              <p className="mt-6 text-lg text-ink/70 font-interface leading-relaxed">
                Finofiii Edge Was Born From A Simple Frustration: Modern Businesses Deserve
                Modern Accounting. Too Many Founders Spend Hours Wrestling With Spreadsheets,
                Chasing Down Receipts And Waiting Weeks For Reports That Arrive Outdated.
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={250}>
              <p className="mt-4 text-lg text-ink/70 font-interface leading-relaxed">
                We Believe Financial Clarity Shouldn&apos;t Be A Luxury. Our Team Combines
                Deep Accounting Expertise With Technology-First Thinking To Deliver
                Real-Time Visibility, Proactive Guidance And A White-Glove Experience
                That Scales With Your Business.
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={350}>
              <p className="mt-4 text-base text-ink/60 font-interface leading-relaxed">
                From Day One, Every Engagement Is Built Around Your Goals — Whether
                That&apos;s Preparing For Fundraising, Optimizing Cash Flow Or Simply
                Closing The Books Without The Headache.
              </p>
            </ScrollReveal>
          </div>

          {/* Supporting image */}
          <ScrollReveal animation="scale">
            <div className="relative rounded-[14px] overflow-hidden shadow-lg">
              <img
                src="/images/about-team.png"
                alt="The Finofiii Edge team collaborating on financial strategies"
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
              text="Meet The Team"
              as="h2"
              animation="fade-up"
              className="text-3xl md:text-4xl font-bold font-display text-ink"
            />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <p className="mt-4 text-lg text-ink/60 font-interface max-w-2xl mx-auto">
              Finance Professionals, Data Experts And Operators United By A Shared
              Mission: Making Your Numbers Work For You.
            </p>
          </ScrollReveal>
        </div>

        <div className="flex flex-wrap items-stretch justify-center gap-6">
          {teamMembers
            .sort((a, b) => a.order - b.order)
            .map((member, index) => (
              <ScrollReveal
                key={member.id}
                animation="fade-up"
                delay={index * 100}
                className="w-full sm:w-64"
              >
                <TeamMemberCard member={member} className="w-full h-full" />
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
                From A Solo Practitioner&apos;s Vision To A Team Serving Hundreds Of Businesses.
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
      <CtaSection
        headline="Let's Build Your Financial Future"
        description="Ready To Experience Accounting That Moves At The Speed Of Your Business? Book A Free Audit Call And See How Finofiii Edge Can Help."
      />
    </>
  );
}

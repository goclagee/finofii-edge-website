'use client';

import React, { useState, useCallback } from 'react';
import type { TeamMember } from '@/types/content';

export interface TeamMemberCardProps {
  /** Team member data */
  member: TeamMember;
  /** Additional class name */
  className?: string;
}

/**
 * TeamMemberCard displays a team member with photo, name, role,
 * and a bio that reveals on hover, focus, or tap.
 *
 * Interaction behavior:
 * - Desktop: bio reveals on hover (≤300ms transition)
 * - Touch/keyboard: bio reveals on focus or tap
 * - Bio text is capped at 150 characters
 * - Accessible via keyboard navigation (focusable, uses aria attributes)
 */
export function TeamMemberCard({
  member,
  className = '',
}: TeamMemberCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  // Truncate bio to max 150 characters
  const displayBio =
    member.bio.length > 150
      ? member.bio.slice(0, 147) + '...'
      : member.bio;

  const handleMouseEnter = useCallback(() => {
    setIsRevealed(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsRevealed(false);
  }, []);

  const handleFocus = useCallback(() => {
    setIsRevealed(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsRevealed(false);
  }, []);

  const handleTap = useCallback(() => {
    setIsRevealed((prev) => !prev);
  }, []);

  return (
    <div
      className={`group relative rounded-[14px] overflow-hidden bg-paper border border-ink/10 transition-shadow duration-300 hover:shadow-lg focus-within:shadow-lg ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleTap}
      role="article"
      aria-label={`${member.name}, ${member.role}`}
      tabIndex={0}
    >
      {/* Photo */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink/5">
        <img
          src={member.photoUrl}
          alt={`Photo of ${member.name}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Bio overlay - reveals on hover/focus/tap */}
        <div
          className={[
            'absolute inset-0 flex items-end',
            'bg-gradient-to-t from-ink/80 via-ink/40 to-transparent',
            'transition-opacity duration-300',
            isRevealed ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          aria-hidden={!isRevealed}
        >
          <p className="text-sm text-white/90 p-4 m-0 leading-relaxed">
            {displayBio}
          </p>
        </div>
      </div>

      {/* Name and Role */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-ink m-0">
          {member.name}
        </h3>
        <p className="text-sm text-ink/60 m-0 mt-0.5">
          {member.role}
        </p>
      </div>

      {/* Visually hidden bio for screen readers (always accessible) */}
      <span className="sr-only">
        Bio: {displayBio}
      </span>
    </div>
  );
}

export default TeamMemberCard;

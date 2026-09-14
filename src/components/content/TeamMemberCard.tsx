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
  const bio = member.bio ?? '';
  const displayBio = bio.length > 150 ? bio.slice(0, 147) + '...' : bio;
  const hasBio = displayBio.length > 0;

  // Derive initials from the member name for the photo-less avatar fallback
  const initials = member.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');

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
      {/* Photo (or initials avatar fallback when no photo is provided) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink/5">
        {member.photoUrl ? (
          <img
            src={member.photoUrl}
            alt={`Photo of ${member.name}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/15 to-accent/5"
            aria-hidden="true"
          >
            <span className="font-display text-5xl font-bold text-accent">
              {initials}
            </span>
          </div>
        )}

        {/* Bio overlay - reveals on hover/focus/tap */}
        {hasBio && (
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
        )}
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
      {hasBio && (
        <span className="sr-only">
          Bio: {displayBio}
        </span>
      )}
    </div>
  );
}

export default TeamMemberCard;

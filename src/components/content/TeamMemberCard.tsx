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
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold text-ink m-0">
              {member.name}
            </h3>
            <p className="text-sm text-ink/60 m-0 mt-0.5">
              {member.role}
            </p>
          </div>

          {member.linkedInUrl && (
            <a
              href={member.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-ink/60 hover:bg-accent/10 hover:text-accent transition-colors"
              aria-label={`${member.name} on LinkedIn`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          )}
        </div>
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

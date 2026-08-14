import type { ReactNode } from 'react';

/**
 * Simple line icons per category — functional wayfinding, not illustration.
 * Deliberately neutral: no gavels or scales (avoids law-firm iconography).
 * Stroke uses currentColor so it adapts to theme and hover.
 */
const paths: Record<string, ReactNode> = {
  // Bar chart on a baseline
  'crash-stats': (
    <>
      <path d="M4 20V11M9.5 20V4M15 20V13.5M20.5 20V8" />
      <path d="M3 20h18" />
    </>
  ),
  // Shield with a center mark (serious / fatal)
  fatality: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 8.8C8 18.5 5 15.5 5 11V6z" />
      <path d="M12 8.5v4" />
      <path d="M12 15.5h.01" />
    </>
  ),
  // Health cross in a rounded square
  'injury-health': (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  // Hospital building with a plus
  'trauma-hospital': (
    <>
      <path d="M5 21V5a1 1 0 011-1h12a1 1 0 011 1v16" />
      <path d="M3 21h18" />
      <path d="M12 7v5M9.5 9.5h5" />
    </>
  ),
  // Map pin
  'city-regional': (
    <>
      <path d="M12 21c4.5-4 7-7.2 7-10.5A7 7 0 005 10.5C5 13.8 7.5 17 12 21z" />
      <circle cx="12" cy="10.5" r="2.4" />
    </>
  ),
  // Truck
  'truck-commercial': (
    <>
      <path d="M3 6.5h11v9.5H3z" />
      <path d="M14 10h3.5l3 3.2v2.8H14z" />
      <circle cx="7" cy="18" r="1.9" />
      <circle cx="17.5" cy="18" r="1.9" />
    </>
  ),
  // Briefcase
  occupational: (
    <>
      <rect x="3" y="7.5" width="18" height="12.5" rx="2" />
      <path d="M8.5 7.5V6a2 2 0 012-2h3a2 2 0 012 2v1.5" />
      <path d="M3 13h18" />
    </>
  ),
  // Document with lines
  litigation: (
    <>
      <path d="M6 3h7l5 5v13H6z" />
      <path d="M13 3v5h5" />
      <path d="M9 13h6M9 16.5h6" />
    </>
  ),
  // Road with dashed center line
  exposure: (
    <>
      <path d="M7 3L5 21M17 3l2 18" />
      <path d="M12 4v3M12 10.5v3M12 17v3" />
    </>
  ),
  // Graduation cap
  academic: (
    <>
      <path d="M2.5 8.5L12 4.5l9.5 4-9.5 4z" />
      <path d="M6.5 10.5V15c0 1.2 2.7 2.2 5.5 2.2s5.5-1 5.5-2.2v-4.5" />
      <path d="M21.5 8.5v4.5" />
    </>
  ),
};

export function CategoryIcon({ slug }: { slug: string }) {
  const inner = paths[slug];
  if (!inner) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {inner}
    </svg>
  );
}

/**
 * Temporary brand mark: a Lone Star (Texas) on a navy badge — authoritative,
 * on-theme, and legible down to favicon size. Swap for a final logo later.
 */
const STAR =
  'M16 6.2 L18.1 12.2 L24.4 12.3 L19.3 16.1 L21.2 22.1 L16 18.4 L10.8 22.1 L12.7 16.1 L7.6 12.3 L13.9 12.2 Z';

export function LogoMark({
  size = 28,
  idSuffix = 'hdr',
}: {
  size?: number;
  idSuffix?: string;
}) {
  const gid = `logo-navy-${idSuffix}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1f4590" />
          <stop offset="1" stopColor="#112a5b" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill={`url(#${gid})`} />
      <path d={STAR} fill="#ffffff" />
      <rect x="9" y="24.4" width="14" height="1.6" rx="0.8" fill="#d21f3c" />
    </svg>
  );
}

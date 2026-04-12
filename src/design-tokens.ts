/**
 * Design tokens for VOID Studio.
 * These mirror the CSS custom properties defined in index.css.
 * Use these in JS/TS logic where Tailwind classes aren't applicable.
 */

export const colors = {
  black: '#0a0a0a',
  dim: '#111111',
  border: '#1c1c1c',
  muted: '#4a4a4a',
  mutedLight: '#6b6b6b',
  white: '#f5f0e8',
  amber: '#c9a96e',
  amberLight: '#d4b87e',
} as const;

export const fonts = {
  display: '"Syne", sans-serif',
  body: '"Inter", sans-serif',
} as const;

export const eases = {
  out3: 'power3.out',
  out2: 'power2.out',
  inOut3: 'power3.inOut',
  inOut2: 'power2.inOut',
} as const;

export const durations = {
  fast: 0.4,
  medium: 0.7,
  slow: 1.0,
  xslow: 1.4,
} as const;

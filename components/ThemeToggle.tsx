'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

/**
 * Light/dark toggle. Light is the default; dark is opt-in and persisted.
 * The initial paint is handled by an inline script in the layout (no flash);
 * this reflects and updates the stored choice.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme');
    setTheme(stored === 'dark' ? 'dark' : 'light');
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    const root = document.documentElement;
    if (next === 'dark') {
      localStorage.setItem('theme', 'dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
      root.setAttribute('data-theme', 'light');
    }
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      suppressHydrationWarning
    >
      {mounted ? (isDark ? 'Dark' : 'Light') : 'Theme'}
    </button>
  );
}

'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

/**
 * Cycles light → dark → system. The initial paint is handled by an inline
 * script in the layout (no flash); this only reflects and updates state.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = (localStorage.getItem('theme') as Theme) || 'system';
    setTheme(stored);
  }, []);

  function apply(next: Theme) {
    setTheme(next);
    const root = document.documentElement;
    if (next === 'system') {
      localStorage.removeItem('theme');
      root.removeAttribute('data-theme');
    } else {
      localStorage.setItem('theme', next);
      root.setAttribute('data-theme', next);
    }
  }

  function cycle() {
    apply(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light');
  }

  const label = theme === 'system' ? 'Auto' : theme === 'dark' ? 'Dark' : 'Light';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={cycle}
      aria-label={`Theme: ${label}. Click to change.`}
      suppressHydrationWarning
    >
      {mounted ? label : 'Theme'}
    </button>
  );
}

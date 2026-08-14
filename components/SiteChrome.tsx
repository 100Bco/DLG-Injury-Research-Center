import Link from 'next/link';
import { site } from '@/lib/site';
import { ThemeToggle } from './ThemeToggle';
import { LogoMark } from './Logo';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="site-header__brand" aria-label={`${site.name} — home`}>
          <LogoMark size={28} />
          <span>{site.name}</span>
        </Link>
        <nav className="site-header__nav" aria-label="Primary">
          <Link href="/">Categories</Link>
          <Link href="/about/">About</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>
          <strong>{site.name}</strong> is a reference directory of authoritative
          Texas personal-injury and crash data sources. It links to original
          publications and never re-hosts them; each source belongs to the agency
          or institution that produces it.
        </p>
        <p className="meta">
          Reference use only. Not legal advice. No affiliation with the agencies
          listed. Verify figures against the primary source before citing.
        </p>
      </div>
    </footer>
  );
}

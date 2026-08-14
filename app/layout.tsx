import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/site';
import { SiteHeader, SiteFooter } from '@/components/SiteChrome';

// Inter — highly readable, neutral, and widely trusted for data/reference UIs.
// Self-hosted at build time by next/font (no runtime request).
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  // Launch requirement: keep the whole site out of search indexes until
  // content and URLs are reviewed. Flip site.noindex to false to release.
  robots: site.noindex
    ? { index: false, follow: false, nocache: true }
    : { index: true, follow: true },
  openGraph: {
    title: site.name,
    description: site.description,
    type: 'website',
    siteName: site.name,
  },
};

// Applied before paint to avoid a theme flash.
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || t === 'light') {
      document.documentElement.setAttribute('data-theme', t);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

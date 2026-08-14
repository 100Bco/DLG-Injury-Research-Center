import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, '');

  // Launch requirement: disallow all crawling until content + URLs are reviewed.
  // Flip site.noindex to false to open the site to search engines.
  if (site.noindex) {
    return {
      rules: { userAgent: '*', disallow: '/' },
    };
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

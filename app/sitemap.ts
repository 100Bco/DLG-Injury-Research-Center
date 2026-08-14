import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { categories } from '@/lib/categories';
import { getAllSources } from '@/lib/content';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sources = await getAllSources();
  const base = site.url.replace(/\/$/, '');

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/about/`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/category/${c.slug}/`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const sourceRoutes: MetadataRoute.Sitemap = sources.map((s) => ({
    url: `${base}/sources/${s.slug}/`,
    changeFrequency: 'monthly',
    priority: s.priority ? 0.8 : 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...sourceRoutes];
}

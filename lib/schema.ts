import type { Source } from './content';
import { categoryBySlug } from './categories';
import { site } from './site';

/**
 * Build a Schema.org JSON-LD object for a source. Dataset-type sources get a
 * `Dataset` node; everything else gets a `WebPage`/`Article`-style reference.
 */
export function sourceJsonLd(source: Source) {
  const category = categoryBySlug.get(source.category);
  const pageUrl = `${site.url}/sources/${source.slug}/`;
  const publisher = {
    '@type': 'Organization',
    name: source.agency,
  };

  if (source.type === 'Dataset') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: source.name,
      description: source.excerpt || site.description,
      url: pageUrl,
      sameAs: source.url,
      creator: publisher,
      publisher,
      isAccessibleForFree: true,
      license:
        source.copyright === 'PD'
          ? 'https://www.usa.gov/government-works'
          : undefined,
      keywords: [
        'Texas',
        'injury data',
        source.coverage,
        category?.name ?? source.category,
      ].filter(Boolean),
      distribution: {
        '@type': 'DataDownload',
        contentUrl: source.url,
      },
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: source.name,
    description: source.excerpt || site.description,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    about: category?.name ?? source.category,
    citation: {
      '@type': 'CreativeWork',
      name: source.name,
      url: source.url,
      publisher,
    },
    publisher: {
      '@type': 'Organization',
      name: site.name,
    },
  };
}

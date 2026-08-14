import Link from 'next/link';
import type { Source } from '@/lib/content';
import { Badges } from './Badges';

/** One row in an annotated source list. Whole row links to the detail page. */
export function SourceRow({ source }: { source: Source }) {
  return (
    <Link href={`/sources/${source.slug}/`} className="source-row">
      <div className="source-row__head">
        <span className="source-row__name">
          {source.priority ? (
            <span className="star" aria-label="Featured source" title="Featured source">
              ★{' '}
            </span>
          ) : null}
          {source.name}
        </span>
      </div>
      <div className="source-row__agency">{source.agency}</div>
      {source.excerpt ? (
        <p className="source-row__excerpt">{source.excerpt}</p>
      ) : null}
      <div className="source-row__badges">
        <Badges source={source} />
      </div>
    </Link>
  );
}

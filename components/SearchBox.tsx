'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { SearchDoc } from '@/lib/content';

/**
 * Client-side search across name, agency, and annotation body. The full index
 * (27 small docs) is inlined at build time, so search is instant and offline.
 */
export function SearchBox({ index }: { index: SearchDoc[] }) {
  const [q, setQ] = useState('');

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    const terms = query.split(/\s+/).filter(Boolean);
    return index
      .filter((doc) => terms.every((t) => doc.haystack.includes(t)))
      .sort((a, b) => {
        if (a.priority !== b.priority) return a.priority ? -1 : 1;
        return a.name.localeCompare(b.name);
      })
      .slice(0, 12);
  }, [q, index]);

  const query = q.trim();

  return (
    <div className="search">
      <label htmlFor="site-search" className="meta" style={{ display: 'block', marginBottom: 6 }}>
        Search all {index.length} sources
      </label>
      <input
        id="site-search"
        className="search__input"
        type="search"
        placeholder="Search by name, agency, or keyword — e.g. fatalities, trucks, Austin"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        autoComplete="off"
        aria-describedby="search-hint"
      />
      <div id="search-hint" className="search__hint">
        Searches source names, agencies, and annotations.
      </div>

      {query ? (
        <div className="search__results" role="region" aria-live="polite">
          {results.length === 0 ? (
            <div className="search__empty">No sources match “{query}”.</div>
          ) : (
            <div className="source-list" style={{ border: 0 }}>
              {results.map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/sources/${doc.slug}/`}
                  className="source-row"
                >
                  <div className="source-row__head">
                    <span className="source-row__name">
                      {doc.priority ? <span className="star">★ </span> : null}
                      {doc.name}
                    </span>
                  </div>
                  <div className="source-row__agency">
                    {doc.agency} · {doc.categoryName}
                  </div>
                  <div className="source-row__badges">
                    <div className="badges">
                      <span className="badge">
                        <span className="badge__label">Type</span>
                        {doc.type}
                      </span>
                      <span className="badge">
                        <span className="badge__label">Coverage</span>
                        {doc.coverage}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

export interface RowSource {
  slug: string;
  name: string;
  agency: string;
  excerpt: string;
  priority: boolean;
  type: string;
  coverage: string;
  copyright: string;
  updated: string;
}

const ALL = '__all__';

function copyrightLabel(c: string): string {
  if (c === 'PD') return 'Public domain';
  if (c === 'LINK-OUT') return 'Link out';
  return c;
}

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b)
  );
}

/**
 * Client-side filter + sort for a category's source list. Filters by type,
 * coverage, and agency; sorts by featured, name, or year. Works without JS as
 * a plain list (the initial render shows all sources).
 */
export function CategoryFilters({ sources }: { sources: RowSource[] }) {
  const [type, setType] = useState(ALL);
  const [coverage, setCoverage] = useState(ALL);
  const [agency, setAgency] = useState(ALL);
  const [sort, setSort] = useState<'featured' | 'name' | 'updated'>('featured');

  const types = useMemo(() => uniqueSorted(sources.map((s) => s.type)), [sources]);
  const coverages = useMemo(
    () => uniqueSorted(sources.map((s) => s.coverage)),
    [sources]
  );
  const agencies = useMemo(
    () => uniqueSorted(sources.map((s) => s.agency)),
    [sources]
  );

  const filtered = useMemo(() => {
    const list = sources.filter(
      (s) =>
        (type === ALL || s.type === type) &&
        (coverage === ALL || s.coverage === coverage) &&
        (agency === ALL || s.agency === agency)
    );
    const sorted = [...list].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'updated') {
        // Descending by year, then name.
        const d = (b.updated || '').localeCompare(a.updated || '');
        return d !== 0 ? d : a.name.localeCompare(b.name);
      }
      // featured
      if (a.priority !== b.priority) return a.priority ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
    return sorted;
  }, [sources, type, coverage, agency, sort]);

  return (
    <div>
      <div className="filters">
        <div className="filter">
          <label htmlFor="f-type">Type</label>
          <select id="f-type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value={ALL}>All types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="f-coverage">Coverage</label>
          <select
            id="f-coverage"
            value={coverage}
            onChange={(e) => setCoverage(e.target.value)}
          >
            <option value={ALL}>All coverage</option>
            {coverages.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="f-agency">Agency</label>
          <select
            id="f-agency"
            value={agency}
            onChange={(e) => setAgency(e.target.value)}
          >
            <option value={ALL}>All agencies</option>
            {agencies.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="f-sort">Sort</label>
          <select
            id="f-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
          >
            <option value="featured">Featured first</option>
            <option value="name">Name (A–Z)</option>
            <option value="updated">Updated (newest)</option>
          </select>
        </div>
        <div className="filter__count" aria-live="polite">
          {filtered.length} of {sources.length}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="search__empty">No sources match these filters.</p>
      ) : (
        <div className="source-list">
          {filtered.map((s) => (
            <Link key={s.slug} href={`/sources/${s.slug}/`} className="source-row">
              <div className="source-row__head">
                <span className="source-row__name">
                  {s.priority ? <span className="star">★ </span> : null}
                  {s.name}
                </span>
              </div>
              <div className="source-row__agency">{s.agency}</div>
              {s.excerpt ? <p className="source-row__excerpt">{s.excerpt}</p> : null}
              <div className="source-row__badges">
                <div className="badges">
                  <span className="badge">
                    <span className="badge__label">Type</span>
                    {s.type}
                  </span>
                  <span className="badge">
                    <span className="badge__label">Coverage</span>
                    {s.coverage}
                  </span>
                  <span
                    className={`badge${s.copyright === 'PD' ? ' badge--pd' : ''}`}
                  >
                    {copyrightLabel(s.copyright)}
                  </span>
                  {s.updated ? (
                    <span className="badge">
                      <span className="badge__label">Updated</span>
                      {s.updated}
                    </span>
                  ) : null}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

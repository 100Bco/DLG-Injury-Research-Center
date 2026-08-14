import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllSources,
  getSourceBySlug,
  getRelatedSources,
} from '@/lib/content';
import { getCategory } from '@/lib/categories';
import { Badges } from '@/components/Badges';
import { sourceJsonLd } from '@/lib/schema';

export async function generateStaticParams() {
  const sources = await getAllSources();
  return sources.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const source = await getSourceBySlug(params.slug);
  if (!source) return {};
  const category = getCategory(source.category);
  const description =
    source.excerpt ||
    `${source.name} — ${source.type} from ${source.agency}. ${category?.name ?? ''}`.trim();
  return {
    title: source.name,
    description: description.slice(0, 300),
    alternates: { canonical: `/sources/${source.slug}/` },
    openGraph: {
      title: source.name,
      description: description.slice(0, 300),
      type: 'article',
    },
  };
}

function copyrightNote(copyright: string): string {
  if (copyright === 'PD') return 'Public domain — reproduce freely with attribution.';
  if (copyright === 'LINK-OUT')
    return 'Link out only — access and cite at the original source; not re-hosted here.';
  return copyright;
}

export default async function SourcePage({
  params,
}: {
  params: { slug: string };
}) {
  const source = await getSourceBySlug(params.slug);
  if (!source) notFound();

  const category = getCategory(source.category);
  const related = await getRelatedSources(source);
  const jsonLd = sourceJsonLd(source);

  return (
    <div className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="page-head">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          {category ? (
            <Link href={`/category/${category.slug}/`}>{category.name}</Link>
          ) : null}
          <span aria-hidden="true">/</span>
          <span>{source.name}</span>
        </div>
        <h1>
          {source.priority ? <span className="star">★ </span> : null}
          {source.name}
        </h1>
        <p className="agency">{source.agency}</p>
        <Badges source={source} />
      </div>

      <div className="detail-layout">
        <article>
          <a
            className="visit-button"
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit source →
          </a>
          <div className="visit-secondary meta">{source.url}</div>
          {source.secondary_url ? (
            <div className="visit-secondary">
              <span className="meta">Also: </span>
              <a href={source.secondary_url} target="_blank" rel="noopener noreferrer">
                {source.secondary_url}
              </a>
            </div>
          ) : null}

          <div
            className="annotation"
            style={{ marginTop: 24 }}
            dangerouslySetInnerHTML={{ __html: source.bodyHtml }}
          />
        </article>

        <aside aria-label="Source details">
          <div className="sidebar-block">
            <h2>Details</h2>
            <dl className="meta-table">
              <dt>Agency</dt>
              <dd>{source.agency}</dd>
              <dt>Type</dt>
              <dd>{source.type}</dd>
              <dt>Coverage</dt>
              <dd>{source.coverage}</dd>
              <dt>Updated</dt>
              <dd>{source.updated}</dd>
              <dt>Category</dt>
              <dd>
                {category ? (
                  <Link href={`/category/${category.slug}/`}>{category.name}</Link>
                ) : (
                  source.category
                )}
              </dd>
              <dt>Access</dt>
              <dd>{copyrightNote(source.copyright)}</dd>
            </dl>
          </div>

          {source.key_stats ? (
            <div className="sidebar-block">
              <h2>Key stats</h2>
              <p>{source.key_stats}</p>
            </div>
          ) : null}

          {source.notes ? (
            <div className="sidebar-block">
              <h2>Notes</h2>
              <p className="notes-flag">{source.notes}</p>
            </div>
          ) : null}

          {related.length > 0 ? (
            <div className="sidebar-block">
              <h2>Related sources</h2>
              <ul className="related-list">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/sources/${r.slug}/`}>{r.name}</Link>
                    <span className="meta">
                      {r.agency} · {r.type}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}

export const dynamicParams = false;

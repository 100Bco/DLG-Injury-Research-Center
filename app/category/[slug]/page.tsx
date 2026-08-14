import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categories, getCategory } from '@/lib/categories';
import { getSourcesByCategory } from '@/lib/content';
import { CategoryFilters, RowSource } from '@/components/CategoryFilters';

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = getCategory(params.slug);
  if (!category) return {};
  const sources = await getSourcesByCategory(params.slug);
  return {
    title: category.name,
    description: `${category.framing} ${sources.length} curated Texas injury data sources.`,
    alternates: { canonical: `/category/${category.slug}/` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const sources = await getSourcesByCategory(params.slug);
  const rows: RowSource[] = sources.map((s) => ({
    slug: s.slug,
    name: s.name,
    agency: s.agency,
    excerpt: s.excerpt,
    priority: !!s.priority,
    type: s.type,
    coverage: s.coverage,
    copyright: s.copyright,
    updated: s.updated,
  }));

  return (
    <div className="container">
      <div className="page-head">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>{category.name}</span>
        </div>
        <h1>{category.name}</h1>
        <p className="framing">{category.framing}</p>
      </div>

      <CategoryFilters sources={rows} />

      <p className="section-label" style={{ marginTop: 32 }}>
        Other categories
      </p>
      <nav aria-label="Other categories" className="badges">
        {categories
          .filter((c) => c.slug !== category.slug)
          .map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}/`} className="badge">
              {c.name}
            </Link>
          ))}
      </nav>
    </div>
  );
}

export const dynamicParams = false;

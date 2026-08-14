import Link from 'next/link';
import { categories } from '@/lib/categories';
import { getCategoryCounts, getSearchIndex } from '@/lib/content';
import { SearchBox } from '@/components/SearchBox';
import { site } from '@/lib/site';

export default async function HomePage() {
  const [counts, index] = await Promise.all([
    getCategoryCounts(),
    getSearchIndex(),
  ]);
  const total = index.length;

  return (
    <div className="container">
      <div className="home-intro">
        <p className="home-eyebrow">Texas Injury &amp; Crash Data</p>
        <h1>The authoritative sources, in one place.</h1>
        <p className="lede">{site.tagline}</p>
        <SearchBox index={index} />
      </div>

      <nav aria-label="Categories">
        <p className="section-label">
          Browse {total} sources across {categories.length} categories
        </p>
        <div className="category-grid">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}/`}
              className="category-card"
            >
              <div className="category-card__top">
                <span className="category-card__name">{cat.name}</span>
                <span className="category-card__count">
                  {counts[cat.slug] ?? 0}
                </span>
              </div>
              <span className="category-card__desc">{cat.description}</span>
              <span className="category-card__go">
                View sources
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

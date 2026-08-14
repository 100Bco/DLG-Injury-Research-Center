import Link from 'next/link';
import { categories, getCategory } from '@/lib/categories';
import { getAllSources, getCategoryCounts, getSearchIndex } from '@/lib/content';
import { SearchBox } from '@/components/SearchBox';
import { CategoryIcon } from '@/components/CategoryIcon';
import { site } from '@/lib/site';

export default async function HomePage() {
  const [counts, index, allSources] = await Promise.all([
    getCategoryCounts(),
    getSearchIndex(),
    getAllSources(),
  ]);
  const total = index.length;
  const featured = allSources.filter((s) => s.priority);
  const pdCount = allSources.filter((s) => s.copyright === 'PD').length;

  return (
    <div className="container">
      <section className="home-intro">
        <p className="home-eyebrow">Texas Injury &amp; Crash Data</p>
        <h1>The authoritative sources, in one place.</h1>
        <p className="lede">{site.tagline}</p>
        <SearchBox index={index} />
      </section>

      <div className="stats" aria-label="At a glance">
        <div className="stat">
          <div className="stat__num">{total}</div>
          <div className="stat__label">Curated sources</div>
        </div>
        <div className="stat">
          <div className="stat__num">{categories.length}</div>
          <div className="stat__label">Categories</div>
        </div>
        <div className="stat">
          <div className="stat__num">{featured.length}</div>
          <div className="stat__label">Featured picks</div>
        </div>
        <div className="stat">
          <div className="stat__num">{pdCount}</div>
          <div className="stat__label">Public-domain</div>
        </div>
      </div>

      {featured.length > 0 ? (
        <section aria-labelledby="featured-heading" className="home-section">
          <div className="home-section__head">
            <h2 id="featured-heading" className="home-section__title">
              Start here
            </h2>
            <p className="home-section__sub">
              The essential, most-cited sources across the directory.
            </p>
          </div>
          <div className="featured-grid">
            {featured.map((s) => {
              const cat = getCategory(s.category);
              return (
                <Link
                  key={s.slug}
                  href={`/sources/${s.slug}/`}
                  className="featured-card"
                >
                  <span className="featured-card__cat">
                    <span className="star" aria-hidden="true">
                      ★
                    </span>
                    {cat?.name ?? s.category}
                  </span>
                  <span className="featured-card__name">{s.name}</span>
                  <span className="featured-card__agency">{s.agency}</span>
                  <span className="badges">
                    <span className="badge badge--type">{s.type}</span>
                    <span className="badge badge--coverage">{s.coverage}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      <section aria-labelledby="browse-heading" className="home-section">
        <div className="home-section__head">
          <h2 id="browse-heading" className="home-section__title">
            Browse by category
          </h2>
          <p className="home-section__sub">
            {total} sources across {categories.length} categories.
          </p>
        </div>
        <nav className="category-grid" aria-label="Categories">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}/`}
              className="category-card"
            >
              <span className="category-card__icon" aria-hidden="true">
                <CategoryIcon slug={cat.slug} />
              </span>
              <span className="category-card__body">
                <span className="category-card__top">
                  <span className="category-card__name">{cat.name}</span>
                  <span className="category-card__count">
                    {counts[cat.slug] ?? 0}
                  </span>
                </span>
                <span className="category-card__desc">{cat.description}</span>
                <span className="category-card__go">
                  View sources
                  <span aria-hidden="true">→</span>
                </span>
              </span>
            </Link>
          ))}
        </nav>
      </section>
    </div>
  );
}

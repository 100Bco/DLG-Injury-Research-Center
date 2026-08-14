import Link from 'next/link';
import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { categories } from '@/lib/categories';
import { getCategoryCounts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About',
  description: `What ${site.name} is, who it is for, and how to use it.`,
  alternates: { canonical: '/about/' },
};

export default async function AboutPage() {
  const counts = await getCategoryCounts();
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="container">
      <div className="page-head">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>About</span>
        </div>
        <h1>About this directory</h1>
        <p className="framing">{site.tagline}</p>
      </div>

      <div className="annotation" style={{ marginTop: 24 }}>
        <p>
          <strong>{site.name}</strong> is a curated reference to the authoritative
          sources of Texas personal-injury, crash, fatality, and injury-health
          data. It is built for people who arrive with a specific question — a
          journalist checking a fatality figure, a researcher assembling a
          dataset, a student locating a primary source, a policy writer citing an
          official statistic — and need to find the right source quickly.
        </p>
        <p>
          It is a research reference, in the spirit of a university library
          research guide or a legal-information institute. It is not a blog, a
          news outlet, or a law firm. There is no advertising, no lead capture,
          and no advocacy. Every entry points{' '}
          <em>outward</em> to the agency or institution that produces the data;
          nothing is re-hosted here.
        </p>

        <h2>How it is organized</h2>
        <p>
          {total} sources are sorted into {categories.length} categories, from
          statewide crash statistics to occupational injury and academic
          research. Each source has its own page with a plain-language annotation:
          what it contains, what it is best for, and the caveats to keep in mind
          before you cite it. Metadata badges — source type, geographic coverage,
          copyright status, and the year last updated — appear throughout so you
          can judge a source at a glance.
        </p>

        <h2>How to read the badges</h2>
        <ul>
          <li>
            <strong>Type</strong> — the form of the source: a dataset, an annual
            report, an interactive query tool, a dashboard, or academic research.
          </li>
          <li>
            <strong>Coverage</strong> — the geography: statewide Texas, a specific
            metro, or a federal source (with <em>Federal-TX</em> marking federal
            sources that break out Texas).
          </li>
          <li>
            <strong>Public domain</strong> vs <strong>Link out</strong> — whether
            the data is a public-domain government work you may reproduce with
            attribution, or a source to be accessed and cited only at its origin.
          </li>
          <li>
            <strong>Updated</strong> — the most recent data year or release we have
            confirmed for the source.
          </li>
        </ul>

        <h2>Using the data responsibly</h2>
        <p>
          Different sources count the same events differently — a fatality within
          30 days of a crash, a hospital admission, a workers-compensation claim
          — so figures will not always agree. The annotations flag the most common
          of these differences, but you should always verify a figure against the
          primary source and note the definition and date behind it before citing
          it.
        </p>
        <p className="meta">
          This directory is a reference tool only. It is not legal advice, and it
          is not affiliated with any of the agencies or institutions listed.
        </p>
      </div>
    </div>
  );
}

# Texas Injury Data Directory

A static, curated directory of authoritative Texas personal-injury and crash
data sources. A research reference tool — in the spirit of a university library
research guide or a legal-information institute — not a blog or a law-firm site.

Users arrive with a specific question (a fatality figure to check, a dataset to
locate, a statistic to cite) and need the right primary source fast.

## Stack

- **Next.js** (App Router) with fully static output (`output: 'export'`)
- **Content:** Markdown files in `content/sources/`, one file per source
  (filename = slug). Adding a `.md` file adds a source — no CMS, no database.
- **Deploy:** Vercel (static export in `out/`)

## Getting started

```bash
npm install
npm run dev      # local dev at http://localhost:3000
npm run build    # static export to ./out
```

## Adding a source

Create `content/sources/<slug>.md` with frontmatter:

```yaml
---
name: "Austin Vision Zero — Crash Report Data"
slug: "austin-vision-zero"
category: "city-regional"       # one of the 10 category slugs below
agency: "City of Austin"
type: "Dataset"                 # Dataset | Annual report | Query tool | Dashboard | Academic
coverage: "Austin"              # Statewide | Austin | DFW | Houston | Federal | Federal-TX | ...
copyright: "PD"                 # PD (public domain) | LINK-OUT
updated: "2026"
priority: true                  # optional — featured (★) sources
url: "https://..."              # outbound link to the original source
secondary_url: "https://..."    # optional
key_stats: "..."                # optional — shown in the sidebar
notes: "..."                    # optional — shown in the sidebar
published: true                 # only published: true renders
---

Longer annotation body in Markdown — renders on the source detail page.
```

The first paragraph of the body is used as the list-row excerpt and feeds
search.

## Categories

| slug             | Display name                          |
| ---------------- | ------------------------------------- |
| crash-stats      | Texas Crash Statistics                |
| fatality         | Fatality Data                         |
| injury-health    | Injury & Health Data                  |
| trauma-hospital  | Trauma & Hospital Injury Data         |
| city-regional    | City & Regional Data                  |
| truck-commercial | Commercial / Truck Data               |
| occupational     | Occupational / Workers' Comp Injury   |
| litigation       | Litigation & Tort Data                |
| exposure         | Exposure / Traffic Volume Data        |
| academic         | Academic / Research                   |

Category display names, descriptions, and framing sentences live in
`lib/categories.ts`.

## Pages

- **Home** (`/`) — one-line description, a search box, and a grid of the 10
  categories with auto-counted source totals.
- **Category** (`/category/<slug>/`) — framing sentence and an annotated,
  filterable/sortable source list (by type, coverage, agency).
- **Source detail** (`/sources/<slug>/`) — full annotation, metadata badges, a
  prominent outbound "Visit source" button, key stats, notes, and related
  sources. Individually indexable with its own meta and Schema.org markup
  (`Dataset` for dataset-type sources, otherwise `Article`).

## Functionality

- Static page per published source; category pages and home counts are
  auto-generated from the `category` field.
- Client-side search across name, agency, and annotation body.
- Filter/sort on category pages.
- Metadata badges from frontmatter (type, coverage, copyright, updated).
- Outbound links open in a new tab with `rel="noopener noreferrer"`. LINK-OUT
  sources are never re-hosted.
- SEO: per-page meta, `sitemap.xml`, `robots.txt`, Schema.org JSON-LD.
- Responsive, keyboard accessible, respects `prefers-reduced-motion`, light/dark
  themes (system default with a manual toggle).

## Launch checklist (noindex until reviewed)

The whole site launches **noindex** — `site.noindex` in `lib/site.ts` is `true`,
which emits `noindex, nofollow` on every page and a `Disallow: /` robots.txt.

Before removing noindex:

1. Set the production domain in `lib/site.ts` (`site.url`).
2. ~~Verify the 6 flagged source URLs.~~ **Done** — all six were confirmed
   (and four corrected) on 2026-08-14: `houston-vision-zero`,
   `nctcog-regional-crash`, `nhtsa-stsi-tx`, `texas-health-data`,
   `txdmv-registration`, `txdot-traffic-count`.
3. Complete the content review, then set `site.noindex = false` and redeploy.

## Content rules

Every source links **out** to the original; nothing is re-hosted. There are no
CTAs, contact forms, promotional banners, testimonials, lead capture, or
law-firm branding anywhere. The footer states only what the site is and that it
is a reference tool.

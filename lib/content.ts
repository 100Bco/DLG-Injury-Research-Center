import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { categoryBySlug } from './categories';

/** Badge value unions kept loose (strings) so new content never breaks the build. */
export type SourceType =
  | 'Dataset'
  | 'Annual report'
  | 'Query tool'
  | 'Dashboard'
  | 'Academic'
  | string;

export type Copyright = 'PD' | 'LINK-OUT' | string;

export interface SourceFrontmatter {
  name: string;
  slug: string;
  category: string;
  agency: string;
  type: SourceType;
  coverage: string;
  copyright: Copyright;
  updated: string;
  priority?: boolean;
  url: string;
  secondary_url?: string;
  key_stats?: string;
  notes?: string;
  published?: boolean;
}

export interface Source extends SourceFrontmatter {
  /** Raw markdown annotation body. */
  body: string;
  /** Rendered HTML of the annotation body. */
  bodyHtml: string;
  /** Plain-text first-paragraph excerpt for list rows and search. */
  excerpt: string;
  /** Plain-text of the full body, for the search index. */
  plainBody: string;
}

const SOURCES_DIR = path.join(process.cwd(), 'content', 'sources');

function stripToText(markdown: string): string {
  // Lightweight markdown -> text for excerpts and search. Avoids a second
  // async pipeline; good enough for indexing and previews.
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function firstParagraph(markdown: string): string {
  const blocks = markdown.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  const first = blocks.find((b) => !b.startsWith('#')) ?? blocks[0] ?? '';
  return stripToText(first);
}

let cache: Source[] | null = null;

async function renderBody(markdown: string): Promise<string> {
  const file = await remark().use(remarkHtml, { sanitize: false }).process(markdown);
  return String(file);
}

/** Load and parse every published source. Cached per build process. */
export async function getAllSources(): Promise<Source[]> {
  if (cache) return cache;

  if (!fs.existsSync(SOURCES_DIR)) {
    cache = [];
    return cache;
  }

  const files = fs.readdirSync(SOURCES_DIR).filter((f) => f.endsWith('.md'));

  const sources = await Promise.all(
    files.map(async (file) => {
      const raw = fs.readFileSync(path.join(SOURCES_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      const fm = data as SourceFrontmatter;

      // Filename is the source of truth for the slug.
      const slug = fm.slug || file.replace(/\.md$/, '');

      const bodyHtml = await renderBody(content);
      const source: Source = {
        ...fm,
        slug,
        published: fm.published !== false,
        body: content,
        bodyHtml,
        excerpt: firstParagraph(content),
        plainBody: stripToText(content),
      };
      return source;
    })
  );

  cache = sources
    .filter((s) => s.published)
    .sort((a, b) => {
      // Priority sources first, then alphabetical by name.
      if (!!a.priority !== !!b.priority) return a.priority ? -1 : 1;
      return a.name.localeCompare(b.name);
    });

  return cache;
}

export async function getSourceBySlug(slug: string): Promise<Source | undefined> {
  const all = await getAllSources();
  return all.find((s) => s.slug === slug);
}

export async function getSourcesByCategory(categorySlug: string): Promise<Source[]> {
  const all = await getAllSources();
  return all.filter((s) => s.category === categorySlug);
}

/** Count of published sources per category slug. */
export async function getCategoryCounts(): Promise<Record<string, number>> {
  const all = await getAllSources();
  const counts: Record<string, number> = {};
  for (const s of all) {
    counts[s.category] = (counts[s.category] ?? 0) + 1;
  }
  return counts;
}

/**
 * Related sources: same category first, then same coverage, excluding self.
 * Returns up to `limit`.
 */
export async function getRelatedSources(source: Source, limit = 6): Promise<Source[]> {
  const all = await getAllSources();
  const others = all.filter((s) => s.slug !== source.slug);

  const sameCategory = others.filter((s) => s.category === source.category);
  const sameCoverage = others.filter(
    (s) => s.category !== source.category && s.coverage === source.coverage
  );

  const seen = new Set<string>();
  const related: Source[] = [];
  for (const s of [...sameCategory, ...sameCoverage]) {
    if (seen.has(s.slug)) continue;
    seen.add(s.slug);
    related.push(s);
    if (related.length >= limit) break;
  }
  return related;
}

export interface SearchDoc {
  slug: string;
  name: string;
  agency: string;
  category: string;
  categoryName: string;
  type: string;
  coverage: string;
  updated: string;
  priority: boolean;
  excerpt: string;
  /** Concatenated lowercased haystack: name + agency + body. */
  haystack: string;
}

/** Build the client-side search index. */
export async function getSearchIndex(): Promise<SearchDoc[]> {
  const all = await getAllSources();
  return all.map((s) => ({
    slug: s.slug,
    name: s.name,
    agency: s.agency,
    category: s.category,
    categoryName: categoryBySlug.get(s.category)?.name ?? s.category,
    type: s.type,
    coverage: s.coverage,
    updated: s.updated,
    priority: !!s.priority,
    excerpt: s.excerpt,
    haystack: `${s.name} ${s.agency} ${s.plainBody}`.toLowerCase(),
  }));
}

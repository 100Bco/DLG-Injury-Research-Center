import type { Source } from '@/lib/content';

function copyrightLabel(copyright: string): string {
  if (copyright === 'PD') return 'Public domain';
  if (copyright === 'LINK-OUT') return 'Link out';
  return copyright;
}

/**
 * The metadata badge row — the primary visual element of the directory.
 * Renders type, coverage, copyright, and updated year as monospace chips.
 */
export function Badges({
  source,
  showUpdated = true,
}: {
  source: Pick<Source, 'type' | 'coverage' | 'copyright' | 'updated'>;
  showUpdated?: boolean;
}) {
  return (
    <div className="badges">
      <span className="badge">
        <span className="badge__label">Type</span>
        {source.type}
      </span>
      <span className="badge">
        <span className="badge__label">Coverage</span>
        {source.coverage}
      </span>
      <span className={`badge${source.copyright === 'PD' ? ' badge--pd' : ''}`}>
        {copyrightLabel(source.copyright)}
      </span>
      {showUpdated && source.updated ? (
        <span className="badge">
          <span className="badge__label">Updated</span>
          {source.updated}
        </span>
      ) : null}
    </div>
  );
}

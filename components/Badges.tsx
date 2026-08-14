import type { Source } from '@/lib/content';

/**
 * The metadata badge row. Type is the emphasized (filled) chip; coverage is an
 * outline chip; copyright is color-coded (green = public domain, amber = link
 * out); updated year is a muted chip. Labels are omitted for a cleaner read —
 * the source detail page carries a fully labelled Details table.
 */
export function Badges({
  source,
  showUpdated = true,
}: {
  source: Pick<Source, 'type' | 'coverage' | 'copyright' | 'updated'>;
  showUpdated?: boolean;
}) {
  const isPd = source.copyright === 'PD';
  return (
    <div className="badges">
      <span className="badge badge--type">{source.type}</span>
      <span className="badge badge--coverage">{source.coverage}</span>
      <span className={`badge ${isPd ? 'badge--pd' : 'badge--linkout'}`}>
        {isPd ? 'Public domain' : 'Link out'}
      </span>
      {showUpdated && source.updated ? (
        <span className="badge badge--muted">Updated {source.updated}</span>
      ) : null}
    </div>
  );
}

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container">
      <div className="page-head">
        <h1>Page not found</h1>
        <p className="framing">
          That page does not exist. It may have been moved, or the source may have
          been removed.
        </p>
      </div>
      <p style={{ marginTop: 24 }}>
        <Link href="/">← Back to the directory</Link>
      </p>
    </div>
  );
}

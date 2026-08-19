'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      padding: '40px',
      textAlign: 'center',
    }}>
      <div>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>⚠️</div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.8rem',
          color: 'var(--primary)',
          marginBottom: '12px',
        }}>
          Something went wrong
        </h2>
        <p style={{ color: 'var(--text-light)', marginBottom: '32px', maxWidth: '400px' }}>
          An unexpected error occurred. Please try again or return to the home page.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={reset} className="btn btn-primary">
            Try Again
          </button>
          <Link href="/" className="btn btn-outline-dark">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

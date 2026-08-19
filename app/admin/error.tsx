'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function AdminError({
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
          Admin Error
        </h2>
        <p style={{ color: 'var(--text-light)', marginBottom: '32px' }}>
          Something went wrong in the admin panel.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button onClick={reset} className="btn btn-primary">Try Again</button>
          <Link href="/admin" className="btn btn-outline-dark">Admin Home</Link>
        </div>
      </div>
    </div>
  );
}

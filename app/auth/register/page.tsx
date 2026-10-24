'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    // User registrations are disabled
    router.replace('/');
  }, [router]);

  return (
    <div style={{ minHeight: '100vh', background: '#0A2540', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
      <p>Public registration is closed. Redirecting...</p>
    </div>
  );
}

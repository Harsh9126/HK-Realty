'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // User logins are removed; redirect all login attempts to the admin login portal
    router.replace('/admin/login');
  }, [router]);

  return (
    <div style={{ minHeight: '100vh', background: '#0A2540', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
      <p>Redirecting to Admin Portal...</p>
    </div>
  );
}

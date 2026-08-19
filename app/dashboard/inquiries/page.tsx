'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function InquiriesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.replace('/auth/login');
      } else {
        setUser(u);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <p style={{ color: 'var(--text-light)' }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', background: 'var(--bg)', paddingTop: '80px' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', background: '#fff', borderRight: '1px solid #E5E7EB', padding: '24px', display: 'flex', flexDirection: 'column' }} className="hide-mobile">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '32px' }}>My Account</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <Link href="/dashboard" style={{ padding: '12px 16px', color: 'var(--text-light)', borderRadius: '8px' }}>📊 Dashboard</Link>
          <Link href="/wishlist" style={{ padding: '12px 16px', color: 'var(--text-light)', borderRadius: '8px' }}>❤️ Saved Properties</Link>
          <Link href="/dashboard/inquiries" style={{ padding: '12px 16px', background: 'rgba(10,37,64,0.05)', color: 'var(--primary)', borderRadius: '8px', fontWeight: '600' }}>📨 My Inquiries</Link>
          <Link href="/dashboard/settings" style={{ padding: '12px 16px', color: 'var(--text-light)', borderRadius: '8px' }}>⚙️ Settings</Link>
        </nav>
        <button
          className="btn btn-outline-dark"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={async () => {
            const { signOut } = await import('firebase/auth');
            await signOut(auth);
            window.location.href = '/';
          }}
        >
          Log Out
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--primary)', marginBottom: '8px' }}>My Inquiries</h1>
          <p style={{ color: 'var(--text-light)', marginBottom: '32px' }}>Track the status of your property inquiries.</p>

          {/* Empty State */}
          <div className="card" style={{ padding: '60px 40px', textAlign: 'center', border: '1px dashed #E5E7EB', background: 'transparent', boxShadow: 'none' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '20px', opacity: 0.5 }}>📨</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '12px' }}>No inquiries yet</h2>
            <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', marginBottom: '28px', maxWidth: '400px', margin: '0 auto 28px' }}>
              When you submit an inquiry about a property, you'll be able to track its status here.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/properties" className="btn btn-primary">Browse Properties</Link>
              <Link href="/contact" className="btn btn-outline-dark">Contact Agent</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

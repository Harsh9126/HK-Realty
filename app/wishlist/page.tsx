'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function WishlistPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <section style={{ background: 'var(--gradient-hero)', paddingTop: '120px', paddingBottom: '60px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', color: '#fff', marginBottom: '12px' }}>Your Saved Properties</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Keep track of the properties you're interested in.
          </p>
        </div>
      </section>

      <section className="section" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
          <div className="card" style={{ padding: '60px 40px', border: '1px dashed #E5E7EB', background: 'transparent', boxShadow: 'none' }}>
            <div style={{ fontSize: '4rem', marginBottom: '24px', opacity: 0.5 }}>❤️</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '12px' }}>Your wishlist is empty</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '32px' }}>
              You haven't saved any properties yet. Browse our collections and click the heart icon to save your favorites.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/properties" className="btn btn-primary">Browse Properties</Link>
              {!loading && !user && (
                <Link href="/auth/login" className="btn btn-outline-dark">Log In to Save</Link>
              )}
            </div>
            {!loading && !user && (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '24px' }}>
                Note: You must be logged in to save properties permanently across devices.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

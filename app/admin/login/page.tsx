'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { loginWithEmail, loginWithGoogle, isUserAdmin, logout } from '@/lib/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

function AdminLoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    searchParams.get('error') === 'unauthorized'
      ? 'Access Denied: Only authorized administrators can access this portal.'
      : ''
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && isUserAdmin(user.email)) {
        window.location.replace('/admin');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAdminEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await loginWithEmail(email, password);
      const userEmail = result.user?.email;
      if (userEmail && isUserAdmin(userEmail)) {
        window.location.replace('/admin');
      } else {
        await logout();
        setError('Access Denied: This account is not an authorized administrator.');
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify admin credentials.');
      setLoading(false);
    }
  };

  const handleAdminGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await loginWithGoogle();
      const userEmail = result.user?.email;
      if (userEmail && isUserAdmin(userEmail)) {
        window.location.replace('/admin');
      } else {
        await logout();
        setError('Access Denied: Google account is not an authorized administrator.');
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'Google authentication failed.');
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0A2540 0%, #061727 60%, #030b14 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
      }}
    >
      {/* Decorative Brand Accent */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: '#fff',
            fontSize: '0.85rem',
            padding: '8px 14px',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            transition: 'all 0.2s',
          }}
        >
          <span>←</span> Back to Website
        </Link>
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(212, 175, 55, 0.25)',
          borderRadius: '24px',
          padding: '44px 36px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          color: '#fff',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              background: 'var(--gradient-gold)',
              borderRadius: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              color: 'var(--primary)',
              fontWeight: '800',
              marginBottom: '16px',
              boxShadow: '0 8px 16px rgba(212, 175, 55, 0.3)',
            }}
          >
            🛡️
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#fff',
              marginBottom: '8px',
            }}
          >
            Admin Portal
          </h1>
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.88rem',
              lineHeight: 1.5,
            }}
          >
            Restricted access. Sign in with authorized administrator credentials to manage HK Realty.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#FCA5A5',
              padding: '12px 16px',
              borderRadius: '12px',
              fontSize: '0.85rem',
              marginBottom: '20px',
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            {error}
          </div>
        )}

        {/* Google Admin Login */}
        <button
          type="button"
          onClick={handleAdminGoogleLogin}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px 20px',
            background: '#fff',
            color: '#1F2937',
            border: 'none',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '0.9rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '20px',
            transition: 'all 0.2s',
          }}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            style={{ width: '18px', height: '18px' }}
          />
          Sign in with Google Admin
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.15)' }} />
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            OR WITH EMAIL
          </span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.15)' }} />
        </div>

        {/* Email Password Form */}
        <form onSubmit={handleAdminEmailLogin}>
          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: '600',
                color: 'rgba(255,255,255,0.85)',
                marginBottom: '6px',
              }}
            >
              Admin Email
            </label>
            <input
              type="email"
              required
              placeholder="admin@hkrealty.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                fontSize: '0.92rem',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: '600',
                color: 'rgba(255,255,255,0.85)',
                marginBottom: '6px',
              }}
            >
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                fontSize: '0.92rem',
                outline: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: 'var(--gradient-gold)',
              color: 'var(--primary)',
              border: 'none',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '0.95rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 14px rgba(212, 175, 55, 0.4)',
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Admin Panel'}
          </button>
        </form>

        {/* Security Notice */}
        <div
          style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.5,
          }}
        >
          🔒 HK Realty Internal Admin System. Public registration is closed. All login attempts are verified.
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '100vh', background: '#0A2540', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#fff' }}>Loading Admin Portal...</p>
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}

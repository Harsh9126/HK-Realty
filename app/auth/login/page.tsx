'use client';

import { useState } from 'react';
import Link from 'next/link';
import { loginWithEmail, loginWithGoogle, isUserAdmin } from '@/lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const redirectAfterAuth = (userEmail?: string | null) => {
    if (userEmail && isUserAdmin(userEmail)) {
      window.location.replace('/admin');
    } else {
      window.location.replace('/');
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await loginWithEmail(email, password);
      redirectAfterAuth(result.user?.email);
    } catch (err: any) {
      setError(err.message || 'Failed to login');
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await loginWithGoogle();
      redirectAfterAuth(result.user?.email);
    } catch (err: any) {
      setError(err.message || 'Failed to login with Google');
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left Panel */}
      <div style={{ flex: 1, background: 'var(--gradient-hero)', padding: '60px', display: 'flex', flexDirection: 'column', color: '#fff' }} className="hide-mobile">
        <div style={{ marginBottom: 'auto' }}>
          <Link href="/" style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '700', color: 'var(--secondary)' }}>
            HK Realty.
          </Link>
        </div>
        
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: '700', marginBottom: '24px', lineHeight: '1.2' }}>
            Welcome back to premium real estate.
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { icon: '⭐', title: 'Save your favorites', desc: 'Keep track of properties you love in your wishlist.' },
              { icon: '📱', title: 'Manage inquiries', desc: 'Track the status of your property inquiries in real-time.' },
              { icon: '🔔', title: 'Get alerts', desc: 'Be the first to know about new premium listings.' }
            ].map(feature => (
              <div key={feature.title} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '1.5rem', background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '12px' }}>{feature.icon}</div>
                <div>
                  <h3 style={{ fontWeight: '600', fontSize: '1.1rem', marginBottom: '4px' }}>{feature.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', background: 'var(--bg)' }}>
        <div className="card" style={{ padding: '40px', width: '100%', maxWidth: '480px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '8px' }}>Log In</h2>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Enter your details to access your account</p>
          </div>

          <button 
            onClick={handleGoogleLogin} 
            disabled={loading}
            className="btn btn-outline-dark" 
            style={{ width: '100%', justifyContent: 'center', marginBottom: '24px', background: '#fff' }}
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '18px', height: '18px' }} />
            Continue with Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }}></div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }}></div>
          </div>

          <form onSubmit={handleEmailLogin}>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="your@email.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Password</label>
                <Link href="#" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600' }}>Forgot password?</Link>
              </div>
              <input 
                type="password" 
                className="form-input" 
                placeholder="••••••••" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required 
              />
            </div>

            {error && <div style={{ color: 'var(--error)', fontSize: '0.85rem', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-light)' }}>
            Don't have an account? <Link href="/auth/register" style={{ color: 'var(--primary)', fontWeight: '600' }}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

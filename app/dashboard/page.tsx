'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState('User');

  // Placeholder for real Firebase auth check
  useEffect(() => {
    // In a real app, this would check if user is logged in
    // and fetch their name.
    setUserName('Demo User');
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', background: 'var(--bg)', paddingTop: '80px' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', background: '#fff', borderRight: '1px solid #E5E7EB', padding: '24px', display: 'flex', flexDirection: 'column' }} className="hide-mobile">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '32px' }}>My Account</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <Link href="/dashboard" style={{ padding: '12px 16px', background: 'rgba(10,37,64,0.05)', color: 'var(--primary)', borderRadius: '8px', fontWeight: '600' }}>
            📊 Dashboard
          </Link>
          <Link href="/wishlist" style={{ padding: '12px 16px', color: 'var(--text-light)', borderRadius: '8px', transition: 'all 0.2s' }}>
            ❤️ Saved Properties
          </Link>
          <Link href="/dashboard/inquiries" style={{ padding: '12px 16px', color: 'var(--text-light)', borderRadius: '8px', transition: 'all 0.2s' }}>
            📨 My Inquiries
          </Link>
          <Link href="/dashboard/settings" style={{ padding: '12px 16px', color: 'var(--text-light)', borderRadius: '8px', transition: 'all 0.2s' }}>
            ⚙️ Settings
          </Link>
        </nav>
        <button className="btn btn-outline-dark" style={{ width: '100%', justifyContent: 'center' }}>
          Log Out
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--primary)', marginBottom: '8px' }}>
            Welcome back, {userName}
          </h1>
          <p style={{ color: 'var(--text-light)', marginBottom: '32px' }}>Here's an overview of your real estate journey.</p>

          {/* Stats */}
          <div className="grid-4" style={{ marginBottom: '40px' }}>
            {[
              { label: 'Saved Properties', value: '0', icon: '❤️' },
              { label: 'Active Inquiries', value: '0', icon: '📨' },
              { label: 'Site Visits', value: '0', icon: '📅' },
              { label: 'Properties Viewed', value: '12', icon: '👁️' },
            ].map(stat => (
              <div key={stat.label} className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                  {stat.icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid-2">
            {/* Wishlist Preview */}
            <div className="card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--primary)' }}>Recent Saved Properties</h2>
                <Link href="/wishlist" style={{ color: 'var(--secondary)', fontSize: '0.85rem', fontWeight: '600' }}>View All →</Link>
              </div>
              <div style={{ padding: '40px 20px', textAlign: 'center', background: '#F9FAFB', borderRadius: '12px', border: '1px dashed #E5E7EB' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px', opacity: 0.5 }}>🏘️</div>
                <h3 style={{ color: 'var(--text)', fontSize: '1.1rem', marginBottom: '8px' }}>No properties saved yet</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '16px' }}>Start exploring and save your favorite properties to view them here.</p>
                <Link href="/properties" className="btn btn-primary btn-sm">Browse Properties</Link>
              </div>
            </div>

            {/* Inquiries Preview */}
            <div className="card" style={{ padding: '32px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--primary)' }}>Recent Inquiries</h2>
                <Link href="#" style={{ color: 'var(--secondary)', fontSize: '0.85rem', fontWeight: '600' }}>View All →</Link>
              </div>
              <div style={{ padding: '40px 20px', textAlign: 'center', background: '#F9FAFB', borderRadius: '12px', border: '1px dashed #E5E7EB' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px', opacity: 0.5 }}>📨</div>
                <h3 style={{ color: 'var(--text)', fontSize: '1.1rem', marginBottom: '8px' }}>No active inquiries</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '16px' }}>When you inquire about a property, you can track the status here.</p>
                <Link href="/contact" className="btn btn-outline-dark btn-sm">Contact Agent</Link>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--primary)', marginTop: '40px', marginBottom: '20px' }}>Quick Actions</h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/projects" className="btn btn-outline-dark" style={{ background: '#fff' }}>🏗️ View New Projects</Link>
            <Link href="/calculator" className="btn btn-outline-dark" style={{ background: '#fff' }}>🔢 EMI Calculator</Link>
            <Link href="/investment" className="btn btn-outline-dark" style={{ background: '#fff' }}>📈 Investment Opportunities</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

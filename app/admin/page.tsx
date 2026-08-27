'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { isUserAdmin } from '@/lib/auth';
import { getProperties, getProjects, getInquiries, getUsers } from '@/lib/firestore';

import MobileSectionNav from '@/components/MobileSectionNav';

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/properties', label: 'Properties', icon: '🏘️' },
  { href: '/admin/projects', label: 'Projects', icon: '🏗️' },
  { href: '/admin/inquiries', label: 'Inquiries', icon: '📨' },
  { href: '/admin/users?tab=users', label: 'Users', icon: '👥' },
  { href: '/admin/users?tab=admins', label: 'Admins', icon: '🛡️' },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [stats, setStats] = useState({
    properties: 0,
    projects: 0,
    inquiries: 0,
    users: 0,
    admins: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = '/auth/login';
      } else if (!isUserAdmin(user.email)) {
        window.location.href = '/dashboard';
      } else {
        setAuthorized(true);
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (authorized) {
      const loadStats = async () => {
        try {
          const [props, projs, inqs, usrs] = await Promise.all([
            getProperties(),
            getProjects(),
            getInquiries(),
            getUsers(),
          ]);
          const regularUsers = usrs.filter((u: any) => u.role !== 'Admin');
          const adminUsers = usrs.filter((u: any) => u.role === 'Admin');
          setStats({
            properties: props.length,
            projects: projs.length,
            inquiries: inqs.length,
            users: regularUsers.length,
            admins: adminUsers.length,
          });
        } catch (err) {
          console.error('Failed to load dashboard stats:', err);
        } finally {
          setLoadingStats(false);
        }
      };
      loadStats();
    }
  }, [authorized]);

  if (!authorized) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <p style={{ color: 'var(--text-light)', fontSize: '1rem' }}>Checking admin access...</p>
      </div>
    );
  }

  return (
    <>
      <MobileSectionNav title="Admin" items={adminNavItems} />
      <div className="responsive-sidebar-container">
        {/* Sidebar */}
        <div style={{ width: '250px', background: 'var(--primary)', color: '#fff', padding: '24px', display: 'flex', flexDirection: 'column' }} className="hide-mobile">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--secondary)', marginBottom: '32px' }}>HK Realty Admin</h2>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            <Link href="/admin" style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px', fontWeight: '600' }}>
              📊 Dashboard
            </Link>
            <Link href="/admin/properties" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'all 0.2s' }}>
              🏘️ Properties
            </Link>
            <Link href="/admin/projects" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'all 0.2s' }}>
              🏗️ Projects
            </Link>
            <Link href="/admin/inquiries" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'all 0.2s' }}>
              📨 Inquiries
            </Link>
            <Link href="/admin/users?tab=users" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'all 0.2s' }}>
              👥 Users ({stats.users})
            </Link>
            <Link href="/admin/users?tab=admins" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'all 0.2s' }}>
              🛡️ Admins ({stats.admins})
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="responsive-main-content">
          <div className="container" style={{ maxWidth: '1000px', margin: '0' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: 'var(--primary)', marginBottom: '8px' }}>
              Admin Dashboard
            </h1>
            <p style={{ color: 'var(--text-light)', marginBottom: '32px' }}>Manage properties, inquiries, users, and admin accounts.</p>

            {/* Stats */}
            <div className="grid-4" style={{ marginBottom: '40px' }}>
              {[
                { label: 'Total Properties', value: loadingStats ? '...' : stats.properties.toString(), icon: '🏘️' },
                { label: 'Total Projects', value: loadingStats ? '...' : stats.projects.toString(), icon: '🏗️' },
                { label: 'New Inquiries', value: loadingStats ? '...' : stats.inquiries.toString(), icon: '📨' },
                { label: 'Registered Users', value: loadingStats ? '...' : stats.users.toString(), icon: '👥' },
              ].map(stat => (
                <div key={stat.label} className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '4px solid var(--secondary)' }}>
                  <div style={{ fontSize: '2rem' }}>
                    {stat.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--primary)' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Management Cards */}
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '24px' }}>Management Areas</h2>
            <div className="grid-2">
              <Link href="/admin/properties" className="card" style={{ padding: '28px', textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'var(--gradient-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', color: 'var(--primary)', flexShrink: 0 }}>🏘️</div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '8px' }}>Properties</h3>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '14px' }}>Add, edit, or remove property listings. Manage images and details.</p>
                  <span style={{ color: 'var(--secondary)', fontWeight: '600', fontSize: '0.85rem' }}>Manage Properties →</span>
                </div>
              </Link>

              <Link href="/admin/inquiries" className="card" style={{ padding: '28px', textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', color: '#fff', flexShrink: 0 }}>📨</div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '8px' }}>Inquiries</h3>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '14px' }}>View and respond to customer inquiries. Track lead status.</p>
                  <span style={{ color: '#10B981', fontWeight: '600', fontSize: '0.85rem' }}>Manage Inquiries →</span>
                </div>
              </Link>
              
              <Link href="/admin/projects" className="card" style={{ padding: '28px', textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', color: '#fff', flexShrink: 0 }}>🏗️</div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '8px' }}>Projects</h3>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '14px' }}>Update construction progress and details for ongoing projects.</p>
                  <span style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.85rem' }}>Manage Projects →</span>
                </div>
              </Link>

              <Link href="/admin/users?tab=users" className="card" style={{ padding: '28px', textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', color: '#fff', flexShrink: 0 }}>👥</div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '8px' }}>Users & Admins</h3>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '14px' }}>Manage registered user accounts and create new admin accounts.</p>
                  <span style={{ color: '#3B82F6', fontWeight: '600', fontSize: '0.85rem' }}>Manage Accounts →</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


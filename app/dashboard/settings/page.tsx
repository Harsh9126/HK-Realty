'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { onAuthStateChanged, updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Profile form
  const [displayName, setDisplayName] = useState('');
  const [profileMsg, setProfileMsg] = useState('');
  const [profileError, setProfileError] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);

  // Password form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.replace('/auth/login');
      } else {
        setUser(u);
        setDisplayName(u.displayName || '');
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg('');
    setProfileError('');
    setProfileLoading(true);
    try {
      await updateProfile(auth.currentUser!, { displayName });
      setProfileMsg('Profile updated successfully!');
    } catch (err: any) {
      setProfileError(err.message || 'Failed to update profile');
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg('');
    setPasswordError('');
    if (newPassword !== confirmNewPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    setPasswordLoading(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser!, credential);
      await updatePassword(auth.currentUser!, newPassword);
      setPasswordMsg('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err: any) {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setPasswordError('Current password is incorrect');
      } else {
        setPasswordError(err.message || 'Failed to change password');
      }
    } finally {
      setPasswordLoading(false);
    }
  };

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
          <Link href="/dashboard/inquiries" style={{ padding: '12px 16px', color: 'var(--text-light)', borderRadius: '8px' }}>📨 My Inquiries</Link>
          <Link href="/dashboard/settings" style={{ padding: '12px 16px', background: 'rgba(10,37,64,0.05)', color: 'var(--primary)', borderRadius: '8px', fontWeight: '600' }}>⚙️ Settings</Link>
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
        <div className="container" style={{ maxWidth: '700px', margin: '0' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--primary)', marginBottom: '8px' }}>Settings</h1>
          <p style={{ color: 'var(--text-light)', marginBottom: '40px' }}>Manage your account details and preferences.</p>

          {/* Profile Section */}
          <div className="card" style={{ padding: '32px', marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '8px' }}>Profile Information</h2>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '24px' }}>Update your display name.</p>

            <form onSubmit={handleUpdateProfile}>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  value={user?.email || ''}
                  disabled
                  style={{ opacity: 0.6, cursor: 'not-allowed' }}
                />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px' }}>Email cannot be changed.</p>
              </div>
              {profileMsg && <p style={{ color: '#10B981', fontSize: '0.9rem', marginBottom: '16px' }}>✅ {profileMsg}</p>}
              {profileError && <p style={{ color: 'var(--error)', fontSize: '0.9rem', marginBottom: '16px' }}>❌ {profileError}</p>}
              <button type="submit" className="btn btn-primary" disabled={profileLoading}>
                {profileLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Password Section */}
          <div className="card" style={{ padding: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '8px' }}>Change Password</h2>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '24px' }}>Update your account password.</p>

            <form onSubmit={handleChangePassword}>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={confirmNewPassword}
                  onChange={e => setConfirmNewPassword(e.target.value)}
                  placeholder="Repeat new password"
                  required
                />
              </div>
              {passwordMsg && <p style={{ color: '#10B981', fontSize: '0.9rem', marginBottom: '16px' }}>✅ {passwordMsg}</p>}
              {passwordError && <p style={{ color: 'var(--error)', fontSize: '0.9rem', marginBottom: '16px' }}>❌ {passwordError}</p>}
              <button type="submit" className="btn btn-primary" disabled={passwordLoading}>
                {passwordLoading ? 'Changing...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

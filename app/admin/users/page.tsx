'use client';

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getUsers, updateUserStatus, deleteUserDoc, createAdminManually, defaultSampleUsers } from '@/lib/firestore';
import MobileSectionNav from '@/components/MobileSectionNav';

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/properties', label: 'Properties', icon: '🏘️' },
  { href: '/admin/projects', label: 'Projects', icon: '🏗️' },
  { href: '/admin/inquiries', label: 'Inquiries', icon: '📨' },
  { href: '/admin/users?tab=users', label: 'Users', icon: '👥' },
  { href: '/admin/users?tab=admins', label: 'Admins', icon: '🛡️' },
];

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User';
  joinedDate: string;
  status: 'Active' | 'Blocked';
  phone?: string;
}

function AdminUsersContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'admins' ? 'admins' : 'users';

  const [activeTab, setActiveTab] = useState<'users' | 'admins'>(initialTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [allUsers, setAllUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);

  // Add Admin Modal State
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPhone, setNewAdminPhone] = useState('');
  const [creatingAdmin, setCreatingAdmin] = useState(false);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'admins') setActiveTab('admins');
    else if (tabParam === 'users') setActiveTab('users');
  }, [searchParams]);

  const fetchUsersData = async () => {
    setLoading(true);
    try {
      const dbUsers = await getUsers();
      setAllUsers((dbUsers as UserItem[]) || []);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setAllUsers(defaultSampleUsers as UserItem[]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersData();
    const unsubscribe = onAuthStateChanged(auth, () => {
      fetchUsersData();
    });
    return () => unsubscribe();
  }, []);

  const regularUsers = allUsers.filter(u => u.role !== 'Admin');
  const adminUsers = allUsers.filter(u => u.role === 'Admin');

  const currentList = activeTab === 'users' ? regularUsers : adminUsers;

  const filteredList = currentList.filter(u => 
    (u.name && u.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleStatus = async (id: string) => {
    const target = allUsers.find(u => u.id === id);
    if (!target) return;
    const newStatus = target.status === 'Active' ? 'Blocked' : 'Active';

    setAllUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
    if (selectedUser && selectedUser.id === id) {
      setSelectedUser(prev => prev ? { ...prev, status: newStatus } : null);
    }

    try {
      await updateUserStatus(id, newStatus);
    } catch (err) {
      console.error('Failed to update status in Firestore:', err);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (confirm('Are you sure you want to remove this account?')) {
      setAllUsers(prev => prev.filter(u => u.id !== id));
      if (selectedUser?.id === id) setSelectedUser(null);

      try {
        await deleteUserDoc(id);
      } catch (err) {
        console.error('Failed to delete user doc from Firestore:', err);
      }
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail || !newAdminName) return;
    setCreatingAdmin(true);
    try {
      const created = await createAdminManually({
        name: newAdminName,
        email: newAdminEmail,
        phone: newAdminPhone,
      });
      setAllUsers(prev => [created as UserItem, ...prev.filter(u => u.email.toLowerCase() !== newAdminEmail.toLowerCase())]);
      setShowAddAdminModal(false);
      setNewAdminName('');
      setNewAdminEmail('');
      setNewAdminPhone('');
      setActiveTab('admins');
    } catch (err) {
      console.error('Failed to create admin:', err);
    } finally {
      setCreatingAdmin(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <MobileSectionNav title="Admin" items={adminNavItems} />
      <div className="responsive-sidebar-container">
        {/* Sidebar */}
        <div style={{ width: '250px', background: 'var(--primary)', color: '#fff', padding: '24px', display: 'flex', flexDirection: 'column' }} className="hide-mobile">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--secondary)', marginBottom: '32px' }}>HK Realty Admin</h2>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link href="/admin" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'all 0.2s' }}>📊 Dashboard</Link>
            <Link href="/admin/properties" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'all 0.2s' }}>🏘️ Properties</Link>
            <Link href="/admin/projects" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'all 0.2s' }}>🏗️ Projects</Link>
            <Link href="/admin/inquiries" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'all 0.2s' }}>📨 Inquiries</Link>
            <button 
              onClick={() => setActiveTab('users')}
              style={{ 
                padding: '12px 16px', 
                background: activeTab === 'users' ? 'rgba(255,255,255,0.1)' : 'transparent', 
                color: activeTab === 'users' ? '#fff' : 'rgba(255,255,255,0.7)', 
                borderRadius: '8px', 
                fontWeight: activeTab === 'users' ? '600' : '400',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              👥 Users ({regularUsers.length})
            </button>
            <button 
              onClick={() => setActiveTab('admins')}
              style={{ 
                padding: '12px 16px', 
                background: activeTab === 'admins' ? 'rgba(255,255,255,0.1)' : 'transparent', 
                color: activeTab === 'admins' ? '#fff' : 'rgba(255,255,255,0.7)', 
                borderRadius: '8px', 
                fontWeight: activeTab === 'admins' ? '600' : '400',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🛡️ Admins ({adminUsers.length})
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="responsive-main-content">
          <div className="container" style={{ maxWidth: '1200px', margin: '0' }}>
            
            {/* Tabs Selector */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid #E5E7EB', paddingBottom: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveTab('users')}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeTab === 'users' ? 'var(--primary)' : '#fff',
                  color: activeTab === 'users' ? '#fff' : 'var(--text-light)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: activeTab === 'users' ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                👥 Registered Users ({regularUsers.length})
              </button>
              <button
                onClick={() => setActiveTab('admins')}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeTab === 'admins' ? 'var(--gradient-gold)' : '#fff',
                  color: activeTab === 'admins' ? 'var(--primary)' : 'var(--text-light)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: activeTab === 'admins' ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                🛡️ Admin List ({adminUsers.length})
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: 'var(--primary)', marginBottom: '8px' }}>
                  {activeTab === 'users' ? 'Manage Registered Users' : 'Manage Admin Accounts'}
                </h1>
                <p style={{ color: 'var(--text-light)' }}>
                  {activeTab === 'users' 
                    ? `Showing all ${regularUsers.length} user accounts registered on HK Realty` 
                    : `Showing all ${adminUsers.length} authorized administrator accounts`}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {activeTab === 'admins' && (
                  <button 
                    onClick={() => setShowAddAdminModal(true)} 
                    className="btn btn-primary btn-sm"
                    style={{ padding: '8px 18px', background: 'var(--gradient-gold)', color: 'var(--primary)', border: 'none', fontWeight: '700' }}
                  >
                    ➕ Add New Admin
                  </button>
                )}
                <button 
                  onClick={fetchUsersData} 
                  className="btn btn-outline-dark btn-sm"
                  style={{ padding: '8px 16px' }}
                  disabled={loading}
                >
                  {loading ? 'Refreshing...' : '🔄 Refresh List'}
                </button>
              </div>
            </div>

            <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
              <input 
                type="text" 
                placeholder={activeTab === 'users' ? "Search users by name or email..." : "Search admins by name or email..."}
                className="form-input"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ maxWidth: '400px', width: '100%' }}
              />
            </div>

            <div className="card responsive-table-container">
              {loading ? (
                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-light)' }}>
                  Loading account list...
                </div>
              ) : (
                <table style={{ width: '100%', minWidth: '650px', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                      <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                        {activeTab === 'users' ? 'User' : 'Admin'}
                      </th>
                      <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase' }}>Role</th>
                      <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase' }}>Joined Date</th>
                      <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase' }}>Status</th>
                      <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredList.map(usr => (
                      <tr key={usr.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                        <td style={{ padding: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ 
                              width: '40px', 
                              height: '40px', 
                              borderRadius: '50%', 
                              background: usr.role === 'Admin' ? 'var(--gradient-gold)' : 'var(--primary)', 
                              color: usr.role === 'Admin' ? 'var(--primary)' : '#fff', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              fontWeight: '700' 
                            }}>
                              {usr.name ? usr.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div>
                              <div style={{ fontWeight: '600', color: 'var(--primary)' }}>{usr.name}</div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{usr.email}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <span style={{ 
                            padding: '4px 10px', 
                            borderRadius: '50px', 
                            fontSize: '0.75rem', 
                            fontWeight: '700', 
                            background: usr.role === 'Admin' ? 'rgba(217,119,6,0.1)' : '#F3F4F6', 
                            color: usr.role === 'Admin' ? '#D97706' : 'var(--primary)' 
                          }}>
                            {usr.role === 'Admin' ? '🛡️ Admin' : '👤 User'}
                          </span>
                        </td>
                        <td style={{ padding: '16px', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                          {usr.joinedDate}
                        </td>
                        <td style={{ padding: '16px' }}>
                          <span style={{ color: usr.status === 'Active' ? 'var(--success)' : 'var(--error)', fontSize: '0.85rem', fontWeight: '600' }}>
                            ● {usr.status}
                          </span>
                        </td>
                        <td style={{ padding: '16px', textAlign: 'right' }}>
                          <button onClick={() => setSelectedUser(usr)} style={{ color: 'var(--info)', fontSize: '0.85rem', fontWeight: '600', marginRight: '12px', background: 'none', border: 'none', cursor: 'pointer' }}>View</button>
                          {usr.role !== 'Admin' ? (
                            <>
                              <button onClick={() => toggleStatus(usr.id)} style={{ color: usr.status === 'Active' ? '#D97706' : 'var(--success)', fontSize: '0.85rem', fontWeight: '600', marginRight: '12px', background: 'none', border: 'none', cursor: 'pointer' }}>
                                {usr.status === 'Active' ? 'Block' : 'Unblock'}
                              </button>
                              <button onClick={() => handleDeleteUser(usr.id)} style={{ color: 'var(--error)', fontSize: '0.85rem', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                            </>
                          ) : (
                            usr.email?.toLowerCase().trim() !== 'mrharsh818206@gmail.com' && (
                              <button onClick={() => handleDeleteUser(usr.id)} style={{ color: 'var(--error)', fontSize: '0.85rem', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}>Remove Admin</button>
                            )
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {!loading && filteredList.length === 0 && (
                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-light)' }}>
                  No {activeTab === 'users' ? 'users' : 'admins'} found matching "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Admin Modal */}
      {showAddAdminModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '480px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--primary)' }}>Add New Admin Account</h2>
              <button onClick={() => setShowAddAdminModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-muted)' }}>✕</button>
            </div>

            <form onSubmit={handleCreateAdmin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Vikram Sharma" 
                  value={newAdminName} 
                  onChange={e => setNewAdminName(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Admin Email Address</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="e.g. admin@hkrealty.com" 
                  value={newAdminEmail} 
                  onChange={e => setNewAdminEmail(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number (Optional)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="+91-98765-43210" 
                  value={newAdminPhone} 
                  onChange={e => setNewAdminPhone(e.target.value)} 
                />
              </div>

              <div style={{ padding: '12px', background: '#FFFBEB', borderRadius: '8px', border: '1px solid #FCD34D', color: '#92400E', fontSize: '0.85rem' }}>
                🛡️ Adding an admin grants full access to manage properties, projects, inquiries, and users in the Admin Panel.
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                <button type="button" onClick={() => setShowAddAdminModal(false)} className="btn btn-outline-dark" style={{ padding: '8px 16px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 24px', background: 'var(--gradient-gold)', color: 'var(--primary)', border: 'none', fontWeight: '700' }} disabled={creatingAdmin}>
                  {creatingAdmin ? 'Adding Admin...' : 'Add Admin Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {selectedUser && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '500px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--primary)' }}>Account Details</h2>
              <button onClick={() => setSelectedUser(null)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-muted)' }}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: '#F9FAFB', borderRadius: '12px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: selectedUser.role === 'Admin' ? 'var(--gradient-gold)' : 'var(--primary)', color: selectedUser.role === 'Admin' ? 'var(--primary)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '700' }}>
                  {selectedUser.name ? selectedUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <h3 style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--primary)' }}>{selectedUser.name}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{selectedUser.email}</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Role</span>
                  <div style={{ fontWeight: '600', color: 'var(--primary)', marginTop: '4px' }}>{selectedUser.role}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Phone</span>
                  <div style={{ fontSize: '0.9rem', color: 'var(--primary)', marginTop: '4px' }}>{selectedUser.phone || 'N/A'}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Joined Date</span>
                  <div style={{ fontSize: '0.9rem', color: 'var(--primary)', marginTop: '4px' }}>{selectedUser.joinedDate}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Status</span>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: selectedUser.status === 'Active' ? 'var(--success)' : 'var(--error)', marginTop: '4px' }}>
                    ● {selectedUser.status}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                {selectedUser.role !== 'Admin' && (
                  <button 
                    onClick={() => toggleStatus(selectedUser.id)} 
                    className="btn btn-outline-dark" 
                    style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                  >
                    {selectedUser.status === 'Active' ? 'Block Account' : 'Activate Account'}
                  </button>
                )}
                <button onClick={() => setSelectedUser(null)} className="btn btn-primary" style={{ padding: '8px 20px' }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminUsersPage() {
  return (
    <Suspense fallback={<div style={{ padding: '80px 24px', textAlign: 'center', color: 'var(--text-light)' }}>Loading users...</div>}>
      <AdminUsersContent />
    </Suspense>
  );
}

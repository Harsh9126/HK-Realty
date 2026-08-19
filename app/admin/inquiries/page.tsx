'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Inquiry } from '@/data/sampleInquiries';
import { getInquiries } from '@/lib/firestore';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const fetchInquiriesData = async () => {
    setLoading(true);
    try {
      const data = await getInquiries();
      setInquiries(data as Inquiry[]);
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiriesData();
  }, []);

  const handleUpdateStatus = (id: string, newStatus: 'new' | 'contacted' | 'closed') => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', background: 'var(--bg)', paddingTop: '80px' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', background: 'var(--primary)', color: '#fff', padding: '24px', display: 'flex', flexDirection: 'column' }} className="hide-mobile">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--secondary)', marginBottom: '32px' }}>HK Realty Admin</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link href="/admin" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'all 0.2s' }}>📊 Dashboard</Link>
          <Link href="/admin/properties" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'all 0.2s' }}>🏘️ Properties</Link>
          <Link href="/admin/projects" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'all 0.2s' }}>🏗️ Projects</Link>
          <Link href="/admin/inquiries" style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px', fontWeight: '600' }}>📨 Inquiries</Link>
          <Link href="/admin/users?tab=users" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'all 0.2s' }}>👥 Users</Link>
          <Link href="/admin/users?tab=admins" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'all 0.2s' }}>🛡️ Admins</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0' }}>
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--primary)', marginBottom: '8px' }}>Manage Inquiries</h1>
            <p style={{ color: 'var(--text-light)' }}>Track and respond to customer leads.</p>
          </div>

          <div className="card" style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                  <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase' }}>Client</th>
                  <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase' }}>Contact</th>
                  <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase' }}>Property / Interest</th>
                  <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase' }}>Date</th>
                  <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map(inq => (
                  <tr key={inq.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <td style={{ padding: '16px', fontWeight: '600', color: 'var(--primary)' }}>{inq.name}</td>
                    <td style={{ padding: '16px', fontSize: '0.85rem' }}>
                      <div>{inq.phone}</div>
                      {inq.email && <div style={{ color: 'var(--text-light)' }}>{inq.email}</div>}
                    </td>
                    <td style={{ padding: '16px', fontSize: '0.85rem', color: 'var(--text-light)' }}>{inq.propTitle}</td>
                    <td style={{ padding: '16px', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                      {new Date(inq.date).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ 
                        display: 'inline-block', 
                        padding: '4px 10px', 
                        borderRadius: '50px', 
                        fontSize: '0.75rem', 
                        fontWeight: '700', 
                        textTransform: 'uppercase',
                        background: inq.status === 'new' ? 'rgba(16,185,129,0.1)' : inq.status === 'contacted' ? 'rgba(59,130,246,0.1)' : '#F3F4F6',
                        color: inq.status === 'new' ? '#10B981' : inq.status === 'contacted' ? '#3B82F6' : '#9CA3AF'
                      }}>
                        {inq.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right' }}>
                      <button onClick={() => setSelectedInquiry(inq)} className="btn btn-outline-dark btn-sm" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {selectedInquiry && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '550px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--primary)' }}>Inquiry Details</h2>
              <button onClick={() => setSelectedInquiry(null)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-muted)' }}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '16px', background: '#F9FAFB', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Client Name</span>
                  <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--primary)' }}>{selectedInquiry.name}</div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '4px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Phone</span>
                    <div style={{ fontSize: '0.95rem', color: 'var(--primary)' }}>{selectedInquiry.phone}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Email</span>
                    <div style={{ fontSize: '0.95rem', color: 'var(--primary)' }}>{selectedInquiry.email || 'N/A'}</div>
                  </div>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Property / Interest</span>
                <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--primary)', marginTop: '4px' }}>{selectedInquiry.propTitle}</div>
              </div>

              {selectedInquiry.message && (
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Message</span>
                  <div style={{ fontSize: '0.9rem', padding: '12px', background: '#FFFBEB', borderRadius: '8px', border: '1px solid #FCD34D', color: '#92400E', marginTop: '4px' }}>
                    "{selectedInquiry.message}"
                  </div>
                </div>
              )}

              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Lead Status</span>
                <select 
                  className="form-input"
                  value={selectedInquiry.status}
                  onChange={e => handleUpdateStatus(selectedInquiry.id, e.target.value as any)}
                  style={{ fontWeight: '600' }}
                >
                  <option value="new">🟢 NEW</option>
                  <option value="contacted">🔵 CONTACTED</option>
                  <option value="closed">⚪ CLOSED</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <button onClick={() => setSelectedInquiry(null)} className="btn btn-primary" style={{ padding: '8px 24px' }}>Done</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


'use client';

import Link from 'next/link';
import { Property } from '@/data/sampleProperties';
import { useState, useEffect } from 'react';
import { getProperties, deleteProperty, updateProperty } from '@/lib/firestore';
import MobileSectionNav from '@/components/MobileSectionNav';

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/properties', label: 'Properties', icon: '🏘️' },
  { href: '/admin/projects', label: 'Projects', icon: '🏗️' },
  { href: '/admin/inquiries', label: 'Inquiries', icon: '📨' },
  { href: '/admin/users?tab=users', label: 'Users', icon: '👥' },
  { href: '/admin/users?tab=admins', label: 'Admins', icon: '🛡️' },
];

export default function AdminPropertiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProp, setEditingProp] = useState<Property | null>(null);

  const fetchPropertiesData = async () => {
    setLoading(true);
    try {
      const data = await getProperties();
      setProperties(data as Property[]);
    } catch (err) {
      console.error('Failed to fetch properties:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropertiesData();
  }, []);

  const filteredProps = properties.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      setProperties(prev => prev.filter(p => p.id !== id));
      try {
        await deleteProperty(id);
      } catch (err) {
        console.error('Failed to delete property:', err);
      }
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProp) return;
    setProperties(prev => prev.map(p => p.id === editingProp.id ? editingProp : p));
    try {
      await updateProperty(editingProp.id, editingProp);
    } catch (err) {
      console.error('Failed to update property:', err);
    }
    setEditingProp(null);
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
            <Link href="/admin/properties" style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px', fontWeight: '600' }}>🏘️ Properties</Link>
            <Link href="/admin/projects" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'all 0.2s' }}>🏗️ Projects</Link>
            <Link href="/admin/inquiries" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'all 0.2s' }}>📨 Inquiries</Link>
            <Link href="/admin/users?tab=users" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'all 0.2s' }}>👥 Users</Link>
            <Link href="/admin/users?tab=admins" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'all 0.2s' }}>🛡️ Admins</Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="responsive-main-content">
          <div className="container" style={{ maxWidth: '1200px', margin: '0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: 'var(--primary)', marginBottom: '8px' }}>Manage Properties</h1>
                <p style={{ color: 'var(--text-light)' }}>Total {properties.length} active listings</p>
              </div>
              <Link href="/admin/properties/add" className="btn btn-primary">+ Add New Property</Link>
            </div>

            <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
              <input 
                type="text" 
                placeholder="Search properties by title or location..." 
                className="form-input"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ maxWidth: '400px', width: '100%' }}
              />
            </div>

            <div className="card responsive-table-container">
              <table style={{ width: '100%', minWidth: '650px', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                    <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase' }}>Property</th>
                    <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase' }}>Type & Purpose</th>
                    <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase' }}>Price</th>
                    <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase' }}>Status</th>
                    <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProps.map(prop => (
                    <tr key={prop.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={prop.images ? prop.images[0] : prop.image} alt={prop.title} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                          <div>
                            <div style={{ fontWeight: '600', color: 'var(--primary)', marginBottom: '4px' }}>{prop.title}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{prop.location}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', background: 'rgba(10,37,64,0.1)', fontSize: '0.75rem', fontWeight: '600', color: 'var(--primary)', marginRight: '8px' }}>
                          {prop.type}
                        </span>
                        <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', background: prop.purpose === 'rent' ? 'rgba(59,130,246,0.1)' : 'rgba(16,185,129,0.1)', fontSize: '0.75rem', fontWeight: '600', color: prop.purpose === 'rent' ? '#3B82F6' : '#10B981' }}>
                          {prop.purpose}
                        </span>
                      </td>
                      <td style={{ padding: '16px', fontWeight: '600', color: 'var(--primary)' }}>
                        {prop.priceUnit}{prop.price.toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '16px' }}>
                        {prop.verified ? (
                          <span style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: '600' }}>● Active</span>
                        ) : (
                          <span style={{ color: 'var(--warning)', fontSize: '0.85rem', fontWeight: '600' }}>● Draft</span>
                        )}
                      </td>
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        <button onClick={() => setEditingProp({ ...prop })} style={{ color: 'var(--info)', fontSize: '0.85rem', fontWeight: '600', marginRight: '16px', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => handleDelete(prop.id)} style={{ color: 'var(--error)', fontSize: '0.85rem', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredProps.length === 0 && (
                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-light)' }}>
                  No properties found matching "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingProp && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--primary)' }}>Edit Property</h2>
              <button onClick={() => setEditingProp(null)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-muted)' }}>✕</button>
            </div>
            
            <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: 'var(--primary)' }}>Title</label>
                <input type="text" className="form-input" value={editingProp.title} onChange={e => setEditingProp({ ...editingProp, title: e.target.value })} required />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: 'var(--primary)' }}>Location</label>
                <input type="text" className="form-input" value={editingProp.location} onChange={e => setEditingProp({ ...editingProp, location: e.target.value })} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: 'var(--primary)' }}>Type</label>
                  <select className="form-input" value={editingProp.type} onChange={e => setEditingProp({ ...editingProp, type: e.target.value as any })}>
                    {['residential', 'commercial', 'luxury', 'agricultural', 'industrial'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: 'var(--primary)' }}>Purpose</label>
                  <select className="form-input" value={editingProp.purpose} onChange={e => setEditingProp({ ...editingProp, purpose: e.target.value as any })}>
                    <option value="buy">For Buy</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: 'var(--primary)' }}>Price (₹)</label>
                  <input type="number" className="form-input" value={editingProp.price} onChange={e => setEditingProp({ ...editingProp, price: Number(e.target.value) })} required />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                <button type="button" onClick={() => setEditingProp(null)} className="btn btn-outline-dark" style={{ padding: '8px 16px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 20px' }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

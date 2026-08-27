'use client';

import Link from 'next/link';
import { Property, sampleProperties } from '@/data/sampleProperties';
import { useState, useEffect, useRef } from 'react';
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
  // ⚡ Pre-populate with sample data so list is visible instantly
  const [properties, setProperties] = useState<Property[]>(sampleProperties as Property[]);
  const [syncing, setSyncing] = useState(true);
  const [editingProp, setEditingProp] = useState<Property | null>(null);

  // Image upload state for edit modal
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const [editNewImages, setEditNewImages] = useState<File[]>([]);
  const [editNewPreviews, setEditNewPreviews] = useState<string[]>([]);
  const [editUploading, setEditUploading] = useState(false);
  const [editUploadProgress, setEditUploadProgress] = useState(0);

  const fetchPropertiesData = async () => {
    setSyncing(true);
    try {
      const data = await getProperties();
      setProperties(data as Property[]);
    } catch (err) {
      console.error('Failed to fetch properties:', err);
    } finally {
      setSyncing(false);
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

  const openEditModal = (prop: Property) => {
    setEditingProp({ ...prop });
    setEditNewImages([]);
    setEditNewPreviews([]);
    setEditUploading(false);
    setEditUploadProgress(0);
  };

  const handleEditImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const existingCount = editingProp?.images?.length || 0;
    if (files.length + editNewImages.length + existingCount > 5) {
      alert('Maximum 5 images allowed in total');
      return;
    }
    setEditNewImages(prev => [...prev, ...files]);
    setEditNewPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
  };

  const removeExistingImage = (index: number) => {
    if (!editingProp) return;
    const updatedImages = (editingProp.images || []).filter((_, i) => i !== index);
    setEditingProp({
      ...editingProp,
      images: updatedImages,
    });
  };

  const removeNewImage = (index: number) => {
    setEditNewImages(prev => prev.filter((_, i) => i !== index));
    setEditNewPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImagesToCloudinary = async (fileList: File[]) => {
    const uploadedUrls: string[] = [];
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'unsigned_preset';

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData,
        });
        if (res.ok) {
          const data = await res.json();
          uploadedUrls.push(data.secure_url);
        }
      } catch (err) {
        console.error('Image upload failed:', err);
      }
      setEditUploadProgress(Math.round(((i + 1) / fileList.length) * 100));
    }
    return uploadedUrls;
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProp) return;

    setEditUploading(true);
    setEditUploadProgress(0);

    try {
      let finalImages = [...(editingProp.images || [])];

      // Upload new images if any
      if (editNewImages.length > 0) {
        const newUrls = await uploadImagesToCloudinary(editNewImages);
        finalImages = [...finalImages, ...newUrls];
      }

      const updatedProp = {
        ...editingProp,
        images: finalImages,
      };

      setProperties(prev => prev.map(p => p.id === updatedProp.id ? updatedProp : p));
      await updateProperty(updatedProp.id, updatedProp);
    } catch (err) {
      console.error('Failed to update property:', err);
    } finally {
      setEditUploading(false);
      setEditUploadProgress(0);
      setEditingProp(null);
      setEditNewImages([]);
      setEditNewPreviews([]);
    }
  };

  const totalImageCount = (editingProp?.images?.length || 0) + editNewImages.length;

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
                <p style={{ color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Total {properties.length} active listings
                  {syncing && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--secondary)', background: 'rgba(194,161,71,0.15)', padding: '2px 8px', borderRadius: '20px', fontWeight: '600' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--secondary)', display: 'inline-block', animation: 'pulse 1.2s infinite' }} />
                    Syncing
                  </span>}
                </p>
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
                          <img src={prop.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'} alt={prop.title} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
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
                        <button onClick={() => openEditModal(prop)} style={{ color: 'var(--info)', fontSize: '0.85rem', fontWeight: '600', marginRight: '16px', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => handleDelete(prop.id)} style={{ color: 'var(--error)', fontSize: '0.85rem', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredProps.length === 0 && (
                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-light)' }}>
                  No properties found matching &quot;{searchTerm}&quot;
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingProp && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--primary)' }}>Edit Property</h2>
              <button onClick={() => setEditingProp(null)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-muted)' }}>✕</button>
            </div>
            
            <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Image Section */}
              <div style={{ background: '#F9FAFB', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '12px', color: 'var(--primary)' }}>📷 Property Images ({totalImageCount}/5)</label>
                
                {/* Existing Images */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  {(editingProp.images || []).map((src, i) => (
                    <div key={`existing-${i}`} style={{ position: 'relative' }}>
                      <img src={src} alt={`Image ${i + 1}`} style={{ width: '80px', height: '64px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #E5E7EB' }} />
                      <button type="button" onClick={() => removeExistingImage(i)} style={{ position: 'absolute', top: '-6px', right: '-6px', width: '20px', height: '20px', borderRadius: '50%', background: '#EF4444', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                      {i === 0 && <span style={{ position: 'absolute', bottom: '2px', left: '2px', background: 'var(--secondary)', color: 'var(--primary)', fontSize: '0.55rem', fontWeight: '700', padding: '1px 4px', borderRadius: '3px' }}>MAIN</span>}
                    </div>
                  ))}

                  {/* New Image Previews */}
                  {editNewPreviews.map((src, i) => (
                    <div key={`new-${i}`} style={{ position: 'relative' }}>
                      <img src={src} alt={`New ${i + 1}`} style={{ width: '80px', height: '64px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #10B981' }} />
                      <button type="button" onClick={() => removeNewImage(i)} style={{ position: 'absolute', top: '-6px', right: '-6px', width: '20px', height: '20px', borderRadius: '50%', background: '#EF4444', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                      <span style={{ position: 'absolute', bottom: '2px', left: '2px', background: '#10B981', color: '#fff', fontSize: '0.55rem', fontWeight: '700', padding: '1px 4px', borderRadius: '3px' }}>NEW</span>
                    </div>
                  ))}

                  {/* Add More Button */}
                  {totalImageCount < 5 && (
                    <div
                      onClick={() => editFileInputRef.current?.click()}
                      style={{ width: '80px', height: '64px', border: '2px dashed #D1D5DB', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '1.3rem', transition: 'all 0.2s' }}
                    >+</div>
                  )}
                </div>
                <input ref={editFileInputRef} type="file" accept="image/*" multiple onChange={handleEditImageSelect} style={{ display: 'none' }} />
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: 0 }}>Click + to add images · PNG, JPG up to 10MB · Max 5 total</p>
              </div>

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
                    {['Apartment', 'Villa', 'Plot', 'Commercial', 'Studio', 'Penthouse', 'Duplex', 'Bungalow'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: 'var(--primary)' }}>Purpose</label>
                  <select className="form-input" value={editingProp.purpose} onChange={e => setEditingProp({ ...editingProp, purpose: e.target.value as any })}>
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: 'var(--primary)' }}>Price (₹)</label>
                  <input type="number" className="form-input" value={editingProp.price} onChange={e => setEditingProp({ ...editingProp, price: Number(e.target.value) })} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: 'var(--primary)' }}>Area (sq ft)</label>
                  <input type="number" className="form-input" value={editingProp.area} onChange={e => setEditingProp({ ...editingProp, area: Number(e.target.value) })} />
                </div>
              </div>

              {/* Upload Progress */}
              {editUploading && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Uploading new images...</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--primary)' }}>{editUploadProgress}%</span>
                  </div>
                  <div style={{ height: '6px', background: '#E5E7EB', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${editUploadProgress}%`, background: 'var(--gradient-gold)', transition: 'width 0.3s ease', borderRadius: '3px' }} />
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                <button type="button" onClick={() => setEditingProp(null)} className="btn btn-outline-dark" style={{ padding: '8px 16px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 20px' }} disabled={editUploading}>
                  {editUploading ? `Uploading... ${editUploadProgress}%` : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

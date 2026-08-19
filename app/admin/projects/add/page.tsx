'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '@/lib/firebase';

export default function AddProjectPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: '',
    location: '',
    startingPrice: '',
    priceUnit: '₹',
    type: 'Residential',
    status: 'ongoing',
    progress: '0',
    completionDate: '',
    totalUnits: '',
    description: '',
    amenities: '',
    highlights: '',
  });

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 8) {
      setError('Maximum 8 images allowed');
      return;
    }
    setError('');
    const newFiles = [...images, ...files];
    setImages(newFiles);
    setPreviews(newFiles.map(f => URL.createObjectURL(f)));
  };

  const removeImage = (index: number) => {
    const newFiles = images.filter((_, i) => i !== index);
    setImages(newFiles);
    setPreviews(newFiles.map(f => URL.createObjectURL(f)));
  };

  const uploadImages = async (): Promise<string[]> => {
    const urls: string[] = [];
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      const storageRef = ref(storage, `projects/${Date.now()}-${file.name}`);
      await new Promise<void>((resolve, reject) => {
        const task = uploadBytesResumable(storageRef, file);
        task.on('state_changed',
          (snap) => setUploadProgress(Math.round(((i / images.length) + (snap.bytesTransferred / snap.totalBytes / images.length)) * 100)),
          reject,
          async () => {
            const url = await getDownloadURL(task.snapshot.ref);
            urls.push(url);
            resolve();
          }
        );
      });
    }
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) { setError('Please upload at least one image'); return; }
    setUploading(true);
    setError('');
    try {
      const imageUrls = await uploadImages();
      await addDoc(collection(db, 'projects'), {
        ...form,
        startingPrice: Number(form.startingPrice),
        progress: Number(form.progress),
        totalUnits: Number(form.totalUnits),
        amenities: form.amenities.split(',').map(a => a.trim()).filter(Boolean),
        highlights: form.highlights.split(',').map(h => h.trim()).filter(Boolean),
        images: imageUrls,
        createdAt: serverTimestamp(),
      });
      setSuccess('Project added successfully!');
      setTimeout(() => router.push('/admin/projects'), 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to add project');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const inputStyle = { width: '100%', padding: '10px 14px', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', background: '#fff' };
  const labelStyle = { display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px' };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', background: 'var(--bg)', paddingTop: '80px' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', background: 'var(--primary)', color: '#fff', padding: '24px', display: 'flex', flexDirection: 'column' }} className="hide-mobile">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--secondary)', marginBottom: '32px' }}>HK Realty Admin</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link href="/admin" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px' }}>📊 Dashboard</Link>
          <Link href="/admin/properties" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px' }}>🏘️ Properties</Link>
          <Link href="/admin/projects" style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px', fontWeight: '600' }}>🏗️ Projects</Link>
          <Link href="/admin/inquiries" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px' }}>📨 Inquiries</Link>
        </nav>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <div style={{ maxWidth: '800px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <Link href="/admin/projects" style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>← Back</Link>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--primary)' }}>Add New Project</h1>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Image Upload */}
            <div className="card" style={{ padding: '28px', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '20px' }}>📷 Project Images</h2>
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{ border: '2px dashed #D1D5DB', borderRadius: '12px', padding: '32px', textAlign: 'center', cursor: 'pointer', marginBottom: '16px', background: '#F9FAFB', transition: 'all 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--secondary)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#D1D5DB')}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🏗️</div>
                <p style={{ color: 'var(--primary)', fontWeight: '600', marginBottom: '4px' }}>Click to upload project images</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>PNG, JPG up to 10MB each · Max 8 images</p>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageSelect} style={{ display: 'none' }} />

              {previews.length > 0 && (
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {previews.map((src, i) => (
                    <div key={i} style={{ position: 'relative' }}>
                      <img src={src} alt={`Preview ${i + 1}`} style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #E5E7EB' }} />
                      <button type="button" onClick={() => removeImage(i)} style={{ position: 'absolute', top: '-8px', right: '-8px', width: '22px', height: '22px', borderRadius: '50%', background: '#EF4444', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                      {i === 0 && <span style={{ position: 'absolute', bottom: '4px', left: '4px', background: 'var(--secondary)', color: 'var(--primary)', fontSize: '0.6rem', fontWeight: '700', padding: '1px 5px', borderRadius: '4px' }}>MAIN</span>}
                    </div>
                  ))}
                  {images.length < 8 && (
                    <div onClick={() => fileInputRef.current?.click()} style={{ width: '100px', height: '80px', border: '2px dashed #D1D5DB', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '1.5rem' }}>+</div>
                  )}
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="card" style={{ padding: '28px', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '20px' }}>🏗️ Project Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={labelStyle}>Project Name *</label>
                  <input style={inputStyle} name="name" value={form.name} onChange={handleChange} placeholder="e.g. Skyline Residency" required />
                </div>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={labelStyle}>Location *</label>
                  <input style={inputStyle} name="location" value={form.location} onChange={handleChange} placeholder="e.g. Powai, Mumbai" required />
                </div>
                <div>
                  <label style={labelStyle}>Project Type *</label>
                  <select style={inputStyle} name="type" value={form.type} onChange={handleChange}>
                    {['Residential', 'Commercial', 'Mixed Use', 'Township', 'Villa', 'Plotted Development'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Status *</label>
                  <select style={inputStyle} name="status" value={form.status} onChange={handleChange}>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>
                {form.status === 'ongoing' && (
                  <div>
                    <label style={labelStyle}>Progress (%) *</label>
                    <input style={inputStyle} name="progress" type="number" value={form.progress} onChange={handleChange} min="0" max="100" />
                  </div>
                )}
                <div>
                  <label style={labelStyle}>Completion Date</label>
                  <input style={inputStyle} name="completionDate" type="month" value={form.completionDate} onChange={handleChange} />
                </div>
                <div>
                  <label style={labelStyle}>Total Units</label>
                  <input style={inputStyle} name="totalUnits" type="number" value={form.totalUnits} onChange={handleChange} placeholder="e.g. 120" />
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="card" style={{ padding: '28px', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '20px' }}>💰 Starting Price</h2>
              <div style={{ display: 'flex', gap: '8px', maxWidth: '300px' }}>
                <select style={{ ...inputStyle, width: '60px', padding: '10px 6px' }} name="priceUnit" value={form.priceUnit} onChange={handleChange}>
                  <option>₹</option><option>$</option>
                </select>
                <input style={inputStyle} name="startingPrice" type="number" value={form.startingPrice} onChange={handleChange} placeholder="e.g. 5000000" required />
              </div>
            </div>

            {/* Description */}
            <div className="card" style={{ padding: '28px', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '20px' }}>📝 Description & Features</h2>
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Project Description *</label>
                <textarea style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }} name="description" value={form.description} onChange={handleChange} placeholder="Describe the project..." required />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Amenities (comma separated)</label>
                <input style={inputStyle} name="amenities" value={form.amenities} onChange={handleChange} placeholder="e.g. Clubhouse, Swimming Pool, Gym, Kids Play Area" />
              </div>
              <div>
                <label style={labelStyle}>Key Highlights (comma separated)</label>
                <input style={inputStyle} name="highlights" value={form.highlights} onChange={handleChange} placeholder="e.g. RERA Approved, Prime Location, Eco Friendly" />
              </div>
            </div>

            {error && <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', padding: '12px 16px', color: '#DC2626', marginBottom: '16px' }}>❌ {error}</div>}
            {success && <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '12px 16px', color: '#16A34A', marginBottom: '16px' }}>✅ {success}</div>}

            {uploading && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Uploading images...</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--primary)' }}>{uploadProgress}%</span>
                </div>
                <div style={{ height: '6px', background: '#E5E7EB', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${uploadProgress}%`, background: 'var(--gradient-gold)', transition: 'width 0.3s ease', borderRadius: '3px' }} />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '16px' }}>
              <button type="submit" className="btn btn-primary" disabled={uploading} style={{ minWidth: '180px', justifyContent: 'center' }}>
                {uploading ? `Uploading... ${uploadProgress}%` : '✅ Save Project'}
              </button>
              <Link href="/admin/projects" className="btn btn-outline-dark">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

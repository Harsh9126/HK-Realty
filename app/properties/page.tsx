'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import { sampleProperties } from '@/data/sampleProperties';

const purposes = ['all', 'buy', 'rent'];
const types = ['all', 'residential', 'commercial', 'luxury', 'industrial', 'agricultural'];
const budgets = [
  { label: 'Any Budget', min: 0, max: Infinity },
  { label: 'Under 25L', min: 0, max: 2500000 },
  { label: '25L to 50L', min: 2500000, max: 5000000 },
  { label: '50L to 1Cr', min: 5000000, max: 10000000 },
  { label: '1Cr to 3Cr', min: 10000000, max: 30000000 },
  { label: 'Above 3Cr', min: 30000000, max: Infinity },
];

export default function PropertiesPage() {
  const [purpose, setPurpose] = useState('all');
  const [type, setType] = useState('all');
  const [budgetIdx, setBudgetIdx] = useState(0);
  const [location, setLocation] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [compareList, setCompareList] = useState<string[]>([]);

  const filtered = useMemo(() => {
    let props = [...sampleProperties];
    if (purpose !== 'all') props = props.filter(p => p.purpose === purpose);
    if (type !== 'all') props = props.filter(p => p.type === type);
    const budget = budgets[budgetIdx];
    props = props.filter(p => p.price >= budget.min && p.price <= budget.max);
    if (location.trim()) props = props.filter(p => p.location.toLowerCase().includes(location.toLowerCase()) || p.city.toLowerCase().includes(location.toLowerCase()));
    if (sortBy === 'price-asc') props.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') props.sort((a, b) => b.price - a.price);
    else props.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return props;
  }, [purpose, type, budgetIdx, location, sortBy]);

  const handleCompare = (id: string) => {
    setCompareList(prev => prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev);
  };

  return (
    <>
      <section style={{ background: 'var(--gradient-hero)', paddingTop: '120px', paddingBottom: '60px' }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="section-label">Premium Listings</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', color: '#fff', marginBottom: '12px' }}>Browse Properties</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem' }}>Discover verified properties across India</p>
          </div>
          <div style={{ marginTop: '36px', display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', borderRadius: '16px', padding: '12px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search by city or locality..."
              value={location}
              onChange={e => setLocation(e.target.value)}
              style={{ flex: '1 1 200px', padding: '12px 16px', borderRadius: '10px', border: 'none', background: 'rgba(255,255,255,0.95)', fontSize: '0.9rem', outline: 'none' }}
            />
            <select value={purpose} onChange={e => setPurpose(e.target.value)} style={{ flex: '1 1 120px', padding: '12px 16px', borderRadius: '10px', border: 'none', background: 'rgba(255,255,255,0.95)', fontSize: '0.9rem', outline: 'none' }}>
              {purposes.map(p => <option key={p} value={p}>{p === 'all' ? 'Any Purpose' : p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
            </select>
            <select value={type} onChange={e => setType(e.target.value)} style={{ flex: '1 1 130px', padding: '12px 16px', borderRadius: '10px', border: 'none', background: 'rgba(255,255,255,0.95)', fontSize: '0.9rem', outline: 'none' }}>
              {types.map(t => <option key={t} value={t}>{t === 'all' ? 'Any Type' : t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
            </select>
            <select value={budgetIdx} onChange={e => setBudgetIdx(Number(e.target.value))} style={{ flex: '1 1 130px', padding: '12px 16px', borderRadius: '10px', border: 'none', background: 'rgba(255,255,255,0.95)', fontSize: '0.9rem', outline: 'none' }}>
              {budgets.map((b, i) => <option key={b.label} value={i}>{b.label}</option>)}
            </select>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg)', paddingTop: '40px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Showing <strong style={{ color: 'var(--primary)' }}>{filtered.length}</strong> properties</p>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="form-select" style={{ width: 'auto', padding: '8px 16px', fontSize: '0.85rem' }}>
                <option value="newest">Sort: Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <div style={{ display: 'flex', gap: '4px' }}>
                {(['grid', 'list'] as const).map(mode => (
                  <button key={mode} onClick={() => setViewMode(mode)} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #E5E7EB', background: viewMode === mode ? 'var(--primary)' : 'var(--accent)', color: viewMode === mode ? '#fff' : 'var(--text)', cursor: 'pointer', fontSize: '0.85rem' }}>
                    {mode === 'grid' ? 'Grid' : 'List'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {compareList.length > 0 && (
            <div style={{ background: 'var(--primary)', borderRadius: '12px', padding: '16px 24px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff', flexWrap: 'wrap', gap: '12px' }}>
              <span>{compareList.length} properties selected for comparison</span>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Link href={'/compare?ids=' + compareList.join(',')} className="btn btn-primary btn-sm">Compare Now</Link>
                <button onClick={() => setCompareList([])} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem' }}>Clear</button>
              </div>
            </div>
          )}

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: '4rem', marginBottom: '16px' }}>No results</div>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', marginBottom: '12px' }}>No properties found</h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>Try adjusting your search filters</p>
              <button onClick={() => { setPurpose('all'); setType('all'); setBudgetIdx(0); setLocation(''); }} className="btn btn-primary">Clear All Filters</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(300px, 1fr))' : '1fr', gap: '24px' }}>
              {filtered.map(property => (
                <PropertyCard key={property.id} property={property} showCompare onCompare={handleCompare} isCompared={compareList.includes(property.id)} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

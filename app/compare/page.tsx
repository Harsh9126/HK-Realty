'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { sampleProperties, Property } from '@/data/sampleProperties';

function CompareContent() {
  const searchParams = useSearchParams();
  const ids = searchParams.get('ids')?.split(',') || [];
  
  const properties = ids
    .map(id => sampleProperties.find(p => p.id === id))
    .filter((p): p is Property => p !== undefined);

  if (properties.length === 0) {
    return (
      <div className="card" style={{ padding: '60px 40px', textAlign: 'center', border: '1px dashed #E5E7EB', background: 'transparent', boxShadow: 'none' }}>
        <div style={{ fontSize: '4rem', marginBottom: '24px', opacity: 0.5 }}>⚖️</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '12px' }}>No properties selected</h2>
        <p style={{ color: 'var(--text-light)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
          Go to the properties listing, select up to 3 properties to compare their features side-by-side.
        </p>
        <Link href="/properties" className="btn btn-primary">Browse Properties</Link>
      </div>
    );
  }

  return (
    <div>
      <p className="show-mobile" style={{ fontSize: '0.8rem', color: 'var(--secondary)', fontWeight: '600', marginBottom: '12px', textAlign: 'center' }}>
        👈 Swipe table horizontally to compare all features 👉
      </p>
      <div className="responsive-table-container" style={{ paddingBottom: '20px' }}>
        <table style={{ width: '100%', minWidth: '750px', borderCollapse: 'collapse', textAlign: 'left', background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
        <thead>
          <tr>
            <th style={{ width: '200px', padding: '24px', background: '#F9FAFB', borderBottom: '2px solid #E5E7EB', color: 'var(--primary)', fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>Features</th>
            {properties.map(p => (
              <th key={p.id} style={{ padding: '24px', background: '#F9FAFB', borderBottom: '2px solid #E5E7EB', borderLeft: '1px solid #E5E7EB', width: `${100 / properties.length}%` }}>
                <div style={{ position: 'relative', height: '160px', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}>
                  <img src={p.images[0]} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '8px', left: '8px', background: 'var(--gradient-gold)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    {p.type}
                  </div>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '8px', lineHeight: '1.3' }}>{p.title}</h3>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--secondary)', fontWeight: 'bold' }}>
                  {p.priceUnit}{p.price.toLocaleString('en-IN')}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { label: 'Location', key: 'location' },
            { label: 'City', key: 'city' },
            { label: 'Purpose', key: 'purpose' },
            { label: 'Area', render: (p: Property) => `${p.area} ${p.areaUnit}` },
            { label: 'Bedrooms', key: 'bedrooms' },
            { label: 'Bathrooms', key: 'bathrooms' },
            { label: 'Status', render: (p: Property) => p.verified ? 'Verified' : 'Unverified' },
          ].map((row, i) => (
            <tr key={row.label} style={{ borderBottom: '1px solid #E5E7EB', background: i % 2 === 0 ? '#fff' : '#F9FAFB' }}>
              <td style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-muted)' }}>{row.label}</td>
              {properties.map(p => (
                <td key={p.id} style={{ padding: '16px 24px', borderLeft: '1px solid #E5E7EB', color: 'var(--text)' }}>
                  {row.render ? row.render(p) : (p as any)[row.key as string] || '-'}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-muted)', borderBottom: '1px solid #E5E7EB' }}>Amenities</td>
            {properties.map(p => (
              <td key={p.id} style={{ padding: '16px 24px', borderLeft: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {p.amenities.map(a => <span key={a} style={{ background: 'rgba(10,37,64,0.05)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--text-light)' }}>{a}</span>)}
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td style={{ padding: '24px', background: '#fff' }}></td>
            {properties.map(p => (
              <td key={p.id} style={{ padding: '24px', borderLeft: '1px solid #E5E7EB', background: '#fff', textAlign: 'center' }}>
                <Link href={`/properties/${p.id}`} className="btn btn-outline-dark btn-sm" style={{ width: '100%', justifyContent: 'center' }}>View Details</Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function ComparePage() {
  return (
    <>
      <section style={{ background: 'var(--gradient-hero)', paddingTop: '120px', paddingBottom: '60px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', color: '#fff', marginBottom: '12px' }}>Compare Properties</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Evaluate features side-by-side to find your perfect match.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Suspense fallback={<div className="skeleton" style={{ height: '400px', width: '100%', borderRadius: '12px' }}></div>}>
            <CompareContent />
          </Suspense>
        </div>
      </section>
    </>
  );
}

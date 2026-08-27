'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { sampleProperties } from '@/data/sampleProperties';
import InquiryForm from '@/components/InquiryForm';
import PropertyCard from '@/components/PropertyCard';
import MortgageCalculator from '@/components/MortgageCalculator';

const placeholderGradients = [
  'linear-gradient(135deg, #0A2540 0%, #1a3a5c 100%)',
  'linear-gradient(135deg, #1a3a5c 0%, #0d3060 100%)',
  'linear-gradient(135deg, #061829 0%, #0A2540 100%)',
];

function formatPrice(price: number, unit: string, purpose: string): string {
  const suffix = purpose === 'rent' ? '/month' : '';
  if (price >= 10000000) return unit + (price / 10000000).toFixed(2) + ' Cr' + suffix;
  if (price >= 100000) return unit + (price / 100000).toFixed(1) + ' L' + suffix;
  return unit + price.toLocaleString('en-IN') + suffix;
}

export default function PropertyDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const property = sampleProperties.find(p => p.id === id);
  const [activeTab, setActiveTab] = useState<'overview' | 'calculator' | 'inquiry'>('overview');
  const [imgError, setImgError] = useState(false);
  const gradientIndex = id ? id.charCodeAt(id.length - 1) % placeholderGradients.length : 0;

  if (!property) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px', paddingTop: '80px' }}>
        <div style={{ fontSize: '5rem' }}>Not Found</div>
        <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)' }}>Property Not Found</h1>
        <Link href="/properties" className="btn btn-primary">Browse All Properties</Link>
      </div>
    );
  }

  const similar = sampleProperties.filter(p => p.id !== id && p.type === property.type).slice(0, 3);

  return (
    <>
      <section style={{ paddingTop: '80px' }}>
        <div style={{ height: '420px', position: 'relative', overflow: 'hidden' }}>
          {!imgError ? (
            <img src={property.images[0]} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={() => setImgError(true)} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: placeholderGradients[gradientIndex], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>
                <div style={{ fontSize: '5rem' }}>Property Image</div>
              </div>
            </div>
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(10,37,64,0.9) 100%)' }} />
          <div className="container" style={{ position: 'absolute', bottom: '32px', left: 0, right: 0 }}>
            <Link href="/properties" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>Back to Properties</Link>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>{property.title}</h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>{property.location}</p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div className="detail-layout-grid">
            <div>
              <div className="card" style={{ padding: '28px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '700', color: 'var(--primary)' }}>{formatPrice(property.price, property.priceUnit, property.purpose)}</div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>{property.area} {property.areaUnit}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <a href={'tel:' + property.agentPhone} className="btn btn-primary">Call Agent</a>
                    <a href={'https://wa.me/' + property.agentPhone.replace(/\D/g, '')} className="btn btn-outline-dark">WhatsApp</a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '24px', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #E5E7EB', flexWrap: 'wrap' }}>
                  {property.bedrooms && <div style={{ textAlign: 'center' }}><div style={{ fontWeight: '700', color: 'var(--primary)' }}>{property.bedrooms}</div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Bedrooms</div></div>}
                  {property.bathrooms && <div style={{ textAlign: 'center' }}><div style={{ fontWeight: '700', color: 'var(--primary)' }}>{property.bathrooms}</div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Bathrooms</div></div>}
                  <div style={{ textAlign: 'center' }}><div style={{ fontWeight: '700', color: 'var(--primary)' }}>{property.area}</div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{property.areaUnit}</div></div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', background: '#E5E7EB', borderRadius: '12px', padding: '4px' }}>
                {(['overview', 'calculator', 'inquiry'] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: '10px', borderRadius: '8px', background: activeTab === tab ? 'var(--primary)' : 'transparent', color: activeTab === tab ? '#fff' : 'var(--text-light)', fontWeight: activeTab === tab ? '600' : '400', fontSize: '0.9rem', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>
                    {tab === 'overview' ? 'Overview' : tab === 'calculator' ? 'Mortgage' : 'Inquire'}
                  </button>
                ))}
              </div>

              {activeTab === 'overview' && (
                <div>
                  <div className="card" style={{ padding: '28px', marginBottom: '24px' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '16px' }}>About This Property</h2>
                    <p style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>{property.description}</p>
                  </div>
                  <div className="card" style={{ padding: '28px', marginBottom: '24px' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '16px' }}>Amenities</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
                      {property.amenities.map(amenity => (
                        <div key={amenity} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: 'var(--bg)', borderRadius: '10px', fontSize: '0.85rem', fontWeight: '500', color: 'var(--text)' }}>
                          <span style={{ color: 'var(--success)' }}>✓</span> {amenity}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'calculator' && (
                <div className="card" style={{ padding: '32px' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '24px' }}>Mortgage Calculator</h2>
                  <MortgageCalculator />
                </div>
              )}
              {activeTab === 'inquiry' && (
                <div className="card" style={{ padding: '32px' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '24px' }}>Send an Inquiry</h2>
                  <InquiryForm propertyId={property.id} propertyTitle={property.title} />
                </div>
              )}
            </div>

            <div>
              <div className="card" style={{ padding: '24px', marginBottom: '20px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', marginBottom: '16px' }}>Your Agent</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: '700', color: 'var(--secondary)', flexShrink: 0 }}>
                    {property.agentName.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--primary)' }}>{property.agentName}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Senior Property Consultant</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a href={'tel:' + property.agentPhone} className="btn btn-primary" style={{ justifyContent: 'center' }}>Call {property.agentPhone}</a>
                  <a href={'https://wa.me/' + property.agentPhone.replace(/\D/g, '')} className="btn btn-outline-dark btn-sm" style={{ justifyContent: 'center' }}>WhatsApp Chat</a>
                </div>
              </div>
            </div>
          </div>

          {similar.length > 0 && (
            <div style={{ marginTop: '64px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--primary)', marginBottom: '32px' }}>Similar Properties</h2>
              <div className="grid-3">
                {similar.map(p => <PropertyCard key={p.id} property={p} />)}
              </div>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .detail-layout-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 32px;
          margin-top: -40px;
          position: relative;
          z-index: 1;
          align-items: start;
        }
        @media (max-width: 1024px) {
          .detail-layout-grid {
            grid-template-columns: 1fr;
            margin-top: 16px;
          }
        }
      `}</style>
    </>
  );
}

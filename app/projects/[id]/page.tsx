'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { sampleProjects } from '@/data/sampleProjects';
import InquiryForm from '@/components/InquiryForm';

function formatPrice(price: number, unit: string): string {
  if (price >= 10000000) return `${unit}${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `${unit}${(price / 100000).toFixed(1)} L`;
  return `${unit}${price.toLocaleString('en-IN')}`;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const project = sampleProjects.find(p => p.id === id);
  const [imgError, setImgError] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'inquiry'>('details');

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px', paddingTop: '80px' }}>
        <div style={{ fontSize: '5rem' }}>🏗️</div>
        <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)' }}>Project Not Found</h1>
        <Link href="/projects" className="btn btn-primary">View All Projects</Link>
      </div>
    );
  }

  const soldPct = project.totalUnits && project.soldUnits
    ? Math.round((project.soldUnits / project.totalUnits) * 100)
    : null;

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: '80px' }}>
        <div style={{ height: '460px', position: 'relative', overflow: 'hidden', background: 'var(--gradient-hero)' }}>
          {!imgError ? (
            <img src={project.images[0]} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={() => setImgError(true)} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>
                <div style={{ fontSize: '5rem', marginBottom: '12px' }}>🏗️</div>
                <div style={{ fontSize: '1.2rem' }}>{project.type}</div>
              </div>
            </div>
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(10,37,64,0.92) 100%)' }} />
          <div className="container" style={{ position: 'absolute', bottom: '40px', left: 0, right: 0 }}>
            <Link href="/projects" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
              ← All Projects
            </Link>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <span style={{
                background: project.status === 'ongoing' ? 'rgba(245, 158, 11, 0.9)' : 'rgba(16, 185, 129, 0.9)',
                color: '#fff', padding: '4px 12px', borderRadius: '50px', fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase',
              }}>
                {project.status === 'ongoing' ? 'Under Construction' : 'Completed'}
              </span>
              <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '4px 12px', borderRadius: '50px', fontSize: '0.72rem', fontWeight: '600', backdropFilter: 'blur(8px)' }}>
                {project.type}
              </span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>{project.name}</h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>📍 {project.location}</p>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', marginTop: '-40px', position: 'relative', zIndex: 1, alignItems: 'start' }}>
            {/* Left */}
            <div>
              {/* Key Stats */}
              <div className="card" style={{ padding: '28px', marginBottom: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                  {[
                    { label: 'Starting Price', value: formatPrice(project.startingPrice, project.priceUnit) },
                    { label: 'Total Units', value: String(project.totalUnits) },
                    { label: project.status === 'ongoing' ? 'Booked' : 'Delivered', value: `${soldPct}%` },
                    { label: 'City', value: project.city },
                  ].map((item, i) => (
                    <div key={item.label} style={{ textAlign: 'center', borderLeft: i > 0 ? '1px solid #E5E7EB' : 'none', paddingLeft: i > 0 ? '20px' : 0 }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: '700', color: 'var(--primary)' }}>{item.value}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', background: '#E5E7EB', borderRadius: '12px', padding: '4px' }}>
                {(['details', 'inquiry'] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: '10px', borderRadius: '8px', background: activeTab === tab ? 'var(--primary)' : 'transparent', color: activeTab === tab ? '#fff' : 'var(--text-light)', fontWeight: activeTab === tab ? '600' : '400', fontSize: '0.9rem', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>
                    {tab === 'details' ? 'Project Details' : 'Book / Inquire'}
                  </button>
                ))}
              </div>

              {activeTab === 'details' && (
                <div>
                  <div className="card" style={{ padding: '28px', marginBottom: '24px' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '16px' }}>About This Project</h2>
                    <p style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>{project.description}</p>
                  </div>

                  {project.status === 'ongoing' && typeof project.progress === 'number' && (
                    <div className="card" style={{ padding: '28px', marginBottom: '24px' }}>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '20px' }}>Construction Progress</h2>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ fontWeight: '600' }}>Overall Progress</span>
                        <span style={{ fontWeight: '700', color: 'var(--secondary)', fontSize: '1.2rem' }}>{project.progress}%</span>
                      </div>
                      <div className="progress-bar" style={{ height: '16px' }}>
                        <div className="progress-fill" style={{ width: `${project.progress}%` }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <span>Expected Completion: <strong style={{ color: 'var(--text)' }}>{project.expectedCompletion}</strong></span>
                        <span>{project.soldUnits} / {project.totalUnits} units booked</span>
                      </div>
                    </div>
                  )}

                  <div className="card" style={{ padding: '28px', marginBottom: '24px' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '16px' }}>Project Highlights</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                      {project.highlights.map(h => (
                        <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px', background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '500', color: 'var(--primary)' }}>
                          <span style={{ color: 'var(--secondary)', fontWeight: '700', flexShrink: 0 }}>✦</span> {h}
                        </div>
                      ))}
                    </div>
                  </div>

                  {project.testimonial && (
                    <div className="card" style={{ padding: '28px', background: 'var(--gradient-primary)' }}>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: '#fff', marginBottom: '20px' }}>Client Testimonial</h2>
                      <div style={{ padding: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '16px', borderLeft: '4px solid var(--secondary)' }}>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', fontStyle: 'italic', lineHeight: '1.8', marginBottom: '16px' }}>&quot;{project.testimonial}&quot;</p>
                        <p style={{ color: 'var(--secondary)', fontWeight: '600' }}>— {project.testimonialAuthor}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'inquiry' && (
                <div className="card" style={{ padding: '32px' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '8px' }}>Book / Inquire</h2>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '24px' }}>Interested in {project.name}? Get in touch now.</p>
                  <InquiryForm propertyId={project.id} propertyTitle={project.name} />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <div className="card" style={{ padding: '24px', marginBottom: '20px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', marginBottom: '16px' }}>Project Info</h3>
                {[
                  { label: 'Status', value: project.status === 'ongoing' ? 'Under Construction' : 'Completed' },
                  { label: 'Type', value: project.type },
                  { label: 'Location', value: project.city },
                  { label: 'Total Units', value: String(project.totalUnits || 'N/A') },
                  { label: project.status === 'ongoing' ? 'Expected Completion' : 'Completed On', value: project.expectedCompletion || project.completedDate || 'N/A' },
                  { label: 'Starting Price', value: formatPrice(project.startingPrice, project.priceUnit) },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F3F4F6', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                    <span style={{ fontWeight: '600', color: 'var(--text)', textAlign: 'right', maxWidth: '55%' }}>{item.value}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--gradient-gold)', borderRadius: '16px', padding: '28px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📋</div>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', marginBottom: '8px' }}>Book a Site Visit</h3>
                <p style={{ color: 'rgba(10,37,64,0.7)', fontSize: '0.85rem', marginBottom: '16px' }}>Experience the project in person</p>
                <button onClick={() => setActiveTab('inquiry')} className="btn btn-outline-dark" style={{ width: '100%', justifyContent: 'center' }}>
                  Schedule Visit →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

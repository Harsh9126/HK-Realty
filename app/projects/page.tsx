'use client';

import { useState } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { sampleProjects } from '@/data/sampleProjects';
import Link from 'next/link';

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<'ongoing' | 'completed' | 'all'>('all');

  const filtered = activeTab === 'all' ? sampleProjects : sampleProjects.filter(p => p.status === activeTab);

  return (
    <>
      {/* Header */}
      <section style={{ background: 'var(--gradient-hero)', paddingTop: '120px', paddingBottom: '60px' }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="section-label">Our Developments</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', color: '#fff', marginBottom: '12px' }}>HK Realty Projects</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
              Landmark developments that redefine communities and deliver outstanding returns.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '40px', flexWrap: 'wrap' }}>
            {[
              { value: sampleProjects.length.toString(), label: 'Total Projects' },
              { value: sampleProjects.filter(p => p.status === 'ongoing').length.toString(), label: 'Ongoing' },
              { value: sampleProjects.filter(p => p.status === 'completed').length.toString(), label: 'Completed' },
              { value: sampleProjects.reduce((sum, p) => sum + (p.totalUnits || 0), 0).toLocaleString('en-IN') + '+', label: 'Units Delivered' },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', borderRadius: '16px', padding: '20px 32px', border: '1px solid rgba(255,255,255,0.12)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '700', color: 'var(--secondary)' }}>{stat.value}</div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="section" style={{ paddingTop: '40px' }}>
        <div className="container">
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '40px', background: 'var(--bg)', borderRadius: '16px', padding: '8px', width: 'fit-content' }}>
            {(['all', 'ongoing', 'completed'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '12px 28px',
                  borderRadius: '10px',
                  background: activeTab === tab ? 'var(--primary)' : 'transparent',
                  color: activeTab === tab ? '#fff' : 'var(--text-light)',
                  fontWeight: activeTab === tab ? '600' : '400',
                  border: 'none', cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s',
                }}
              >
                {tab === 'all'
                  ? `All Projects (${sampleProjects.length})`
                  : tab === 'ongoing'
                  ? `Under Construction (${sampleProjects.filter(p => p.status === 'ongoing').length})`
                  : `Completed (${sampleProjects.filter(p => p.status === 'completed').length})`}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid-3">
            {filtered.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--gradient-primary)', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: '700', color: '#fff', marginBottom: '16px' }}>
            Interested in Development Partnerships?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto 36px', lineHeight: '1.7' }}>
            Join us as a co-investor or joint development partner and share in the exceptional returns from our landmark projects.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/investment" className="btn btn-primary btn-lg">Explore Investment →</Link>
            <Link href="/contact" className="btn btn-outline btn-lg">Talk to Our Team</Link>
          </div>
        </div>
      </section>
    </>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Project } from '@/data/sampleProjects';

interface ProjectCardProps {
  project: Project;
}

const typeColors: Record<string, string> = {
  'Residential Township': '#3B82F6',
  'Commercial Complex': '#8B5CF6',
  'Luxury Villas': '#D4AF37',
  'Mixed-Use Development': '#EC4899',
  'Industrial Park': '#6B7280',
};

const placeholderGradients = [
  'linear-gradient(135deg, #0A2540 0%, #1a3a5c 50%, #D4AF37 100%)',
  'linear-gradient(135deg, #1a3a5c 0%, #0A2540 100%)',
  'linear-gradient(135deg, #061829 0%, #0d3060 100%)',
];

function formatPrice(price: number, unit: string): string {
  if (price >= 10000000) return `${unit}${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `${unit}${(price / 100000).toFixed(1)} L`;
  return `${unit}${price.toLocaleString('en-IN')}`;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const gradientIndex = project.id.charCodeAt(project.id.length - 1) % placeholderGradients.length;
  const typeColor = typeColors[project.type] || 'var(--primary)';
  const soldPct = project.totalUnits && project.soldUnits
    ? Math.round((project.soldUnits / project.totalUnits) * 100)
    : null;

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Image */}
      <div style={{ position: 'relative', height: '240px', overflow: 'hidden', flexShrink: 0 }}>
        {!imgError ? (
          <img
            src={project.images[0]}
            alt={project.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
            onError={() => setImgError(true)}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: placeholderGradients[gradientIndex], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '8px' }}>🏗️</div>
              <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{project.type}</div>
            </div>
          </div>
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(10,37,64,0.8) 100%)' }} />

        {/* Status Badge */}
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <span style={{
            background: project.status === 'ongoing' ? 'rgba(245, 158, 11, 0.9)' : 'rgba(16, 185, 129, 0.9)',
            color: '#fff',
            padding: '5px 12px',
            borderRadius: '50px',
            fontSize: '0.7rem',
            fontWeight: '700',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            backdropFilter: 'blur(8px)',
          }}>
            {project.status === 'ongoing' ? '🔨 Under Construction' : '✅ Completed'}
          </span>
        </div>

        {/* Type Badge */}
        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
          <span style={{
            background: 'rgba(255,255,255,0.9)',
            color: typeColor,
            padding: '5px 12px',
            borderRadius: '50px',
            fontSize: '0.7rem',
            fontWeight: '700',
            backdropFilter: 'blur(8px)',
          }}>
            {project.type}
          </span>
        </div>

        {/* Bottom overlay info */}
        <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.15rem',
            fontWeight: '700',
            color: '#fff',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}>
            {project.name}
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', marginTop: '4px' }}>
            📍 {project.location}
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Starting from</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary)' }}>
            {formatPrice(project.startingPrice, project.priceUnit)}
          </span>
        </div>

        {/* Description */}
        <p style={{
          fontSize: '0.85rem',
          color: 'var(--text-light)',
          lineHeight: '1.6',
          marginBottom: '16px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {project.description}
        </p>

        {/* Progress (Ongoing) */}
        {project.status === 'ongoing' && typeof project.progress === 'number' && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text)' }}>Construction Progress</span>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--secondary)' }}>{project.progress}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${project.progress}%` }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Expected: {project.expectedCompletion}</span>
              {soldPct !== null && (
                <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: '600' }}>
                  {soldPct}% Booked
                </span>
              )}
            </div>
          </div>
        )}

        {/* Completed Stats */}
        {project.status === 'completed' && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{
              display: 'flex', gap: '12px',
              padding: '12px',
              background: 'rgba(16, 185, 129, 0.05)',
              borderRadius: '10px',
              border: '1px solid rgba(16, 185, 129, 0.15)',
            }}>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--success)' }}>{project.soldUnits}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Units Delivered</div>
              </div>
              <div style={{ width: '1px', background: 'rgba(16,185,129,0.2)' }} />
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--success)' }}>✓ {project.completedDate}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Completed</div>
              </div>
            </div>
          </div>
        )}

        {/* Highlights */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
          {project.highlights.slice(0, 3).map((h) => (
            <span key={h} style={{
              padding: '4px 10px',
              background: 'rgba(212,175,55,0.08)',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: '50px',
              fontSize: '0.72rem',
              color: 'var(--primary)',
              fontWeight: '500',
            }}>
              ✦ {h}
            </span>
          ))}
        </div>

        {/* Testimonial (completed) */}
        {project.status === 'completed' && project.testimonial && (
          <div style={{
            padding: '14px',
            background: 'var(--bg)',
            borderRadius: '10px',
            borderLeft: '3px solid var(--secondary)',
            marginBottom: '16px',
          }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontStyle: 'italic', marginBottom: '6px' }}>
              &quot;{project.testimonial.substring(0, 100)}...&quot;
            </p>
            <p style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text)' }}>— {project.testimonialAuthor}</p>
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/projects/${project.id}`}
          className="btn btn-primary"
          style={{ justifyContent: 'center', marginTop: 'auto' }}
        >
          View Project Details →
        </Link>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Property } from '@/data/sampleProperties';

interface PropertyCardProps {
  property: Property;
  onWishlistToggle?: (id: string, add: boolean) => void;
  isWishlisted?: boolean;
  showCompare?: boolean;
  onCompare?: (id: string) => void;
  isCompared?: boolean;
}

const typeColors: Record<string, string> = {
  residential: 'badge-residential',
  commercial: 'badge-commercial',
  luxury: 'badge-luxury',
  industrial: 'badge-industrial',
  agricultural: 'badge-agricultural',
};

const purposeLabel: Record<string, string> = {
  buy: 'For Sale',
  rent: 'For Rent',
  sell: 'For Sale',
};

const purposeColor: Record<string, string> = {
  buy: '#10B981',
  rent: '#3B82F6',
  sell: '#10B981',
};

function formatPrice(price: number, unit: string, purpose: string): string {
  if (purpose === 'rent') {
    if (price >= 100000) return `${unit}${(price / 100000).toFixed(1)}L/mo`;
    return `${unit}${price.toLocaleString('en-IN')}/mo`;
  }
  if (price >= 10000000) return `${unit}${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `${unit}${(price / 100000).toFixed(1)} L`;
  return `${unit}${price.toLocaleString('en-IN')}`;
}

// Gradient placeholder backgrounds for properties without real images
const placeholderGradients = [
  'linear-gradient(135deg, #0A2540 0%, #1a3a5c 100%)',
  'linear-gradient(135deg, #1a3a5c 0%, #2a4a6c 100%)',
  'linear-gradient(135deg, #0d3060 0%, #0A2540 100%)',
  'linear-gradient(135deg, #1e3a4c 0%, #0A2540 100%)',
];

export default function PropertyCard({
  property,
  onWishlistToggle,
  isWishlisted = false,
  showCompare = false,
  onCompare,
  isCompared = false,
}: PropertyCardProps) {
  const [hearted, setHearted] = useState(isWishlisted);
  const [imgError, setImgError] = useState(false);
  const gradientIndex = property.id.charCodeAt(property.id.length - 1) % placeholderGradients.length;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = !hearted;
    setHearted(newState);
    onWishlistToggle?.(property.id, newState);
  };

  return (
    <div className="card-premium" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
      {/* Image */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden', flexShrink: 0 }}>
        {!imgError ? (
          <img
            src={property.images[0]}
            alt={property.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
            onError={() => setImgError(true)}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: placeholderGradients[gradientIndex],
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🏢</div>
              <div style={{ fontSize: '0.8rem' }}>{property.type}</div>
            </div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, transparent 40%, rgba(10,37,64,0.7) 100%)',
        }} />

        {/* Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
          <span className={`badge ${typeColors[property.type] || 'badge-primary'}`}>
            {property.type}
          </span>
          {property.featured && (
            <span className="badge badge-gold">⭐ Featured</span>
          )}
        </div>

        {/* Purpose Badge */}
        <div style={{
          position: 'absolute', bottom: '12px', left: '12px',
          background: purposeColor[property.purpose],
          color: '#fff',
          padding: '4px 10px',
          borderRadius: '50px',
          fontSize: '0.7rem',
          fontWeight: '700',
          letterSpacing: '0.05em',
        }}>
          {purposeLabel[property.purpose]}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          style={{
            position: 'absolute', top: '12px', right: '12px',
            width: '36px', height: '36px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'all 0.2s',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
          aria-label={hearted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {hearted ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            fontWeight: '700',
            color: 'var(--primary)',
          }}>
            {formatPrice(property.price, property.priceUnit, property.purpose)}
          </span>
          {property.verified && (
            <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: '600' }}>✓ Verified</span>
          )}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1rem',
          fontWeight: '600',
          color: 'var(--text)',
          marginBottom: '8px',
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {property.title}
        </h3>

        {/* Location */}
        <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          📍 {property.location}
        </p>

        {/* Specs */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '16px',
          padding: '12px',
          background: 'var(--bg)',
          borderRadius: '10px',
        }}>
          {property.bedrooms && (
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '1rem', marginBottom: '2px' }}>🛏️</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{property.bedrooms} Beds</div>
            </div>
          )}
          {property.bathrooms && (
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '1rem', marginBottom: '2px' }}>🚿</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{property.bathrooms} Baths</div>
            </div>
          )}
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: '1rem', marginBottom: '2px' }}>📐</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{property.area} {property.areaUnit}</div>
          </div>
        </div>

        {/* Amenities */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {property.amenities.slice(0, 3).map((a) => (
            <span key={a} className="chip">{a}</span>
          ))}
          {property.amenities.length > 3 && (
            <span className="chip">+{property.amenities.length - 3} more</span>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <Link
            href={`/properties/${property.id}`}
            className="btn btn-primary btn-sm"
            style={{ flex: 1, justifyContent: 'center' }}
          >
            View Details
          </Link>
          <a
            href={`tel:${property.agentPhone}`}
            className="btn btn-outline-dark btn-sm"
            style={{ flex: 1, justifyContent: 'center' }}
          >
            📞 Contact
          </a>
        </div>

        {showCompare && (
          <button
            onClick={() => onCompare?.(property.id)}
            style={{
              marginTop: '8px',
              padding: '6px 12px',
              fontSize: '0.75rem',
              color: isCompared ? 'var(--secondary)' : 'var(--text-light)',
              background: isCompared ? 'rgba(212,175,55,0.1)' : 'transparent',
              border: `1px solid ${isCompared ? 'var(--secondary)' : '#E5E7EB'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              width: '100%',
              transition: 'all 0.2s',
            }}
          >
            {isCompared ? '✓ Added to Compare' : '⊕ Add to Compare'}
          </button>
        )}
      </div>
    </div>
  );
}

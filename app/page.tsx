'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import ProjectCard from '@/components/ProjectCard';
import InquiryForm from '@/components/InquiryForm';
import { sampleProperties } from '@/data/sampleProperties';
import { sampleProjects } from '@/data/sampleProjects';
import { sampleTestimonials } from '@/data/sampleTestimonials';
import { sampleBlogPosts } from '@/data/sampleBlogPosts';

// ============================================================
// STAT COUNTER
// ============================================================
function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(value);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: '700', color: 'var(--secondary)', lineHeight: 1 }}>
        {count.toLocaleString('en-IN')}{suffix}
      </div>
      <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginTop: '8px' }}>{label}</div>
    </div>
  );
}

// ============================================================
// TESTIMONIAL CAROUSEL
// ============================================================
function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setCurrent((c) => (c + 1) % sampleTestimonials.length), 5000);
    return () => clearInterval(interval);
  }, []);
  const t = sampleTestimonials[current];
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      <div style={{
        background: 'var(--accent)',
        borderRadius: '24px',
        padding: '48px',
        boxShadow: 'var(--shadow-xl)',
        border: '1px solid rgba(212,175,55,0.15)',
        textAlign: 'center',
        minHeight: '280px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        transition: 'all 0.4s ease',
      }}>
        <div style={{ fontSize: '2rem', color: 'var(--secondary)', marginBottom: '16px', fontFamily: 'Georgia, serif' }}>"</div>
        <p style={{ fontSize: '1.05rem', color: 'var(--text)', lineHeight: '1.8', fontStyle: 'italic', marginBottom: '24px' }}>
          {t.text}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '50%',
            background: 'var(--gradient-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.3rem', fontWeight: '700', color: 'var(--secondary)',
            fontFamily: 'var(--font-display)',
            flexShrink: 0,
          }}>
            {t.name.charAt(0)}
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: '700', color: 'var(--primary)', fontFamily: 'var(--font-display)' }}>{t.name}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.role}</div>
            <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
              {Array(t.rating).fill(0).map((_, i) => <span key={i} style={{ color: 'var(--secondary)' }}>★</span>)}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
        {sampleTestimonials.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{
            width: i === current ? '32px' : '8px',
            height: '8px',
            borderRadius: '4px',
            background: i === current ? 'var(--secondary)' : 'rgba(212,175,55,0.3)',
            border: 'none', cursor: 'pointer',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>
    </div>
  );
}

// ============================================================
// HERO SEARCH BAR
// ============================================================
function HeroSearch() {
  const [purpose, setPurpose] = useState('buy');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');

  return (
    <div style={{
      background: 'rgba(255,255,255,0.08)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: '20px',
      padding: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
    }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '8px', padding: '4px' }}>
        {['buy', 'rent', 'sell'].map((p) => (
          <button
            key={p}
            onClick={() => setPurpose(p)}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '12px',
              background: purpose === p ? 'var(--gradient-gold)' : 'transparent',
              color: purpose === p ? 'var(--primary)' : 'rgba(255,255,255,0.7)',
              fontWeight: purpose === p ? '700' : '500',
              fontSize: '0.9rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textTransform: 'capitalize',
            }}
          >
            {p === 'buy' ? '🏠 Buy' : p === 'rent' ? '🔑 Rent' : '💰 Sell'}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div style={{ display: 'flex', gap: '8px', padding: '4px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="🔍 City, locality, or project..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{
            flex: '2 1 200px',
            padding: '14px 18px',
            borderRadius: '12px',
            border: 'none',
            background: 'rgba(255,255,255,0.95)',
            fontSize: '0.95rem',
            color: 'var(--text)',
            outline: 'none',
          }}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{
            flex: '1 1 140px',
            padding: '14px 18px',
            borderRadius: '12px',
            border: 'none',
            background: 'rgba(255,255,255,0.95)',
            fontSize: '0.9rem',
            color: 'var(--text)',
            outline: 'none',
            cursor: 'pointer',
            appearance: 'none',
          }}
        >
          <option value="">Property Type</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="luxury">Luxury</option>
          <option value="industrial">Industrial</option>
          <option value="agricultural">Agricultural</option>
        </select>
        <Link
          href={`/properties?purpose=${purpose}&type=${type}&location=${location}`}
          className="btn btn-primary"
          style={{ flex: '0 0 auto', borderRadius: '12px', padding: '14px 24px' }}
        >
          Search
        </Link>
      </div>
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function HomePage() {
  const featured = sampleProperties.filter((p) => p.featured);
  const ongoing = sampleProjects.filter((p) => p.status === 'ongoing');

  return (
    <>
      {/* ============================
          HERO SECTION
          ============================ */}
      <section style={{
        minHeight: '100vh',
        background: 'var(--gradient-hero)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: '80px',
      }}>
        {/* Animated background elements */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              borderRadius: '50%',
              background: `rgba(212, 175, 55, ${0.03 + i * 0.01})`,
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              top: `${10 + i * 15}%`,
              left: `${60 + i * 5}%`,
              animation: `float ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }} />
          ))}
          {/* Grid pattern */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="grid-2" style={{ gap: '64px', alignItems: 'center' }}>
            {/* Left Content */}
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(212,175,55,0.15)',
                border: '1px solid rgba(212,175,55,0.3)',
                borderRadius: '50px',
                padding: '6px 16px',
                marginBottom: '28px',
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--secondary)', display: 'inline-block', animation: 'pulse-gold 2s ease infinite' }} />
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)', fontWeight: '500', letterSpacing: '0.05em' }}>
                  India's Trusted Real Estate Partner
                </span>
              </div>

              <h1 className="display-hero" style={{ color: '#fff', marginBottom: '20px' }}>
                Find Your{' '}
                <span style={{
                  background: 'var(--gradient-gold)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Dream Property
                </span>{' '}
                with HK Realty
              </h1>

              <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.75)', lineHeight: '1.8', marginBottom: '36px', maxWidth: '500px' }}>
                Whether you're looking to buy, sell, rent, or invest — HK Realty delivers expert guidance and premium real estate opportunities across India.
              </p>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '48px', flexWrap: 'wrap' }}>
                <Link href="/properties" className="btn btn-primary btn-lg">
                  🏘️ Explore Properties
                </Link>
                <Link href="/projects" className="btn btn-outline btn-lg">
                  🏗️ View Projects
                </Link>
                <Link href="/contact" className="btn btn-ghost btn-lg">
                  📞 Contact Us
                </Link>
              </div>

              {/* Quick Stats */}
              <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                {[
                  { value: '5+', label: 'Projects' },
                  { value: '5+', label: 'Projects Sold' },
                  { value: '5+', label: 'Happy Customers' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--secondary)' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Search Box + Contact Form */}
            <div>
              <HeroSearch />

              {/* Floating feature pills */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '20px' }}>
                {['✓ Verified Listings', '✓ Transparent Deals', '✓ Expert Guidance', '✓ RERA Registered'].map((feat) => (
                  <span key={feat} style={{
                    padding: '6px 14px',
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '50px',
                    fontSize: '0.78rem',
                    color: 'rgba(255,255,255,0.85)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}>
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 80" fill="none" style={{ display: 'block' }}>
            <path d="M0,80 C360,20 1080,20 1440,80 L1440,80 L0,80 Z" fill="var(--bg)" />
          </svg>
        </div>
      </section>

      {/* ============================
          STATS BAR
          ============================ */}
      <section style={{ background: 'var(--primary)', padding: '60px 0' }}>
        <div className="container">
          <div className="grid-4" style={{ gap: '32px' }}>
            <StatCounter value={5} suffix="+" label="Projects" />
            <StatCounter value={5} suffix="+" label="Projects Sold" />
            <StatCounter value={5} suffix="+" label="Happy Customers" />
            <StatCounter value={2} suffix="+" label="Cities Covered" />
          </div>
        </div>
      </section>

      {/* ============================
          SERVICES
          ============================ */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">What We Offer</span>
            <h2 className="section-title">Our Premium Services</h2>
            <p className="section-subtitle">
              From property dealing to landmark development — HK Realty delivers comprehensive real estate solutions.
            </p>
            <div className="divider" />
          </div>

          <div className="grid-2" style={{ gap: '32px' }}>
            {/* Property Dealer Services */}
            <div className="card-premium" style={{ padding: '40px' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '16px',
                background: 'var(--gradient-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.8rem', marginBottom: '24px',
              }}>🏠</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '12px' }}>
                Property Dealer Services
              </h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '24px', lineHeight: '1.7' }}>
                Expert guidance for buying, selling, and renting residential, commercial, and industrial properties.
              </p>
              <div className="grid-2" style={{ gap: '10px' }}>
                {['Residential Sales', 'Commercial Sales', 'Rental Services', 'Investment Consulting', 'Land Acquisition', 'Property Valuation', 'Documentation Help', 'Home Loan Assistance'].map((s) => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text)' }}>
                    <span style={{ color: 'var(--secondary)', fontWeight: '700', flexShrink: 0 }}>✦</span>
                    {s}
                  </div>
                ))}
              </div>
              <Link href="/properties" className="btn btn-outline-dark btn-sm" style={{ marginTop: '28px', display: 'inline-flex' }}>
                Explore Properties →
              </Link>
            </div>

            {/* Development Services */}
            <div className="card-premium" style={{ padding: '40px' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '16px',
                background: 'var(--gradient-gold)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.8rem', marginBottom: '24px',
              }}>🏗️</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '12px' }}>
                Real Estate Development
              </h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '24px', lineHeight: '1.7' }}>
                We develop modern residential and commercial projects that create landmarks and deliver exceptional returns.
              </p>
              <div className="grid-2" style={{ gap: '10px' }}>
                {['Residential Townships', 'Luxury Villas', 'Apartment Projects', 'Commercial Complexes', 'Mixed-Use Developments', 'Industrial Parks', 'Smart City Projects', 'Infrastructure Development'].map((s) => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text)' }}>
                    <span style={{ color: 'var(--secondary)', fontWeight: '700', flexShrink: 0 }}>✦</span>
                    {s}
                  </div>
                ))}
              </div>
              <Link href="/projects" className="btn btn-primary btn-sm" style={{ marginTop: '28px', display: 'inline-flex' }}>
                View Our Projects →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          FEATURED PROPERTIES
          ============================ */}
      <section className="section" style={{ background: 'var(--accent)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Hand-Picked for You</span>
            <h2 className="section-title">Featured Properties</h2>
            <p className="section-subtitle">
              Premium verified listings across residential, commercial, luxury, and investment categories.
            </p>
            <div className="divider" />
          </div>

          <div className="grid-auto">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/properties" className="btn btn-outline-dark btn-lg">
              View All Properties →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================
          ONGOING PROJECTS
          ============================ */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Under Construction</span>
            <h2 className="section-title">Ongoing Projects</h2>
            <p className="section-subtitle">
              Invest early in our landmark developments and secure the best units at pre-launch prices.
            </p>
            <div className="divider" />
          </div>

          <div className="grid-3">
            {ongoing.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/projects" className="btn btn-outline-dark btn-lg">
              View All Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================
          WHY CHOOSE US
          ============================ */}
      <section className="section" style={{ background: 'var(--primary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label" style={{ color: 'var(--secondary)' }}>Our Advantage</span>
            <h2 className="section-title" style={{ color: '#fff' }}>Why Choose HK Realty?</h2>
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.65)' }}>
              We combine years of expertise, verified listings, and transparent processes to deliver exceptional real estate experiences.
            </p>
            <div className="divider" />
          </div>

          <div className="grid-3" style={{ gap: '24px' }}>
            {[
              { icon: '🏆', title: 'Trusted Expertise', desc: '12+ years of experience in property consulting and development across India.' },
              { icon: '✅', title: 'Verified Listings', desc: 'Every property is thoroughly verified for legal clarity before being listed.' },
              { icon: '🔍', title: 'Transparent Transactions', desc: 'Complete transparency throughout the buying, selling, and renting process.' },
              { icon: '👥', title: 'Professional Team', desc: 'Experienced consultants, legal advisors, and project managers at your service.' },
              { icon: '📈', title: 'High Return Investments', desc: 'Carefully curated opportunities in high-growth locations with strong ROI potential.' },
              { icon: '🤝', title: 'End-to-End Support', desc: 'From property search to registration and beyond — we are with you every step.' },
            ].map((item) => (
              <div
                key={item.title}
                className="card-glass"
                style={{ padding: '32px', transition: 'all 0.3s', cursor: 'default' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--glass-bg)';
                  (e.currentTarget as HTMLElement).style.transform = 'none';
                }}
              >
                <div style={{
                  width: '60px', height: '60px', borderRadius: '16px',
                  background: 'rgba(212,175,55,0.15)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.8rem', marginBottom: '20px',
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: '600', color: 'var(--secondary)', marginBottom: '10px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', lineHeight: '1.7' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================
          INVESTMENT OPPORTUNITIES
          ============================ */}
      <section className="section" style={{ background: 'var(--accent)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Grow Your Wealth</span>
            <h2 className="section-title">Investment Opportunities</h2>
            <p className="section-subtitle">
              Discover high-return real estate investment avenues curated by our expert team.
            </p>
            <div className="divider" />
          </div>

          <div className="grid-4">
            {[
              { icon: '🏘️', title: 'Residential Investments', desc: 'Apartments, villas, and townships in high-growth corridors with strong rental yields.', return: '8–12% p.a.' },
              { icon: '🏢', title: 'Commercial Investments', desc: 'Grade-A office spaces and retail outlets in prime business districts.', return: '10–15% p.a.' },
              { icon: '🌿', title: 'Land Banking', desc: 'Acquire land in emerging locations before infrastructure drives appreciation.', return: '20–40% p.a.' },
              { icon: '🤝', title: 'Development Partnerships', desc: 'Co-invest in HK Realty projects and share in premium development returns.', return: '18–25% p.a.' },
            ].map((opp) => (
              <div key={opp.title} className="card-premium" style={{ padding: '32px', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{opp.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '10px' }}>
                  {opp.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', lineHeight: '1.6', marginBottom: '16px' }}>
                  {opp.desc}
                </p>
                <div style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  background: 'var(--gradient-gold)',
                  borderRadius: '50px',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  color: 'var(--primary)',
                  marginBottom: '20px',
                }}>
                  Expected: {opp.return}
                </div>
                <div>
                  <Link href="/investment" className="btn btn-outline-dark btn-sm" style={{ display: 'inline-flex' }}>
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================
          TESTIMONIALS
          ============================ */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Client Stories</span>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">
              Thousands of happy home buyers, investors, and sellers trust HK Realty.
            </p>
            <div className="divider" />
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* ============================
          BLOG PREVIEW
          ============================ */}
      <section className="section" style={{ background: 'var(--accent)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Knowledge Hub</span>
            <h2 className="section-title">Latest News & Insights</h2>
            <p className="section-subtitle">
              Stay informed with expert articles, market analysis, and real estate tips.
            </p>
            <div className="divider" />
          </div>

          <div className="grid-3" style={{ gap: '24px' }}>
            {sampleBlogPosts.slice(0, 3).map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ height: '100%', cursor: 'pointer' }}>
                  <div style={{ height: '180px', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📰</div>
                      <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{post.category}</span>
                    </div>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                      <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{post.category}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{post.readTime} min read</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: '600', color: 'var(--primary)', marginBottom: '10px', lineHeight: '1.4' }}>
                      {post.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', lineHeight: '1.6', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {post.excerpt}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{post.publishedAt}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--secondary)', fontWeight: '600' }}>Read More →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/blog" className="btn btn-outline-dark btn-lg">
              View All Articles →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================
          CONTACT CTA BANNER
          ============================ */}
      <section style={{
        background: 'var(--gradient-primary)',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="grid-2" style={{ gap: '64px', alignItems: 'center' }}>
            {/* Left */}
            <div>
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--secondary)', fontWeight: '700', marginBottom: '16px', display: 'block' }}>
                Get Started Today
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: '700', color: '#fff', marginBottom: '16px', lineHeight: '1.2' }}>
                Ready to Find Your Perfect Property?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', marginBottom: '32px' }}>
                Our expert team is ready to assist you with all your real estate needs. Get a free consultation today.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {[
                  { icon: '📞', label: '+91-98765-43210', href: 'tel:+919876543210' },
                  { icon: '💬', label: 'WhatsApp Us', href: 'https://wa.me/919876543210' },
                ].map((contact) => (
                  <a key={contact.label} href={contact.href} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '14px 24px',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    backdropFilter: 'blur(10px)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.2)'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'}
                  >
                    {contact.icon} {contact.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Mini form */}
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '24px',
              padding: '40px',
              boxShadow: 'var(--shadow-xl)',
            }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '24px' }}>
                Quick Inquiry
              </h3>
              <InquiryForm compact />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

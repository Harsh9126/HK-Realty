'use client';

import Link from 'next/link';

const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Team', href: '/about#team' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'Buy Property', href: '/properties?purpose=buy' },
    { label: 'Rent Property', href: '/properties?purpose=rent' },
    { label: 'Sell Property', href: '/contact?type=sell' },
    { label: 'Investment', href: '/investment' },
    { label: 'Property Valuation', href: '/contact?type=valuation' },
  ],
  propertyTypes: [
    { label: 'Residential', href: '/properties?type=residential' },
    { label: 'Commercial', href: '/properties?type=commercial' },
    { label: 'Luxury', href: '/properties?type=luxury' },
    { label: 'Industrial', href: '/properties?type=industrial' },
    { label: 'Agricultural Land', href: '/properties?type=agricultural' },
  ],
  tools: [
    { label: 'Mortgage Calculator', href: '/calculator' },
    { label: 'Compare Properties', href: '/compare' },
    { label: 'Wishlist', href: '/wishlist' },
    { label: 'My Dashboard', href: '/dashboard' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: 'var(--primary)', color: 'rgba(255,255,255,0.85)' }}>
      {/* Main Footer */}
      <div className="container" style={{ padding: '80px 24px 48px' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '48px' }}>
          {/* Brand Column */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', marginBottom: '20px' }}>
              <div style={{
                width: '48px', height: '48px',
                background: 'var(--gradient-gold)',
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: '700', fontSize: '1.2rem',
                color: 'var(--primary)',
              }}>
                HK
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: '700', color: '#fff' }}>
                  HK Realty
                </div>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--secondary)', textTransform: 'uppercase' }}>
                  Building Trust. Creating Landmarks.
                </div>
              </div>
            </Link>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.65)', marginBottom: '28px', maxWidth: '300px' }}>
              HK Realty is a trusted real estate company delivering excellence in property consultancy and real estate development across India.
            </p>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { icon: 'f', label: 'Facebook', color: '#1877F2' },
                { icon: 'in', label: 'LinkedIn', color: '#0A66C2' },
                { icon: 'ig', label: 'Instagram', color: '#E4405F' },
                { icon: 'yt', label: 'YouTube', color: '#FF0000' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  style={{
                    width: '40px', height: '40px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontWeight: '700', color: '#fff',
                    transition: 'all 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = social.color;
                    (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)';
                    (e.currentTarget as HTMLElement).style.transform = 'none';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            {/* Contact Quick Info */}
            <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: '📞', text: '+91-98765-43210' },
                { icon: '📧', text: 'info@hkrealty.com' },
                { icon: '📍', text: 'Mumbai, India' },
              ].map((item) => (
                <div key={item.text} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {[
            { title: 'Company', links: footerLinks.company },
            { title: 'Services', links: footerLinks.services },
            { title: 'Properties', links: footerLinks.propertyTypes },
            { title: 'Tools', links: footerLinks.tools },
          ].map((col) => (
            <div key={col.title}>
              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                fontWeight: '600',
                color: 'var(--secondary)',
                marginBottom: '20px',
                letterSpacing: '0.02em',
              }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: '0.85rem',
                        color: 'rgba(255,255,255,0.65)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--secondary)'}
                      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)'}
                    >
                      <span style={{ color: 'var(--secondary)', fontSize: '0.6rem' }}>▶</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div style={{
          marginTop: '64px',
          padding: '40px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '20px',
          border: '1px solid rgba(212, 175, 55, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          flexWrap: 'wrap',
        }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: '#fff', marginBottom: '6px' }}>
              Subscribe to Property Alerts
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
              Get the latest property listings, market updates, and investment opportunities.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flex: '1 1 300px', flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                padding: '12px 20px',
                borderRadius: '50px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                fontSize: '0.9rem',
                flex: '1 1 200px',
                minWidth: '0',
                outline: 'none',
              }}
            />
            <button className="btn btn-primary btn-sm">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          marginTop: '48px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)' }}>
            © {new Date().getFullYear()} HK Realty. All rights reserved. | RERA Registered
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms of Service', 'Disclaimer', 'Sitemap'].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.45)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--secondary)'}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

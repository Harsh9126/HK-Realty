import InquiryForm from '@/components/InquiryForm';

export const metadata = {
  title: 'Investment Opportunities',
  description: 'Real estate investment opportunities with HK Realty.',
};

const investmentCategories = [
  {
    icon: '🏠',
    title: 'Residential',
    returns: '8–12% p.a.',
    color: '#1a3c5e',
    bg: '#e3f2fd',
    benefits: [
      'Steady rental income',
      'Capital appreciation',
      'Low entry barrier',
      'High demand in metro cities',
      'Liquid asset class',
    ],
  },
  {
    icon: '🏢',
    title: 'Commercial',
    returns: '10–15% p.a.',
    color: '#2e7d32',
    bg: '#e8f5e9',
    benefits: [
      'Higher rental yields',
      'Long-term leases (5–9 years)',
      'Corporate tenants',
      'Structured rent escalation',
      'Lower maintenance hassle',
    ],
  },
  {
    icon: '🌍',
    title: 'Land Banking',
    returns: '20–40% p.a.',
    color: '#e65100',
    bg: '#fff3e0',
    benefits: [
      'Maximum appreciation potential',
      'Buy pre-development',
      'Lower per-sq-ft cost',
      'Ideal for long-term investors',
      'Rezoning upside',
    ],
  },
  {
    icon: '🤝',
    title: 'Development Partnerships',
    returns: '18–25% p.a.',
    color: '#7b1fa2',
    bg: '#f3e5f5',
    benefits: [
      'Co-invest with developers',
      'Project profit share',
      'Curated deal flow',
      'Expert project oversight',
      'Diversify across projects',
    ],
  },
];

const growthLocations = [
  { city: 'Hyderabad', tag: 'IT Hub', growth: '+32% (3Y)', flag: '🏙️' },
  { city: 'Pune', tag: 'Emerging Metro', growth: '+28% (3Y)', flag: '🌆' },
  { city: 'Gurugram', tag: 'Corporate Hub', growth: '+25% (3Y)', flag: '🏗️' },
  { city: 'Navi Mumbai', tag: 'Infrastructure Boom', growth: '+35% (3Y)', flag: '🌉' },
  { city: 'Bengaluru', tag: 'Tech Capital', growth: '+22% (3Y)', flag: '🖥️' },
  { city: 'Nashik', tag: 'Affordable High-Growth', growth: '+40% (3Y)', flag: '🌄' },
];

export default function InvestmentPage() {
  return (
    <main style={{ fontFamily: 'var(--font-body, sans-serif)', color: '#1a1a2e' }}>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1a3c5e 0%, #0d2137 60%, #1a3c5e 100%)',
          paddingTop: 120,
          paddingBottom: 80,
          color: '#fff',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 48,
              alignItems: 'center',
            }}
          >
            {/* Left */}
            <div>
              <div
                style={{
                  display: 'inline-block',
                  background: 'rgba(212,175,55,0.15)',
                  border: '1px solid rgba(212,175,55,0.4)',
                  borderRadius: 30,
                  padding: '8px 24px',
                  color: '#D4AF37',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: 2,
                  textTransform: 'uppercase' as const,
                  marginBottom: 24,
                }}
              >
                Investment Opportunities
              </div>
              <h1
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 800,
                  lineHeight: 1.2,
                  marginBottom: 20,
                }}
              >
                Grow Your Wealth with{' '}
                <span style={{ color: '#D4AF37' }}>Smart Real Estate</span>
              </h1>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: 36 }}>
                India&apos;s real estate market is booming. With HK Realty&apos;s curated investment opportunities,
                you can access high-growth assets, maximize returns, and build a robust property portfolio.
              </p>
              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                {[
                  { val: '₹500Cr+', lbl: 'Assets Managed' },
                  { val: '18%', lbl: 'Avg. Annual Returns' },
                  { val: '300+', lbl: 'Investors Served' },
                ].map((s) => (
                  <div key={s.lbl}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: '#D4AF37' }}>{s.val}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 4 }}>{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Why India card */}
            <div
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: 20,
                padding: 36,
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#D4AF37', marginBottom: 20 }}>
                🇮🇳 Why Invest in Indian Real Estate?
              </h3>
              {[
                'World\'s fastest growing major economy',
                'Urbanization driving 70M+ new homebuyers by 2030',
                'RERA-regulated for investor protection',
                'NRI-friendly policies & repatriation options',
                'Infrastructure boom fueling tier-2 city growth',
                'Post-pandemic demand surge still ongoing',
              ].map((point) => (
                <div
                  key={point}
                  style={{
                    display: 'flex',
                    gap: 12,
                    alignItems: 'flex-start',
                    marginBottom: 14,
                  }}
                >
                  <span style={{ color: '#D4AF37', fontSize: 18, flexShrink: 0 }}>✓</span>
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 1.5 }}>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Investment Categories */}
      <section style={{ padding: '80px 24px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1a3c5e', marginBottom: 12 }}>
              Investment Categories
            </h2>
            <p style={{ color: '#666', maxWidth: 500, margin: '0 auto' }}>
              Choose the investment type that matches your goals, risk appetite, and time horizon
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 28,
            }}
          >
            {investmentCategories.map((cat) => (
              <div
                key={cat.title}
                style={{
                  background: '#fff',
                  borderRadius: 20,
                  overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                  border: '1px solid #eee',
                }}
              >
                <div
                  style={{
                    background: cat.bg,
                    padding: '28px 28px 20px',
                    borderBottom: `3px solid ${cat.color}`,
                  }}
                >
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{cat.icon}</div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: cat.color, marginBottom: 4 }}>
                    {cat.title}
                  </h3>
                  <div
                    style={{
                      display: 'inline-block',
                      background: cat.color,
                      color: '#fff',
                      padding: '4px 14px',
                      borderRadius: 20,
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {cat.returns}
                  </div>
                </div>
                <div style={{ padding: '24px 28px' }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#999', marginBottom: 12, textTransform: 'uppercase' as const, letterSpacing: 1 }}>
                    Key Benefits
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {cat.benefits.map((b) => (
                      <li
                        key={b}
                        style={{
                          display: 'flex',
                          gap: 10,
                          alignItems: 'flex-start',
                          marginBottom: 10,
                          fontSize: 14,
                          color: '#555',
                        }}
                      >
                        <span style={{ color: cat.color, fontWeight: 700, flexShrink: 0 }}>✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High Growth Locations */}
      <section style={{ padding: '80px 24px', background: '#1a3c5e' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 12 }}>
              🚀 High-Growth <span style={{ color: '#D4AF37' }}>Investment Locations</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 500, margin: '0 auto' }}>
              Markets we&apos;ve identified for maximum appreciation potential over the next 5 years
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 20,
            }}
          >
            {growthLocations.map((loc) => (
              <div
                key={loc.city}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 16,
                  padding: 28,
                  border: '1px solid rgba(255,255,255,0.1)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 12 }}>{loc.flag}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{loc.city}</h3>
                <p
                  style={{
                    fontSize: 12,
                    color: '#D4AF37',
                    fontWeight: 600,
                    textTransform: 'uppercase' as const,
                    letterSpacing: 1,
                    marginBottom: 12,
                  }}
                >
                  {loc.tag}
                </p>
                <div
                  style={{
                    background: 'rgba(212,175,55,0.15)',
                    border: '1px solid rgba(212,175,55,0.3)',
                    borderRadius: 8,
                    padding: '8px 16px',
                    display: 'inline-block',
                  }}
                >
                  <span style={{ color: '#D4AF37', fontWeight: 700, fontSize: 15 }}>{loc.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Section */}
      <section style={{ padding: '80px 24px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1a3c5e', marginBottom: 12 }}>
            Start Your Investment Journey
          </h2>
          <p style={{ color: '#666', marginBottom: 48, lineHeight: 1.6, fontSize: 17 }}>
            Speak with our investment advisors to explore the right opportunities for your financial goals.
          </p>
          <div
            style={{
              background: '#fff',
              borderRadius: 20,
              padding: 40,
              boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
              border: '1px solid #eee',
            }}
          >
            <InquiryForm />
          </div>
        </div>
      </section>
    </main>
  );
}

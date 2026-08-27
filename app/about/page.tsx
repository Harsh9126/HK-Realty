import Link from 'next/link';

export const metadata = {
  title: 'About Us',
  description: 'About HK Realty - building trust since 2026.',
};

const teamMembers = [
  {
    name: 'Harsh Kandhol',
    role: 'Founder & CEO',
    experience: '2 Years Experience',
    initials: 'HK',
    color: '#D4AF37',
  },
  {
    name: 'Priya Sharma',
    role: 'Director – Sales',
    experience: '15+ Years Experience',
    initials: 'PS',
    color: '#1a3c5e',
  },
  {
    name: 'Rajesh Mehta',
    role: 'Head – Commercial',
    experience: '18+ Years Experience',
    initials: 'RM',
    color: '#2e7d32',
  },
  {
    name: 'Anita Desai',
    role: 'Head – Legal & Compliance',
    experience: '12+ Years Experience',
    initials: 'AD',
    color: '#7b1fa2',
  },
  {
    name: 'Suresh Patel',
    role: 'Head – Investments',
    experience: '14+ Years Experience',
    initials: 'SP',
    color: '#c62828',
  },
  {
    name: 'Kavita Nair',
    role: 'Customer Relations Manager',
    experience: '10+ Years Experience',
    initials: 'KN',
    color: '#00838f',
  },
];

const coreValues = [
  {
    icon: '🤝',
    title: 'Integrity',
    desc: 'We operate with complete transparency and honesty in every transaction, ensuring our clients always make informed decisions.',
  },
  {
    icon: '⭐',
    title: 'Excellence',
    desc: 'We set the highest standards in service delivery, property curation, and client satisfaction across all our offerings.',
  },
  {
    icon: '💡',
    title: 'Innovation',
    desc: 'We leverage cutting-edge technology and market insights to offer smarter, faster real estate solutions.',
  },
  {
    icon: '👤',
    title: 'Client First',
    desc: 'Every decision we make is guided by what is best for our clients – their goals are our mission.',
  },
  {
    icon: '🌱',
    title: 'Sustainability',
    desc: 'We champion eco-friendly developments and responsible investing for a better future.',
  },
  {
    icon: '📈',
    title: 'Value Creation',
    desc: 'We focus on maximizing returns and long-term value for every client, investor, and community we serve.',
  },
];

const timeline = [
  {
    year: '2026',
    title: 'Founded in Mumbai',
    desc: 'HK Realty was established with a vision to bring transparency and trust to Indian real estate.',
  },
  {
    year: '2026',
    title: 'First 5 Customers',
    desc: 'Crossed 5 satisfied customers within our first year of operation.',
  },
];

export default function AboutPage() {
  return (
    <main style={{ fontFamily: 'var(--font-body, sans-serif)', color: '#1a1a2e' }}>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1a3c5e 0%, #0d2137 60%, #1a3c5e 100%)',
          paddingTop: 120,
          paddingBottom: 80,
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
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
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            Our Story
          </div>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              marginBottom: 20,
              lineHeight: 1.2,
            }}
          >
            About{' '}
            <span style={{ color: '#D4AF37' }}>HK Realty</span>
          </h1>
          <p
            style={{
              fontSize: 18,
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.7,
              maxWidth: 600,
              margin: '0 auto 40px',
            }}
          >
            Building trust, delivering dreams, and creating lasting value in Indian real estate since 2026.
            Committed to excellence, transparency, and client-first service.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 40,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {[
              { value: '5+', label: 'Projects' },
              { value: '5+', label: 'Happy Customers' },
              { value: '₹2Cr+', label: 'Transactions' },
              { value: '2+', label: 'Cities Covered' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#D4AF37' }}>{stat.value}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section style={{ padding: '80px 24px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1a3c5e', marginBottom: 12 }}>
              Vision &amp; Mission
            </h2>
            <p style={{ color: '#666', maxWidth: 500, margin: '0 auto' }}>
              Guided by purpose, driven by excellence
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 32,
            }}
          >
            {/* Vision */}
            <div
              className="card-premium"
              style={{
                background: '#fff',
                borderRadius: 16,
                padding: 40,
                boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
                border: '1px solid #e8e8e8',
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: 'rgba(26,60,94,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                  marginBottom: 24,
                }}
              >
                🔭
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: '#1a3c5e', marginBottom: 16 }}>Our Vision</h3>
              <p style={{ color: '#555', lineHeight: 1.8, fontSize: 16 }}>
                To be India's most trusted real estate partner, empowering every Indian to own their dream property
                through transparency, technology, and uncompromising integrity. We envision a future where real estate
                transactions are simple, fair, and accessible to all.
              </p>
            </div>
            {/* Mission */}
            <div
              style={{
                background: 'linear-gradient(135deg, #1a3c5e 0%, #0d2137 100%)',
                borderRadius: 16,
                padding: 40,
                boxShadow: '0 4px 30px rgba(26,60,94,0.3)',
                color: '#fff',
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: 'rgba(212,175,55,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                  marginBottom: 24,
                }}
              >
                🎯
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: '#D4AF37', marginBottom: 16 }}>Our Mission</h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, fontSize: 16 }}>
                To deliver exceptional real estate experiences by combining deep market expertise with personalized
                service. We guide our clients through every step of their property journey—buying, selling, renting,
                or investing—with clarity, care, and commitment to their best interests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(212,175,55,0.1)',
                border: '1px solid rgba(212,175,55,0.3)',
                borderRadius: 30,
                padding: '6px 20px',
                color: '#b8960c',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              What We Stand For
            </div>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1a3c5e', marginBottom: 12 }}>
              Our Core Values
            </h2>
            <p style={{ color: '#666', maxWidth: 500, margin: '0 auto' }}>
              The principles that guide every decision and interaction at HK Realty
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {coreValues.map((val) => (
              <div
                key={val.title}
                className="card-hover-value"
                style={{
                  background: '#f8f9fa',
                  borderRadius: 16,
                  padding: 32,
                  border: '1px solid #eee',
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 16 }}>{val.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1a3c5e', marginBottom: 10 }}>
                  {val.title}
                </h3>
                <p style={{ color: '#666', lineHeight: 1.7, fontSize: 15 }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '80px 24px', background: '#1a3c5e' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 12 }}>
              Our <span style={{ color: '#D4AF37' }}>Journey</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 500, margin: '0 auto' }}>
              Milestones that define our story of growth and excellence
            </p>
          </div>
          <div className="timeline-container" style={{ position: 'relative' }}>
            {/* Center line */}
            <div
              className="timeline-line"
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: 2,
                background: 'rgba(212,175,55,0.3)',
                transform: 'translateX(-50%)',
              }}
            />
            {timeline.map((item, idx) => (
              <div
                key={item.year}
                className={`timeline-item ${idx % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
                style={{
                  display: 'flex',
                  justifyContent: idx % 2 === 0 ? 'flex-start' : 'flex-end',
                  marginBottom: 40,
                  position: 'relative',
                }}
              >
                {/* Dot */}
                <div
                  className="timeline-dot"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: 24,
                    transform: 'translateX(-50%)',
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: '#D4AF37',
                    border: '3px solid #1a3c5e',
                    boxShadow: '0 0 0 3px rgba(212,175,55,0.3)',
                    zIndex: 1,
                  }}
                />
                <div
                  className="timeline-card"
                  style={{
                    width: '45%',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 12,
                    padding: 24,
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: '#D4AF37',
                      letterSpacing: 1,
                      marginBottom: 8,
                    }}
                  >
                    {item.year}
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '80px 24px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1a3c5e', marginBottom: 12 }}>
              Meet Our Team
            </h2>
            <p style={{ color: '#666', maxWidth: 500, margin: '0 auto' }}>
              Experienced professionals dedicated to making your property journey seamless
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 28,
            }}
          >
            {teamMembers.map((member) => (
              <div
                key={member.name}
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: 32,
                  textAlign: 'center',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
                  border: '1px solid #eee',
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: member.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    fontWeight: 700,
                    color: '#fff',
                    margin: '0 auto 20px',
                  }}
                >
                  {member.initials}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1a3c5e', marginBottom: 6 }}>
                  {member.name}
                </h3>
                <p style={{ color: '#D4AF37', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>
                  {member.role}
                </p>
                <p style={{ color: '#888', fontSize: 13 }}>{member.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, #D4AF37 0%, #b8960c 100%)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1a3c5e', marginBottom: 16 }}>
            Ready to Start Your Property Journey?
          </h2>
          <p style={{ color: 'rgba(26,60,94,0.8)', fontSize: 18, marginBottom: 36 }}>
            Our team is here to guide you every step of the way. Let&apos;s find your perfect property together.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              style={{
                background: '#1a3c5e',
                color: '#fff',
                padding: '14px 36px',
                borderRadius: 8,
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: 16,
              }}
            >
              Get In Touch
            </Link>
            <Link
              href="/properties"
              style={{
                background: 'rgba(26,60,94,0.1)',
                color: '#1a3c5e',
                padding: '14px 36px',
                borderRadius: 8,
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: 16,
                border: '2px solid #1a3c5e',
              }}
            >
              View Properties
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

import InquiryForm from '@/components/InquiryForm';

export const metadata = {
  title: 'Contact Us',
  description: 'Contact HK Realty for property inquiries.',
};

const contactCards = [
  {
    icon: '📞',
    title: 'Phone',
    value: '+91-98765-43210',
    sub: 'Mon–Sat, 9 AM – 7 PM',
    href: 'tel:+919876543210',
    bg: '#e3f2fd',
    color: '#1565c0',
  },
  {
    icon: '💬',
    title: 'WhatsApp',
    value: '+91-98765-43210',
    sub: 'Quick replies guaranteed',
    href: 'https://wa.me/919876543210',
    bg: '#e8f5e9',
    color: '#2e7d32',
  },
  {
    icon: '✉️',
    title: 'Email',
    value: 'info@hkrealty.com',
    sub: 'We reply within 24 hours',
    href: 'mailto:info@hkrealty.com',
    bg: '#fff3e0',
    color: '#e65100',
  },
  {
    icon: '📍',
    title: 'Office',
    value: 'BKC, Mumbai',
    sub: 'Unit 5B, Tower C, BKC, Mumbai – 400051',
    href: 'https://maps.google.com',
    bg: '#fce4ec',
    color: '#880e4f',
  },
];

const businessHours = [
  { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM' },
  { day: 'Saturday', time: '10:00 AM – 5:00 PM' },
  { day: 'Sunday', time: 'By Appointment Only' },
];

export default function ContactPage() {
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
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px' }}>
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
            Get In Touch
          </div>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 800,
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            Contact <span style={{ color: '#D4AF37' }}>HK Realty</span>
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
            Have a question or ready to find your dream property? Our experts are just a call or message away.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section style={{ padding: '60px 24px 20px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 20,
            }}
          >
            {contactCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                target={card.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: 28,
                  textDecoration: 'none',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
                  border: '1px solid #eee',
                  display: 'block',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 12,
                    background: card.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    marginBottom: 16,
                  }}
                >
                  {card.icon}
                </div>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#999', textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 6 }}>
                  {card.title}
                </p>
                <p style={{ fontSize: 16, fontWeight: 700, color: card.color, marginBottom: 4 }}>
                  {card.value}
                </p>
                <p style={{ fontSize: 13, color: '#888' }}>{card.sub}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '60px 24px 80px', background: '#f8f9fa' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 40,
          }}
        >
          {/* Left: Inquiry Form */}
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1a3c5e', marginBottom: 8 }}>
              Send Us a Message
            </h2>
            <p style={{ color: '#666', marginBottom: 28, lineHeight: 1.6 }}>
              Fill in the form and our team will get back to you within 24 hours.
            </p>
            <InquiryForm />
          </div>

          {/* Right: Map + Hours */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {/* Map Placeholder */}
            <div
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
                height: 300,
                background: 'linear-gradient(135deg, #1a3c5e 0%, #2a5f8a 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                textAlign: 'center',
                padding: 32,
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>🗺️</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>HK Realty – Head Office</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>
                Unit 5B, Tower C, Bandra Kurla Complex
              </p>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>
                Mumbai, Maharashtra – 400051
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#D4AF37',
                  color: '#1a3c5e',
                  padding: '10px 24px',
                  borderRadius: 8,
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontSize: 14,
                }}
              >
                Open in Google Maps
              </a>
            </div>

            {/* Business Hours */}
            <div
              style={{
                background: '#fff',
                borderRadius: 16,
                padding: 28,
                boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
                border: '1px solid #eee',
              }}
            >
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1a3c5e', marginBottom: 20 }}>
                🕐 Business Hours
              </h3>
              {businessHours.map((bh) => (
                <div
                  key={bh.day}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingBottom: 12,
                    marginBottom: 12,
                    borderBottom: '1px solid #f0f0f0',
                  }}
                >
                  <span style={{ fontWeight: 600, color: '#333', fontSize: 14 }}>{bh.day}</span>
                  <span style={{ color: '#D4AF37', fontWeight: 700, fontSize: 14 }}>{bh.time}</span>
                </div>
              ))}
              <div
                style={{
                  background: 'rgba(212,175,55,0.1)',
                  borderRadius: 8,
                  padding: '12px 16px',
                  marginTop: 8,
                }}
              >
                <p style={{ color: '#b8960c', fontSize: 13, fontWeight: 600 }}>
                  🏠 Site visits can be arranged on weekends by appointment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noreferrer"
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: '#25D366',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          boxShadow: '0 4px 20px rgba(37,211,102,0.5)',
          textDecoration: 'none',
          zIndex: 1000,
        }}
        title="Chat on WhatsApp"
      >
        💬
      </a>
    </main>
  );
}

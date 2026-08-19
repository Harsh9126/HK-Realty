import Link from 'next/link';
import MortgageCalculator from '@/components/MortgageCalculator';

export const metadata = {
  title: 'Mortgage Calculator',
  description: 'Calculate home loan EMI with HK Realty calculator.',
};

const tips = [
  {
    icon: '💳',
    title: 'Maintain a Good CIBIL Score',
    desc: 'A CIBIL score of 750+ qualifies you for the best interest rates. Check and improve your score before applying for a loan.',
  },
  {
    icon: '📊',
    title: 'Keep EMI Under 40% of Income',
    desc: 'Ensure your total EMI obligations (all loans combined) do not exceed 40% of your gross monthly income.',
  },
  {
    icon: '📅',
    title: 'Choose Tenure Wisely',
    desc: 'Longer tenure reduces EMI but increases total interest. Aim for the shortest tenure your monthly budget allows.',
  },
  {
    icon: '🏦',
    title: 'Compare Multiple Lenders',
    desc: 'Even a 0.25% difference in interest rate can save lakhs over the loan tenure. Always compare banks, HFCs, and NBFCs.',
  },
  {
    icon: '🏛️',
    title: 'Check PMAY Eligibility',
    desc: 'Under Pradhan Mantri Awas Yojana, first-time homebuyers may get a subsidy of up to ₹2.67 lakh on their home loan.',
  },
  {
    icon: '🤝',
    title: 'HK Realty Can Help',
    desc: 'Our loan advisory team partners with 15+ banks and HFCs to help you get pre-approved at the best rates – at no extra cost.',
  },
];

export default function CalculatorPage() {
  return (
    <main style={{ fontFamily: 'var(--font-body, sans-serif)', color: '#1a1a2e' }}>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1a3c5e 0%, #0d2137 60%, #1a3c5e 100%)',
          paddingTop: 120,
          paddingBottom: 120,
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
            Financial Tools
          </div>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 800,
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            Mortgage <span style={{ color: '#D4AF37' }}>EMI Calculator</span>
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
            Plan your home loan with confidence. Calculate your monthly EMI, total interest, and repayment schedule instantly.
          </p>
        </div>
      </section>

      {/* Calculator Card – elevated */}
      <section style={{ padding: '0 24px 80px', background: '#f8f9fa' }}>
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            position: 'relative',
            marginTop: -60,
            zIndex: 1,
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 24,
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              padding: 40,
              border: '1px solid #eee',
            }}
          >
            <MortgageCalculator />
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#1a3c5e', marginBottom: 12 }}>
              🏡 Home Loan Tips from Our Experts
            </h2>
            <p style={{ color: '#666', maxWidth: 500, margin: '0 auto' }}>
              Smart strategies to get the best deal on your home loan
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 24,
            }}
          >
            {tips.map((tip) => (
              <div
                key={tip.title}
                style={{
                  background: '#f8f9fa',
                  borderRadius: 16,
                  padding: 28,
                  border: '1px solid #eee',
                  display: 'flex',
                  gap: 20,
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    fontSize: 32,
                    flexShrink: 0,
                    width: 52,
                    height: 52,
                    background: '#fff',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  }}
                >
                  {tip.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a3c5e', marginBottom: 8 }}>
                    {tip.title}
                  </h3>
                  <p style={{ color: '#666', fontSize: 14, lineHeight: 1.6 }}>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: '64px 24px',
          background: 'linear-gradient(135deg, #D4AF37 0%, #b8960c 100%)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: '#1a3c5e', marginBottom: 12 }}>
            Need Personalized Loan Advice?
          </h2>
          <p style={{ color: 'rgba(26,60,94,0.8)', fontSize: 16, marginBottom: 28 }}>
            Our loan experts will help you compare rates, get pre-approved, and close your loan faster.
          </p>
          <Link
            href="/contact"
            style={{
              background: '#1a3c5e',
              color: '#fff',
              padding: '14px 40px',
              borderRadius: 8,
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: 16,
              display: 'inline-block',
            }}
          >
            Speak to a Loan Expert →
          </Link>
        </div>
      </section>
    </main>
  );
}

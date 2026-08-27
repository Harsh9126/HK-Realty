'use client';

import { useState, useMemo } from 'react';

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const { emi, totalInterest, totalAmount } = useMemo(() => {
    const r = interestRate / 100 / 12;
    const n = tenure * 12;
    if (r === 0) return { emi: loanAmount / n, totalInterest: 0, totalAmount: loanAmount };
    const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - loanAmount;
    return { emi, totalInterest, totalAmount };
  }, [loanAmount, interestRate, tenure]);

  const formatAmount = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
    return `₹${Math.round(val).toLocaleString('en-IN')}`;
  };

  const principalPct = Math.round((loanAmount / (loanAmount + totalInterest)) * 100);
  const interestPct = 100 - principalPct;

  return (
    <div>
      <div className="calc-grid">
        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Loan Amount */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text)' }}>Loan Amount</label>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: '700', color: 'var(--primary)', fontSize: '1.1rem' }}>
                {formatAmount(loanAmount)}
              </span>
            </div>
            <input
              id="loan-amount-slider"
              type="range"
              min={500000}
              max={50000000}
              step={100000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--secondary)', height: '8px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>₹5L</span><span>₹5 Cr</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text)' }}>Interest Rate (p.a.)</label>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: '700', color: 'var(--primary)', fontSize: '1.1rem' }}>
                {interestRate.toFixed(1)}%
              </span>
            </div>
            <input
              id="interest-rate-slider"
              type="range"
              min={6}
              max={20}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--secondary)', height: '8px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>6%</span><span>20%</span>
            </div>
          </div>

          {/* Tenure */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text)' }}>Loan Tenure</label>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: '700', color: 'var(--primary)', fontSize: '1.1rem' }}>
                {tenure} Years
              </span>
            </div>
            <input
              id="tenure-slider"
              type="range"
              min={1}
              max={30}
              step={1}
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--secondary)', height: '8px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>1 Year</span><span>30 Years</span>
            </div>
          </div>
        </div>

        {/* Result */}
        <div>
          {/* EMI Card */}
          <div style={{
            background: 'var(--gradient-primary)',
            borderRadius: '20px',
            padding: '32px 20px',
            textAlign: 'center',
            marginBottom: '20px',
            boxShadow: 'var(--shadow-lg)',
          }}>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
              Monthly EMI
            </p>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: '700', color: 'var(--secondary)', lineHeight: 1 }}>
              {formatAmount(emi)}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>per month</p>
          </div>

          {/* Breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            {[
              { label: 'Principal', value: formatAmount(loanAmount), color: 'var(--primary)', pct: principalPct },
              { label: 'Total Interest', value: formatAmount(totalInterest), color: 'var(--warning)', pct: interestPct },
              { label: 'Total Amount', value: formatAmount(totalAmount), color: 'var(--success)', pct: 100 },
            ].map((item) => (
              <div key={item.label} style={{
                padding: '16px',
                background: 'var(--bg)',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
              }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>{item.label}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: '700', color: item.color }}>{item.value}</p>
              </div>
            ))}
            <div style={{
              padding: '16px',
              background: 'rgba(212,175,55,0.08)',
              borderRadius: '12px',
              border: '1px solid rgba(212,175,55,0.3)',
            }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Interest %</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: '700', color: 'var(--secondary)' }}>{interestPct}%</p>
            </div>
          </div>

          {/* Visual Bar */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.75rem', fontWeight: '600' }}>
              <span style={{ color: 'var(--primary)' }}>Principal {principalPct}%</span>
              <span style={{ color: 'var(--warning)' }}>Interest {interestPct}%</span>
            </div>
            <div style={{ height: '12px', borderRadius: '50px', overflow: 'hidden', display: 'flex' }}>
              <div style={{ width: `${principalPct}%`, background: 'var(--primary)', transition: 'width 0.5s ease' }} />
              <div style={{ flex: 1, background: 'var(--warning)' }} />
            </div>
          </div>

          <a href="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            🏦 Get Loan Assistance
          </a>
        </div>
      </div>

      <style jsx>{`
        .calc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .calc-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
      `}</style>
    </div>
  );
}

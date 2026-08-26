'use client';

import { useState } from 'react';
import { submitInquiry } from '@/lib/firestore';

interface InquiryFormProps {
  propertyId?: string;
  propertyTitle?: string;
  compact?: boolean;
}

const propertyTypes = ['Residential', 'Commercial', 'Luxury', 'Industrial', 'Agricultural Land', 'Any'];
const budgetRanges = [
  'Under ₹25 Lakh',
  '₹25L – ₹50L',
  '₹50L – ₹1 Crore',
  '₹1 Cr – ₹3 Cr',
  '₹3 Cr – ₹10 Cr',
  'Above ₹10 Crore',
];

export default function InquiryForm({ propertyId, propertyTitle, compact = false }: InquiryFormProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    requirement: propertyTitle ? `Inquiry about: ${propertyTitle}` : '',
    budget: '',
    message: '',
    type: 'general',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await submitInquiry({ ...form, propertyId: propertyId || null });
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit. Please try again or call us directly.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{
        padding: compact ? '32px 24px' : '48px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(16,185,129,0.05) 0%, rgba(10,37,64,0.05) 100%)',
        borderRadius: '20px',
        border: '2px solid rgba(16, 185, 129, 0.2)',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '12px' }}>
          Thank You!
        </h3>
        <p style={{ color: 'var(--text-light)', marginBottom: '20px' }}>
          Your inquiry has been received. Our team will contact you within 24 hours.
        </p>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          For immediate assistance, call us at <strong>+91-98765-43210</strong>
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="btn btn-outline-dark btn-sm"
          style={{ marginTop: '20px' }}
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={compact ? "" : "grid-2"} style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : undefined, gap: '16px' }}>
        <div className="form-group">
          <label className="form-label" htmlFor="inquiry-name">Full Name *</label>
          <input
            id="inquiry-name"
            name="name"
            type="text"
            className="form-input"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="inquiry-phone">Phone Number *</label>
          <input
            id="inquiry-phone"
            name="phone"
            type="tel"
            className="form-input"
            placeholder="+91-XXXXX-XXXXX"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group" style={{ gridColumn: compact ? '1' : '1 / -1' }}>
          <label className="form-label" htmlFor="inquiry-email">Email Address</label>
          <input
            id="inquiry-email"
            name="email"
            type="email"
            className="form-input"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        {!propertyTitle && (
          <>
            <div className="form-group">
              <label className="form-label" htmlFor="inquiry-requirement">Property Requirement</label>
              <select
                id="inquiry-requirement"
                name="requirement"
                className="form-select"
                value={form.requirement}
                onChange={handleChange}
              >
                <option value="">Select property type</option>
                {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="inquiry-budget">Budget Range</label>
              <select
                id="inquiry-budget"
                name="budget"
                className="form-select"
                value={form.budget}
                onChange={handleChange}
              >
                <option value="">Select budget</option>
                {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </>
        )}
        <div className="form-group" style={{ gridColumn: compact ? '1' : '1 / -1' }}>
          <label className="form-label" htmlFor="inquiry-message">Message</label>
          <textarea
            id="inquiry-message"
            name="message"
            className="form-input"
            placeholder={propertyTitle ? 'I am interested in this property. Please contact me with more details...' : 'Tell us about your property requirements, preferred location, timeline...'}
            value={form.message}
            onChange={handleChange}
            rows={4}
          />
        </div>
      </div>
      {error && (
        <p style={{ color: 'var(--error)', fontSize: '0.85rem', marginTop: '12px' }}>⚠️ {error}</p>
      )}
      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: '100%', justifyContent: 'center', marginTop: '20px' }}
        disabled={loading}
      >
        {loading ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '16px', height: '16px', border: '2px solid rgba(10,37,64,0.3)', borderTop: '2px solid var(--primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
            Sending...
          </span>
        ) : (
          '📨 Send Inquiry'
        )}
      </button>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '12px' }}>
        🔒 Your information is safe with us. We never share your details.
      </p>
    </form>
  );
}

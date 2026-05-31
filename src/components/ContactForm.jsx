import React, { useState } from 'react';
import { ShieldAlert, ArrowRight, CheckCircle2, Lock, HelpCircle, Clock } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferred_contact: 'email',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Netlify form submission formatting
    const form = e.target;
    const body = new URLSearchParams(new FormData(form)).toString();
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body
    })
    .then(() => setSubmitted(true))
    .catch((error) => console.error("Form submission error:", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <section id="contact" style={{ padding: '80px 24px 100px 24px', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="glass-panel" style={{ padding: '60px 40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
            <div className="pulse-animation" style={{ color: 'var(--success)', background: 'rgba(16, 185, 129, 0.1)', padding: '24px', borderRadius: '50%' }}>
              <CheckCircle2 size={64} />
            </div>
            <h2 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: '700', margin: 0 }}>Thank You</h2>
            <p className="text-secondary" style={{ fontSize: '1.2rem', maxWidth: '500px', lineHeight: '1.7' }}>
              Your consultation request has been received. A patient coordinator from Marano Eye Care will reach out to you within 24 hours to confirm your appointment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" style={{ padding: '80px 24px 100px 24px', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="glass-panel" style={{ padding: '48px 40px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="text-gradient" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: '700', marginBottom: '12px', letterSpacing: '-0.02em' }}>
              Take the First Step to Clear Vision
            </h2>
            <p className="text-secondary" style={{ fontSize: '1.15rem', margin: 0 }}>
              Schedule your complimentary consultation and discover if LASIK is right for you.
            </p>
          </div>

          <form 
            className="contact-form" 
            name="consultation" 
            method="POST" 
            data-netlify="true" 
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {/* Netlify form identification */}
            <input type="hidden" name="form-name" value="consultation" />

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="name" className="form-label" style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                placeholder="John Doe" 
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                style={{
                  background: 'rgba(10, 15, 22, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '16px',
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>

            <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="phone" className="form-label" style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Mobile Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  required 
                  placeholder="(555) 000-0000" 
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  style={{
                    background: 'rgba(10, 15, 22, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '16px',
                    fontSize: '1rem',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="email" className="form-label" style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  placeholder="john@example.com" 
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  style={{
                    background: 'rgba(10, 15, 22, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '16px',
                    fontSize: '1rem',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Preferred Contact Method</label>
              <div className="contact-method-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {['email', 'phone', 'text'].map((method) => (
                  <label key={method} className="method-option" style={{ cursor: 'pointer', position: 'relative' }}>
                    <input 
                      type="radio" 
                      name="preferred_contact" 
                      value={method} 
                      checked={formData.preferred_contact === method}
                      onChange={handleChange}
                      style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                    />
                    <div 
                      className="method-box"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        background: formData.preferred_contact === method ? 'rgba(140, 178, 242, 0.12)' : 'rgba(10, 15, 22, 0.4)',
                        border: formData.preferred_contact === method ? '1px solid rgba(140, 178, 242, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '12px',
                        padding: '14px',
                        fontSize: '0.95rem',
                        fontWeight: '500',
                        color: formData.preferred_contact === method ? 'var(--text-primary)' : 'var(--text-muted)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        textTransform: 'capitalize'
                      }}
                    >
                      {method === 'email' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      )}
                      {method === 'phone' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      )}
                      {method === 'text' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                      )}
                      {method === 'phone' ? 'Phone Call' : method === 'text' ? 'Text Message' : 'Email'}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="message" className="form-label" style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Additional Information</label>
              <textarea 
                id="message" 
                name="message" 
                placeholder="Tell us about your vision goals or any questions you have..." 
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                style={{
                  background: 'rgba(10, 15, 22, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '16px',
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  minHeight: '120px',
                  resize: 'vertical'
                }}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ padding: '16px 32px', fontSize: '1.05rem', marginTop: '12px' }}
            >
              Request Consultation
              <span className="btn-icon-wrapper">
                <ArrowRight size={16} />
              </span>
            </button>

            <div className="trust-badges-row" style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '16px', flexWrap: 'wrap' }}>
              <div className="trust-badge-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <Lock size={14} style={{ opacity: 0.6 }} /> 100% Confidential
              </div>
              <div className="trust-badge-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <HelpCircle size={14} style={{ opacity: 0.6 }} /> Zero Obligation
              </div>
              <div className="trust-badge-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <Clock size={14} style={{ opacity: 0.6 }} /> Response Within 24 Hours
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

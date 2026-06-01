import React, { useState } from 'react';
import { ShieldAlert, ArrowRight, CheckCircle2, Lock, HelpCircle, Clock, MapPin, Calendar, User, Phone, Mail } from 'lucide-react';

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    location: 'Livingston',
    timeframe: 'Morning',
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

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <section id="contact" style={{ padding: '80px 24px 100px 24px', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <div className="contact-grid">
          
          {/* Left Column: CTA Context */}
          <div className="contact-cta-col">
            <div>
              <h2 className="text-gradient" style={{ fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: '700', marginBottom: '16px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                How Much Longer Will You Wait?
              </h2>
              <p className="text-secondary" style={{ fontSize: 'clamp(1rem, 2.2vw, 1.15rem)', lineHeight: '1.6', margin: 0, fontWeight: '300' }}>
                Schedule your complimentary, no-obligation consultation today — most patients say their only regret is not doing it sooner.
              </p>
            </div>
            
            <div className="contact-phone-box">
              <div style={{
                background: 'rgba(0, 240, 255, 0.08)',
                border: '1px solid rgba(0, 240, 255, 0.25)',
                color: 'var(--accent-primary)',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(0, 240, 255, 0.2)'
              }} className="active-radar-dot">
                <Phone size={22} className="animate-pulse" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="text-muted" style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '2px', fontWeight: '700', marginBottom: '2px' }}>
                  Call Us Directly
                </span>
                <a 
                  href="tel:9733220100" 
                  style={{ 
                    fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', 
                    fontWeight: '800', 
                    color: 'var(--text-primary)', 
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                >
                  973-322-0100
                </a>
              </div>
            </div>

            <div className="trust-badges-row" style={{ display: 'flex', gap: '20px', marginTop: '8px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                <Lock size={12} style={{ opacity: 0.6 }} /> Confidential
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                <HelpCircle size={12} style={{ opacity: 0.6 }} /> Zero Obligation
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                <Clock size={12} style={{ opacity: 0.6 }} /> 24hr Response
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Wizard / Success Card */}
          <div className="glass-panel" style={{ 
            padding: '40px 32px', 
            position: 'relative', 
            overflow: 'hidden',
            border: submitted ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(0, 240, 255, 0.25)',
            boxShadow: submitted 
              ? '0 20px 45px rgba(0, 0, 0, 0.5), 0 0 30px rgba(16, 185, 129, 0.05)'
              : '0 20px 45px rgba(0, 0, 0, 0.5), 0 0 35px rgba(0, 240, 255, 0.05)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            minHeight: '430px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            {submitted ? (
              <div className="animate-fade-in" style={{ 
                textAlign: 'center', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '20px'
              }}>
                <div className="active-radar-dot" style={{ color: 'var(--success)', background: 'rgba(16, 185, 129, 0.1)', padding: '20px', borderRadius: '50%' }}>
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-gradient" style={{ fontSize: '1.8rem', fontWeight: '700', margin: 0 }}>Priority Booking Confirmed</h3>
                <p className="text-secondary" style={{ fontSize: '1rem', lineHeight: '1.6', fontWeight: '300', margin: 0 }}>
                  Your topography scan and surgeon Q&A request has been locked. A patient coordinator from Marano Eye Care will reach out to you at your preferred time to verify details.
                </p>
              </div>
            ) : (
              <>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <h3 className="text-gradient" style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '6px', letterSpacing: '-0.01em' }}>
                    Priority Reservation
                  </h3>
                  <p className="text-secondary" style={{ fontSize: '0.9rem', margin: 0, fontWeight: '300' }}>
                    Lock in your complimentary 1-on-1 diagnostic consultation.
                  </p>
                </div>

                {/* Form Wizard Progress Steps Tracker */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '32px' }} className="nav-links-group">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: step >= 1 ? 1 : 0.4 }}>
                    <span style={{ 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '50%', 
                      background: step >= 1 ? 'var(--accent-primary)' : 'var(--bg-tertiary)', 
                      color: step >= 1 ? '#030712' : '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      fontWeight: 'bold'
                    }}>1</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', color: step >= 1 ? 'var(--accent-primary)' : 'var(--text-muted)' }}>Preferences</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: step >= 2 ? 1 : 0.4 }}>
                    <span style={{ 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '50%', 
                      background: step >= 2 ? 'var(--accent-primary)' : 'var(--bg-tertiary)', 
                      color: step >= 2 ? '#030712' : '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      fontWeight: 'bold'
                    }}>2</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', color: step >= 2 ? 'var(--accent-primary)' : 'var(--text-muted)' }}>Details</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: step >= 3 ? 1 : 0.4 }}>
                    <span style={{ 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '50%', 
                      background: step >= 3 ? 'var(--accent-primary)' : 'var(--bg-tertiary)', 
                      color: step >= 3 ? '#030712' : '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      fontWeight: 'bold'
                    }}>3</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', color: step >= 3 ? 'var(--accent-primary)' : 'var(--text-muted)' }}>Confirm</span>
                  </div>
                </div>

                <form 
                  className="contact-form" 
                  name="consultation" 
                  method="POST" 
                  data-netlify="true" 
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                >
                  {/* Netlify form identification */}
                  <input type="hidden" name="form-name" value="consultation" />

                  {/* Hidden actual inputs to make sure netlify processes ALL fields regardless of current wizard step */}
                  <input type="hidden" name="location" value={formData.location} />
                  <input type="hidden" name="timeframe" value={formData.timeframe} />

                  {/* STEP 1: PREFERENCES */}
                  {step === 1 && (
                    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      
                      {/* Select Location */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <MapPin size={14} color="var(--accent-primary)" /> Select Preferred NJ Clinic Location
                        </label>
                        <div className="form-grid-3">
                          {['Livingston', 'Denville', 'Newark'].map((loc) => (
                            <button
                              key={loc}
                              type="button"
                              onClick={() => {
                                setFormData(prev => {
                                  const nextTimeframe = loc !== 'Livingston' && prev.timeframe === 'Wednesday Evening' 
                                    ? 'Morning' 
                                    : prev.timeframe;
                                  return { ...prev, location: loc, timeframe: nextTimeframe };
                                });
                              }}
                              style={{
                                padding: '12px 8px',
                                background: formData.location === loc ? 'rgba(0, 240, 255, 0.1)' : 'rgba(3, 7, 18, 0.4)',
                                border: formData.location === loc ? '1px solid var(--accent-primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '10px',
                                color: formData.location === loc ? '#ffffff' : 'var(--text-muted)',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                              }}
                            >
                              {loc}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Select Timeframe */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Calendar size={14} color="var(--accent-primary)" /> Select Preferred Consultation Window
                        </label>
                        <div className={formData.location === 'Livingston' ? "form-grid-3" : "form-grid-2"}>
                          {(formData.location === 'Livingston' 
                            ? ['Morning', 'Afternoon', 'Wednesday Evening'] 
                            : ['Morning', 'Afternoon']
                          ).map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, timeframe: time }))}
                              style={{
                                padding: '12px 8px',
                                background: formData.timeframe === time ? 'rgba(0, 240, 255, 0.1)' : 'rgba(3, 7, 18, 0.4)',
                                border: formData.timeframe === time ? '1px solid var(--accent-primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '10px',
                                color: formData.timeframe === time ? '#ffffff' : 'var(--text-muted)',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                              }}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button 
                        type="button" 
                        onClick={nextStep} 
                        className="btn btn-primary" 
                        style={{ padding: '14px', fontSize: '1rem', marginTop: '8px' }}
                      >
                        Continue to Details
                        <span className="btn-icon-wrapper">
                          <ArrowRight size={16} />
                        </span>
                      </button>
                    </div>
                  )}

                  {/* STEP 2: CONTACT DETAILS */}
                  {step === 2 && (
                    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      
                      {/* Full Name */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label htmlFor="name" style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <User size={12} color="var(--accent-primary)" /> Full Name
                        </label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          required 
                          placeholder="John Doe" 
                          value={formData.name}
                          onChange={handleChange}
                          style={{
                            background: 'rgba(3, 7, 18, 0.5)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '10px',
                            padding: '12px 14px',
                            fontSize: '0.95rem',
                            color: '#ffffff',
                            outline: 'none',
                            transition: 'all 0.3s ease'
                          }}
                        />
                      </div>

                      <div className="form-grid-2">
                        {/* Phone */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label htmlFor="phone" style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Phone size={12} color="var(--accent-primary)" /> Phone Number
                          </label>
                          <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            required 
                            placeholder="(555) 000-0000" 
                            value={formData.phone}
                            onChange={handleChange}
                            style={{
                              background: 'rgba(3, 7, 18, 0.5)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              borderRadius: '10px',
                              padding: '12px 14px',
                              fontSize: '0.95rem',
                              color: '#ffffff',
                              outline: 'none',
                              transition: 'all 0.3s ease'
                            }}
                          />
                        </div>

                        {/* Email */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label htmlFor="email" style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Mail size={12} color="var(--accent-primary)" /> Email Address
                          </label>
                          <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required 
                            placeholder="john@example.com" 
                            value={formData.email}
                            onChange={handleChange}
                            style={{
                              background: 'rgba(3, 7, 18, 0.5)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              borderRadius: '10px',
                              padding: '12px 14px',
                              fontSize: '0.95rem',
                              color: '#ffffff',
                              outline: 'none',
                              transition: 'all 0.3s ease'
                            }}
                          />
                        </div>
                      </div>

                      {/* Preferred Method */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Preferred Contact Method</label>
                        <div className="form-grid-3">
                          {['email', 'phone', 'text'].map((method) => (
                            <label key={method} style={{ cursor: 'pointer', position: 'relative' }}>
                              <input 
                                type="radio" 
                                name="preferred_contact" 
                                value={method} 
                                checked={formData.preferred_contact === method}
                                onChange={handleChange}
                                style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                              />
                              <div 
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '8px',
                                  background: formData.preferred_contact === method ? 'rgba(0, 240, 255, 0.1)' : 'rgba(3, 7, 18, 0.4)',
                                  border: formData.preferred_contact === method ? '1px solid var(--accent-primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                                  borderRadius: '10px',
                                  padding: '10px',
                                  fontSize: '0.85rem',
                                  fontWeight: '500',
                                  color: formData.preferred_contact === method ? '#ffffff' : 'var(--text-muted)',
                                  transition: 'all 0.3s',
                                  textTransform: 'capitalize'
                                }}
                              >
                                {method === 'phone' ? 'Call' : method === 'text' ? 'Text' : 'Email'}
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }} className="responsive-flex-col">
                        <button type="button" onClick={prevStep} className="btn btn-secondary" style={{ flex: 1, padding: '12px' }}>
                          Back
                        </button>
                        <button 
                          type="button" 
                          onClick={nextStep} 
                          className="btn btn-primary" 
                          style={{ flex: 2, padding: '12px' }}
                          disabled={!formData.name || !formData.phone || !formData.email}
                        >
                          Review Schedule
                          <span className="btn-icon-wrapper">
                            <ArrowRight size={16} />
                          </span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: CONFIRM & SUBMIT */}
                  {step === 3 && (
                    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      
                      {/* Summary printed card */}
                      <div style={{
                        background: 'rgba(3, 7, 18, 0.7)',
                        border: '1px solid rgba(0, 240, 255, 0.2)',
                        borderRadius: '12px',
                        padding: '16px',
                        fontFamily: 'monospace',
                        fontSize: '0.8rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        color: 'var(--text-secondary)'
                      }}>
                        <div style={{ color: 'var(--accent-primary)', borderBottom: '1px solid rgba(0, 240, 255, 0.15)', paddingBottom: '6px', marginBottom: '6px', fontWeight: 'bold' }}>
                          RESERVATION SUMMARY
                        </div>
                        <div>LOCATION: <strong style={{ color: '#ffffff' }}>{formData.location}, NJ Clinic</strong></div>
                        <div>WINDOW: <strong style={{ color: '#ffffff' }}>{formData.timeframe === 'Wednesday Evening' ? 'Wednesday Evening' : `${formData.timeframe} Shift`}</strong></div>
                        <div>NAME: <strong style={{ color: '#ffffff' }}>{formData.name}</strong></div>
                        <div>CONTACT: <strong style={{ color: '#ffffff' }}>{formData.email} ({formData.phone})</strong></div>
                        <div>METHOD: <strong style={{ color: '#ffffff' }}>{formData.preferred_contact.toUpperCase()}</strong></div>
                      </div>

                      {/* Additional Info */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label htmlFor="message" style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Additional Info (Optional)</label>
                        <textarea 
                          id="message" 
                          name="message" 
                          placeholder="Questions or vision details..." 
                          value={formData.message}
                          onChange={handleChange}
                          style={{
                            background: 'rgba(3, 7, 18, 0.5)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '10px',
                            padding: '12px 14px',
                            fontSize: '0.95rem',
                            color: '#ffffff',
                            outline: 'none',
                            transition: 'all 0.3s ease',
                            minHeight: '60px',
                            resize: 'vertical'
                          }}
                        />
                      </div>

                      <div style={{ display: 'flex', gap: '12px' }} className="responsive-flex-col">
                        <button type="button" onClick={prevStep} className="btn btn-secondary" style={{ flex: 1, padding: '12px' }}>
                          Back
                        </button>
                        <button 
                          type="submit" 
                          className="btn btn-primary" 
                          style={{ flex: 2, padding: '12px', gap: '8px' }}
                        >
                          <Lock size={16} /> Confirm Booking
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

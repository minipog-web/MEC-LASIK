import React, { useState } from 'react';
import { Award, ShieldCheck, MapPin, Sparkles, Activity, ArrowRight, DollarSign, TrendingUp, Calculator } from 'lucide-react';

export default function MaranoSection() {
  const [age, setAge] = useState(28);
  const [contactsCost, setContactsCost] = useState(500);
  const [glassesCost, setGlassesCost] = useState(400);

  const lasikCost = 3900; // Estimated average cost
  const annualTotal = Number(contactsCost) + Number(glassesCost);
  const activeYears = Math.max(80 - age, 1);
  const lifetimeEyewear = activeYears * annualTotal;
  const lifetimeSavings = Math.max(lifetimeEyewear - lasikCost, 0);
  const breakevenYears = annualTotal > 0 ? (lasikCost / annualTotal).toFixed(1) : 0;

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about-marano" style={{ padding: 'clamp(112px, 8vw, 144px) 24px', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        {/* Core Profile Card */}
        {/* Core Profile Card (Outer Shell) */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '8px',
          borderRadius: '2rem',
          marginBottom: '56px',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {/* Inner Core */}
          <div className="glass-panel" style={{ 
            padding: '40px', 
            background: 'var(--bg-secondary)',
            border: '1px solid rgba(255, 255, 255, 0.04)',
            boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.12)',
            borderRadius: 'calc(2rem - 8px)',
            position: 'relative', 
            overflow: 'hidden',
          }}>
            
            <div className="marano-profile-grid">
              
              {/* Left Column: Surgeon Bio & Pedigree */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <span className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] font-semibold bg-white/5 border border-white/10 text-white/70" style={{ display: 'inline-block', width: 'fit-content' }}>
                  Pioneering Refractive Excellence
                </span>

                <h2 className="bio-heading">
                  New Jersey's Premier <br/>
                  <span className="bio-heading-accent">LASIK Destination</span>
                </h2>

                <p className="text-secondary" style={{ fontSize: '1.15rem', lineHeight: '1.8', margin: 0, fontWeight: '300' }}>
                  Marano Eye Care stands as the benchmark for vision correction in the region. 
                  <strong style={{ fontWeight: '600', color: '#ffffff' }}> Dr. Matthew Marano was one of the first LASIK surgeons in New Jersey</strong>, 
                  helping introduce the procedure when it first reached the state. With over three decades of 
                  specialized expertise and more than 4,000 successful laser vision correction procedures, he offers a level of precision and experience that is unmatched—ensuring 
                  your journey to clear vision is in the most capable hands.
                </p>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '8px 0 0 0', letterSpacing: '0.04em', fontWeight: '600', textTransform: 'uppercase', fontFamily: 'monospace' }}>
                  Board Certified Ophthalmologist · One of the First LASIK Surgeons in NJ · 15× Top Doctor Honoree
                </p>
              </div>

              {/* Right Column: Statistics Grid */}
              <div className="marano-stats-column">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '3rem', fontWeight: '300', fontFamily: 'var(--font-serif)', color: 'var(--accent-primary)', lineHeight: 1 }}>30+</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '700', fontFamily: 'monospace' }}>Years of Experience</span>
                </div>
                <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.05)' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '3rem', fontWeight: '300', fontFamily: 'var(--font-serif)', color: '#ffffff', lineHeight: 1 }}>4,000+</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '700', fontFamily: 'monospace' }}>Successful Procedures</span>
                </div>
                <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.05)' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '3rem', fontWeight: '300', fontFamily: 'var(--font-serif)', color: 'var(--accent-secondary)', lineHeight: 1 }}>15×</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '700', fontFamily: 'monospace' }}>Top Doctor Award</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Pillars & Savings Calculator Section */}
        <div className="marano-pillars-grid">
          
          {/* Brand Pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <h3 style={{ textAlign: 'center', fontSize: '2rem', fontFamily: 'var(--font-serif)', fontWeight: '300', color: '#ffffff', marginBottom: '8px', fontStyle: 'italic' }}>
              Why Patients Trust Us
            </h3>
            
            <div className="glass-panel" style={{
              background: 'rgba(8, 17, 37, 0.85)',
              border: '1px solid rgba(0, 240, 255, 0.25)',
              borderRadius: '24px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
              height: '100%',
              justifyContent: 'center'
            }}>
              
              {/* Pillar 1 */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                <div style={{ background: 'rgba(0, 240, 255, 0.08)', border: '1px solid rgba(0, 240, 255, 0.25)', color: 'var(--accent-primary)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Award size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>Decades of Trust</h4>
                  <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: 0, fontWeight: '300' }}>
                    Led by Matthew Marano, M.D., a pioneering figure in NJ refractive surgery with three decades of focus.
                  </p>
                </div>
              </div>

              <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.06)' }} />

              {/* Pillar 2 */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                <div style={{ background: 'rgba(0, 240, 255, 0.08)', border: '1px solid rgba(0, 240, 255, 0.25)', color: 'var(--accent-primary)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>Advanced Technology</h4>
                  <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: 0, fontWeight: '300' }}>
                    Precise 3D digital eye scans mapping the absolute custom topography of your cornea down to sub-micron elevation points.
                  </p>
                </div>
              </div>

              <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.06)' }} />

              {/* Pillar 3 */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                <div style={{ background: 'rgba(0, 240, 255, 0.08)', border: '1px solid rgba(0, 240, 255, 0.25)', color: 'var(--accent-primary)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>Personal Focus</h4>
                  <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: 0, fontWeight: '300' }}>
                    Completely customized treatment profiles tailored specifically to your eyes, lifestyle, and visual goals.
                  </p>
                </div>
              </div>

              <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.06)' }} />

              {/* Pillar 4 */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                <div style={{ background: 'rgba(0, 240, 255, 0.08)', border: '1px solid rgba(0, 240, 255, 0.25)', color: 'var(--accent-primary)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>Top Doctor Honors</h4>
                  <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: 0, fontWeight: '300' }}>
                    Awarded "Top Doctor" 15 times by peers, recognizing Dr. Marano's commitment to visual outcome precision.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Savings Calculator */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <h3 style={{ textAlign: 'center', fontSize: '2rem', fontFamily: 'var(--font-serif)', fontWeight: '300', color: '#ffffff', marginBottom: '8px', fontStyle: 'italic' }}>
              Lifetime Savings Calculator
            </h3>

            <div className="glass-panel" style={{
              background: 'rgba(8, 17, 37, 0.85)',
              border: '1px solid rgba(197, 168, 128, 0.25)',
              borderRadius: '24px',
              padding: '40px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#c5a880', fontSize: '0.9rem', fontWeight: '700', borderBottom: '1px solid rgba(197,168,128,0.2)', paddingBottom: '12px' }}>
                <Calculator size={16} /> ADJUST YOUR EYEWEAR COSTS
              </div>

              {/* Slider 1: Age */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#ffffff' }}>
                  <span>Current Age</span>
                  <strong style={{ color: '#c5a880' }}>{age} Years Old</strong>
                </div>
                <input 
                  type="range" 
                  min="18" 
                  max="65" 
                  value={age} 
                  onChange={(e) => setAge(Number(e.target.value))}
                  style={{
                    width: '100%',
                    height: '6px',
                    borderRadius: '3px',
                    outline: 'none',
                    background: '#1e293b',
                    WebkitAppearance: 'none',
                    cursor: 'pointer',
                    accentColor: '#c5a880'
                  }}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>Projected eyewear use to age 80 ({activeYears} years left)</span>
              </div>

              {/* Slider 2: Annual Contacts Cost */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#ffffff' }}>
                  <span>Annual Contact Lenses & Solutions</span>
                  <strong style={{ color: '#c5a880' }}>${contactsCost}/yr</strong>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1200" 
                  step="50"
                  value={contactsCost} 
                  onChange={(e) => setContactsCost(Number(e.target.value))}
                  style={{
                    width: '100%',
                    height: '6px',
                    borderRadius: '3px',
                    outline: 'none',
                    background: '#1e293b',
                    WebkitAppearance: 'none',
                    cursor: 'pointer',
                    accentColor: '#c5a880'
                  }}
                />
              </div>

              {/* Slider 3: Annual Glasses Cost */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#ffffff' }}>
                  <span>Annual Glasses, Exams & Upgrades</span>
                  <strong style={{ color: '#c5a880' }}>${glassesCost}/yr</strong>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  step="50"
                  value={glassesCost} 
                  onChange={(e) => setGlassesCost(Number(e.target.value))}
                  style={{
                    width: '100%',
                    height: '6px',
                    borderRadius: '3px',
                    outline: 'none',
                    background: '#1e293b',
                    WebkitAppearance: 'none',
                    cursor: 'pointer',
                    accentColor: '#c5a880'
                  }}
                />
              </div>

              {/* Dynamic Readout with Prominent Savings Spotlight */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginTop: '8px'
              }} className="cost-comparison">
                
                {/* Muted baseline spend */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  background: 'rgba(3, 7, 18, 0.4)', 
                  border: '1px solid rgba(255, 255, 255, 0.05)', 
                  borderRadius: '12px', 
                  padding: '12px 18px', 
                  fontSize: '0.8rem', 
                  fontFamily: 'monospace', 
                  color: 'var(--text-secondary)' 
                }}>
                  <span>ESTIMATED EYEWEAR SPEND (WITHOUT LASIK)</span>
                  <span style={{ color: 'var(--error)', fontWeight: '700' }}>
                    ${lifetimeEyewear.toLocaleString()}
                  </span>
                </div>
                
                {/* Hero Net Savings Card */}
                <div style={{ 
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(3, 7, 18, 0.6) 100%)', 
                  border: '1px solid rgba(16, 185, 129, 0.3)', 
                  borderRadius: '16px', 
                  padding: '24px 20px', 
                  textAlign: 'center', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '6px',
                  boxShadow: '0 8px 30px rgba(16, 185, 129, 0.05)'
                }} className="cost-comparison-vs">
                  <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                    Net Lifetime Savings with LASIK
                  </span>
                  <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--success)', fontFamily: 'monospace', lineHeight: 1.1 }}>
                    ${lifetimeSavings.toLocaleString()}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Calculated over lifetime eyewear usage projection
                  </span>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.85rem',
                fontFamily: 'monospace',
                color: 'var(--text-secondary)',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                paddingTop: '16px',
                alignItems: 'center'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><TrendingUp size={14} color="var(--success)" /> BREAKEVEN HORIZON:</span>
                <strong style={{ color: 'var(--success)', fontSize: '1rem' }}>~{breakevenYears} Years</strong>
              </div>

              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: '1.4', fontStyle: 'italic', display: 'block', textAlign: 'center' }}>
                *Calculation factors average national eyewear inflation rates and an average lifespan projection of 80 years. One-time LASIK investment estimated at ${lasikCost}.
              </span>
            </div>
          </div>

        </div>

        {/* Consultation Callout */}
        <div className="glass-panel" style={{ 
          padding: '36px', 
          marginTop: '48px', 
          background: 'radial-gradient(circle at top right, rgba(0, 240, 255, 0.05) 0%, rgba(139, 92, 246, 0.01) 70%)',
          border: '1px solid rgba(0, 240, 255, 0.15)'
        }}>
          <div className="marano-consultation-grid">
            <div>
              <h4 style={{ fontSize: '1.3rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>Your Complimentary Consultation</h4>
              <p className="text-secondary" style={{ fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                If you are considering the procedure, we invite you to our office for a completely pressure-free, 
                complimentary consultation. We will take the time to evaluate your unique eyes, answer all questions, 
                and help you determine if LASIK is the right fit for your lifestyle.
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>✓</span> Advanced Corneal Topography Mapping</div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>✓</span> 1-on-1 Surgeon Q&A with Dr. Marano</div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>✓</span> Personalized Visual Treatment Plan</div>
              </div>
              <button 
                type="button"
                onClick={scrollToContact} 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '12px 24px', fontSize: '0.95rem' }}
              >
                Schedule Free Consultation
                <span className="btn-icon-wrapper">
                  <ArrowRight size={14} />
                </span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

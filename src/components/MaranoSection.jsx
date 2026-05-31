import React from 'react';
import { Award, ShieldCheck, MapPin, Sparkles, Activity, ShieldAlert, ArrowRight } from 'lucide-react';

export default function MaranoSection() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about-marano" style={{ padding: '80px 24px 60px 24px', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        {/* Core Profile Card */}
        <div className="glass-panel" style={{ padding: '48px 40px', marginBottom: '48px', position: 'relative', overflow: 'hidden' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '48px', alignItems: 'center' }} className="responsive-grid">
            
            {/* Left Column: Surgeon Bio & Pedigree */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ 
                background: 'rgba(140, 178, 242, 0.08)', 
                color: 'var(--accent-primary)', 
                border: '1px solid rgba(140, 178, 242, 0.2)', 
                borderRadius: '9999px', 
                padding: '6px 16px', 
                fontSize: '0.8rem', 
                fontWeight: '700', 
                textTransform: 'uppercase', 
                letterSpacing: '1.5px',
                width: 'fit-content',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Sparkles size={12} /> Pioneering Excellence
              </div>

              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '600', margin: 0, lineHeight: 1.15 }}>
                New Jersey's Premier <br/>
                <span className="text-gradient" style={{ fontWeight: '800' }}>LASIK Destination</span>
              </h2>

              <p className="text-secondary" style={{ fontSize: '1.1rem', lineHeight: '1.75', margin: 0 }}>
                Marano Eye Care stands as the benchmark for vision correction in the region. 
                <strong> Dr. Matthew Marano was one of the first LASIK surgeons in New Jersey</strong>, 
                helping introduce the procedure when it first reached the state. With over three decades of 
                specialized expertise, he offers a level of precision and experience that is unmatched—ensuring 
                your journey to clear vision is in the most capable hands.
              </p>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '8px 0 0 0', letterSpacing: '0.03em' }}>
                Board Certified Ophthalmologist · One of the First LASIK Surgeons in NJ · 15× Top Doctor Honoree
              </p>
            </div>

            {/* Right Column: Statistics Grid */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '24px', 
              borderLeft: '1px solid rgba(255, 255, 255, 0.08)', 
              paddingLeft: '48px',
              minWidth: '220px'
            }} className="responsive-flex-col">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1 }}>30+</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '600' }}>Years of Experience</span>
              </div>
              <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.06)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1 }}>NJ Pioneer</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '600' }}>In Laser Eye Surgery</span>
              </div>
              <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.06)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1 }}>15×</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '600' }}>Top Doctor Award</span>
              </div>
            </div>

          </div>

        </div>

        {/* Pillars & Cost comparison Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '48px', alignItems: 'start' }} className="responsive-grid">
          
          {/* Brand Pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '8px' }}>
              Why Patients Trust Us
            </h3>
            
            <div style={{ display: 'flex', gap: '20px', padding: '20px', background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '16px' }}>
              <div className="icon-box" style={{ background: 'rgba(140, 178, 242, 0.08)', color: 'var(--accent-primary)' }}>
                <Award size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>Decades of Trust</h4>
                <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>Led by Matthew Marano, M.D., a pioneering figure in NJ refractive surgery.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', padding: '20px', background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '16px' }}>
              <div className="icon-box" style={{ background: 'rgba(140, 178, 242, 0.08)', color: 'var(--accent-primary)' }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>Advanced Technology</h4>
                <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>Precise 3D digital eye scans mapping the absolute custom topography of your cornea.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', padding: '20px', background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '16px' }}>
              <div className="icon-box" style={{ background: 'rgba(140, 178, 242, 0.08)', color: 'var(--accent-primary)' }}>
                <MapPin size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>Personal Focus</h4>
                <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>Completely customized treatment profiles tailored to your lifestyle and eyes.</p>
              </div>
            </div>
          </div>

          {/* Cost Comparison Table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '8px' }}>
              The Cost of Eyewear vs. LASIK
            </h3>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr auto 1fr', 
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '20px',
              overflow: 'hidden'
            }} className="cost-comparison">
              
              <div style={{ background: 'rgba(239, 68, 68, 0.03)', padding: '24px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: '#f87171', background: 'rgba(239, 68, 68, 0.1)', padding: '4px 12px', borderRadius: '6px' }}>Without LASIK</span>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Contacts</span><strong>$500/yr</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Solutions</span><strong>$150/yr</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Exams</span><strong>$200/yr</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Glasses</span><strong>$300/yr</strong></div>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px', width: '100%', display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '0.9rem', color: '#f87171' }}>
                  <span>Annual Cost:</span>
                  <span>~$1,150</span>
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#f87171', marginTop: '6px' }}>~$34,500</div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>over 30 years</span>
              </div>

              <div className="cost-comparison-vs" style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.85rem' }}>vs</div>

              <div style={{ background: 'rgba(110, 154, 120, 0.04)', padding: '24px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: '#7fae8a', background: 'rgba(110, 154, 120, 0.1)', padding: '4px 12px', borderRadius: '6px' }}>With LASIK</span>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Daily Contacts</span><strong>$0</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Solutions</span><strong>$0</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Glasses</span><strong>$0</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Freedom</span><strong>Priceless</strong></div>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px', width: '100%', display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '0.9rem', color: '#7fae8a' }}>
                  <span>Breakeven:</span>
                  <span>~3–4 yrs</span>
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#7fae8a', marginTop: '6px' }}>Decades</div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>of visual freedom</span>
              </div>

            </div>
          </div>

        </div>

        {/* Consultation Callout */}
        <div className="glass-panel" style={{ padding: '36px', marginTop: '48px', background: 'radial-gradient(circle at top right, rgba(110, 154, 120, 0.05) 0%, rgba(127, 161, 214, 0.01) 70%)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'center' }} className="responsive-grid">
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
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><span style={{ color: '#7fae8a', fontWeight: 'bold' }}>✓</span> Advanced Corneal Topography Mapping</div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><span style={{ color: '#7fae8a', fontWeight: 'bold' }}>✓</span> 1-on-1 Surgeon Q&A with Dr. Marano</div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><span style={{ color: '#7fae8a', fontWeight: 'bold' }}>✓</span> Personalized Visual Treatment Plan</div>
              </div>
              <button 
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

import React from 'react';
import LasikSteps from './components/LasikSteps';
import CandidateQuiz from './components/CandidateQuiz';
import { Eye, ArrowDown, Activity, Award, MapPin, ShieldCheck, Calendar } from 'lucide-react';
import logo from './assets/marano-logo.png';
import heroImg from './assets/hero.png';

function App() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(10, 15, 22, 0.8)',
        backdropFilter: 'blur(12px)',
        zIndex: 100,
        borderBottom: '1px solid var(--border-light)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 'bold', fontSize: '1.2rem' }}>
          <img src={logo} alt="Marano Eye Care" height="40" style={{ objectFit: 'contain' }} />
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <button 
            onClick={() => scrollToSection('quiz')}
            style={{ background: 'transparent', color: 'var(--text-secondary)', fontSize: '1rem' }}
          >
            Am I a Candidate?
          </button>
          <button 
            onClick={() => scrollToSection('education')}
            className="btn btn-primary"
            style={{ padding: '8px 20px', fontSize: '0.9rem' }}
          >
            The Procedure
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px 24px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background glow effects */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '70%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(0,0,0,0) 70%)',
          zIndex: -1,
          borderRadius: '50%',
          filter: 'blur(45px)'
        }} />
        <div style={{
          position: 'absolute',
          top: '60%',
          left: '20%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(45,212,191,0.08) 0%, rgba(0,0,0,0) 70%)',
          zIndex: -1,
          borderRadius: '50%',
          filter: 'blur(45px)'
        }} />

        <div className="container hero-container">
          {/* Left Column (Text & CTAs) */}
          <div className="hero-left">
            <div className="glass-panel" style={{ padding: '10px 20px', borderRadius: 'var(--border-radius-full)', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-secondary)' }}>
              <Activity size={18} /> State-of-the-art Laser Technology
            </div>

            <h1 style={{ fontSize: '4rem', marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              Experience the world with <br/>
              <span className="text-gradient">Absolute Clarity</span>
            </h1>
            
            <p className="text-secondary" style={{ fontSize: '1.25rem', maxWidth: '600px', marginBottom: '40px', lineHeight: '1.6' }}>
              Discover how LASIK can transform your life. Learn about the procedure and see if you qualify in under 60 seconds.
            </p>
            
            <div className="responsive-flex-col" style={{ display: 'flex', gap: '16px' }}>
              <button onClick={() => scrollToSection('quiz')} className="btn btn-primary">
                Take the Candidate Quiz
              </button>
              <button onClick={() => scrollToSection('education')} className="btn btn-secondary">
                Learn About the Procedure
              </button>
            </div>
          </div>

          {/* Right Column (Hero Image) */}
          <div className="hero-image-wrapper">
            <div className="hero-image-card hero-float">
              <img 
                src={heroImg} 
                alt="LASIK Eye Surgery Technology" 
                loading="eager"
              />
            </div>
          </div>
        </div>

        <div 
          onClick={() => scrollToSection('quiz')}
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            animation: 'bounce 2s infinite ease-in-out',
            zIndex: 10
          }}
        >
          <ArrowDown size={32} />
        </div>
      </header>

      {/* Trust Metrics Section */}
      <section className="trust-metrics-section">
        <div className="container trust-metrics-grid">
          <div className="glass-panel trust-metric-card">
            <Award className="trust-icon" size={28} />
            <div>
              <div className="trust-value">20+ Years</div>
              <div className="trust-label">Clinical Experience</div>
            </div>
          </div>
          
          <div className="glass-panel trust-metric-card">
            <MapPin className="trust-icon" size={28} />
            <div>
              <div className="trust-value">4 NJ Locations</div>
              <div className="trust-label">Convenient Care</div>
            </div>
          </div>
          
          <div className="glass-panel trust-metric-card">
            <ShieldCheck className="trust-icon" size={28} />
            <div>
              <div className="trust-value">FDA-Approved</div>
              <div className="trust-label">Safe & Proven Tech</div>
            </div>
          </div>
          
          <div className="glass-panel trust-metric-card">
            <Calendar className="trust-icon" size={28} />
            <div>
              <div className="trust-value">100% Free</div>
              <div className="trust-label">Initial Consultation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Areas */}
      <main>
        <CandidateQuiz />
        
        <div style={{ height: '1px', background: 'var(--border-light)', maxWidth: '800px', margin: '40px auto' }} />
        
        <div id="education">
          <LasikSteps />
        </div>
      </main>

      {/* Full-width CTA Section */}
      <section style={{ padding: '80px 24px 0 24px', position: 'relative', overflow: 'hidden' }}>
        {/* Glow behind CTA */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, rgba(0,0,0,0) 70%)',
          zIndex: -1,
          borderRadius: '50%',
          filter: 'blur(45px)'
        }} />

        <div className="container">
          <div className="glass-panel" style={{
            padding: '60px 40px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            border: '1px solid var(--border-light)',
            borderRadius: '24px',
            position: 'relative',
            zIndex: 1
          }}>
            <h2 className="text-gradient" style={{ fontSize: '3rem', margin: 0, fontWeight: '800', letterSpacing: '-0.02em' }}>
              Ready to See Clearly?
            </h2>
            <p className="text-secondary" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
              Schedule your complimentary, no-obligation LASIK consultation today. Our world-class specialists are ready to guide you to visual freedom.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', margin: '16px 0' }}>
              <span className="text-muted" style={{ textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '2px', fontWeight: '600' }}>
                Call us directly at
              </span>
              <a 
                href="tel:9733220100" 
                style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '800', 
                  color: 'var(--text-primary)', 
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
                onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
              >
                973-322-0100
              </a>
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a 
                href="https://mec1.net/contact" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
                style={{ textDecoration: 'none', padding: '14px 36px', fontSize: '1.1rem' }}
              >
                Schedule Free Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px',
        textAlign: 'center',
        borderTop: '1px solid var(--border-light)',
        color: 'var(--text-muted)',
        marginTop: '80px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 'bold' }}>
            <img src={logo} alt="Marano Eye Care Logo" height="32" style={{ objectFit: 'contain' }} />
          </div>
          <p>200 South Orange Ave, Suite 209, Livingston NJ, 07039</p>
          <p>Phone: <a href="tel:973-322-0100">(973) 322-0100</a> | Email: <a href="mailto:LASIK@mec1.net">LASIK@mec1.net</a></p>
        </div>
        <p>© 2026 Marano Eye Care. All rights reserved.</p>
        <p style={{ fontSize: '0.85rem', marginTop: '8px', maxWidth: '600px', margin: '8px auto' }}>
          Disclaimer: This self-test is for educational purposes only and does not replace a comprehensive medical examination and consultation with a qualified ophthalmologist.
        </p>
      </footer>
    </>
  );
}

export default App;

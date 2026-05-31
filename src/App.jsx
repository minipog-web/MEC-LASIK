import React from 'react';
import LasikSteps from './components/LasikSteps';
import CandidateQuiz from './components/CandidateQuiz';
import MaranoSection from './components/MaranoSection';
import ContactForm from './components/ContactForm';
import { Eye, ArrowDown, Activity, Award, MapPin, ShieldCheck, Calendar } from 'lucide-react';
import logo from './assets/marano-logo.png';
import heroImg from './assets/hero.png';

function App() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Dynamic Background Mesh Orbs */}
      <div className="bg-glow-1" />
      <div className="bg-glow-2" />

      {/* Navigation */}
      <nav 
        id="main-navigation"
        className={isScrolled ? 'scrolled' : ''}
      >
        {/* Integrated Logo inside header bar */}
        <div 
          id="logo-container"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <img src={logo} alt="Marano Eye Care" height="36" style={{ objectFit: 'contain' }} />
        </div>
        
        {/* Menu Buttons - hidden on mobile, fades on scroll on desktop */}
        <div 
          className="nav-links-group"
          style={{ 
            display: 'flex', 
            gap: '24px', 
            marginLeft: 'auto', 
            alignItems: 'center',
            opacity: isScrolled ? 0 : 1,
            transform: isScrolled ? 'translateY(-10px)' : 'translateY(0)',
            pointerEvents: isScrolled ? 'none' : 'auto',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <button 
            id="nav-candidate-btn"
            onClick={() => scrollToSection('quiz')}
            style={{ 
              background: 'transparent', 
              color: 'var(--text-secondary)', 
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'color 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            Am I a Candidate?
          </button>
          <button 
            id="nav-procedure-btn"
            onClick={() => scrollToSection('education')}
            className="btn btn-primary"
            style={{ padding: '10px 24px', fontSize: '0.95rem' }}
          >
            The Procedure
          </button>
        </div>

        {/* Mobile-only CTA button */}
        <div
          className="nav-cta-only"
          style={{
            display: 'none',
            marginLeft: 'auto',
            alignItems: 'center',
          }}
        >
          <button
            onClick={() => scrollToSection('quiz')}
            className="btn btn-primary"
            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
          >
            Check Candidacy
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(100px, 15vh, 140px) 24px clamp(60px, 10vh, 100px)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container hero-container">
          {/* Left Column (Text & CTAs) */}
          <div className="hero-left">
            <div className="glass-panel" style={{ 
              padding: '6px 16px 6px 6px', 
              borderRadius: 'var(--border-radius-full)', 
              marginBottom: '32px', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '12px', 
              color: 'var(--accent-secondary)',
              border: '1px solid rgba(110, 154, 120, 0.15)',
              background: 'rgba(255, 255, 255, 0.01)',
              width: 'fit-content'
            }}>
              <div className="icon-box" style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: 'rgba(110, 154, 120, 0.08)', 
                border: '1px solid rgba(110, 154, 120, 0.2)', 
                color: 'var(--accent-secondary)',
                boxShadow: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Activity size={16} />
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                State-of-the-Art Laser Technology
              </span>
            </div>

            <h1 style={{ 
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(3.2rem, 8vw, 5.5rem)', 
              fontWeight: '300', 
              marginBottom: '24px', 
              letterSpacing: '-0.01em', 
              lineHeight: 1.1 
            }}>
              Experience the world with <br/>
              <span className="text-gradient" style={{ 
                fontFamily: 'var(--font-sans)', 
                fontWeight: '800',
                letterSpacing: '-0.03em',
                whiteSpace: 'nowrap'
              }}>Absolute Clarity</span>
            </h1>
            
            <p className="text-secondary" style={{ fontSize: '1.25rem', maxWidth: '600px', marginBottom: '48px', lineHeight: '1.7', fontWeight: '400' }}>
              Every morning without LASIK is another day reaching for glasses. Learn about the procedure and see if you qualify in under 60 seconds.
            </p>
            
            <div className="responsive-flex-col" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button onClick={() => scrollToSection('quiz')} className="btn btn-primary">
                Take the Candidate Quiz 
                <span className="btn-icon-wrapper">
                  <Eye size={14} />
                </span>
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
            <div className="icon-box">
              <Award className="trust-icon" size={24} />
            </div>
            <div>
              <div className="trust-value">30+ Years</div>
              <div className="trust-label">Clinical Experience</div>
            </div>
          </div>
          
          <div className="glass-panel trust-metric-card">
            <div className="icon-box">
              <MapPin className="trust-icon" size={24} />
            </div>
            <div>
              <div className="trust-value">3 NJ Locations</div>
              <div className="trust-label">Convenient Care</div>
            </div>
          </div>
          
          <div className="glass-panel trust-metric-card">
            <div className="icon-box">
              <ShieldCheck className="trust-icon" size={24} />
            </div>
            <div>
              <div className="trust-value">FDA-Approved</div>
              <div className="trust-label">Safe & Proven Tech</div>
            </div>
          </div>
          
          <div className="glass-panel trust-metric-card">
            <div className="icon-box">
              <Calendar className="trust-icon" size={24} />
            </div>
            <div>
              <div className="trust-value">Pressure Free</div>
              <div className="trust-label">Consultation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Dr. Matthew Marano & Brand/Cost Comparison */}
      <MaranoSection />

      {/* Main Content Areas */}
      <main>
        <CandidateQuiz />
        
        <div style={{ height: '1px', background: 'var(--border-light)', maxWidth: '800px', margin: '40px auto' }} />
        
        <div id="education">
          <LasikSteps />
        </div>
      </main>

      {/* Full-width CTA Section */}
      <section className="cta-section" style={{ padding: '100px 24px 20px 24px', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div className="glass-panel cta-glass-panel" style={{
            padding: '60px 40px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '28px',
            position: 'relative',
            zIndex: 1
          }}>
            <h2 className="text-gradient" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)', margin: 0, fontWeight: '700', letterSpacing: '-0.02em' }}>
              How Much Longer Will You Wait?
            </h2>
            <p className="text-secondary" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.7' }}>
              Schedule your complimentary, no-obligation consultation today — most patients say their only regret is not doing it sooner.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', margin: '12px 0' }}>
              <span className="text-muted" style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2.5px', fontWeight: '700' }}>
                Call us directly at
              </span>
              <a 
                href="tel:9733220100" 
                style={{ 
                  fontSize: 'clamp(1.6rem, 6vw, 3rem)', 
                  fontWeight: '800', 
                  color: 'var(--text-primary)', 
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
                onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
              >
                973-322-0100
              </a>
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="btn btn-primary"
                style={{ padding: '14px 36px', fontSize: '1.1rem' }}
              >
                Schedule Free Consultation
                <span className="btn-icon-wrapper">
                  <Calendar size={14} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Native Contact Form */}
      <ContactForm />

      {/* Footer */}
      <footer className="footer-content" style={{
        padding: '40px',
        textAlign: 'center',
        borderTop: '1px solid var(--border-light)',
        color: 'var(--text-muted)',
        marginTop: '80px'
      }}>
        <div style={{ marginBottom: '16px' }}>
          <img src={logo} alt="Marano Eye Care Logo" height="32" style={{ objectFit: 'contain', display: 'inline-block', marginBottom: '8px' }} />
          <p style={{ fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)', lineHeight: '1.6', margin: '8px 0' }}>200 South Orange Ave, Suite 209, Livingston NJ, 07039</p>
          <p style={{ fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)', lineHeight: '1.6', margin: '8px 0' }}>Phone: <a href="tel:973-322-0100">(973) 322-0100</a> | Email: <a href="mailto:LASIK@mec1.net">LASIK@mec1.net</a></p>
        </div>
        <p style={{ fontSize: 'clamp(0.75rem, 2vw, 0.9rem)' }}>© 2026 Marano Eye Care. All rights reserved.</p>
        <p style={{ fontSize: '0.8rem', marginTop: '8px', maxWidth: '600px', margin: '8px auto', lineHeight: '1.6' }}>
          Disclaimer: This self-test is for educational purposes only and does not replace a comprehensive medical examination and consultation with a qualified ophthalmologist.
        </p>
      </footer>
    </>
  );
}

export default App;

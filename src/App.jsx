import React from 'react';
import LasikSteps from './components/LasikSteps';
import LasikScience from './components/LasikScience';
import CandidateQuiz from './components/CandidateQuiz';
import MaranoSection from './components/MaranoSection';
import ContactForm from './components/ContactForm';
import SocialProofSection from './components/SocialProofSection';
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
        <a 
          id="logo-container"
          href="https://www.maranoeyecare.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <img 
            src={logo} 
            alt="Marano Eye Care" 
            className="nav-logo"
          />
        </a>
        
        {/* Menu Buttons - hidden on mobile, fades on scroll on desktop */}
        <div 
          className="nav-links-group"
          style={{ 
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(80px, 10vh, 100px) 24px clamp(40px, 5vh, 60px)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container hero-container" style={{ width: '100%' }}>
          {/* Left Column (Text & CTAs) */}
          <div className="hero-left">
            <div className="hero-eyebrow animate-fade-up delay-1">
              <div className="icon-box" style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: 'rgba(0, 240, 255, 0.08)', 
                border: '1px solid rgba(0, 240, 255, 0.2)', 
                color: 'var(--accent-primary)',
                boxShadow: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Activity size={16} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--accent-primary)' }}>
                State-of-the-Art Laser Technology
              </span>
            </div>

            <h1 className="animate-fade-up delay-2" style={{ margin: 0, display: 'flex', flexDirection: 'column' }}>
              <span className="hero-serif-title">Experience the world with</span>
              <span className="hero-display-title">Absolute Clarity</span>
            </h1>

            
            <p className="text-secondary animate-fade-up delay-3" style={{ fontSize: '1.25rem', maxWidth: '600px', marginBottom: '48px', lineHeight: '1.7', fontWeight: '400' }}>
              Stop renting your sight from lenses and frames. Reclaim instant visual autonomy and wake up to pristine, high-definition clarity. Calculate your compatibility in under 60 seconds.
            </p>
            
            <div className="responsive-flex-col animate-fade-up delay-4" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button type="button" onClick={() => scrollToSection('quiz')} className="btn btn-primary" style={{ padding: '14px 32px' }}>
                Take the Candidate Quiz 
                <span className="btn-icon-wrapper">
                  <Eye size={14} />
                </span>
              </button>
              <button type="button" onClick={() => scrollToSection('education')} className="btn btn-secondary" style={{ padding: '14px 32px' }}>
                Learn About the Procedure
              </button>
            </div>
          </div>

          {/* Right Column (Hero Image with Diagnostic HUD Overlay) */}
          <div className="hero-image-wrapper animate-fade-up delay-5" style={{ position: 'relative' }}>
            {/* HUD Reticle Corners */}
            <div style={{ position: 'absolute', top: '-10px', left: '-10px', width: '20px', height: '20px', borderTop: '3px solid var(--accent-primary)', borderLeft: '3px solid var(--accent-primary)', zIndex: 10 }} />
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '20px', height: '20px', borderTop: '3px solid var(--accent-primary)', borderRight: '3px solid var(--accent-primary)', zIndex: 10 }} />
            <div style={{ position: 'absolute', bottom: '-10px', left: '-10px', width: '20px', height: '20px', borderBottom: '3px solid var(--accent-primary)', borderLeft: '3px solid var(--accent-primary)', zIndex: 10 }} />
            <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', width: '20px', height: '20px', borderBottom: '3px solid var(--accent-primary)', borderRight: '3px solid var(--accent-primary)', zIndex: 10 }} />
            
            <div className="hero-image-card hero-float" style={{
              border: '1px solid rgba(0, 240, 255, 0.25)',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.7), 0 0 45px rgba(0, 240, 255, 0.15)'
            }}>
              <img 
                src={heroImg} 
                alt="LASIK Eye Surgery Technology" 
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* Trust Metrics Grid (Moved inside header so it shows on first view, numbers removed) */}
        <div className="container trust-metrics-grid animate-fade-up delay-6" style={{ width: '100%', marginTop: '48px', position: 'relative', zIndex: 10 }}>
          <div className="trust-pillar-card" style={{ border: '1px solid rgba(0, 240, 255, 0.15)' }}>
            <div className="icon-box" style={{ background: 'rgba(0, 240, 255, 0.08)', border: '1px solid rgba(0, 240, 255, 0.25)', color: 'var(--accent-primary)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award className="trust-icon" size={24} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px', whiteSpace: 'nowrap' }}>30+ Years</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Clinical Experience</div>
            </div>
          </div>
          
          <div className="trust-pillar-card" style={{ border: '1px solid rgba(0, 240, 255, 0.15)' }}>
            <div className="icon-box" style={{ background: 'rgba(0, 240, 255, 0.08)', border: '1px solid rgba(0, 240, 255, 0.25)', color: 'var(--accent-primary)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MapPin className="trust-icon" size={24} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px', whiteSpace: 'nowrap' }}>3 NJ Locations</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Convenient Care</div>
            </div>
          </div>
          
          <div className="trust-pillar-card" style={{ border: '1px solid rgba(0, 240, 255, 0.15)' }}>
            <div className="icon-box" style={{ background: 'rgba(0, 240, 255, 0.08)', border: '1px solid rgba(0, 240, 255, 0.25)', color: 'var(--accent-primary)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck className="trust-icon" size={24} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px', whiteSpace: 'nowrap' }}>FDA-Approved</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Safe & Proven Tech</div>
            </div>
          </div>
          
          <div className="trust-pillar-card" style={{ border: '1px solid rgba(0, 240, 255, 0.15)' }}>
            <div className="icon-box" style={{ background: 'rgba(0, 240, 255, 0.08)', border: '1px solid rgba(0, 240, 255, 0.25)', color: 'var(--accent-primary)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar className="trust-icon" size={24} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px', whiteSpace: 'nowrap' }}>Pressure Free</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Consultation</div>
            </div>
          </div>
        </div>
      </header>

      {/* Meet Dr. Matthew Marano & Brand/Cost Comparison */}
      <MaranoSection />

      {/* Main Content Areas */}
      <main>
        <CandidateQuiz />
        
        <div style={{ height: '1px', background: 'var(--border-light)', maxWidth: '800px', margin: '40px auto' }} />
        
        <div id="education">
          <LasikScience />
          <div style={{ height: '1px', background: 'var(--border-light)', maxWidth: '800px', margin: '40px auto' }} />
          <LasikSteps />
        </div>

        <SocialProofSection />
      </main>

      {/* Native Contact Form (which now incorporates the merged CTA details) */}
      <ContactForm />

      {/* Footer */}
      <footer className="footer-content" style={{
        padding: '40px',
        textAlign: 'center',
        borderTop: '1px solid var(--border-light)',
        color: 'var(--text-muted)',
        marginTop: '80px'
      }}>
        <div style={{ marginBottom: '24px' }}>
          <a 
            href="https://www.maranoeyecare.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
              display: 'inline-block', 
              marginBottom: '16px',
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img 
              src={logo} 
              alt="Marano Eye Care Logo" 
              height="54" 
              style={{ 
                objectFit: 'contain', 
                filter: 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.15)) brightness(1.05)' 
              }} 
            />
          </a>
          <p style={{ fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)', lineHeight: '1.6', margin: '8px 0' }}>200 South Orange Ave, Suite 209, Livingston NJ, 07039</p>
          <p style={{ fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)', lineHeight: '1.6', margin: '8px 0' }}>Phone: <a href="tel:973-322-0100">(973) 322-0100</a> | Email: <a href="mailto:LASIK@mec1.net">LASIK@mec1.net</a></p>
        </div>
        <p style={{ fontSize: 'clamp(0.75rem, 2vw, 0.9rem)' }}>© 2026 Marano Eye Care. All rights reserved.</p>
        <p style={{ fontSize: '0.8rem', marginTop: '8px', maxWidth: '750px', margin: '8px auto', lineHeight: '1.6' }}>
          Disclaimer: This self-test is for educational purposes only and does not replace a comprehensive medical examination and consultation with a qualified ophthalmologist. LASIK is a surgical procedure that carries risks. Possible post-operative side effects include dry eyes, temporary or permanent visual disturbances (such as glare, halos, starbursts, and double vision, particularly at night), and the possible need for a repeat enhancement procedure to correct residual refractive errors.
        </p>
      </footer>
    </>
  );
}

export default App;

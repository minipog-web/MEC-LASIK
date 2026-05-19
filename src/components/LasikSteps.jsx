import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Info, CheckCircle2 } from 'lucide-react';
import prepImg from '../assets/lasik_prep.png';
import flapImg from '../assets/lasik_flap.png';
import reshapeImg from '../assets/lasik_reshape.png';
import repositionImg from '../assets/lasik_reposition.png';
import healingImg from '../assets/lasik_healing.png';

const steps = [
  {
    id: 1,
    title: 'Pre-Procedure Preparation',
    purpose: 'To map the exact topography of your eye and prepare it for treatment.',
    experience: 'You will rest comfortably as we administer numbing eye drops. A gentle eyelid holder is placed to prevent blinking. You will focus on a light while we take a precise 3D digital scan of your cornea.',
    image: prepImg,
    animationClass: 'animate-scan'
  },
  {
    id: 2,
    title: 'Creating the Corneal Flap',
    purpose: 'To access the underlying corneal tissue (stroma) where the vision correction will take place.',
    experience: 'You may feel a slight pressure, and your vision will momentarily dim. A state-of-the-art femtosecond laser creates microscopic bubbles to form a highly precise, ultra-thin flap in less than 30 seconds.',
    image: flapImg,
    animationClass: ''
  },
  {
    id: 3,
    title: 'Reshaping the Cornea',
    purpose: 'To permanently correct your refractive error (nearsightedness, farsightedness, or astigmatism) based on your custom 3D map.',
    experience: 'You will hear a clicking sound and perhaps smell a faint scent similar to a laser printer. You just need to stare at the target light. The computer-guided excimer laser painlessly removes microscopic tissue in seconds.',
    image: reshapeImg,
    animationClass: 'pulse-animation'
  },
  {
    id: 4,
    title: 'Repositioning the Flap',
    purpose: 'To protect the reshaped tissue and promote rapid, natural healing without stitches.',
    experience: 'The surgeon gently folds the flap back into its original position. It acts as a natural bandage. Your vision will begin to clear almost immediately, though it may be slightly blurry like looking underwater.',
    image: repositionImg,
    animationClass: ''
  },
  {
    id: 5,
    title: 'Post-Procedure Healing',
    purpose: 'To allow the eye to rest and stabilize the new visual acuity.',
    experience: 'The entire procedure is complete! The healing process begins instantly. The anxiolytic administered pre-operatively will help you rest for about 4 hours. When you wake up, much of the healing has already begun. Many patients notice dramatically improved vision within 24 hours. We provide protective shields for sleeping and medicated drops to ensure optimal healing.',
    image: healingImg,
    animationClass: ''
  }
];

export default function LasikSteps() {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <div className="section" style={{ padding: '100px 24px' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '60px' }}>
          <h2 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '20px', fontWeight: '700', letterSpacing: '-0.02em' }}>The LASIK Journey</h2>
          <p className="text-secondary" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem', lineHeight: '1.7' }}>
            We believe an informed patient is a confident patient. Explore the exact steps you'll experience during your vision correction journey.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '48px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '40px' }}>

            {/* Progress Indicator */}
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: '20px' }}>
              <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '2px', background: 'var(--border-light)', zIndex: 0, transform: 'translateY(-50%)' }} />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '0',
                height: '2px',
                background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
                zIndex: 1,
                transform: 'translateY(-50%)',
                width: `${(activeStep / (steps.length - 1)) * 100}%`,
                transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
              }} />

              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: index <= activeStep ? 'var(--bg-secondary)' : 'var(--bg-tertiary)',
                    border: `2px solid ${index <= activeStep ? 'var(--accent-primary)' : 'var(--border-light)'}`,
                    color: index <= activeStep ? 'var(--accent-primary)' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: index === activeStep ? '0 0 15px var(--accent-glow)' : 'none'
                  }}
                  aria-label={`Go to step ${index + 1}`}
                >
                  {index < activeStep ? <CheckCircle2 size={18} /> : step.id}
                </button>
              ))}
            </div>

            <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
              {/* Image Column */}
              <div className="animate-fade-in step-image-col" key={`img-${activeStep}`}>
                <div className={`step-image-container ${steps[activeStep].animationClass}`}>
                  <img 
                    src={steps[activeStep].image} 
                    alt={steps[activeStep].title} 
                    loading="lazy" 
                    width="1024" 
                    height="1024" 
                  />
                  <div className="image-overlay-glow" />
                </div>
              </div>

              {/* Content Column */}
              <div className="animate-fade-in step-content-col" key={`content-${activeStep}`} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <span style={{
                    color: 'var(--accent-secondary)',
                    fontWeight: '700',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    fontSize: '0.8rem',
                    display: 'block',
                    marginBottom: '8px'
                  }}>
                    Step {steps[activeStep].id}
                  </span>
                  <h3 style={{ fontSize: '1.85rem', margin: 0, fontWeight: '700', lineHeight: 1.25 }}>{steps[activeStep].title}</h3>
                </div>

                <div style={{ background: 'rgba(127, 161, 214, 0.04)', padding: '24px', borderRadius: '16px', borderLeft: '4px solid var(--accent-primary)', borderTop: '1px solid rgba(255, 255, 255, 0.02)', borderRight: '1px solid rgba(255, 255, 255, 0.02)', borderBottom: '1px solid rgba(255, 255, 255, 0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: '600' }}>
                    <Info size={18} color="var(--accent-primary)" /> Purpose
                  </div>
                  <p className="text-secondary" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                    {steps[activeStep].purpose}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>What to Expect:</h4>
                  <p className="text-secondary" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                    {steps[activeStep].experience}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginTop: 'auto', paddingTop: '16px' }}>
                  <button
                    onClick={prevStep}
                    disabled={activeStep === 0}
                    className={`btn btn-secondary ${activeStep === 0 ? 'btn-disabled' : ''}`}
                    style={{ padding: '12px 24px' }}
                  >
                    <ChevronLeft size={20} /> Previous
                  </button>
                  <button
                    onClick={nextStep}
                    className="btn btn-primary"
                    style={{ padding: '12px 28px' }}
                  >
                    {activeStep === steps.length - 1 ? 'Finish Journey' : 'Next Step'}
                    <span className="btn-icon-wrapper">
                      <ChevronRight size={16} />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

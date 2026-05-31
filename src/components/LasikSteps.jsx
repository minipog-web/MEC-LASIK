import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Info, CheckCircle2, Play, RotateCcw, Activity } from 'lucide-react';
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
    scienceTitle: 'Diagnostic Wavefront & Topography Mapping',
    scienceDetails: 'Our doctors use a high-definition wavefront analyzer to project 22,000 unique elevation points onto your cornea. This creates a detailed 3D optical map, measuring aberrations down to the sub-micron level (0.01 µm) to guide custom laser profiling.'
  },
  {
    id: 2,
    title: 'Creating the Corneal Flap',
    purpose: 'To access the underlying corneal tissue (stroma) where the vision correction will take place.',
    experience: 'You may feel a slight pressure, and your vision will momentarily dim. A state-of-the-art femtosecond laser creates microscopic bubbles to form a highly precise, ultra-thin flap in less than 30 seconds.',
    image: flapImg,
    scienceTitle: 'Femtosecond Laser Incision',
    scienceDetails: 'An ultra-fast femtosecond laser emits light pulses at a quadrillionth of a second. It focuses light to form a precise layer of microscopic carbon dioxide/water gas bubbles at a calibrated depth (typically 110 µm) beneath the corneal surface, separating the tissue without heat or blades.'
  },
  {
    id: 3,
    title: 'Reshaping the Cornea',
    purpose: 'To permanently correct your refractive error (nearsightedness, farsightedness, or astigmatism) based on your custom 3D map.',
    experience: 'You will hear a clicking sound. You just need to stare at the target light. The computer-guided excimer laser painlessly removes microscopic tissue to flatten or reshape the cornea in seconds.',
    image: reshapeImg,
    scienceTitle: 'Excimer Laser Photoablation',
    scienceDetails: 'A computer-guided cold excimer laser uses 193 nm ultraviolet light to disrupt molecular bonds in the stromal layer. Each pulse vaporizes a minute layer of tissue (0.25 microns deep) in under 1.4 milliseconds, reshaping the curvature to eliminate myopia, hyperopia, or astigmatism.'
  },
  {
    id: 4,
    title: 'Repositioning the Flap',
    purpose: 'To protect the reshaped tissue and promote rapid, natural healing without stitches.',
    experience: 'The surgeon gently folds the flap back into its original position. It acts as a natural bandage. Your vision will begin to clear almost immediately, though it may be slightly blurry like looking underwater.',
    image: repositionImg,
    scienceTitle: 'Stitchless Corneal Cohesion',
    scienceDetails: 'The flap is smoothed back over the reshaped cornea, matching the custom borders. Within minutes, natural osmotic pressure and cellular adhesion pull the flap taut. Natural endothelial cell pumps seal the edge, eliminating any need for sutures.'
  },
  {
    id: 5,
    title: 'Post-Procedure Healing',
    purpose: 'To allow the eye to rest and stabilize the new visual acuity.',
    experience: 'The entire procedure is complete! The healing process begins instantly. When you wake up, much of the healing has already begun. Many patients notice dramatically improved vision within 24 hours.',
    image: healingImg,
    scienceTitle: 'Epithelial Regeneration & Stabilization',
    scienceDetails: 'The surface epithelium regenerates and seals the flap edge within 24 to 48 hours. Medicated anti-inflammatory and antibiotic drops promote smooth corneal re-epithelialization, leading to structural stability and sharp visual acuity within a day.'
  }
];

export default function LasikSteps() {
  const [activeStep, setActiveStep] = useState(0);
  const [visualMode, setVisualMode] = useState('render'); // 'render' or 'simulator'
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [autoplayProgress, setAutoplayProgress] = useState(0); // 0 to 100
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  // Animation values computed from step or autoplay progress
  let flapAngle = 0;
  let corneaCurve = 72; // 72 is normal myopia, 86 is reshaped/flatter
  let chartBlur = 3; // 3px to 0px
  let focusRadius = 8;
  let focusBlur = 2;
  let focusColor = 'rgba(127, 161, 214, 0.6)';
  let laserActive = false;
  let cutActive = false;
  let nozzleY = 0;
  let sparks = [];

  // If in autoplay, compute values based on elapsed animation time
  if (isAutoplay) {
    const totalDuration = 9000; // 9 seconds total autoplay
    const elapsed = autoplayProgress * totalDuration;

    if (elapsed < 2000) {
      // Step 1: Flap Creation
      if (elapsed < 1000) {
        cutActive = true;
        const cutProgress = elapsed / 1000;
        nozzleY = cutProgress * 130;
      } else {
        const openProgress = (elapsed - 1000) / 1000;
        flapAngle = openProgress * 130;
        nozzleY = 130 - openProgress * 65;
      }
    } else if (elapsed >= 2000 && elapsed < 6000) {
      // Step 2: Sculpting
      flapAngle = 130;
      laserActive = true;
      const sculptProgress = (elapsed - 2000) / 4000;
      corneaCurve = 72 + sculptProgress * 14;
      chartBlur = 3 - sculptProgress * 2;
      nozzleY = 65;

      // Generate visual sparks based on elapsed frame
      const sparkCount = 3;
      for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI - Math.PI / 2;
        const dist = 5 + Math.random() * 15;
        sparks.push({
          cx: 110 + Math.cos(angle) * dist - 25,
          cy: 110 + Math.sin(angle) * dist,
          r: 1 + Math.random() * 2,
          opacity: 0.5 + Math.random() * 0.5
        });
      }
    } else if (elapsed >= 6000 && elapsed < 7500) {
      // Step 3: Repositioning
      const closeProgress = (elapsed - 6000) / 1500;
      flapAngle = 130 - closeProgress * 130;
      corneaCurve = 86;
      chartBlur = 1;
      nozzleY = 65 - closeProgress * 65;
    } else {
      // Step 4: Healing / Crisp focus
      flapAngle = 0;
      corneaCurve = 86;
      const focusProgress = Math.min((elapsed - 7500) / 1500, 1);
      chartBlur = 1 - focusProgress;
      focusRadius = 8 - focusProgress * 5;
      focusBlur = 2 - focusProgress * 2;
      focusColor = `rgba(${110 + focusProgress * 17}, ${154 + focusProgress * 31}, ${120 + focusProgress * 54}, ${0.6 + focusProgress * 0.4})`;
    }
  } else {
    // Manual Step Mode
    if (activeStep === 0) {
      flapAngle = 0;
      corneaCurve = 72;
      chartBlur = 3;
    } else if (activeStep === 1) {
      flapAngle = 130;
      corneaCurve = 72;
      chartBlur = 3;
    } else if (activeStep === 2) {
      flapAngle = 130;
      corneaCurve = 86;
      chartBlur = 1.2;
    } else if (activeStep === 3) {
      flapAngle = 0;
      corneaCurve = 86;
      chartBlur = 0.8;
    } else {
      flapAngle = 0;
      corneaCurve = 86;
      chartBlur = 0;
      focusRadius = 3;
      focusBlur = 0;
      focusColor = 'rgba(110, 154, 120, 1)';
    }
  }

  // Handle Autoplay Animation loop
  useEffect(() => {
    if (isAutoplay) {
      const animate = (timestamp) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;
        const duration = 9000;
        const progress = Math.min(elapsed / duration, 1);

        setAutoplayProgress(progress);

        // Update corresponding text steps along the way
        if (elapsed < 2000) {
          setActiveStep(1);
        } else if (elapsed >= 2000 && elapsed < 6000) {
          setActiveStep(2);
        } else if (elapsed >= 6000 && elapsed < 7500) {
          setActiveStep(3);
        } else {
          setActiveStep(4);
        }

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setIsAutoplay(false);
          setAutoplayProgress(0);
          startTimeRef.current = null;
        }
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      startTimeRef.current = null;
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isAutoplay]);

  const toggleAutoplay = () => {
    if (isAutoplay) {
      setIsAutoplay(false);
      setAutoplayProgress(0);
      setActiveStep(0);
    } else {
      setActiveStep(0);
      setVisualMode('simulator'); // Automatically switch to simulator to show animation
      setIsAutoplay(true);
      setAutoplayProgress(0);
    }
  };

  const nextStep = () => {
    if (isAutoplay) setIsAutoplay(false);
    setActiveStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    if (isAutoplay) setIsAutoplay(false);
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <div className="section" style={{ padding: '80px 24px' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <div className="text-center" style={{ marginBottom: '48px' }}>
          <h2 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '20px', fontWeight: '700', letterSpacing: '-0.02em' }}>
            The LASIK Journey
          </h2>
          <p className="text-secondary" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem', lineHeight: '1.7' }}>
            Understanding the state-of-the-art technology behind your visual freedom. Explore our high-resolution concept art or live laser simulator below.
          </p>
        </div>

        <div className="glass-panel lasik-steps-panel" style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', gap: '36px', overflow: 'hidden' }}>
          
          {/* Progress Timeline Tracker */}
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: '12px' }}>
            <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '2px', background: 'rgba(255, 255, 255, 0.08)', zIndex: 0, transform: 'translateY(-50%)' }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              height: '2px',
              background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
              zIndex: 1,
              transform: 'translateY(-50%)',
              width: `${(activeStep / (steps.length - 1)) * 100}%`,
              transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 0 10px rgba(140, 178, 242, 0.2)'
            }} />

            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoplay(false);
                  setActiveStep(index);
                }}
                className="steps-progress-dot"
                style={{
                  position: 'relative',
                  zIndex: 2,
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: index < activeStep ? 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)' : index === activeStep ? 'var(--bg-secondary)' : 'var(--bg-tertiary)',
                  border: index <= activeStep ? '2px solid var(--accent-primary)' : '2px solid rgba(255, 255, 255, 0.08)',
                  color: index < activeStep ? '#fff' : index === activeStep ? 'var(--accent-primary)' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: index === activeStep ? '0 0 15px rgba(140, 178, 242, 0.2)' : 'none',
                  transform: index === activeStep ? 'scale(1.1)' : 'scale(1)'
                }}
                aria-label={`Go to step ${index + 1}`}
              >
                {index < activeStep ? <CheckCircle2 size={16} /> : step.id}
              </button>
            ))}
          </div>

          {/* Core Interactive Layout */}
          <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '48px', alignItems: 'center' }}>
            
            {/* Left Column: Interactive Visual Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }} className="step-image-col">
              
              {/* Segmented Mode Selector */}
              <div style={{
                display: 'flex',
                background: 'rgba(255, 255, 255, 0.02)',
                padding: '4px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                alignSelf: 'flex-start'
              }}>
                <button
                  onClick={() => {
                    setIsAutoplay(false);
                    setVisualMode('render');
                  }}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    background: visualMode === 'render' ? 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)' : 'transparent',
                    color: visualMode === 'render' ? '#fff' : 'var(--text-muted)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  3D Concept Render
                </button>
                <button
                  onClick={() => {
                    setVisualMode('simulator');
                  }}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    background: visualMode === 'simulator' ? 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)' : 'transparent',
                    color: visualMode === 'simulator' ? '#fff' : 'var(--text-muted)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  Live Simulator
                </button>
              </div>

              <div 
                className="glass-panel" 
                style={{ 
                  background: 'rgba(10, 15, 22, 0.4)', 
                  border: '1px solid rgba(255, 255, 255, 0.05)', 
                  borderRadius: '20px', 
                  padding: '24px', 
                  width: '100%', 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  alignItems: 'center',
                  boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.4)'
                }}
              >
                <div style={{ display: 'flex', width: '100%', gap: '16px', alignItems: 'center', justifyContent: 'center' }} key={`${visualMode}-${activeStep}`}>
                  
                  {visualMode === 'render' ? (
                    /* Futuristic High-Res Image */
                    <div 
                      className="animate-fade-in" 
                      style={{ 
                        position: 'relative', 
                        width: '65%', 
                        borderRadius: '16px', 
                        overflow: 'hidden', 
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        background: 'rgba(0,0,0,0.2)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                      }}
                    >
                      <img 
                        src={steps[activeStep].image} 
                        alt={steps[activeStep].title} 
                        style={{
                          width: '100%',
                          height: 'auto',
                          aspectRatio: '1',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, transparent 65%, rgba(11, 19, 41, 0.9) 100%)',
                        pointerEvents: 'none'
                      }} />
                      <div className="animate-scan" style={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none'
                      }} />
                    </div>
                  ) : (
                    /* Eye Anatomy SVG Simulator */
                    <svg 
                      viewBox="0 0 200 220" 
                      style={{ width: '65%', height: 'auto', overflow: 'visible' }}
                    >
                      {/* Sclera Eyeball */}
                      <path d="M 110,40 A 70,70 0 1,1 110,180" fill="rgba(20, 28, 39, 0.6)" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="2" />
                      <path d="M 165,65 A 70,70 0 0,1 165,155" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
                      
                      {/* Lens */}
                      <ellipse cx="135" cy="110" rx="8" ry="22" fill="rgba(127, 161, 214, 0.2)" stroke="rgba(127, 161, 214, 0.4)" strokeWidth="1.5" />
                      
                      {/* Corneal Bed */}
                      <path d="M 110,40 Q 72,110 110,180" fill="none" stroke="rgba(127, 161, 214, 0.25)" strokeWidth="3" strokeDasharray="2 3" />
                      
                      {/* Dynamic Cornea Profile */}
                      <path d={`M 110,40 Q ${corneaCurve},110 110,180`} fill="none" stroke="var(--accent-primary)" strokeWidth="3.5" strokeLinecap="round" />
                      
                      {/* Corneal Flap */}
                      <path 
                        d="M 110,45 Q 72,110 110,175" 
                        fill="none" 
                        stroke="rgba(255, 255, 255, 0.6)" 
                        strokeWidth="2" 
                        strokeLinecap="round"
                        transform={`rotate(${flapAngle}, 110, 45)`}
                        style={{ transition: isAutoplay ? 'none' : 'transform 0.5s ease' }}
                      />
                      
                      {/* Light Rays */}
                      {activeStep === 4 ? (
                        // Perfect focus rays
                        <>
                          <path d="M 15,70 L 92,90 L 135,102 L 155,110 L 180,110" fill="none" stroke="rgba(127, 161, 214, 0.85)" strokeDasharray="4" strokeWidth="2" />
                          <path d="M 15,150 L 92,130 L 135,118 L 155,110 L 180,110" fill="none" stroke="rgba(127, 161, 214, 0.85)" strokeDasharray="4" strokeWidth="2" />
                          <path d="M 15,110 L 180,110" fill="none" stroke="rgba(127, 161, 214, 0.85)" strokeWidth="1.5" />
                        </>
                      ) : (
                        // Blurry focus rays
                        <>
                          <path d="M 15,70 L 92,90 L 135,102 L 155,110 L 180,118" fill="none" stroke="rgba(127, 161, 214, 0.85)" strokeDasharray="4" strokeWidth="2" />
                          <path d="M 15,150 L 92,130 L 135,118 L 155,110 L 180,102" fill="none" stroke="rgba(127, 161, 214, 0.85)" strokeDasharray="4" strokeWidth="2" />
                          <path d="M 15,110 L 180,110" fill="none" stroke="rgba(127, 161, 214, 0.85)" strokeWidth="1.5" />
                        </>
                      )}

                      {/* Laser Cutting Beam (Step 1) */}
                      {cutActive && (
                        <line x1="15" y1="45" x2="110" y2="45" stroke="#10b981" strokeWidth="2" strokeDasharray="none" filter="drop-shadow(0 0 4px #10b981)" />
                      )}

                      {/* Reshaping Laser Beam (Step 2) */}
                      {laserActive && (
                        <line x1="15" y1="110" x2="90" y2="110" stroke="#f43f5e" strokeWidth="3.5" filter="drop-shadow(0 0 5px #f43f5e)" />
                      )}

                      {/* Laser Nozzle */}
                      <g transform={`translate(0, ${nozzleY})`}>
                        <rect x="8" y="100" width="10" height="20" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                        <rect x="18" y="107" width="4" height="6" fill="#64748b" />
                        <circle cx="20" cy="110" r="1.5" fill={laserActive ? '#f43f5e' : cutActive ? '#10b981' : '#475569'} />
                      </g>

                      {/* Sparks particle container */}
                      <g>
                        {sparks.map((s, idx) => (
                          <circle key={idx} cx={s.cx} cy={s.cy} r={s.r} fill="#ffdd67" opacity={s.opacity} />
                        ))}
                      </g>

                      {/* Retina focus spot */}
                      <circle cx="180" cy={activeStep === 4 ? 110 : 110} r={focusRadius} fill={focusColor} style={{ filter: focusBlur ? `blur(${focusBlur}px)` : 'none', transition: 'all 0.5s ease' }} />

                      {/* Educational label pointers & text overlay */}
                      {activeStep === 0 && (
                        <g opacity="0.8">
                          <path d="M 68,206 L 98,140" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.75" strokeDasharray="1.5" />
                          <text x="15" y="212" fill="var(--accent-primary)" fontSize="7.5" fontWeight="bold">Corneal Topography</text>
                        </g>
                      )}
                      {activeStep === 1 && (
                        <g opacity="0.8">
                          <path d="M 80,18 L 105,38" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.75" strokeDasharray="1.5" />
                          <text x="5" y="15" fill="var(--accent-primary)" fontSize="7.5" fontWeight="bold">Micro-Thin Flap</text>
                        </g>
                      )}
                      {activeStep === 2 && (
                        <g opacity="0.8">
                          <path d="M 28,88 L 18,102" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.75" strokeDasharray="1.5" />
                          <text x="25" y="85" fill="#f43f5e" fontSize="7.5" fontWeight="bold">Excimer Sculpting</text>
                        </g>
                      )}
                      {activeStep === 4 && (
                        <g opacity="0.8">
                          <path d="M 160,206 L 178,118" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.75" strokeDasharray="1.5" />
                          <text x="125" y="212" fill="var(--accent-secondary)" fontSize="7.5" fontWeight="bold">Retinal Focal Point</text>
                        </g>
                      )}
                    </svg>
                  )}

                  {/* Patient Vision Snellen Chart */}
                  <div 
                    style={{ 
                      width: '30%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      background: 'rgba(255, 255, 255, 0.02)', 
                      border: '1px solid rgba(255, 255, 255, 0.05)', 
                      borderRadius: '12px', 
                      padding: '12px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '8px', fontWeight: '700', textAlign: 'center' }}>Patient Vision</span>
                    <div 
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        gap: '4px', 
                        fontFamily: 'monospace', 
                        fontWeight: '700', 
                        color: 'var(--text-secondary)',
                        filter: chartBlur > 0 ? `blur(${chartBlur}px)` : 'none',
                        transition: isAutoplay ? 'none' : 'filter 0.5s ease'
                      }}
                    >
                      <div style={{ fontSize: '24px', color: '#f8fafc', lineHeight: 1 }}>E</div>
                      <div style={{ fontSize: '16px', letterSpacing: '4px', lineHeight: 1 }}>F P</div>
                      <div style={{ fontSize: '12px', letterSpacing: '3px', lineHeight: 1 }}>T O Z</div>
                      <div style={{ fontSize: '9px', letterSpacing: '2px', lineHeight: 1 }}>L P E D</div>
                    </div>
                  </div>

                </div>

                {/* Status Indicator */}
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', minHeight: '20px', textAlign: 'center' }}>
                  {isAutoplay ? (
                    autoplayProgress * 9000 < 2000 ? 'Status: Creating protective flap...' :
                    autoplayProgress * 9000 < 6000 ? 'Status: Sculpting corneal bed...' :
                    autoplayProgress * 9000 < 7500 ? 'Status: Repositioning flap...' :
                    'Status: Realignment complete. Vision is clear!'
                  ) : (
                    activeStep === 0 ? 'Status: Blurry Myopic Vision' :
                    activeStep === 1 ? 'Status: Flap Created & Folded Back' :
                    activeStep === 2 ? 'Status: Corneal bed sculpted by laser' :
                    activeStep === 3 ? 'Status: Flap returned to position' :
                    'Status: Clear focused vision achieved!'
                  )}
                </div>

                {/* Autoplay play/reset button */}
                <button 
                  onClick={toggleAutoplay}
                  className="btn btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '0.8rem', borderRadius: '8px', gap: '6px', height: 'auto', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                >
                  {isAutoplay ? (
                    <>
                      <RotateCcw size={12} /> Reset Simulation
                    </>
                  ) : (
                    <>
                      <Play size={12} fill="currentColor" /> Play Surgery Animation
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Step content detail and controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="step-content-col">
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
                  Stage {steps[activeStep].id} of 5
                </span>
                <h3 style={{ fontSize: '1.85rem', margin: 0, fontWeight: '700', lineHeight: 1.25 }}>
                  {steps[activeStep].title}
                </h3>
              </div>

              {/* Stage Objective */}
              <div style={{ 
                background: 'rgba(140, 178, 242, 0.03)', 
                padding: '20px', 
                borderRadius: '16px', 
                borderLeft: '4px solid var(--accent-primary)',
                borderTop: '1px solid rgba(255,255,255,0.02)',
                borderRight: '1px solid rgba(255,255,255,0.02)',
                borderBottom: '1px solid rgba(255,255,255,0.02)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.95rem' }}>
                  <Info size={16} color="var(--accent-primary)" /> Stage Objective
                </div>
                <p className="text-secondary" style={{ fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                  {steps[activeStep].purpose}
                </p>
              </div>

              {/* Experience */}
              <div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '8px', fontWeight: '600', color: 'var(--text-primary)' }}>What You Experience:</h4>
                <p className="text-secondary" style={{ fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                  {steps[activeStep].experience}
                </p>
              </div>

              {/* Scientific Precision Breakdown */}
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.01)', 
                border: '1px solid rgba(255, 255, 255, 0.05)', 
                padding: '20px', 
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--accent-secondary)', fontWeight: '700', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  <Activity size={14} /> {steps[activeStep].scienceTitle}
                </div>
                <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: '1.6', margin: 0, color: 'var(--text-secondary)' }}>
                  {steps[activeStep].scienceDetails}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: 'auto', paddingTop: '16px' }} className="responsive-flex-col">
                <button
                  onClick={prevStep}
                  disabled={activeStep === 0}
                  className={`btn btn-secondary ${activeStep === 0 ? 'btn-disabled' : ''}`}
                  style={{ padding: '12px 24px', fontSize: '0.95rem' }}
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <button
                  onClick={nextStep}
                  className="btn btn-primary"
                  style={{ padding: '12px 28px', fontSize: '0.95rem' }}
                >
                  {activeStep === steps.length - 1 ? 'Restart Journey' : 'Next Step'}
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


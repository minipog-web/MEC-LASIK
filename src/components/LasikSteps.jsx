import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Info, CheckCircle2, Play, RotateCcw, Activity, Eye, Settings, ShieldCheck } from 'lucide-react';
import prepImg from '../assets/lasik_prep.png';
import flapImg from '../assets/lasik_flap.png';
import reshapeImg from '../assets/lasik_reshape.png';
import repositionImg from '../assets/lasik_reposition.png';
import healingImg from '../assets/lasik_healing.png';

const steps = [
  {
    id: 1,
    title: 'Pre-Operative Measurements',
    purpose: 'To capture the exact baseline specifications and topography of your cornea for custom treatment planning.',
    experience: 'You will undergo detailed corneal mapping and diagnostic scans. CRITICAL: To ensure precise calculations, patients must stop wearing contact lenses prior to these measurements (soft lenses for at least 10 days, hard/gas permeable lenses for 3 weeks) so the cornea can return to its natural shape.',
    image: prepImg,
    scienceTitle: 'Ocular Topography & Keratometry',
    scienceDetails: 'We measure the curvature, thickness, and elevation profiles of your cornea using high-precision optical mapping. Because contact lenses temporarily alter the shape of the cornea, being out of contacts is essential to prevent surgical diopter miscalculations.'
  },
  {
    id: 2,
    title: 'Day-of Procedure Preparation',
    purpose: 'To prepare your eye and ensure you are comfortable and relaxed for the treatment.',
    experience: 'You will rest comfortably as we administer numbing eye drops. We also provide a mild oral sedative/anxiolytic at this stage to help you feel completely relaxed during the procedure, and to support sleep and recovery immediately afterward.',
    image: prepImg,
    scienceTitle: 'Diagnostic Refraction Verification',
    scienceDetails: 'On the day of surgery, we verify your pupil dilation, confirm eye stability, and calibrate the lasers. The numbing drops block sensation in the trigeminal nerve endings of the cornea, ensuring complete comfort.'
  },
  {
    id: 3,
    title: 'Creating the Corneal Flap',
    purpose: 'To access the underlying corneal tissue (stroma) where the vision correction will take place.',
    experience: 'You may feel a slight pressure, and your vision will momentarily dim. A state-of-the-art femtosecond laser creates microscopic bubbles to form a highly precise, ultra-thin flap in less than 30 seconds.',
    image: flapImg,
    scienceTitle: 'Femtosecond Laser Incision',
    scienceDetails: 'An ultra-fast femtosecond laser emits light pulses at a quadrillionth of a second. It focuses light to form a precise layer of microscopic carbon dioxide/water gas bubbles at a calibrated depth (typically 110 µm) beneath the corneal surface, separating the tissue without heat or blades.'
  },
  {
    id: 4,
    title: 'Reshaping the Cornea',
    purpose: 'To permanently correct your refractive error (nearsightedness, farsightedness, or astigmatism) based on your custom 3D map.',
    experience: 'You will hear a clicking sound. You just need to stare at the target light. The computer-guided excimer laser painlessly removes microscopic tissue to flatten or reshape the cornea in seconds.',
    image: reshapeImg,
    scienceTitle: 'Excimer Laser Photoablation',
    scienceDetails: 'A computer-guided cold excimer laser uses 193 nm ultraviolet light to disrupt molecular bonds in the stromal layer. Each pulse vaporizes a minute layer of tissue (0.25 microns deep) in under 1.4 milliseconds, reshaping the curvature to eliminate myopia, hyperopia, or astigmatism.'
  },
  {
    id: 5,
    title: 'Repositioning the Flap',
    purpose: 'To protect the reshaped tissue and promote rapid, natural healing without stitches.',
    experience: 'The surgeon gently folds the flap back into its original position. It acts as a natural bandage. Your vision will begin to clear almost immediately, though it may be slightly blurry like looking underwater.',
    image: repositionImg,
    scienceTitle: 'Stitchless Corneal Cohesion',
    scienceDetails: 'The flap is smoothed back over the reshaped cornea, matching the custom borders. Within minutes, natural osmotic pressure and cellular adhesion pull the flap taut. Natural endothelial cell pumps seal the edge, eliminating any need for sutures.'
  },
  {
    id: 6,
    title: 'Post-Procedure Healing',
    purpose: 'To allow the eye to rest and stabilize the new visual acuity.',
    experience: 'The entire procedure is complete! The healing process begins instantly. The sedative given at the start will help you sleep and recover restfully when you return home. Many patients notice dramatically improved vision within 24 hours.',
    image: healingImg,
    scienceTitle: 'Epithelial Regeneration & Stabilization',
    scienceDetails: 'The surface epithelium regenerates and seals the flap edge within 24 to 48 hours. Medicated anti-inflammatory and antibiotic drops promote smooth corneal re-epithelialization, leading to structural stability and sharp visual acuity within a day.'
  }
];

export default function LasikSteps() {
  const [activeStep, setActiveStep] = useState(0);
  const [visualMode, setVisualMode] = useState('render'); // Default to 3D Concept Render on load
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [autoplayProgress, setAutoplayProgress] = useState(0); // 0 to 1
  const [sliderProgress, setSliderProgress] = useState(0); // 0 to 100
  const [showClinicalTelemetry, setShowClinicalTelemetry] = useState(false);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      setShowClinicalTelemetry(true);
    }
  }, []);

  // Compute combined progress (0 to 100)
  const progressVal = isAutoplay ? autoplayProgress * 100 : sliderProgress;

  // Sync activeStep with progressVal
  useEffect(() => {
    if (progressVal < 15) {
      setActiveStep(0);
    } else if (progressVal >= 15 && progressVal < 32) {
      setActiveStep(1);
    } else if (progressVal >= 32 && progressVal < 50) {
      setActiveStep(2);
    } else if (progressVal >= 50 && progressVal < 72) {
      setActiveStep(3);
    } else if (progressVal >= 72 && progressVal < 90) {
      setActiveStep(4);
    } else {
      setActiveStep(5);
    }
  }, [progressVal]);

  // Animation values computed from progressVal
  let flapAngle = 0;
  let corneaCurve = 72; // 72 is normal myopia, 86 is reshaped/flatter
  let chartBlur = 3.5; // 3.5px to 0px
  let focusRadius = 8;
  let focusBlur = 3;
  let focusColor = 'rgba(0, 240, 255, 0.4)';
  let laserActive = false;
  let cutActive = false;
  let nozzleY = 0;
  let sparks = [];

  // Logic mapping progressVal (0 - 100) to visual properties
  if (progressVal < 32) {
    // Stage 1 & 2: Preparation & Specs (0 to 32%)
    flapAngle = 0;
    corneaCurve = 72;
    chartBlur = 3.5;
    nozzleY = 0;
  } else if (progressVal >= 32 && progressVal < 50) {
    // Stage 3: Flap Incision & Open (32% to 50%)
    const stagePct = (progressVal - 32) / 18; // 0 to 1
    if (stagePct < 0.5) {
      // Slicing
      cutActive = true;
      nozzleY = stagePct * 2 * 130;
      flapAngle = 0;
    } else {
      // Opening flap
      const openPct = (stagePct - 0.5) * 2; // 0 to 1
      flapAngle = openPct * 130;
      nozzleY = 130 - openPct * 65;
    }
    corneaCurve = 72;
    chartBlur = 3.5;
  } else if (progressVal >= 50 && progressVal < 72) {
    // Stage 4: Reshaping (50% to 72%)
    flapAngle = 130;
    laserActive = true;
    const stagePct = (progressVal - 50) / 22; // 0 to 1
    corneaCurve = 72 + stagePct * 14;
    chartBlur = 3.5 - stagePct * 2.5;
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
  } else if (progressVal >= 72 && progressVal < 90) {
    // Stage 5: Repositioning (72% to 90%)
    const stagePct = (progressVal - 72) / 18; // 0 to 1
    flapAngle = 130 - stagePct * 130;
    corneaCurve = 86;
    chartBlur = 1.0 - stagePct * 0.5;
    nozzleY = 65 - stagePct * 65;
  } else {
    // Stage 6: Healing (90% to 100%)
    flapAngle = 0;
    corneaCurve = 86;
    const stagePct = (progressVal - 90) / 10; // 0 to 1
    chartBlur = Math.max(0.5 - stagePct * 0.5, 0);
    focusRadius = Math.max(8 - stagePct * 6, 2);
    focusBlur = Math.max(3 - stagePct * 3, 0);
    focusColor = `rgba(16, 185, 129, ${0.4 + stagePct * 0.6})`;
  }

  // Dynamic morph calculations for laser focal achievement
  const focusFactor = progressVal < 50 ? 0 : Math.min((progressVal - 50) / 40, 1);
  if (progressVal >= 50 && progressVal < 90) {
    focusRadius = 8 - focusFactor * 6;
    focusBlur = 3 - focusFactor * 3;
    const interpR = Math.round(0 + focusFactor * 16);
    const interpG = Math.round(240 - focusFactor * 55);
    const interpB = Math.round(255 - focusFactor * 126);
    const interpA = 0.4 + focusFactor * 0.6;
    focusColor = `rgba(${interpR}, ${interpG}, ${interpB}, ${interpA})`;
  }

  // Handle Autoplay Animation loop
  useEffect(() => {
    if (isAutoplay) {
      const animate = (timestamp) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;
        const duration = 10000; // 10 seconds total autoplay
        const progress = Math.min(elapsed / duration, 1);

        setAutoplayProgress(progress);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setIsAutoplay(false);
          setAutoplayProgress(0);
          setSliderProgress(100);
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
      setSliderProgress(0);
    } else {
      setVisualMode('simulator');
      setSliderProgress(0);
      setIsAutoplay(true);
      setAutoplayProgress(0);
    }
  };

  const handleSliderChange = (e) => {
    if (isAutoplay) setIsAutoplay(false);
    setSliderProgress(Number(e.target.value));
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      const prevIdx = activeStep - 1;
      const targetProgress = prevIdx === 5 ? 95 : prevIdx * 18 + 5;
      setSliderProgress(targetProgress);
      setIsAutoplay(false);
    }
  };

  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      const nextIdx = activeStep + 1;
      const targetProgress = nextIdx === 5 ? 95 : nextIdx * 18 + 5;
      setSliderProgress(targetProgress);
      setIsAutoplay(false);
    }
  };

  // Compile active stage descriptions dynamically for the telemetry block
  let phaseName = "1. Calibration";
  let laserStatus = "STANDBY";
  let pulseRate = "0 Hz";
  let energyLevel = "0 mJ";
  let thicknessStr = "545 µm";
  let trackingLock = "LOCKING...";

  if (progressVal < 15) {
    phaseName = "1. PRE-OP MEASURE";
    laserStatus = "SCANNING";
    pulseRate = "2.4 kHz (low-pulse)";
    energyLevel = "2.5 µJ";
    thicknessStr = "545 µm (Normal)";
    trackingLock = "LOCK OK (99.8%)";
  } else if (progressVal >= 15 && progressVal < 32) {
    phaseName = "2. DAY-OF PREP";
    laserStatus = "PREPARING";
    pulseRate = "0 Hz";
    energyLevel = "0.0 µJ";
    thicknessStr = "545 µm (Numbed)";
    trackingLock = "PATIENT STABLE";
  } else if (progressVal >= 32 && progressVal < 50) {
    phaseName = "3. FLAP INCI";
    laserStatus = cutActive ? "FEMTO PULSE" : "ELEVATING";
    pulseRate = cutActive ? "150 kHz" : "0 Hz";
    energyLevel = cutActive ? "1.2 µJ" : "0.0 µJ";
    thicknessStr = "435 µm (Stroma Exposed)";
    trackingLock = "LOCK OK (100.0%)";
  } else if (progressVal >= 50 && progressVal < 72) {
    phaseName = "4. EXCIMER ABLATION";
    laserStatus = "EXCIMER ACTIVE";
    pulseRate = "250 Hz";
    energyLevel = "120 mJ/cm²";
    thicknessStr = `${Math.round(435 - ((progressVal - 50) / 22) * 45)} µm (Target)`;
    trackingLock = "AUTO-TRACK ON";
  } else if (progressVal >= 72 && progressVal < 90) {
    phaseName = "5. REPOSITIONING";
    laserStatus = "FLAP REALIGN";
    pulseRate = "0 Hz";
    energyLevel = "0.0 mJ";
    thicknessStr = "490 µm (Corrected)";
    trackingLock = "BORDER MATCH OK";
  } else {
    phaseName = "6. EPITHELIAL HEAL";
    laserStatus = "HEALING ENABLED";
    pulseRate = "0 Hz";
    energyLevel = "CALIBRATION PASS";
    thicknessStr = "490 µm (Stable)";
    trackingLock = "PERFECT FOCUS";
  }

  const rayYTop = 122 - focusFactor * 12;
  const rayYBottom = 98 + focusFactor * 12;
  const rayColor = `rgba(0, 240, 255, ${0.4 + focusFactor * 0.4})`;
  const centerRayColor = `rgba(0, 240, 255, ${0.25 + focusFactor * 0.25})`;
  return (
    <div className="section" style={{ padding: 'clamp(112px, 8vw, 144px) 24px' }}>
      {/* SVG Filters for Neon Laser Glow */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="neon-glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="neon-glow-red" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="neon-glow-green" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <div className="container" style={{ maxWidth: '1100px' }}>
        <div className="text-center" style={{ marginBottom: '32px' }}>
          <span className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] font-semibold bg-white/5 border border-white/10 text-white/70" style={{ display: 'inline-block', marginBottom: '12px' }}>
            Biometric Diagnostics
          </span>
          <h2 className="bio-heading">
            The LASIK <span className="bio-heading-accent">Journey</span>
          </h2>
          <p className="text-secondary" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.15rem', lineHeight: '1.6', fontWeight: '300' }}>
            Explore our state-of-the-art procedure. Switch between 3D renders or drag the active simulator to perform the steps yourself.
          </p>
        </div>

        <div className="glass-panel lasik-steps-panel" style={{ 
          padding: '24px 32px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '24px', 
          overflow: 'hidden',
          border: '1px solid rgba(0, 240, 255, 0.25)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 240, 255, 0.05)'
        }}>
          
          {/* Tracker Instruction Label */}
          <div style={{
            fontSize: '0.75rem',
            fontFamily: 'monospace',
            color: 'var(--accent-primary)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '-8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <Activity size={12} className="animate-pulse" /> Click Steps to Advance Surgery Simulator <Activity size={12} className="animate-pulse" />
          </div>

          {/* Progress Timeline Tracker */}
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: '12px', padding: '0 10px' }}>
            <div style={{ position: 'absolute', top: '18px', left: '20px', right: '20px', height: '2px', background: 'rgba(255, 255, 255, 0.06)', zIndex: 0 }} />
            <div style={{
              position: 'absolute',
              top: '18px',
              left: '20px',
              height: '2px',
              background: 'linear-gradient(95deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary))',
              zIndex: 1,
              width: `calc(${(activeStep / (steps.length - 1)) * 100}% - 8px)`,
              transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 0 12px var(--accent-primary)'
            }} />

            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const isPast = index < activeStep;
              const shortTitles = ['1. Measurements', '2. Day-Of Prep', '3. Flap Creation', '4. Reshaping', '5. Reposition', '6. Healing'];
              return (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2 }}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAutoplay(false);
                      // Set progressVal to start of that step's range
                      const targetProgress = index === 5 ? 95 : index * 18 + 5;
                      setSliderProgress(targetProgress);
                    }}
                    className={`steps-progress-dot ${isActive ? 'active-radar-dot' : ''}`}
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: isPast 
                        ? 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)' 
                        : isActive 
                          ? '#081125' 
                          : '#132247',
                      border: isPast || isActive 
                        ? '2px solid var(--accent-primary)' 
                        : '2px solid rgba(255, 255, 255, 0.08)',
                      color: isPast ? '#030712' : isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: isActive ? '0 0 12px rgba(0, 240, 255, 0.5)' : 'none',
                      transform: isActive ? 'scale(1.1)' : 'scale(1)'
                    }}
                    aria-label={`Go to step ${index + 1}`}
                  >
                    {isPast ? <CheckCircle2 size={14} /> : step.id}
                  </button>
                  <span className="nav-links-group" style={{
                    fontSize: '0.7rem',
                    fontFamily: 'monospace',
                    fontWeight: isActive ? '700' : '500',
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                    textAlign: 'center',
                    whiteSpace: 'nowrap'
                  }}>
                    {shortTitles[index]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Core Interactive Layout */}
          <div className="steps-grid">
            
            {/* Left Column: Interactive Visual Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }} className="step-image-col">
              
              {/* Segmented Mode Selector */}
              <div style={{
                display: 'flex',
                background: 'rgba(255, 255, 255, 0.02)',
                padding: '4px',
                borderRadius: '14px',
                border: '1px solid rgba(0, 240, 255, 0.15)',
                alignSelf: 'flex-start'
              }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsAutoplay(false);
                    setVisualMode('render');
                  }}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '10px',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    background: visualMode === 'render' ? 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)' : 'transparent',
                    color: visualMode === 'render' ? '#030712' : 'var(--text-secondary)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    letterSpacing: '0.5px'
                  }}
                >
                  3D Concept Render
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setVisualMode('simulator');
                  }}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '10px',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    background: visualMode === 'simulator' ? 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)' : 'transparent',
                    color: visualMode === 'simulator' ? '#030712' : 'var(--text-secondary)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    letterSpacing: '0.5px'
                  }}
                >
                  Animated Simulator
                </button>
              </div>

              {/* Main Visual Display Terminal */}
              <div 
                className="glass-panel" 
                style={{ 
                  background: 'rgba(6, 11, 23, 0.85)', 
                  border: '1px solid rgba(0, 240, 255, 0.15)', 
                  borderRadius: '24px', 
                  padding: '16px', 
                  width: '100%', 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  alignItems: 'center',
                  boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.6), 0 10px 40px rgba(0,0,0,0.4)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* CRT Screen Scan-Line overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.2) 50%), linear-gradient(90deg, rgba(0, 240, 255, 0.01), rgba(139, 92, 246, 0.005), rgba(236, 72, 153, 0.01))',
                  backgroundSize: '100% 4px, 6px 100%',
                  pointerEvents: 'none',
                  zIndex: 5,
                  opacity: 0.6
                }} />

                <div style={{ width: '100%', maxWidth: '480px' }}>
                  
                  {visualMode === 'render' ? (
                    /* Futuristic High-Res Image */
                    <div 
                      className="animate-fade-in" 
                      style={{ 
                        position: 'relative', 
                        width: '100%', 
                        borderRadius: '16px', 
                        overflow: 'hidden', 
                        border: '1px solid rgba(0, 240, 255, 0.25)',
                        background: 'rgba(0,0,0,0.4)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        aspectRatio: '1.1'
                      }}
                    >
                      <img 
                        src={steps[activeStep].image} 
                        alt={steps[activeStep].title} 
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, transparent 60%, rgba(3, 7, 18, 0.95) 100%)',
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
                    <div style={{ width: '100%', background: 'rgba(3, 7, 18, 0.5)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '6px' }}>
                      <svg 
                        viewBox="0 0 200 220" 
                        style={{ width: '100%', height: 'auto', overflow: 'visible' }}
                      >
                        {/* Eyeball Sclera Background */}
                        <path d="M 110,40 A 70,70 0 1,1 110,180" fill="rgba(8, 17, 37, 0.8)" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.5" />
                        <path d="M 165,65 A 70,70 0 0,1 165,155" fill="none" stroke="rgba(0, 240, 255, 0.05)" strokeWidth="3" />
                        
                        {/* Inner Lens */}
                        <ellipse cx="135" cy="110" rx="8" ry="22" fill="rgba(139, 92, 246, 0.15)" stroke="var(--accent-secondary)" strokeWidth="1" />
                        
                        {/* Ideal Corneal Profile Template (dashed) */}
                        <path d="M 110,40 Q 72,110 110,180" fill="none" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="2" strokeDasharray="2 3" />
                        
                        {/* Dynamic Cornea Profile */}
                        <path 
                          d={`M 110,40 Q ${corneaCurve},110 110,180`} 
                          fill="none" 
                          stroke="var(--accent-primary)" 
                          strokeWidth="3.5" 
                          strokeLinecap="round" 
                          filter="url(#neon-glow-cyan)" 
                          style={{ transition: isAutoplay ? 'none' : 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
                        />
                        
                        {/* Corneal Flap */}
                        <path 
                          d="M 110,45 Q 72,110 110,175" 
                          fill="none" 
                          stroke="rgba(255, 255, 255, 0.8)" 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                          transform={`rotate(${flapAngle}, 110, 45)`}
                          style={{ transition: isAutoplay ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
                        />
                        
                        {/* Dynamic Elastic Focused Light Rays */}
                        <path 
                          d={`M 15,65 L 95,92 L 135,103 L 155,110 L 180,${rayYTop}`} 
                          fill="none" 
                          stroke={rayColor} 
                          strokeDasharray="3" 
                          strokeWidth={rayWidth} 
                          filter="url(#neon-glow-cyan)" 
                          style={{ transition: isAutoplay ? 'none' : 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} 
                        />
                        <path 
                          d={`M 15,155 L 95,128 L 135,117 L 155,110 L 180,${rayYBottom}`} 
                          fill="none" 
                          stroke={rayColor} 
                          strokeDasharray="3" 
                          strokeWidth={rayWidth} 
                          filter="url(#neon-glow-cyan)" 
                          style={{ transition: isAutoplay ? 'none' : 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} 
                        />
                        <path 
                          d="M 15,110 L 180,110" 
                          fill="none" 
                          stroke={centerRayColor} 
                          strokeWidth={rayWidth * 0.75} 
                          style={{ transition: isAutoplay ? 'none' : 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} 
                        />

                        {/* Laser Cutting Beam (Femtosecond Flap Creation) */}
                        {cutActive && (
                          <line 
                            x1="15" 
                            y1="45" 
                            x2="110" 
                            y2="45" 
                            stroke="var(--success)" 
                            strokeWidth="2.5" 
                            filter="url(#neon-glow-green)" 
                            style={{ transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
                          />
                        )}

                        {/* Reshaping Laser Beam (Excimer Sculpting) */}
                        {laserActive && (
                          <line 
                            x1="15" 
                            y1="110" 
                            x2="90" 
                            y2="110" 
                            stroke="var(--accent-tertiary)" 
                            strokeWidth="4" 
                            filter="url(#neon-glow-red)" 
                            style={{ transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
                          />
                        )}

                        {/* Laser Nozzle */}
                        <g transform={`translate(0, ${nozzleY})`}>
                          <rect x="8" y="100" width="10" height="20" rx="3" fill="#111827" stroke="rgba(0,240,255,0.4)" strokeWidth="1.5" />
                          <rect x="18" y="107" width="4" height="6" fill="#4b5563" />
                          <circle cx="20" cy="110" r="1.5" fill={laserActive ? 'var(--accent-tertiary)' : cutActive ? 'var(--success)' : '#4b5563'} />
                        </g>

                        {/* Spark particles when firing */}
                        <g>
                          {sparks.map((s, idx) => (
                            <circle key={idx} cx={s.cx} cy={s.cy} r={s.r} fill="var(--accent-gold)" opacity={s.opacity} />
                          ))}
                        </g>

                        {/* Retina focus spot */}
                        <circle cx="180" cy="110" r={focusRadius} fill={focusColor} style={{ filter: focusBlur ? `blur(${focusBlur}px)` : 'none', transition: 'all 0.4s ease' }} />

                        {/* Label annotations */}
                        {progressVal < 32 && (
                          <g opacity="0.7">
                            <path d="M 68,206 L 98,140" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.75" strokeDasharray="2" />
                            <text x="15" y="212" fill="var(--accent-primary)" fontSize="8" fontFamily="monospace" fontWeight="bold">TOPOGRAPHY SCAN</text>
                          </g>
                        )}
                        {progressVal >= 32 && progressVal < 50 && (
                          <g opacity="0.7">
                            <path d="M 80,18 L 105,38" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.75" strokeDasharray="2" />
                            <text x="5" y="14" fill="var(--accent-primary)" fontSize="8" fontFamily="monospace" fontWeight="bold">FEMTOSEC FLAP</text>
                          </g>
                        )}
                        {progressVal >= 50 && progressVal < 72 && (
                          <g opacity="0.7">
                            <path d="M 28,88 L 18,102" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.75" strokeDasharray="2" />
                            <text x="25" y="85" fill="var(--accent-tertiary)" fontSize="8" fontFamily="monospace" fontWeight="bold">EXCIMER SCULPT</text>
                          </g>
                        )}
                        {progressVal >= 90 && (
                          <g opacity="0.7">
                            <path d="M 160,206 L 178,118" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.75" strokeDasharray="2" />
                            <text x="120" y="212" fill="var(--success)" fontSize="8" fontFamily="monospace" fontWeight="bold">FOCAL CALIBRATION</text>
                          </g>
                        )}
                      </svg>
                    </div>
                  )}

                </div>

                {/* Manual Range Controller Slider */}
                {visualMode === 'simulator' && (
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                      <span>Manual Laser Controller</span>
                      <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{Math.round(progressVal)}% Complete</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={sliderProgress} 
                      onChange={handleSliderChange}
                      style={{
                        width: '100%',
                        height: '6px',
                        borderRadius: '3px',
                        outline: 'none',
                        background: 'var(--bg-tertiary)',
                        WebkitAppearance: 'none',
                        cursor: 'pointer',
                        accentColor: 'var(--accent-primary)',
                        border: '1px solid rgba(0, 240, 255, 0.15)'
                      }}
                    />
                  </div>
                )}

                {/* Status Indicator */}
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600', minHeight: '18px', textAlign: 'center', fontFamily: 'monospace' }}>
                  {isAutoplay ? (
                    autoplayProgress * 100 < 15 ? 'SYS: Mapping corneal aberrations...' :
                    autoplayProgress * 100 < 32 ? 'SYS: Preparing ocular surface...' :
                    autoplayProgress * 100 < 50 ? 'SYS: Creating micro-thin protective flap...' :
                    autoplayProgress * 100 < 72 ? 'SYS: Firing Excimer laser profiling...' :
                    autoplayProgress * 100 < 90 ? 'SYS: Re-aligning corneal flap borders...' :
                    'SYS: Validation successful. 20/20 Focus verified!'
                  ) : (
                    progressVal < 15 ? 'SYS: Pre-op diagnostics active.' :
                    progressVal < 32 ? 'SYS: Ocular surface anesthetized.' :
                    progressVal < 50 ? 'SYS: Laser incision running.' :
                    progressVal < 72 ? 'SYS: Excimer photoablation active.' :
                    progressVal < 90 ? 'SYS: Flap seal alignment active.' :
                    'SYS: Target focal point achieved.'
                  )}
                </div>

                {/* Simulation Control Buttons */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    type="button"
                    onClick={toggleAutoplay}
                    className="btn btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '6px', gap: '4px', height: 'auto', border: '1px solid rgba(0, 240, 255, 0.3)' }}
                  >
                    {isAutoplay ? (
                      <>
                        <RotateCcw size={12} /> Stop Autoplay
                      </>
                    ) : (
                      <>
                        <Play size={12} fill="currentColor" /> Play Surgery Animation
                      </>
                    )}
                  </button>
                  {sliderProgress !== 0 && !isAutoplay && (
                    <button 
                      type="button"
                      onClick={() => setSliderProgress(0)}
                      className="btn btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '6px', gap: '4px', height: 'auto', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                    >
                      <RotateCcw size={12} /> Reset
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic HUD Telemetry & Step Detail */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="step-content-col">
              
              <div>
                <span style={{
                  color: 'var(--accent-primary)',
                  fontWeight: '700',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  fontSize: '0.7rem',
                  display: 'block',
                  marginBottom: '4px'
                }}>
                  Stage {steps[activeStep].id} of {steps.length}
                </span>
                <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', margin: 0, fontWeight: '300', fontFamily: 'var(--font-serif)', fontStyle: 'italic', lineHeight: 1.2, color: '#ffffff' }}>
                  {steps[activeStep].title}
                </h3>
              </div>

              {/* Mobile Step Navigation Row */}
              <div className="mobile-step-nav">
                <button 
                  type="button"
                  onClick={handlePrevStep}
                  disabled={activeStep === 0}
                  className="btn btn-secondary"
                  style={{
                    padding: '8px 14px',
                    fontSize: '0.75rem',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    opacity: activeStep === 0 ? 0.4 : 1,
                    cursor: activeStep === 0 ? 'not-allowed' : 'pointer',
                    height: 'auto',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <ChevronLeft size={14} /> Prev Stage
                </button>
                <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 'bold' }}>
                  {activeStep + 1} / {steps.length}
                </span>
                <button 
                  type="button"
                  onClick={handleNextStep}
                  disabled={activeStep === steps.length - 1}
                  className="btn btn-secondary"
                  style={{
                    padding: '8px 14px',
                    fontSize: '0.75rem',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    opacity: activeStep === steps.length - 1 ? 0.4 : 1,
                    cursor: activeStep === steps.length - 1 ? 'not-allowed' : 'pointer',
                    height: 'auto',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  Next Stage <ChevronRight size={14} />
                </button>
              </div>

              {/* Experience - Shown first for mobile readability */}
              <div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '4px', fontWeight: '600', color: '#ffffff' }}>What You Experience:</h4>
                <p className="text-secondary" style={{ fontSize: '0.85rem', lineHeight: '1.4', margin: 0, fontWeight: '300' }}>
                  {steps[activeStep].experience}
                </p>
              </div>

              {/* Mobile-only Toggle for Clinical Telemetry / Details */}
              <button
                type="button"
                onClick={() => setShowClinicalTelemetry(!showClinicalTelemetry)}
                className="telemetry-toggle-btn"
              >
                <Activity size={14} className={showClinicalTelemetry ? '' : 'animate-pulse'} />
                {showClinicalTelemetry ? 'HIDE CLINICAL DETAILS' : 'SHOW CLINICAL DETAILS & PHYSICS'}
              </button>

              {/* Conditionally Rendered Telemetry Details */}
              {showClinicalTelemetry && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Stage Objective */}
                  <div style={{ 
                    background: 'rgba(0, 240, 255, 0.015)', 
                    padding: '12px 16px', 
                    borderRadius: '12px', 
                    borderLeft: '3px solid var(--accent-primary)',
                    borderTop: '1px solid rgba(255,255,255,0.04)',
                    borderRight: '1px solid rgba(255,255,255,0.04)',
                    borderBottom: '1px solid rgba(255,255,255,0.04)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: '#ffffff', fontWeight: '600', fontSize: '0.85rem' }}>
                      <Info size={14} color="var(--accent-primary)" /> Stage Objective
                    </div>
                    <p className="text-secondary" style={{ fontSize: '0.85rem', lineHeight: '1.4', margin: 0, fontWeight: '300' }}>
                      {steps[activeStep].purpose}
                    </p>
                  </div>

                  {/* Scientific Precision Breakdown */}
                  <div style={{ 
                    background: 'rgba(255, 255, 255, 0.01)', 
                    border: '1px solid rgba(255, 255, 255, 0.04)', 
                    padding: '12px 16px', 
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: 'var(--accent-secondary)', fontWeight: '700', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      <Activity size={12} /> {steps[activeStep].scienceTitle}
                    </div>
                    <p className="text-secondary" style={{ fontSize: '0.8rem', lineHeight: '1.4', margin: 0, color: 'var(--text-secondary)', fontWeight: '300' }}>
                      {steps[activeStep].scienceDetails}
                    </p>
                  </div>

                  {activeStep === 5 && (
                    <div style={{ 
                      background: 'rgba(251, 191, 36, 0.015)', 
                      border: '1px solid rgba(251, 191, 36, 0.15)', 
                      padding: '12px 16px', 
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: 'var(--accent-gold)', fontWeight: '700', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                        <Info size={12} /> Safety & Side Effects Expectations
                      </div>
                      <p className="text-secondary" style={{ fontSize: '0.8rem', lineHeight: '1.4', margin: 0, color: 'var(--text-secondary)', fontWeight: '300' }}>
                        Ocular side effects are typically temporary and resolve over 1–6 months:
                      </p>
                      <ul style={{ margin: '4px 0 0 16px', padding: 0, fontSize: '0.75rem', lineHeight: '1.4', color: 'var(--text-secondary)' }}>
                        <li><strong>Dry Eyes:</strong> Temporary tear film reduction, managed with lubricating drops.</li>
                        <li><strong>Visual Disturbances:</strong> Post-op night glare, halos, or starbursts around light sources.</li>
                        <li><strong>Refractive Variance:</strong> Rare under-corrections or over-corrections may require a repeat enhancement procedure.</li>
                      </ul>
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

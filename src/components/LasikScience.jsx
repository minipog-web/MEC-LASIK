import React, { useState, useEffect } from 'react';
import { BookOpen, HelpCircle, History, Sparkles, Activity, ShieldCheck } from 'lucide-react';

function OpticsVisualizer() {
  const [diopter, setDiopter] = useState(-3.0);
  const [correctionFactor, setCorrectionFactor] = useState(0.0);
  const [isCorrecting, setIsCorrecting] = useState(false);
  const [laserActive, setLaserActive] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);

  // Auto-correct animation loop: adjusts cornea curvature and focal length while preserving eyeball length (rx)
  useEffect(() => {
    if (!isCorrecting) return;
    
    setLaserActive(true);
    const interval = setInterval(() => {
      setCorrectionFactor((prev) => {
        if (prev >= 0.98) {
          setIsCorrecting(false);
          setLaserActive(false);
          return 1.0;
        }
        setPulseCount(p => p + 1);
        return parseFloat((prev + 0.02).toFixed(2));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isCorrecting]);

  const handleSimulateLasik = () => {
    if (diopter === 0) {
      setDiopter(-3.5);
    }
    setCorrectionFactor(0.0);
    setIsCorrecting(true);
  };

  // Center of eyeball
  const cx = 80;
  const cy = 50;
  const ry = 32;

  // Horizontal radius (axial length) depends solely on diopter (axial length is fixed and does NOT change during LASIK)
  const rx = 32 - diopter * (diopter < 0 ? 1.8 : 2.2);

  // Limbus junction plane (where cornea connects to sclera)
  const x_limbus = cx - 0.82 * rx;
  const y_top = 31.7;
  const y_bottom = 68.3;
  const y_mid_top = 40;
  const y_mid_bottom = 60;

  // Cornea apex and control points (changes dynamically as laser ablated)
  const currentCorneaError = diopter * (1 - correctionFactor);
  
  let x_apex;
  let x_ctrl_top;
  let x_ctrl_bottom;

  // Coordinate variables for 4-segment hyperopia cornea modeling
  let x_groove_top = 0;
  let x_groove_bottom = 0;
  let x_ctrl_outer_top = 0;
  let x_ctrl_outer_bottom = 0;
  let x_ctrl_inner_top = 0;
  let x_ctrl_inner_bottom = 0;

  let xRefractTop;
  let xRefractBottom;
  let xLaserTop;
  let xLaserBottom;

  if (diopter < 0) {
    // Myopia: central ablation flattens center
    x_apex = x_limbus - (12 - currentCorneaError * 0.8);
    x_ctrl_top = x_limbus - (x_limbus - x_apex) * 0.85;
    x_ctrl_bottom = x_limbus - (x_limbus - x_apex) * 0.85;

    // Exact refraction intersection x-coordinates for top/bottom rays (y=42 and y=58)
    const t_top = (42 - y_top) / (50 - y_top);
    xRefractTop = Math.pow(1 - t_top, 2) * x_limbus + 2 * t_top * (1 - t_top) * x_ctrl_top + Math.pow(t_top, 2) * x_apex;

    const t_bottom = (58 - 50) / (y_bottom - 50);
    xRefractBottom = Math.pow(1 - t_bottom, 2) * x_apex + 2 * t_bottom * (1 - t_bottom) * x_ctrl_bottom + Math.pow(t_bottom, 2) * x_limbus;

    // In myopia, the laser hits the center (apex)
    xLaserTop = x_apex;
    xLaserBottom = x_apex;
  } else {
    // Hyperopia: peripheral ablation steepens center, flattens shoulders
    // x_apex goes from flat (x_limbus - 9.5) to steep (x_limbus - 13.0)
    x_apex = x_limbus - (13.0 - currentCorneaError * 1.4);
    
    // Base smooth position of the groove before ablation (45% of the curve width from limbus to apex)
    const x_base_groove_top = x_limbus - (x_limbus - x_apex) * 0.45;
    const x_base_groove_bottom = x_limbus - (x_limbus - x_apex) * 0.45;
    
    // Laser removes tissue at y=36 and y=64 (depth of 2.2 units)
    const ablationDepth = 2.2;
    const currentAblation = ablationDepth * correctionFactor;
    const activeLaserFlicker = (laserActive && diopter > 0) ? (Math.sin(pulseCount * 5) * 0.25) : 0;
    
    // The ablated coordinates move inwards (right)
    x_groove_top = x_base_groove_top + currentAblation + activeLaserFlicker;
    x_groove_bottom = x_base_groove_bottom + currentAblation + activeLaserFlicker;
    
    // Outer segment control points (from limbus to groove)
    x_ctrl_outer_top = x_limbus - (x_limbus - x_groove_top) * 0.55;
    x_ctrl_outer_bottom = x_limbus - (x_limbus - x_groove_bottom) * 0.55;
    
    // Inner segment control points (from groove to apex, steepens into a central dome)
    const domeIntensity = correctionFactor; // 0 to 1
    x_ctrl_inner_top = (x_apex - (x_apex - x_groove_top) * 0.5) * (1 - domeIntensity) + (x_apex - 1.2) * domeIntensity;
    x_ctrl_inner_bottom = (x_apex - (x_apex - x_groove_bottom) * 0.5) * (1 - domeIntensity) + (x_apex - 1.2) * domeIntensity;
    
    // Hyperopia rays refract through the inner segment (which covers y=36 to y=50 and y=50 to y=64)
    // The top ray is at y=42 (fraction is (42 - 36) / (50 - 36) = 6/14)
    const t_refract_top = 6 / 14;
    xRefractTop = Math.pow(1 - t_refract_top, 2) * x_groove_top + 2 * t_refract_top * (1 - t_refract_top) * x_ctrl_inner_top + Math.pow(t_refract_top, 2) * x_apex;
    
    // The bottom ray is at y=58 (fraction is (58 - 50) / (64 - 50) = 8/14)
    const t_refract_bottom = 8 / 14;
    xRefractBottom = Math.pow(1 - t_refract_bottom, 2) * x_apex + 2 * t_refract_bottom * (1 - t_refract_bottom) * x_ctrl_inner_bottom + Math.pow(t_refract_bottom, 2) * x_groove_bottom;
    
    // Laser points exactly to the ablated groove coordinates
    xLaserTop = x_groove_top;
    xLaserBottom = x_groove_bottom;
  }

  // Average refraction coordinate for backward-compatible telemetry calculation
  const xRefract = (xRefractTop + xRefractBottom) / 2;

  const retinaX = cx + rx;
  
  // Focal point converges closer to the retina as cornea changes shape
  const initialFocalX = retinaX + diopter * (diopter < 0 ? 4.5 : 5.5);
  const focalX = initialFocalX + correctionFactor * (retinaX - initialFocalX);

  const yRetinaTop = 42 + (8 * (retinaX - xRefractTop)) / (focalX - xRefractTop);
  const yRetinaBottom = 58 - (8 * (retinaX - xRefractBottom)) / (focalX - xRefractBottom);

  // Set colors based on state
  let rayColor = diopter < 0 ? 'var(--accent-primary)' : 'var(--accent-secondary)';
  if (diopter === 0 || correctionFactor === 1.0) {
    rayColor = 'var(--success)';
  }

  let statusText = 'MYOPIA (Nearsightedness)';
  let statusDesc = 'The eyeball is too long (axial length) or the cornea is too steeply curved. Light rays focus IN FRONT of the retina, blurring far objects.';
  let badgeColor = 'var(--accent-primary)';

  if (isCorrecting) {
    badgeColor = diopter < 0 ? 'var(--accent-primary)' : 'var(--accent-secondary)';
    if (diopter < 0) {
      statusText = 'LASIK MYOPIC CORRECTION';
      statusDesc = `Excimer laser central photoablation in progress: flattening cornea curvature. Eyeball length is fixed; light rays shift focus backward onto the retina. (Progress: ${Math.round(correctionFactor * 100)}%)`;
    } else {
      statusText = 'LASIK HYPEROPIC CORRECTION';
      statusDesc = `Excimer laser peripheral ablation in progress: reshaping outer ring to steepen cornea curvature. Eyeball length is fixed; light rays shift focus forward onto the retina. (Progress: ${Math.round(correctionFactor * 100)}%)`;
    }
  } else if (correctionFactor === 1.0) {
    statusText = 'POST-LASIK EMMETROPIA';
    statusDesc = 'Cornea curvature successfully corrected. Focal point aligned precisely on the retina. Patient achieves 20/20 visual acuity.';
    badgeColor = 'var(--success)';
  } else if (diopter === 0) {
    statusText = 'EMMETROPIA (Perfect Focus)';
    statusDesc = 'Cornea shape and axial length are in perfect harmony. Light rays focus precisely onto the retina for 20/20 vision.';
    badgeColor = 'var(--success)';
  } else if (diopter > 0) {
    statusText = 'HYPEROPIA (Farsightedness)';
    statusDesc = 'The eyeball is too short (axial length) or the cornea is too flat. Light rays focus BEHIND the retina, blurring near objects.';
    badgeColor = 'var(--accent-secondary)';
  }

  return (
    <div className="optics-grid">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes laserPulse {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 0.4; }
        }
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-laser-pulse {
          animation: laserPulse 0.4s infinite ease-in-out;
        }
        .animate-spin-slow {
          animation: spinSlow 3s infinite linear;
        }
      `}} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <p className="text-secondary" style={{ fontSize: '1rem', lineHeight: '1.7', fontWeight: '300', margin: 0 }}>
          Visual acuity depends on how light rays bend (refract) as they enter the eye. While refraction occurs at two interfaces—both the outer cornea and the internal crystalline lens—the cornea performs about two-thirds of the eye's total refractive power. Because the cornea is the primary focusing element, LASIK treatment precisely reshapes its stromal curvature to correct refractive errors.
        </p>

        {/* Diagnostic Status HUD */}
        <div style={{
          background: 'rgba(3, 7, 18, 0.4)',
          border: `1px solid ${laserActive ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.08)'}`,
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>DIAGNOSTIC ANALYSIS</span>
            <span style={{
              fontSize: '0.7rem',
              fontFamily: 'monospace',
              background: `rgba(${diopter === 0 ? '16, 185, 129' : diopter < 0 ? '0, 240, 255' : '139, 92, 246'}, 0.1)`,
              border: `1px solid ${badgeColor}`,
              color: badgeColor,
              padding: '2px 8px',
              borderRadius: '4px',
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}>
              {diopter === 0 ? 'CORRECTED' : 'REFRACTIVE ERROR'}
            </span>
          </div>
          <div>
            <strong style={{ color: '#ffffff', fontSize: '1.05rem', display: 'block', marginBottom: '4px' }}>
              {statusText}
            </strong>
            <span className="text-secondary" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
              {statusDesc}
            </span>
          </div>
        </div>

        {/* Quick Presets */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => { setDiopter(-3.5); setCorrectionFactor(0.0); setIsCorrecting(false); }}
            disabled={isCorrecting}
            style={{
              flex: 1,
              padding: '10px',
              background: diopter < 0 ? 'rgba(0, 240, 255, 0.1)' : 'rgba(3, 7, 18, 0.3)',
              border: `1px solid ${diopter < 0 ? 'var(--accent-primary)' : 'rgba(255,255,255,0.06)'}`,
              color: diopter < 0 ? '#ffffff' : 'var(--text-secondary)',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontFamily: 'monospace',
              cursor: 'pointer',
              fontWeight: diopter < 0 ? 'bold' : 'normal',
              transition: 'all 0.2s ease'
            }}
          >
            MYOPIA
          </button>
          <button
            type="button"
            onClick={() => { setDiopter(0.0); setCorrectionFactor(0.0); setIsCorrecting(false); }}
            disabled={isCorrecting}
            style={{
              flex: 1,
              padding: '10px',
              background: diopter === 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(3, 7, 18, 0.3)',
              border: `1px solid ${diopter === 0 ? 'var(--success)' : 'rgba(255,255,255,0.06)'}`,
              color: diopter === 0 ? '#ffffff' : 'var(--text-secondary)',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontFamily: 'monospace',
              cursor: 'pointer',
              fontWeight: diopter === 0 ? 'bold' : 'normal',
              transition: 'all 0.2s ease'
            }}
          >
            IDEAL
          </button>
          <button
            type="button"
            onClick={() => { setDiopter(2.5); setCorrectionFactor(0.0); setIsCorrecting(false); }}
            disabled={isCorrecting}
            style={{
              flex: 1,
              padding: '10px',
              background: diopter > 0 ? 'rgba(139, 92, 246, 0.1)' : 'rgba(3, 7, 18, 0.3)',
              border: `1px solid ${diopter > 0 ? 'var(--accent-secondary)' : 'rgba(255,255,255,0.06)'}`,
              color: diopter > 0 ? '#ffffff' : 'var(--text-secondary)',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontFamily: 'monospace',
              cursor: 'pointer',
              fontWeight: diopter > 0 ? 'bold' : 'normal',
              transition: 'all 0.2s ease'
            }}
          >
            HYPEROPIA
          </button>
        </div>

        {/* Refractive Power Interactive Slider */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>DIOPTER ERROR SELECTOR:</span>
            <strong style={{ color: diopter === 0 ? 'var(--success)' : diopter < 0 ? 'var(--accent-primary)' : 'var(--accent-secondary)' }}>
              {diopter > 0 ? `+${diopter.toFixed(2)}` : diopter.toFixed(2)} D
            </strong>
          </div>
          <input
            type="range"
            min="-6.00"
            max="4.00"
            step="0.25"
            value={diopter}
            disabled={isCorrecting}
            onChange={(e) => {
              setDiopter(parseFloat(e.target.value));
              setCorrectionFactor(0.0);
            }}
            style={{
              width: '100%',
              accentColor: diopter === 0 ? 'var(--success)' : diopter < 0 ? 'var(--accent-primary)' : 'var(--accent-secondary)',
              background: 'rgba(255,255,255,0.08)',
              height: '6px',
              borderRadius: '3px',
              outline: 'none',
              cursor: 'pointer'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
            <span>-6.00D (Severe Myopia)</span>
            <span>0.00D (Perfect Focus)</span>
            <span>+4.00D (Severe Hyperopia)</span>
          </div>
        </div>

        {/* Action Button: Simulate LASIK */}
        <button
          type="button"
          onClick={handleSimulateLasik}
          disabled={isCorrecting}
          className={`btn ${diopter === 0 ? 'btn-secondary' : 'btn-primary'}`}
          style={{
            padding: '14px 24px',
            fontSize: '0.9rem',
            width: '100%',
            marginTop: '8px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: diopter !== 0 ? '0 0 20px rgba(0, 240, 255, 0.25)' : 'none'
          }}
        >
          {isCorrecting ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span className="animate-spin-slow" style={{
                width: '12px',
                height: '12px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTop: '2px solid #ffffff',
                borderRadius: '50%',
                display: 'inline-block'
              }} />
              CORRECTING STROMAL PROFILE...
            </span>
          ) : diopter === 0 ? (
            'RE-RUN LASIK CORRECTION SIMULATION'
          ) : (
            'SIMULATE LASIK CORNEAL RESHAPING'
          )}
        </button>
      </div>

      {/* SVG Interactive Eye Graphic Panel */}
      <div style={{
        background: 'rgba(3, 7, 18, 0.65)',
        border: `1px solid ${laserActive ? 'rgba(0, 240, 255, 0.5)' : 'rgba(0, 240, 255, 0.2)'}`,
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        fontFamily: 'monospace',
        fontSize: '0.75rem',
        boxShadow: laserActive 
          ? 'inset 0 0 30px rgba(0, 240, 255, 0.15), 0 0 30px rgba(0, 240, 255, 0.08)' 
          : 'inset 0 0 20px rgba(0,0,0,0.5)',
        transition: 'all 0.3s ease',
        position: 'relative',
        minHeight: '260px',
        justifyContent: 'center'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', color: 'var(--accent-primary)', fontWeight: 'bold' }}>
          <span>HUD: REFRACTIVE SCAN</span>
          <span style={{ color: laserActive ? 'red' : 'var(--text-muted)' }}>
            {laserActive ? '● LASER ACTIVE' : '○ STABLE'}
          </span>
        </div>
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', overflow: 'visible' }}>
          <svg viewBox="0 0 160 100" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
            {/* Eyeball Sclera (Outer Shell) - Dynamic shape using ellipse arc */}
            <path 
              d={`M ${x_limbus},${y_top} A ${rx},${ry} 0 1 1 ${x_limbus},${y_bottom}`} 
              fill="none" 
              stroke="rgba(255,255,255,0.18)" 
              strokeWidth="1.5" 
            />
            
            {/* Cornea (Front Bulge) - Dual-segment Beziers showing peripheral (hyperopia) vs central (myopia) reshaping */}
            <path 
              d={diopter < 0
                ? `M ${x_limbus},${y_top} Q ${x_ctrl_top},${y_mid_top} ${x_apex},50 Q ${x_ctrl_bottom},${y_mid_bottom} ${x_limbus},${y_bottom}`
                : `M ${x_limbus},${y_top} Q ${x_ctrl_outer_top},33.85 ${x_groove_top},36 Q ${x_ctrl_inner_top},43 ${x_apex},50 Q ${x_ctrl_inner_bottom},57 ${x_groove_bottom},64 Q ${x_ctrl_outer_bottom},66.15 ${x_limbus},${y_bottom}`
              }
              fill="none" 
              stroke="rgba(0, 240, 255, 0.65)" 
              strokeWidth="2" 
            />
            
            {/* Retina Layer (Inside Back Arc) - Highlights in green when corrected */}
            {(() => {
              const retinaRx = rx - 1.5;
              const retinaRy = ry - 1.5;
              const retinaStartEndValY = 23;
              const retinaCosTheta = Math.sqrt(1 - Math.pow(retinaStartEndValY / retinaRy, 2));
              const retinaStartEndX = cx + retinaCosTheta * retinaRx;
              const retinaTopY = cy - retinaStartEndValY;
              const retinaBottomY = cy + retinaStartEndValY;
              return (
                <path 
                  d={`M ${retinaStartEndX},${retinaTopY} A ${retinaRx},${retinaRy} 0 0 1 ${retinaStartEndX},${retinaBottomY}`} 
                  fill="none" 
                  stroke={diopter === 0 ? 'var(--success)' : 'rgba(255,255,255,0.3)'} 
                  strokeWidth="2.5" 
                />
              );
            })()}
            
            {/* Iris (Vertical pupil boundaries at the limbus plane) */}
            <line x1={x_limbus} y1={y_top} x2={x_limbus} y2="40" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
            <line x1={x_limbus} y1={y_bottom} x2={x_limbus} y2="60" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
            
            {/* Iris Textures / Fibers */}
            <line x1={x_limbus} y1={y_top + 3} x2={x_limbus + 2} y2={y_top + 3} stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1" />
            <line x1={x_limbus} y1={y_top + 6} x2={x_limbus + 2} y2={y_top + 6} stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1" />
            <line x1={x_limbus} y1={y_bottom - 3} x2={x_limbus + 2} y2={y_bottom - 3} stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1" />
            <line x1={x_limbus} y1={y_bottom - 6} x2={x_limbus + 2} y2={y_bottom - 6} stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1" />
            
            {/* Crystalline Lens (sitting behind the pupil) */}
            <ellipse cx={x_limbus + 5} cy="50" rx="3.5" ry="11" fill="rgba(0, 240, 255, 0.04)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
            
            {/* Light Entrance Rays (before cornea, entering pupil) */}
            <line x1="10" y1="42" x2={xRefractTop} y2="42" stroke={rayColor} strokeWidth="1.5" />
            <line x1="10" y1="58" x2={xRefractBottom} y2="58" stroke={rayColor} strokeWidth="1.5" />
            
            {/* Focal Alignment Vertical Dash Line (reference at emmetropia retina position) */}
            <line x1="112" y1="18" x2="112" y2="82" stroke={(diopter === 0 || correctionFactor === 1.0) ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255,255,255,0.15)'} strokeWidth="1" strokeDasharray="3 2" />
            
            {/* Refracted rays inside eye */}
            {(diopter < 0 || (diopter === 0 && correctionFactor === 0.0)) ? (
              // Myopia / Ideal Pre-Op: Rays focus early at focalX, cross, and hit the dynamic retina at retinaX
              <>
                <path d={`M ${xRefractTop},42 L ${focalX},50 L ${retinaX},${yRetinaTop}`} fill="none" stroke={rayColor} strokeWidth="1.5" />
                <path d={`M ${xRefractBottom},58 L ${focalX},50 L ${retinaX},${yRetinaBottom}`} fill="none" stroke={rayColor} strokeWidth="1.5" />
              </>
            ) : (
              // Hyperopia or Post-Op Emmetropia: Rays hit retina at retinaX before focusing behind/at focalX
              <>
                <line x1={xRefractTop} y1="42" x2={retinaX} y2={yRetinaTop} stroke={rayColor} strokeWidth="1.5" />
                <line x1={xRefractBottom} y1="58" x2={retinaX} y2={yRetinaBottom} stroke={rayColor} strokeWidth="1.5" />
                
                {/* Virtual focus lines behind retina */}
                <line x1={retinaX} y1={yRetinaTop} x2={focalX} y2="50" stroke={rayColor} strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                <line x1={retinaX} y1={yRetinaBottom} x2={focalX} y2="50" stroke={rayColor} strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
              </>
            )}
            
            {/* Focal Point Indicator Dot */}
            <circle cx={focalX} cy="50" r="3" fill={(diopter === 0 || correctionFactor === 1.0) ? 'var(--success)' : rayColor} style={{ transition: 'all 0.1s ease' }} />
            
            {/* Excimer Laser Beam */}
            {laserActive && (
              diopter < 0 ? (
                // Myopia: Central Ablation (flattens center)
                <>
                  <line x1={x_apex} y1="-10" x2={x_apex} y2="50" stroke="var(--accent-primary)" strokeWidth="3" opacity="0.85" className="animate-laser-pulse" />
                  <line x1={x_apex} y1="-10" x2={x_apex} y2="50" stroke="#ffffff" strokeWidth="1" opacity="0.95" />
                  <circle cx={x_apex} cy="50" r={4 + Math.sin(pulseCount) * 2} fill="#ffffff" opacity="0.9" />
                  <circle cx={x_apex} cy="50" r={8 + Math.cos(pulseCount) * 3} fill="rgba(0, 240, 255, 0.4)" />
                </>
              ) : (
                // Hyperopia: Peripheral Ablation (steepens center via peripheral ring)
                <>
                  {/* Top Peripheral Laser Beam */}
                  <line x1={xLaserTop} y1="-10" x2={xLaserTop} y2="36" stroke="var(--accent-secondary)" strokeWidth="2.5" opacity="0.85" className="animate-laser-pulse" />
                  <line x1={xLaserTop} y1="-10" x2={xLaserTop} y2="36" stroke="#ffffff" strokeWidth="1" opacity="0.95" />
                  <circle cx={xLaserTop} cy="36" r={3 + Math.sin(pulseCount) * 1.5} fill="#ffffff" opacity="0.9" />
                  <circle cx={xLaserTop} cy="36" r={6 + Math.cos(pulseCount) * 2} fill="rgba(0, 240, 255, 0.4)" />

                  {/* Bottom Peripheral Laser Beam */}
                  <line x1={xLaserBottom} y1="110" x2={xLaserBottom} y2="64" stroke="var(--accent-secondary)" strokeWidth="2.5" opacity="0.85" className="animate-laser-pulse" />
                  <line x1={xLaserBottom} y1="110" x2={xLaserBottom} y2="64" stroke="#ffffff" strokeWidth="1" opacity="0.95" />
                  <circle cx={xLaserBottom} cy="64" r={3 + Math.sin(pulseCount + 1) * 1.5} fill="#ffffff" opacity="0.9" />
                  <circle cx={xLaserBottom} cy="64" r={6 + Math.cos(pulseCount + 1) * 2} fill="rgba(0, 240, 255, 0.4)" />
                </>
              )
            )}
            
            {/* Focal labels */}
            <text x={focalX < 105 ? focalX - 8 : focalX + 8} y="44" fill={(diopter === 0 || correctionFactor === 1.0) ? 'var(--success)' : rayColor} fontSize="5" fontWeight="bold" textAnchor={focalX < 105 ? 'end' : 'start'}>
              {(diopter === 0 || correctionFactor === 1.0) ? 'FOCAL POINT (Retina)' : diopter < 0 ? 'MYOPIC FOCUS' : 'HYPEROPIC FOCUS'}
            </text>
            
            <text x={retinaX + 4} y="18" fill="var(--text-muted)" fontSize="5">RETINA</text>
          </svg>
        </div>

        {/* Telemetry metrics bar */}
        <div style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '10px',
          gap: '8px',
          fontSize: '0.65rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            <span>FOCAL DISTANCE:</span><br />
            <strong style={{ color: '#ffffff' }}>
              {((focalX - xRefract) * (24.0 / 63.09)).toFixed(1)} mm / {(diopter === 0 || correctionFactor === 1.0) ? 'OPTIMAL' : 'DEVIATED'}
            </strong>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span>RETINAL DISPERSION:</span><br />
            <strong style={{ color: (diopter === 0 || correctionFactor === 1.0) ? 'var(--success)' : 'var(--accent-primary)' }}>
              {(diopter === 0 || correctionFactor === 1.0) ? '0.00 mm (SHARP)' : `${(Math.abs(yRetinaTop - yRetinaBottom) * 0.15).toFixed(2)} mm (BLUR)`}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

const scienceTabs = [
  {
    id: 'optics',
    label: 'Optical Physics',
    title: 'Understanding Refractive Errors: Myopia & Hyperopia',
    icon: HelpCircle,
    color: 'var(--accent-primary)',
    content: <OpticsVisualizer />
  },
  {
    id: 'history',
    label: 'Historical Evolution',
    title: 'The Path to Modern Refractive Laser Surgery',
    icon: History,
    color: 'var(--accent-secondary)',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <p className="text-secondary" style={{ fontSize: '1rem', lineHeight: '1.7', fontWeight: '300', margin: 0 }}>
          Refractive eye surgery has evolved from manual mechanical incision limits to sub-micron dual-laser systems:
        </p>
        <div className="history-grid">
          <div style={{ background: 'rgba(3, 7, 18, 0.4)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '20px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>1970s - PRE-LASER ERA</span>
            <strong style={{ color: '#ffffff', display: 'block', marginBottom: '6px', fontSize: '1rem' }}>Mechanical Blade Limits</strong>
            <p className="text-secondary" style={{ fontSize: '0.85rem', lineHeight: '1.5', margin: 0, fontWeight: '300' }}>
              Before lasers, surgeries like Radial Keratotomy (RK) relied on diamond scalpels to make manual cornea incisions. Mechanical blade tolerances and healing variables drove research toward non-physical cutting.
            </p>
          </div>
          <div style={{ background: 'rgba(3, 7, 18, 0.4)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '20px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>1980s - COLD LASER REVOLUTION</span>
            <strong style={{ color: '#ffffff', display: 'block', marginBottom: '6px', fontSize: '1rem' }}>Argon-Fluoride Excimer Laser</strong>
            <p className="text-secondary" style={{ fontSize: '0.85rem', lineHeight: '1.5', margin: 0, fontWeight: '300' }}>
              The introduction of 193 nm ultraviolet excimer lasers changed refractive surgery. By breaking carbon-carbon collagen bonds directly (photoablation) rather than heating, it enabled clean tissue sculpting (PRK) without thermal scarring.
            </p>
          </div>
          <div style={{ background: 'rgba(8, 17, 37, 0.85)', border: '1px solid rgba(0, 240, 255, 0.25)', borderRadius: '16px', padding: '20px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--accent-primary)', display: 'block', marginBottom: '8px' }}>2000s-PRESENT - DUAL-LASER AGE</span>
            <strong style={{ color: 'var(--accent-primary)', display: 'block', marginBottom: '6px', fontSize: '1rem' }}>Femtosecond & Wavefront systems</strong>
            <p className="text-secondary" style={{ fontSize: '0.85rem', lineHeight: '1.5', margin: 0, fontWeight: '300' }}>
              Modern LASIK combines two lasers: a 1053 nm infrared Femtosecond Laser to create an ultra-precise corneal flap (replacing metal blades), followed by a Wavefront-Guided Excimer Laser reshaping the stroma based on custom 3D optical maps.
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'physics',
    label: 'Quantum Physics',
    title: 'The Biophysics of 193nm Cold Photoablation',
    icon: Activity,
    color: 'var(--accent-tertiary)',
    content: (
      <div className="physics-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p className="text-secondary" style={{ fontSize: '1rem', lineHeight: '1.7', fontWeight: '300', margin: 0 }}>
            Modern LASIK relies on quantum biophysics, using cold ultraviolet (UV) photons to reshape corneal tissue at a molecular scale without thermal expansion or heating of the surrounding tissue.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>•</span>
              <span className="text-secondary"><strong>Photoablation:</strong> The 193 nm ultraviolet light produced by an argon-fluoride excimer laser carries photons with 6.4 electron-volts (eV) of energy—enough to directly break the organic molecular carbon-carbon bonds within corneal collagen.</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>•</span>
              <span className="text-secondary"><strong>Zero Heat Damage:</strong> Because the energy breaks the bonds directly (photodisassociation) rather than cooking or vaporizing them, tissue is ablated cleanly leaving flat borders with zero thermal scarring or thermal collateral damage.</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>•</span>
              <span className="text-secondary"><strong>Micro-bubbling Flaps:</strong> The femtosecond laser operates at a near-infrared wavelength (1053 nm), focusing ultra-short pulses (a quadrillionth of a second) to create microscopic gas bubbles that separate corneal layers mechanically, preventing tissue tearing.</span>
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(3, 7, 18, 0.4)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '24px', fontFamily: 'monospace', fontSize: '0.8rem' }}>
          <div style={{ borderBottom: '1px solid rgba(0, 240, 255, 0.2)', paddingBottom: '8px', marginBottom: '12px', color: 'var(--accent-primary)', fontWeight: 'bold' }}>
            BIOPHYSICS TELEMETRY LOG
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>LASER WAVELENGTH:</span>
              <span style={{ color: '#ffffff' }}>193 nm (Ultraviolet)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>PHOTON ENERGY:</span>
              <span style={{ color: '#ffffff' }}>6.4 eV (Quantum Bond Break)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>ABLATION ACCURACY:</span>
              <span style={{ color: 'var(--success)' }}>0.25 Microns Per Pulse</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>PULSE SPEED:</span>
              <span style={{ color: '#ffffff' }}>1.4 Milliseconds Response</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>THERMAL PROFILE:</span>
              <span style={{ color: 'var(--success)' }}>0.0°C (Non-Thermal)</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'healing',
    label: 'Healing & Recovery',
    title: 'Corneal Reshaping & Recovery Expectations',
    icon: ShieldCheck,
    color: 'var(--success)',
    content: (
      <div className="healing-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ color: '#ffffff', fontSize: '1.15rem', fontWeight: '600', margin: 0 }}>Permanent Corneal Curvature Changes</h4>
          <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: '1.6', margin: 0, fontWeight: '300' }}>
            LASIK physically and permanently alters the refractive power of the cornea. Because the stromal tissue of the cornea does not regenerate, the reshaped profile remains stable indefinitely, preserving the focal alignment.
          </p>
          <div style={{ padding: '12px 16px', background: 'rgba(16, 185, 129, 0.03)', border: '1px solid rgba(16, 185, 129, 0.15)', borderRadius: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: '600', display: 'block', marginBottom: '4px' }}>✓ Osmotic Cohesion</span>
            <p className="text-secondary" style={{ fontSize: '0.8rem', lineHeight: '1.4', margin: 0 }}>
              The corneal flap requires no sutures. It is held securely in place immediately after treatment by natural endothelial fluid pumps generating osmotic suction, locking borders tightly.
            </p>
          </div>
          <div style={{ padding: '12px 16px', background: 'rgba(251, 191, 36, 0.02)', border: '1px solid rgba(251, 191, 36, 0.15)', borderRadius: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: '600', display: 'block', marginBottom: '4px' }}>⚠ Safety, Side Effects & Risks</span>
            <p className="text-secondary" style={{ fontSize: '0.78rem', lineHeight: '1.4', margin: 0 }}>
              While recovery is fast, patients may experience temporary side effects during initial stabilization (typically 1–6 months):
            </p>
            <ul style={{ margin: '4px 0 0 16px', padding: 0, fontSize: '0.78rem', lineHeight: '1.4', color: 'var(--text-secondary)' }}>
              <li><strong>Dry Eyes:</strong> Reduced tear production is common early on; managed with lubricating drops.</li>
              <li><strong>Night Vision Symptoms:</strong> Halos, glare, starbursts, or light sensitivity as the corneal flap settles.</li>
              <li><strong>Enhancement Procedures:</strong> In minor cases of residual refractive error (under- or over-correction), a follow-up enhancement procedure may be recommended.</li>
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ color: '#ffffff', fontSize: '1.15rem', fontWeight: '600', margin: 0 }}>Timeline of Cellular Recovery</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ background: 'var(--bg-tertiary)', color: 'var(--accent-primary)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '0.8rem', flexShrink: 0 }}>1</div>
              <div>
                <strong style={{ color: '#ffffff', display: 'block', fontSize: '0.9rem' }}>Hours 1 - 4: Primary Epithelial Seal</strong>
                <span className="text-secondary" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>The outer epithelium cells begin bridging the flap margins. Patients are given an oral sedative to encourage sleeping through this initial recovery window.</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ background: 'var(--bg-tertiary)', color: 'var(--accent-primary)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '0.8rem', flexShrink: 0 }}>2</div>
              <div>
                <strong style={{ color: '#ffffff', display: 'block', fontSize: '0.9rem' }}>Day 1 - 2: Cellular Cohesion</strong>
                <span className="text-secondary" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>Outer borders are sealed. Visual acuity clears dramatically (often achieving 20/20 or better). Follow-up mapping confirms flap alignment.</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ background: 'var(--bg-tertiary)', color: 'var(--accent-primary)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '0.8rem', flexShrink: 0 }}>3</div>
              <div>
                <strong style={{ color: '#ffffff', display: 'block', fontSize: '0.9rem' }}>Week 1 - 4: Corneal Stabilization</strong>
                <span className="text-secondary" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>Fluctuations in minor swelling subside. Anti-inflammatory drops are slowly tapered as tissue structures fully consolidate.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

export default function LasikScience() {
  const [activeTab, setActiveTab] = useState('optics');

  const currentTab = scienceTabs.find(tab => tab.id === activeTab);
  const IconComponent = currentTab.icon;

  return (
    <section id="lasik-science" style={{ padding: 'clamp(112px, 8vw, 144px) 24px', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        <div className="text-center" style={{ marginBottom: '48px' }}>
          <span className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] font-semibold bg-white/5 border border-white/10 text-white/70" style={{ display: 'inline-block', marginBottom: '16px' }}>
            Clinical Biophysics & Principles
          </span>
          <h2 className="bio-heading" style={{ margin: 0 }}>
            The Science of <span className="bio-heading-accent">LASIK Precision</span>
          </h2>
          <p className="text-secondary" style={{ maxWidth: '800px', margin: '12px auto 0 auto', fontSize: '1.15rem', lineHeight: '1.6', fontWeight: '300' }}>
            Understand the biological principles, refractive physics, quantum laser dynamics, and recovery structures that enable permanent vision correction.
          </p>
        </div>

        {/* Tabbed Interactive Bento Layout */}
        <div className="glass-panel" style={{
          padding: '40px',
          border: '1px solid rgba(0, 240, 255, 0.25)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 240, 255, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }}>
          {/* Tab Selector Buttons */}
          <div className="science-tabs-container">
            {scienceTabs.map((tab, index) => {
              const TabIcon = tab.icon;
              const isActive = tab.id === activeTab;
              return (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="science-tab-btn"
                  style={{
                    background: isActive ? 'rgba(0, 240, 255, 0.08)' : 'rgba(3, 7, 18, 0.3)',
                    border: isActive ? '1px solid var(--accent-primary)' : '1px solid rgba(255,255,255,0.06)',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    fontWeight: isActive ? '700' : '500',
                  }}
                >
                  <span style={{ fontFamily: 'monospace', color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)', fontSize: '0.75rem', marginRight: '2px' }}>
                    [0{index + 1}]
                  </span>
                  <TabIcon size={14} style={{ color: isActive ? 'var(--accent-primary)' : 'inherit' }} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Active Tab Screen Panel */}
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(0, 240, 255, 0.06)',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <IconComponent size={16} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#ffffff', margin: 0 }}>
                {currentTab.title}
              </h3>
            </div>

            <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.05)', margin: '4px 0' }} />

            {/* Render Active JSX Body */}
            {currentTab.content}
          </div>

        </div>

      </div>
    </section>
  );
}

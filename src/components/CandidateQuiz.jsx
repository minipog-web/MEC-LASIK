import React, { useState } from 'react';
import { CheckCircle, AlertCircle, ArrowRight, RotateCcw, ShieldCheck, Activity, Brain } from 'lucide-react';

const questions = [
  {
    id: 'age',
    question: 'Are you 25 years of age or older?',
    options: [
      { label: 'Yes, I am 25 or older', value: 'yes', score: 1 },
      { label: 'No, I am under 25', value: 'no', score: 0 }
    ],
    hint: 'FDA approved LASIK is typically for individuals 18 and older whose eyes have finished growing.'
  },
  {
    id: 'prescription',
    question: 'Has your vision prescription been stable for the last 1-2 years?',
    options: [
      { label: 'Yes, it is stable', value: 'yes', score: 1 },
      { label: 'No, it changes frequently', value: 'no', score: 0 }
    ],
    hint: 'A stable prescription ensures the best long-term outcome from the procedure.'
  },
  {
    id: 'eye_health',
    question: 'Do you have any severe eye conditions? (e.g., severe dry eye, keratoconus, glaucoma, cataracts)',
    options: [
      { label: 'Yes, I have one or more conditions', value: 'yes', score: 0 },
      { label: 'No, my eyes are healthy', value: 'no', score: 1 }
    ],
    hint: 'LASIK can temporarily exacerbate dry eyes or cause light sensitivity. Pre-existing severe dry eye or corneal conditions require special evaluation or alternative treatments.'
  },
  {
    id: 'health',
    question: 'Are you currently pregnant, nursing, or have a condition that affects immune response? (e.g., Rheumatoid Arthritis, Lupus)',
    options: [
      { label: 'Yes, one of these applies to me', value: 'yes', score: 0 },
      { label: 'No, none of these apply', value: 'no', score: 1 }
    ],
    hint: 'Hormonal fluctuations and immune responses can affect corneal healing.'
  }
];

export default function CandidateQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isScanning, setIsScanning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (score) => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: score }));
    setIsScanning(true);
    
    setTimeout(() => {
      setIsScanning(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setIsFinished(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsScanning(false);
    setIsFinished(false);
  };

  const renderResult = () => {
    const totalScore = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
    const isGoodCandidate = totalScore === questions.length;

    return (
      <div className="glass-panel quiz-result-card animate-fade-in" style={{ 
        maxWidth: '650px', 
        margin: '0 auto', 
        textAlign: 'center', 
        padding: '48px 36px',
        border: '1px solid rgba(0, 240, 255, 0.25)',
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 240, 255, 0.05)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          {isGoodCandidate ? (
            <div className="active-radar-dot" style={{ color: 'var(--success)', background: 'rgba(16, 185, 129, 0.1)', padding: '20px', borderRadius: '50%' }}>
              <CheckCircle size={56} />
            </div>
          ) : (
            <div style={{ color: 'var(--accent-gold)', background: 'rgba(251, 191, 36, 0.1)', padding: '20px', borderRadius: '50%' }}>
              <AlertCircle size={56} />
            </div>
          )}
        </div>
        
        <h3 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px', letterSpacing: '-0.01em' }}>
          {isGoodCandidate ? 'Initial Biometrics Approved' : 'Assessment Report Prepared'}
        </h3>
        <span style={{ 
          fontSize: '0.75rem', 
          fontFamily: 'monospace', 
          color: isGoodCandidate ? 'var(--success)' : 'var(--accent-gold)', 
          textTransform: 'uppercase', 
          letterSpacing: '2px', 
          display: 'block', 
          marginBottom: '28px' 
        }}>
          {isGoodCandidate ? 'Diagnostic Status: Highly Eligible' : 'Diagnostic Status: Consultation Recommended'}
        </span>

        {/* Biometric Diagnostic Report Checklist */}
        <div style={{
          background: 'rgba(3, 7, 18, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '36px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          textAlign: 'left',
          fontFamily: 'monospace',
          fontSize: '0.85rem'
        }}>
          <div style={{ color: 'var(--accent-primary)', borderBottom: '1px solid rgba(0, 240, 255, 0.15)', paddingBottom: '8px', marginBottom: '4px', fontWeight: 'bold' }}>
            BIOMETRIC CRITERIA RESULTS
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>AGE PROFILE (&gt;18):</span>
            <span style={{ color: answers.age === 1 ? 'var(--success)' : 'var(--accent-gold)' }}>
              {answers.age === 1 ? '[ PASS ]' : '[ REVIEW REQ ]'}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>STABLE PRESCRIPTION:</span>
            <span style={{ color: answers.prescription === 1 ? 'var(--success)' : 'var(--accent-gold)' }}>
              {answers.prescription === 1 ? '[ PASS ]' : '[ REVIEW REQ ]'}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>SEVERE EYE CONDITIONS:</span>
            <span style={{ color: answers.eye_health === 1 ? 'var(--success)' : 'var(--error)' }}>
              {answers.eye_health === 1 ? '[ NONE DETECTED ]' : '[ DETAILS REQ ]'}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>AUTOIMMUNE / CORNEAL HEAL:</span>
            <span style={{ color: answers.health === 1 ? 'var(--success)' : 'var(--error)' }}>
              {answers.health === 1 ? '[ PASS ]' : '[ DETAILS REQ ]'}
            </span>
          </div>
        </div>
        
        <p className="text-secondary" style={{ fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.7', fontWeight: '300' }}>
          {isGoodCandidate 
            ? 'Based on your diagnostic profile, you are a prime candidate for LASIK. The next step is a comprehensive topography mapping exam with Dr. Marano. Booking slots for this month are filling up fast.' 
            : 'Your profile presents some factors that require a detailed discussion. LASIK may not be the direct match, but secondary options (PRK, ICL, or custom lenses) are highly effective alternatives that Dr. Marano offers.'}
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-primary" onClick={scrollToContact} style={{ padding: '12px 28px' }}>
            Schedule Free Consultation 
            <span className="btn-icon-wrapper">
              <ArrowRight size={14} />
            </span>
          </button>
          <button type="button" className="btn btn-secondary" onClick={restartQuiz} style={{ padding: '12px 28px' }}>
            <RotateCcw size={16} /> Retake Assessment
          </button>
        </div>
      </div>
    );
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="section" id="quiz" style={{ padding: '100px 0 60px 0' }}>
      <div className="text-center" style={{ marginBottom: '60px' }}>
        <h2 className="bio-heading">
          Candidacy <span className="bio-heading-accent">Self-Test</span>
        </h2>
        <p className="text-secondary" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.25rem', lineHeight: '1.7', fontWeight: '300' }}>
          Complete this quick 60-second diagnostic assessment to check your baseline visual parameters.
        </p>
      </div>

      <div className="container">
        {isFinished ? (
          renderResult()
        ) : (
          <div className="glass-panel quiz-card animate-fade-in" style={{ 
            maxWidth: '650px', 
            margin: '0 auto', 
            padding: '48px 40px',
            border: '1px solid rgba(0, 240, 255, 0.2)',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 240, 255, 0.05)',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '360px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            {isScanning ? (
              /* High-Tech Diagnostic Laser Scanner Screen Overlay */
              <div className="animate-fade-in" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                position: 'absolute',
                inset: 0,
                background: 'rgba(3, 7, 18, 0.95)',
                zIndex: 10
              }}>
                {/* Horizontal Neon Scanning Line */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'var(--accent-primary)',
                  boxShadow: '0 0 15px var(--accent-primary), 0 0 30px var(--accent-secondary)',
                  animation: 'scan-line 1s infinite linear'
                }} />
                
                {/* Scanning HUD grid background */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0, 240, 255, 0.05)',
                  animation: 'radarPulse 1.2s infinite ease-out'
                }}>
                  <Activity size={32} color="var(--accent-primary)" />
                </div>
                
                <span style={{ 
                  fontFamily: 'monospace', 
                  fontSize: '0.85rem', 
                  color: 'var(--accent-primary)', 
                  fontWeight: 'bold',
                  letterSpacing: '2px',
                  textTransform: 'uppercase'
                }}>
                  Analyzing Parameters...
                </span>
              </div>
            ) : null}

            {/* Main Question Display */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <span className="text-muted" style={{ fontWeight: 700, fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: 'monospace' }}>
                Assessment Profile · Q {currentQuestion + 1} / {questions.length}
              </span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {questions.map((_, i) => (
                  <div 
                    key={i} 
                    style={{ 
                      width: i === currentQuestion ? '12px' : '8px', 
                      height: i === currentQuestion ? '12px' : '8px', 
                      borderRadius: '50%', 
                      background: i < currentQuestion 
                        ? 'var(--accent-secondary)' 
                        : i === currentQuestion 
                          ? 'var(--accent-primary)' 
                          : 'rgba(255, 255, 255, 0.08)',
                      boxShadow: i === currentQuestion 
                        ? '0 0 10px var(--accent-primary)' 
                        : 'none',
                      border: i === currentQuestion 
                        ? '2px solid rgba(255,255,255,0.3)' 
                        : 'none',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }} 
                  />
                ))}
              </div>
            </div>

            <h3 style={{ fontSize: '1.6rem', fontWeight: '600', marginBottom: '20px', lineHeight: '1.4', letterSpacing: '-0.01em', color: '#ffffff' }}>
              {questions[currentQuestion].question}
            </h3>

            {questions[currentQuestion].hint && (
              <p className="text-secondary" style={{ fontSize: '0.95rem', marginBottom: '24px', fontStyle: 'italic', display: 'flex', alignItems: 'start', gap: '8px', lineHeight: '1.5', fontWeight: '300' }}>
                <AlertCircle size={18} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }} /> {questions[currentQuestion].hint}
              </p>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
              {questions[currentQuestion].options.map((option, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => handleAnswer(option.score)}
                  className="quiz-option-btn"
                >
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

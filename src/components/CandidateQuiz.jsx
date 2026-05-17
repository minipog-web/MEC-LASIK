import React, { useState } from 'react';
import { CheckCircle, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';

const questions = [
  {
    id: 'age',
    question: 'Are you 25 years of age or older?',
    options: [
      { label: 'Yes', value: 'yes', score: 1 },
      { label: 'No', value: 'no', score: 0 }
    ],
    hint: 'FDA approved LASIK is typically for individuals 18 and older whose eyes have finished growing.'
  },
  {
    id: 'prescription',
    question: 'Has your vision prescription been stable for the last 1-2 years?',
    options: [
      { label: 'Yes', value: 'yes', score: 1 },
      { label: 'No', value: 'no', score: 0 }
    ],
    hint: 'A stable prescription ensures the best long-term outcome from the procedure.'
  },
  {
    id: 'eye_health',
    question: 'Do you have any severe eye conditions? (e.g., severe dry eye, keratoconus, glaucoma, cataracts)',
    options: [
      { label: 'Yes', value: 'yes', score: 0 },
      { label: 'No', value: 'no', score: 1 }
    ]
  },
  {
    id: 'health',
    question: 'Are you currently pregnant, nursing, or have a condition that affects immune response? (e.g., Rheumatoid Arthritis, Lupus)',
    options: [
      { label: 'Yes', value: 'yes', score: 0 },
      { label: 'No', value: 'no', score: 1 }
    ],
    hint: 'Hormonal fluctuations and immune responses can affect corneal healing.'
  }
];

export default function CandidateQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (score) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: score });
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsFinished(false);
  };

  const renderResult = () => {
    const totalScore = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
    const isGoodCandidate = totalScore === questions.length;

    return (
      <div className="glass-panel animate-fade-in" style={{ padding: '40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          {isGoodCandidate ? (
            <div className="pulse-animation" style={{ color: 'var(--success)', background: 'rgba(16, 185, 129, 0.1)', padding: '20px', borderRadius: '50%' }}>
              <CheckCircle size={64} />
            </div>
          ) : (
            <div style={{ color: 'var(--warning)', background: 'rgba(245, 158, 11, 0.1)', padding: '20px', borderRadius: '50%' }}>
              <AlertCircle size={64} />
            </div>
          )}
        </div>
        
        <h3 style={{ fontSize: '2rem', marginBottom: '16px' }}>
          {isGoodCandidate ? 'You appear to be a great candidate!' : 'A consultation is recommended.'}
        </h3>
        
        <p className="text-secondary" style={{ fontSize: '1.1rem', marginBottom: '32px' }}>
          {isGoodCandidate 
            ? 'Based on your answers, you meet the initial criteria for LASIK. The next step is a comprehensive dilated eye exam to measure your corneal thickness and pupil size.' 
            : 'Based on your answers, there are a few factors we need to evaluate further. LASIK might not be the best fit right now, but alternative procedures like PRK or ICL might be an option.'}
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={() => window.open('https://mec1.net/contact', '_blank')}>
            Schedule Free Consultation <ArrowRight size={18} />
          </button>
          <button className="btn btn-secondary" onClick={restartQuiz}>
            <RotateCcw size={18} /> Retake Quiz
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="section" id="quiz" style={{ padding: '60px 0' }}>
      <div className="text-center" style={{ marginBottom: '40px' }}>
        <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Candidacy Self-Test</h2>
        <p className="text-secondary" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          Take our 60-second quiz to see if you meet the preliminary requirements for laser vision correction.
        </p>
      </div>

      <div className="container">
        {!isFinished ? (
          <div className="glass-panel animate-fade-in" key={currentQuestion} style={{ maxWidth: '700px', margin: '0 auto', padding: '40px' }}>
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="text-muted" style={{ fontWeight: 600, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {questions.map((_, i) => (
                  <div key={i} style={{ 
                    width: '32px', 
                    height: '4px', 
                    borderRadius: '2px', 
                    background: i <= currentQuestion ? 'var(--accent-primary)' : 'var(--glass-border)' 
                  }} />
                ))}
              </div>
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', lineHeight: '1.4' }}>
              {questions[currentQuestion].question}
            </h3>

            {questions[currentQuestion].hint && (
              <p className="text-secondary" style={{ fontSize: '0.95rem', marginBottom: '24px', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={16} /> {questions[currentQuestion].hint}
              </p>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '32px' }}>
              {questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.score)}
                  className="quiz-option-btn"
                >
                  {option.label} <ChevronRightIcon />
                </button>
              ))}
            </div>
          </div>
        ) : (
          renderResult()
        )}
      </div>
    </div>
  );
}

// Small helper component
function ChevronRightIcon() {
  return <ArrowRight size={20} style={{ opacity: 0.5 }} />;
}

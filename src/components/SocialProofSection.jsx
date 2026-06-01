import React from 'react';

export default function SocialProofSection() {
  return (
    <section id="social-proof-section">
      <div className="proof-inner">
        <div className="proof-header">
          <h2 className="proof-title">
            Real Stories, <span className="proof-title-accent">Real Results</span>
          </h2>
          <p className="proof-subtitle">
            Hear from patients who trusted Marano Eye Care with their vision.
          </p>
        </div>

        <div className="proof-stats-bar" style={{ background: 'transparent', gap: '16px', overflow: 'visible' }}>
          <div className="proof-stat-item glass-panel" style={{
            border: '1px solid rgba(0, 240, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 240, 255, 0.08), 0 0 15px rgba(0, 240, 255, 0.03)',
            background: 'rgba(0, 240, 255, 0.04)',
            borderRadius: '16px',
            padding: '24px 16px',
            transition: 'all 0.3s ease'
          }}>
            <span className="proof-stat-value" style={{ color: 'var(--accent-primary)', textShadow: '0 0 15px rgba(0, 240, 255, 0.4)', fontSize: '2.2rem', fontWeight: '800' }}>10,000+</span>
            <span className="proof-stat-label" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '1px' }}>Procedures Performed</span>
          </div>

          <div className="proof-stat-item glass-panel" style={{
            border: '1px solid rgba(251, 191, 36, 0.3)',
            boxShadow: '0 8px 32px rgba(251, 191, 36, 0.08), 0 0 15px rgba(251, 191, 36, 0.03)',
            background: 'rgba(251, 191, 36, 0.04)',
            borderRadius: '16px',
            padding: '24px 16px',
            transition: 'all 0.3s ease'
          }}>
            <span className="proof-stat-value" style={{ color: 'var(--accent-gold)', textShadow: '0 0 15px rgba(251, 191, 36, 0.4)', fontSize: '2.2rem', fontWeight: '800' }}>4.9 ★</span>
            <span className="proof-stat-label" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '1px' }}>Patient Satisfaction</span>
          </div>

          <div className="proof-stat-item glass-panel" style={{
            border: '1px solid rgba(16, 185, 129, 0.3)',
            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.08), 0 0 15px rgba(16, 185, 129, 0.03)',
            background: 'rgba(16, 185, 129, 0.04)',
            borderRadius: '16px',
            padding: '24px 16px',
            transition: 'all 0.3s ease'
          }}>
            <span className="proof-stat-value" style={{ color: 'var(--success)', textShadow: '0 0 15px rgba(16, 185, 129, 0.4)', fontSize: '2.2rem', fontWeight: '800' }}>98%</span>
            <span className="proof-stat-label" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '1px' }}>Would Recommend</span>
          </div>
        </div>

        <div className="proof-testimonials">
          <div className="proof-card">
            <div className="proof-stars">★★★★★</div>
            <p className="proof-quote">
              I spent 20 years fumbling with contacts every morning. After my procedure with Dr. Marano, I woke up the next day and could read the alarm clock across the room. I cried. My only regret is waiting so long.
            </p>
            <div className="proof-attribution">
              <div className="proof-avatar proof-avatar-1">SM</div>
              <div className="proof-author-info">
                <span className="proof-author-name">Sarah M.</span>
                <span className="proof-author-detail">LASIK patient since 2021</span>
              </div>
            </div>
          </div>

          <div className="proof-card">
            <div className="proof-stars">★★★★★</div>
            <p className="proof-quote">
              As an athlete, glasses and contacts were always a hassle. Dr. Marano made the whole process feel safe and straightforward. The procedure itself took minutes, and now I compete without thinking about my vision at all.
            </p>
            <div className="proof-attribution">
              <div className="proof-avatar proof-avatar-2">JR</div>
              <div className="proof-author-info">
                <span className="proof-author-name">James R.</span>
                <span className="proof-author-detail">LASIK patient since 2023</span>
              </div>
            </div>
          </div>

          <div className="proof-card">
            <div className="proof-stars">★★★★★</div>
            <p className="proof-quote">
              I was terrified, honestly. But the staff walked me through every single step, and Dr. Marano's experience put me at ease. The consultation was zero pressure. Now I tell everyone—this was the best investment I've ever made in myself.
            </p>
            <div className="proof-attribution">
              <div className="proof-avatar proof-avatar-3">LD</div>
              <div className="proof-author-info">
                <span className="proof-author-name">Lauren D.</span>
                <span className="proof-author-detail">LASIK patient since 2022</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

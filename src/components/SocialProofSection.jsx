import React from 'react';
import { Star, MessageSquare, Heart, CheckCircle2 } from 'lucide-react';

const testimonials = [
  {
    initials: 'SM',
    name: 'Sarah M.',
    detail: 'LASIK Patient since 2021',
    quote: 'I spent 20 years fumbling with contacts every morning. After my procedure with Dr. Marano, I woke up the next day and could read the alarm clock across the room. I cried. My only regret is waiting so long.',
    stars: 5,
    avatarBg: 'linear-gradient(135deg, rgba(110, 154, 120, 0.5) 0%, rgba(110, 154, 120, 0.2) 100%)'
  },
  {
    initials: 'JR',
    name: 'James R.',
    detail: 'LASIK Patient since 2023',
    quote: 'As an athlete, glasses and contacts were always a hassle. Dr. Marano made the whole process feel safe and straightforward. The procedure itself took minutes, and now I compete without thinking about my vision at all.',
    stars: 5,
    avatarBg: 'linear-gradient(135deg, rgba(127, 161, 214, 0.5) 0%, rgba(127, 161, 214, 0.2) 100%)'
  },
  {
    initials: 'LD',
    name: 'Lauren D.',
    detail: 'LASIK Patient since 2022',
    quote: 'I was terrified, honestly. But the staff walked me through every single step, and Dr. Marano\'s experience put me at ease. The consultation was zero pressure. Now I tell everyone—this was the best investment I\'ve ever made in myself.',
    stars: 5,
    avatarBg: 'linear-gradient(135deg, rgba(167, 139, 250, 0.5) 0%, rgba(167, 139, 250, 0.2) 100%)'
  }
];

export default function SocialProofSection() {
  return (
    <section id="reviews" className="section" style={{ padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        {/* Section Header */}
        <div className="text-center" style={{ marginBottom: '56px' }}>
          <h2 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '16px', fontWeight: '700', letterSpacing: '-0.02em' }}>
            Real Stories, Real Results
          </h2>
          <p className="text-secondary" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.25rem', lineHeight: '1.7' }}>
            Hear from patients who trusted Marano Eye Care with their vision.
          </p>
        </div>

        {/* Stats Row */}
        <div 
          className="responsive-grid" 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '24px', 
            marginBottom: '56px',
            borderRadius: '24px',
            overflow: 'hidden'
          }}
        >
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', background: 'rgba(11, 19, 41, 0.4)' }}>
            <div style={{ color: 'var(--accent-primary)', fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '8px' }}>10,000+</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>Procedures Performed</div>
          </div>
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', background: 'rgba(11, 19, 41, 0.4)' }}>
            <div style={{ color: 'var(--accent-primary)', fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              4.9 <Star size={24} fill="var(--accent-primary)" stroke="none" />
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>Patient Rating</div>
          </div>
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', background: 'rgba(11, 19, 41, 0.4)' }}>
            <div style={{ color: 'var(--accent-primary)', fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '8px' }}>98%</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>Would Recommend</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
          {testimonials.map((t, idx) => (
            <div 
              key={idx} 
              className="glass-panel" 
              style={{ 
                padding: '40px 32px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '24px',
                background: 'rgba(11, 19, 41, 0.5)'
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '4px' }}>
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--accent-primary)" stroke="none" />
                ))}
              </div>

              {/* Quote */}
              <p 
                className="text-secondary" 
                style={{ 
                  fontSize: '1rem', 
                  lineHeight: '1.7', 
                  margin: 0, 
                  fontStyle: 'italic', 
                  flexGrow: 1, 
                  color: '#e2e8f0' 
                }}
              >
                "{t.quote}"
              </p>

              {/* Attribution */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '16px', 
                  paddingTop: '20px', 
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)' 
                }}
              >
                <div 
                  style={{ 
                    width: '44px', 
                    height: '44px', 
                    borderRadius: '50%', 
                    background: t.avatarBg, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontWeight: '700', 
                    fontSize: '0.95rem', 
                    color: '#fff', 
                    flexShrink: 0,
                    border: '1px solid rgba(255,255,255,0.08)'
                  }}
                >
                  {t.initials}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: '600', color: '#f8fafc' }}>{t.name}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.detail}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

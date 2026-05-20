const fs = require('fs');
const filePath = 'c:\\Users\\adamp\\Downloads\\LASIK-App\\index.html';
let content = fs.readFileSync(filePath, 'utf8');

const proofCSS = `
    <style id="proof-styles">
      #social-proof-section {
        padding: 96px 24px;
        background-color: transparent;
        position: relative;
        z-index: 1;
        font-family: "Outfit", system-ui, -apple-system, sans-serif;
        letter-spacing: 0.03em;
        word-spacing: 0.06em;
      }

      .proof-inner {
        max-width: 1100px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 48px;
      }

      .proof-header {
        text-align: center;
      }

      .proof-title {
        font-size: clamp(28px, 4vw, 42px);
        font-weight: 300;
        color: #f8fafc;
        letter-spacing: 0.015em;
        margin-bottom: 16px;
      }

      .proof-title-accent {
        background: linear-gradient(135deg, #6e9a78 0%, #7fa1d6 100%);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
        font-weight: 600;
      }

      .proof-subtitle {
        font-size: 18px;
        color: #94a3b8;
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.7;
      }

      /* ── Aggregate Stats Bar ──────────────────────────────── */
      .proof-stats-bar {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2px;
        background: rgba(255, 255, 255, 0.04);
        border-radius: 20px;
        overflow: hidden;
      }

      .proof-stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        padding: 28px 16px;
        background: rgba(13, 20, 30, 0.6);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        transition: background 0.3s ease;
      }

      .proof-stat-item:first-child {
        border-radius: 20px 0 0 20px;
      }

      .proof-stat-item:last-child {
        border-radius: 0 20px 20px 0;
      }

      .proof-stat-item:hover {
        background: rgba(13, 20, 30, 0.75);
      }

      .proof-stat-value {
        font-size: clamp(28px, 3.5vw, 36px);
        font-weight: 700;
        color: #f8fafc;
        letter-spacing: 0.015em;
        line-height: 1;
      }

      .proof-stat-label {
        font-size: 13px;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-weight: 600;
      }

      /* ── Testimonial Cards ───────────────────────────────── */
      .proof-testimonials {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
      }

      .proof-card {
        background: rgba(13, 20, 30, 0.55);
        border-radius: 24px;
        padding: 36px 32px;
        box-shadow: 0 24px 64px -16px rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(32px) saturate(140%);
        -webkit-backdrop-filter: blur(32px) saturate(140%);
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .proof-card::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        padding: 1px;
        background: linear-gradient(135deg, rgba(127, 161, 214, 0.2) 0%, rgba(110, 154, 120, 0.15) 50%, rgba(167, 139, 250, 0.2) 100%);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: exclude;
        pointer-events: none;
        transition: background 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .proof-card:hover {
        background: rgba(13, 20, 30, 0.65);
        transform: translateY(-4px);
        box-shadow: 0 32px 80px -20px rgba(0, 0, 0, 0.8);
      }

      .proof-card:hover::before {
        background: linear-gradient(135deg, rgba(127, 161, 214, 0.35) 0%, rgba(110, 154, 120, 0.28) 50%, rgba(167, 139, 250, 0.35) 100%);
      }

      .proof-stars {
        display: flex;
        gap: 3px;
        color: #f59e0b;
        font-size: 16px;
      }

      .proof-quote {
        font-size: 16px;
        line-height: 1.75;
        color: #e2e8f0;
        font-style: italic;
        flex-grow: 1;
      }

      .proof-quote::before {
        content: "\\201C";
        font-size: 28px;
        line-height: 0;
        vertical-align: -8px;
        margin-right: 2px;
        color: rgba(127, 161, 214, 0.5);
        font-style: normal;
      }

      .proof-attribution {
        display: flex;
        align-items: center;
        gap: 12px;
        padding-top: 16px;
        border-top: 1px solid rgba(255, 255, 255, 0.06);
      }

      .proof-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 15px;
        color: #f8fafc;
        flex-shrink: 0;
      }

      .proof-avatar-1 { background: linear-gradient(135deg, rgba(110, 154, 120, 0.5) 0%, rgba(110, 154, 120, 0.3) 100%); }
      .proof-avatar-2 { background: linear-gradient(135deg, rgba(127, 161, 214, 0.5) 0%, rgba(127, 161, 214, 0.3) 100%); }
      .proof-avatar-3 { background: linear-gradient(135deg, rgba(167, 139, 250, 0.5) 0%, rgba(167, 139, 250, 0.3) 100%); }

      .proof-author-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .proof-author-name {
        font-size: 14px;
        font-weight: 600;
        color: #f8fafc;
        letter-spacing: 0.02em;
      }

      .proof-author-detail {
        font-size: 12px;
        color: #64748b;
        letter-spacing: 0.02em;
      }

      /* ── Responsive ──────────────────────────────────────── */
      @media (max-width: 900px) {
        .proof-testimonials {
          grid-template-columns: 1fr;
          gap: 20px;
        }
      }

      @media (max-width: 640px) {
        .proof-stats-bar {
          grid-template-columns: 1fr;
          border-radius: 20px;
        }
        .proof-stat-item:first-child {
          border-radius: 20px 20px 0 0;
        }
        .proof-stat-item:last-child {
          border-radius: 0 0 20px 20px;
        }
        .proof-card {
          padding: 28px 24px;
        }
      }
    </style>`;

const proofHTML = `
  <div class="proof-inner">
    <div class="proof-header">
      <h2 class="proof-title">Real Stories, <span class="proof-title-accent">Real Results</span></h2>
      <p class="proof-subtitle">Hear from patients who trusted Marano Eye Care with their vision.</p>
    </div>

    <div class="proof-stats-bar">
      <div class="proof-stat-item">
        <span class="proof-stat-value">10,000+</span>
        <span class="proof-stat-label">Procedures Performed</span>
      </div>
      <div class="proof-stat-item">
        <span class="proof-stat-value">4.9 ★</span>
        <span class="proof-stat-label">Patient Satisfaction</span>
      </div>
      <div class="proof-stat-item">
        <span class="proof-stat-value">98%</span>
        <span class="proof-stat-label">Would Recommend</span>
      </div>
    </div>

    <div class="proof-testimonials">
      <div class="proof-card">
        <div class="proof-stars">★★★★★</div>
        <p class="proof-quote">I spent 20 years fumbling with contacts every morning. After my procedure with Dr. Marano, I woke up the next day and could read the alarm clock across the room. I cried. My only regret is waiting so long.</p>
        <div class="proof-attribution">
          <div class="proof-avatar proof-avatar-1">SM</div>
          <div class="proof-author-info">
            <span class="proof-author-name">Sarah M.</span>
            <span class="proof-author-detail">LASIK patient since 2021</span>
          </div>
        </div>
      </div>

      <div class="proof-card">
        <div class="proof-stars">★★★★★</div>
        <p class="proof-quote">As an athlete, glasses and contacts were always a hassle. Dr. Marano made the whole process feel safe and straightforward. The procedure itself took minutes, and now I compete without thinking about my vision at all.</p>
        <div class="proof-attribution">
          <div class="proof-avatar proof-avatar-2">JR</div>
          <div class="proof-author-info">
            <span class="proof-author-name">James R.</span>
            <span class="proof-author-detail">LASIK patient since 2023</span>
          </div>
        </div>
      </div>

      <div class="proof-card">
        <div class="proof-stars">★★★★★</div>
        <p class="proof-quote">I was terrified, honestly. But the staff walked me through every single step, and Dr. Marano's experience put me at ease. The consultation was zero pressure. Now I tell everyone\u2014this was the best investment I've ever made in myself.</p>
        <div class="proof-attribution">
          <div class="proof-avatar proof-avatar-3">LD</div>
          <div class="proof-author-info">
            <span class="proof-author-name">Lauren D.</span>
            <span class="proof-author-detail">LASIK patient since 2022</span>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

const injectionScript = `
    <script id="proof-logic">
      (function() {
        function injectProof() {
          if (document.getElementById('social-proof-section')) return;

          // Position after education section
          let targetSection = document.getElementById('education-section');
          
          if (!targetSection) {
            // Fallback: find by heading text
            const eduHeading = Array.from(document.querySelectorAll('h2')).find(el =>
              el.textContent.includes('Science of LASIK')
            );
            if (eduHeading) {
              targetSection = eduHeading.closest('section');
            }
          }

          if (targetSection) {
            const section = document.createElement('section');
            section.id = 'social-proof-section';
            section.innerHTML = \`${proofHTML}\`;
            targetSection.insertAdjacentElement('afterend', section);
          }
        }

        const observer = new MutationObserver((mutations) => {
          for (const m of mutations) {
            if (m.type === 'childList' && m.addedNodes.length > 0) {
              if (!document.getElementById('social-proof-section')) {
                injectProof();
              }
              break;
            }
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });

        injectProof();
        setInterval(injectProof, 2000);
      })();
    </script>`;

// ─── Write to index.html ──────────────────────────────────────────────────────

// Remove old versions
const oldStyleId = '<style id="proof-styles">';
const oldStyleEnd = content.indexOf('</style>', content.indexOf(oldStyleId));
if (content.includes(oldStyleId) && oldStyleEnd !== -1) {
  content = content.substring(0, content.indexOf(oldStyleId)) + content.substring(oldStyleEnd + 8);
}

const headEnd = content.indexOf('</head>');
if (headEnd !== -1) {
  content = content.substring(0, headEnd) + proofCSS + '\n  ' + content.substring(headEnd);
}

const oldLogicId = '<script id="proof-logic">';
const oldLogicEnd = content.indexOf('</script>', content.indexOf(oldLogicId));
if (content.includes(oldLogicId) && oldLogicEnd !== -1) {
  content = content.substring(0, content.indexOf(oldLogicId)) + content.substring(oldLogicEnd + 9);
}

const bodyEnd = content.lastIndexOf('</body>');
if (bodyEnd !== -1) {
  content = content.substring(0, bodyEnd) + '\n' + injectionScript + '\n  ' + content.substring(bodyEnd);
}

content = content.replace(/<section id="social-proof-section">[\s\S]*?<\/section>/g, '');

fs.writeFileSync(filePath, content);
console.log('✓ index.html patched — Social Proof section injected');

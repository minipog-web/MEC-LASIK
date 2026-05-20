const fs = require('fs');
const filePath = 'c:\\Users\\adamp\\Downloads\\LASIK-App\\index.html';
let content = fs.readFileSync(filePath, 'utf8');

const maranoCSS = `
    <style id="marano-styles">
      #marano-section {
        padding: 0 24px;
        background-color: transparent;
        position: relative;
        z-index: 1;
        font-family: "Outfit", system-ui, -apple-system, sans-serif;
        letter-spacing: 0.03em;
        word-spacing: 0.06em;
      }

      .marano-inner {
        max-width: 1000px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 32px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        padding-top: 60px;
        padding-bottom: 60px;
      }

      .marano-header {
        text-align: center;
        margin-bottom: 24px;
      }

      .marano-title {
        font-size: clamp(28px, 4vw, 42px);
        font-weight: 300;
        color: #f8fafc;
        letter-spacing: 0.015em;
        margin-bottom: 16px;
      }

      .marano-title-accent {
        background: linear-gradient(135deg, #6e9a78 0%, #7fa1d6 100%);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
        font-weight: 600;
      }

      .marano-card {
        background: rgba(13, 20, 30, 0.55);
        border-radius: 28px;
        padding: 48px;
        box-shadow: 
          0 24px 64px -16px rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(32px) saturate(140%);
        -webkit-backdrop-filter: blur(32px) saturate(140%);
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        position: relative;
      }

      .marano-card::before {
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

      .marano-card:hover {
        background: rgba(13, 20, 30, 0.6);
        box-shadow: 
          0 32px 80px -20px rgba(0, 0, 0, 0.8);
      }

      .marano-card:hover::before {
        background: linear-gradient(135deg, rgba(127, 161, 214, 0.35) 0%, rgba(110, 154, 120, 0.28) 50%, rgba(167, 139, 250, 0.35) 100%);
      }

      .marano-text {
        font-size: 18px;
        line-height: 1.8;
        color: #e2e8f0;
        margin-bottom: 24px;
        text-align: justify;
      }

      .marano-text:last-child {
        margin-bottom: 0;
      }

      /* ── Intro Grid & Pillars ────────────────────────── */
      .marano-intro-grid {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: 40px;
        align-items: center;
        margin-bottom: 40px;
      }

      .marano-intro-text {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .marano-intro-text .marano-text {
        margin-bottom: 0;
      }

      .marano-pillars-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .pillar-card {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 16px;
        padding: 16px 20px;
        display: flex;
        gap: 16px;
        align-items: center;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .pillar-card:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(127, 161, 214, 0.25);
        transform: translateX(4px);
      }

      .pillar-icon-wrapper {
        width: 42px;
        height: 42px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(127, 161, 214, 0.1);
        border: 1px solid rgba(127, 161, 214, 0.2);
        color: #7fa1d6;
        flex-shrink: 0;
      }

      .pillar-title {
        font-size: 16px;
        font-weight: 600;
        color: #f8fafc;
        margin: 0 0 2px 0 !important;
      }

      .pillar-desc {
        font-size: 13px;
        color: #94a3b8;
        line-height: 1.4;
        margin: 0 !important;
      }

      /* ── Cost Comparison Grid ─────────────────────────── */
      .cost-comparison {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 0;
        margin-top: 16px;
        border-radius: 20px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.06);
      }

      .cost-column {
        padding: 32px 28px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        text-align: center;
      }

      .cost-column-without {
        background: rgba(239, 68, 68, 0.04);
      }

      .cost-column-with {
        background: rgba(110, 154, 120, 0.06);
      }

      .cost-divider {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 4px;
        background: rgba(255, 255, 255, 0.02);
        font-size: 14px;
        color: #475569;
        font-weight: 700;
      }

      .cost-label {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-weight: 700;
        padding: 4px 12px;
        border-radius: 6px;
      }

      .cost-label-without {
        color: #f87171;
        background: rgba(239, 68, 68, 0.1);
      }

      .cost-label-with {
        color: #6e9a78;
        background: rgba(110, 154, 120, 0.12);
      }

      .cost-items {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
      }

      .cost-line {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #94a3b8;
        padding: 4px 0;
      }

      .cost-line-amount {
        font-weight: 600;
        color: #cbd5e1;
      }

      .cost-total {
        display: flex;
        justify-content: space-between;
        font-size: 15px;
        font-weight: 700;
        padding-top: 12px;
        margin-top: 8px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }

      .cost-total-without {
        color: #f87171;
      }

      .cost-total-with {
        color: #6e9a78;
      }

      .cost-big-number {
        font-size: clamp(24px, 3vw, 32px);
        font-weight: 800;
        line-height: 1;
        margin-top: 4px;
      }

      .cost-big-without {
        color: #f87171;
      }

      .cost-big-with {
        color: #6e9a78;
      }

      .cost-footnote {
        font-size: 13px;
        color: #64748b;
        text-align: center;
        margin-top: 16px;
        font-style: italic;
        line-height: 1.6;
      }

      /* ── Consultation CTA ────────────────────────────── */
      .consultation-cta {
        background: radial-gradient(circle at top right, rgba(110, 154, 120, 0.06) 0%, rgba(127, 161, 214, 0.02) 70%);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 20px;
        padding: 36px;
        margin-top: 40px;
      }

      .consultation-layout {
        display: grid;
        grid-template-columns: 1.1fr 1fr;
        gap: 40px;
        align-items: center;
      }

      .consultation-steps-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .consultation-steps {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .consult-step {
        display: flex;
        gap: 12px;
        align-items: flex-start;
      }

      .consult-num {
        font-size: 11px;
        font-weight: 700;
        color: #6e9a78;
        background: rgba(110, 154, 120, 0.12);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-top: 2px;
      }

      .consult-text {
        font-size: 13.5px;
        color: #cbd5e1;
        line-height: 1.4;
      }

      .consult-text strong {
        color: #f8fafc;
        font-weight: 600;
      }

      .btn-consult {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: linear-gradient(135deg, #6e9a78 0%, #7fa1d6 100%);
        color: #ffffff;
        border: none;
        border-radius: 12px;
        padding: 14px 24px;
        font-size: 14.5px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 4px 20px rgba(110, 154, 120, 0.2);
        width: 100%;
        font-family: inherit;
      }

      .btn-consult:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(110, 154, 120, 0.35);
        filter: brightness(1.08);
      }
      
      @media (max-width: 768px) {
        .marano-card {
          padding: 32px 24px;
          border-radius: 20px;
        }
        .marano-text {
          font-size: 16px;
        }
        .marano-intro-grid {
          grid-template-columns: 1fr;
          gap: 28px;
          margin-bottom: 32px;
        }
        .pillar-card:hover {
          transform: none;
        }
        .cost-comparison {
          grid-template-columns: 1fr;
        }
        .cost-divider {
          padding: 12px;
          font-size: 13px;
        }
        .cost-column {
          padding: 24px 20px;
        }
        .consultation-cta {
          padding: 24px 20px;
          margin-top: 32px;
        }
        .consultation-layout {
          grid-template-columns: 1fr;
          gap: 24px;
        }
      }
    </style>`;

const maranoHTML = `
  <div class="marano-inner">
    <div class="marano-header">
      <h2 class="marano-title">Trust Your Vision to <span class="marano-title-accent">Marano Eye Care</span></h2>
    </div>
    <div class="marano-card">
      
      <!-- 2-Column Introduction & Brand Pillars -->
      <div class="marano-intro-grid">
        <div class="marano-intro-text">
          <p class="marano-text">
            At Marano Eye Care, we believe that laser vision correction is a deeply personal journey, not just a medical procedure. Under the expert guidance of Dr. Matthew Marano, our practice is built on a foundation of trust, advanced technology, and unwavering dedication to patient outcomes.
          </p>
          <p class="marano-text">
            We treat every patient like family, ensuring you receive the individualized care and attention you deserve from your very first visit. While the initial investment in LASIK may seem significant, it is a decision that often pays for itself in just a few short years.
          </p>
        </div>

        <div class="marano-pillars-list">
          <div class="pillar-card">
            <div class="pillar-icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
            </div>
            <div>
              <h3 class="pillar-title">Decades of Trust</h3>
              <p class="pillar-desc">Led by Dr. Matthew Marano, New Jersey's pioneer in laser eye surgery.</p>
            </div>
          </div>
          <div class="pillar-card">
            <div class="pillar-icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
            </div>
            <div>
              <h3 class="pillar-title">Advanced Lasers</h3>
              <p class="pillar-desc">Computer-guided custom mapping and state-of-the-art excimer systems.</p>
            </div>
          </div>
          <div class="pillar-card">
            <div class="pillar-icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </div>
            <div>
              <h3 class="pillar-title">Personal Focus</h3>
              <p class="pillar-desc">Completely custom procedures tailored to your unique lifestyle.</p>
            </div>
          </div>
        </div>
      </div>

      <p class="marano-text text-center" style="font-size: 16px; margin-bottom: 24px; color: #94a3b8;">
        When you compare the cumulative, lifelong costs of corrective eyewear against a single procedure, the math speaks for itself:
      </p>

      <div class="cost-comparison">
        <div class="cost-column cost-column-without">
          <span class="cost-label cost-label-without">Without LASIK</span>
          <div class="cost-items">
            <div class="cost-line"><span>Contact lenses</span><span class="cost-line-amount">$500/yr</span></div>
            <div class="cost-line"><span>Solution & cases</span><span class="cost-line-amount">$150/yr</span></div>
            <div class="cost-line"><span>Annual eye exams</span><span class="cost-line-amount">$200/yr</span></div>
            <div class="cost-line"><span>Backup glasses</span><span class="cost-line-amount">$300/yr</span></div>
            <div class="cost-total cost-total-without"><span>Annual cost</span><span>~$1,150</span></div>
          </div>
          <div class="cost-big-number cost-big-without">~$34,500</div>
          <span style="font-size: 12px; color: #94a3b8;">over 30 years</span>
        </div>

        <div class="cost-divider">vs</div>

        <div class="cost-column cost-column-with">
          <span class="cost-label cost-label-with">With LASIK</span>
          <div class="cost-items">
            <div class="cost-line"><span>One-time procedure</span><span class="cost-line-amount">—</span></div>
            <div class="cost-line"><span>No daily contacts</span><span class="cost-line-amount">$0</span></div>
            <div class="cost-line"><span>No solutions</span><span class="cost-line-amount">$0</span></div>
            <div class="cost-line"><span>Visual freedom</span><span class="cost-line-amount">Priceless</span></div>
            <div class="cost-total cost-total-with"><span>Pays for itself</span><span>~3–4 yrs</span></div>
          </div>
          <div class="cost-big-number cost-big-with">Decades</div>
          <span style="font-size: 12px; color: #94a3b8;">of clear vision</span>
        </div>
      </div>

      <p class="cost-footnote">Costs are approximate averages. Ask about financing options during your complimentary consultation.</p>

      <!-- Premium Call to Action Consultation Box -->
      <div class="consultation-cta">
        <div class="consultation-layout">
          <div>
            <h3 style="font-size: clamp(20px, 3vw, 24px); font-weight: 600; color: #f8fafc; margin-bottom: 12px; font-family: inherit;">Your Complimentary Consultation</h3>
            <p class="marano-text" style="font-size: 15px; margin-bottom: 0; line-height: 1.6; text-align: left; color: #cbd5e1;">
              If you are considering the procedure, we invite you to our office for a completely pressure-free, complimentary consultation. We will take the time to evaluate your unique eyes, answer all questions, and help you determine if LASIK is the right fit for your lifestyle.
            </p>
          </div>
          
          <div class="consultation-steps-container">
            <div class="consultation-steps">
              <div class="consult-step">
                <span class="consult-num">1</span>
                <span class="consult-text"><strong>Advanced Eye Mapping</strong> – Comprehensive topography scan.</span>
              </div>
              <div class="consult-step">
                <span class="consult-num">2</span>
                <span class="consult-text"><strong>Surgeon Q&A</strong> – 1-on-1 discussion with Dr. Marano.</span>
              </div>
              <div class="consult-step">
                <span class="consult-num">3</span>
                <span class="consult-text"><strong>Personalized Plan</strong> – Custom visual roadmap, no obligation.</span>
              </div>
            </div>
            
            <button class="btn-consult" onclick="document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })">
              <span>Schedule Free Consultation</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
`;

const injectScript = `
    <script id="marano-logic">
      (function() {
        function injectMarano() {
          if (document.getElementById('marano-section')) return;

          // Find the quiz section
          let targetSection = document.getElementById('quiz');
          
          if (targetSection) {
            const section = document.createElement('section');
            section.id = 'marano-section';
            section.innerHTML = \`${maranoHTML}\`;
            targetSection.insertAdjacentElement('afterend', section);
          } else {
            // Fallback: look for contact section and insert before it
            let contactSection = document.getElementById('contact-section');
            if (contactSection) {
              const section = document.createElement('section');
              section.id = 'marano-section';
              section.innerHTML = \`${maranoHTML}\`;
              contactSection.insertAdjacentElement('beforebegin', section);
            }
          }
        }

        const observer = new MutationObserver((mutations) => {
          for (const m of mutations) {
            if (m.type === 'childList' && m.addedNodes.length > 0) {
              if (!document.getElementById('marano-section')) {
                injectMarano();
              }
              break;
            }
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });

        injectMarano();
        setInterval(injectMarano, 2000);
      })();
    </script>`;

// Clean previous injections
const oldStyleId = '<style id="marano-styles">';
const oldStyleEnd = content.indexOf('</style>', content.indexOf(oldStyleId));
if (content.includes(oldStyleId) && oldStyleEnd !== -1) {
  content = content.substring(0, content.indexOf(oldStyleId)) + content.substring(oldStyleEnd + 8);
}

const headEnd = content.indexOf('</head>');
if (headEnd !== -1) {
  content = content.substring(0, headEnd) + maranoCSS + '\n  ' + content.substring(headEnd);
}

const oldLogicId = '<script id="marano-logic">';
const oldLogicEnd = content.indexOf('</script>', content.indexOf(oldLogicId));
if (content.includes(oldLogicId) && oldLogicEnd !== -1) {
  content = content.substring(0, content.indexOf(oldLogicId)) + content.substring(oldLogicEnd + 9);
}

const bodyEnd = content.lastIndexOf('</body>');
if (bodyEnd !== -1) {
  content = content.substring(0, bodyEnd) + '\n' + injectScript + '\n  ' + content.substring(bodyEnd);
}

content = content.replace(/<section id="marano-section">[\s\S]*?<\/section>/g, '');

fs.writeFileSync(filePath, content);
console.log('✓ index.html patched — Marano Section injected successfully');

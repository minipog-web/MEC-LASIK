const fs = require('fs');
const filePath = 'c:\\Users\\adamp\\Downloads\\LASIK-App\\index.html';
let content = fs.readFileSync(filePath, 'utf8');

const eduCSS = `
    <style id="edu-styles">
      #education-section {
        padding: 96px 24px;
        background-color: transparent;
        position: relative;
        z-index: 1;
        font-family: "Outfit", system-ui, -apple-system, sans-serif;
        letter-spacing: 0.03em;
        word-spacing: 0.06em;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        margin: 48px 0;
      }

      .edu-inner {
        max-width: 1000px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 32px;
      }

      .edu-header {
        text-align: center;
        margin-bottom: 24px;
      }

      .edu-title {
        font-size: clamp(28px, 4vw, 42px);
        font-weight: 300;
        color: #f8fafc;
        letter-spacing: 0.015em;
        margin-bottom: 16px;
      }

      .edu-title-accent {
        background: linear-gradient(135deg, #6e9a78 0%, #7fa1d6 100%);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
        font-weight: 600;
      }

      .edu-card {
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

      .edu-card::before {
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

      .edu-card:hover {
        background: rgba(13, 20, 30, 0.6);
        box-shadow: 
          0 32px 80px -20px rgba(0, 0, 0, 0.8);
      }

      .edu-card:hover::before {
        background: linear-gradient(135deg, rgba(127, 161, 214, 0.35) 0%, rgba(110, 154, 120, 0.28) 50%, rgba(167, 139, 250, 0.35) 100%);
      }

      .edu-text {
        font-size: 18px;
        line-height: 1.8;
        color: #e2e8f0;
        margin-bottom: 24px;
        text-align: justify;
      }

      .edu-text:last-child {
        margin-bottom: 0;
      }

      /* ── Education Grid ──────────────────────────────── */
      .edu-science-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
        align-items: center;
        margin-bottom: 40px;
      }

      .edu-science-text {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .edu-science-text .edu-text {
        margin-bottom: 0;
      }

      /* ── Simulator Widget ────────────────────────────── */
      .simulator-container {
        background: rgba(10, 15, 22, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 20px;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: center;
        position: relative;
        box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.4);
      }

      .simulator-view {
        display: flex;
        width: 100%;
        gap: 20px;
        align-items: center;
        justify-content: center;
      }

      .laser-eye-svg {
        width: 65%;
        height: auto;
        overflow: visible;
      }

      .vision-chart-container {
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        padding: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      .vision-chart-title {
        font-size: 10px;
        text-transform: uppercase;
        color: #64748b;
        letter-spacing: 0.1em;
        margin-bottom: 8px;
        font-weight: 700;
      }

      .vision-chart {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        font-family: monospace;
        font-weight: 700;
        color: #cbd5e1;
        transition: filter 1s cubic-bezier(0.16, 1, 0.3, 1);
        filter: blur(3px);
      }

      .chart-line-1 { font-size: 24px; color: #f8fafc; line-height: 1 !important; }
      .chart-line-2 { font-size: 16px; letter-spacing: 4px; line-height: 1 !important; }
      .chart-line-3 { font-size: 12px; letter-spacing: 3px; line-height: 1 !important; }
      .chart-line-4 { font-size: 9px; letter-spacing: 2px; line-height: 1 !important; }

      /* SVG Element Transitions */
      .cornea-blurry {
        transition: opacity 0.5s ease;
      }
      .cornea-sharp {
        opacity: 0;
        transition: opacity 0.5s ease;
      }
      .path-blurry {
        stroke: rgba(127, 161, 214, 0.85);
        stroke-dasharray: 4;
        transition: opacity 0.5s ease;
      }
      .path-sharp {
        stroke: #6e9a78;
        opacity: 0;
        transition: opacity 0.5s ease;
      }
      .focus-blurry {
        fill: rgba(127, 161, 214, 0.6);
        filter: blur(2px);
        transition: opacity 0.5s ease;
      }
      .focus-sharp {
        fill: #6e9a78;
        opacity: 0;
        filter: drop-shadow(0 0 4px #6e9a78);
        transition: opacity 0.5s ease;
      }

      .laser-beam {
        opacity: 0;
        stroke: #ef4444;
        stroke-width: 3;
        filter: drop-shadow(0 0 6px #ef4444);
        transition: opacity 0.2s ease;
      }

      .laser-sparks {
        opacity: 0;
        transition: opacity 0.2s ease;
      }

      /* Simulator States */
      .simulator-container.is-animating .laser-beam {
        opacity: 1;
        animation: laser-pulse 0.2s infinite alternate;
      }

      .simulator-container.is-animating .laser-sparks {
        opacity: 1;
        animation: sparks-shake 0.1s infinite;
      }

      .simulator-container.is-reshaped .cornea-blurry { opacity: 0; }
      .simulator-container.is-reshaped .cornea-sharp { opacity: 1; }
      .simulator-container.is-reshaped .path-blurry { opacity: 0; }
      .simulator-container.is-reshaped .path-sharp { opacity: 1; }
      .simulator-container.is-reshaped .focus-blurry { opacity: 0; }
      .simulator-container.is-reshaped .focus-sharp { opacity: 1; }
      .simulator-container.is-reshaped .vision-chart { filter: blur(0px); }

      .simulator-status {
        font-size: 13px;
        color: #94a3b8;
        text-align: center;
        min-height: 20px;
        transition: color 0.3s ease;
        margin-bottom: 4px;
        font-weight: 500;
      }

      .simulator-container.is-reshaped .simulator-status {
        color: #6e9a78;
      }

      .simulator-container.is-animating .simulator-status {
        color: #ef4444;
      }

      .btn-laser {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: rgba(127, 161, 214, 0.1);
        border: 1px solid rgba(127, 161, 214, 0.25);
        color: #7fa1d6;
        border-radius: 12px;
        padding: 12px 20px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        font-family: inherit;
      }

      .btn-laser:hover:not(:disabled) {
        background: rgba(127, 161, 214, 0.2);
        border-color: #7fa1d6;
        transform: translateY(-1px);
      }

      .simulator-container.is-reshaped .btn-laser {
        background: rgba(110, 154, 120, 0.1);
        border-color: rgba(110, 154, 120, 0.25);
        color: #6e9a78;
      }

      .simulator-container.is-reshaped .btn-laser:hover {
        background: rgba(110, 154, 120, 0.18);
        border-color: #6e9a78;
      }

      @keyframes laser-pulse {
        0% { stroke-width: 2; filter: drop-shadow(0 0 3px #ef4444); }
        100% { stroke-width: 4; filter: drop-shadow(0 0 8px #ef4444); }
      }

      @keyframes sparks-shake {
        0% { transform: translate(0, 0) scale(0.8); }
        50% { transform: translate(1px, -1px) scale(1.2); }
        100% { transform: translate(-1px, 1px) scale(0.9); }
      }

      @keyframes animate-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .animate-spin {
        animation: animate-spin 1s linear infinite;
      }

      /* ── Benefits Grid ──────────────────────────────── */
      .edu-benefits-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 24px;
        margin-bottom: 40px;
      }

      .benefit-card {
        background: rgba(255, 255, 255, 0.01);
        border: 1px solid rgba(255, 255, 255, 0.04);
        border-radius: 20px;
        padding: 28px 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .benefit-card:hover {
        background: rgba(255, 255, 255, 0.03);
        border-color: rgba(127, 161, 214, 0.2);
        transform: translateY(-2px);
      }

      .benefit-icon-wrapper {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(127, 161, 214, 0.08);
        border: 1px solid rgba(127, 161, 214, 0.15);
        color: #7fa1d6;
      }

      .benefit-card:nth-child(2) .benefit-icon-wrapper {
        background: rgba(110, 154, 120, 0.08);
        border-color: rgba(110, 154, 120, 0.15);
        color: #6e9a78;
      }

      .benefit-title {
        font-size: 17px;
        font-weight: 600;
        color: #f8fafc;
        margin: 0 !important;
      }

      .benefit-desc {
        font-size: 13.5px;
        color: #94a3b8;
        line-height: 1.5;
        margin: 0 !important;
      }

      /* ── Insight Box ────────────────────────────────── */
      .edu-insight-box {
        background: rgba(127, 161, 214, 0.03);
        border-left: 4px solid #7fa1d6;
        border-top: 1px solid rgba(127, 161, 214, 0.08);
        border-right: 1px solid rgba(127, 161, 214, 0.08);
        border-bottom: 1px solid rgba(127, 161, 214, 0.08);
        border-radius: 16px;
        padding: 24px 28px;
        display: flex;
        gap: 20px;
        align-items: flex-start;
        margin-bottom: 32px;
      }

      .insight-icon-wrapper {
        color: #7fa1d6;
        flex-shrink: 0;
        margin-top: 2px;
      }

      .insight-content {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .insight-title {
        font-size: 15px;
        font-weight: 600;
        color: #f8fafc;
        margin: 0 !important;
      }

      .insight-desc {
        font-size: 14px;
        color: #cbd5e1;
        line-height: 1.6;
        margin: 0 !important;
      }
      
      @media (max-width: 768px) {
        .edu-card {
          padding: 32px 24px;
          border-radius: 20px;
        }
        .edu-text {
          font-size: 16px;
        }
        .edu-science-grid {
          grid-template-columns: 1fr;
          gap: 28px;
          margin-bottom: 32px;
        }
        .edu-benefits-grid {
          grid-template-columns: 1fr;
          gap: 16px;
          margin-bottom: 32px;
        }
        .benefit-card:hover {
          transform: none;
        }
        .edu-insight-box {
          padding: 20px;
          gap: 12px;
        }
        .simulator-view {
          flex-direction: column;
          gap: 24px;
        }
        .laser-eye-svg {
          width: 85%;
        }
        .vision-chart-container {
          width: 70%;
        }
      }
    </style>`;

const eduHTML = `
  <div class="edu-inner">
    <div class="edu-header">
      <h2 class="edu-title">Understanding <span class="edu-title-accent">the Science of LASIK</span></h2>
    </div>
    <div class="edu-card">
      
      <!-- 2-Column Science Overview & Interactive Simulator -->
      <div class="edu-science-grid">
        <div class="edu-science-text">
          <p class="edu-text">
            LASIK (Laser Refractive Surgery) has transformed vision correction since its introduction more than 20 years ago. Instead of relying on older refractive surgical techniques, LASIK uses ultra-precise, computer-guided excimer lasers to gently reshape the cornea (the clear, curved front surface of the eye).
          </p>
          <p class="edu-text">
            By refining the corneal curvature, the procedure corrects refractive errors caused by the shape of the eye, such as nearsightedness, farsightedness, and astigmatism. The result is simple, but powerful: light enters the eye and focuses cleanly on the retina, producing crisp, sharp vision.
          </p>
        </div>

        <!-- Interactive Simulator Widget -->
        <div class="simulator-container">
          <div class="simulator-view">
            <!-- Eye SVG -->
            <svg class="laser-eye-svg" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
              <!-- Sclera (Eyeball body) -->
              <path d="M 110,40 A 70,70 0 1,1 110,180" fill="rgba(20, 28, 39, 0.6)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="2" />
              
              <!-- Retina highlight -->
              <path d="M 165,65 A 70,70 0 0,1 165,155" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="4" />
              
              <!-- Lens -->
              <ellipse cx="135" cy="110" rx="8" ry="22" fill="rgba(127, 161, 214, 0.2)" stroke="rgba(127, 161, 214, 0.4)" stroke-width="1.5" />
              
              <!-- Corneas (Blurry / Sharp) -->
              <path class="cornea-blurry" d="M 110,40 Q 72,110 110,180" fill="none" stroke="#7fa1d6" stroke-width="3.5" stroke-linecap="round" />
              <path class="cornea-sharp" d="M 110,40 Q 86,110 110,180" fill="none" stroke="#6e9a78" stroke-width="3.5" stroke-linecap="round" />
              
              <!-- Light Rays (Blurry / Sharp) -->
              <!-- Blurry: focuses before retina (x=155) then spreads out -->
              <path class="path-blurry" d="M 15,70 L 92,90 L 135,102 L 155,110 L 180,118" fill="none" stroke-width="2" />
              <path class="path-blurry" d="M 15,150 L 92,130 L 135,118 L 155,110 L 180,102" fill="none" stroke-width="2" />
              <path class="path-blurry" d="M 15,110 L 180,110" fill="none" stroke-width="1.5" />
              
              <!-- Sharp: focuses exactly on retina (x=180) -->
              <path class="path-sharp" d="M 15,70 L 96,90 L 135,102 L 180,110" fill="none" stroke-width="2" />
              <path class="path-sharp" d="M 15,150 L 96,130 L 135,118 L 180,110" fill="none" stroke-width="2" />
              <path class="path-sharp" d="M 15,110 L 180,110" fill="none" stroke-width="1.5" />
              
              <!-- Laser Beam -->
              <line class="laser-beam" x1="15" y1="110" x2="88" y2="110" />
              
              <!-- Laser Sparks -->
              <g class="laser-sparks">
                <circle cx="88" cy="110" r="4" fill="#ffdd00" />
                <circle cx="85" cy="100" r="2" fill="#ff7700" />
                <circle cx="85" cy="120" r="2" fill="#ff7700" />
                <line x1="88" y1="110" x2="78" y2="105" stroke="#ffdd00" stroke-width="1" />
                <line x1="88" y1="110" x2="78" y2="115" stroke="#ffdd00" stroke-width="1" />
              </g>
              
              <!-- Retina Focus Spot -->
              <circle class="focus-blurry" cx="180" cy="110" r="8" />
              <circle class="focus-sharp" cx="180" cy="110" r="3" />
            </svg>
            
            <!-- Snellen Chart Simulator -->
            <div class="vision-chart-container">
              <span class="vision-chart-title">Patient Vision</span>
              <div class="vision-chart">
                <div class="chart-line-1">E</div>
                <div class="chart-line-2">F P</div>
                <div class="chart-line-3">T O Z</div>
                <div class="chart-line-4">L P E D</div>
              </div>
            </div>
          </div>
          
          <div class="simulator-status">Status: Myopia (Blurry Distance Vision)</div>
          
          <button class="btn-laser" onclick="runLaserSimulation(this)">
            <span>Activate Reshaping Laser</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </button>
        </div>
      </div>

      <!-- 3-Column Lifestyle Benefits -->
      <div class="edu-benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon-wrapper">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
          </div>
          <div>
            <h3 class="benefit-title">99%+ Success Rate</h3>
            <p class="benefit-desc">The vast majority of patients achieve crisp 20/20 vision or better, often immediately.</p>
          </div>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon-wrapper">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          </div>
          <div>
            <h3 class="benefit-title">Rapid Recovery</h3>
            <p class="benefit-desc">Experience visual freedom within 24 hours. The cornea heals rapidly without stitches.</p>
          </div>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon-wrapper">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
          </div>
          <div>
            <h3 class="benefit-title">Active Lifestyle</h3>
            <p class="benefit-desc">Perfect for athletes, swimmers, frequent travelers, and outdoor enthusiasts.</p>
          </div>
        </div>
      </div>

      <!-- Educational Insight Box -->
      <div class="edu-insight-box">
        <div class="insight-icon-wrapper">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        </div>
        <div class="insight-content">
          <h3 class="insight-title">Important Educational Insight: LASIK & The Aging Eye</h3>
          <p class="insight-desc">
            As with all parts of the body, natural aging still occurs. Around age 40–45, the eye's internal lens gradually stiffens, leading to presbyopia (the normal need for reading glasses for close-up tasks). This happens whether you've had LASIK or not. Importantly, your LASIK-enhanced distance vision remains stable, crisp, and clear for years to come.
          </p>
        </div>
      </div>

      <p class="edu-text text-center" style="font-size: 18px; margin-top: 32px; font-weight: 500; color: #f8fafc;">
        If you’re ready to experience sharper vision, greater freedom, and a lifestyle without visual limitations, LASIK may be the step that transforms how you see the world.
      </p>

    </div>
  </div>
`;

const injectionScript = `
    <script id="edu-logic">
      (function() {
        window.runLaserSimulation = function(btn) {
          const container = btn.closest('.simulator-container');
          if (!container) return;
          
          const statusText = container.querySelector('.simulator-status');
          
          if (container.classList.contains('is-reshaped')) {
            // Reset
            container.classList.remove('is-reshaped');
            if (statusText) statusText.textContent = "Status: Myopia (Blurry Distance Vision)";
            btn.innerHTML = \`
              <span>Activate Reshaping Laser</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            \`;
            return;
          }

          container.classList.add('is-animating');
          if (statusText) statusText.textContent = "Status: Laser Reshaping in Progress...";
          btn.disabled = true;
          btn.innerHTML = \`
            <span>Laser Reshaping...</span>
            <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
          \`;

          setTimeout(() => {
            container.classList.remove('is-animating');
            container.classList.add('is-reshaped');
            btn.disabled = false;
            if (statusText) statusText.textContent = "Status: Emmetropia (20/20 Vision Achieved!)";
            btn.innerHTML = \`
              <span>Reset Simulator</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path></svg>
            \`;
          }, 2000);
        };

        function injectEducation() {
          if (document.getElementById('education-section')) return;

          let targetSection = null;
          // Find "The LASIK Journey" heading
          const journeyHeading = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).find(el =>
            el.textContent.includes('The LASIK Journey')
          );
          
          if (journeyHeading) {
            targetSection = journeyHeading.closest('section') || journeyHeading.closest('div[class*="section"]');
            if (!targetSection) {
              let el = journeyHeading.parentElement;
              while (el) {
                const parent = el.parentElement;
                if (!parent || parent === document.body || parent.id === 'root' || parent.tagName === 'MAIN') {
                  targetSection = el;
                  break;
                }
                el = parent;
              }
            }
          } else {
             // Fallback if not found
             targetSection = document.getElementById('heritage-section') || document.getElementById('hero');
          }

          if (targetSection) {
            const section = document.createElement('section');
            section.id = 'education-section';
            section.innerHTML = \`${eduHTML}\`;
            targetSection.insertAdjacentElement('afterend', section);
          }
        }

        // MutationObserver for React re-renders
        const observer = new MutationObserver((mutations) => {
          for (const m of mutations) {
            if (m.type === 'childList' && m.addedNodes.length > 0) {
              if (!document.getElementById('education-section')) {
                injectEducation();
              }
              break;
            }
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });

        // Immediate + periodic fallback
        injectEducation();
        setInterval(injectEducation, 2000);
      })();
    </script>`;

// Remove old versions
content = content.replace(/<style id="edu-styles">[\s\S]*?<\/style>/g, '');
content = content.replace(/<script id="edu-logic">[\s\S]*?<\/script>/g, '');

const headEnd = content.indexOf('</head>');
if (headEnd !== -1) {
  content = content.substring(0, headEnd) + eduCSS + '\n  ' + content.substring(headEnd);
}


const bodyEnd = content.lastIndexOf('</body>');
if (bodyEnd !== -1) {
  content = content.substring(0, bodyEnd) + '\n' + injectionScript + '\n  ' + content.substring(bodyEnd);
}

// Remove previously injected education-section from the actual HTML payload if it's there
content = content.replace(/<section id="education-section">[\s\S]*?<\/section>/g, '');

fs.writeFileSync(filePath, content);
console.log('✓ index.html patched — Educational Section updated successfully');

const fs = require('fs');
const filePath = 'c:\\Users\\adamp\\Downloads\\LASIK-App\\index.html';
let content = fs.readFileSync(filePath, 'utf8');

// ─── 1. CSS ──────────────────────────────────────────────────────────────────
// Design tokens sourced directly from the app bundle:
//   --bg-primary:     #0a0f16
//   --bg-secondary:   #141c27
//   --bg-tertiary:    #1e293b
//   --text-primary:   #f8fafc
//   --text-secondary: #94a3b8
//   --text-muted:     #64748b
//   --accent-primary: #7fa1d6  (blue)
//   --accent-secondary:#6e9a78 (green)
//   --border-light:   rgba(255,255,255,0.08)
//   --glass-bg:       rgba(20,28,39,0.6)
//   Section padding rhythm: 56px 0
//   Font: "Inter", system-ui

const heritageCSS = `
    <style id="her-styles">
      /* ── Heritage / Pioneering Excellence section ─────────────────────── */

      #heritage-section {
        /* Generous vertical breathing room matching the app's 56px section rhythm */
        padding: 56px 24px 72px;
        /* Fade-up entrance */
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 1.1s cubic-bezier(0.22, 1, 0.36, 1),
                    transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
        /* Match app font */
        font-family: "Inter", system-ui, -apple-system, sans-serif;
        /* Subtle top separator that fades from the hero's glow */
        border-top: 1px solid rgba(255, 255, 255, 0.06);
        /* Stunning parallax background with dark fade blend */
        background-color: #0a0f16;
        background-image: 
          linear-gradient(to bottom, #0a0f16 0%, rgba(10, 15, 22, 0.4) 25%, rgba(10, 15, 22, 0.8) 85%, #0a0f16 100%),
          url('./laser-eye-bg.jpg');
        background-size: cover;
        background-position: center 30%;
        background-attachment: fixed;
        background-blend-mode: overlay;
        position: relative;
        overflow: hidden;
      }

      #heritage-section.visible {
        opacity: 1;
        transform: translateY(0);
      }

      /* Ambient radial glows — echo the hero's orb effect */
      .her-glow-left {
        position: absolute;
        top: -100px;
        left: -80px;
        width: 480px;
        height: 480px;
        background: radial-gradient(circle, rgba(127, 161, 214, 0.07) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
      }

      .her-glow-right {
        position: absolute;
        bottom: -60px;
        right: -60px;
        width: 360px;
        height: 360px;
        background: radial-gradient(circle, rgba(110, 154, 120, 0.06) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
      }

      /* Inner container — matches the app's max-width: 1200px */
      .her-inner {
        position: relative;
        max-width: 1200px;
        margin: 0 auto;
        z-index: 1;
      }

      /* Glass card — matches the app's .glass-panel style exactly */
      .her-card {
        background: rgba(20, 28, 39, 0.6);
        -webkit-backdrop-filter: blur(16px);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 24px;
        padding: 52px 56px;
        position: relative;
        overflow: hidden;
        box-shadow:
          0 4px 6px -1px rgba(0,0,0,0.1),
          0 2px 4px -1px rgba(0,0,0,0.06),
          0 0 0 1px rgba(14, 165, 233, 0.06) inset;
      }

      /* Subtle top-left accent line — matches app's shimmer-border effect */
      .her-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 56px;
        right: 56px;
        height: 1px;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(14, 165, 233, 0.35) 40%,
          rgba(110, 154, 120, 0.25) 60%,
          transparent 100%
        );
      }

      .her-corner-glow {
        position: absolute;
        top: -80px;
        right: -80px;
        width: 280px;
        height: 280px;
        background: radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 70%);
        pointer-events: none;
      }

      /* Two-column layout: copy | stats */
      .her-layout {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 64px;
        align-items: center;
      }

      /* ── Left column: copy ─────────────────────────────── */

      .her-copy {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      /* Pill badge — matches the hero's "State-of-the-Art Laser Technology" badge */
      .her-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(14, 165, 233, 0.08);
        color: rgba(127, 161, 214, 1);
        border: 1px solid rgba(14, 165, 233, 0.2);
        border-radius: 9999px;
        padding: 6px 16px;
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        width: fit-content;
      }

      .her-badge-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #7fa1d6;
        box-shadow: 0 0 6px rgba(14, 165, 233, 0.8);
        animation: her-pulse 2.4s infinite;
        flex-shrink: 0;
      }

      @keyframes her-pulse {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.45; }
      }

      /* Heading — matches app h2 style */
      .her-title {
        font-size: clamp(26px, 4vw, 40px);
        font-weight: 600;
        color: #f8fafc;
        line-height: 1.15;
        letter-spacing: -0.02em;
        margin: 0;
      }

      /* Gradient accent — matches app's .text-gradient */
      .her-title-accent {
        background: linear-gradient(135deg, #6e9a78 0%, #7fa1d6 100%);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
        font-weight: 700;
      }

      .her-body {
        font-size: 16px;
        line-height: 1.75;
        color: #94a3b8;
        margin: 0;
        max-width: 560px;
      }

      .her-em {
        color: #c8d8f0;
        font-weight: 500;
      }

      /* ── Right column: stats ───────────────────────────── */

      .her-stats {
        display: flex;
        flex-direction: column;
        gap: 0;
        min-width: 180px;
        border-left: 1px solid rgba(255, 255, 255, 0.08);
        padding-left: 48px;
      }

      .her-stat {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 20px 0;
      }

      .her-divider {
        height: 1px;
        background: rgba(255, 255, 255, 0.06);
        width: 100%;
      }

      .her-stat-val {
        font-size: 32px;
        font-weight: 700;
        color: #f8fafc;
        line-height: 1;
        letter-spacing: -0.02em;
      }

      .her-stat-lbl {
        font-size: 11px;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        font-weight: 600;
      }

      /* ── Responsive ─────────────────────────────────────── */

      @media (max-width: 860px) {
        #heritage-section { padding: 48px 20px 60px; }

        .her-card { padding: 40px 28px; }

        .her-layout {
          grid-template-columns: 1fr;
          gap: 40px;
        }

        .her-stats {
          border-left: none;
          padding-left: 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 32px;
          flex-direction: row;
          justify-content: space-around;
          gap: 0;
        }

        .her-stat { padding: 0 16px; text-align: center; }
        .her-divider { display: none; }

        .her-stat:not(:last-child) {
          border-right: 1px solid rgba(255, 255, 255, 0.08);
        }
      }

      /* ── Logo Enhancements ─────────────────────────────────────── */
      img[alt="Marano Eye Care"],
      img[alt="Marano Eye Care Logo"] {
        height: 56px !important; /* Increase from default 32/40px */
        width: auto !important;
        transform: scale(1.1);
        transform-origin: left center;
        filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.15)) brightness(1.05);
        transition: all 0.3s ease;
        cursor: pointer !important;
      }

      /* ── Missing Utility Classes ───────────────────────────────── */
      .text-center { text-align: center !important; }
      .text-left { text-align: left !important; }
      .text-right { text-align: right !important; }
      .text-secondary { color: var(--text-secondary) !important; }
      .text-primary { color: var(--text-primary) !important; }

      /* ── Global Mobile Optimizations ───────────────────────────── */
      @media (max-width: 768px) {
        /* Force single-column flow on standard app containers
           EXCEPT: step nav row (parent of [aria-label^="Go to step"]) */
        .flex-row, .grid, [style*="display: grid"],
        [style*="display: flex"]:not(:has(> button[aria-label^="Go to step"])) {
          flex-direction: column !important;
          grid-template-columns: 1fr !important;
        }

        /* Prevent containers from blowing out the screen width */
        section, div, main, header, footer {
          box-sizing: border-box !important;
          max-width: 100vw !important;
        }

        /* Scale down large headings */
        h1 { font-size: clamp(28px, 8vw, 42px) !important; line-height: 1.1 !important; }
        h2 { font-size: clamp(24px, 6vw, 36px) !important; line-height: 1.2 !important; }
        h3 { font-size: clamp(20px, 5vw, 28px) !important; line-height: 1.3 !important; }

        /* Ensure images and videos are fluid */
        img, video, iframe {
          max-width: 100% !important;
          height: auto !important;
          object-fit: contain;
        }

        /* Increase touch targets and fix button wrapping
           EXCEPT: step nav circles */
        button:not([aria-label^="Go to step"]), .btn {
          min-height: 48px !important;
          width: 100% !important;
          justify-content: center !important;
          margin-bottom: 8px !important;
        }

        /* Ensure adequate padding on all screen edges */
        body { padding-left: 16px !important; padding-right: 16px !important; }
        
        /* Fix overlapping floating elements or absolute positioning on mobile */
        .glass-panel { padding: 24px !important; }
      }

      /* ── Premium Aesthetic Overrides ────────────────────────────── */
      /* Typography Refinements */
      h1, h2, h3, .h1, .h2, .h3 {
        font-weight: 300 !important;
        letter-spacing: -0.02em !important;
        color: #f8fafc !important;
      }
      p, li, span {
        color: #e2e8f0; /* Softer text color for better contrast against dark */
      }
      
      /* Generous Whitespace & Section Flow */
      section:not(#heritage-section):not(#contact-section) {
        padding-top: 96px !important;
        padding-bottom: 96px !important;
      }

      /* Glassmorphic Hierarchy & Depth */
      .card, [class*="card"], .glass-panel {
        border: 1px solid rgba(255, 255, 255, 0.04) !important;
        box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
        background: rgba(10, 15, 22, 0.6) !important;
        -webkit-backdrop-filter: blur(24px) !important;
        backdrop-filter: blur(24px) !important;
        border-radius: 24px !important;
        padding: 32px !important;
      }

      /* Elevate the bright cyan elements */
      .btn-primary, button[class*="primary"] {
        box-shadow: 0 0 24px rgba(14, 165, 233, 0.4) !important;
        border: 1px solid rgba(14, 165, 233, 0.5) !important;
        font-weight: 500 !important;
        letter-spacing: 0.01em !important;
      }

    </style>`;

// ─── 2. HTML ──────────────────────────────────────────────────────────────────
const heritageSectionHTML = `
  <div class="her-inner">
    <div class="her-glow-left" aria-hidden="true"></div>
    <div class="her-glow-right" aria-hidden="true"></div>

    <div class="her-card">
      <div class="her-corner-glow" aria-hidden="true"></div>

      <div class="her-layout">
        <!-- Left: copy -->
        <div class="her-copy">
          <div class="her-badge">
            <span class="her-badge-dot" aria-hidden="true"></span>
            Pioneering Excellence
          </div>
          <h2 class="her-title">
            New Jersey's Premier<br/>
            <span class="her-title-accent">LASIK Destination</span>
          </h2>
          <p class="her-body">
            Marano Eye Care stands as the benchmark for vision correction in the region.
            <span class="her-em">Dr. Marano was one of the first LASIK surgeons in New Jersey</span>,
            helping introduce the procedure when it first reached the state. With over three decades of
            specialized expertise, he offers a level of precision and experience that is unmatched —
            ensuring your journey to clear vision is in the most capable hands.
          </p>
        </div>

        <!-- Right: stats -->
        <div class="her-stats">
          <div class="her-stat">
            <span class="her-stat-val">30+</span>
            <span class="her-stat-lbl">Years of Experience</span>
          </div>
          <div class="her-divider" aria-hidden="true"></div>
          <div class="her-stat">
            <span class="her-stat-val">Pioneer</span>
            <span class="her-stat-lbl">In New Jersey</span>
          </div>
          <div class="her-divider" aria-hidden="true"></div>
          <div class="her-stat">
            <span class="her-stat-val">15×</span>
            <span class="her-stat-lbl">Top Doctor Award</span>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

// ─── 3. Injection script ──────────────────────────────────────────────────────
const cleanScript = `
    <script id="heritage-logic">
      (function() {
        function injectHeritage() {
          if (document.getElementById('heritage-section')) return;

          // Find the hero: prefer #hero id, then h1 with known text
          let heroSection = document.getElementById('hero');

          if (!heroSection) {
            const heroHeading = Array.from(document.querySelectorAll('h1')).find(el =>
              el.textContent.includes('Absolute Clarity') || el.textContent.includes('Experience the world')
            );
            if (heroHeading) {
              // Walk up: prefer section/header, then the direct child of body/#root
              heroSection = heroHeading.closest('section')
                || heroHeading.closest('header')
                || heroHeading.closest('.hero');

              if (!heroSection) {
                let el = heroHeading.parentElement;
                while (el) {
                  const parent = el.parentElement;
                  if (!parent || parent === document.body || parent.id === 'root' || parent.tagName === 'MAIN') {
                    heroSection = el;
                    break;
                  }
                  el = parent;
                }
              }
            }
          }

          if (heroSection) {
            const section = document.createElement('section');
            section.id = 'heritage-section';
            section.innerHTML = \`${heritageSectionHTML}\`;
            heroSection.insertAdjacentElement('afterend', section);

            requestAnimationFrame(() => {
              setTimeout(() => section.classList.add('visible'), 80);
            });
          }
        }

        // MutationObserver for React re-renders
        const observer = new MutationObserver((mutations) => {
          for (const m of mutations) {
            if (m.type === 'childList' && m.addedNodes.length > 0) {
              if (!document.getElementById('heritage-section')) {
                injectHeritage();
              }
              break;
            }
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });

        // Immediate + periodic fallback
        injectHeritage();
        setInterval(injectHeritage, 2000);
        window.addEventListener('popstate', injectHeritage);
      })();
    </script>`;

// ─── 4. Write to index.html ───────────────────────────────────────────────────

// Replace the existing <style id="her-styles"> or the first <style> block in <head>
// that contains our heritage CSS (if it exists from a previous run)
const oldStyleId = '<style id="her-styles">';
const oldStyleEnd = content.indexOf('</style>', content.indexOf(oldStyleId));
if (content.includes(oldStyleId) && oldStyleEnd !== -1) {
  content = content.substring(0, content.indexOf(oldStyleId)) + content.substring(oldStyleEnd + 8);
}

// Also remove old unnamed <style> that contains heritage CSS (from old runs)
const oldStyle = '<style>\r\n      @import url';
const oldStyleEndIdx = content.indexOf('</style>', content.indexOf(oldStyle));
if (content.includes(oldStyle) && oldStyleEndIdx !== -1) {
  content = content.substring(0, content.indexOf(oldStyle)) + content.substring(oldStyleEndIdx + 8);
}

// Insert our new style block just before </head>
const headEnd = content.indexOf('</head>');
if (headEnd !== -1) {
  content = content.substring(0, headEnd) + heritageCSS + '\n  ' + content.substring(headEnd);
}

// Replace the post-root script block
const rootDiv = '<div id="root"></div>';
const rootIndex = content.lastIndexOf(rootDiv);
if (rootIndex === -1) {
  console.error('Could not find #root div');
  process.exit(1);
}

const beforeRoot = content.substring(0, rootIndex + rootDiv.length);
let finalContent = beforeRoot + '\n' + cleanScript + '\n  </body></html>';

// Change candidacy age requirement
finalContent = finalContent.replace(
  'Are you 18 years of age or older?',
  'Are you 25 years of age or older?'
);

fs.writeFileSync(filePath, finalContent);
console.log('✓ index.html patched — heritage section redesigned and candidacy age updated');

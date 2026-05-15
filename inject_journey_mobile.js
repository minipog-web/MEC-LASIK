const fs = require('fs');
const filePath = 'index.html';
let content = fs.readFileSync(filePath, 'utf8');

// CSS: target the step nav container by giving it a special class (injected via JS)
// and override the global column-collapse for it
const mobileCSS = `
    <style id="journey-mobile-styles">
      /* ── LASIK Journey Section – Mobile Optimizations ─────────────────────── */

      /* Step nav: keep it horizontal (override global display:flex -> column) */
      .journey-step-nav,
      .journey-step-nav.journey-step-nav {
        display: flex !important;
        flex-direction: row !important;
        flex-wrap: nowrap !important;
        align-items: center !important;
        justify-content: space-between !important;
        grid-template-columns: unset !important;
      }

      /* Step nav circles: undo width:100%, min-height:48px from global override */
      button[aria-label^="Go to step"] {
        width: 36px !important;
        height: 36px !important;
        min-width: 36px !important;
        min-height: 36px !important;
        max-width: 36px !important;
        max-height: 36px !important;
        margin-bottom: 0 !important;
        flex: 0 0 36px !important;
        border-radius: 50% !important;
        padding: 0 !important;
        box-sizing: border-box !important;
        align-self: center !important;
      }

      @media (max-width: 768px) {

        /* Single-column step content grid */
        .responsive-grid {
          grid-template-columns: 1fr !important;
          gap: 20px !important;
        }

        /* Text FIRST, image SECOND */
        .responsive-grid > .animate-fade-in:first-child {
          order: 2 !important;
        }
        .responsive-grid > .animate-fade-in:last-child {
          order: 1 !important;
        }

        /* Cap step image height — must see it in one viewport */
        .step-image-container {
          max-height: 220px !important;
          overflow: hidden !important;
          border-radius: 14px !important;
        }
        .step-image-container img {
          width: 100% !important;
          height: 220px !important;
          object-fit: cover !important;
          object-position: center top !important;
        }

        /* Tighten glass-panel */
        .glass-panel {
          padding: 20px 14px !important;
          gap: 24px !important;
        }

        /* Prev/Next navigation — keep auto width */
        .glass-panel button:not([aria-label^="Go to step"]) {
          width: auto !important;
          min-width: 44px !important;
          min-height: 44px !important;
        }
      }

      @media (max-width: 400px) {
        .step-image-container,
        .step-image-container img {
          max-height: 180px !important;
          height: 180px !important;
        }
        button[aria-label^="Go to step"] {
          width: 30px !important;
          height: 30px !important;
          min-width: 30px !important;
          max-width: 30px !important;
          flex: 0 0 30px !important;
        }
      }
    </style>`;

// JS injection: add .journey-step-nav class to the step nav container
const navClassScript = `
    <script id="journey-nav-class">
      (function() {
        function fixStepNav() {
          // Find the step nav container: parent of the "Go to step 1" button
          const btn = document.querySelector('button[aria-label="Go to step 1"]');
          if (btn && btn.parentElement && !btn.parentElement.classList.contains('journey-step-nav')) {
            btn.parentElement.classList.add('journey-step-nav');
          }
        }
        // Run now and on each React re-render
        fixStepNav();
        setInterval(fixStepNav, 1000);
        const obs = new MutationObserver(fixStepNav);
        obs.observe(document.body, { childList: true, subtree: true });
      })();
    </script>`;

// Remove previous versions
content = content.replace(/<style id="journey-mobile-styles">[\s\S]*?<\/style>/g, '');
content = content.replace(/<script id="journey-nav-class">[\s\S]*?<\/script>/g, '');

// Insert CSS before </head>
const headEnd = content.indexOf('</head>');
if (headEnd !== -1) {
  content = content.substring(0, headEnd) + mobileCSS + '\n  ' + content.substring(headEnd);
}

// Insert JS before </body>
const bodyEnd = content.lastIndexOf('</body>');
if (bodyEnd !== -1) {
  content = content.substring(0, bodyEnd) + '\n' + navClassScript + '\n  ' + content.substring(bodyEnd);
}

fs.writeFileSync(filePath, content);
console.log('✓ index.html patched — LASIK Journey mobile fix v4 (class-based step nav)');

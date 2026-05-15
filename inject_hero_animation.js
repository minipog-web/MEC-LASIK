const fs = require('fs');
const filePath = 'c:\\Users\\adamp\\Downloads\\LASIK-App\\index.html';
let content = fs.readFileSync(filePath, 'utf8');

const heroAnimationCSS = `
    <style id="hero-animation-styles">
      /* ── Premium Ken Burns Hero Background ─────────────────────── */
      #hero-anim-wrapper {
        position: absolute;
        overflow: hidden;
        pointer-events: none;
        z-index: 0; /* Behind content */
        background-color: #0a0f16;
      }

      .hero-section-enhanced {
        background-color: transparent !important;
        background-image: none !important;
        position: relative;
        z-index: 1; /* Above background wrapper */
      }

      .hero-bg-image {
        position: absolute;
        top: -5%; 
        left: -5%; 
        right: -5%; 
        bottom: -5%;
        background-image: url('./laser-eye-bg.jpg');
        background-size: cover;
        background-position: center 30%;
        /* Subtle slow zoom effect */
        animation: kenBurnsZoom 40s ease-in-out infinite alternate;
        z-index: 0;
      }

      .hero-bg-overlay {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        /* Rich dark gradient to ensure hero text pops and matches brand */
        background: linear-gradient(135deg, rgba(10, 15, 22, 0.95) 0%, rgba(14, 165, 233, 0.1) 40%, rgba(10, 15, 22, 0.85) 100%);
        z-index: 1;
      }

      @keyframes kenBurnsZoom {
        0% { transform: scale(1) translate(0, 0); }
        100% { transform: scale(1.08) translate(-1%, 1%); }
      }
    </style>`;

const heroAnimationHTML = `
  <div id="hero-anim-wrapper">
    <div class="hero-bg-image"></div>
    <div class="hero-bg-overlay"></div>
  </div>
`;

const injectionScript = `
    <script id="hero-animation-logic">
      (function() {
        let animWrapper = null;
        let heroRef = null;

        function injectHeroAnimation() {
          let heroSection = document.getElementById('hero');

          if (!heroSection) {
            const heroHeading = Array.from(document.querySelectorAll('h1')).find(el =>
              el.textContent.includes('Absolute Clarity') || el.textContent.includes('Experience the world')
            );
            if (heroHeading) {
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
            heroRef = heroSection;
            heroSection.classList.add('hero-section-enhanced');
            
            if (!document.getElementById('hero-anim-wrapper')) {
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = \`${heroAnimationHTML}\`;
              animWrapper = tempDiv.firstElementChild;
              document.body.appendChild(animWrapper);
            } else {
              animWrapper = document.getElementById('hero-anim-wrapper');
              // Update HTML inside the existing wrapper in case it has the old orbs
              if (!animWrapper.querySelector('.hero-bg-image')) {
                animWrapper.innerHTML = \`<div class="hero-bg-image"></div><div class="hero-bg-overlay"></div>\`;
              }
            }

            syncPosition();
          }
        }

        function syncPosition() {
          if (heroRef && animWrapper) {
            const rect = heroRef.getBoundingClientRect();
            animWrapper.style.top = (rect.top + window.scrollY) + 'px';
            animWrapper.style.left = (rect.left + window.scrollX) + 'px';
            animWrapper.style.width = rect.width + 'px';
            animWrapper.style.height = rect.height + 'px';
          }
        }

        window.addEventListener('resize', syncPosition);
        
        injectHeroAnimation();
        
        setInterval(() => {
          if (!document.getElementById('hero-anim-wrapper')) {
            injectHeroAnimation();
          } else {
            syncPosition();
          }
        }, 1000);
      })();
    </script>`;

// 1. Remove old CSS
const oldStyleId = '<style id="hero-animation-styles">';
const oldStyleEnd = content.indexOf('</style>', content.indexOf(oldStyleId));
if (content.includes(oldStyleId) && oldStyleEnd !== -1) {
  content = content.substring(0, content.indexOf(oldStyleId)) + content.substring(oldStyleEnd + 8);
}

// 2. Add new CSS
const headEnd = content.indexOf('</head>');
if (headEnd !== -1) {
  content = content.substring(0, headEnd) + heroAnimationCSS + '\\n  ' + content.substring(headEnd);
}

// 3. Remove old Logic
const oldLogicId = '<script id="hero-animation-logic">';
const oldLogicEnd = content.indexOf('</script>', content.indexOf(oldLogicId));
if (content.includes(oldLogicId) && oldLogicEnd !== -1) {
  content = content.substring(0, content.indexOf(oldLogicId)) + content.substring(oldLogicEnd + 9);
}

// 4. Remove injected HTML from inside React if present from old runs
content = content.replace(/<div id="hero-anim-wrapper">.*?<\/div>\s*<\/div>/g, '');
content = content.replace(/<div class="hero-animation-container">.*?<\/div>\s*<\/div>/g, '');

// 5. Add new Logic
const bodyEnd = content.lastIndexOf('</body>');
if (bodyEnd !== -1) {
  content = content.substring(0, bodyEnd) + '\\n' + injectionScript + '\\n  ' + content.substring(bodyEnd);
}

fs.writeFileSync(filePath, content);
console.log('✓ index.html patched — removed orbs and added premium Ken Burns image background');

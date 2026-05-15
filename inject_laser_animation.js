const fs = require('fs');
const filePath = 'index.html';
let content = fs.readFileSync(filePath, 'utf8');

const laserCSS = `
    <style id="laser-animation-styles">
      .laser-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 600px; /* Constrain to top part of hero */
        overflow: hidden;
        pointer-events: none;
        z-index: 0; 
      }

      .laser-beam {
        position: absolute;
        left: -120%;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, 
          transparent 0%, 
          rgba(14, 165, 233, 0) 30%, 
          rgba(14, 165, 233, 1) 50%, 
          rgba(14, 165, 233, 0) 70%, 
          transparent 100%
        );
        box-shadow: 0 0 25px rgba(14, 165, 233, 0.9), 0 0 50px rgba(14, 165, 233, 0.5);
        opacity: 0;
        transform: rotate(-15deg);
        filter: blur(0.5px);
        will-change: transform, left, opacity;
      }

      @keyframes laserSweep {
        0% {
          left: -120%;
          top: -20%;
          opacity: 0;
        }
        20% {
          opacity: 1;
        }
        80% {
          opacity: 1;
        }
        100% {
          left: 120%;
          top: 40%;
          opacity: 0;
        }
      }

      .laser-active {
        animation: laserSweep 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      }

      .laser-beam-alt {
        position: absolute;
        left: -120%;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, 
          transparent 0%, 
          rgba(16, 185, 129, 0) 30%, 
          rgba(16, 185, 129, 0.8) 50%, 
          rgba(16, 185, 129, 0) 70%, 
          transparent 100%
        );
        box-shadow: 0 0 15px rgba(16, 185, 129, 0.7);
        opacity: 0;
        transform: rotate(10deg);
        animation: laserSweep 7s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        animation-delay: 2.5s;
        will-change: transform, left, opacity;
      }
    </style>`;

const laserLogic = `
    <script id="laser-animation-logic">
      (function() {
        function injectLaser() {
          if (document.getElementById('laser-wrapper')) return;

          // Find the hero section by looking for the "Absolute Clarity" text
          const heroHeading = Array.from(document.querySelectorAll('h1')).find(h => 
            h.textContent.includes('Absolute Clarity')
          );
          
          let heroSection = heroHeading ? heroHeading.closest('section') : null;
          
          if (!heroSection) {
            heroSection = document.getElementById('hero') || 
                          Array.from(document.querySelectorAll('section'))[0];
          }

          if (heroSection) {
            // Ensure the container of the text is positioned relatively
            if (window.getComputedStyle(heroSection).position === 'static') {
              heroSection.style.position = 'relative';
            }

            const wrapper = document.createElement('div');
            wrapper.id = 'laser-wrapper';
            wrapper.className = 'laser-container';
            wrapper.style.zIndex = '0'; 
            wrapper.innerHTML = \`
              <div class="laser-beam laser-active"></div>
              <div class="laser-beam-alt"></div>
            \`;
            
            // Prepend so it appears behind content
            heroSection.prepend(wrapper);
            
            // Ensure content is above the laser
            Array.from(heroSection.children).forEach(child => {
               if (child.id !== 'laser-wrapper') {
                 const style = window.getComputedStyle(child);
                 if (style.position === 'static') {
                   child.style.position = 'relative';
                 }
                 // Set z-index higher than wrapper's 0
                 const currentZ = parseInt(style.zIndex);
                 if (isNaN(currentZ) || currentZ < 1) {
                   child.style.zIndex = '1';
                 }
               }
            });
          }
        }

        // Run immediately and then poll to ensure it persists through React renders
        injectLaser();
        setInterval(injectLaser, 1500);
      })();
    </script>`;

// Remove old versions
content = content.replace(/<style id="laser-animation-styles">[\s\S]*?<\/style>/g, '');
content = content.replace(/<script id="laser-animation-logic">[\s\S]*?<\/script>/g, '');

// Insert new CSS in head
const headEnd = content.indexOf('</head>');
if (headEnd !== -1) {
  content = content.substring(0, headEnd) + laserCSS + '\n  ' + content.substring(headEnd);
}

// Insert logic in body
const bodyEnd = content.lastIndexOf('</body>');
if (bodyEnd !== -1) {
  content = content.substring(0, bodyEnd) + '\n' + laserLogic + '\n  ' + content.substring(bodyEnd);
}

fs.writeFileSync(filePath, content);
console.log('✓ index.html patched — subtle laser animation added');

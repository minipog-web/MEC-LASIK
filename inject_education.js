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
      
      @media (max-width: 768px) {
        .edu-card {
          padding: 32px 24px;
          border-radius: 20px;
        }
        .edu-text {
          font-size: 16px;
        }
      }
    </style>`;

const eduHTML = `
  <div class="edu-inner">
    <div class="edu-header">
      <h2 class="edu-title">Understanding <span class="edu-title-accent">the Science of LASIK</span></h2>
    </div>
    <div class="edu-card">
      <p class="edu-text">
        LASIK (Laser Refractive Surgery) has transformed vision correction since its introduction more than 20 years ago. Instead of relying on older refractive surgical techniques, LASIK uses ultra precise, computer guided excimer lasers to gently reshape the cornea (the clear, curved front surface of the eye). By refining the corneal curvature, the procedure corrects refractive errors caused by the shape of the eye, such as nearsightedness, farsightedness, and astigmatism. The result is simple, but powerful: light enters the eye and focuses cleanly on the retina, producing crisp, sharp vision.
      </p>
      <p class="edu-text">
        Most patients achieve 20/20 vision or better, often within a day, giving them a remarkable sense of visual freedom. For people with active or demanding lifestyles—athletes, frequent travelers, swimmers, outdoor enthusiasts—being free from glasses and daily contact lenses can be life changing. LASIK allows you to move through the world without visual limitations or the constant maintenance of corrective eyewear.
      </p>
      <p class="edu-text">
        As with all parts of the body, natural aging still occurs. Around age 40–45, the internal lens gradually stiffens, leading to presbyopia or the need to use reading glasses for close-up tasks. This is a normal part of aging and happens whether you’ve had LASIK or not. Importantly, your LASIK enhanced distance vision remains clear and stable for years to come.
      </p>
      <p class="edu-text">
        If you’re ready to experience sharper vision, greater freedom, and a lifestyle without visual limitations, LASIK may be the step that transforms how you see the world.
      </p>
    </div>
  </div>
`;

const injectionScript = `
    <script id="edu-logic">
      (function() {
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

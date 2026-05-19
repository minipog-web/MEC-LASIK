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
      
      @media (max-width: 768px) {
        .marano-card {
          padding: 32px 24px;
          border-radius: 20px;
        }
        .marano-text {
          font-size: 16px;
        }
      }
    </style>`;

const maranoHTML = `
  <div class="marano-inner">
    <div class="marano-header">
      <h2 class="marano-title">Trust Your Vision to <span class="marano-title-accent">Marano Eye Care</span></h2>
    </div>
    <div class="marano-card">
      <p class="marano-text">
        At Marano Eye Care, we believe that laser vision correction is a deeply personal journey, not just a medical procedure. Under the expert guidance of Dr. Matthew Marano, our practice is built on a foundation of trust, advanced technology, and unwavering dedication to patient outcomes. We treat every patient like family, ensuring you receive the individualized care and attention you deserve from your very first visit.
      </p>
      <p class="marano-text">
        While the initial investment in LASIK may seem significant, it is a decision that often pays for itself in just a few short years. When you calculate the cumulative, lifelong costs of contact lenses, cleaning solutions, annual exams, and backup glasses, laser vision correction quickly becomes a financially savvy choice that provides decades of visual freedom.
      </p>
      <p class="marano-text">
        If you are considering the procedure, we invite you to our office for a completely pressure-free, complimentary consultation. We will take the time to comprehensively evaluate your unique eyes, answer all of your questions, and help you determine if LASIK is the right fit for your lifestyle—with absolutely no obligation to move forward until you are completely comfortable.
      </p>
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

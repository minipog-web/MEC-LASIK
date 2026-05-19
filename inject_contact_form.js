const fs = require('fs');
const filePath = 'index.html';
let content = fs.readFileSync(filePath, 'utf8');

// ─── 1. CSS ──────────────────────────────────────────────────────────────────
const contactCSS = `
    <style id="contact-styles">
      /* ── Contact Form Section ────────────────────────────────────────── */

      #contact-section {
        padding: 0 24px 72px;
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 1.1s cubic-bezier(0.22, 1, 0.36, 1),
                    transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
        font-family: "Outfit", system-ui, -apple-system, sans-serif;
        letter-spacing: 0.03em;
        word-spacing: 0.06em;
        position: relative;
        overflow: hidden;
      }

      #contact-section.visible {
        opacity: 1;
        transform: translateY(0);
      }

      .contact-inner {
        position: relative;
        max-width: 800px;
        margin: 0 auto;
        z-index: 1;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        padding-top: 60px;
      }

      .contact-card {
        background: rgba(13, 20, 30, 0.55);
        border-radius: 28px;
        padding: 52px 56px;
        box-shadow: 
          0 24px 64px -16px rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(32px) saturate(140%);
        -webkit-backdrop-filter: blur(32px) saturate(140%);
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        position: relative;
        overflow: hidden;
      }

      .contact-card::before {
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

      .contact-card:hover {
        background: rgba(13, 20, 30, 0.6);
        box-shadow: 
          0 32px 80px -20px rgba(0, 0, 0, 0.8);
      }

      .contact-card:hover::before {
        background: linear-gradient(135deg, rgba(127, 161, 214, 0.35) 0%, rgba(110, 154, 120, 0.28) 50%, rgba(167, 139, 250, 0.35) 100%);
      }

      .contact-header {
        text-align: center;
        margin-bottom: 40px;
      }

      .contact-title {
        font-size: clamp(26px, 4vw, 36px);
        font-weight: 600;
        color: #f8fafc;
        line-height: 1.15;
        letter-spacing: 0.015em;
        margin: 0 0 12px 0;
      }

      .contact-title-accent {
        background: linear-gradient(135deg, #6e9a78 0%, #7fa1d6 100%);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
      }

      .contact-body {
        font-size: 16px;
        color: #94a3b8;
        margin: 0;
      }

      /* ── Form Styles ────────────────────────────────────────── */

      .contact-form {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
        position: relative;
      }

      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
      }

      .form-label {
        font-size: 13px;
        font-weight: 600;
        color: #c8d8f0;
        letter-spacing: 0.02em;
        margin-left: 4px;
      }

      .form-input, .form-textarea {
        background: rgba(10, 15, 22, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 16px;
        font-size: 16px;
        color: #f8fafc;
        font-family: inherit;
        transition: all 0.2s ease;
        outline: none;
      }

      .form-input:focus, .form-textarea:focus {
        border-color: rgba(14, 165, 233, 0.5);
        box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
        background: rgba(10, 15, 22, 0.8);
      }

      .form-textarea {
        min-height: 120px;
        resize: vertical;
      }

      .form-submit {
        margin-top: 16px;
        background: linear-gradient(135deg, #7fa1d6 0%, #6e9a78 100%);
        color: #0a0f16;
        border: none;
        border-radius: 9999px;
        padding: 16px 32px;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 14px 0 rgba(14, 165, 233, 0.3);
      }

      .form-submit:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(14, 165, 233, 0.4);
        filter: brightness(1.1);
      }

      /* Preferred Contact Method Selection */
      .contact-method-group {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        margin-top: 4px;
      }

      .method-option {
        cursor: pointer;
        position: relative;
      }

      .method-option input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
      }

      .method-box {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        background: rgba(10, 15, 22, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        padding: 14px;
        font-size: 15px;
        font-weight: 500;
        color: #94a3b8;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        text-align: center;
      }

      .method-icon {
        width: 18px;
        height: 18px;
        opacity: 0.7;
        transition: transform 0.3s ease;
      }

      .method-option input:checked + .method-box {
        background: rgba(127, 161, 214, 0.15);
        border-color: rgba(127, 161, 214, 0.4);
        color: #f8fafc;
        box-shadow: 0 0 16px rgba(127, 161, 214, 0.1);
      }

      .method-option input:checked + .method-box .method-icon {
        opacity: 1;
        color: #7fa1d6;
        transform: scale(1.08);
      }

      .method-option:hover .method-box {
        border-color: rgba(255, 255, 255, 0.2);
        background: rgba(10, 15, 22, 0.6);
        color: #cbd5e1;
      }

      @media (max-width: 640px) {
        .contact-method-group {
          grid-template-columns: 1fr;
          gap: 12px;
        }
        .form-row {
          grid-template-columns: 1fr;
          gap: 24px;
        }
        .contact-card {
          padding: 40px 24px;
          border-radius: 20px;
        }
      }
    </style>`;

// ─── 2. HTML ──────────────────────────────────────────────────────────────────
const contactHTML = `
  <div class="contact-inner">
    <div class="contact-card">
        <div class="contact-header">
          <h2 class="contact-title">
            Take the First Step to <span class="contact-title-accent">Clear Vision</span>
          </h2>
          <p class="contact-body">
            Schedule your complimentary consultation and discover if LASIK is right for you.
          </p>
        </div>

        <form class="contact-form" name="consultation" method="POST" data-netlify="true">
          <!-- Hidden input for Netlify routing -->
          <input type="hidden" name="form-name" value="consultation" />
          
          <div class="form-group">
            <label for="name" class="form-label">Full Name</label>
            <input type="text" id="name" name="name" class="form-input" required placeholder="John Doe" />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="phone" class="form-label">Mobile Number</label>
              <input type="tel" id="phone" name="phone" class="form-input" required placeholder="(555) 000-0000" />
            </div>
            
            <div class="form-group">
              <label for="email" class="form-label">Email Address</label>
              <input type="email" id="email" name="email" class="form-input" required placeholder="john@example.com" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Preferred Contact Method</label>
            <div class="contact-method-group">
              <label class="method-option">
                <input type="radio" name="preferred_contact" value="email" checked />
                <span class="method-box">
                  <svg class="method-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  Email
                </span>
              </label>
              <label class="method-option">
                <input type="radio" name="preferred_contact" value="phone" />
                <span class="method-box">
                  <svg class="method-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  Phone Call
                </span>
              </label>
              <label class="method-option">
                <input type="radio" name="preferred_contact" value="text" />
                <span class="method-box">
                  <svg class="method-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                  Text Message
                </span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label for="message" class="form-label">Additional Information</label>
            <textarea id="message" name="message" class="form-textarea" placeholder="Tell us about your vision goals or any questions you have..."></textarea>
          </div>

          <button type="submit" class="form-submit">Request Consultation</button>
        </form>
    </div>
  </div>
`;

// ─── 3. Injection Script ──────────────────────────────────────────────────────
const injectScript = `
    <script id="contact-logic">
      (function() {
        function injectContact() {
          if (document.getElementById('contact-section')) return;

          // We want the form to be the very last section on the site
          let anchor = document.querySelector('main') || document.getElementById('root') || document.body;

          if (anchor) {
            const section = document.createElement('section');
            section.id = 'contact-section';
            section.innerHTML = \`${contactHTML}\`;
            
            // Append it as the last child of the main container
            anchor.appendChild(section);

            requestAnimationFrame(() => {
              setTimeout(() => section.classList.add('visible'), 150);
            });
          }
        }

        const observer = new MutationObserver((mutations) => {
          for (const m of mutations) {
            if (m.type === 'childList' && m.addedNodes.length > 0) {
              if (document.getElementById('heritage-section') && !document.getElementById('contact-section')) {
                injectContact();
              }
            }
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });

        // Global delegated click listener for "Schedule Free Consultation" buttons
        document.body.addEventListener('click', function(e) {
          const btn = e.target.closest('button, .btn');
          if (btn && btn.textContent.includes('Schedule Free Consultation')) {
            const formSection = document.getElementById('contact-section');
            if (formSection) {
              e.preventDefault();
              e.stopPropagation();
              formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              
              // Optional: flash the form slightly to draw attention
              const card = formSection.querySelector('.contact-card');
              if (card) {
                card.style.transition = 'box-shadow 0.3s ease';
                card.style.boxShadow = '0 0 0 4px rgba(14, 165, 233, 0.4)';
                setTimeout(() => {
                  card.style.boxShadow = '';
                }, 800);
              }
            }
          }
          
          // Click listener for Marano Eye Care Logo to navigate to main site
          const img = e.target.closest('img');
          if (img && (img.alt === 'Marano Eye Care' || img.alt === 'Marano Eye Care Logo')) {
            e.preventDefault();
            e.stopPropagation();
            window.open('https://www.maranoeyecare.com', '_blank', 'noopener,noreferrer');
          }
        }, true); // use capture phase to intercept before React if needed

        injectContact();
        setInterval(injectContact, 2000);
      })();
    </script>`;

// ─── 4. Write to index.html ───────────────────────────────────────────────────

const oldStyleId = '<style id="contact-styles">';
const oldStyleEnd = content.indexOf('</style>', content.indexOf(oldStyleId));
if (content.includes(oldStyleId) && oldStyleEnd !== -1) {
  content = content.substring(0, content.indexOf(oldStyleId)) + content.substring(oldStyleEnd + 8);
}

const headEnd = content.indexOf('</head>');
if (headEnd !== -1) {
  content = content.substring(0, headEnd) + contactCSS + '\n  ' + content.substring(headEnd);
}

const oldScriptId = '<script id="contact-logic">';
const oldScriptEnd = content.indexOf('</script>', content.indexOf(oldScriptId));
if (content.includes(oldScriptId) && oldScriptEnd !== -1) {
    content = content.substring(0, content.indexOf(oldScriptId)) + content.substring(oldScriptEnd + 9);
}

const rootDiv = '<div id="root"></div>';
const rootIndex = content.lastIndexOf(rootDiv);
if (rootIndex === -1) {
  console.error('Could not find #root div');
  process.exit(1);
}

// Ensure we insert script before the closing body
const hiddenForm = `
    <!-- A little help for Netlify bots -->
    <form name="consultation" data-netlify="true" hidden>
      <input type="text" name="name" />
      <input type="tel" name="phone" />
      <input type="email" name="email" />
      <input type="radio" name="preferred_contact" />
      <textarea name="message"></textarea>
    </form>
`;

const bodyEnd = content.lastIndexOf('</body>');
if (bodyEnd !== -1) {
    content = content.substring(0, bodyEnd) + hiddenForm + injectScript + '\n' + content.substring(bodyEnd);
}

fs.writeFileSync(filePath, content);
console.log('✓ index.html patched — contact form injected');

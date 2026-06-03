# Antigravity Design & Conversion Memory Log

This log captures successful design decisions, conversion-rate optimization (CRO) lessons, and patterns to avoid or double-down on for the Marano LASIK App.

## Aesthetic & Visual Design
- **High Contrast and Vibrancy:** Avoid flat, low-contrast, or monochromatic color themes (like sage green and cornflower blue with low light values). Double down on high-luminance primary surgical colors like electric cyan (`#00f0ff`), deep ultraviolet (`#8b5cf6`), and high-pop neon warning flags (`#fbbf24`, `#f43f5e`).
- **Cyberpunk Professionalism:** A tech-heavy HUD feels expensive and precise. Utilize subtle grid line backgrounds, interactive radar waves, glowing laser indicators, and monospace telemetry fonts for small text.
- **Micro-Animations:** Use CSS animations (pulsing reticles, scanning lasers, sliding telemetry indicators) to make the UI feel responsive, alive, and hardware-accelerated.
- **Preventing Hover Clipping in Tab Containers:** When styling interactive buttons inside tab selectors that use `overflow-x: auto` (commonly for mobile scrollable tab rows), ensure you provide adequate top/bottom padding (e.g., `padding-top: 10px`) on the container. This prevents the button's translation effects (`translateY(-2px)`) and hover glow shadows (`box-shadow`) from being clipped by the parent element's overflow boundaries.
- **Prominent Logo Sizing & Responsive Transitions:** To ensure brand prominence on page load, use a class like `.nav-logo` to scale the logo (e.g., `62px` on desktop, `48px` on mobile) inside a taller initial header (e.g., `96px`). Transition the logo size smoothly to a compact height (e.g., `42px` on desktop, `38px` on mobile) as the user scrolls, matching the navbar container transition. Avoid hardcoded inline style constraints for heights to remain responsive.
- **Centering Grid-Based Trust Cards:** When displaying key metrics or trust signals in a fixed-width grid (e.g., four boxes), a row layout (icon on left, text on right) with left-aligned text causes visual imbalance because texts of varying lengths shift the content center-point differently. Using a vertical column layout (`flex-direction: column; align-items: center; text-align: center;`) keeps the elements perfectly centered and visually balanced on all screen sizes.
- **Inertia Spring Transitions:** Replace standard linear/ease transitions with custom inertia spring curves (`700ms cubic-bezier(0.16, 1, 0.3, 1)`) for premium, clinically precise clinical interfaces.
- **Blurred Scroll Entrances:** Rather than using simple scrolling fade-ins, structure all scroll entrances to fade and slide up from an invisible box (`translate-y-12 blur-sm opacity-0` resolving smoothly to `translate-y-0 blur-0 opacity-100` over `800ms`).
- **Ethereal Glass (OLED Luxury) Archetype:** Build ultra-premium pages on a deepest OLED black canvas (`#050505`) with highly diffused, low-luminance deep violet and emerald radial ambient gradients. Card structures (`.glass-panel`) are stylized as "Vantablack plates" using heavy `backdrop-blur-2xl` and ultra-fine white hairlines (`rgba(255, 255, 255, 0.06)`) instead of colored or solid borders.
- **Macro-Whitespace & Floating Luxury Badges:** Allow content to breathe by using vertical section paddings between `112px` and `144px` (`py-28` to `py-36`). Precede section headings with microscopic floating eyebrow tags (`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] font-semibold bg-white/5 border border-white/10 text-white/70`) to convey institutional authority and aesthetic precision.

## Conversion Psychology & CRO
- **Urgency & Scarcity:** Direct visual indicators of limited capacity (e.g., live countdowns of priority slots remaining this week) drive immediate action.
- **Friction Reduction:** Long monolithic forms cause cognitive overload. Breaking down booking into multi-step interactive micro-actions (Location -> Time -> Contact) maintains visual momentum.
- **Trust Seals & Authority:** Build confidence by grouping authority claims (board certification, 15x Top Doctor, 10,000+ surgeries) alongside active interactive modules.
- **Lifetime Value Visualized:** Cost is the main objection. Direct sliders showing long-term eyewear costs vs a one-time LASIK investment highlight high return-on-investment (ROI).

## Medical & Scientific Visualizations
- **What Worked:** 
  - Using an anatomically correct eyeball ratio (~5/6ths diameter sclera circle/ellipse arc, and ~50-60% height cornea dome centered on the pupil aperture) instead of a simple almond-shape lens.
  - Positioning the crystalline lens and iris elements relative to the limbus boundary to establish biological credibility.
  - Mapping light ray refraction dynamically to the cornea surface using quadratic bezier math, rather than a fixed arbitrary refracting plane.
  - Translating pixel dimensions to true clinical readouts (e.g. `24.0 mm` focal length and `mm` blur circles) to elevate the professional quality.
- **What to Avoid:**
  - Simple full-height cornea arcs that look like an oversized lens bubble and lack anatomical credibility.
  - Static refraction lines that do not align with the cornea apex or morphing eyeball shapes.
  - **Dynamic Eyeball Shape Morphing During Reshaping:** Do NOT stretch or compress the eyeball length during the laser ablation simulation, since the physical axial length of the adult eye is fixed. Only the corneal curvature should alter dynamically.
  - **Single Laser Beam for Hyperopia:** Hyperopic laser correction does not flatten the center; it targets the peripheral ring. Simulate this with dual excimer scanning laser beams targeting the outer corneal margins to steepen the center.
  - **4-Segment Cornea Modeling for Peripheral Ablation Grooving:** A single-segment cornea path cannot represent localized peripheral notches. Modeling the hyperopic cornea using a 4-segment quadratic Bezier path allows representing growing peripheral grooves during active laser firing (complete with high-frequency ablation flicker) and permanent flattened post-op shoulders with a steepened central dome.
  - **Parametric Intersection Math:** Segmented paths require mapping ray-tracing and laser coordinates to the specific parametric Bezier equations of the active segments, aligning the visual beams and refracted rays with the dynamic surface.

## Responsive & Mobile Optimization
- **Avoid Inline Styles for Layouts:** Avoid setting display, flex-direction, or grid-template-columns inline in React style props. Inline styles override CSS stylesheet media queries. Let stylesheet classes control the responsiveness.
- **Form Component Collapsing:** Ensure that option selectors (e.g. clinic locations, contact methods) collapse into single-column vertical stacks on mobile viewports to provide finger-friendly tap targets.
- **Anatomy & Visual Containment:** Stack interactive graphs and visual terminals vertically (e.g. eye anatomy simulator on top, visual acuity Snellen chart on bottom) on mobile to preserve layout aspect ratios.
- **Horizontal Scroll for Tabs:** Instead of hiding tab controls on mobile, allow horizontal overflow-x scrolling to preserve full interactivity while keeping the layout contained.
- **Side-by-Side Simulator Containment:** On mobile viewports, keep small complementary elements (like the eye anatomy SVG and visual acuity chart) side-by-side rather than stacking them vertically. Stacking these elements causes huge vertical expansion, pushing content below the fold. Keep them side-by-side with a slightly adjusted grid (e.g. `1.15fr 0.85fr`) and small gaps (`8px`) to conserve vertical space.
- **In-Context Mobile Navigation:** In multi-step wizards or simulators, provide easy local step controllers (like Next/Prev Stage buttons) right near the active description text on mobile. This prevents the "ping-pong scroll" effect where users must scroll all the way back to the top of the section to click the next step dot.
- **Progressive Disclosure for Telemetry:** For complex technical or scientific visualizations, hide heavy academic details, objectives, or formulas behind an elegant dashed neon toggle button on mobile. This keeps the initial layout clean and readable while allowing interested users to expand details dynamically without leaving the viewport context.

## Timeline and Stage Expansion
- **Dynamic Timeline Scaling:** When expanding multi-stage processes (e.g. from 5 to 6 steps), update the progress slider map boundaries (progressVal thresholds) and use dynamic timeline calculations (e.g. index === 5 ? 95 : index * 18 + 5) to align clicks exactly with step boundaries.
- **Stage Counters:** Avoid hardcoding total stage counts (e.g. Stage X of 5). Use dynamic length lookups like Stage {steps[activeStep].id} of {steps.length} to remain resilient to content changes.

## Layout Stability & Navigation Jumps
- **Stable Minimum Heights for Dynamic Columns:** When a multi-stage component renders cards of variable sizes (such as descriptions or warning labels that toggle dynamically), declare a stable `min-height` on the container column for desktop viewports. This prevents layout shifts and scroll clamping which cause the browser viewport to jump to the top or bottom of the page during interactions.
- **Defensive Button Tagging:** Always explicitly declare `type="button"` on all interactive markup buttons inside sliders or timelines. If omitted, some browsers default to treating buttons as form submissions, which triggers page reloads or jumps.
- **Global Keyboard Focus Compliance:** When resetting browser default button outlines globally with `outline: none`, ensure that a high-contrast focus alternative (e.g. `:focus-visible` outline ring with custom neon offset and glowing box-shadow) is declared to support screen-reader and keyboard accessibility.

## Combined Layout Bento Grid & Persistent Contact
- **Side-by-Side Bento Grid for Conversions:** Placing emotional headlines, trust signals, and direct call channels next to a multi-stage interactive wizard card creates a visual association that builds immediate user confidence.
- **Persistent Left-Column Context on Submission:** Transitioning the form card to a success state while keeping the emotional copy and telephone block fully interactive on the left ensures patients can still access the phone number if they prefer direct clinic contact.
- **React-Netlify Wizard Form Sync:** When building multi-step AJAX-submitted forms, maintain hidden input fields within the active form container for all wizard states to ensure forms processors (like Netlify) capture all parameters accurately.

## Deployment Rules & Safeguards
- **Strict Verification Protocol:** Never trigger a remote deployment (to Netlify, Vercel, or production environments) automatically or based on historical next-steps. Always verify all UI changes in a local dev server environment, present screenshots to the user, and wait for an explicit user command stating "Deploy to production/Netlify" before executing.

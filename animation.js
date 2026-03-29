/* animation.js
   Sequence (triggered by first click):
     1. Click  → titles fade, spin starts (circle logo, accelerating)
     2. Mid-spin → at peak speed, circle logo crossfades INTO shield logo (both spinning)
     3. Decelerate → shield logo slows and snaps to exactly 0° (upright)
     4. 1 second pause stationary
     5. Single pulse animation
     6. Auto-fade to the member board
   
   Second click at any point skips straight to the board.
*/

(function () {

  const ACCEL_DURATION  = 1.6;   // s: time to reach max speed
  const MAX_SPEED       = 1800;  // deg/s at peak
  const COAST_DURATION  = 0.6;   // s: spin at full speed before crossfade
  const SWAP_DURATION   = 0.45;  // s: crossfade duration (both spinning)
  const DECEL_DURATION  = 1.2;   // s: decelerate to 0°
  const SETTLE_PAUSE    = 1000;  // ms: stationary pause before pulse
  const PULSE_CSS_MS    = 700;   // ms: matches CSS @keyframes pulse duration
  const POST_PULSE_MS   = 500;   // ms: after pulse before fade to board

  const layer      = document.getElementById('zofingia-layer');
  const caLayer    = document.getElementById('ca-layer');
  const logoA      = document.getElementById('shieldImg');   // starts visible: circle logo
  const logoB      = document.getElementById('circleImg');   // hidden: shield logo
  const titleEl    = document.getElementById('intro-title');
  const hintEl     = document.getElementById('hint');
  const replayBtn  = document.getElementById('replayBtn');

  let phase          = 'idle';   // idle → accel → coast → swap → decel → settle → pulse → done
  let animStart      = null;
  let coastStart     = null;
  let swapStart      = null;
  let decelStart     = null;
  let angleAtCoast   = 0;
  let angleAtSwap    = 0;
  let angleAtDecel   = 0;
  let decelTarget    = 0;
  let rafId          = null;
  let hasStarted     = false;
  let done           = false;

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  /* Snap angle to nearest full rotation (0° equivalent) */
  function snapToUpright(angle) {
    return Math.round(angle / 360) * 360;
  }

  /* Set both logos to same rotation */
  function setAngle(angle) {
    logoA.style.transform = `rotate(${angle}deg)`;
    logoB.style.transform = `rotate(${angle}deg)`;
  }

  /* ── Reveal the member board ── */
  function revealBoard() {
    if (done) return;
    done = true;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    replayBtn.classList.remove('visible');
    layer.classList.add('fade-out');
    caLayer.classList.add('fade-in');
    layer.addEventListener('transitionend', () => {
      if (layer.parentNode) layer.parentNode.removeChild(layer);
    }, { once: true });
  }

  /* ── Reset for replay ── */
  function reset() {
    done       = false;
    hasStarted = false;
    phase      = 'idle';
    animStart  = null;

    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }

    logoA.style.transform = 'rotate(0deg)';
    logoA.style.opacity   = '1';
    logoB.style.transform = 'rotate(0deg)';
    logoB.style.opacity   = '0';
    logoB.classList.remove('pulsing');

    titleEl.classList.remove('hidden');
    hintEl.classList.remove('hidden');
    replayBtn.classList.remove('visible');

    if (!layer.parentNode) {
      document.body.prepend(layer);
      caLayer.classList.remove('fade-in');
    }
    layer.classList.remove('fade-out');
  }

  /* ── Main animation loop ── */
  function startSpin() {
    hasStarted = true;
    phase      = 'accel';
    animStart  = performance.now() / 1000;

    titleEl.classList.add('hidden');
    hintEl.classList.add('hidden');

    function frame(nowMs) {
      const t       = nowMs / 1000;
      const elapsed = t - animStart;

      /* ── 1. ACCELERATE ── */
      if (phase === 'accel') {
        const p     = Math.min(elapsed / ACCEL_DURATION, 1);
        // easeInQuad integral: angle = MAX_SPEED * t² / (2 * ACCEL_DURATION)
        const angle = -(MAX_SPEED * (elapsed ** 2) / (2 * ACCEL_DURATION));
        setAngle(angle);
        logoA.style.opacity = '1';
        logoB.style.opacity = '0';

        if (p >= 1) {
          phase        = 'coast';
          coastStart   = t;
          angleAtCoast = angle;
        }
      }

      /* ── 2. COAST (full speed, logoA visible) ── */
      if (phase === 'coast') {
        const ct    = t - coastStart;
        const angle = angleAtCoast - MAX_SPEED * ct;
        setAngle(angle);
        logoA.style.opacity = '1';
        logoB.style.opacity = '0';

        if (ct >= COAST_DURATION) {
          phase        = 'swap';
          swapStart    = t;
          angleAtSwap  = angle;
        }
      }

      /* ── 3. SWAP logos mid-spin (crossfade while both rotating) ── */
      if (phase === 'swap') {
        const st    = t - swapStart;
        const ft    = Math.min(st / SWAP_DURATION, 1);
        const angle = angleAtSwap - MAX_SPEED * st;
        setAngle(angle);
        logoA.style.opacity = String(1 - ft);
        logoB.style.opacity = String(ft);

        if (ft >= 1) {
          logoA.style.opacity = '0';
          logoB.style.opacity = '1';
          phase           = 'decel';
          decelStart      = t;
          angleAtDecel    = angle;

          // Where will we land after easing out?
          // easeOutCubic covers ~half the linear distance → MAX_SPEED * DECEL_DURATION * 0.5
          const dist   = MAX_SPEED * DECEL_DURATION * 0.5;
          const raw    = angleAtDecel - dist;
          decelTarget  = snapToUpright(raw);
        }
      }

      /* ── 4. DECELERATE to 0° ── */
      if (phase === 'decel') {
        const dt    = Math.min((t - decelStart) / DECEL_DURATION, 1);
        const angle = angleAtDecel + (decelTarget - angleAtDecel) * easeOutCubic(dt);
        logoB.style.transform = `rotate(${angle}deg)`;

        if (dt >= 1) {
          logoB.style.transform = 'rotate(0deg)';
          phase = 'settle';
          rafId = null;

          /* ── 5. SETTLE pause, then pulse, then reveal ── */
          setTimeout(() => {
            logoB.classList.remove('pulsing');
            void logoB.offsetWidth;            // force reflow
            logoB.classList.add('pulsing');
            replayBtn.classList.add('visible');

            setTimeout(revealBoard, PULSE_CSS_MS + POST_PULSE_MS);
          }, SETTLE_PAUSE);

          return; // exit RAF loop
        }
      }

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);
  }

  /* ── Click handler ── */
  layer.addEventListener('click', () => {
    if (done) return;

    if (!hasStarted) {
      // First click: start the spin
      startSpin();
    } else {
      // Any subsequent click: skip to board
      revealBoard();
    }
  });

  /* ── Replay button ── */
  replayBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    reset();
  });

  /* Page loads: show title + hint, wait for click */

})();

/* animation.js — Fully automatic intro sequence
   Timeline:
     0.0s  — page loads, title + hint visible, circle logo shown
     1.6s  — spin starts automatically (title fades)
     ~4.2s — spin ends at exact 0° (horizontal), crossfade to shield logo begins
     ~4.7s — shield logo fully visible and stationary
     ~5.7s — 1 second pause, then pulse fires once
     ~6.4s — pulse done, auto-fade to the board

   Click anywhere after spin starts = skip to board immediately.
*/

(function () {

  const INITIAL_PAUSE    = 1600;   // ms before spin starts
  const ACCEL_DURATION   = 1.8;    // s accelerating
  const MAX_SPEED        = 1800;   // deg/s at peak
  const COAST_DURATION   = 0.8;    // s spinning at max speed
  const DECEL_DURATION   = 1.1;    // s decelerating to exact 0°
  const FADE_DURATION    = 0.5;    // s crossfade from circle → shield
  const SETTLE_PAUSE     = 1000;   // ms stationary before pulse
  const PULSE_DURATION   = 700;    // ms (matches CSS animation)
  const POST_PULSE_WAIT  = 500;    // ms after pulse before fade to board

  const layer      = document.getElementById('zofingia-layer');
  const caLayer    = document.getElementById('ca-layer');
  const shieldImg  = document.getElementById('shieldImg');   // circle logo (spins)
  const circleImg  = document.getElementById('circleImg');   // shield logo (revealed)
  const titleEl    = document.getElementById('intro-title');
  const hintEl     = document.getElementById('hint');
  const replayBtn  = document.getElementById('replayBtn');

  let phase           = 'waiting';
  let animStart       = null;
  let coastStart      = null;
  let decelStart      = null;
  let decelFromAngle  = 0;
  let decelFromSpeed  = 0;
  let rafId           = null;
  let skipAllowed     = false;
  let done            = false;

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  /* ── Snap angle to nearest 0° (mod 360) ── */
  function nearestZero(angle) {
    return Math.round(angle / 360) * 360;
  }

  /* ── Fade intro layer, reveal board ── */
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
    done        = false;
    skipAllowed = false;
    phase       = 'waiting';
    animStart   = null;

    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }

    shieldImg.style.transform = 'rotate(0deg)';
    shieldImg.style.opacity   = '1';
    circleImg.style.transform = 'rotate(0deg)';
    circleImg.style.opacity   = '0';
    circleImg.classList.remove('pulsing');

    titleEl.classList.remove('hidden');
    hintEl.classList.remove('hidden');
    replayBtn.classList.remove('visible');

    if (!layer.parentNode) {
      document.body.prepend(layer);
      caLayer.classList.remove('fade-in');
    }
    layer.classList.remove('fade-out');
    startAfterPause();
  }

  /* ── Main RAF loop ── */
  function runAnimation() {
    phase       = 'accel';
    animStart   = performance.now() / 1000;
    skipAllowed = true;
    titleEl.classList.add('hidden');
    hintEl.classList.add('hidden');

    function frame(nowMs) {
      const t       = nowMs / 1000;
      const elapsed = t - animStart;

      /* 1. Accelerate */
      if (phase === 'accel') {
        const p     = Math.min(elapsed / ACCEL_DURATION, 1);
        // integrate easeInQuad: angle = MAX_SPEED * t²/(2*ACCEL_DURATION)
        const angle = -(MAX_SPEED * (elapsed ** 2) / (2 * ACCEL_DURATION));
        shieldImg.style.transform = `rotate(${angle}deg)`;

        if (p >= 1) {
          phase       = 'coast';
          coastStart  = t;
          decelFromAngle = angle;
        }
      }

      /* 2. Coast at max speed */
      if (phase === 'coast') {
        const ct    = t - coastStart;
        const angle = decelFromAngle - MAX_SPEED * ct;
        shieldImg.style.transform = `rotate(${angle}deg)`;

        if (ct >= COAST_DURATION) {
          phase          = 'decel';
          decelStart     = t;
          decelFromAngle = angle;
          decelFromSpeed = MAX_SPEED;
          // Calculate target: nearest multiple of 360 reachable in DECEL_DURATION
          // distance covered during ease-out decel = speed * duration * 0.5
          const coasted   = MAX_SPEED * DECEL_DURATION * 0.5;
          const rawTarget = decelFromAngle - coasted;
          // snap to nearest 0° so logo lands upright
          decelTarget     = nearestZero(rawTarget);
        }
      }

      /* 3. Decelerate to exact 0° */
      if (phase === 'decel') {
        const dt    = Math.min((t - decelStart) / DECEL_DURATION, 1);
        const angle = decelFromAngle + (decelTarget - decelFromAngle) * easeOutCubic(dt);
        shieldImg.style.transform = `rotate(${angle}deg)`;

        if (dt >= 1) {
          // Lock to 0° exactly
          shieldImg.style.transform = 'rotate(0deg)';
          phase = 'crossfade';
          const cfStart = t;

          /* 4. Crossfade: circle logo (spun) fades out, shield logo fades in */
          function crossfadeFrame(nowMs2) {
            const ft = Math.min((nowMs2 / 1000 - cfStart) / FADE_DURATION, 1);
            shieldImg.style.opacity = String(1 - ft);
            circleImg.style.opacity = String(ft);

            if (ft < 1) {
              rafId = requestAnimationFrame(crossfadeFrame);
            } else {
              /* 5. Settled — wait 1s, then pulse, then reveal board */
              shieldImg.style.opacity = '0';
              circleImg.style.opacity = '1';
              rafId = null;

              setTimeout(() => {
                // pulse
                circleImg.classList.remove('pulsing');
                void circleImg.offsetWidth;
                circleImg.classList.add('pulsing');
                replayBtn.classList.add('visible');

                setTimeout(revealBoard, PULSE_DURATION + POST_PULSE_WAIT);
              }, SETTLE_PAUSE);
            }
          }
          rafId = requestAnimationFrame(crossfadeFrame);
          return; // exit main frame loop
        }
      }

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);
  }

  let decelTarget = 0; // set during coast→decel transition

  function startAfterPause() {
    setTimeout(runAnimation, INITIAL_PAUSE);
  }

  /* Skip on click */
  layer.addEventListener('click', () => {
    if (skipAllowed && !done) revealBoard();
  });

  /* Replay */
  replayBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    reset();
  });

  startAfterPause();

})();

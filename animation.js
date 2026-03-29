/* animation.js — Fully automatic intro sequence
   Timeline (all automatic, no click needed to advance):
     0.0s  — page loads, title + hint visible, logo shown
     1.4s  — animation starts automatically
     ~2.3s — spin complete, crossfade shield → circle logo
     ~2.9s — circle logo fully visible, deceleration begins
     ~3.4s — logo settled, pulse animation fires once
     ~4.5s — pulse done, auto-fade to the board

   The "Replay" button re-runs the whole sequence.
   Clicking anywhere during the animation skips ahead to the board.
*/

(function () {

  const INITIAL_PAUSE   = 1400;  // ms to show title before animation starts
  const ACCEL_DURATION  = 0.85;  // s to reach max spin speed
  const MAX_SPEED       = 1440;  // deg/s at peak
  const FADE_DURATION   = 0.32;  // s for shield→circle crossfade
  const DECEL_DURATION  = 0.55;  // s to slow down after crossfade
  const PULSE_WAIT      = 180;   // ms pause before pulse
  const POST_PULSE_WAIT = 900;   // ms after pulse before fading to board

  const layer      = document.getElementById('zofingia-layer');
  const caLayer    = document.getElementById('ca-layer');
  const shieldImg  = document.getElementById('shieldImg');
  const circleImg  = document.getElementById('circleImg');
  const titleEl    = document.getElementById('intro-title');
  const hintEl     = document.getElementById('hint');
  const replayBtn  = document.getElementById('replayBtn');

  let phase           = 'waiting';
  let animStart       = null;
  let crossfadeStart  = null;
  let decelStart      = null;
  let decelStartAngle = 0;
  let rafId           = null;
  let skipAllowed     = false;
  let done            = false;

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  /* ── Fade intro layer out, reveal board ── */
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

  /* ── Full reset for replay ── */
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

  /* ── Main animation loop ── */
  function runAnimation() {
    phase       = 'accel';
    animStart   = performance.now() / 1000;
    skipAllowed = true;
    titleEl.classList.add('hidden');
    hintEl.classList.add('hidden');

    function frame(now) {
      const t       = now / 1000;
      const elapsed = t - animStart;

      /* Accelerate */
      if (phase === 'accel') {
        const p     = Math.min(elapsed / ACCEL_DURATION, 1);
        const angle = -((MAX_SPEED / (ACCEL_DURATION ** 2)) * (elapsed ** 3) / 3);
        shieldImg.style.transform = `rotate(${angle}deg)`;
        shieldImg.style.opacity   = '1';
        circleImg.style.transform = `rotate(${angle}deg)`;
        circleImg.style.opacity   = '0';

        if (p >= 1) {
          phase           = 'crossfade';
          crossfadeStart  = t;
          decelStartAngle = angle;
        }
      }

      /* Crossfade shield → circle */
      if (phase === 'crossfade') {
        const ft    = Math.min((t - crossfadeStart) / FADE_DURATION, 1);
        const angle = decelStartAngle - MAX_SPEED * (t - crossfadeStart);
        shieldImg.style.transform = `rotate(${angle}deg)`;
        shieldImg.style.opacity   = String(1 - ft);
        circleImg.style.transform = `rotate(${angle}deg)`;
        circleImg.style.opacity   = String(ft);

        if (ft >= 1) {
          phase           = 'decel';
          decelStart      = t;
          decelStartAngle = angle;
        }
      }

      /* Decelerate */
      if (phase === 'decel') {
        const dt    = Math.min((t - decelStart) / DECEL_DURATION, 1);
        const angle = decelStartAngle - MAX_SPEED * DECEL_DURATION * easeOutCubic(dt) * 0.5;
        circleImg.style.transform = `rotate(${angle}deg)`;

        if (dt >= 1) {
          phase = 'pulse';
          rafId = null;
          setTimeout(() => {
            circleImg.classList.remove('pulsing');
            void circleImg.offsetWidth;
            circleImg.classList.add('pulsing');
            replayBtn.classList.add('visible');
            setTimeout(revealBoard, POST_PULSE_WAIT);
          }, PULSE_WAIT);
          return;
        }
      }

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);
  }

  function startAfterPause() {
    setTimeout(runAnimation, INITIAL_PAUSE);
  }

  /* ── Click anywhere to skip to board once animation has started ── */
  layer.addEventListener('click', () => {
    if (skipAllowed && !done) revealBoard();
  });

  /* ── Replay button ── */
  replayBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    reset();
  });

  /* ── Start automatically on page load ── */
  startAfterPause();

})();

/* animation.js — Intro logo spin → crossfade → pulse → reveal
   Faithfully recreates the original animation with minor mobile tweaks.
*/

(function () {
  const ACCEL_DURATION  = 0.9;   // seconds to reach max speed
  const MAX_SPEED       = 1440;  // deg/s at peak
  const FADE_DURATION   = 0.35;  // crossfade seconds
  const DECEL_DURATION  = 0.6;   // deceleration seconds
  const DELAY_MS        = 260;   // ms delay before crossfade starts

  const layer      = document.getElementById('zofingia-layer');
  const caLayer    = document.getElementById('ca-layer');
  const shieldImg  = document.getElementById('shieldImg');
  const circleImg  = document.getElementById('circleImg');
  const titleEl    = document.getElementById('intro-title');
  const hintEl     = document.getElementById('hint');
  const replayBtn  = document.getElementById('replayBtn');

  let phase            = 'idle';
  let animStart        = null;
  let crossfadeStart   = null;
  let decelStart       = null;
  let pulseStart       = null;
  let decelStartAngle  = 0;
  let decelStartSpeed  = 0;
  let angle            = 0;
  let rafId            = null;

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function reset() {
    phase = 'idle';
    angle = 0;
    shieldImg.style.transform = 'rotate(0deg)';
    shieldImg.style.opacity   = '1';
    circleImg.style.transform = 'rotate(0deg)';
    circleImg.style.opacity   = '0';
    shieldImg.classList.remove('pulsing');
    titleEl.classList.remove('hidden');
    hintEl.classList.remove('hidden');
    replayBtn.classList.remove('visible');
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  }

  function play() {
    if (phase !== 'idle') return;
    phase     = 'accel';
    animStart = performance.now() / 1000;
    titleEl.classList.add('hidden');
    hintEl.classList.add('hidden');

    function frame(now) {
      const t       = now / 1000;
      const elapsed = t - animStart;

      /* ── Accelerate ── */
      if (phase === 'accel') {
        const p = Math.min(elapsed / ACCEL_DURATION, 1);
        angle = -((MAX_SPEED / (ACCEL_DURATION * ACCEL_DURATION)) * Math.pow(elapsed, 3) / 3);
        shieldImg.style.transform = `rotate(${angle}deg)`;
        shieldImg.style.opacity   = '1';
        circleImg.style.transform = `rotate(${angle}deg)`;
        circleImg.style.opacity   = '0';

        if (p >= 1) {
          phase            = 'crossfade';
          crossfadeStart   = t;
          decelStartAngle  = angle;
          decelStartSpeed  = MAX_SPEED;
        }
      }

      /* ── Crossfade shield → circle ── */
      if (phase === 'crossfade') {
        const ft = Math.min((t - crossfadeStart) / FADE_DURATION, 1);
        // Continue spinning at max speed during crossfade
        angle = decelStartAngle - MAX_SPEED * (t - crossfadeStart);
        shieldImg.style.transform = `rotate(${angle}deg)`;
        shieldImg.style.opacity   = String(1 - ft);
        circleImg.style.transform = `rotate(${angle}deg)`;
        circleImg.style.opacity   = String(ft);

        if (ft >= 1) {
          phase       = 'decel';
          decelStart  = t;
          decelStartAngle = angle;
        }
      }

      /* ── Decelerate ── */
      if (phase === 'decel') {
        const dt = Math.min((t - decelStart) / DECEL_DURATION, 1);
        const eased = easeOutCubic(dt);
        angle = decelStartAngle - MAX_SPEED * DECEL_DURATION * eased * 0.5;
        circleImg.style.transform = `rotate(${angle}deg)`;

        if (dt >= 1) {
          phase      = 'pulse';
          pulseStart = t;
          circleImg.classList.remove('pulsing');
          void circleImg.offsetWidth; // reflow to restart animation
          circleImg.classList.add('pulsing');
        }
      }

      /* ── Pulse settle ── */
      if (phase === 'pulse') {
        const pt = t - pulseStart;
        if (pt >= 0.8) {
          phase = 'done';
          replayBtn.classList.add('visible');
          // Don't call rafId — stop the loop
          return;
        }
      }

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);
  }

  /* First click: start animation */
  layer.addEventListener('click', function handler() {
    if (phase === 'idle') {
      play();
    } else if (phase === 'done') {
      crossfade();
    }
  });

  /* Replay button */
  replayBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    reset();
  });

  /* Crossfade to main board */
  function crossfade() {
    layer.classList.add('fade-out');
    caLayer.classList.add('fade-in');
    layer.addEventListener('transitionend', function () {
      layer.remove();
    }, { once: true });
  }

  /* Second click after done: go to board */
  layer.addEventListener('click', function () {
    if (phase === 'done') {
      setTimeout(crossfade, DELAY_MS);
    }
  });

})();

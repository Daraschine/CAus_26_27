/* modal.js — openModal / closeModal
   Populates the two-panel modal: full photo on left, facts on right.
   Respects the current language set by i18n.js.
*/

function openModal(id) {
  const m    = members[id];
  const lang = (typeof currentLang !== 'undefined') ? currentLang : 'de';

  // ── Photo ──
  const photo = document.getElementById('modal-photo');
  photo.src = m.photo;
  photo.alt = m.vulgo;

  // ── Overlay text on photo ──
  document.getElementById('modal-func').textContent     = m.func[lang] || m.func.de;
  document.getElementById('modal-vulgo').textContent    = m.vulgo;
  document.getElementById('modal-realname').textContent = m.realname;

  // ── Facts ──
  const heading = document.getElementById('facts-heading');
  if (heading) heading.textContent = lang === 'fr' ? 'À propos de la personne' : 'Zur Person';

  const factsEl = document.getElementById('modal-facts');
  factsEl.innerHTML = m.facts.map((f, i) => `
    <div class="fact-row" style="animation-delay:${0.04 + i * 0.05}s">
      <div class="fact-key">${f.key[lang] || f.key.de}</div>
      <div class="fact-val">${f.val[lang] || f.val.de || '<span class="fact-empty">—</span>'}</div>
    </div>
  `).join('');

  // ── Show ──
  document.getElementById('overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('overlay').classList.remove('active');
  document.body.style.overflow = '';
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('overlay')) closeModal();
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

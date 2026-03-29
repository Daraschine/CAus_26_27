/* i18n.js — language switching (DE / FR)
   Reads current language from localStorage, applies to all [data-de] / [data-fr] nodes.
*/

let currentLang = localStorage.getItem('caus-lang') || 'de';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('caus-lang', lang);

  // Update all static translatable elements
  document.querySelectorAll('[data-de]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text !== null) el.textContent = text;
  });

  // Update toggle active state
  document.querySelectorAll('.lang-opt').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update html lang attribute
  document.documentElement.lang = lang;

  // Update facts-heading
  const heading = document.getElementById('facts-heading');
  if (heading) {
    heading.textContent = lang === 'fr' ? 'À propos de la personne' : 'Zur Person';
  }
}

// Wire up toggle buttons
document.querySelectorAll('.lang-opt').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    applyLang(btn.dataset.lang);
  });
});

// Apply on load
applyLang(currentLang);

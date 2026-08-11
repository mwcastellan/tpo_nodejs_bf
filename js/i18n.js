// Apply translations for elements with data-i18n attribute using global t(key)
function applyTranslations() {
  if (typeof t !== 'function') return;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    // support placeholder attribute too for inputs
    const text = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
      if (el.placeholder !== undefined) el.placeholder = text;
    }
    // set textContent for most elements
    el.textContent = text;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  // language selector binding (if present)
  try {
    const selector = document.getElementById('langSelector');
    if (selector) {
      // set initial value from localStorage or navigator
      let lang = 'es';
      try { lang = localStorage.getItem('app_lang') || ((navigator.language||navigator.userLanguage||'es').toLowerCase().startsWith('en') ? 'en' : 'es'); } catch(e){}
      selector.value = lang;
      selector.addEventListener('change', (e) => {
        const v = e.target.value;
        if (window.setLanguage) window.setLanguage(v);
      });
    }
  } catch (e) {
    // ignore
  }
});

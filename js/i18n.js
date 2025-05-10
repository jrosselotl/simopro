
function setLanguage(lang) {
  fetch(`lang/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (data[key]) {
          el.innerHTML = data[key];
        }
      });
      localStorage.setItem('lang', lang);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const defaultLang = localStorage.getItem('lang') || 'es';
  setLanguage(defaultLang);
});

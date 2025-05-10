
function updateFlag(lang) {
  const flagMap = {
    es: 'es.svg',
    en: 'gb.svg',
    de: 'de.svg'
  };
  const flagImg = document.getElementById('lang-flag');
  if (flagImg && flagMap[lang]) {
    flagImg.src = `images/flags/${flagMap[lang]}`;
  }
}

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
      updateFlag(lang); // <- aquí se actualiza la bandera
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const defaultLang = localStorage.getItem('lang') || 'es';
  setLanguage(defaultLang);
});

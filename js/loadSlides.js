// js/loadSlides.js

document.addEventListener('DOMContentLoaded', function () {
  const swiperWrapper = document.getElementById('swiper-wrapper');
  const slides = JSON.parse(localStorage.getItem('slides')) || [];

  slides.forEach(slide => {
    const slideDiv = document.createElement('div');
    slideDiv.className = 'swiper-slide animate__animated ' + (slide.animation || 'fade-in');

    slideDiv.innerHTML = `
      <div class="relative h-[400px] bg-cover bg-center flex ${slide.position} items-center p-8 text-white"
           style="background-image: url('${slide.image}')">
        <div class="absolute inset-0" style="background-color: ${slide.overlayColor}; opacity: ${slide.overlayOpacity};"></div>
        <div class="relative z-10" style="color: ${slide.textColor};">
          <h2 class="text-4xl font-bold">${slide.title}</h2>
          <p class="text-lg mt-2">${slide.subtitle}</p>
          ${slide.button.text ? `<a href="${slide.button.link}" class="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">${slide.button.text}</a>` : ''}
        </div>
      </div>
    `;
    swiperWrapper.appendChild(slideDiv);
  });

  new Swiper('.swiper', {
    loop: true,
    autoplay: { delay: 4000 },
    pagination: { el: '.swiper-pagination' },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });
});

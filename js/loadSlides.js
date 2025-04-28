// loadSlides.js

document.addEventListener('DOMContentLoaded', function () {
  const swiperWrapper = document.getElementById('swiper-wrapper');
  const slides = JSON.parse(localStorage.getItem('slides')) || [];

  slides.forEach(slide => {
    const slideDiv = document.createElement('div');
    slideDiv.className = 'swiper-slide relative flex items-center justify-center text-white ' + slide.animation;

    slideDiv.innerHTML = `
      <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('${slide.image}');"></div>
      <div class="overlay" style="background-color: ${slide.overlayColor}; opacity: ${slide.overlayOpacity};"></div>
      <div class="hero-content ${slide.position} px-8 text-${slide.textColor}">
        <div class="max-w-3xl">
          <h2 class="text-5xl font-bold mb-4">${slide.title}</h2>
          <p class="text-xl">${slide.subtitle}</p>
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

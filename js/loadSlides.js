// js/loadSlides.js

document.addEventListener('DOMContentLoaded', function () {
  const swiperWrapper = document.getElementById('swiper-wrapper');

  const slides = JSON.parse(localStorage.getItem('slides')) || [];

  slides.forEach(slide => {
    const slideDiv = document.createElement('div');
    slideDiv.className = 'swiper-slide';

    slideDiv.innerHTML = `
      <div class="relative h-[400px] bg-cover bg-center flex ${slide.position} items-center p-8 text-white"
           style="background-image: url('${slide.image}')">
        <div>
          <h2 class="text-4xl font-bold">${slide.title}</h2>
          <p class="text-lg mt-2">${slide.subtitle}</p>
        </div>
      </div>
    `;

    swiperWrapper.appendChild(slideDiv);
  });

  // Inicializar Swiper (debes tener la librería Swiper.js cargada en tu proyecto)
  const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
      delay: 4000,
    },
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
});


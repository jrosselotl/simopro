// js/admin.js

let slides = JSON.parse(localStorage.getItem('slides')) || [];

function renderSlides() {
  const slidesList = document.getElementById('slidesList');
  slidesList.innerHTML = '';
  slides.forEach((slide, index) => {
    slidesList.innerHTML += `
      <div class="bg-white p-4 rounded shadow flex justify-between items-center">
        <div>
          <h3 class="font-bold">${slide.title}</h3>
          <p>${slide.subtitle}</p>
          <small>${slide.image}</small>
        </div>
        <button onclick="deleteSlide(${index})" class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
          Eliminar
        </button>
      </div>
    `;
  });
}

function addSlide() {
  const title = document.getElementById('titleInput').value;
  const subtitle = document.getElementById('subtitleInput').value;
  const image = document.getElementById('imageInput').value;

  if (title && subtitle && image) {
    slides.push({ title, subtitle, image });
    renderSlides();
    document.getElementById('titleInput').value = '';
    document.getElementById('subtitleInput').value = '';
    document.getElementById('imageInput').value = '';
  } else {
    alert('Completa todos los campos.');
  }
}

function deleteSlide(index) {
  slides.splice(index, 1);
  renderSlides();
}

function saveSlides() {
  localStorage.setItem('slides', JSON.stringify(slides));
  alert('Slides guardados correctamente.');
}

renderSlides();


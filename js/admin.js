// js/admin.js

function showSection(section) {
  const content = document.getElementById('admin-content');

  if (section === 'carousel') {
    content.innerHTML = `
      <h1 class="text-3xl font-bold mb-6">Editor de Carousel</h1>

      <div class="bg-white p-6 rounded shadow-md mb-8">
        <div class="mb-4">
          <label class="block font-bold mb-2">Título:</label>
          <input type="text" id="titleInput" class="w-full p-2 border rounded" placeholder="Título Slide">
        </div>

        <div class="mb-4">
          <label class="block font-bold mb-2">Subtítulo:</label>
          <input type="text" id="subtitleInput" class="w-full p-2 border rounded" placeholder="Subtítulo Slide">
        </div>

        <div class="mb-4">
          <label class="block font-bold mb-2">URL Imagen de fondo:</label>
          <input type="text" id="imageInput" class="w-full p-2 border rounded" placeholder="https://...">
        </div>

        <div class="mb-4">
          <label class="block font-bold mb-2">Posición del texto:</label>
          <select id="positionInput" class="w-full p-2 border rounded">
            <option value="text-left">Izquierda</option>
            <option value="text-center">Centro</option>
            <option value="text-right">Derecha</option>
          </select>
        </div>

        <button onclick="addSlide()" class="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600">Añadir Slide</button>
      </div>

      <div id="slidesPreview" class="space-y-6">
        <h2 class="text-2xl font-bold mb-4">Vista Previa en Vivo:</h2>
      </div>

      <button onclick="saveSlides()" class="mt-6 bg-green-500 text-white py-2 px-8 rounded hover:bg-green-600">
        Guardar Cambios
      </button>
    `;
  }
}

let slides = JSON.parse(localStorage.getItem('slides')) || [];

function renderSlides() {
  const slidesPreview = document.getElementById('slidesPreview');
  slidesPreview.innerHTML = `<h2 class="text-2xl font-bold mb-4">Vista Previa en Vivo:</h2>`;
  slides.forEach((slide, index) => {
    slidesPreview.innerHTML += `
      <div class="relative bg-cover bg-center h-64 flex ${slide.position} items-center p-8 rounded shadow"
        style="background-image: url('${slide.image}')">
        <div class="text-white">
          <h3 class="text-2xl font-bold">${slide.title}</h3>
          <p>${slide.subtitle}</p>
        </div>
        <button onclick="deleteSlide(${index})" class="absolute top-2 right-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
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
  const position = document.getElementById('positionInput').value;

  if (title && subtitle && image) {
    slides.push({ title, subtitle, image, position });
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

// Si ya había slides guardados antes, los mostramos
showSection('carousel');
renderSlides();

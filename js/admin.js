// js/admin.js

let slides = [];

function showSection(section) {
  const content = document.getElementById('admin-content');

  if (section === 'carousel') {
    content.innerHTML = `
      <h1 class="text-3xl font-bold mb-6">Editor de Carousel</h1>

      <div class="bg-white p-6 rounded shadow-md mb-8 space-y-4">
        <input type="hidden" id="slideId">

        <div>
          <label class="block font-bold mb-2">Título:</label>
          <input type="text" id="titleInput" class="w-full p-2 border rounded">
        </div>

        <div>
          <label class="block font-bold mb-2">Subtítulo:</label>
          <input type="text" id="subtitleInput" class="w-full p-2 border rounded">
        </div>

        <div>
          <label class="block font-bold mb-2">URL Imagen de fondo:</label>
          <input type="text" id="imageInput" class="w-full p-2 border rounded">
        </div>

        <div>
          <label class="block font-bold mb-2">Posición del texto:</label>
          <select id="positionInput" class="w-full p-2 border rounded">
            <option value="text-left">Izquierda</option>
            <option value="text-center">Centro</option>
            <option value="text-right">Derecha</option>
          </select>
        </div>

        <div>
          <label class="block font-bold mb-2">Color Overlay (fondo difuminado):</label>
          <input type="color" id="overlayColorInput" class="w-full p-2 border rounded">
        </div>

        <div>
          <label class="block font-bold mb-2">Color de Texto:</label>
          <input type="color" id="textColorInput" class="w-full p-2 border rounded">
        </div>

        <button onclick="addOrUpdateSlide()" class="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600">Guardar Slide</button>
      </div>

      <div id="slidesPreview" class="space-y-6">
        <h2 class="text-2xl font-bold mb-4">Vista Previa:</h2>
      </div>
    `;

    renderSlides();
  }
}

function addOrUpdateSlide() {
  const id = document.getElementById('slideId').value;
  const title = document.getElementById('titleInput').value;
  const subtitle = document.getElementById('subtitleInput').value;
  const image = document.getElementById('imageInput').value;
  const position = document.getElementById('positionInput').value;
  const overlayColor = document.getElementById('overlayColorInput').value;
  const textColor = document.getElementById('textColorInput').value;

  if (title && subtitle && image) {
    const slide = { title, subtitle, image, position, overlayColor, textColor };

    if (id) {
      slides[id] = slide;
    } else {
      slides.push(slide);
    }

    saveSlides();
    renderSlides();
    clearForm();
  } else {
    alert('Completa todos los campos.');
  }
}

function renderSlides() {
  const slidesPreview = document.getElementById('slidesPreview');
  slidesPreview.innerHTML = `<h2 class="text-2xl font-bold mb-4">Vista Previa:</h2>`;

  slides.forEach((slide, index) => {
    slidesPreview.innerHTML += `
      <div class="relative bg-cover bg-center h-64 rounded shadow flex ${slide.position} items-center p-8 text-white"
           style="background-image: url('${slide.image}')">
        <div class="absolute inset-0" style="background-color: ${slide.overlayColor}; opacity: 0.5;"></div>
        <div class="relative z-10" style="color: ${slide.textColor};">
          <h3 class="text-2xl font-bold">${slide.title}</h3>
          <p>${slide.subtitle}</p>
        </div>
        <div class="absolute top-2 right-2 flex space-x-2">
          <button onclick="editSlide(${index})" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Editar</button>
          <button onclick="deleteSlide(${index})" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Eliminar</button>
        </div>
      </div>
    `;
  });
}

function editSlide(index) {
  document.getElementById('slideId').value = index;
  document.getElementById('titleInput').value = slides[index].title;
  document.getElementById('subtitleInput').value = slides[index].subtitle;
  document.getElementById('imageInput').value = slides[index].image;
  document.getElementById('positionInput').value = slides[index].position;
  document.getElementById('overlayColorInput').value = slides[index].overlayColor || "#000000";
  document.getElementById('textColorInput').value = slides[index].textColor || "#FFFFFF";
}

function deleteSlide(index) {
  if (confirm('¿Eliminar este slide?')) {
    slides.splice(index, 1);
    saveSlides();
    renderSlides();
  }
}

function saveSlides() {
  localStorage.setItem('slides', JSON.stringify(slides));
}

function clearForm() {
  document.getElementById('slideId').value = '';
  document.getElementById('titleInput').value = '';
  document.getElementById('subtitleInput').value = '';
  document.getElementById('imageInput').value = '';
  document.getElementById('positionInput').value = 'text-left';
  document.getElementById('overlayColorInput').value = '#000000';
  document.getElementById('textColorInput').value = '#FFFFFF';
}

// Cargar slides existentes
slides = JSON.parse(localStorage.getItem('slides')) || [];
showSection('carousel');

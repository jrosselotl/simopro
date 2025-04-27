// js/admin.js

let slides = JSON.parse(localStorage.getItem('slides')) || [];

function showSection(section) {
  if (section === 'carousel') {
    document.getElementById('admin-content').innerHTML = renderCarouselAdmin();
    renderSlides();
    enableDragDrop();
  }
}

function renderCarouselAdmin() {
  return `
    <h1 class="text-3xl font-bold mb-6">Editor de Carousel</h1>

    <form id="slideForm" class="space-y-4 bg-white p-6 rounded shadow mb-8">
      <input type="hidden" id="slideId">
      
      <input type="text" id="title" placeholder="Título" class="w-full p-2 border rounded">
      <input type="text" id="subtitle" placeholder="Subtítulo" class="w-full p-2 border rounded">
      <input type="text" id="image" placeholder="URL de Imagen" class="w-full p-2 border rounded">
      
      <select id="position" class="w-full p-2 border rounded">
        <option value="text-left">Izquierda</option>
        <option value="text-center">Centro</option>
        <option value="text-right">Derecha</option>
      </select>

      <div class="flex gap-2">
        <label>Overlay:</label>
        <input type="color" id="overlayColor" value="#000000">
        <input type="range" id="overlayOpacity" min="0" max="1" step="0.1" value="0.3">
      </div>

      <div class="flex gap-2">
        <label>Color Texto:</label>
        <input type="color" id="textColor" value="#ffffff">
      </div>

      <div class="flex flex-col gap-2">
        <label>Botón Opcional:</label>
        <input type="text" id="buttonText" placeholder="Texto Botón (opcional)" class="p-2 border rounded">
        <input type="text" id="buttonLink" placeholder="Enlace Botón (opcional)" class="p-2 border rounded">
      </div>

      <div class="flex flex-col gap-2">
        <label>Animación de entrada:</label>
        <select id="animation" class="p-2 border rounded">
          <option value="fade-in">Fade In</option>
          <option value="slide-in">Slide In</option>
          <option value="zoom-in">Zoom In</option>
        </select>
      </div>

      <button type="button" onclick="saveSlide()" class="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600">Guardar Slide</button>
    </form>

    <div id="slidesList" class="space-y-4"></div>
  `;
}

function saveSlide() {
  const slide = {
    title: document.getElementById('title').value,
    subtitle: document.getElementById('subtitle').value,
    image: document.getElementById('image').value,
    position: document.getElementById('position').value,
    overlayColor: document.getElementById('overlayColor').value,
    overlayOpacity: parseFloat(document.getElementById('overlayOpacity').value),
    textColor: document.getElementById('textColor').value,
    button: {
      text: document.getElementById('buttonText').value,
      link: document.getElementById('buttonLink').value
    },
    animation: document.getElementById('animation').value
  };

  const id = document.getElementById('slideId').value;
  if (id !== '') {
    slides[id] = slide;
  } else {
    slides.push(slide);
  }

  localStorage.setItem('slides', JSON.stringify(slides));
  clearForm();
  renderSlides();
}

function renderSlides() {
  const list = document.getElementById('slidesList');
  list.innerHTML = '';
  slides.forEach((slide, index) => {
    list.innerHTML += `
      <div data-id="${index}" class="bg-white p-4 rounded shadow flex justify-between items-center cursor-move">
        <div>
          <h3 class="font-bold">${slide.title}</h3>
          <p class="text-sm">${slide.subtitle}</p>
        </div>
        <div class="flex gap-2">
          <button onclick="editSlide(${index})" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Editar</button>
          <button onclick="deleteSlide(${index})" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Eliminar</button>
        </div>
      </div>
    `;
  });
}

function editSlide(index) {
  const slide = slides[index];
  document.getElementById('slideId').value = index;
  document.getElementById('title').value = slide.title;
  document.getElementById('subtitle').value = slide.subtitle;
  document.getElementById('image').value = slide.image;
  document.getElementById('position').value = slide.position;
  document.getElementById('overlayColor').value = slide.overlayColor;
  document.getElementById('overlayOpacity').value = slide.overlayOpacity;
  document.getElementById('textColor').value = slide.textColor;
  document.getElementById('buttonText').value = slide.button.text;
  document.getElementById('buttonLink').value = slide.button.link;
  document.getElementById('animation').value = slide.animation;
}

function deleteSlide(index) {
  if (confirm('¿Eliminar este slide?')) {
    slides.splice(index, 1);
    localStorage.setItem('slides', JSON.stringify(slides));
    renderSlides();
  }
}

function clearForm() {
  document.getElementById('slideId').value = '';
  document.getElementById('slideForm').reset();
}

function enableDragDrop() {
  new Sortable(document.getElementById('slidesList'), {
    animation: 150,
    onEnd: function (evt) {
      const movedItem = slides.splice(evt.oldIndex, 1)[0];
      slides.splice(evt.newIndex, 0, movedItem);
      localStorage.setItem('slides', JSON.stringify(slides));
      renderSlides();
    }
  });
}

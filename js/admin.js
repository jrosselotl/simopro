// admin.js

let slides = JSON.parse(localStorage.getItem('slides')) || [];

function showCarouselEditor() {
  const adminContent = document.getElementById('admin-content');
  adminContent.innerHTML = renderSlideForm() + renderSlidesList();
  enableDragDrop();
}

function renderSlideForm() {
  return `
    <form id="slideForm" class="space-y-4 bg-white p-6 rounded shadow">
      <input type="hidden" id="slideId">

      <div class="flex flex-col">
        <label>Título:</label>
        <input type="text" id="title" class="p-2 border rounded">
      </div>

      <div class="flex flex-col">
        <label>Subtítulo:</label>
        <input type="text" id="subtitle" class="p-2 border rounded">
      </div>

      <div class="flex flex-col">
        <label>URL Imagen:</label>
        <input type="text" id="image" class="p-2 border rounded">
      </div>

      <div class="flex flex-col">
        <label>Posición del texto:</label>
        <select id="position" class="p-2 border rounded">
          <option value="text-left">Izquierda</option>
          <option value="text-center">Centro</option>
          <option value="text-right">Derecha</option>
        </select>
      </div>

      <div class="flex flex-col">
        <label>Color del overlay:</label>
        <input type="color" id="overlayColor" value="#000000">
      </div>

      <div class="flex flex-col">
        <label>Opacidad del overlay (0 a 1):</label>
        <input type="number" id="overlayOpacity" min="0" max="1" step="0.1" value="0.4" class="p-2 border rounded">
      </div>

      <div class="flex flex-col">
        <label>Color del texto:</label>
        <input type="color" id="textColor" value="#ffffff">
      </div>

      <div class="flex flex-col">
        <label>Animación de entrada:</label>
        <select id="animation" class="p-2 border rounded">
          <option value="animate__fadeIn">Fade In</option>
          <option value="animate__zoomIn">Zoom In</option>
          <option value="animate__slideInUp">Slide In Up</option>
        </select>
      </div>

      <button type="button" onclick="saveSlide()" class="btn-primary">Guardar Slide</button>
    </form>
  `;
}

function renderSlidesList() {
  let html = `<div class="space-y-4" id="slidesList">`;
  slides.forEach((slide, index) => {
    html += `
      <div class="bg-white p-4 rounded shadow flex justify-between items-center" data-id="${index}">
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
  html += `</div>`;
  return html;
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
    animation: document.getElementById('animation').value
  };

  const id = document.getElementById('slideId').value;
  if (id) {
    slides[id] = slide;
  } else {
    slides.push(slide);
  }

  localStorage.setItem('slides', JSON.stringify(slides));
  showCarouselEditor();
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
  document.getElementById('animation').value = slide.animation;
}

function deleteSlide(index) {
  if (confirm('¿Estás seguro de eliminar este slide?')) {
    slides.splice(index, 1);
    localStorage.setItem('slides', JSON.stringify(slides));
    showCarouselEditor();
  }
}

function enableDragDrop() {
  new Sortable(document.getElementById('slidesList'), {
    animation: 150,
    onEnd: function (evt) {
      const movedItem = slides.splice(evt.oldIndex, 1)[0];
      slides.splice(evt.newIndex, 0, movedItem);
      localStorage.setItem('slides', JSON.stringify(slides));
      showCarouselEditor();
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const padreInput = document.getElementById("servicio-padre");
  const hijoInput = document.getElementById("servicio-hijo");
  const btn = document.getElementById("agregar-servicio");
  const msg = document.getElementById("servicio-msg");

  btn.addEventListener("click", () => {
    const padre = padreInput.value.trim();
    const hijo = hijoInput.value.trim();

    if (!padre || !hijo) {
      msg.textContent = "Debes completar ambos campos.";
      msg.className = "text-red-500 mt-2";
      return;
    }

    let servicios = JSON.parse(localStorage.getItem("servicios")) || {};

    if (!servicios[padre]) {
      servicios[padre] = [];
    }

    if (!servicios[padre].includes(hijo)) {
      servicios[padre].push(hijo);
    }

    localStorage.setItem("servicios", JSON.stringify(servicios));

    msg.textContent = `Servicio "${hijo}" agregado bajo "${padre}".`;
    msg.className = "text-green-600 mt-2";

    padreInput.value = "";
    hijoInput.value = "";
  });
});

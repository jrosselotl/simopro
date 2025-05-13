document.addEventListener("DOMContentLoaded", function () {
  const sliderContainer = document.getElementById("slider-container");
  const addSlideBtn = document.getElementById("add-slide-btn");

  let slides = JSON.parse(localStorage.getItem("sliderData")) || [];

  function renderSlides() {
    sliderContainer.innerHTML = "";
    slides.forEach((slide, index) => {
      const slideEl = document.createElement("div");
      slideEl.className = "p-4 mb-4 bg-white rounded shadow";
      slideEl.innerHTML = `
        <label>Título:</label>
        <input type="text" class="w-full p-2 border mb-2" value="${slide.title}" onchange="updateSlide(${index}, 'title', this.value)">
        <label>Texto:</label>
        <input type="text" class="w-full p-2 border mb-2" value="${slide.text}" onchange="updateSlide(${index}, 'text', this.value)">
        <label>Imagen (URL):</label>
        <input type="text" class="w-full p-2 border mb-2" value="${slide.image}" onchange="updateSlide(${index}, 'image', this.value)">
        <button class="bg-red-500 text-white px-3 py-1 rounded" onclick="deleteSlide(${index})">Eliminar</button>
      `;
      sliderContainer.appendChild(slideEl);
    });
  }

  window.updateSlide = function (index, field, value) {
    slides[index][field] = value;
    localStorage.setItem("sliderData", JSON.stringify(slides));
  };

  window.deleteSlide = function (index) {
    slides.splice(index, 1);
    localStorage.setItem("sliderData", JSON.stringify(slides));
    renderSlides();
  };

  addSlideBtn?.addEventListener("click", () => {
    slides.push({ title: "", text: "", image: "" });
    localStorage.setItem("sliderData", JSON.stringify(slides));
    renderSlides();
  });

  renderSlides();
});

// ========== DIVISIONES Y SERVICIOS ==========
function mostrarSeccion(id) {
  const secciones = ['crear-division', 'crear-servicio'];
  secciones.forEach(sec => {
    const el = document.getElementById(sec);
    if (el) el.classList.add('hidden');
  });
  const activa = document.getElementById(id);
  if (activa) activa.classList.remove('hidden');
}

function slugify(text) {
  return text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

function getDivisiones() {
  return JSON.parse(localStorage.getItem("simopro_servicios")) || [];
}

function saveDivisiones(data) {
  localStorage.setItem("simopro_servicios", JSON.stringify(data));
  renderVista();
  actualizarSelectorDivisiones();
}

function agregarDivision() {
  const nombre = document.getElementById("divisionNombre").value.trim();
  if (!nombre) return;
  const slug = slugify(nombre);
  const data = getDivisiones();
  if (data.some(d => d.slug === slug)) return alert("Ya existe esa división");
  data.push({ division: nombre, slug, servicios: [] });
  saveDivisiones(data);
  document.getElementById("divisionNombre").value = "";
}

function agregarServicio() {
  const divisionSlug = document.getElementById("selectDivision").value;
  const nombre = document.getElementById("servicioNombre").value.trim();
  const slug = slugify(nombre);
  const data = getDivisiones();
  const division = data.find(d => d.slug === divisionSlug);
  if (!division || division.servicios.some(s => s.slug === slug)) return;
  division.servicios.push({ nombre, slug });
  saveDivisiones(data);
  document.getElementById("servicioNombre").value = "";
}

function actualizarSelectorDivisiones() {
  const data = getDivisiones();
  const select = document.getElementById("selectDivision");
  if (!select) return;
  select.innerHTML = "";
  data.forEach(d => {
    const opt = document.createElement("option");
    opt.value = d.slug;
    opt.textContent = d.division;
    select.appendChild(opt);
  });
}

function renderVista() {
  const data = getDivisiones();
  const vista = document.getElementById("jsonPreview");
  if (!vista) return;
  vista.innerHTML = "";

  data.forEach(div => {
    const divWrap = document.createElement("div");
    divWrap.className = "mb-4";
    divWrap.innerHTML = `<h4 class="font-semibold text-black cursor-pointer" data-slug="${div.slug}" onclick="editarNombre(this, 'division')">${div.division}</h4><ul class="ml-4 list-disc"></ul>`;

    const ul = divWrap.querySelector("ul");

    div.servicios.forEach(serv => {
      const li = document.createElement("li");
      li.className = "text-black cursor-pointer flex justify-between items-center";
      li.setAttribute("data-slug", serv.slug);
      li.setAttribute("onclick", `editarNombre(this, 'servicio', '${div.slug}')`);
      li.textContent = serv.nombre;

      const btn = document.createElement("button");
      btn.className = "text-red-600 ml-4 font-bold";
      btn.textContent = "✕";
      btn.onclick = (e) => {
        e.stopPropagation(); // evitar que dispare editarNombre()
        eliminarServicio(serv.slug, div.slug);
      };

      li.appendChild(btn);
      ul.appendChild(li);
    });
    
    divWrap.appendChild(ul);
    vista.appendChild(divWrap);
  });
}
function eliminarServicio(servSlug, divSlug) {
  const data = getDivisiones();
  const division = data.find(d => d.slug === divSlug);
  if (!division) return;
  const confirmar = confirm("¿Estás seguro de que deseas eliminar este servicio?");
  if (!confirmar) return;
  division.servicios = division.servicios.filter(s => s.slug !== servSlug);
  saveDivisiones(data);
}

// Exportar al scope global
window.mostrarSeccion = mostrarSeccion;
window.agregarDivision = agregarDivision;
window.agregarServicio = agregarServicio;
window.renderVista = renderVista;
window.saveDivisiones = saveDivisiones;
window.getDivisiones = getDivisiones;
window.actualizarSelectorDivisiones = actualizarSelectorDivisiones;


function editarNombre(element, tipo, divisionSlug = null) {
  const nuevo = prompt("Editar nombre:", element.textContent.trim());
  if (!nuevo) return;
  const data = getDivisiones();
  const slug = slugify(nuevo);

  if (tipo === "division") {
    const division = data.find(d => d.slug === element.dataset.slug);
    if (!division) return;
    division.division = nuevo;
    division.slug = slug;
  } else if (tipo === "servicio") {
    const division = data.find(d => d.slug === divisionSlug);
    if (!division) return;
    const servicio = division.servicios.find(s => s.slug === element.dataset.slug);
    if (!servicio) return;
    servicio.nombre = nuevo;
    servicio.slug = slug;
  }

  saveDivisiones(data);
}
document.addEventListener("DOMContentLoaded", () => {
  renderVista();
  actualizarSelectorDivisiones();
});

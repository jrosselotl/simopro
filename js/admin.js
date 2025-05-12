
// ========== SLIDER / HERO LOGIC ==========
document.addEventListener("DOMContentLoaded", function () {
  const sliderContainer = document.getElementById("slider-container");
  const addSlideBtn = document.getElementById("add-slide-btn");

  let slides = JSON.parse(localStorage.getItem("sliderData")) || [];

  function renderSlides() {
    sliderContainer.innerHTML = "";
    slides.forEach((slide, index) => {
      const slideEl = document.createElement("div");
      slideEl.className = "p-4 mb-4 bg-white rounded shadow";
      slideEl.innerHTML = \`
        <label>Título:</label>
        <input type="text" class="w-full p-2 border mb-2" value="\${slide.title}" onchange="updateSlide(\${index}, 'title', this.value)">
        <label>Texto:</label>
        <input type="text" class="w-full p-2 border mb-2" value="\${slide.text}" onchange="updateSlide(\${index}, 'text', this.value)">
        <label>Imagen (URL):</label>
        <input type="text" class="w-full p-2 border mb-2" value="\${slide.image}" onchange="updateSlide(\${index}, 'image', this.value)">
        <button class="bg-red-500 text-white px-3 py-1 rounded" onclick="deleteSlide(\${index})">Eliminar</button>
      ;
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

  addSlideBtn.addEventListener("click", () => {
    slides.push({ title: "", text: "", image: "" });
    localStorage.setItem("sliderData", JSON.stringify(slides));
    renderSlides();
  });

  renderSlides();
});

window.mostrarSeccion = mostrarSeccion;
window.agregarDivision = agregarDivision;
window.eliminarDivision = eliminarDivision;
window.eliminarServicio = eliminarServicio;
window.editarNombre = editarNombre;
window.agregarServicio = agregarServicio;

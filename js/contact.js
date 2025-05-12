// js/contact.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const response = document.getElementById("form-response");

  if (!form || !response) {
    console.warn("Formulario o respuesta no encontrados en esta página.");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validaciones básicas
    const requiredFields = ["nombre", "apellido", "correo", "pais", "telefono", "servicio", "motivo", "mensaje"];
    let valid = true;

    requiredFields.forEach((id) => {
      const field = document.getElementById(id);
      if (field && !field.value.trim()) {
        field.classList.add("border-red-500");
        valid = false;
      } else if (field) {
        field.classList.remove("border-red-500");
      }
    });

    if (!valid) {
      response.textContent = "Por favor completa todos los campos requeridos.";
      response.className = "text-red-600 mt-2";
      return;
    }

    // Simula éxito (luego se reemplaza con integración real)
    response.textContent = "Mensaje enviado correctamente. Pronto te contactaremos.";
    response.className = "text-green-600 mt-2";

    // Resetea el formulario
    form.reset();
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const selectDivision = document.getElementById("formDivision");
  const selectServicio = document.getElementById("formServicio");

  const data = JSON.parse(localStorage.getItem("simopro_servicios")) || [];

  selectDivision.innerHTML = "";
  data.forEach(div => {
    const opt = document.createElement("option");
    opt.value = div.slug;
    opt.textContent = div.division;
    selectDivision.appendChild(opt);
  });

  selectDivision.addEventListener("change", () => {
    const selected = data.find(d => d.slug === selectDivision.value);
    selectServicio.innerHTML = "";
    selected?.servicios.forEach(serv => {
      const opt = document.createElement("option");
      opt.value = serv.slug;
      opt.textContent = serv.nombre;
      selectServicio.appendChild(opt);
    });
  });

  // Llenar servicios por defecto en la carga inicial
  if (data.length > 0) {
    selectDivision.value = data[0].slug;
    selectDivision.dispatchEvent(new Event("change"));
  }
});

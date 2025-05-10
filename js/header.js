document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then(res => res.text())
    .then(data => {
      // Evitar duplicados
      const existingHeader = document.querySelector("header#main-header");
      if (!existingHeader) {
        const temp = document.createElement("div");
        temp.innerHTML = data;
        document.body.insertBefore(temp.firstElementChild, document.body.firstChild);
      }

      // Asegurarse que el header esté en el DOM antes de hacer scroll
      setTimeout(() => {
        const header = document.querySelector("header#main-header");
        if (!header) return;

        // Agregar clase si ya bajó
        if (window.scrollY > 50) {
          header.classList.add("bg-black", "shadow-md");
          header.classList.remove("bg-transparent");
        }

        // Escuchar scroll
        window.addEventListener("scroll", () => {
          if (window.scrollY > 50) {
            header.classList.add("bg-black", "shadow-md");
            header.classList.remove("bg-transparent");
          } else {
            header.classList.remove("bg-black", "shadow-md");
            header.classList.add("bg-transparent");
          }
        });
      }, 300); // espera a que el header esté insertado
    })
    .catch(error => console.error("Error al cargar el header:", error));
});

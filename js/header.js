document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then(res => res.text())
    .then(data => {
      const existingHeader = document.querySelector("header#main-header");
      if (!existingHeader) {
        const temp = document.createElement("div");
        temp.innerHTML = data;
        document.body.insertBefore(temp.firstElementChild, document.body.firstChild);
      }

      // Esperar a que el header esté en el DOM
      setTimeout(() => {
        const header = document.querySelector("header#main-header");
        if (!header) return;

        // Aplicar estado inicial basado en scroll
        const handleScroll = () => {
          if (window.scrollY > 50) {
            header.classList.add("bg-black", "shadow-md");
            header.classList.remove("bg-transparent");
          } else {
            header.classList.remove("bg-black", "shadow-md");
            header.classList.add("bg-transparent");
          }
        };

        // Llamar una vez e instalar el listener
        handleScroll();
        window.addEventListener("scroll", handleScroll);
      }, 500); // pequeño retraso tras insertar el header
    })
    .catch(error => console.error("Error al cargar el header:", error));
});

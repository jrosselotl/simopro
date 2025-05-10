document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then(res => res.text())
    .then(data => {
      // Evita insertar duplicado
      if (!document.querySelector("header#main-header")) {
        const temp = document.createElement("div");
        temp.innerHTML = data;
        document.body.insertBefore(temp.firstElementChild, document.body.firstChild);
      }

      // Espera a que el DOM tenga el header
      setTimeout(() => {
        const header = document.querySelector("header#main-header");
        if (!header) return;

        const handleScroll = () => {
          if (window.scrollY > 50) {
            header.classList.add("bg-black", "shadow-md");
            header.classList.remove("bg-transparent");
          } else {
            header.classList.remove("bg-black", "shadow-md");
            header.classList.add("bg-transparent");
          }
        };

        handleScroll(); // verificar estado actual
        window.addEventListener("scroll", handleScroll);
      }, 500); // asegura que el header esté renderizado
    })
    .catch(error => console.error("Error al cargar header:", error));
});

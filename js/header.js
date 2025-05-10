
document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then(res => res.text())
    .then(data => {
      if (!document.querySelector("header")) {
        const temp = document.createElement("div");
        temp.innerHTML = data;
        document.body.insertBefore(temp.firstElementChild, document.body.firstChild);
      }

      // Manejo del scroll para cambiar color del header
      document.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        if (header) {
          if (window.scrollY > 50) {
            header.classList.add("bg-black", "shadow-md");
            header.classList.remove("bg-transparent");
          } else {
            header.classList.remove("bg-black", "shadow-md");
            header.classList.add("bg-transparent");
          }
        }
      });

      // Forzar reevaluación de scroll inicial
      setTimeout(() => {
        window.scrollBy(0, 1);
        window.scrollBy(0, -1);
      }, 300);
    })
    .catch(err => console.error("Error cargando header:", err));
});

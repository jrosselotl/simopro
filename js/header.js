document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then(response => {
      if (!response.ok) throw new Error("No se pudo cargar el header");
      return response.text();
    })
    .then(data => {
      const headerContainer = document.querySelector("header");
      if (headerContainer) {
        headerContainer.outerHTML = data; // Reemplaza <header> entero
      } else {
        // Si no existe <header>, lo agregamos al principio del <body>
        const body = document.querySelector("body");
        if (body) {
          const temp = document.createElement("div");
          temp.innerHTML = data;
          body.insertBefore(temp.firstElementChild, body.firstChild);
        }
      }
    })
    .catch(error => console.error("Error al cargar header:", error));
});
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

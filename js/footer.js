document.addEventListener("DOMContentLoaded", () => {
  fetch("footer.html")
    .then(response => {
      if (!response.ok) throw new Error("No se pudo cargar el footer");
      return response.text();
    })
    .then(data => {
      const footerContainer = document.querySelector("footer");
      if (footerContainer) {
        footerContainer.outerHTML = data;
      } else {
        // Si no existe <footer>, lo agregamos al final del <body>
        const body = document.querySelector("body");
        if (body) {
          const temp = document.createElement("div");
          temp.innerHTML = data;
          body.appendChild(temp.firstElementChild);
        }
      }
    })
    .catch(error => console.error("Error al cargar footer:", error));
});

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
function cargarMenuDinamico() {
  const data = JSON.parse(localStorage.getItem("simopro_servicios")) || [];

  const menuDivisiones = document.getElementById("menu-divisiones");

  if (!menuDivisiones) return;

  menuDivisiones.innerHTML = ""; // limpiar antes de poblar

  data.forEach(div => {
    const li = document.createElement("li");
    li.className = "relative group";

    li.innerHTML = \`
      <span class="cursor-pointer flex items-center gap-1 px-4 py-2 hover:bg-gray-800">\${div.division}</span>
      <ul class="absolute left-0 top-full mt-1 bg-black text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transform transition duration-300 z-50 min-w-[200px]">
        \${div.servicios.map(s => \`
          <li><a href="servicios/\${s.slug}.html" class="block px-4 py-2 hover:bg-gray-800">\${s.nombre}</a></li>
        \`).join("")}
      </ul>
    \`;

    menuDivisiones.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", cargarMenuDinamico);

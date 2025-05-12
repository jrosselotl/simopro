function cargarMenuDinamico() {
  const data = JSON.parse(localStorage.getItem("simopro_servicios")) || [];
  const menuDivisiones = document.getElementById("menu-divisiones");
  if (!menuDivisiones) return;

  menuDivisiones.innerHTML = "";

  data.forEach(div => {
    const li = document.createElement("li");
    li.className = "relative group";

    li.innerHTML = `
      <div class="cursor-pointer px-4 py-2 hover:bg-gray-800 text-white">${div.division}</div>
      <ul class="absolute left-full top-0 ml-2 bg-black text-white rounded-md shadow-lg hidden group-hover:block min-w-[200px] z-50">
        ${div.servicios.map(s => `
          <li><a href="servicios/${s.slug}.html" class="block px-4 py-2 hover:bg-gray-800 text-white hover:text-blue-400">${s.nombre}</a></li>
        `).join("")}
      </ul>
    `;

    menuDivisiones.appendChild(li);
  });
}

function toggleLangMenuMobile() {
  const menu = document.getElementById("lang-menu-mobile");
  if (menu) menu.classList.toggle("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then(res => res.text())
    .then(data => {
      if (!document.querySelector("header#main-header")) {
        const temp = document.createElement("div");
        temp.innerHTML = data;
        document.body.insertBefore(temp.firstElementChild, document.body.firstChild);
      }

      // Esperar a que se renderice el header
      setTimeout(() => {
        const header = document.querySelector("header#main-header");
        if (!header) return;

        // Sticky scroll
        const handleScroll = () => {
          if (window.scrollY > 50) {
            header.classList.add("bg-black", "shadow-md");
            header.classList.remove("bg-transparent");
          } else {
            header.classList.remove("bg-black", "shadow-md");
            header.classList.add("bg-transparent");
          }
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);

        // Mega menú
        cargarMenuDinamico();

        // Idioma inicial
        const lang = localStorage.getItem("lang") || "es";
        if (typeof setLanguage === "function") {
          setLanguage(lang);
        }

        // Toggle menú móvil
        const toggle = document.getElementById("menu-toggle");
        const mobileMenu = document.getElementById("mobile-menu");
        if (toggle && mobileMenu) {
          toggle.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
          });
        }
      }, 300);
    })
    .catch(error => console.error("Error al cargar header:", error));
});
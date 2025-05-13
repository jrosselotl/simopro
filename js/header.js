
function cargarMenuDinamico() {
  const data = JSON.parse(localStorage.getItem("simopro_servicios")) || [];

  // 🖥 MENÚ DE ESCRITORIO
  const menuDivisiones = document.getElementById("menu-divisiones");
  if (menuDivisiones) {
    menuDivisiones.innerHTML = "";
    data.forEach(div => {
      const li = document.createElement("li");
      li.className = "relative group";

      const serviciosHTML = (div.servicios || []).map(s => `
        <li>
          <a href="servicios/${s.slug}.html" class="block px-4 py-2 hover:bg-gray-800 text-white hover:text-blue-400">${s.nombre}</a>
        </li>
      `).join("");

      li.innerHTML = `
        <span class="cursor-pointer px-4 py-2 text-white hover:bg-gray-800 whitespace-nowrap block">${div.division}</span>
        ${serviciosHTML ? `
          <ul class="absolute left-full top-0 ml-2 bg-black text-white rounded-md shadow-lg 
              opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 min-w-[200px]">
            ${serviciosHTML}
          </ul>` : ""}
      `;

      menuDivisiones.appendChild(li);
    });
  }

  // 📱 MENÚ MÓVIL (Acordeón clic por división)
  const mobileDivisiones = document.getElementById("mobile-divisiones");
  if (mobileDivisiones) {
    mobileDivisiones.innerHTML = `
  <button class="w-full text-left font-semibold py-2" onclick="document.getElementById('dropdown-divisiones').classList.toggle('hidden')">
    Divisiones
    <span class="float-right">▼</span>
  </button>
  <div id="dropdown-divisiones" class="hidden pl-2 space-y-2"></div>
`;

const dropdownContainer = document.getElementById("dropdown-divisiones");

data.forEach((div, index) => {
  const container = document.createElement("div");
  container.className = "text-white";

  const idServicios = `mobile-sub-${index}`;
  container.innerHTML = `
    <button class="w-full text-left font-medium py-2" onclick="document.getElementById('${idServicios}').classList.toggle('hidden')">
      ${div.division}
    </button>
    <div id="${idServicios}" class="hidden pl-4">
      ${(div.servicios || []).map(s => `
        <a href="servicios/${s.slug}.html" class="block py-1 text-sm text-gray-300 hover:text-blue-400">${s.nombre}</a>
      `).join("")}
    </div>
  `;

  dropdownContainer.appendChild(container);
});
  }
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

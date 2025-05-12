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
        cargarMenuDinamico();
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
  menu.classList.toggle("hidden");
}


document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("lang") || "es";
  if (typeof setLanguage === "function") {
    setLanguage(lang);
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
});


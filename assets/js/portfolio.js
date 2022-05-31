const grid = new Muuri(".grid", {
  layout: {
    rounding: false,
  },
});

window.addEventListener("load", () => {
  grid.refreshItems().layout();
  document.getElementById("grid").classList.add("imagenes-cargadas");

  // Agregamos los listener de los enlaces para filtrar por categoria.
  const enlaces = document.querySelectorAll("#categories a");
  enlaces.forEach((elemento) => {
    elemento.addEventListener("click", (evento) => {
      evento.preventDefault();
      enlaces.forEach((enlace) => enlace.classList.remove("activo"));
      evento.target.classList.add("activo");

      const category = evento.target.innerHTML.toLowerCase();
      category === "todos"
        ? grid.filter("[data-category]")
        : grid.filter(`[data-category="${category}"]`);
    });
  });

  // Agregamos el listener para la barra de busqueda
  document.querySelector("#search-bar").addEventListener("input", (evento) => {
    const busqueda = evento.target.value;
    grid.filter((item) =>
      item.getElement().dataset.etiquetas.includes(busqueda)
    );
  });

  // Agregamos listener para las imagenes
  const overlay = document.getElementById("overlay");
  document.querySelectorAll(".grid .item img").forEach((elemento) => {
    elemento.addEventListener("click", () => {
      const ruta = elemento.getAttribute("src");
      const description = elemento.parentNode.parentNode.dataset.description;

      overlay.classList.add("activo");
      document.querySelector("#overlay img").src = ruta;
      document.querySelector("#overlay .description").innerHTML = description;
    });
  });

  // Eventlistener del boton de cerrar
  document.querySelector("#btn-close-popup").addEventListener("click", () => {
    overlay.classList.remove("activo");
  });

  // Eventlistener del overlay
  overlay.addEventListener("click", (evento) => {
    evento.target.id === "overlay" ? overlay.classList.remove("activo") : "";
  });
});

/******** SCRIPT DE APERTURA Y CIERRE DE MENU MOBILE******* */
((d) => {
  const $btnMenu = d.querySelector(".menu-btn"),
    $menu = d.querySelector(".navbar");

  $btnMenu.addEventListener("click", (e) => {
    $btnMenu.firstElementChild.classList.toggle("none");
    $btnMenu.lastElementChild.classList.toggle("none");
    $menu.classList.toggle("is-active");
  });

  d.addEventListener("click", (e) => {
    if (!e.target.matches(".menu a")) return false;

    $btnMenu.firstElementChild.classList.remove("none");
    $btnMenu.lastElementChild.classList.add("none");
    $menu.classList.remove("is-active");
  });
})(document);

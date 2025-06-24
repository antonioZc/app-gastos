import { abrirFormulario } from "./btnAgregarGasto";
import cargarGastos from "./cargarGastos";
import cargarTotalGastado from "./cargarTotalGastado";

const contenedorGastos = document.getElementById("gastos");

contenedorGastos.addEventListener("click", (e) => {
  const objetivo = e.target.closest(".gasto");
  if (e.target.closest(".gasto")) {
    if (objetivo.scrollLeft > 0) {
      objetivo.querySelector(".gasto__info").scrollIntoView({
        inline: "start",
        behavior: "smooth",
        block: "nearest",
      });
    } else {
      objetivo.querySelector(".gasto__acciones").scrollIntoView({
        inline: "start",
        behavior: "smooth",
        block: "nearest",
      });
    }
  }

  if (e.target.closest("[data-accion='editar-gasto']")) {
    const id = objetivo.dataset.id;
    const gastosGuardados = JSON.parse(window.localStorage.getItem("gastos"));

    let cantidad = "";
    let descripcion = "";

    if (gastosGuardados) {
      gastosGuardados.forEach((gasto) => {
        if (gasto.id === id) {
          cantidad = gasto.precio;
          descripcion = gasto.descripcion;
        }
      });

      document.querySelector("#formulario-gasto #descripcion").value =
        descripcion;
      document.querySelector("#formulario-gasto #precio").value = cantidad;
      document.querySelector("#formulario-gasto").dataset.id = id;
      abrirFormulario("editar-gasto");
    }
  }

  if (e.target.closest("[data-accion='eliminar-gasto']")) {
    const id = objetivo.dataset.id;
    const gastosGuardados = JSON.parse(window.localStorage.getItem("gastos"));
    let gastoElimar;

    gastosGuardados.forEach((gasto) => {
      if (gasto.id === id) {
        gastoElimar = gasto;
      }
    });
    let indexGastoEliminar = gastosGuardados.indexOf(gastoElimar);
    const gastosActualizados = gastosGuardados.filter((gasto) => {
      if (gastosGuardados.indexOf(gasto) !== indexGastoEliminar) {
        return gasto;
      }
    });
    if (gastosActualizados.length > 0) {
      window.localStorage.setItem("gastos", JSON.stringify(gastosActualizados));
    } else {
      window.localStorage.removeItem("gastos");
    }

    cargarGastos();
    cargarTotalGastado();
  }
});

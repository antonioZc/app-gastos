import { abrirFormulario } from "./btnAgregarGasto";
import cargarGastos from "./cargarGastos";
import cargarTotalGastado from "./cargarTotalGastado";

const contenedorGastos = document.getElementById("gastos");

// Eventos que se pueden realizar con los gastos (editar, eliminar)
contenedorGastos.addEventListener("click", (e) => {
  const objetivo = e.target.closest(".gasto");
  /*
  Si presionamos el contenedor del gasto hacemos un scroll para mostrar
  los botones de editar y eliminar.

  Si lo presionamos nuevamente hará el scroll para esconder los botones 
  nuevamente
 */
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

  // si presionamos en editar gasto
  if (e.target.closest("[data-accion='editar-gasto']")) {
    const id = objetivo.dataset.id;
    // obtenemos los gastos guardados en el localStorage
    const gastosGuardados = JSON.parse(window.localStorage.getItem("gastos"));

    let cantidad = "";
    let descripcion = "";

    // comprobamos de que hayan gastos guardados
    if (gastosGuardados) {
      gastosGuardados.forEach((gasto) => {
        if (gasto.id === id) {
          // obtenemos el precio y la descripcion del gasto almacenado en local
          cantidad = gasto.precio;
          descripcion = gasto.descripcion;
        }
      });

      // mostramos la informacion en los campos del formulario de edicion
      document.querySelector("#formulario-gasto #descripcion").value =
        descripcion;
      document.querySelector("#formulario-gasto #precio").value = cantidad;
      document.querySelector("#formulario-gasto").dataset.id = id;
      abrirFormulario("editar-gasto");
    }
  }

  // si presionamos en editar gasto
  if (e.target.closest("[data-accion='eliminar-gasto']")) {
    const id = objetivo.dataset.id;
    // obtenemos los gastos guardados en el localStorage
    const gastosGuardados = JSON.parse(window.localStorage.getItem("gastos"));
    let gastoEliminar;

    // obtenemos el gasto a eliminar de los gastos en local
    gastosGuardados.forEach((gasto) => {
      if (gasto.id === id) {
        gastoEliminar = gasto;
      }
    });
    let indexGastoEliminar = gastosGuardados.indexOf(gastoEliminar);
    // creamos un nuevo arreglo de gastos pero sin el que se ha eliminado
    const gastosActualizados = gastosGuardados.filter((gasto) => {
      if (gastosGuardados.indexOf(gasto) !== indexGastoEliminar) {
        return gasto;
      }
    });
    // si hay mas gastos aparte del eliminado se guardan en local, de otra forma se eliminan
    if (gastosActualizados.length > 0) {
      window.localStorage.setItem("gastos", JSON.stringify(gastosActualizados));
    } else {
      window.localStorage.removeItem("gastos");
    }

    cargarGastos();
    cargarTotalGastado();
  }
});

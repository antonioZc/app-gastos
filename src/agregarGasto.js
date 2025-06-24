import { cerrarFormulario } from "./btnAgregarGasto";
import { v4 as uuidv4 } from "uuid";
import cargarGastos from "./cargarGastos";
import cargarTotalGastado from "./cargarTotalGastado";

const btnAgregarGasto = document.querySelector(".formulario-gasto__btn");
const descripcion = document.getElementById("descripcion");
const precio = document.getElementById("precio");
const regExpDescripcion = /^[a-zA-Z0-9\_\- ]{4,30}$/;
const regExpPrecio = /^\d+(\.\d+)?$/;
const formulario = document.getElementById("formulario-gasto");

const comprobarDescripcion = () => {
  if (!regExpDescripcion.test(descripcion.value)) {
    descripcion.classList.add("formulario-gasto__input--error");
    descripcion
      .closest(".formulario-gasto__grupo")
      .querySelector(".formulario-gasto__leyenda")
      .classList.add("formulario-gasto__leyenda--active");
    return false;
  } else {
    descripcion.classList.remove("formulario-gasto__input--error");
    descripcion
      .closest(".formulario-gasto__grupo")
      .querySelector(".formulario-gasto__leyenda")
      .classList.remove("formulario-gasto__leyenda--active");
  }
  return true;
};

const comprobarPrecio = () => {
  if (!regExpPrecio.test(precio.value)) {
    precio.classList.add("formulario-gasto__input--error");
    precio
      .closest(".formulario-gasto__grupo")
      .querySelector(".formulario-gasto__leyenda")
      .classList.add("formulario-gasto__leyenda--active");
    return false;
  } else {
    precio.classList.remove("formulario-gasto__input--error");
    precio
      .closest(".formulario-gasto__grupo")
      .querySelector(".formulario-gasto__leyenda")
      .classList.remove("formulario-gasto__leyenda--active");
  }

  return true;
};

descripcion.addEventListener("blur", () => {
  comprobarDescripcion();
});

descripcion.addEventListener("keyup", () => {
  comprobarDescripcion();
});

precio.addEventListener("blur", () => {
  comprobarPrecio();
});

precio.addEventListener("keyup", () => {
  comprobarPrecio();
});

btnAgregarGasto.addEventListener("click", (e) => {
  e.preventDefault();

  if (comprobarDescripcion() && comprobarPrecio()) {
    const gastosActualizados = JSON.parse(
      window.localStorage.getItem("gastos")
    );
    if (formulario.dataset.tipo === "agregar-gasto") {
      let gasto = {
        id: uuidv4(),
        fecha: new Date(),
        descripcion: descripcion.value,
        precio: precio.value,
      };

      if (gastosActualizados) {
        const nuevosGastos = [...gastosActualizados, gasto];
        window.localStorage.setItem("gastos", JSON.stringify(nuevosGastos));
      } else {
        window.localStorage.setItem("gastos", JSON.stringify([{ ...gasto }]));
      }
    } else {
      gastosActualizados.forEach((gasto) => {
        if (gasto.id === formulario.dataset.id) {
          gasto.descripcion = descripcion.value;
          gasto.precio = precio.value;
        }
        window.localStorage.setItem(
          "gastos",
          JSON.stringify(gastosActualizados)
        );
      });
    }
    descripcion.value = "";
    precio.value = "";
    cerrarFormulario();
    cargarGastos();
    cargarTotalGastado();
  }
});

import { cerrarFormulario } from "./btnAgregarGasto";
// api para agregar un identificador unico a cada gasto
import { v4 as uuidv4 } from "uuid";
import cargarGastos from "./cargarGastos";
import cargarTotalGastado from "./cargarTotalGastado";

const btnAgregarGasto = document.querySelector(".formulario-gasto__btn");
const descripcion = document.getElementById("descripcion");
const precio = document.getElementById("precio");
const regExpDescripcion = /^[a-zA-Z0-9\_\- ]{4,30}$/;
const regExpPrecio = /^\d+(\.\d+)?$/;
const formulario = document.getElementById("formulario-gasto");

// funcion para comprobar que la descripcion cumple con la regExp
// mostramos mensaje de error en caso de que no cumpla
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

// funcion para comprobar que el precio cumple con la regExp
// mostramos mensaje de error en caso de que no cumpla
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

// eventos descripcion y precion
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
// FIN eventos descripcion y precion

// evento para agregar el gasto o editarlo
btnAgregarGasto.addEventListener("click", (e) => {
  e.preventDefault();

  if (comprobarDescripcion() && comprobarPrecio()) {
    const gastosActualizados = JSON.parse(
      window.localStorage.getItem("gastos")
    );

    // comprobamos de que la accion sea agregar un nuevo gasto
    if (formulario.dataset.tipo === "agregar-gasto") {
      // creamos un objeto con la información del gasto
      let gasto = {
        id: uuidv4(),
        fecha: new Date(),
        descripcion: descripcion.value,
        precio: precio.value,
      };

      // si ya habian gastos
      if (gastosActualizados) {
        // le agregamos a los gastos anteriores el nuevo gasto
        const nuevosGastos = [...gastosActualizados, gasto];
        // y lo guardamos en localStorage
        window.localStorage.setItem("gastos", JSON.stringify(nuevosGastos));

        // si no habían gastos
      } else {
        // guardamos en localStorage el gato agregado
        window.localStorage.setItem("gastos", JSON.stringify([{ ...gasto }]));
      }

      // si no es agregar otro gasto, es que vamos a editar uno existente
    } else {
      // revisamos los gastos almacenados en el local storage (gastosActualizados)
      gastosActualizados.forEach((gasto) => {
        // comprobamos que el id del gasto a editar sea igual a alguno almacenado en local
        if (gasto.id === formulario.dataset.id) {
          // cambiamos los datos del gasti
          gasto.descripcion = descripcion.value;
          gasto.precio = precio.value;
        }
        // en cualquier caso se actualizan los gastos almacenados
        window.localStorage.setItem(
          "gastos",
          JSON.stringify(gastosActualizados)
        );
      });
    }

    // limpiamos los formularios
    descripcion.value = "";
    precio.value = "";
    cerrarFormulario();
    cargarGastos();
    cargarTotalGastado();
  }
});

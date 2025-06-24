const btnAgregarGasto = document.getElementById("toggle-form-gasto");
const formulario = document.getElementById("formulario-gasto");

const abrirFormulario = (tipo = "agregar-gasto") => {
  if (tipo === "editar-gasto") {
    formulario.querySelector(".formulario-gasto__titulo").innerText =
      "Editar Gasto";
    formulario.querySelector(".formulario-gasto__btn").innerText =
      "Editar gasto";
    formulario.dataset.tipo = "editar-gasto";
  } else {
    formulario.querySelector(".formulario-gasto__titulo").innerText =
      "Agregar Gasto";
    formulario.querySelector(".formulario-gasto__btn").innerText =
      "Agregar gasto";
    formulario.dataset.tipo = "agregar-gasto";
  }
  formulario.classList.add("formulario-gasto--active");
  btnAgregarGasto.classList.add("agregar-gasto__btn--active");
};

const cerrarFormulario = () => {
  formulario.classList.remove("formulario-gasto--active");
  btnAgregarGasto.classList.remove("agregar-gasto__btn--active");
};

btnAgregarGasto.addEventListener("click", (e) => {
  if (!btnAgregarGasto.classList.contains("agregar-gasto__btn--active")) {
    abrirFormulario();
  } else {
    cerrarFormulario();
  }
});

export { abrirFormulario, cerrarFormulario };

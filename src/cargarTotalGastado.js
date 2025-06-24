import { parseISO } from "date-fns";
import { isThisMonth } from "date-fns/isThisMonth";

const cargarTotalGastado = () => {
  const total = document.getElementById("total-gastado");
  const gastos = JSON.parse(window.localStorage.getItem("gastos"));
  const formatearMoneda = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  });

  total.innerHTML = "";
  let variableTotal = 0;
  if (gastos) {
    const gastosDelMes = gastos.filter((gasto) => {
      if (isThisMonth(parseISO(gasto.fecha))) {
        return gasto;
      }
    });

    gastosDelMes.forEach((gasto) => {
      variableTotal += parseFloat(gasto.precio);
    });
  }
  total.innerHTML = formatearMoneda.format(variableTotal);
};

export default cargarTotalGastado;

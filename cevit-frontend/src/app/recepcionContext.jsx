import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { RutaApi } from "../api/url";
const MySwal = withReactContent(Swal);

export const CrearRecepcion = async (oRecepcion) => {
  try {
    const SetRecepcion = {
      oFechaMuestreo: oRecepcion.fechaMuestreo,
      oFechaRecepcion: oRecepcion.fechaRecepcion,
      oFolio: oRecepcion.folio,
      oTotalMuestras: oRecepcion.totalMuestras,
      oClienteID: oRecepcion.clienteID,
    };
    await RutaApi.post("/externo", SetRecepcion).then(
      MySwal.fire({
        title: "Recepcion de muestras completa",
        text: "La recepcion ha sido creada con éxito",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => window.location.replace("/RecepcionForm"))
    );
  } catch (error) {
    MySwal.fire({
      title: "Error",
      text: "Ups, ha ocurrido un problema",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};

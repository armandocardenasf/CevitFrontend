import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AuthRutaApi } from "../api/url";
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
    await AuthRutaApi.post("/recepcion", SetRecepcion).then(
      MySwal.fire({
        title: "Recepción de muestras completa",
        text: "La recepción ha sido creada con éxito",
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
export const UpdateRecepcion = async (oRecepcion) => {
  try {
    const SetRecepcion = {
      oID: oRecepcion.id,
      oFechaMuestreo: oRecepcion.fechaMuestreo,
      oFechaRecepcion: oRecepcion.fechaRecepcion,
      oFechaInforme: oRecepcion.fechaInforme,
      oFechaAnalisis: oRecepcion.fechaAnalisis,
      oFolio: oRecepcion.folio,
      oTotalMuestras: oRecepcion.totalMuestras,
      oClienteID: oRecepcion.clienteID,
      oTipoMuestra: oRecepcion.tipoMuestra,
      oObservaciones: oRecepcion.observaciones,
    };
    await AuthRutaApi.put("/recepcion", SetRecepcion).then(
      MySwal.fire({
        title: "Edicion completa",
        text: "Los datos se han actualizado!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => window.history.back())
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
export const UpdateEstadoRecepcion = async (oRecepcion) => {
  try {
    console.log("===", oRecepcion);
    const SetRecepcion = {
      oID: oRecepcion.oID,
      oEnviado: oRecepcion.oEnviado,
    };
    await AuthRutaApi.put("/recepcion/update/estado", SetRecepcion).then(
      MySwal.fire({
        title: "Edicion completa",
        text: "Los datos se han actualizado!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => window.location.reload())
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

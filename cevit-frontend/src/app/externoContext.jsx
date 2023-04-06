import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { RutaApi } from "../api/url";
const MySwal = withReactContent(Swal);

export const CrearExterno = async (oExterno) => {
  try {
    const SetExterno = {
      oNoFolio: oExterno.NoFolio,
      oFechaMuestreo: oExterno.FechaMuestreo,
      oFechaRecepcion: oExterno.FechaMuestreo,
      oRazonSocial: oExterno.RazonSocial,
      oRfc: oExterno.Rfc,
      oTelefono: oExterno.Telefono,
      oCorreo: oExterno.Correo,
      oAtencion: oExterno.Atencion,
      oUsuarioId: oExterno.UsuarioId,
    };
    await RutaApi.post("/externo", SetExterno).then(
      MySwal.fire({
        title: "Externo creado",
        text: "El externo ha sido creado con éxito",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => window.location.replace("/ExternosForm"))
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
export const EditarExterno = async (oExterno) => {
  try {
    const SetExterno = {
      oExternoId: oExterno.id,
      oNoFolio: oExterno.NoFolio,
      oFechaMuestreo: oExterno.FechaMuestreo,
      oFechaRecepcion: oExterno.FechaMuestreo,
      oRazonSocial: oExterno.RazonSocial,
      oRfc: oExterno.Rfc,
      oTelefono: oExterno.Telefono,
      oCorreo: oExterno.Correo,
      oAtencion: oExterno.Atencion,
      oUsuarioId: oExterno.UsuarioId,
    };
    await RutaApi.put("/externo", SetExterno).then(
      MySwal.fire({
        title: "Externo creado",
        text: "El usuario ha sido creado con éxito",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => window.location.replace("/ExternosForm"))
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
export const EliminarExterno = async (oID) => {
  RutaApi.put("/externo/delete", { oExternoId: oID })
    .then((res) => {
      console.log(res);
      MySwal.fire({
        title: "Accion exitosa",
        text: "El registro ha sido eliminado con exito",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        window.location.reload();
      });
    })
    .catch((error) => {
      MySwal.fire({
        title: "Error",
        text: "No se pudo eliminar el componente: " + error,
        icon: "error",
      });
    });
};

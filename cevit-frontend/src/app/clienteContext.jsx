import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AuthRutaApi } from "../api/url";
const MySwal = withReactContent(Swal);

export const CrearCliente = async (oCliente) => {
  try {
    const SetCliente = {
      oNombre: oCliente.nombre,
      oDireccion: oCliente.direccion,
      oRfc: oCliente.rfc,
      oExternoId: oCliente.externoId,
      oSuscripcionId: oCliente.suscripcionId,
    };
    await AuthRutaApi.post("/cliente", SetCliente).then(
      MySwal.fire({
        title: "Cliente creado",
        text: "El cliente ha sido creado con éxito",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => window.location.replace("/ClientesForm"))
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
export const EditarCliente = async (oCliente) => {
  try {
    const SetCliente = {
      oClienteId: oCliente.id,
      oNombre: oCliente.nombre,
      oDireccion: oCliente.direccion,
      oRfc: oCliente.rfc,
      oExternoId: oCliente.externoId,
      oSuscripcionId: oCliente.suscripcionId,
    };
    await AuthRutaApi.put("/cliente", SetCliente).then(
      MySwal.fire({
        title: "Cliente Actualizado",
        text: "El cliente ha sido actualizado con éxito",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => window.location.replace("/TablaClientes"))
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
export const EliminarCliente = async (id) => {
  try {
    const SetCliente = {
      oClienteId: id,
    };
    await AuthRutaApi.put("/cliente/delete", SetCliente).then(
      MySwal.fire({
        title: "Acción exitosa",
        text: "El registro ha sido eliminado con éxito",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => window.location.replace("/TablaClientes"))
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

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { RutaApi } from "../api/url";
const MySwal = withReactContent(Swal);

export const CrearExterno = async (oExterno) => {
  try {
    const SetExterno = {
      oNoFolio:oExterno.NoFolio,
      oFechaMuestreo:oExterno.FechaMuestreo,
      oFechaRecepcion:oExterno.FechaMuestreo,
      oRazonSocial,
      oRfc,
      oTelefono,
      oCorreo,
      oAtencion,
      oUsuarioId,
    };
    await RutaApi.post("/usuario", SetExterno).then(
      MySwal.fire({
        title: "Usuario creado",
        text: "El usuario ha sido creado con éxito",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => window.location.replace("/form"))
    );
    //TODO: Pop Mensaje + Redireccionamiento
  } catch (error) {
    MySwal.fire({
      title: "Error",
      text: "Ups, ha ocurrido un problema",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};

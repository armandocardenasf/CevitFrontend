import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AuthRutaApi } from "../api/url";
const MySwal = withReactContent(Swal);

export const EditarIncertidumbre = async (oID, oValor) => {
  try {
    const SetIncertidumbre = {
      oIdCalculo: oID,
      oValor: oValor,
    };
    await AuthRutaApi.put("/analisis", SetIncertidumbre).then(
      MySwal.fire({
        title: "Valor Actualizado",
        text: "El registro ha sido actualizado con éxito",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        window.location.reload();
      })
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

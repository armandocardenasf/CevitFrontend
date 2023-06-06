import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { RutaApi, AuthRutaApi } from "../api/url";
import store from "./store";
import authSlice from "../tools/authSlice";
import { setTokens } from "../tools/authSlice";
const MySwal = withReactContent(Swal);

export const LoginModule = async (username, password) => {
  const oBody = { oUser: username, oPass: password };
  let SetUsuario = {
    id: "",
    nombre: "",
    username: "",
    rol: "",
    isActive: true,
    isLoged: false,
  };
  const oUsuario = await RutaApi.post("/usuario/login", oBody);
  const tokens = await RutaApi.post("/usuario/tokens", oBody);
  if (oUsuario.data[0][0].stado !== 40 && tokens.status === 200) {
    MySwal.fire({
      title: "¡Éxito!",
      text: "Bienvenido",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
    SetUsuario = {
      id: oUsuario.data[0][0].uID,
      nombre: oUsuario.data[0][0].uNombre,
      username: username,
      rol: oUsuario.data[0][0].uRol,
      isActive: true,
      isLoged: true,
    };

    // store with redux.
    console.log(tokens.data);
    store.dispatch(setTokens(tokens.data));
  } else {
    MySwal.fire({
      title: "Error!",
      text: "Usuario o contraseña incorrectos",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }
  return SetUsuario;
};
export const CrearUsuario = async (oUsuario) => {
  try {
    const SetUsuario = {
      oNombre: oUsuario.nombre,
      oApellido: oUsuario.apellido,
      oCorreo: oUsuario.username,
      oPass: oUsuario.password,
      oTelefono: oUsuario.telefono,
      oRolId: oUsuario.rol,
    };
    await AuthRutaApi.post("/usuario", SetUsuario).then(
      MySwal.fire({
        title: "Usuario creado",
        text: "El usuario ha sido creado con éxito",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => window.location.replace("/UsuariosForm"))
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
export const EliminarUsuario = async (oID) => {
  AuthRutaApi.put("/usuario/delete", { oUsuarioId: oID })
    .then((res) => {
      console.log(res);
      MySwal.fire({
        title: "Acción exitosa",
        text: "El registro ha sido eliminado con éxito",
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
export const UpdateUsuario = async (oUsuario) => {
  const SetUsuario = {
    oUsuarioId: oUsuario.id,
    oNombre: oUsuario.nombre,
    oApellido: oUsuario.apellido,
    oCorreo: oUsuario.username,
    oTelefono: oUsuario.telefono,
    oRolId: oUsuario.rol,
  };
  AuthRutaApi.put("/usuario", SetUsuario)
    .then((res) => {
      MySwal.fire({
        title: "Acción exitosa",
        text: "El usuario ha sido actualizado con éxito",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => window.location.replace("/TablaUsuarios"));
    })
    .catch((error) => {
      MySwal.fire({
        title: "Error",
        text: "Ups, ha ocurrido un problema",
        icon: "error",
        confirmButtonText: "OK",
      });
    });
};
export const UpdateUsuarioPass = async (oID, oPassword) => {
  const SetUsuario = {
    oUsuarioId: oID,
    oPass: oPassword,
  };
  AuthRutaApi.put("/usuario/pass", SetUsuario)
    .then((res) => {
      MySwal.fire({
        title: "Acción exitosa",
        text: "El usuario ha sido actualizado con éxito",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => window.location.replace("/TablaUsuarios"));
    })
    .catch((error) => {
      MySwal.fire({
        title: "Error",
        text: "Ups, ha ocurrido un problema",
        icon: "error",
        confirmButtonText: "OK",
      });
    });
};

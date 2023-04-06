import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../scenes/global/dashboard/index";
import TablaUsuarios from "../scenes/tablas/TablaUsuarios";
import UsuarioForm from "../scenes/form/Usuario/UsuarioForm";
import UsuarioEditForm from "../scenes/form/Usuario/UsuarioEditForm";
import TablaExternos from "../scenes/tablas/TablaExternos";
import ExternoForm from "../scenes/form/Externo/ExternoForm";
import ExternoEditForm from "../scenes/form/Externo/ExternoEditForm";
import TablaClientes from "../scenes/tablas/TablaClientes";
import ClienteForm from "../scenes/form/Cliente/ClienteForm";
import ClienteEditForm from "../scenes/form/Cliente/ClienteEditForm";
import Login from "../scenes/Login";
import RutaPrivada from "./RutaPrivada";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route element={<RutaPrivada />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/TablaUsuarios" element={<TablaUsuarios />} />
        <Route path="/EditUsuario" element={<UsuarioEditForm />} />
        <Route path="/UsuariosForm" element={<UsuarioForm />} />
        <Route path="/TablaExternos" element={<TablaExternos />} />
        <Route path="/ExternosForm" element={<ExternoForm />} />
        <Route path="/EditExterno" element={<ExternoEditForm />} />
        <Route path="/TablaClientes" element={<TablaClientes />} />
        <Route path="/ClientesForm" element={<ClienteForm />} />
        <Route path="/EditClientes" element={<ClienteEditForm />} />
      </Route>
    </Routes>
  );
};

export default Router;

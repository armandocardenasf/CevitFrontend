import { Routes, Route, Navigate } from "react-router-dom";
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
import AnalisisForm from "../scenes/form/Analisis/AnalisisForm";
import Resultados from "../scenes/global/Resultados/Resultados";
import TablaAnalisis from "../scenes/tablas/TablaAnalisis";
import ResultadosByCliente from "../scenes/global/Resultados/ResultadosByCliente";
import RecepcionForm from "../scenes/form/Recepcion/RecepcionForm";
import RecepcionEditForm from "../scenes/form/Recepcion/RecepcionEditForm";
import TablaResultados from "../scenes/tablas/TablaResultados";
import DesviacionForm from "../scenes/form/Desviacion/DesviacionForm";
import TablaIncertidumbre from "../scenes/tablas/TablaIncertidumbre";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route element={<RutaPrivada />}>
        <Route path="/dashboard" element={<Resultados />} />
        <Route path="/TablaUsuarios" element={<TablaUsuarios />} />
        <Route path="/EditUsuario" element={<UsuarioEditForm />} />
        <Route path="/UsuariosForm" element={<UsuarioForm />} />
        <Route path="/TablaExternos" element={<TablaExternos />} />
        <Route path="/ExternosForm" element={<ExternoForm />} />
        <Route path="/EditExterno" element={<ExternoEditForm />} />
        <Route path="/TablaClientes" element={<TablaClientes />} />
        <Route path="/ClientesForm" element={<ClienteForm />} />
        <Route path="/AnalisisByCliente" element={<ResultadosByCliente />} />
        <Route path="/EditClientes" element={<ClienteEditForm />} />
        <Route path="/AnalisisForm" element={<AnalisisForm />} />
        <Route path="/TablaAnalisis/:id" element={<TablaAnalisis />} />
        <Route path="/RecepcionForm" element={<RecepcionForm />} />
        <Route path="/EditRecepcion" element={<RecepcionEditForm />} />
        <Route path="/TablaResultados/:id" element={<TablaResultados />} />
        <Route
          path="/TablaIncertidumbre/:id"
          element={<TablaIncertidumbre />}
        />
        <Route path="/DesviacionForm" element={<DesviacionForm />} />
      </Route>
    </Routes>
  );
};

export default Router;

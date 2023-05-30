import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";

const RutaPrivada = () => {
  const oUsuarios = useSelector((state) => state.usuario);
  return (
    <>
      {oUsuarios.user.isLoged === true ? <Layout /> : <Navigate to="/Login" />}
    </>
  );
};

export default RutaPrivada;

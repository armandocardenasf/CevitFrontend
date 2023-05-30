import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import { Box } from "@mui/material";

const RutaPrivada = () => {
  const oUsuarios = useSelector((state) => state.usuario);
  return (
    <>
      <Box>
        {oUsuarios.user.isLoged === true ? (
          <Layout />
        ) : (
          <Navigate to="/Login" />
        )}
      </Box>
    </>
  );
};

export default RutaPrivada;

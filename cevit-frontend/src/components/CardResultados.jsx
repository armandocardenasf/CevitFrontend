import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { tokens } from "../theme";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const CardResultados = ({ oResultado }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const oDelete = (id) => {
    /**
     * TODO:Implementar logica para eliminar (Crear archivo resultadoContext en carpeta app)
     * TODO:En archivo resultadoContext crear metodos que ejecuten request a la API (Ver otros archivos context como guia)
     */
    console.log(id);
  };
  const oEditar = (oAnalisis) => {
    /**
     * TODO:Implementar nuevo archivo pantalla para visualizar un formulario
     * TODO:Ver estructura de archivos form a modo de guia (scenes -> form -> Cualquier entidad[Analisis,Cliente,Externo,Usuario] -> EditForm)
     * TODO:Metodo de navegacion para enviar los datos seleccionados --> navigate("/AnalisisEditForm", { state: data });
     */
    console.log(oAnalisis);
  };
  const oVerDetalles = (oAnalisis) => {
    navigate("/TablaAnalisis/" + oAnalisis.rID, { state: oAnalisis });
    console.log(oAnalisis);
  };
  return (
    <Card
      sx={{ minWidth: 275 }}
      key={oResultado.rID}
      style={{
        backgroundColor:
          oResultado.rTipoMuestra === 1
            ? colors.secondary
            : colors.lightSecondary,
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" color={colors.primary} gutterBottom>
            REGISTRO No. {oResultado.rID}
          </Typography>
          <Typography color={colors.primary} gutterBottom>
            {oResultado.rEnviado === 0 ? (
              <AccessTimeIcon sx={{ color: colors.primary }} />
            ) : oResultado.rEnviado === 1 ? (
              <CheckIcon sx={{ color: colors.primary }} />
            ) : (
              <DoneAllIcon sx={{ color: colors.primary }} />
            )}
          </Typography>
        </Box>
        <Typography variant="h5" component="div" color={colors.white}>
          {oResultado.rMuestra}
        </Typography>
        <Typography variant="h5" sx={{ mb: 1.5 }} color={colors.white}>
          {oResultado.rTipoMuestra === 1 ? "VINO" : "MOSTO"}
        </Typography>
        <Typography variant="h5" color={colors.white}>
          {oResultado.rEnviado === 0
            ? "REVISION PENDIENTE"
            : oResultado.rEnviado === 1
            ? "REVISION MEDIA"
            : "REVISION TOTAL"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          type="submit"
          color="primary"
          onClick={() => oVerDetalles(oResultado)}
        >
          <Typography variant="h5">VER DETALLES</Typography>
        </Button>
        <Button
          type="submit"
          color="primary"
          onClick={() => oEditar(oResultado)}
        >
          <Typography variant="h5">EDITAR</Typography>
        </Button>
        <Button
          type="submit"
          color="primary"
          onClick={() => oDelete(oResultado.rID)}
        >
          <Typography variant="h5">ELIMINAR</Typography>
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardResultados;

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
    navigate("/EditRecepcion", { state: oAnalisis });
  };
  const oVerDetalles = (oAnalisis) => {
    navigate("/TablaResultados/" + oAnalisis, { state: oAnalisis });
  };
  return (
    <Card
      sx={{ minWidth: 275 }}
      key={oResultado.ID}
      style={{
        backgroundColor:
          oResultado.tipoMuestra === 1
            ? colors.secondary
            : colors.lightSecondary,
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" color={colors.primary} gutterBottom>
            REGISTRO No. {oResultado.ID}
          </Typography>
          <Typography color={colors.primary} gutterBottom>
            {oResultado.Enviado === 0 ? (
              <AccessTimeIcon sx={{ color: colors.primary }} />
            ) : oResultado.Enviado === 1 ? (
              <CheckIcon sx={{ color: colors.primary }} />
            ) : (
              <DoneAllIcon sx={{ color: colors.primary }} />
            )}
          </Typography>
        </Box>
        <Typography variant="h5" component="div" color={colors.white}>
          {oResultado.folio}
        </Typography>
        <Typography variant="h5" sx={{ mb: 1.5 }} color={colors.white}>
          {oResultado.tipoMuestra === 1 ? "VINO" : "MOSTO"}
        </Typography>
        <Typography variant="h5" sx={{ mb: 1.5 }} color={colors.white}>
          {"RECEPCION: " + oResultado.fechaRecepcion}
        </Typography>
        <Typography variant="h5" sx={{ mb: 1.5 }} color={colors.white}>
          {"MUESTREO: " + oResultado.fechaMuestreo}
        </Typography>
        <Typography variant="h5" color={colors.white}>
          {oResultado.Enviado === 0
            ? "REVISIÓN PENDIENTE"
            : oResultado.Enviado === 1
            ? "REVISIÓN MEDIA"
            : "REVISIÓN TOTAL"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          type="submit"
          color="primary"
          onClick={() => oVerDetalles(oResultado.folio)}
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
          onClick={() => oDelete(oResultado.ID)}
        >
          <Typography variant="h5">ELIMINAR</Typography>
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardResultados;

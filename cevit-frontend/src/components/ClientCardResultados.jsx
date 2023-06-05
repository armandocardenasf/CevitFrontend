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
import { AuthRutaApi } from "../api/url";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);

const ClientCardResultados = ({ oResultado }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const sendEmail = (id) => {
    /*
     Implement sendEmail route and also stored procedure.
     Update sendEmail form backend and send id in request to backend.
     TODO
    */

    mySwal
      .fire({
        title: "¿Estás seguro?",
        text: "Esta acción enviará un correo electrónico al externo asociado a este registro",
        icon: "warning",
        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          AuthRutaApi.post("/email/send", { oIdRecepcion: id }).then(
            (response) => {
              mySwal
                .fire(
                  "Success",
                  "The email was sent successfully to the recipient",
                  "success"
                )
                .then(() => window.location.reload())
                .catch((error) => {
                  mySwal.fire("Error", "Error sending email", "error");
                });
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          mySwal.fire("Cancelación", "Operación cancelada", "error");
        }
      });
  };
  const oEditar = (oAnalisis) => {
    navigate("/EditRecepcion", { state: oAnalisis });
  };
  const oVerDetalles = (oAnalisis, id) => {
    const analysis = {
      name: oAnalisis,
      id: id,
    };
    navigate("/TablaResultados/" + oAnalisis, { state: analysis });
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
          onClick={() => oVerDetalles(oResultado.folio, oResultado.ID)}
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
          onClick={() => sendEmail(oResultado.ID)}
        >
          <Typography variant="h5">EMAIL</Typography>
        </Button>
      </CardActions>
    </Card>
  );
};

export default ClientCardResultados;

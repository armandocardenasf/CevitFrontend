import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { tokens } from "../theme";
import { useTheme } from "@emotion/react";

const CardResultados = ({ oResultado }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Card sx={{ minWidth: 275 }} key={oResultado.rID}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          REGISTRO No. {oResultado.rID}
        </Typography>
        <Typography variant="h5" component="div">
          {oResultado.rMuestra}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {oResultado.rTipoMuestra == 1 ? "VINO" : "MOSTO"}
        </Typography>
        <Typography variant="body2">
          {oResultado.rEnviado == 0
            ? "REVISION PENDIENTE"
            : oResultado.rEnviado == 1
            ? "REVISION MEDIA"
            : "REVISION TOTAL"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">VER DETALLES</Button>
      </CardActions>
    </Card>
  );
};

export default CardResultados;

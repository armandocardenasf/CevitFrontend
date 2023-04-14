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
    /**
     * TODO:Implementar nuevo archivo pantalla para visualizar una tabla con toda la informacion del objeto seleccionado
     * TODO:Ver estructura de archivos Tabla como guia (scenes -> tablas)
     * TODO:Metodo de navegacion para enviar los datos seleccionados --> navigate("/TablaAnalisis", { state: data });
     */
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
        <Typography sx={{ fontSize: 14 }} color={colors.primary} gutterBottom>
          REGISTRO No. {oResultado.rID}
        </Typography>
        <Typography variant="h5" component="div" color={colors.white}>
          {oResultado.rMuestra}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color={colors.white}>
          {oResultado.rTipoMuestra === 1 ? "VINO" : "MOSTO"}
        </Typography>
        <Typography variant="body2" color={colors.white}>
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
          VER DETALLES
        </Button>
        <Button
          type="submit"
          color="primary"
          onClick={() => oEditar(oResultado)}
        >
          EDITAR
        </Button>
        <Button
          type="submit"
          color="primary"
          onClick={() => oDelete(oResultado.rID)}
        >
          ELIMINAR
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardResultados;

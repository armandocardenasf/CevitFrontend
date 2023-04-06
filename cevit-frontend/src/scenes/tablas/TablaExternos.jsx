import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { RutaApi } from "../../api/url";
import { EliminarExterno } from "../../app/externoContext";

const TablaExternos = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleEdit = (data) => {
    navigate("/EditExterno", { state: data });
  };

  const handleDelete = (id) => {
    EliminarExterno(id);
  };
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "no_folio",
      headerName: "No. Folio",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "fecha_muestreo",
      headerName: "Fecha de Muestreo",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "fecha_recepcion",
      headerName: "Fecha de Recepcion",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "rfc",
      headerName: "RFC",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "atencion",
      headerName: "Atencion",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 2,
      renderCell: (cellValues) => {
        return (
          <>
            <Button
              type="submit"
              color="wine"
              variant="contained"
              onClick={() => handleEdit(cellValues.row)}
              sx={{ marginRight: 1 }}
            >
              EDITAR
            </Button>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              onClick={() => handleDelete(cellValues.row.id)}
            >
              ELIMINAR
            </Button>
          </>
        );
      },
    },
  ];
  const [externos, setExternos] = useState([]);
  useEffect(() => {
    RutaApi.get("/externo").then((externo) => setExternos(externo.data[0]));
  }, []);
  return (
    <Box m="20px">
      <Header
        title="Externos"
        subtitle="Administracion de los externos existentes"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.white,
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.secondary,
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.grey,
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.secondary,
          },
          "& .MuiCheckbox-root": {
            color: `${colors.secondary} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.white} !important`,
          },
        }}
      >
        <DataGrid
          getRowId={(externo) => externo.id}
          rows={externos}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};
export default TablaExternos;

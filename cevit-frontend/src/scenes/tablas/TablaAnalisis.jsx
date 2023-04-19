import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { RutaApi } from "../../api/url";
import { EliminarCliente } from "../../app/clienteContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { EditarAnalisis } from "../../app/analysisContext";

const MySwal = withReactContent(Swal);

const TablaAnalisis = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const oTema = theme.palette.mode;
  const handleEdit = (data) => {
    MySwal.fire({
      title: "MODIFICAR REGISTRO",
      input: "text",
      icon: "info",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "EDITAR",
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if (!value) {
          MySwal.showValidationMessage("FAVOR DE LLENAR EL CAMPO");
        } else {
          EditarAnalisis(data.ID, value);
        }
      },
    });
  };

  const handleDelete = (id) => {
    MySwal.fire({
      title: "Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        EliminarCliente(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire("Cancelación", "Operación cancelada", "error");
      }
    });
  };
  useEffect(() => {
    RutaApi.get(`resultados-parametros/all/${params.id}`).then((response) =>
      setAnalisis(response.data[0])
    );
  }, []);
  const columns = [
    {
      field: "ID",
      headerName: "ID",
    },
    {
      field: "PARAMETRO",
      headerName: "PARAMETRO",
      cellClassName: "name-column--cell",
      flex: 2,
    },
    {
      field: "VALOR",
      headerName: "VALOR",
      cellClassName: "name-column--cell",
      flex: 2,
    },
    {
      field: "UNIDADES",
      headerName: "UNIDADES",
      cellClassName: "name-column--cell",
    },
    {
      field: "MAXIMO",
      headerName: "MAXIMO",
      cellClassName: "name-column--cell",
    },
    {
      field: "MINIMO",
      headerName: "MINIMO",
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
              color="primary"
              variant="contained"
              onClick={() => handleEdit(cellValues.row)}
              sx={{ marginRight: 1 }}
            >
              EDITAR
            </Button>
          </>
        );
      },
    },
  ];

  const [analisis, setAnalisis] = useState([]);
  const params = useParams();

  return (
    <Box m="20px">
      <Header title="ANÁLISIS" subtitle="Administración de análisis" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        maxWidth={1200}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            color: colors.primary,
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            color: colors.primary,
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
            color: `${
              oTema === "light" ? colors.dark : colors.primary
            } !important`,
          },
        }}
      >
        <DataGrid
          getRowId={(analisis) => analisis.ID}
          rows={analisis}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          autoWidth
        />
      </Box>
    </Box>
  );
};
export default TablaAnalisis;

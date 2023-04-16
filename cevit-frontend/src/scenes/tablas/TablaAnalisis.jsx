import { Box,  useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { RutaApi } from "../../api/url";
import { EliminarCliente } from "../../app/clienteContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const TablaAnalisis = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const oTema = theme.palette.mode;
  const handleEdit = (data) => {
    navigate("/EditAnalisis", { state: data });
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

  const headers = [
    "nombre",
    "modelo",
    "sello de tiempo",
    "estado de medición",
    "última referencia de agua",
    "última referencia de etanol",
    "acidez titulable (pH=7.0) [g/L [T]]",
    "ácido glucónico [g/L]",
    "ácido málico [g/L]",
    "ácido láctico [g/L]",
    "ácido tartárico [g/L]",
    "ácidos volátiles [g/L [A]]",
    "azúcares totales [g/L]",
    "densidad [g/mL]",
    "etanol [%vol]",
    "fructosa [g/L]",
    "glicerol [g/L]",
    "glucosa [g/L]",
    "pH []",
    "polifenoles totales [g/L]",
    "sacarosa [g/L]",
    "glucosa + fructosa [g/L]",
    "extracto [g/L]",
    "acidez titulable (pH = 8.2) [g/L [T]]",
    "azúcares totales en mosto [°Bx]",
    "YAN [mg/L [N]]",
  ];

  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "nombre",
      headerName: "Nombre",
      cellClassName: "name-column--cell",
    },
    {
      field: "modelo",
      headerName: "Modelo",
      cellClassName: "name-column--cell",
    },
    {
      field: "sello de tiempo",
      headerName: "Sello de tiempo",
      cellClassName: "name-column--cell",
    },
    {
      field: "estado de medición",
      headerName: "Estado de medición",
      cellClassName: "name-column--cell",
    },
    {
      field: "última referencia de agua",
      headerName: "Última referencia de agua",
      cellClassName: "name-column--cell",
    },
    {
      field: "última referencia de etanol",
      headerName: "Última referencia de etanol",
      cellClassName: "name-column--cell",
    },
    {
      field: "acidez titulable (pH=7.0) [g/L [T]]",
      headerName: "Acidez Titulable (pH=7.0) [g/L [T]]",
      cellClassName: "name-column--cell",
    },
    {
      field: "ácido glucónico [g/L]",
      headerName: "Ácido glucónico [g/L]",
      cellClassName: "name-column--cell",
    },
    {
      field: "ácido málico [g/L]",
      headerName: "Ácido Málico [g/L]",
      cellClassName: "name-column--cell",
    },
    {
      field: "ácido láctico [g/L]",
      headerName: "Ácido Láctico [g/L]",
      cellClassName: "name-column--cell",
    },
    {
      field: "ácido tartárico [g/L]",
      headerName: "Ácido Tartárico [g/L]",
      cellClassName: "name-column--cell",
    },
    {
      field: "ácidos volátiles [g/L [A]]",
      headerName: "Ácidos volátiles [g/L [A]]",
      cellClassName: "name-column--cell",
    },
    {
      field: "azúcares totales [g/L]",
      headerName: "Azúcares totales [g/L]",
      cellClassName: "name-column--cell",
    },
    {
      field: "densidad [g/mL]",
      headerName: "Densidad [g/mL]",
      cellClassName: "name-column--cell",
    },
    {
      field: "etanol [%vol]",
      headerName: "Etanol [%vol]",
      cellClassName: "name-column--cell",
    },
    {
      field: "fructosa [g/L]",
      headerName: "Fructosa [g/L]",
      cellClassName: "name-column--cell",
    },
    {
      field: "glicerol [g/L]",
      headerName: "Glicerol [g/L]",
      cellClassName: "name-column--cell",
    },
    {
      field: "glucosa [g/L]",
      headerName: "Glucosa [g/L]",
      cellClassName: "name-column--cell",
    },
    {
      field: "pH []",
      headerName: "pH []",
      cellClassName: "name-column--cell",
    },
    {
      field: "polifenoles totales [g/L]",
      headerName: "Polifenoles totales [g/L]",
      cellClassName: "name-column--cell",
    },
    {
      field: "sacarosa [g/L]",
      headerName: "Sacarosa [g/L]",
      cellClassName: "name-column--cell",
    },
    {
      field: "glucosa + fructosa [g/L]",
      headerName: "Glucosa + Fructosa [g/L]",
      cellClassName: "name-column--cell",
    },
    {
      field: "extracto [g/L]",
      headerName: "Extracto [g/L]",
      cellClassName: "name-column--cell",
    },
    {
      field: "acidez titulable (pH = 8.2) [g/L [T]]",
      headerName: "Acidez titulable (pH = 8.2) [g/L [T]]",
      cellClassName: "name-column--cell",
    },
    {
      field: "azúcares totales en mosto [°Bx]",
      headerName: "Azúcares Totales en Mosto [°Bx]",
      cellClassName: "name-column--cell",
    },
    {
      field: "YAN [mg/L [N]]",
      headerName: "YAN [mg/L [N]]",
      cellClassName: "name-column--cell",
    },
  ];

  const [analisis, setAnalisis] = useState([]);
  const params = useParams();

  useEffect(() => {
    RutaApi.get(`resultados-parametros/all/${params.id}`).then((response) => {
      console.log(response.data[0]);
      const data = response.data[0];

      let rows = [],
        i = 0,
        j = 0;
      for (let item of data) {
        if (!(i % 26)) {
          rows.push(Object());
          rows[j]["id"] = j;
          j += 1;
        }

        const col = headers[i % 26];
        rows[j - 1][col] = item.valor;

        i += 1;
      }
      setAnalisis(rows);
    });
  }, []);

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
          getRowId={(analisis) => analisis.id}
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

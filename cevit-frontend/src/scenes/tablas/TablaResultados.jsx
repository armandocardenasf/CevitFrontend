import { Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { AuthRutaApi } from "../../api/url";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TableBox from "../../components/TableBox";
import { EliminarAnalisis } from "../../app/analysisContext";

const MySwal = withReactContent(Swal);

const TablaResultados = () => {
  const [resultados, setResultados] = useState([]);
  const { state } = useLocation();
  const { name, id } = state;
  const navigate = useNavigate();
  const handleDetalles = (data) => {
    navigate("/TablaAnalisis/" + data);
  };
  const handleIncertidumbre = (data) => {
    navigate("/TablaIncertidumbre/" + data);
  };
  const handleDelete = (id) => {
    MySwal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        EliminarAnalisis(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire("Cancelación", "Operación cancelada", "error");
      }
    });
  };
  useEffect(() => {
    AuthRutaApi.post("/resultados", { oFolio: name }).then((response) =>
      setResultados(response.data[0])
    );
  }, []);
  const handleExcelFormat = async (oIdRecepcion) => {
    const response = await AuthRutaApi.post(
      "/excel/get",
      { oIdRecepcion: oIdRecepcion },
      {
        responseType: "arraybuffer",
      }
    );

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    const filename = "download.xlsx";
    link.setAttribute("download", filename);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const columns = [
    {
      field: "ID",
      headerName: "ID",
      width: 50,
    },
    {
      field: "tipoMuestra",
      headerName: "Tipo de Muestra",
      width: 130,
      cellClassName: "name-column--cell",
      renderCell: (cellValues) => {
        return <>{(cellValues.row.tipoMuestra = 1 ? "VINO" : "MOSTO")}</>;
      },
    },
    // {
    //   field: "cliente",
    //   headerName: "Cliente",
    //   width: 200,
    //   cellClassName: "name-column--cell",
    // },
    // {
    //   field: "rfc",
    //   headerName: "RFC del Cliente",
    //   width: 250,
    //   cellClassName: "name-column--cell",
    // },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 250,
      cellClassName: "name-column--cell",
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 550,
      renderCell: (cellValues) => {
        return (
          <>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={() => handleDetalles(cellValues.row.ID)}
              sx={{ marginRight: 1 }}
            >
              VER DETALLES
            </Button>
            <Button
              type="submit"
              color="wine"
              variant="contained"
              onClick={() => handleIncertidumbre(cellValues.row.ID)}
              sx={{ marginRight: 1 }}
            >
              INCERTIDUMBRE
            </Button>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              onClick={() => handleDelete(cellValues.row.ID)}
              sx={{ marginRight: 1 }}
            >
              ELIMINAR
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Header title="RESULTADOS" subtitle="Administración de muestras" />
      <Typography gutterBottom>Número de folio: {name}</Typography>
      <Button
        type="submit"
        color="secondary"
        variant="contained"
        onClick={() => handleExcelFormat(id)}
        sx={{ marginTop: 0.5 }}
      >
        Descargar excel
      </Button>
      <TableBox>
        <DataGrid
          getRowId={(resultados) => resultados.ID}
          rows={resultados}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          autoWidth
          initialState={{
            ...resultados.initialState,
            columns: {
              ...resultados.initialState?.columns,
              columnVisibilityModel: {
                ID: false,
                status: false,
              },
            },
          }}
        />
      </TableBox>
    </>
  );
};
export default TablaResultados;

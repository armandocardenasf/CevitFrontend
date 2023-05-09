import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { AuthRutaApi } from "../../api/url";
import { EliminarCliente } from "../../app/clienteContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TableBox from "../../components/TableBox";

const MySwal = withReactContent(Swal);

const TablaResultados = () => {
  const [resultados, setResultados] = useState([]);
  const { state: data } = useLocation();
  const navigate = useNavigate();
  const handleEdit = (data) => {
    console.log(data);
    // navigate("/EditRecepcion", { state: data });
  };
  const handleDetalles = (data) => {
    navigate("/TablaAnalisis/" + data);
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
    AuthRutaApi.post("/resultados", { oFolio: data }).then((response) =>
      setResultados(response.data[0])
    );
  }, []);
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
    {
      field: "fechaAnalisis",
      headerName: "Fecha de Analisis",
      width: 150,
      cellClassName: "name-column--cell",
    },
    {
      field: "horaAnalisis",
      headerName: "Hora de Analisis",
      width: 150,
      cellClassName: "name-column--cell",
    },
    {
      field: "fechaInforme",
      headerName: "Fecha de Informe",
      width: 150,
      cellClassName: "name-column--cell",
    },

    {
      field: "cliente",
      headerName: "Cliente",
      width: 150,
      cellClassName: "name-column--cell",
    },
    {
      field: "rfc",
      headerName: "RFC del Cliente",
      width: 150,
      cellClassName: "name-column--cell",
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 400,
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
              onClick={() => handleEdit(cellValues.row)}
              sx={{ marginRight: 1 }}
            >
              EDITAR
            </Button>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              onClick={() => handleDelete(cellValues.row)}
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
      <Typography gutterBottom>Número de folio: {data}</Typography>
      <TableBox>
        <DataGrid
          getRowId={(resultados) => resultados.ID}
          rows={resultados}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          autoWidth
        />
      </TableBox>
    </>
  );
};
export default TablaResultados;

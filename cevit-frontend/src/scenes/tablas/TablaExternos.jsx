import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { RutaApi } from "../../api/url";
import { EliminarExterno } from "../../app/externoContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TableBox from "../../components/TableBox";

const MySwal = withReactContent(Swal);

const TablaExternos = () => {
  const navigate = useNavigate();

  const handleEdit = (data) => {
    navigate("/EditExterno", { state: data });
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
        EliminarExterno(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire("Cancelación", "Operación cancelada", "error");
      }
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "no_folio",
      headerName: "No. Folio",
      width: 100,
      cellClassName: "name-column--cell",
    },
    {
      field: "fecha_muestreo",
      headerName: "Fecha de Muestreo",
      width: 180,
      cellClassName: "name-column--cell",
    },
    {
      field: "fecha_recepcion",
      headerName: "Fecha de Recepción",
      width: 180,
      cellClassName: "name-column--cell",
    },
    {
      field: "rfc",
      headerName: "RFC",
      width: 160,
      cellClassName: "name-column--cell",
    },
    {
      field: "atencion",
      headerName: "Atención",
      width: 220,
      cellClassName: "name-column--cell",
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 280,
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
    <>
      <Header
        title="EXTERNOS"
        subtitle="Administración de los externos existentes"
      />
      <TableBox>
        <DataGrid
          getRowId={(externo) => externo.id}
          rows={externos}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </TableBox>
    </>
  );
};
export default TablaExternos;

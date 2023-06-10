import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { AuthRutaApi } from "../../api/url";
import { EliminarCliente } from "../../app/clienteContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TableBox from "../../components/TableBox";

const MySwal = withReactContent(Swal);

const TablaClientes = () => {
  const navigate = useNavigate();
  const handleEdit = (data) => {
    navigate("/EditClientes", { state: data });
  };
  const handleAnalisis = (data) => {
    navigate("/AnalisisByCliente", { state: data });
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
        EliminarCliente(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire("Cancelación", "Operación cancelada", "error");
      }
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 260,
      cellClassName: "name-column--cell",
    },
    {
      field: "direccion",
      headerName: "Dirección",
      width: 320,
      cellClassName: "name-column--cell",
    },
    {
      field: "rfc",
      headerName: "RFC",
      width: 200,
      cellClassName: "name-column--cell",
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 360,
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
              sx={{ marginRight: 1 }}
            >
              ELIMINAR
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={() => handleAnalisis(cellValues.row)}
              sx={{ marginRight: 1 }}
            >
              VER ANÁLISIS
            </Button>
          </>
        );
      },
    },
  ];
  const [clientes, setClientes] = useState([]);
  useEffect(() => {
    AuthRutaApi.get("/cliente").then((cliente) => setClientes(cliente.data[0]));
  }, []);
  return (
    <>
      <Header
        title="CLIENTES"
        subtitle="Administración de los clientes existentes"
      />
      <TableBox>
        <DataGrid
          getRowId={(clientes) => clientes.id}
          rows={clientes}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          initialState={{
            ...clientes.initialState,
            columns: {
              ...clientes.initialState?.columns,
              columnVisibilityModel: {
                id: false,
                status: false,
              },
            },
          }}
        />
      </TableBox>
    </>
  );
};
export default TablaClientes;

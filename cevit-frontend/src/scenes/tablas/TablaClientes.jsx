import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { RutaApi } from "../../api/url";
import { EliminarCliente } from "../../app/clienteContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const TablaClientes = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleEdit = (data) => {
    navigate("/EditClientes", { state: data });
  };

  const handleDelete = (id) => {
    MySwal.fire({
      title: 'Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        EliminarCliente(id);
        MySwal.fire(
          'Cliente eliminado',
          'El cliente ha sido eliminado con éxito.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire(
          'Cancelación',
          'Operación cancelada',
          'error'
        );
      }
    });
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "nombre",
      headerName: "Nombre",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "direccion",
      headerName: "Direccion",
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
  const [clientes, setClientes] = useState([]);
  useEffect(() => {
    RutaApi.get("/cliente").then((cliente) => setClientes(cliente.data[0]));
  }, []);
  return (
    <Box m="20px">
      <Header
        title="CLIENTES"
        subtitle="Administracion de los clientes existentes"
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
          getRowId={(clientes) => clientes.id}
          rows={clientes}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};
export default TablaClientes;

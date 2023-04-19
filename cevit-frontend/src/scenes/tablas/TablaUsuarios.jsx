import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { RutaApi } from "../../api/url";
import { EliminarUsuario, UpdateUsuarioPass } from "../../app/usuarioContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const TablaUsuarios = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const oTema = theme.palette.mode;
  const handleEdit = (data) => {
    navigate("/EditUsuario", { state: data });
  };
  const handleEditPassword = (data) => {
    MySwal.fire({
      title: "MODIFICAR CONTRASEÑA",
      input: "password",
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
          UpdateUsuarioPass(data.uID, value);
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
        EliminarUsuario(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire("Cancelación", "Operación cancelada", "error");
      }
    });
  };

  const columns = [
    { field: "uID", headerName: "ID" },
    {
      field: "uNombre",
      headerName: "Nombre",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "uApellido",
      headerName: "Apellido(s)",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "uCorreo",
      headerName: "Usuario",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "uRol",
      headerName: "Rol",
      flex: 1,
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
              sx={{ marginRight: 2 }}
            >
              EDITAR
            </Button>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              onClick={() => handleDelete(cellValues.row.uID)}
              sx={{ marginRight: 2 }}
            >
              ELIMINAR
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={() => handleEditPassword(cellValues.row)}
              sx={{ marginRight: 2 }}
            >
              EDITAR CONTRASEÑA
            </Button>
          </>
        );
      },
    },
  ];
  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    RutaApi.get("/usuario").then((usuario) => setUsuarios(usuario.data[0]));
  }, []);
  return (
    <Box m="20px">
      <Header
        title="USUARIOS"
        subtitle="Administracion de los usuarios existentes"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
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
          getRowId={(usuarios) => usuarios.uID}
          rows={usuarios}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};
export default TablaUsuarios;

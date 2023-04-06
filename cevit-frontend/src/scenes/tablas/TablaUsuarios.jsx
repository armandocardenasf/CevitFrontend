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
import { EliminarUsuario } from "../../app/usuarioContext";

const TablaUsuarios = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleEdit = (data) => {
    navigate("/EditUsuario", { state: data });
  };

  const handleDelete = (id) => {
    EliminarUsuario(id);
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
      renderCell: ({ row: { uRol } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              uRol === "ADMINISTRADO"
                ? colors.lightSecondary
                : uRol === "canela"
                ? colors.primary
                : uRol === "USUARIO"
                ? colors.primary
                : colors.secondary
            }
            borderRadius="4px"
          >
            {uRol === "ADMINISTRADO" && <AdminPanelSettingsOutlinedIcon />}
            {uRol === "canela" && <SecurityOutlinedIcon />}
            {uRol === "USUARIO" && <LockOpenOutlinedIcon />}
            <Typography color={colors.white} sx={{ ml: "5px" }}>
              {uRol}
            </Typography>
          </Box>
        );
      },
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
              onClick={() => handleDelete(cellValues.row.uID)}
            >
              ELIMINAR
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

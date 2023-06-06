import { Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { AuthRutaApi } from "../../api/url";
import { EliminarUsuario, UpdateUsuarioPass } from "../../app/usuarioContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TableBox from "../../components/TableBox";

const MySwal = withReactContent(Swal);

const TablaUsuarios = () => {
  const navigate = useNavigate();
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
      title: "¿Estás seguro?",
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
    { field: "uID", headerName: "ID", width: 100 },
    {
      field: "uNombre",
      headerName: "Nombre",
      width: 120,
      cellClassName: "name-column--cell",
    },
    {
      field: "uApellido",
      headerName: "Apellido(s)",
      width: 180,
      cellClassName: "name-column--cell",
    },
    {
      field: "uCorreo",
      headerName: "Usuario",
      width: 200,
      cellClassName: "name-column--cell",
    },
    {
      field: "uRol",
      headerName: "Rol",
      width: 150,
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 500,
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
    AuthRutaApi.get("/usuario").then((usuario) => setUsuarios(usuario.data[0]));
  }, []);
  return (
    <>
      <Header
        title="USUARIOS"
        subtitle="Administración de los usuarios existentes"
      />
      <TableBox
        children={
          <DataGrid
            getRowId={(usuarios) => usuarios.uID}
            rows={usuarios}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        }
      />
    </>
  );
};
export default TablaUsuarios;

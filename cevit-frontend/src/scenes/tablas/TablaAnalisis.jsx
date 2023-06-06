import { Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { AuthRutaApi } from "../../api/url";
import { EliminarCliente } from "../../app/clienteContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { EditarAnalisis } from "../../app/analysisContext";
import TableBox from "../../components/TableBox";

const MySwal = withReactContent(Swal);

const TablaAnalisis = () => {
  const handleEdit = (data) => {
    MySwal.fire({
      title: "MODIFICAR REGISTRO",
      input: "text",
      inputPlaceholder: data.VALOR,
      icon: "info",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Editar",
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
  useEffect(() => {
    AuthRutaApi.get(`resultados-parametros/all/${params.id}`).then((response) =>
      setAnalisis(response.data[0])
    );
  }, []);
  const columns = [
    {
      field: "ID",
      headerName: "ID",
      width: 120,
    },
    {
      field: "PARAMETRO",
      headerName: "Parámetro",
      width: 300,
      cellClassName: "name-column--cell",
    },
    {
      field: "VALOR",
      headerName: "Valor",
      width: 300,
      cellClassName: "name-column--cell",
    },
    {
      field: "UNIDADES",
      headerName: "Unidades",
      width: 160,
      cellClassName: "name-column--cell",
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 100,
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
    <>
      <Header title="ANÁLISIS" subtitle="Administración de análisis" />
      <TableBox>
        <DataGrid
          getRowId={(analisis) => analisis.ID}
          rows={analisis}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          autoWidth
        />
      </TableBox>
    </>
  );
};
export default TablaAnalisis;

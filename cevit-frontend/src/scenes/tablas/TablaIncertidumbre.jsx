import { Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {  useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { AuthRutaApi } from "../../api/url";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TableBox from "../../components/TableBox";
import { EditarIncertidumbre } from "../../app/incertidumbreContext";

const MySwal = withReactContent(Swal);

const TablaIncertidumbre = () => {
  const handleEdit = (data) => {
    MySwal.fire({
      title: "MODIFICAR REGISTRO",
      input: "text",
      inputPlaceholder: data.incertidumbre,
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
          EditarIncertidumbre(data.id, value);
        }
      },
    });
  };
  useEffect(() => {
    AuthRutaApi.get(`analisis/${params.id}`).then((response) =>
      setAnalisis(response.data[0])
    );
  }, []);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 120,
    },
    {
      field: "nombre",
      headerName: "NOMBRE",
      width: 300,
    },
    {
      field: "incertidumbre",
      headerName: "INCERTIDUMBRE",
      width: 300,
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
          getRowId={(analisis) => analisis.id}
          rows={analisis}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          autoWidth
        />
      </TableBox>
    </>
  );
};
export default TablaIncertidumbre;

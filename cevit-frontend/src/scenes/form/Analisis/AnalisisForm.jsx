import {
  Autocomplete,
  Box,
  CircularProgress,
  Button,
  TextField,
} from "@mui/material";
import { AuthRutaApi } from "../../../api/url";
import { useDropzone } from "react-dropzone";
import Header from "../../../components/Header";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect, useState } from "react";
import { isRouteErrorResponse } from "react-router-dom";
const MySwal = withReactContent(Swal);

const AnalisisForm = () => {
  const [cliente, setCliente] = useState([]);
  const [idCliente, setIdCliente] = useState();
  useEffect(() => {
    AuthRutaApi.get("/cliente").then((cliente) => setCliente(cliente.data[0]));
  }, []);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
  });
  const [isLoading, setIsLoading] = useState(false);

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const filesNotFound = () => {
    MySwal.fire({
      title: "No se han encontrado archivos",
      text: "Por favor, selecciona un archivo válido.",
      icon: "warning",
      confirmButtonText: "OK",
    });
  };

  const idClientNotFound = () => {
    MySwal.fire({
      title: "No ha seleccionado un cliente",
      text: "Porfavor, seleccione el cliente correspondiente.",
      icon: "warning",
      confirmButtonText: "OK",
    });
  };

  const uploadCSV = async () => {
    if (!files.length) {
      filesNotFound();
      return;
    } else if (!idCliente) {
      idClientNotFound();
      return;
    }

    const formData = new FormData();
    formData.append("csvFile", acceptedFiles[0]);
    formData.append("userId", idCliente);

    setIsLoading(true);
    await AuthRutaApi.post("/files/insertFile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          MySwal.fire({
            title: "Operación exitosa",
            text: response.data,
            icon: "success",
            confirmButtonText: "OK",
          });
          setIsLoading(false);
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          MySwal.fire({
            title: "Error",
            text: error.response.data,
            icon: "error",
            confirmButtonText: "OK",
          });
        } else {
          MySwal.fire({
            title: "Error",
            text: "Ha ocurrido un error.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
        setIsLoading(false);
      });
  };

  return (
    <>
      <Header
        title="SUBIR ANÁLISIS DE LABORATORIO"
        subtitle="Sube un archivo CSV que contenga datos de análisis de laboratorio."
      />
      <Box justifyContent="start" maxWidth={400} mb="20px">
        <Autocomplete
          disablePortal
          id="oCliente"
          options={cliente}
          onChange={(event, value) => setIdCliente(value.id)}
          getOptionLabel={(opt) => opt.nombre + "RFC: " + opt.rfc}
          sx={{ gridColumn: "span 2" }}
          renderInput={(params) => <TextField {...params} label="Cliente" />}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        py="30px"
        borderRadius={2}
        border="2px dashed gray"
      >
        <Box {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Arrastra aquí o da click para seleccionar un archivo (max. 1).</p>
        </Box>
      </Box>
      <Box>{files}</Box>
      <Box display="flex" justifyContent="end" mt="20px">
        {isLoading && <CircularProgress sx={{ mr: 2 }} />}
        <Button
          onClick={uploadCSV}
          type="submit"
          color="secondary"
          variant="contained"
        >
          Subir archivo
        </Button>
      </Box>
    </>
  );
};
export default AnalisisForm;

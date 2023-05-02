import {
  Autocomplete,
  Box,
  CircularProgress,
  Button,
  TextField,
} from "@mui/material";
import { RutaApi } from "../../../api/url";
import { useDropzone } from "react-dropzone";
import Header from "../../../components/Header";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { useEffect, useState } from "react";
const MySwal = withReactContent(Swal);

const AnalisisForm = () => {
  const [cliente, setCliente] = useState([]);
  const [idCliente, setIdCliente] = useState();
  console.log(idCliente);
  useEffect(() => {
    RutaApi.get("/cliente").then((cliente) => setCliente(cliente.data[0]));
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
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  const uploadCSV = () => {
    if (!files.length) {
      filesNotFound();
      return;
    }

    const formData = new FormData();
    formData.append("csvFile", acceptedFiles[0]);
    formData.append("userId", idCliente);

    setIsLoading(true);
    axios
      .post("http://localhost/files/insertFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.status);
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
        MySwal.fire({
          title: "Occurió un error",
          text: "Un número de folio no es válido. Es posible que este folio no esté relacionado \
          a una hoja de especificaciones o varios folios se especifican en el archivo.",
          icon: "error",
          confirmButtonText: "OK",
        });
        setIsLoading(false);
      });
  };

  return (
    <>
      <Header
        title="SUBIR ANÁLISIS DE LABORATORIO"
        subtitle="Sube un archivo CSV que contenga datos de análisis de laboratorio."
      />
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
      <Box justifyContent={"start"} mt="20px">
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

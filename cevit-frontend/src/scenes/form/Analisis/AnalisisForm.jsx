import {
  Autocomplete,
  Box,
  CircularProgress,
  Button,
  TextField,
  LinearProgress,
} from "@mui/material";
import { uploadCSV } from "../../../api/url";
import { useDropzone } from "react-dropzone";
import Header from "../../../components/Header";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { useState } from "react";
const MySwal = withReactContent(Swal);

const AnalisisForm = () => {
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({ maxFiles: 1 });
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
    formData.append("userId", 3); // change static id later.

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
          text: "Sólo es posible subir archivos CSV",
          icon: "error",
          confirmButtonText: "OK",
        });
        setIsLoading(false);
      });
  };

  return (
    <Box m="20px">
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
    </Box>
  );
};
export default AnalisisForm;

import { Box, CircularProgress, Button } from "@mui/material";
import { useDropzone } from "react-dropzone";
import Header from "../../../components/Header";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useState } from "react";
import { AuthRutaApi } from "../../../api/url";
const MySwal = withReactContent(Swal);

const DesviacionForm = () => {
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
      text: "Por favor, selecciona un archivo válido",
      icon: "warning",
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

    setIsLoading(true);
    AuthRutaApi.post(`/desviacion/insertFile`, formData, {
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
          title: "Error",
          text: "Ha ocurrido un error.",
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
        subtitle="Sube un archivo CSV que contenga datos de análisis de laboratorio para el cálculo de la desviación estándar"
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
    </>
  );
};
export default DesviacionForm;

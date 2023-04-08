import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useDropzone } from "react-dropzone";
import Header from "../../../components/Header";


const AnalisisForm = () => {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

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
      sx={{
        borderRadius: 2, 
        border: '2px dashed gray',
      }}
      >
        <Box {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <p>Arrastra aquí o da click para seleccionar un archivo.</p>
        </Box>
      </Box>
      <Box sx={{ marginTop: 1 }}>{files}</Box>
      <Box display="flex" justifyContent="end" mt="20px">
        <Button type="submit" color="secondary" variant="contained">
          Subir archivo
        </Button>
      </Box>
    </Box>
  );
};
export default AnalisisForm;

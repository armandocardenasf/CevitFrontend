import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import { RutaApi } from "../../../api/url";
import { CrearRecepcion } from "../../../app/recepcionContext";
const initialValues = {
  fechaMuestreo: "",
  fechaRecepcion: "",
  folio: "",
  totalMuestras: "",
  clienteID: "",
};
const userSchema = yup.object().shape({
  fechaMuestreo: yup.string().required("required"),
  fechaRecepcion: yup.string().required("required"),
  folio: yup.string().required("required"),
  totalMuestras: yup.number().required("required"),
  clienteID: yup.number().required("required"),
  tipoMuestra: yup.number().required("required"),
});
const RecepcionForm = () => {
  const [cliente, setCliente] = useState([]);
  const muestras = [
    {
      muestra: "VINO",
      value: 1,
    },
    { muestra: "MOSTO", value: 0 },
  ];
  useEffect(() => {
    RutaApi.get("/cliente").then((cliente) => setCliente(cliente.data[0]));
  }, []);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = (values) => {
    CrearRecepcion(values);
  };
  return (
    <>
      <Header
        title="RECEPCION DE MUESTRAS"
        subtitle="Formulario de registro de muestras"
      />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4,minmax(0,1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                InputLabelProps={{ shrink: true }}
                fullWidth
                variant="filled"
                type="date"
                label="Fecha de Muestreo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fechaMuestreo}
                name="fechaMuestreo"
                error={!!touched.fechaMuestreo && !!errors.fechaMuestreo}
                helperText={touched.fechaMuestreo && errors.fechaMuestreo}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                fullWidth
                variant="filled"
                type="date"
                label="Fecha de Recepción"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fechaRecepcion}
                name="fechaRecepcion"
                error={!!touched.fechaRecepcion && !!errors.fechaRecepcion}
                helperText={touched.fechaRecepcion && errors.fechaRecepcion}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Folio"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.folio}
                name="folio"
                error={!!touched.folio && !!errors.folio}
                helperText={touched.folio && errors.folio}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Total de Muestras"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.totalMuestras}
                name="totalMuestras"
                error={!!touched.totalMuestras && !!errors.totalMuestras}
                helperText={touched.totalMuestras && errors.totalMuestras}
                sx={{ gridColumn: "span 2" }}
              />

              <Autocomplete
                disablePortal
                id="oCliente"
                options={cliente}
                onChange={(event, value) => (values.clienteID = value.id)}
                getOptionLabel={(opt) => opt.nombre + "RFC: " + opt.rfc}
                sx={{ gridColumn: "span 2" }}
                renderInput={(params) => (
                  <TextField {...params} label="Cliente" />
                )}
              />
              <Autocomplete
                disablePortal
                id="oTipoMuestra"
                options={muestras}
                onChange={(event, value) => (values.tipoMuestra = value.value)}
                getOptionLabel={(opt) => opt.muestra}
                sx={{ gridColumn: "span 2" }}
                renderInput={(params) => (
                  <TextField {...params} label="Tipo de Muestra" />
                )}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Agregar Registro
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};
export default RecepcionForm;

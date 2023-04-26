import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { EditarCliente } from "../../../app/clienteContext";
import { RutaApi } from "../../../api/url";
import Header from "../../../components/Header";

const userSchema = yup.object().shape({
  nombre: yup.string().required("required"),
  direccion: yup.string().required("required"),
  rfc: yup.string().required("required"),
  externoId: yup.number().required("required"),
  suscripcionId: yup.number().required("required"),
});
const ClienteEditForm = () => {
  const { state: data } = useLocation();

  const initialValues = {
    id: data.id,
    nombre: data.nombre,
    direccion: data.direccion,
    rfc: data.rfc,
    externoId: data.externo_id,
    suscripcionId: data.suscripcion_id,
  };
  const [externo, setExterno] = useState([]);
  const [suscripcion, setSuscripcion] = useState([]);
  useEffect(() => {
    RutaApi.get("/externo").then((externo) => setExterno(externo.data[0]));
  }, []);
  useEffect(() => {
    RutaApi.get("/suscripciones").then((externo) =>
      setSuscripcion(externo.data[0])
    );
  }, []);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = (values) => {
    console.log(values);
    EditarCliente(values);
  };
  return (
    <>
      <Header
        title="MODIFICAR DATOS DE CLIENTE"
        subtitle="Edición de datos del cliente"
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
                fullWidth
                variant="filled"
                type="text"
                label="Nombre"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nombre}
                name="nombre"
                error={!!touched.nombre && !!errors.nombre}
                helperText={touched.nombre && errors.nombre}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="RFC"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.rfc}
                name="rfc"
                error={!!touched.rfc && !!errors.rfc}
                helperText={touched.rfc && errors.rfc}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Direccion"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.direccion}
                name="direccion"
                error={!!touched.direccion && !!errors.direccion}
                helperText={touched.direccion && errors.direccion}
                sx={{ gridColumn: "span 4" }}
              />
              <Autocomplete
                disablePortal
                id="oExterno"
                options={externo}
                onChange={(event, value) => (values.externoId = value.id)}
                getOptionLabel={(opt) => "RFC: " + opt.rfc}
                sx={{ gridColumn: "span 2" }}
                renderInput={(params) => (
                  <TextField {...params} label="Externo" />
                )}
              />
              <Autocomplete
                disablePortal
                id="oSuscripciones"
                options={suscripcion}
                onChange={(event, value) => (values.suscripcionId = value.id)}
                getOptionLabel={(opt) => opt.nombre}
                sx={{ gridColumn: "span 2" }}
                renderInput={(params) => (
                  <TextField {...params} label="Suscripcion" />
                )}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Editar Cliente
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};
export default ClienteEditForm;

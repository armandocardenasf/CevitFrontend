import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import { AuthRutaApi } from "../../../api/url";
import { EditarExterno } from "../../../app/externoContext";
import { useLocation } from "react-router-dom";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const userSchema = yup.object().shape({
  RazonSocial: yup.string().required("required"),
  Rfc: yup.string().required("required"),
  Correo: yup.string().email("Invalid email").required("required"),
  Telefono: yup.number(phoneRegExp).required("required"),
  Atencion: yup.string().required("required"),
  UsuarioId: yup.string().required("required"),
});
const ExternoEditForm = () => {
  const { state: data } = useLocation();
  const initialValues = {
    id: data.id,
    RazonSocial: data.razon_social,
    Rfc: data.rfc,
    Telefono: data.telefono,
    Correo: data.correo,
    Atencion: data.atencion,
    UsuarioId: data.usuario_id,
  };
  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    AuthRutaApi.get("/usuario").then((usuario) => setUsuarios(usuario.data[0]));
  }, []);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = (values) => {
    EditarExterno(values);
  };
  return (
    <>
      <Header
        title="MODIFICAR DATOS DE EXTERNO"
        subtitle="Registrar un nuevo externo"
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
                label="Razón Social"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.RazonSocial}
                name="RazonSocial"
                error={!!touched.RazonSocial && !!errors.RazonSocial}
                helperText={touched.RazonSocial && errors.RazonSocial}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="RFC"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Rfc}
                name="Rfc"
                error={!!touched.Rfc && !!errors.Rfc}
                helperText={touched.Rfc && errors.Rfc}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Telefono"
                InputProps={{ inputProps: { min: 0 } }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Telefono}
                name="Telefono"
                error={!!touched.Telefono && !!errors.Telefono}
                helperText={touched.Telefono && errors.Telefono}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Correo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Correo}
                name="Correo"
                error={!!touched.Correo && !!errors.Correo}
                helperText={touched.Correo && errors.Correo}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Atención"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Atencion}
                name="Atencion"
                error={!!touched.Atencion && !!errors.Atencion}
                helperText={touched.Atencion && errors.Atencion}
                sx={{ gridColumn: "span 2" }}
              />
              <Autocomplete
                disablePortal
                id="oUsuarios"
                options={usuarios}
                onChange={(event, value) => (values.UsuarioId = value.uID)}
                getOptionLabel={(opt) => opt.uNombre + " " + opt.uApellido}
                sx={{ gridColumn: "span 2" }}
                renderInput={(params) => (
                  <TextField {...params} label="Usuario" />
                )}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Editar Externo
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};
export default ExternoEditForm;

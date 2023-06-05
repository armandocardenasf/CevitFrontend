import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import Header from "../../../components/Header";
import { UpdateUsuario } from "../../../app/usuarioContext";
import { useEffect, useState } from "react";
import { AuthRutaApi } from "../../../api/url";
import { useLocation } from "react-router-dom";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const userSchema = yup.object().shape({
  nombre: yup.string().required("required"),
  apellido: yup.string().required("required"),
  username: yup.string().email("Invalid email").required("required"),
  telefono: yup.number(phoneRegExp).required("required"),
  rol: yup.string().required("required"),
});
const UsuarioEditForm = () => {
  const { state: data } = useLocation();
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    AuthRutaApi.get("/roles").then((rol) => setRoles(rol.data[0]));
  }, []);
  const initialValues = {
    id: data.uID,
    nombre: data.uNombre,
    apellido: data.uApellido,
    username: data.uCorreo,
    telefono: data.uTelefono,
    rol: data.uRol,
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = (values) => {
    UpdateUsuario(values);
  };
  return (
    <>
      <Header title="EDITAR USUARIO" subtitle="Edicion de datos del usuario" />
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
                label="Apellido(s)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.apellido}
                name="apellido"
                error={!!touched.apellido && !!errors.apellido}
                helperText={touched.apellido && errors.apellido}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
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
                value={values.telefono}
                name="telefono"
                error={!!touched.telefono && !!errors.telefono}
                helperText={touched.telefono && errors.telefono}
                sx={{ gridColumn: "span 2" }}
              />
              <Autocomplete
                disablePortal
                id="oRoles"
                options={roles}
                onChange={(event, value) => (values.rol = value.id)}
                getOptionLabel={(opt) => opt.nombre}
                sx={{ gridColumn: "span 4" }}
                renderInput={(params) => (
                  <TextField {...params} label="Roles" />
                )}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Actualizar Usuario
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};
export default UsuarioEditForm;

import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { loginUser } from "../../tools/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "../../components/Copyright";
import { LoginModule } from "../../app/usuarioContext";
const initialValues = {
  username: "",
  password: "",
};

const userSchema = yup.object().shape({
  username: yup.string().email("Invalid email").required("required"),
  password: yup.string().required("required"),
});
const Form = () => {
  const oUsuarios = useSelector((state) => state.usuario);
  console.log(oUsuarios);
  const oNavegacion = useNavigate();
  useEffect(() => {
    if (oUsuarios.user.isLoged) {
      oNavegacion("/dashboard");
    }
  });
  const oDispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = (values) => {
    console.log(values);
    LoginModule(values.username, values.password).then((data) =>
      oDispatch(loginUser(data))
    );
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Header title="INICIO DE SESION" subtitle="Ingrese sus credenciales" />
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
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
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
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />

              <Button
                type="submit"
                color="secondary"
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar Sesion
              </Button>
            </Box>
          )}
        </Formik>
      </Box>
      <Copyright sx={{ mt: 8, mb: 10 }} />
    </Container>
  );
};
export default Form;

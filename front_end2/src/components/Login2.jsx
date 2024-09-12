import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState, useContext } from "react";
import { login } from "../API/request";
import { Link, useNavigate} from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {UserContext} from '../context/UserContext'
import CreateUser from "./CreateUser";


// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Debe ser un correo válido")
    .required("El correo es obligatorio"),
  password: Yup.string()
    .min(4, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es obligatoria"),
});

function Login() {
   //Contexto de usuario
   const {sesionStorageLogin} = useContext(UserContext)
   const navigate = useNavigate();
  // Estado para guardar los datos del formulario login
  const [sesion, setSesion] = useState({
    correo_electronico: "",
    contrasena: "",
  });
  //Variables para manejar el snackbar
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false); // Cierra el Snackbar
  };

  // Manejar los cambios en los campos del formulario email y password
  const handleEmail = (event) => {
    setSesion((prevSesion) => ({
      ...prevSesion,
      correo_electronico: event.target.value,
    }));
  };
  const handlePassword = (event) => {
    setSesion((prevSesion) => ({
      ...prevSesion,
      contrasena: event.target.value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    

    //Promesa para manejar la respuesta de la petición
    login(sesion)
      .then((responseData) => {
        // Manejar la respuesta exitosa
        console.log("Aporbado", responseData);
        const { status, data } = responseData;
        if (status === 200) {
          setMessage("Bienvenido");
          setSeverity("success");
          setOpen(true);
          sesionStorageLogin(data); //Guardar la sesión en el local storage
          navigate('/'); // Redirigir a /home
        } else {
          setMessage(data.response_text);
          setSeverity("error");
          setOpen(true);
          console.log("mal");
        }
      })
      .catch((error) => {
        // Manejar el error
        console.error("Error en el login:", error);
      });

    //Limpiar el formulario
    setSesion({
      correo_electronico: "",
      contrasena: "",
    });
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: 4,
          backgroundColor: "white",
          boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#1976D2", fontWeight: "bold" }}
        >
          Iniciar Sesión
        </Typography>
        <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange,handleBlur }) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                label="Correo Electrónico"
                name="email"
                onChange={(e) => {
                  handleEmail(e);
                  handleChange(e);
                }}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                variant="outlined"
                margin="normal"
                value={sesion.correo_electronico}
              />
              <Field
                as={TextField}
                fullWidth
                label="Contraseña"
                name="password"
                type="password"
                onChange={(e) => {
                  handlePassword(e);
                  handleChange(e);
                }}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                variant="outlined"
                margin="normal"
                value={sesion.contrasena}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ marginTop: 2, padding: 1.5 }}
                onClick={handleSubmit}
              >
                Iniciar Sesión
              </Button>
            </Form>
          )}
        </Formik>

        <Typography align="center" sx={{ marginTop: 2 }}>
        ¿No tienes cuenta?{' '}
        <Link
          onClick={handleOpenModal}
          sx={{ fontWeight: 'bold', color: '#1976D2' }}
          component="button"
        >
          Regístrate aquí
        </Link>
      </Typography>

      <CreateUser open={openModal} onClose={handleCloseModal} />

        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}

export default Login;

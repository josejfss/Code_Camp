import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getState } from "../API/request";
import { createUserAccount } from "../API/userRequest";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Snackbar,
  TextField,
} from "@mui/material";

import PropTypes from "prop-types";

function CreateUser({ open, onClose }) {

  const formik = useFormik({
    initialValues: {
      correo_electronico: "",
      contrasena: "",
      primer_nombre: "",
      segundo_nombre: "",
      primer_apellido: "",
      segundo_apellido: "",
      telefono: "",
      fecha_nacimiento: "",
      id_rol: 1,
    },
    validationSchema: Yup.object({
      correo_electronico: Yup.string()
        .email("Debe ser un correo válido")
        .required("El correo es obligatorio"),
      contrasena: Yup.string()
        .min(4, "La contraseña debe tener al menos 4 caracteres")
        .required("La contraseña es obligatoria"),
      primer_nombre: Yup.string().required("Primer nombre es requerido"),
      segundo_nombre: Yup.string(),
      primer_apellido: Yup.string().required("Primer apellido es requerido"),
      segundo_apellido: Yup.string(),
      telefono: Yup.string()
        .matches(/^[0-9]{8}$/, "Teléfono inválido, debe tener 8 dígitos")
        .required("Teléfono es requerido"),
      fecha_nacimiento: Yup.date()
        .max(dayjs(), "La fecha debe ser anterior a hoy")
        .required("Fecha de nacimiento es requerida"),
      id_rol: Yup.number().required("Rol es requerido"),
    }),

    onSubmit: () => {
      handleCreateUser();
    },
  });

  const [role, setRole] = useState([]);

  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState("success");

  useEffect(() => {
    getState()
      .then((response) => {
        const { data } = response;
        setRole(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCreateUser = () => {
    let data = {
        correo_electronico: formik.values.correo_electronico,
        contrasena: formik.values.contrasena,
        primer_nombre: formik.values.primer_nombre,
        segundo_nombre: formik.values.segundo_nombre,
        primer_apellido: formik.values.primer_apellido,
        segundo_apellido: formik.values.segundo_apellido,
        telefono: formik.values.telefono,
        fecha_nacimiento: formik.values.fecha_nacimiento,
        id_rol: formik.values.id_rol,
        };
    createUserAccount(data)
    .then((response) => {
        
        if (response.status !== 200) {
            setMessage(response.response_text);
            setSeverity("error");
            return;
        }else{
            setMessage("Usuario creado exitosamente");
            setSeverity("success");
            formik.resetForm();
            return;

        }
            
        
    })
    .catch((error) => {
        setMessage(error.message);
        setSeverity("error");
    });

    
// Mostrar cuadro de diálogo para confirmar el pedido
setSnackbarOpen(true);

  };

  return (
    <>
      <Dialog open={open} onClose={onClose}
      sx={{
        "& .MuiDialog-container": {
          backdropFilter: "sepia(30%)",
        },
      }}
      >
        <DialogTitle>Registro</DialogTitle>
        <DialogContent style={{
        backgroundColor: "transparent",
      }}>
          <>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2} style={{
                backgroundColor: "transparent",
                padding: "15px"
              }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Correo Electrónico"
                    name="correo_electronico"
                    value={formik.values.correo_electronico}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.correo_electronico &&
                      Boolean(formik.errors.correo_electronico)
                    }
                    helperText={
                      formik.touched.correo_electronico &&
                      formik.errors.correo_electronico
                    }
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Contraseña"
                    name="contrasena"
                    value={formik.values.contrasena}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.contrasena &&
                      Boolean(formik.errors.contrasena)
                    }
                    helperText={
                      formik.touched.contrasena && formik.errors.contrasena
                    }
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Primer Nombre"
                    name="primer_nombre"
                    value={formik.values.primer_nombre}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.primer_nombre &&
                      Boolean(formik.errors.primer_nombre)
                    }
                    helperText={
                      formik.touched.primer_nombre &&
                      formik.errors.primer_nombre
                    }
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Segundo Nombre"
                    name="segundo_nombre"
                    value={formik.values.segundo_nombre}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.segundo_nombre &&
                      Boolean(formik.errors.segundo_nombre)
                    }
                    helperText={
                      formik.touched.segundo_nombre &&
                      formik.errors.segundo_nombre
                    }
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Primer Apellido"
                    name="primer_apellido"
                    value={formik.values.primer_apellido}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.primer_apellido &&
                      Boolean(formik.errors.primer_apellido)
                    }
                    helperText={
                      formik.touched.primer_apellido &&
                      formik.errors.primer_apellido
                    }
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Segundo Apellido"
                    name="segundo_apellido"
                    value={formik.values.segundo_apellido}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.segundo_apellido &&
                      Boolean(formik.errors.segundo_apellido)
                    }
                    helperText={
                      formik.touched.segundo_apellido &&
                      formik.errors.segundo_apellido
                    }
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Teléfono"
                    name="telefono"
                    type="number"
                    value={formik.values.telefono}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.telefono && Boolean(formik.errors.telefono)
                    }
                    helperText={
                      formik.touched.telefono && formik.errors.telefono
                    }
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Fecha de Nacimiento"
                    name="fecha_nacimiento"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={formik.values.fecha_nacimiento}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.fecha_nacimiento &&
                      Boolean(formik.errors.fecha_nacimiento)
                    }
                    helperText={
                      formik.touched.fecha_nacimiento &&
                      formik.errors.fecha_nacimiento
                    }
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    label="Rol"
                    name="id_rol"
                    value={formik.values.id_rol}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.id_rol && Boolean(formik.errors.id_rol)
                    }
                    helperText={formik.touched.id_rol && formik.errors.id_rol}
                    margin="normal"
                  >
                    {role.length !== 0
                      ? role.map((item) => (
                          <MenuItem key={item.id_rol} value={item.id_rol}>
                            {item.nombre}
                          </MenuItem>
                        ))
                      : null}
                  </TextField>
                </Grid>
              </Grid>
                <Button
                type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "16px" }}
                    >
                    Crear Usuario
                </Button>
            </form>
          </>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={onClose} color="error">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Para mostrar alerta de producto agregado */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default CreateUser;

CreateUser.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };
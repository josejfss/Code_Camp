import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { departamentoMunicipio } from "../../data/departamentoMunicipo";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { getUserInfo } from "../../API/userRequest";
import { UserContext } from "../../context/UserContext";
import { ProductContext} from "../../context/ProductContex";
import {
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { postOrderRequest } from "../../API/orderRequest";

function FormFacturacion() {
  //Declaraciones de variables
  const { user } = useContext(UserContext);
  const {car, deleteCar} = useContext(ProductContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [departamento, setDepartamento] = useState([]);
  const [municipio, setMunicipio] = useState([]);
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState("success");

  useEffect(() => {
    getUserInfo(user)
      .then((responseData) => {
        setTelefono(responseData.telefono);
        setCorreo(responseData.correo_electronico);
        setNombre(responseData.nombre);
        setApellido(responseData.apellido);
      })
      .catch(() => {});
  }, [user]);

  const formik = useFormik({
    initialValues: {
      departamento: "",
      municipio: "",
      zona: "",
      complemento_direccion: "",
      fecha_entrega: "",
      telefono: "",
      correo: "",
      nombre: "",
      apellido: "",
    },
    validationSchema: Yup.object({
      departamento: Yup.string().required("Departamento es requerido"),
      municipio: Yup.string().required("Municipio es requerido"),
      zona: Yup.number(),
      complemento_direccion: Yup.string().required("Dirección es requerida"),
      fecha_entrega: Yup.date()
        .min(dayjs(), "La fecha debe ser posterior a hoy")
        .required("Fecha de entrega es requerida"),
      telefono: Yup.string()
        .matches(/^[0-9]{8}$/, "Teléfono inválido, solo se permiten 8 dígitos numéricos")
        .required("Teléfono es requerido"),
      correo: Yup.string()
        .email("Correo electrónico inválido")
        .required("Correo es requerido"),
      nombre: Yup.string().required("Nombre es requerido"),
      apellido: Yup.string().required("Apellido es requerido"),
    }),
    onSubmit: () => {
      // Mostrar cuadro de diálogo para confirmar el pedido
      setOpenDialog(true);
    },
  });

  //Declaraciones de funciones
  const handleConfirm = (event) => {
    setOpenDialog(false);

    event.preventDefault();

    if(car.length === 0){
      setMessage("No hay productos en el carrito");
      setSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    //Datos del detalle de la orden
    const carTemp = car.map((item) => {
      return {
        id_producto: item.id_producto,
        marca: item.marca,
        cantidad: item.cantidad,
        precio_unitario: item.precioUnitario,
        nombre: item.nombre,
        total: item.total,
      };
    });

    let data = {
        departamento: formik.values.departamento,
        municipio: formik.values.municipio,
        zona: formik.values.zona,
        complemento_direccion: formik.values.complemento_direccion,
        fecha_entrega: formik.values.fecha_entrega,
        telefono: formik.values.telefono,
        correo_electronico: formik.values.correo,
        nombre: formik.values.nombre,
        apellido: formik.values.apellido,
        detalle_orden : carTemp,
    };
    

    // Llamar a la función para hacer la petición a la API
    postOrderRequest(user, data)
    .then((responseData) => {
      if(responseData.status !== 200){
        setSeverity("error");
        message(responseData.response_text);
        setSnackbarOpen(true);
        return;
      }

      setMessage(responseData.response_text);
      deleteCar();
      setSeverity("success");
    })
    .catch((error) => {
        setSeverity("error");
        setMessage(error.message);
    });

    setSnackbarOpen(true);
  };

  const handleReject = () => {
    deleteCar();
    setOpenDialog(false);
  };

  const handleName = (e) => {
    setNombre(e.target.value);
  };
  const handleLastName = (e) => {
    setApellido(e.target.value);
  };
  const handleEmail = (e) => {
    setCorreo(e.target.value);
  };
  const handlePhone = (e) => {
    setTelefono(e.target.value);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const getDeparment = () => {
    const deparment = departamentoMunicipio.map((item) => item.title);
    setDepartamento(deparment);
  };
  //Cargar departamentos
  useEffect(() => {
    getDeparment();
  }, []);
  //Obtener información del usuario

  const getMunicipality = (deparment) => {
    const municipality = departamentoMunicipio.filter(
      (item) => item.title === deparment
    );
    setMunicipio(municipality[0].mun);
  };

  return (
    <>
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          backgroundColor: "#e0f7fa",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          padding: 4,
          margin: 2,
          marginLeft:6,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Formulario de pedido
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            select
            label="Departamento"
            name="departamento"
            value={formik.values.departamento}
            onChange={(e) => {
              formik.handleChange(e);
              getMunicipality(e.target.value);
            }}
            onBlur={formik.handleBlur}
            error={
              formik.touched.departamento && Boolean(formik.errors.departamento)
            }
            helperText={
              formik.touched.departamento && formik.errors.departamento
            }
            margin="normal"
          >
            {/** Crear lista desplegable de departamentos */}
            {departamento.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            select
            label="Municipio"
            name="municipio"
            value={formik.values.municipio}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.municipio && Boolean(formik.errors.municipio)}
            helperText={formik.touched.municipio && formik.errors.municipio}
            margin="normal"
          >
            {/** Crear lista desplegable de departamentos */}
            {municipio.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Zona"
            name="zona"
            value={formik.values.zona}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.zona && Boolean(formik.errors.zona)}
            helperText={formik.touched.zona && formik.errors.zona}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Dirección"
            name="complemento_direccion"
            value={formik.values.complemento_direccion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.complemento_direccion &&
              Boolean(formik.errors.complemento_direccion)
            }
            helperText={
              formik.touched.complemento_direccion &&
              formik.errors.complemento_direccion
            }
            margin="normal"
          />

          <TextField
            fullWidth
            label="Fecha de entrega"
            name="fecha_entrega"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.fecha_entrega}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.fecha_entrega &&
              Boolean(formik.errors.fecha_entrega)
            }
            helperText={
              formik.touched.fecha_entrega && formik.errors.fecha_entrega
            }
            margin="normal"
          />

          <TextField
            fullWidth
            label="Teléfono"
            name="telefono"
            value={(formik.values.telefono = telefono)}
            onChange={(e) => {
              formik.handleChange(e);
              handlePhone(e);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.telefono && Boolean(formik.errors.telefono)}
            helperText={formik.touched.telefono && formik.errors.telefono}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Correo Electrónico"
            name="correo_electronico"
            value={(formik.values.correo = correo)}
            onChange={(e) => {
              formik.handleChange(e);
              handleEmail(e);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.correo && Boolean(formik.errors.correo)}
            helperText={formik.touched.correo && formik.errors.correo}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={(formik.values.nombre = nombre)}
            onChange={(e) => {
              formik.handleChange(e);
              handleName(e);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.nombre && Boolean(formik.errors.nombre)}
            helperText={formik.touched.nombre && formik.errors.nombre}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Apellido"
            name="apellido"
            value={(formik.values.apellido = apellido)}
            onChange={(e) => {
              formik.handleChange(e);
              handleLastName(e);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.apellido && Boolean(formik.errors.apellido)}
            helperText={formik.touched.apellido && formik.errors.apellido}
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Confirmar Pedido
          </Button>
        </form>
      </Grid>

      {/* Dialogo de confirmacion de pedido*/}
      <Dialog
        open={openDialog}
        onClose={handleReject}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Confirmar Pedido</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            ¿Estás seguro que deseas confirmar el pedido?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReject} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirmar
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

export default FormFacturacion;

import { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TableCell,
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Paper,
  TextField,
  IconButton,
  DialogContentText,
} from "@mui/material";
import { UserContext } from "../../context/UserContext";
import {
  getOrderAdmin,
  getOrderDetail,
  resolveOrder,
} from "../../API/adminRequest";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { SnackBar } from "../Snackbar";

function RecordPaneAdmin() {
  const { user } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [recordDetail, setRecordDetail] = useState(null);
  const [detail, setDetail] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [messageSnackBar, setMessageSnackBar] = useState("");
  const [severitySnackBar, setSeveritySnackBar] = useState("success");
  const [messageDialog, setMessageDialog] = useState("");
  const [titleDialog, setTitleDialog] = useState("");
  const [handleResponse, setHandleResponse] = useState(0);
  const [ordenId, setOrdenId] = useState(0);

  const handeDetail = (event) => {
    setDetail(event.target.value);
  };

  useEffect(() => {
    getOrderAdmin(user)
      .then((response) => {
        if(response.status === 200){
          setData(response.data);
        }
        
      })
      .catch(() => {});
  }, [user, recordDetail]);

  // Abrir el modal con el detalle de la orden seleccionada
  const handleOpenModal = (orden) => {
    getOrderDetail(user, orden)
      .then((response) => {
        const { data } = response;
        setRecordDetail(data);
        setOpenModal(true);
      })
      .catch((error) => {
        console.error("Error al obtener el detalle de la orden:", error);
      });
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setRecordDetail([]);
  };

  const updateOrder = (id) => {
    const newOrder = data.filter((orden) => orden.id_orden !== id);
    setData(newOrder);
  };

  const handleAcceptOrder = (id) => {
    setOrdenId(id);
    setOpenDialog(true);
    setHandleResponse(1); // Aceptar orden
    setMessageDialog("¿Está seguro que desea aceptar la orden?");
    setTitleDialog("Aceptar Orden");
  };

  const handleRejectOrder = (id) => {
    setOrdenId(id);
    setOpenDialog(true);
    setHandleResponse(0); // Rechazar orden
    setMessageDialog("¿Está seguro que desea rechazar la orden?");
    setTitleDialog("Rechazar Orden");
  };

  const handleReject = () => {
    setOpenDialog(false);
  };

  const handleConfirm = () => {
    setOpenDialog(false);
    resolveOrder(user, ordenId, handleResponse, detail)
      .then((response) => {
        if (response.status === 200) {
          if (handleResponse === 0) {
            setSeveritySnackBar("success");
            setMessageSnackBar("Orden rechazada correctamente");
          } else {
            setSeveritySnackBar("success");
            setMessageSnackBar("Orden aceptada correctamente");
          }
          updateOrder(ordenId);
        } else {
          setMessageSnackBar(response.response_text);
          setSeveritySnackBar("error");
        }
      })
      .catch((error) => {
        setMessageSnackBar(error.message);
        setSeveritySnackBar("error");
        console.error("Error al resolver la orden:", error);
      });
    setOpenSnackBar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackBar(false);
  };

  return (
    <div style={{ paddingTop: "64px", margin: "auto",}}>
      <Typography variant="h4" textAlign={"center"}>Ordenes Pendientes</Typography>
      <Grid
    container
    spacing={2}
    sx={{
      
      alignContent: "center",
      alignItems: "center",
    }}
    >
        {data.length === 0 ? (
          <Typography sx={{ alignContent: "center", margin: 7 }} variant="h6">
            No hay ordenes
          </Typography>
        ) : (
          data.map((orden) => (
            <Grid container item xs={12} md={data.length === 1 ? 11 : 5} key={orden.id_orden} margin={2}>
              <Card
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  minWidth: "100%",
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{textAlign:"center"}}>Orden #{orden.id_orden}</Typography>
                  <Typography variant="body2">
                    <strong>Nombre:</strong> {orden.nombre_completo}
                  </Typography>
                  <Typography variant="body2">
                  <strong>Dirección:</strong> {orden.direccion}
                  </Typography>
                  <Typography variant="body2">
                  <strong>Fecha de Entrega:</strong> {orden.fecha_entrega}
                  </Typography>
                  <Typography variant="body2">
                  <strong>Estado:</strong> {orden.estado}
                  </Typography>
                  <Typography variant="body2">
                  <strong>Total Orden</strong>: Q{orden.total_orden}
                  </Typography>
                  <TextField
                    id="outlined-select-currency"
                    label="Descripción de orden"
                    onChange={handeDetail}
                    helperText="Agregue su comentario sobre la orden"
                  />
                  <Grid
                    container
                    justifyContent="flex-end"
                    spacing={1}
                    style={{ marginTop: "8px" }}
                  >
                    <Grid item>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenModal(orden.id_orden)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        color="success"
                        onClick={() => handleAcceptOrder(orden.id_orden)} // Función para aceptar orden
                      >
                        <CheckCircleIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton
                        color="error"
                        onClick={() => handleRejectOrder(orden.id_orden)} // Función para rechazar orden
                      >
                        <CancelIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      {/* Modal para mostrar el detalle de la orden */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Detalles de la Orden</DialogTitle>
        <DialogContent>
          {
            <div>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Cantidad</TableCell>
                      <TableCell>Producto</TableCell>
                      <TableCell>Precio Unitario</TableCell>
                      <TableCell>Subtotal</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recordDetail !== null ? (
                      recordDetail.map((producto, index) => (
                        <TableRow key={index}>
                          <TableCell>{producto.cantidad}</TableCell>
                          <TableCell>{producto.producto}</TableCell>
                          <TableCell>Q{producto.precio_unitario}</TableCell>
                          <TableCell>Q{producto.subtotal}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell>No hay productos en esta orden</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialogo de confirmacion de pedido*/}
      <Dialog
        open={openDialog}
        onClose={handleReject}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">{titleDialog}</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            {messageDialog}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReject} color="secondary">
            Cancelar
          </Button>
          <Button onClick={() => handleConfirm()} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <SnackBar
        openS={openSnackBar}
        messageS={messageSnackBar}
        severityS={severitySnackBar}
        onClose={handleSnackbarClose}
      />
    </div>
  );
}

export default RecordPaneAdmin;

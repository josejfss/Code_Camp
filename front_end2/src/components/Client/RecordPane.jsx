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
} from "@mui/material";
import { UserContext } from "../../context/UserContext";
import { getOrderDetail, getOrderUser } from "../../API/orderRequest";

function RecordPane() {
  const { user } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [recordDetail, setRecordDetail] = useState(null);

  useEffect(() => {
    getOrderUser(user)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las ordenes:", error);
      });
  }, [user, recordDetail]);

  // Abrir el modal con el detalle de la orden seleccionada
  const handleOpenModal = (orden) => {
    getOrderDetail(user, orden,)
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

  return (
    <div style={{ paddingTop: '64px' }}>
      <Grid container spacing={2}>
      {data.length === 0 ? <Typography sx={{alignContent: "center", margin:7}} variant="h6">No hay ordenes</Typography> :
        (data.map((orden) => (
          <Grid item xs={12} md={6} key={orden.id_orden}>
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <CardContent>
                <Typography variant="h6">Orden #{orden.id_orden}</Typography>
                <Typography variant="body2">
                  Nombre: {orden.nombre_completo}
                </Typography>
                <Typography variant="body2">
                  Dirección: {orden.direccion}
                </Typography>
                <Typography variant="body2">
                  Fecha de Entrega: {orden.fecha_entrega}
                </Typography>
                <Typography variant="body2">Estado: {orden.estado}</Typography>
                <Typography variant="body2">
                  Total Orden: Q{orden.total_orden}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenModal(orden.id_orden)}
                  style={{ marginTop: "16px" }}
                >
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )))}
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
    </div>
  );
}

export default RecordPane;

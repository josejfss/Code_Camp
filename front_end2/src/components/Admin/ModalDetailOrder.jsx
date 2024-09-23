import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import PropTypes from "prop-types";

function ModalDetailOrder({ open, onClose, order, detailOrder }) {
  return (
    <Dialog open={open} onClose={onClose}>
      
      <DialogContent>
        <Card sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Factura
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary">
                  <strong>Orden ID:</strong> {order.id_orden}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary">
                  <strong>Nombre Completo:</strong> {order.nombre_completo}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary">
                  <strong>Dirección:</strong> {order.direccion}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">
                  <strong>Fecha de Creación:</strong> {order.fecha_creacion}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">
                  <strong>Fecha de Entrega:</strong> {order.fecha_entrega}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary">
                  <strong>Estado:</strong> {order.estado}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12}>
                <Typography variant="h6" align="left">
                  Detalle de la Orden:
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <strong>Cantidad</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Producto</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Marca</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Precio Unitario</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Subtotal</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {detailOrder.map((producto, index) => (
                        <TableRow key={index}>
                          <TableCell>{producto.cantidad}</TableCell>
                          <TableCell>{producto.producto}</TableCell>
                          <TableCell>{producto.marca}</TableCell>
                          <TableCell>Q{producto.precio_unitario}</TableCell>
                          <TableCell>Q{producto.subtotal}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  textAlign={"center"}
                >
                  <strong>Total Orden:</strong> Q{order.total_orden}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
          <Button onClick={onClose} color="error">
            Cerrar
          </Button>
       </DialogActions>
    </Dialog>
  );
}

export default ModalDetailOrder;

ModalDetailOrder.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    detailOrder: PropTypes.array.isRequired,
    };
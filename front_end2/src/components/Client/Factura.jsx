import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function Factura() {
  const location = useLocation();
  const { detail, bill } = location.state;
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };


  return (
    <>
      <Card sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Factura
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" color="textSecondary">
                <strong>Orden ID:</strong> {bill.id_orden}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" color="textSecondary">
                <strong>Nombre Completo:</strong> {bill.nombre_completo}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" color="textSecondary">
                <strong>Dirección:</strong> {bill.direccion}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body1" color="textSecondary">
                <strong>Fecha de Creación:</strong>{" "}
                {bill.fecha_creacion}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body1" color="textSecondary">
                <strong>Fecha de Entrega:</strong>{" "}
                {bill.fecha_entrega}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" color="textSecondary">
                <strong>Estado:</strong> {bill.estado}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                align="left"
              >
                Detalle de la Orden:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Cantidad</strong></TableCell>
                      <TableCell><strong>Producto</strong></TableCell>
                      <TableCell><strong>Marca</strong></TableCell>
                      <TableCell><strong>Precio Unitario</strong></TableCell>
                      <TableCell><strong>Subtotal</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detail.map((producto, index) => (
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
                <strong>Total Orden:</strong> Q{bill.total_orden.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" onClick={handleBack}>
            Regresar
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

export default Factura;

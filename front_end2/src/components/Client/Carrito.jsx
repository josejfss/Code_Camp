import { ProductContext } from "../../context/ProductContex";
import { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import { Grid, Typography, CardMedia, Box, Button } from "@mui/material";

function Carrito() {
  const { car: carrito, deleteCar, updateCar } = useContext(ProductContext);

  const total = carrito.reduce((acc, producto) => acc + producto.total, 0);

  return (
    <>
      <Grid item xs={12} md={5}
      sx={{
        backgroundColor: '#e0f7fa',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: 2,
        marginTop: 2,
        padding: 4,
        marginLeft:7,
        marginRight:10

      }}
      >
        <Typography variant="h5" gutterBottom textAlign={"center"}>
          Desglose del Carrito
        </Typography>
        {carrito.length === 0 ? (
          <Typography variant="h6">El carrito está vacío</Typography>
        ) : ( 
          carrito.map((producto) => (
            <Box
              key={producto.id}
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <CardMedia
                component="img"
                image={producto.img}
                alt={producto.name}
                sx={{ width: 100, height: 100, marginRight: 2 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1">{producto.nombre}</Typography>
                <Typography variant="body2">Marca: {producto.marca}</Typography>
                <Typography variant="body2">
                  Cantidad: {producto.cantidad}
                </Typography>
                <Typography variant="body2">
                  Precio Unitario: Q{producto.precioUnitario.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  Total: Q{producto.total.toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => updateCar(producto.id)}
                  startIcon={<DeleteIcon />}
                ></Button>
              </Box>
            </Box>
          ))
        )}
        { carrito.length > 0 && 
          (
          <>
          <Typography variant="h6" textAlign={"center"}>
            Total orden Q{total.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteCar()}
              startIcon={<DeleteIcon />}
            >
              Eliminar carrito
            </Button>
          </>)
        }
      </Grid>
    </>
  );
}

export default Carrito;

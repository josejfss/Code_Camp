import { CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { TextField, Snackbar, Alert, CardActions, Button } from "@mui/material";
import { useState, useContext } from "react";
import { ProductContext } from "../../context/ProductContex";

function CardContentP({
  productoNombre,
  marca,
  stock,
  estado,
  id,
  precio,
  img,
}) {
  const { addCar, car } = useContext(ProductContext);

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    if (!isNaN(event.target.value)) {
      const value = parseInt(event.target.value);
      setQuantity(value);
    }
  };

  const handleAddToCart = (event) => {
    event.preventDefault();
    if (isNaN(quantity) || quantity <= 0) {
      setMessage("La cantidad debe ser mayor a 0");
      setSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    if (quantity > stock) {
      setMessage("No hay suficiente stock");
      setSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    let product = {
      id_producto: id,
      img: img,
      marca: marca,
      cantidad: quantity,
      precioUnitario: precio,
      nombre: productoNombre,
      total: parseFloat(quantity) * parseFloat(precio),

    };
    console.log("producto", product);
    console.log("carrito", car);

    addCar(product);
    setMessage(`${quantity} ${productoNombre}(s) agregados al carrito`);
    console.log("carrito ac", car)
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <CardContent>
        <Typography variant="h5" component="div">
          {productoNombre}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Marca: {marca}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Stock: {stock} unidades
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color:
              estado === "Disponible"
                ? "green"
                : estado === "Agotado"
                ? "red"
                : "orange",
          }}
        >
          Estado: {estado}
        </Typography>
        <Typography variant="h6" sx={{ marginTop: 1, fontWeight: "bold" }}>
          Precio: Q{precio}
        </Typography>

        <TextField
          label="Cantidad"
          type="number"
          variant="outlined"
          value={quantity}
          onChange={(e) => handleQuantityChange(e)}
          fullWidth
          sx={{ marginTop: 2 }}
        />
      </CardContent>

      <CardActions>
        <Button size="small" color="primary" onClick={handleAddToCart}>
          Agregar al carrito
        </Button>
      </CardActions>

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

export default CardContentP;

CardContentP.propTypes = {
  productoNombre: PropTypes.string.isRequired,
  marca: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired,
  estado: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  precio: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
};

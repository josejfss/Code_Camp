import { Grid } from "@mui/material";
import Carrito from "./Carrito";
import NavBarClient from "./NavBarClient";
import { ProductContextProvider } from "../../context/ProductContex";
import FormFacturacion from "./FormFacturacion";

function Compra() {
  return (
    <div style={{ paddingTop: '64px' }}>
      <ProductContextProvider>
        <NavBarClient />
        <Grid container spacing={4} sx={{ padding: 4, marginTop:2}}>
          <Carrito />
          <FormFacturacion />
        </Grid>
      </ProductContextProvider>
    </div>
  );
}

export default Compra;

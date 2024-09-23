import { ProductContextProvider } from "../../context/ProductContex";
import NavBarClient from "./NavBarClient";
import Factura from "./Factura";
import { Grid } from "@mui/material";

function FacturaContainer() {
  return (
    <ProductContextProvider>
      <NavBarClient />
      <Grid container spacing={4} sx={{ padding: 4, marginTop: 7 }}>
        <Factura />
      </Grid>
    </ProductContextProvider>
  );
}

export default FacturaContainer;

import { Grid } from "@mui/material"
import { CategoryContextProvider } from "../../context/CategoryContext"
import NavbarAdmin from "./NavbarAdmin"
import ProductoComponente from "./ProductoComponent"


function ProductContainer() {
  return (
    <CategoryContextProvider>
    <NavbarAdmin/>
    <Grid container item md={11} spacing={4} sx={{ padding: 4, marginTop:5}}>
    <ProductoComponente />
    </Grid>
    </CategoryContextProvider>
  )
}

export default ProductContainer
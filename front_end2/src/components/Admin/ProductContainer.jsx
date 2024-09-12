import { Grid } from "@mui/material"
import { CategoryContextProvider } from "../../context/CategoryContext"
import NavbarAdmin from "./NavbarAdmin"
import ProductoComponente from "./ProductoComponent"


function ProductContainer() {
  return (
    <CategoryContextProvider>
    <NavbarAdmin/>
    <Grid container spacing={4} sx={{ padding: 4, margin:6}}>
    <ProductoComponente />
    </Grid>
    </CategoryContextProvider>
  )
}

export default ProductContainer
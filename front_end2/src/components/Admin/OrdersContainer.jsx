import { Grid } from "@mui/material"
import NavbarAdmin from "./NavbarAdmin"
import OrderComponent from "./OrdersComponent"


function OrdersContainer() {
  return (
    <>
    <NavbarAdmin />
    <Grid container item md={11} spacing={4} sx={{ padding: 4, marginTop:5}}>
    <OrderComponent />
    </Grid>
    </>
  )
}

export default OrdersContainer
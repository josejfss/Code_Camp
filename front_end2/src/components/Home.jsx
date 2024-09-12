import NavBarClient from "./Client/NavBarClient"
import Product from "./Client/Product"
import { Grid } from '@mui/material';

function Home() {
  return (
    <>
    <NavBarClient />
    <Grid container  sx={{ padding: 1, marginTop:1, marginBottom:1}}>
    <Product />
        </Grid>
    
    </>
  )
}

export default Home
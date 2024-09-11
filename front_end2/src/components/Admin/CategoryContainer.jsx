import { Grid } from "@mui/material"
import NavbarAdmin from "./NavbarAdmin"
import CategoryComponent from "./CategoryComponent"
import { CategoryContextProvider } from "../../context/CategoryContext"

function CategoryContainer() {
  return (
    <CategoryContextProvider>
    <NavbarAdmin/>
    <Grid container spacing={4} sx={{ padding: 4, marginTop:6}}>
    <CategoryComponent />
    </Grid>
    </CategoryContextProvider>
  )
}

export default CategoryContainer
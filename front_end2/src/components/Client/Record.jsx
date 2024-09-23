import { Grid } from "@mui/material";
import NavBarClient from "./NavBarClient";
import RecordPane from "./RecordPane";
import {ProductContextProvider} from '../../context/ProductContex'

function Record() {
  return (
    <ProductContextProvider>
      <NavBarClient />
      <Grid container sx={{ padding: 1, marginTop: 1, marginBottom: 1 }}>
        <RecordPane />
      </Grid>
    </ProductContextProvider>
  );
}

export default Record;

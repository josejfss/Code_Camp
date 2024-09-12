import { Grid } from "@mui/material";
import NavbarAdmin from "./NavbarAdmin";
import RecordPaneAdmin from "./RecordPaneAdmin";

function HomeAdmin() {
  return (
    <>
      <NavbarAdmin />
      <Grid container sx={{ padding: 1, marginTop: 1, marginBottom: 1 }}>
        <RecordPaneAdmin />
      </Grid>
    </>
  );
}

export default HomeAdmin;

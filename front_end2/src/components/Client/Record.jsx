import { Grid } from "@mui/material";
import NavBarClient from "./NavBarClient";
import RecordPane from "./RecordPane";

function Record() {
  return (
    <>
      <NavBarClient />
      <Grid container sx={{ padding: 1, marginTop: 1, marginBottom: 1 }}>
        <RecordPane />
      </Grid>
    </>
  );
}

export default Record;


import CardContainer from './CardContainer';
import {
  Container,
} from "@mui/material";


function Product() {
 
  return (

      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "25px",
        }}
      >
      <CardContainer/>
      </Container>
  );
}

export default Product;

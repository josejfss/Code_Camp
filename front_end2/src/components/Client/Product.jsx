
import {ProductContextProvider} from '../../context/ProductContex'
import CardContainer from './CardContainer';
import {
  Container,
} from "@mui/material";


function Product() {
 
  return (
    <ProductContextProvider>
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

      {/* Snackbar para notificación de producto agregado */}
      
    </ProductContextProvider>
  );
}

export default Product;

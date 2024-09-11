import CardContentP from "./CardContentP";
import CardMedia from "./CardMedia";
import { ProductContext } from "../../context/ProductContex";
import { useContext, useEffect } from "react";
import { getProduct } from "../../API/productRequest";
import { UserContext } from "../../context/UserContext";

import {
  Grid,
  Card,
} from "@mui/material";

function CardContainer() {
  const { user } = useContext(UserContext);
  const { setProduct, product } = useContext(ProductContext);


  useEffect(() => {
    getProduct(user)
      .then((responseData) => {
        const { data } = responseData;
        setProduct(data);
      })
      .catch(() => {

      });
  }, [user, setProduct]);

  if (product) {
    return (
      <div style={{ paddingTop: '40px' }}>
      <Grid container spacing={2}>
        {product.map((producto) => (
          <Grid
          item
          key={producto.id_producto}
          xs={12}
          sm={6}    
          md={3}    
  
        >
              <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardMedia
                  productoNombre={producto.nombre}
                  img={producto.foto}
                />

                <CardContentP
                  estado={producto.estado}
                  id={producto.id_producto}
                  img={producto.foto}
                  marca={producto.marca}
                  precio={producto.precio}
                  productoNombre={producto.nombre}
                  stock={producto.stock}
                />
              </Card>
            </Grid>
          // </Grid>
        ))}
        </Grid>
      </div>
    );
  }
}

export default CardContainer;

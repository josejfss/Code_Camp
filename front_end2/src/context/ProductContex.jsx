/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import { getProduct } from "../API/productRequest";
import { UserContext } from "./UserContext";
export const ProductContext = createContext();

export function ProductContextProvider(props) {
  const { user } = useContext(UserContext);

  const [car, setCar] = useState([]);
  const [product, setProduct] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const getProducts = async () => {
    try {
      const response = await getProduct(user);
      setProduct(JSON.parse(response));
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    let quantity =  car.reduce((acc, producto) => acc + producto.cantidad, 0);
    setTotalQuantity(quantity);
  }, [car, setCar]);


  const deleteCar = () =>{
    setCar([])
    localStorage.setItem(`product-${user.id_usuario}`,JSON.stringify([]))
  };

  const updateCar = (idCar) =>{
    const newCar = car.filter((cars) => cars.id !== idCar)
    setCar(newCar)
    localStorage.setItem(`product-${user.id_usuario}`,JSON.stringify(newCar))
  };

  const addCar = (producto) =>{
    const productTemp = car.filter((product) => product.id_producto === producto.id_producto)
    if(productTemp.length > 0){
      
      const newCar = car.map((product) => {
        if(product.id_producto === producto.id_producto){
          const newProduct = {
            ...product,
            cantidad: product.cantidad + producto.cantidad,
            total : product.total + producto.total
          }
          return newProduct
        }
        return product
      })
      
      setCar(newCar)
      localStorage.setItem(`product-${user.id_usuario}`,JSON.stringify(newCar))
      return
    }
    producto.id = car.length + 1;
    const newCar = [...car,producto]
    setCar(newCar)
    localStorage.setItem(`product-${user.id_usuario}`,JSON.stringify(newCar))
  };




  useEffect(() => {
    const storeProduct = localStorage.getItem(`product-${user.id_usuario}`);
    if (storeProduct) {
      setCar(JSON.parse(storeProduct));
    };
    

  }, [user.id_usuario]);

  return (
    <ProductContext.Provider
      value={{
        car,
        setCar,
        deleteCar,
        addCar,
        updateCar,
        product,
        setProduct,
        getProducts,
        totalQuantity
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}

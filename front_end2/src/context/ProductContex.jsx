/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import { getProduct } from "../API/productRequest";
import { UserContext } from "./UserContext";
export const ProductContext = createContext();

export function ProductContextProvider(props) {
  const { user } = useContext(UserContext);

  const [car, setCar] = useState([]);
  const [product, setProduct] = useState(null);

  const getProducts = async () => {
    try {
      const response = await getProduct(user);
      console.log(response);
      setProduct(JSON.parse(response));
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };


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
    const newCar = [...car,producto]
    console.log("producto", newCar)
    
    producto.id = product.length + 1;
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
        getProducts
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}

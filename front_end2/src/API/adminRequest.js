import { url } from "./config";

export const getOrderAdmin = async ({token_jwr}) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token_jwr}`
      }
    };
  
    try {
      // Hacer petición a la API
      const response = await fetch(`${url}/get_orders`, options);
      const responseData = await response.json();
        
      
      return responseData;
  
    } catch (error) {
      console.error();
      throw error; 
    }
  }
  
  export const getOrderDetail = async ({token_jwr}, id_orden) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token_jwr}`
      },
      body: JSON.stringify({
        id_orden:id_orden,
        admin : 1
    })
    };
  
    try {
      // Hacer petición a la API
      const response = await fetch(`${url}/get_detail_order`, options);
      const responseData = await response.json();
      responseData.status = response.status;
 
      
      return responseData;
  
    } catch (error) {
      console.log();
      throw error;
    }
}


export const resolveOrder = async ({token_jwr}, id_orden, estado, descripcion) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token_jwr}`
    },
    body: JSON.stringify({
      estado:estado,
      id_orden:id_orden,
      descripcion:descripcion,
  })
  };

  try {
    // Hacer petición a la API
    const response = await fetch(`${url}/check_admin_order`, options);
    const responseData = await response.json();
    responseData.status = response.status;
    
    return responseData;

  } catch (error) {
    console.log();
    throw error
  }
}
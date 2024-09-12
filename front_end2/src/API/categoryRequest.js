import { url, estados } from "./config";

export const getProductCategory = async ({token_jwr}) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token_jwr}`
      }
    };
  
    try {
      // Hacer petición a la API
      const response = await fetch(`${url}/get_product_category`, options);
      const responseData = await response.json();
      responseData.status = response.status;
      
      return responseData;
  
    } catch (error) {
      console.error('Error en la petición:', error);
      throw error; 
    }
  }


  export const postProductCategory = async ({token_jwr}, data) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token_jwr}`
      },
        body: JSON.stringify(data)
    };
  
    try {
      // Hacer petición a la API
      const response = await fetch(`${url}/create_product_category`, options);
      const responseData = await response.json();
      responseData.status = response.status;
      
      return responseData;
  
    } catch (error) {
      console.error('Error en la petición:', error);
      throw error;
    }
  }

  export const putProductCategory = async ({token_jwr}, data) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token_jwr}`
      },
        body: JSON.stringify(data)
    };
  
    try {
      // Hacer petición a la API
      const response = await fetch(`${url}/update_product_category`, options);
      const responseData = await response.json();
      responseData.status = response.status;
      
      return responseData;
  
    } catch (error) {
      console.error('Error en la petición:', error);
      throw error; 
    }
  }

  export const deleteProductCategory = async ({token_jwr}, data) => {
    //Cambiar estado a eliminado
    data.id_estado = estados.Eliminado
    
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token_jwr}`
      },
        body: JSON.stringify(data)
    };
  
    try {
      // Hacer petición a la API
      const response = await fetch(`${url}/update_product_category`, options);
      const responseData = await response.json();
      responseData.status = response.status;
      
      return responseData;
  
    } catch (error) {
      console.error('Error en la petición:', error);
      throw error; 
    }
  }
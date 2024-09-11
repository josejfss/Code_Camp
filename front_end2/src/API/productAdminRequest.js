import { url, estados } from "./config";

export const getProduct = async ({token_jwr}) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token_jwr}`
      }
    };
  
    try {
      // Hacer petición a la API
      const response = await fetch(`${url}/get_product2`, options);
      const responseData = await response.json();
      responseData.status = response.status;
      console.log('responseData product: ', responseData);
      return responseData;
  
    } catch (error) {
      console.error('Error en la petición:', error);
      throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
    }
  }


  export const postProduct = async ({token_jwr}, formData) => {
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token_jwr}`
      },
        body: formData
    };
  
    try {
      // Hacer petición a la API
      const response = await fetch(`${url}/create_product`, options);
      const responseData = await response.json();
      responseData.status = response.status;
      console.log('responseData: ', responseData);
      return responseData;
  
    } catch (error) {
      console.error('Error en la petición:', error);
      throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
    }
  }

  export const postUpdateImage = async ({token_jwr}, formData) => {
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token_jwr}`
      },
        body: formData
    };
  
    try {
      // Hacer petición a la API
      const response = await fetch(`${url}/update_image_producto`, options);
      const responseData = await response.json();
      responseData.status = response.status;
      console.log('responseData: ', responseData);
      return responseData;
  
    } catch (error) {
      console.error('Error en la petición:', error);
      throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
    }
  }

  export const putProduct = async ({token_jwr}, data) => {
    const options = {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token_jwr}`
      },
        body: data
    };
  
    try {
      // Hacer petición a la API
      const response = await fetch(`${url}/update_product`, options);
      const responseData = await response.json();
      responseData.status = response.status;
      console.log('responseData: ', responseData);
      return responseData;
  
    } catch (error) {
      console.error('Error en la petición:', error);
      throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
    }
  }

  export const deleteProduct = async ({token_jwr}, data) => {
    //Cambiar estado a eliminado
    data.id_estado = estados.Eliminado

    console.log('data: ', data);
    
    const options = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token_jwr}`
      },
        body: JSON.stringify(data)
    };
  
    try {
      // Hacer petición a la API
      const response = await fetch(`${url}/update_product`, options);
      const responseData = await response.json();
      responseData.status = response.status;
      console.log('responseData: ', responseData);
      return responseData;
  
    } catch (error) {
      console.error('Error en la petición:', error);
      throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
    }
  }
import {url} from './config';

export const postOrderRequest = async ({token_jwr}, data) => {
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
    const response = await fetch(`${url}/create_factura_p2`, options);
    const responseData = await response.json();
    // Verificar si la respuesta es exitosa
    

    
    return responseData;

  } catch (error) {
    console.error('Error en la petición:', error);
    throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
  }
}


export const getOrderUser = async ({token_jwr}) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token_jwr}`
    }
  };

  try {
    // Hacer petición a la API
    const response = await fetch(`${url}/get_user_order`, options);
    const responseData = await response.json();

    return responseData;

  } catch (error) {
    console.error('Error en la petición:', error);
    throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
  }
}

export const getOrderDetail = async ({token_jwr}, id_orden) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token_jwr}`
    },
    body: JSON.stringify({id_orden:id_orden})
  };

  try {
    // Hacer petición a la API
    const response = await fetch(`${url}/get_detail_order`, options);
    const responseData = await response.json();
    // Verificar si la respuesta es exitosa
    if (!response.ok || response.status !== 200) {
      throw new Error(`Error: ${response.status} ${responseData.response_text}`);
    }

    
    return responseData;

  } catch (error) {
    console.log('Error en la petición:', error);
  }
}
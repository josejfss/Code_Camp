import {url} from './config';

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
    return responseData;

  } catch (error) {
    console.error('Error en la petición:', error);
    throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
  }
}

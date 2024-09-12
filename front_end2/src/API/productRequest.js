import {url} from './config';

export const getProduct = async ({token_jwr}) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token_jwr}` // Agregar el token Bearer al encabezado
    }
  };

  try {
    // Hacer petición a la API
    const response = await fetch(`${url}/get_product`, options);

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;

  } catch (error) {
    console.error('Error en la petición:', error);
    throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
  }
}

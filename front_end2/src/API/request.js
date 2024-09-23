import {url} from './config';

export const login =async (data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( data )
  };

  try {
    // Hacer petición a la API
    const response = await fetch(`${url}/login`, options);
    const responseData = await response.json();
    
    return { status: response.status, data: responseData };
  } catch (error) {
    console.error('Error en la petición:', error);
    throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
  }
}

export const getState =async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };

  try {
    // Hacer petición a la API
    const response = await fetch(`${url}/get_user_role`, options);
    const responseData = await response.json();
    responseData.status = response.status;
    return responseData;
  } catch (error) {
    console.error('Error en la petición:', error);
    throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
  }
}
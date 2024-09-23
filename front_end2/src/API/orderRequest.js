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
    responseData.status = response.status;

    
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
    responseData.status = response.status;
    return responseData;

  } catch (error) {
    console.error('Error en la petición:', error);
    throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
  }
}

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
    const response = await fetch(`${url}/get_orders_admin`, options);
    const responseData = await response.json();
    responseData.status = response.status;
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
    responseData.status = response.status;

    return responseData;

  } catch (error) {
    console.eror('Error en la petición:', error);
  }
}

export const getOrderDetailAdmin = async ({token_jwr}, id_orden) => {

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token_jwr}`
    },
    body: JSON.stringify({id_orden:id_orden, admin:1})
  };

  try {
    // Hacer petición a la API
    const response = await fetch(`${url}/get_detail_order`, options);
    const responseData = await response.json();
    responseData.status = response.status;
    return responseData;

  } catch (error) {
    console.error('Error en la petición:', error);
  }
}
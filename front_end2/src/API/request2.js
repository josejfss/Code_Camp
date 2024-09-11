async function getProduct(url, data, token) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Agregar el token Bearer al encabezado
    },
    // body: JSON.stringify(data) // Descomentar y corregir el cuerpo de la petición
  };

  try {
    // Hacer petición a la API
    const response = await fetch(`${url}/get_product`, options);
    console.log(response);

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error('Error en la petición:', error);
    throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
  }
}

// Ejemplo de uso
const url = 'http://localhost:4000'; 
const data = {
  product_id: '12345'
};
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjo1LCJpZF9yb2wiOjIsImlkX2VzdGFkbyI6MSwiaWF0IjoxNzI1Njc3Nzc0LCJleHAiOjE3MjU3NjQxNzR9.cxYxxL9zMOULBAGUiWYDEq3lvHGfWcEJ79c9D7-Lg_8`; // Reemplaza esto con tu token real

getProduct(url, data, token)
  .then(responseData => {
    // Manejar la respuesta exitosa
    console.log('Producto obtenido:', responseData);
  })
  .catch(error => {
    // Manejar el error
    console.error('Error al obtener el producto:', error);
  });
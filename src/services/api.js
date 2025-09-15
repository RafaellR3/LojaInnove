export const BASE_URL = 'https://appinnove.onrender.com/'; 
export const CODIGO_USUARIO = '0871a0b6-2bc3-4ff9-ac1a-0e829d587508'; 
/**
 * Faz uma requisição GET para a API base + endpoint informado
 * @param {string} endpoint - Caminho da rota (ex: '/produtos')
 * @returns {Promise<object[]>} - Resposta da API em JSON
 */
 export async function get(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`);
  
    if (!response.ok) {
      throw new Error(`Erro ao buscar ${endpoint}: ${response.statusText}`);
    }
  
    return response.json();
  }

  function getHeaders(auth = false) {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    if (auth) {
      const token = localStorage.getItem('token'); // ou outra forma de armazenar
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
  
    return headers;
  }
  

export async function post(endpoint, body, auth = false) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(auth),
      body: JSON.stringify(body),
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`POST ${endpoint} falhou: ${res.status} - ${errorText}`);
    }
    return res.json();
  } 

  export async function put(endpoint, body, auth = false) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(auth),
      body: JSON.stringify(body),
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`PUT ${endpoint} falhou: ${res.status} - ${errorText}`);
    }
  
    return res.json();
  }
  
  export async function del(endpoint, auth = false) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(auth),
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`DELETE ${endpoint} falhou: ${res.status} - ${errorText}`);
    }
  
    return res.json();
  }
/* 
  // src/services/api.js

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';




export async function get(endpoint, auth = false) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: getHeaders(auth),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`GET ${endpoint} falhou: ${res.status} - ${errorText}`);
  }

  return res.json();
}




export async function put(endpoint, body, auth = false) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: getHeaders(auth),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`PUT ${endpoint} falhou: ${res.status} - ${errorText}`);
  }

  return res.json();
}

export async function del(endpoint, auth = false) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers: getHeaders(auth),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`DELETE ${endpoint} falhou: ${res.status} - ${errorText}`);
  }

  return res.json();
}

// Exporta a URL base para uso em imagens, etc
export { BASE_URL };
*/
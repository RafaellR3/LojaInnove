export const BASE_URL = 'https://appinnove.onrender.com/'; 
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
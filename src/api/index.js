import axios from 'axios';

// Define a base URL da API usando a variável de ambiente REACT_APP_API_URL.
// Em ambiente de produção (Render), esta variável será o URL do seu backend.
// Em desenvolvimento local, o Vite a usará, ou você pode definir um .env local.
const API_BASE_URL = process.env.REACT_APP_API_URL;

// Adicione um log para depuração, para ter certeza de que a variável está sendo lida.
// Isso aparecerá no console do seu navegador.
if (!API_BASE_URL) {
  console.warn('REACT_APP_API_URL environment variable is not defined. API calls might fail.');
  // Para desenvolvimento local, você pode descomentar a linha abaixo para um fallback,
  // mas certifique-se de que NÃO ESTÁ ATIVA em produção para evitar chamadas incorretas.
  // API_BASE_URL = 'http://localhost:3000/api/v1';
}

// Cria a instância do Axios com o URL base configurado dinamicamente.
const api = axios.create({
  baseURL: API_BASE_URL, // <-- ESTA É A LINHA ALTERADA
  headers: {
    'Content-Type': 'application/json',
  },
  // Adiciona timeout para detectar problemas de conexão mais rapidamente
  timeout: 10000,
});

// Interceptor de requisição para depuração e adição do token de autenticação
api.interceptors.request.use(
  (config) => {
    // Loga os detalhes da requisição API para depuração
    console.log(`API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`, config);

    // Obtém o token do localStorage e o adiciona ao cabeçalho de Autorização
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Loga erros de requisição
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Interceptor de resposta para lidar com erros e logar respostas
api.interceptors.response.use(
  (response) => {
    // Loga os detalhes da resposta da API
    console.log(`API Response: ${response.status} for ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    // Loga informações de erro detalhadas para depuração
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    // Lida com erros 401 (Não Autorizado) - redireciona para a página de login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login'; // Redireciona para o login
    }
    return Promise.reject(error);
  }
);

// Exporta a instância configurada do Axios para ser usada em outros módulos
export default api;

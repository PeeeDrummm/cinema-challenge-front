import axios from 'axios';

// Variável de ambiente será injetada aqui pelo Vite/Build Tool
// para ambiente de produção, Render vai injetar o URL do backend aqui.
const API_BASE_URL = process.env.REACT_APP_API_URL; 

// A instância 'I' provavelmente vem de um import global do Axios minificado
// Se o seu 'axios' é o 'I', então a linha abaixo está correta.
// Se não, o import 'axios' lá em cima já é o 'I'
const V = axios.create({ // Use 'axios.create' diretamente aqui
  baseURL: API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// O restante dos seus interceptors e exportações...
// Debug interceptor to log requests
V.interceptors.request.use( // <-- AQUI USAMOS 'V'
  (config) => {
    console.log(`API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`, config);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors and logging
V.interceptors.response.use( // <-- AQUI USAMOS 'V'
  (response) => {
    console.log(`API Response: ${response.status} for ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
      
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default V; // <-- AQUI EXPORTAMOS 'V'

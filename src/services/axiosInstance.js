import axios from 'axios';
import AuthService from './auth.service';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptar requisições para adicionar o token de autenticação
axiosInstance.interceptors.request.use(
  (config) => {
    const user = AuthService.getCurrentUser();
    if (user && user.accessToken) {
      config.headers['Authorization'] = 'Bearer ' + user.accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptar respostas para verificar expiração do token
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    // Se a resposta for 401 (Unauthorized), verificar se é devido ao token expirado
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Tentar renovar o token
      return AuthService.renewToken().then((res) => {
        if (res.data.accessToken) {
          // Atualizar o token no local storage
          localStorage.setItem('user', JSON.stringify(res.data));
          axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + res.data.accessToken;
          originalRequest.headers['Authorization'] = 'Bearer ' + res.data.accessToken;

          // Reenviar a requisição original
          return axiosInstance(originalRequest);
        }
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

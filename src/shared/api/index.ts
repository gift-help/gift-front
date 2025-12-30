import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 100000,
  headers: { 'Content-Type': 'application/json' },
});

// Интерцептор для добавления токена к запросам
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Интерцептор для обработки ошибок авторизации
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Токен невалиден, очищаем его
      localStorage.removeItem('jwt_token');
      // Можно добавить редирект на страницу логина
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);

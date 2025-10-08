import axios from 'axios';

// baseURL はバックエンドの URL に合わせて設定
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 5000,
});

// リクエスト前に JWT を自動付与
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwt');
    const excludeUrls = ['/api/auth/login', '/api/auth/check'];

    if (token && !excludeUrls.some(url => config.url?.includes(url))) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

export default instance;

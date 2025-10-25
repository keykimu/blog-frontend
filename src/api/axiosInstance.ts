import axios from 'axios';

// baseURL はバックエンドの URL に合わせて設定
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 5000,
});

// リクエスト前に JWT を自動付与
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  const url = config.url || '';

  const isAdminApi = url.startsWith('/api/admin');
  const isAuthApi = url.includes('/api/admin/auth/login') || url.includes('/api/admin/auth/check');

  if (token && isAdminApi && !isAuthApi) {
    config.headers.Authorization = `Bearer ${token}`;
  }
    return config;
  }
);

export default instance;

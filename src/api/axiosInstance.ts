import axios from 'axios';

// baseURL はバックエンドの URL に合わせて設定
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  withCredentials:true
});

export default instance;

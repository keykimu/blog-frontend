import axios from 'axios';

// baseURL はバックエンドの URL に合わせて設定
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  withCredentials:true
});

// ----------------------------------------------------
// 💡 追記するコード: 既存のインターセプターを上書きして修正する
// ----------------------------------------------------
instance.interceptors.response.use(
  (response) => response, // 成功時はそのまま返す
  (error) => {
    
    return Promise.reject(error);
  },
);

export default instance;

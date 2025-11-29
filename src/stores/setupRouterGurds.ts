import { isAxiosError } from 'axios';
import api from './../api/axiosInstance';
import type { Router } from 'vue-router';

export function setupRouterGuards(router: Router) {
  router.beforeEach(async (to) => {
    // ページタイトル更新
    if (to.meta.title) {
      document.title = to.meta.title as string;
    }
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta && to.meta.description) {
      descriptionMeta.setAttribute('content', to.meta.description as string);
    }

    // 管理者ページの場合
    if (to.path.startsWith('/admin') && to.path !== '/admin') { 
      try {
        // サーバーに Cookie を送って認証チェック
        await api.get('/api/admin/auth/check');
        return true; // 認証 OK
      } catch (err) {
        if (isAxiosError(err)) {
          if (err.response?.status === 401) {
              console.warn('Admin access denied, redirecting to login.');
              return '/admin'; // ログインページへリダイレクト
          }
          
          // 認証以外の Axios エラー
          console.error('Unexpected Axios error during auth check:', err);
          return '/admin'; 
        }
        return '/admin'; // ログインページへリダイレクト
      }
    }

    return true; // それ以外は進む
  });
}

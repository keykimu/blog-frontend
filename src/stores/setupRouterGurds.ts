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
        return '/admin'; // ログインページへリダイレクト
      }
    }

    return true; // それ以外は進む
  });
}

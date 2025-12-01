# リポジトリについて

このリポジトリは、[https://portfolio.kimuworks.dev/](https://portfolio.kimuworks.dev/)のポートフォリオサイトのフロントエンドプロジェクトです。

Vue.js と TypeScript を利用し、主に以下の機能を提供します。
- 公開ページ: 制作物、スキル、プロフィール情報の表示。
- コンテンツ管理機能: バックエンド API を介したサイトコンテンツの更新と管理。

---

## 技術スタック
- フレームワーク: Vue 3
- 言語: TypeScript
- ビルドツール: Vite
- ルーティング: Vue Router 4
- 状態管理: Pinia
- HTTP通信: Axios
- デプロイ: Vercel

---

## バックエンド連携と認証

* **API URL**: `https://portfolio-api.kimuworks.dev/`
* **認証**: JWT (JSON Web Token) を利用し、セキュアな Cookie で認証情報を管理しています。

---

## 開発手順
### 1. 依存関係のインストール
```bash
npm install
```

### 2. 開発サーバーの起動
```bash
npm run dev
```

### 3. ビルドとデプロイ
```bash
npm run build
```

### 4. フォーマット
```bash
npm run format
```
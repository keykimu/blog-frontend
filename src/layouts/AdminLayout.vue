<template>
  <div class="admin-layout">
    <AdminNavbar class="sidebar" />
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import AdminNavbar from '../components/admin/NavigationBar.vue';

// 初期ロードでダークモード
onMounted(() => {
  document.body.classList.add('dark');
});
</script>

<style scoped lang="scss">
.admin-layout {
  display: flex;
  height: 100vh; /* 全画面に広げる */
  overflow: hidden; /* 全体のスクロールは無効 */
}

.sidebar {
  flex-shrink: 0; /* サイドバー幅を固定 */
  width: 220px;
  background: #333;
  color: white;
  height: 100vh; /* 画面全体に固定 */
  position: sticky; /* 固定 */
  top: 0;
}

.content {
  flex: 1;
  overflow-y: auto; /* 右側だけスクロール可能 */
}
</style>

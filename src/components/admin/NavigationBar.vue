<template>
  <nav>
    <router-link to="/admin/top">Top</router-link>
    <router-link to="/admin/works">成果物一覧</router-link>
    <router-link to="/admin/skill">スキル管理</router-link>
    <router-link to="/admin/profile">プロフィール</router-link>
    <button @click="logout">ログアウト</button>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const logout = () => {
  localStorage.removeItem('adminToken'); // モック認証用
  router.push('/admin'); // ログイン画面に戻す
};
</script>

<style scoped>
.admin-nav {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #f2f2f2;
}
</style>

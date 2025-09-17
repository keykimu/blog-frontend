<template>
  <div class="login">
    <h1>管理者ページ</h1>
    <button @click="login">ログイン（仮）</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function login() {
  // 仮ログイン：フラグを保存して遷移
  localStorage.setItem('isLoggedIn', 'true');
  router.push('/admin/top');
}
</script>

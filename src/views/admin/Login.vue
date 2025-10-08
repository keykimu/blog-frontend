<template>
  <div class="login">
    <h1>管理者ページ</h1>
    <form class="form" @submit.prevent="login">
      <div class="form-row">
        <label for="username">ユーザー名</label>
        <input id="username" type="text" v-model="username" />
      </div>
      <div class="form-row">
        <label for="password">パスワード</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <button type="submit">ログイン</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
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

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 180px);
  padding: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* 行ごとの間隔 */
  width: 100%;
  max-width: 400px;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: bold;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .login {
    padding: 1rem;
  }
}
</style>

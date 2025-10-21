<template>
  <div class="login">
    <h1>管理者ページ</h1>
    <form class="form" @submit.prevent="login">
      <div class="form-row">
        <label for="username">ユーザー名<span class="required">*</span></label>
        <input id="username" type="text" v-model="username" />
      </div>
      <div class="form-row">
        <label for="password">パスワード<span class="required">*</span></label>
        <input id="password" type="password" v-model="password" />
      </div>
      <button type="submit">ログイン</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../api/axiosInstance';

const router = useRouter();
const username = ref('');
const password = ref('');
const errorMessage = ref('');

async function login() {
  errorMessage.value = '';
  try {
    const response = await api.post('/api/auth/login', {
      username: username.value,
      password: password.value,
    },{
      headers: { 'Content-Type': 'application/json' }
    });
    // JWT を localStorage に保存
    localStorage.setItem('jwt', response.data.token);

    // トップページに遷移
    router.push('/admin/top');
  } catch (error: any) {
    // エラーを表示
    if (error.response && error.response.data && error.response.data.error) {
      errorMessage.value = error.response.data.error;
    } else {
      errorMessage.value = 'ログインに失敗しました';
    }
  }
}
</script>

<style scoped>
.required {
  color: red;
}
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
  align-self: center;
  width: 25%;
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

<template>
  <div class="not-found">
    <h1>404 - ページが見つかりません</h1>
    <p>お探しのページは存在しません</p>
    <router-link to="/">トップページに戻る</router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.not-found {
  text-align: center;
  margin: 100px auto;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

p {
  margin-bottom: 20px;
}
</style>

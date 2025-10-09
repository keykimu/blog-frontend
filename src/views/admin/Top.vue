<template>
  <div class="top">
    <h2>管理画面トップ</h2>
    <p>成果物件数: {{ works.length }}</p>
    <div class="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {  onMounted } from 'vue';
import { useWorks } from '../../composables/admin/works/useWorks';

const { works, errorMessage, fetchWorks } = useWorks();
onMounted(fetchWorks);
</script>

<style lang="scss" scoped>
.top {
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 0rem;
    padding-top: 3rem;
    padding-right: 2rem;
    padding-bottom: 2rem;
  }
}
</style>

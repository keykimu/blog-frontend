<template>
  <NavigationBar />
  <div class="top">
    <h1>管理画面トップ</h1>
    <p>成果物件数: {{ works.length }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getWorks, type Work } from '../../api/works';

const works = ref<Work[]>([]);

onMounted(async () => {
  works.value = await getWorks();
});
</script>

<style scoped>
.top {
  padding: 2rem;
}
</style>

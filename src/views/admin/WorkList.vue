<template>
  <NavigationBar />
  <div class="work-list">
    <h2>成果物一覧</h2>
    <router-link to="/admin/works/new">新規作成</router-link>
    <ul>
      <li v-for="work in works" :key="work.id">
        {{ work.title }}
        <router-link :to="`/admin/works/${work.id}/edit`">編集</router-link>
        <button @click="remove(work.id)">削除</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getWorks, deleteWork, type Work } from '../../api/works';

const works = ref<Work[]>([]);

const fetchWorks = async () => {
  works.value = await getWorks();
};

const remove = async (id: number) => {
  if (confirm('削除してもよいですか？')) {
    await deleteWork(id);
    fetchWorks();
  }
};

onMounted(fetchWorks);
</script>

<style scoped>
.work-list {
  padding: 2rem;
}
</style>

<template>
  <NavigationBar />
  <div class="work-list">
    <h2>成果物一覧</h2>
    <router-link to="/admin/works/new">新規作成</router-link>
    <div class="errorMessage">
      {{ errorMessage }}
    </div>

    <table class="work-table">
      <tbody>
        <tr v-for="work in works" :key="work.id">
          <td class="title">{{ work.title }}</td>
          <td>
            <router-link :to="`/admin/works/${work.id}/edit`">編集</router-link>
          </td>
          <td>
            <button @click="remove(work.id)">削除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useWorks } from '../../composables/admin/works/useWorks';

const { works, errorMessage, fetchWorks, removeWork } = useWorks();

const remove = async (id: number) => {
  if (confirm('削除しますか？')) {
    await removeWork(id);
    await fetchWorks();
  }
};

onMounted(fetchWorks);
</script>

<style lang="scss" scoped>
.work-list {
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 0rem;
    padding-top: 3rem;
    padding-right: 2rem;
    padding-bottom: 2rem;
  }
}

.work-table {
  width: 100%;
  border-collapse: collapse; /* ボーダー線をまとめる */
  margin-top: 1rem;

  td {
    padding: 0.5rem;
    border: none; /* テーブル線なし */
    vertical-align: middle;

    &:first-child {
      font-weight: bold; /* タイトルを目立たせる */
    }
  }
}
</style>

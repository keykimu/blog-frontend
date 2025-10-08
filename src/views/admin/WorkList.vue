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
import { ref, onMounted } from 'vue';
import { getWorks, deleteWork, type Work, type WorkResponse } from '../../api/works';

const works = ref<Work[]>([]);
const errorMessage = ref<string|null>();

const fetchWorks = async () => {
  const response: WorkResponse = await getWorks();
  if(response.data){
    works.value = response.data;
  }else{
    errorMessage.value = response.error;
  }
};

const remove = async (id: number) => {
  if (confirm('削除してもよいですか？')) {
    await deleteWork(id);
    fetchWorks();
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

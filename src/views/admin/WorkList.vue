<template>
  <NavigationBar />
  <div class="work-list">
    <h2>成果物一覧</h2>
    <router-link to="/admin/works/new">新規作成</router-link>
    <div class="errorMessage">
      {{ errorMessage }}
    </div>

    <table class="work-table">
      <thead>
        <tr>
          <th class="name">成果物名</th>
          <th class="edit">操作</th>
          <th class="delete">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="work in works" :key="work.id">
          <td class="title">{{ work.title }}</td>
          <td>
            <router-link :to="`/admin/works/${work.id}/edit`">編集</router-link>
          </td>
          <td>
            <button class="delete-button" @click="remove(work.id)">削除</button>
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

    table,
    thead,
    tbody,
    tr,
    th,
    td {
      display: block;
    }

    thead {
      display: none;
    }

    tr {
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
    }

    td {
      display: flex;
      justify-content: space-between;
    }

    /* ラベル用の擬似要素 */
    td:nth-child(1)::before {
      content: '成果物名';
    }
    td:nth-child(2)::before {
      content: '操作';
    }
    td:nth-child(3)::before {
      content: '操作';
    }
    td::before {
      font-weight: bold;
      flex: 0 0 30%;
    }
  }
}

.work-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  text-align: left;
  table-layout: fixed;

  th,
  td {
    padding: 0.5rem;
    border: 1px solid #ccc;
    text-align: center;
  }

  th {
    background-color: #f5f5f5;
  }

  .name {
    width: 3rem;
  }
  .edit {
    width: 1rem;
  }
  .delete {
    width: 1rem;
  }

  .delete-button {
    padding: 0.5rem 1rem;
    background-color: #f63b3b;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
      background-color: #bb1010;
    }
  }
}
</style>

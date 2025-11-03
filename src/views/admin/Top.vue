<template>
  <div class="top">
    <h2>管理画面トップ</h2>
    <div class="workCount">
      <h3>成果物件数 </h3>
      {{ works.length }}件
      <div class="errorMessage">
      {{ errorMessage }}
      </div>
    </div>

    <div class="users">
      <h3>管理者一覧</h3>
      <table v-if="users" class="user-table">
        <thead>
          <tr>
            <th>ユーザー名</th>
            <th>最終ログイン</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.username">
            <td>{{ user.username }}</td>
            <td>{{ user.lastLoginAt }}</td>
          </tr>
        </tbody>
      </table>
      <div class="errorMeerrorMessageUsersssage">
        {{ errorMessageUsers }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useWorks } from '../../composables/admin/works/useWorks';
import { useUsers } from '../../composables/admin/users/useUsers';

const { works, errorMessage, fetchWorks } = useWorks();
const { users, errorMessageUsers, fetchUsers } = useUsers();
onMounted(async () => {
  await fetchWorks();
  await fetchUsers();
});

</script>

<style lang="scss" scoped>
.top {
  padding: 2rem;

  .users{
    margin-top: 2rem;

    .user-table{
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      table-layout: fixed; // 横幅を均等に

      th,
      td {
        border: 1px solid #ccc;
        padding: 0.75rem 1rem;
        word-wrap: break-word; // 長い文字列も折り返す
      }

      th {
        background-color: #f5f5f5;
      }
    }
  }
  
  @media (max-width: 768px) {
    padding: 0rem;
    padding-top: 3rem;
    padding-right: 2rem;
    padding-bottom: 2rem;
  }
}
</style>

<template>
  <div class="admin-not-found">
    <h2>管理画面のページが見つかりません</h2>
    <router-link to="/admin/top">管理トップへ戻る</router-link>
  </div>
</template>

<style lang='scss' scoped>
.admin-not-found {
  padding:  2rem;

  @media (max-width: 768px) {
    padding: 0rem;
    padding-top: 3rem;
    padding-right: 2rem;
    padding-bottom: 2rem;
  }
}
</style>